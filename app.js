(function () {
  "use strict";

  // ---------- 站点配置（每个站点 index.html 注入 window.SITE）----------
  var SITE = window.SITE || {};
  var KEY = SITE.keyPrefix || "a3";
  var DAYS = window[SITE.daysVar || "A3_DAYS"] || {};
  var MANIFEST = window[SITE.manifestVar || "A3_MANIFEST"] || [];
  var PLAN = window[SITE.planVar || "A3_PLAN"] || [];
  var WORKBOOK = window[SITE.workbookVar || "A3_WORKBOOK"] || [];
  var PHASES = SITE.phases || ["校准", "演练", "化合"];
  var PHASE_DESC = SITE.phaseDesc || {};
  var currentDate = null;
  var BATCH = 5;            // 每关题数
  var viewBatch = 0;        // 当前解锁到的批次（0-based）

  // 团队共享榜（飞书多维表格）。如需更换，改这里即可。
  var CONFIG = {
    BASE_URL: SITE.baseUrl || "https://ruijie.feishu.cn/base/NjQYbJ2VIakvjWsFZCKcxB92nCe"
  };

  // ---------- 数据加载 ----------
  function cacheBust(src) {
    var cb = window.__SITE_CB || new Date().toISOString().slice(0, 10).replace(/-/g, "");
    return src + (src.indexOf("?") >= 0 ? "&" : "?") + "_cb=" + cb;
  }

  function loadScript(src) {
    return new Promise(function (res) {
      var s = document.createElement("script");
      s.src = cacheBust(src);
      s.onload = res;
      s.onerror = function () { console.warn("加载失败:", src); res(); };
      document.head.appendChild(s);
    });
  }

  function getUrlDate() {
    var m = location.search.match(/[?&]date=([^&#]+)/);
    return m ? decodeURIComponent(m[1]) : null;
  }

  async function boot() {
    if (!MANIFEST.length) { setProgress("暂无课程数据"); return; }
    for (var i = 0; i < MANIFEST.length; i++) {
      await loadScript("data/" + MANIFEST[i].date + ".js");
    }
    DAYS = window[SITE.daysVar || "A3_DAYS"] || {};
    renderSidebar();
    renderPlan();
    renderTodayBanner();
    updateProgress();

    var target = getUrlDate();
    if (target && DAYS[target]) {
      openDay(target);
    }
  }

  // ---------- 工具 ----------
  function $(id) { return document.getElementById(id); }
  function setProgress(txt) { $("progressPill").textContent = txt; }
  function scoreKey(d) { return KEY + "_score_" + d; }
  function refKey(d) { return KEY + "_reflection_" + d; }
  function examAnsKey(d) { return KEY + "_examans_" + d; }
  function drillKey(d) { return KEY + "_drill_" + d; }

  function loadScore(date) { try { return JSON.parse(localStorage.getItem(scoreKey(date)) || "null"); } catch (e) { return null; } }
  function saveScore(date, obj) { try { localStorage.setItem(scoreKey(date), JSON.stringify(obj)); } catch (e) {} }
  function loadAns(date) { try { return JSON.parse(localStorage.getItem(examAnsKey(date)) || "{}"); } catch (e) { return {}; } }
  function saveAns(date, map) { try { localStorage.setItem(examAnsKey(date), JSON.stringify(map)); } catch (e) {} }
  function loadDrill(date) { try { return JSON.parse(localStorage.getItem(drillKey(date)) || "null"); } catch (e) { return null; } }
  function saveDrill(date, txt) { try { localStorage.setItem(drillKey(date), JSON.stringify({ text: txt, at: Date.now() })); } catch (e) {} }

  function updateProgress() {
    var studied = MANIFEST.length;
    var list = MANIFEST.map(function (m) { return loadScore(m.date); }).filter(Boolean);
    if (!list.length) { setProgress("已备 " + studied + " 天课程 · 自定进度开练"); return; }
    var sum = 0, cnt = 0;
    list.forEach(function (s) { if (s.percent != null) { sum += s.percent; cnt++; } });
    var avg = cnt ? Math.round(sum / cnt) : 0;
    setProgress("已学 " + studied + " 天 · 平均得分 " + avg + "%");
  }

  // ---------- 学习日历（首页顶部） ----------
  function dayLevel(date) {
    var sc = loadScore(date);
    if (sc && sc.percent != null) {
      if (sc.percent >= 90) return 3;
      if (sc.percent >= 60) return 2;
      return 1;
    }
    if (localStorage.getItem(refKey(date))) return 1;
    if (localStorage.getItem(drillKey(date))) return 1;
    return 0;
  }

  function todayStr() {
    var d = new Date();
    return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
  }

  // ---------- 三阶段总览（首页顶部） ----------
  function renderPlan() {
    var box = $("planBox");
    if (!box) return;
    var html = '<div class="plan-head">' +
      '<div class="plan-title">🧭 三阶段学习地图</div>' +
      '<div class="plan-sub">校准思维 · 全真演练 · 三镜化合，自定进度往前走</div></div>';
    PHASES.forEach(function (ph) {
      var days = MANIFEST.filter(function (m) { return (DAYS[m.date] && DAYS[m.date].phase) === ph || (m.phase === ph); });
      var done = days.filter(function (m) { return dayLevel(m.date) > 0; }).length;
      html += '<div class="plan-phase-row" data-phase="' + ph + '">' +
        '<div class="plan-phase-badge p-' + PHASES.indexOf(ph) + '">' + escapeHtml(ph) + '</div>' +
        '<div class="plan-phase-body"><div class="plan-phase-name">' + escapeHtml(ph) +
        (PHASE_DESC[ph] ? '<span class="plan-phase-desc">' + escapeHtml(PHASE_DESC[ph]) + '</span>' : '') +
        '</div>' +
        '<div class="plan-phase-bar"><div class="plan-phase-fill p-' + PHASES.indexOf(ph) + '" style="width:' +
        (days.length ? Math.round(done / days.length * 100) : 0) + '%"></div></div>' +
        '<div class="plan-phase-meta">本阶段 ' + days.length + ' 天 · 已开练 ' + done + ' 天</div></div>' +
        '</div>';
    });
    box.innerHTML = html;
    box.querySelectorAll("[data-phase]").forEach(function (r) {
      r.style.cursor = "pointer";
      r.onclick = function () {
        var first = MANIFEST.find(function (m) { return (DAYS[m.date] && DAYS[m.date].phase) === r.dataset.phase || m.phase === r.dataset.phase; });
        if (first) openDay(first.date);
      };
    });
  }

  function renderTodayBanner() {
    var latest = MANIFEST[MANIFEST.length - 1];
    if (!latest) return;
    var d = DAYS[latest.date];
    if (!d) return;
    $("todayTitle").textContent = d.topicTitle || latest.title || "";
    $("todayOne").textContent = d.oneLiner || "点「开始学习」进入今日课程";
    $("todayBanner").hidden = false;
    $("startTodayBtn").onclick = function () { openDay(latest.date); };
  }

  // ---------- 侧边栏（按阶段分组） ----------
  function renderSidebar() {
    var list = $("dayList");
    list.innerHTML = "";
    PHASES.forEach(function (ph) {
      var items = MANIFEST.filter(function (m) {
        return (DAYS[m.date] && DAYS[m.date].phase) === ph || m.phase === ph;
      });
      if (!items.length) return;
      var grp = document.createElement("div");
      grp.className = "day-group";
      var head = document.createElement("div");
      head.className = "day-group-head p-" + PHASES.indexOf(ph);
      head.innerHTML = '<span class="dg-dot"></span>' + escapeHtml(ph) +
        '<span class="dg-count">' + items.length + '</span>';
      grp.appendChild(head);
      items.forEach(function (m) {
        var d = DAYS[m.date];
        var score = loadScore(m.date);
        var hasRef = !!localStorage.getItem(refKey(m.date));
        var hasDrill = !!localStorage.getItem(drillKey(m.date));
        var btn = document.createElement("button");
        btn.className = "day-item";
        btn.dataset.date = m.date;
        var badge = score
          ? '<span class="score-badge">' + score.score + "/" + score.total + "</span>"
          : '<span class="score-badge none">未考</span>';
        var dots = (hasRef ? '<span class="ref-dot" title="已写心得"></span>' : "") +
          (hasDrill ? '<span class="drill-dot" title="已写演练作答"></span>' : "");
        btn.innerHTML =
          '<div class="di-top"><span class="di-day">Day ' + m.day + '</span>' + badge + "</div>" +
          '<div class="di-title">' + escapeHtml(m.title) + dots + "</div>";
        btn.onclick = function () { openDay(m.date); };
        grp.appendChild(btn);
      });
      list.appendChild(grp);
    });
  }

  function markActive(date) {
    document.querySelectorAll(".day-item").forEach(function (el) {
      el.classList.toggle("active", el.dataset.date === date);
    });
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // ---------- 打开某一天 ----------
  function openDay(date) {
    var d = DAYS[date];
    if (!d) return;
    currentDate = date;
    viewBatch = 0;
    markActive(date);
    $("emptyState").hidden = true;
    $("todayBanner").hidden = true;
    $("lesson").hidden = false;
    var ph = d.phase || "";
    $("lessonTag").textContent = (PHASES.indexOf(ph) >= 0 ? "【" + ph + "】" : "") + "Day " + d.day + " · 主题 #" + (d.topicIndex + 1);
    $("lessonTitle").textContent = d.topicTitle;
    $("lessonDate").textContent = date;

    $("panel-learning").innerHTML = d.learning || "<p>（暂无内容）</p>";
    renderExam(d);
    $("panel-case").innerHTML = d.caseStudy || "<p>暂无案例</p>";
    if (d.advanced && d.advanced.length) {
      var adv = '<div class="advanced-box"><h4 class="adv-h">🎯 第二轮 · 审计进阶思考</h4>';
      d.advanced.forEach(function (a, i) {
        adv += '<div class="adv-q"><b>Q' + (i + 1) + "：</b>" + escapeHtml(a.q) + "</div>";
        if (a.hint) adv += '<div class="adv-hint">💡 提示：' + escapeHtml(a.hint) + "</div>";
      });
      adv += "</div>";
      $("panel-case").innerHTML += adv;
    }
    renderResources(d);
    renderReflection(date);

    // 演练面板（仅演练/化合阶段有 drill 字段）
    var drillTab = document.querySelector('.tab[data-tab="drill"]');
    if (d.drill) {
      if (drillTab) drillTab.hidden = false;
      renderDrill(d);
    } else {
      if (drillTab) drillTab.hidden = true;
      $("panel-drill").innerHTML = "";
    }

    switchTab(d.drill ? "drill" : "learning");
  }

  // ---------- 标签页 ----------
  function switchTab(tab) {
    var visible = ["learning", "exam", "case", "resources", "reflection"];
    if (!$("panel-drill").innerHTML.trim() === "" ) {} // noop
    document.querySelectorAll(".tab").forEach(function (t) {
      if (t.hidden) return;
      t.classList.toggle("active", t.dataset.tab === tab);
    });
    ["learning", "drill", "exam", "case", "resources", "reflection"].forEach(function (k) {
      var p = $("panel-" + k);
      if (p) p.hidden = (k !== tab);
    });
  }

  // ---------- 演练面板（任务 / 我的作答 / 对照答案 / 判分尺）----------
  function renderDrill(d) {
    var box = $("panel-drill");
    if (!d.drill) { box.innerHTML = ""; return; }
    var dr = d.drill;
    var saved = loadDrill(d.date);
    var caseTag = dr.caseId ? '<span class="drill-case">📂 ' + escapeHtml(dr.caseTitle || dr.caseId) + '</span>' : '';
    var html = '';
    html += '<div class="drill-head"><span class="drill-section sec-' + (dr.section || "") + '">' + escapeHtml(dr.section || "演练") + '</span>' + caseTag + '</div>';
    html += '<div class="drill-task"><div class="drill-task-label">🎯 今日任务</div>' + (dr.task || "") + '</div>';
    html += '<div class="drill-do"><div class="drill-do-label">✍️ 我的作答（自动保存）</div>' +
      '<textarea id="drillText" class="drill-textarea" placeholder="在这里写你的真实作答，网页会自动保存到本浏览器；案例工作簿会把它汇总起来。">' +
      (saved ? escapeHtml(saved.text) : "") + '</textarea>' +
      '<div class="exam-actions"><button class="btn btn-primary" id="saveDrill">保存作答</button>' +
      '<span class="ref-saved" id="drillSaved"></span></div></div>';
    html += '<div class="drill-ref"><button class="btn btn-ghost" id="toggleRef">👀 看对照答案 / 教练示范</button>' +
      '<div class="drill-ref-body" id="drillRefBody" hidden>' + (dr.reference || "<p>（暂无对照）</p>") + '</div></div>';
    if (dr.rubric && dr.rubric.length) {
      html += '<div class="drill-rubric"><div class="drill-rubric-label">📏 判分尺（对照自测，每条做到打勾）</div><ul class="rubric-list">';
      dr.rubric.forEach(function (r) {
        html += '<li><label><input type="checkbox" class="rubric-cb"> ' + escapeHtml(r) + '</label></li>';
      });
      html += '</ul></div>';
    }
    box.innerHTML = html;

    var ta = $("drillText");
    ta.oninput = function () { /* 实时草稿不立刻弹备份，保存时再存 */ };
    $("saveDrill").onclick = function () {
      saveDrill(d.date, ta.value);
      $("drillSaved").textContent = "已保存：" + new Date().toLocaleString();
      renderSidebar(); renderPlan(); scheduleAutoBackup();
    };
    $("toggleRef").onclick = function () {
      var b = $("drillRefBody");
      b.hidden = !b.hidden;
      this.textContent = b.hidden ? "👀 看对照答案 / 教练示范" : "🙈 收起对照答案";
    };
  }

  // ---------- 考试（分批闯关）----------
  function getBatches(d) {
    var ex = d.exam || [];
    var batches = [];
    for (var i = 0; i < ex.length; i += BATCH) {
      batches.push(ex.slice(i, i + BATCH).map(function (q, j) { return { q: q, absIndex: i + j }; }));
    }
    return batches;
  }

  function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
    return true;
  }

  function renderExam(d) {
    var box = $("panel-exam");
    if (!d.exam || !d.exam.length) { box.innerHTML = "<p>暂无考题</p>"; return; }
    var batches = getBatches(d);
    var totalBatches = batches.length;
    if (viewBatch > totalBatches - 1) viewBatch = totalBatches - 1;
    var sc = loadScore(d.date);
    var submitted = (sc && sc.batches) ? sc.batches : {};

    var html = "";
    html += '<div class="exam-report-bar"><button class="btn btn-ghost" id="openReportBtn">🏆 上报成绩到团队榜</button><span class="report-hint">考完可上报，和同事一起排名</span></div>';
    for (var b = 0; b <= viewBatch; b++) {
      html += '<div class="batch-block" data-batch="' + b + '">';
      html += '<div class="batch-head">📝 第 ' + (b + 1) + " 关 / 共 " + totalBatches + " 关（" + batches[b].length + " 题）</div>";
      html += submitted[b] ? renderSubmittedBatch(batches[b], b, submitted[b]) : renderActiveBatch(batches[b], b);
      html += "</div>";
    }

    if (viewBatch < totalBatches - 1) {
      if (submitted[viewBatch]) {
        html += '<div class="exam-more"><button class="btn btn-primary" id="moreBtn">🎯 第 ' + (viewBatch + 1) + " 关已通关！还有精力？解锁第 " + (viewBatch + 2) + " 关（+" + batches[viewBatch + 1].length + " 题）▶</button></div>";
      }
    } else {
      html += '<div class="exam-done">🎉 今日 ' + d.exam.length + " 题已全部解锁，去写心得吧！</div>";
    }

    box.innerHTML = html;
    bindExamEvents(d, batches, submitted);
  }

  function renderActiveBatch(batch, b) {
    var html = "";
    batch.forEach(function (item) {
      var q = item.q, idx = item.absIndex;
      var typeLabel = q.type === "single" ? "单选" : q.type === "multiple" ? "多选" : "简答";
      html += '<div class="exam-q" data-abs="' + idx + '" data-type="' + q.type + '">';
      html += '<div><span class="q-type">' + typeLabel + '</span><span class="q-text">' + (idx + 1) + ". " + escapeHtml(q.q) + "</span></div>";
      if (q.type !== "short") {
        q.options.forEach(function (opt) {
          var it = q.type === "single" ? "radio" : "checkbox";
          html += '<label class="opt"><input type="' + it + '" name="q' + idx + '" value="' + opt.charAt(0) + '">' + escapeHtml(opt) + "</label>";
        });
      } else {
        html += '<textarea class="short-input" data-abs="' + idx + '" rows="3" placeholder="写下你的答案，提交后查看参考要点…" style="width:100%;border:1px solid var(--line);border-radius:8px;padding:8px;font-family:inherit;"></textarea>';
      }
      html += '<div class="analysis" hidden></div>';
      html += '<div class="self-grade" hidden></div>';
      html += "</div>";
    });
    html += '<div class="exam-actions"><button class="btn btn-primary" data-submit="' + b + '">提交本关</button>' +
            '<button class="btn btn-ghost" data-reset="' + b + '">重做本关</button></div>';
    html += '<div class="score-bar" id="scoreBar-' + b + '" hidden></div>';
    return html;
  }

  function renderSubmittedBatch(batch, b, sub) {
    var html = "";
    batch.forEach(function (item) {
      var q = item.q, idx = item.absIndex;
      var res = sub.results ? sub.results[idx] : null;
      var typeLabel = q.type === "single" ? "单选" : q.type === "multiple" ? "多选" : "简答";
      html += '<div class="exam-q locked">';
      html += '<div><span class="q-type">' + typeLabel + '</span><span class="q-text">' + (idx + 1) + ". " + escapeHtml(q.q) + "</span></div>";
      if (q.type !== "short") {
        q.options.forEach(function (opt) {
          var letter = opt.charAt(0);
          var it = q.type === "single" ? "radio" : "checkbox";
          var checked = (res && res.selected && res.selected.indexOf(letter) >= 0) ? "checked" : "";
          var cls = "";
          if (res) {
            var isAnswer = (q.type === "single") ? (letter === q.answer) : (q.answer || []).indexOf(letter) >= 0;
            var isSel = (res.selected || []).indexOf(letter) >= 0;
            if (isAnswer) cls = "correct"; else if (isSel) cls = "wrong";
          }
          html += '<label class="opt ' + cls + '"><input type="' + it + '" ' + checked + ' disabled>' + escapeHtml(opt) + "</label>";
        });
      } else {
        var saved = (res && res.text) ? res.text : "";
        html += '<div class="short-saved">你提交的答案：' + (saved ? escapeHtml(saved) : "（未填写）") + "</div>";
        if (res && res.self) html += '<div class="self-tag ' + (res.self === "ok" ? "tag-ok" : "tag-no") + '">' + (res.self === "ok" ? "✅ 自评已掌握" : "🔁 自评待加强") + "</div>";
      }
      html += '<div class="analysis">' + (q.analysis ? ("<b>解析：</b>" + escapeHtml(q.analysis)) : "") + "</div>";
      html += "</div>";
    });
    html += '<div class="score-bar done">✅ 本关得分 ' + sub.score + "/" + sub.total + ' · <button class="link-btn" data-redo="' + b + '">重做本关</button></div>';
    return html;
  }

  function bindExamEvents(d, batches, submitted) {
    var more = $("moreBtn");
    if (more) more.onclick = function () { viewBatch++; renderExam(d); };

    var openReport = $("openReportBtn");
    if (openReport) openReport.onclick = openReportModal;

    document.querySelectorAll("#panel-exam [data-submit]").forEach(function (btn) {
      btn.onclick = function () { submitBatch(d, batches, parseInt(btn.dataset.submit, 10)); };
    });
    document.querySelectorAll("#panel-exam [data-reset]").forEach(function (btn) {
      btn.onclick = function () { renderExam(d); };
    });
    document.querySelectorAll('#panel-exam [data-redo]').forEach(function (btn) {
      btn.onclick = function () {
        var b = parseInt(btn.dataset.redo, 10);
        var sc = loadScore(d.date) || { batches: {} };
        if (!sc.batches) sc.batches = {};
        delete sc.batches[b];
        recalcTotals(d, sc);
        saveScore(d.date, sc);
        renderExam(d);
      };
    });
    document.querySelectorAll("#panel-exam .short-input").forEach(function (ta) {
      var idx = ta.dataset.abs;
      var ans = loadAns(d.date);
      if (ans[idx] != null) ta.value = ans[idx];
      ta.oninput = function () { var m = loadAns(d.date); m[idx] = ta.value; saveAns(d.date, m); };
    });
  }

  function submitBatch(d, batches, b) {
    var batch = batches[b];
    var dDate = d.date;
    var results = {};
    var correctCount = 0, denom = 0, pending = 0;

    batch.forEach(function (item) {
      var q = item.q, idx = item.absIndex;
      var res = { type: q.type };

      if (q.type === "short") {
        var ta = document.querySelector('#panel-exam .short-input[data-abs="' + idx + '"]');
        var text = ta ? ta.value : "";
        res.text = text;
        var ans = loadAns(dDate); ans[idx] = text; saveAns(dDate, ans);
        var qEl = document.querySelector('#panel-exam .exam-q[data-abs="' + idx + '"]');
        var gradeBox = qEl.querySelector(".self-grade");
        gradeBox.hidden = false;
        gradeBox.innerHTML = '<button class="btn btn-ghost" data-g="ok">✅ 我会了 (+1)</button><button class="btn btn-ghost" data-g="no">🔁 还不会 (0)</button>';
        gradeBox.querySelectorAll("button").forEach(function (b2) {
          b2.onclick = function () {
            res.self = b2.dataset.g;
            if (b2.dataset.g === "ok") correctCount++;
            denom++;
            results[idx] = res;
            finalizeBatch(d, batches, b, results, correctCount, denom, pending);
          };
        });
        pending++;
        results[idx] = res;
        return;
      }

      var inputs = document.querySelectorAll('#panel-exam input[name="q' + idx + '"]');
      var sel = []; inputs.forEach(function (inp) { if (inp.checked) sel.push(inp.value); }); sel.sort();
      res.selected = sel;
      var correct = (q.type === "single") ? (sel.length === 1 && sel[0] === q.answer) : arraysEqual(sel, (q.answer || []).slice().sort());

      var qEl = document.querySelector('#panel-exam .exam-q[data-abs="' + idx + '"]');
      qEl.querySelectorAll(".opt").forEach(function (optEl) {
        var inp = optEl.querySelector("input");
        inp.disabled = true;
        var letter = inp.value;
        var isAnswer = (q.type === "single") ? (letter === q.answer) : (q.answer || []).indexOf(letter) >= 0;
        var isSel = sel.indexOf(letter) >= 0;
        if (isAnswer) optEl.classList.add("correct");
        else if (isSel) optEl.classList.add("wrong");
        if (isSel) optEl.classList.add("selected");
      });
      var ana = qEl.querySelector(".analysis");
      ana.hidden = false; ana.innerHTML = "<b>解析：</b>" + escapeHtml(q.analysis || "");
      if (correct) correctCount++;
      denom++;
      results[idx] = res;
    });

    if (pending === 0) finalizeBatch(d, batches, b, results, correctCount, denom, pending);
  }

  function finalizeBatch(d, batches, b, results, correctCount, denom, pending) {
    var total = batches[b].length;
    var pct = denom ? Math.round(correctCount / denom * 100) : 0;
    var sc = loadScore(d.date) || { batches: {} };
    if (!sc.batches) sc.batches = {};
    sc.batches[b] = { results: results, score: correctCount, total: total, percent: pct };
    recalcTotals(d, sc);
    saveScore(d.date, sc);
    scheduleAutoBackup();
    renderSidebar(); renderPlan();
    renderExam(d);
  }

  function recalcTotals(d, sc) {
    var totalScore = 0, totalQ = 0;
    if (sc.batches) {
      Object.keys(sc.batches).forEach(function (k) {
        totalScore += sc.batches[k].score || 0;
        totalQ += sc.batches[k].total || 0;
      });
    }
    sc.score = totalScore; sc.total = totalQ;
    sc.percent = totalQ ? Math.round(totalScore / totalQ * 100) : null;
    sc.at = Date.now();
  }

  // ---------- 拓展阅读 ----------
  function renderResources(d) {
    var box = $("panel-resources");
    if (!d.resources || !d.resources.length) { box.innerHTML = "<p>暂无拓展阅读</p>"; return; }
    var html = '<p class="ref-hint">以下资源均经检索核对、链接真实可查，延伸理解方法论：</p>';
    d.resources.forEach(function (r) {
      html += '<div class="res-card">' +
        '<div class="res-top">' + escapeHtml(r.type || "📌") + " " + escapeHtml(r.title) + "</div>" +
        '<div class="res-source">' + escapeHtml(r.source || "") + "</div>" +
        '<div class="res-reason">' + escapeHtml(r.reason || "") + "</div>" +
        '<a class="res-link" href="' + escapeHtml(r.link) + '" target="_blank" rel="noopener">🔗 打开来源</a>' +
        "</div>";
    });
    box.innerHTML = html;
  }

  // ---------- 心得 ----------
  function renderReflection(date) {
    var box = $("panel-reflection");
    box.innerHTML =
      '<p class="ref-hint">记录今天的学习心得、疑问或行动点。内容保存在本浏览器本地，便于后续复盘（左侧可统一查看；顶部「导出」可备份）。</p>' +
      '<div class="ref-box"><textarea id="refText" placeholder="今天印象最深的一点是什么？有什么可以马上用到审计工作里的？"></textarea></div>' +
      '<div class="exam-actions"><button class="btn btn-primary" id="saveRef">保存心得</button>' +
      '<span class="ref-saved" id="refSaved"></span></div>';

    try {
      var saved = JSON.parse(localStorage.getItem(refKey(date)) || "null");
      if (saved) { $("refText").value = saved.text; $("refSaved").textContent = "上次保存：" + new Date(saved.at).toLocaleString(); }
    } catch (e) {}

    $("saveRef").onclick = function () {
      var text = $("refText").value;
      try {
        localStorage.setItem(refKey(date), JSON.stringify({ text: text, at: Date.now() }));
        $("refSaved").textContent = "已保存：" + new Date().toLocaleString();
        renderSidebar(); renderPlan();
      } catch (e) { $("refSaved").textContent = "保存失败（浏览器存储不可用）"; }
    };
  }

  // ---------- 全部心得弹窗 ----------
  function openAllRef() {
    var body = $("allRefBody");
    var rows = [];
    MANIFEST.forEach(function (m) {
      try {
        var r = JSON.parse(localStorage.getItem(refKey(m.date)) || "null");
        if (r) rows.push({ date: m.date, day: m.day, title: m.title, text: r.text, at: r.at });
      } catch (e) {}
    });
    if (!rows.length) { body.innerHTML = '<p style="color:var(--ink-soft);margin:0">还没有任何心得，去学习后记录第一条吧～</p>'; }
    else {
      rows.sort(function (a, b) { return b.at - a.at; });
      body.innerHTML = rows.map(function (r) {
        return '<div class="ref-row"><div class="rr-head">Day ' + r.day + " · " + r.date + " · " + escapeHtml(r.title) + "</div>" +
          '<div class="rr-text">' + escapeHtml(r.text || "（空）") + "</div></div>";
      }).join("");
    }
    body.innerHTML += '<div class="modal-foot" style="margin-top:14px;text-align:right"><button class="btn btn-ghost" id="closeAllRefFoot">关闭</button></div>';
    $("closeAllRefFoot").onclick = function () { $("allRefModal").hidden = true; };
    $("allRefModal").hidden = false;
  }

  // ---------- 上报成绩到团队榜 ----------
  function openReportModal() {
    var d = DAYS[currentDate];
    if (!d) return;
    var sc = loadScore(d.date);
    var sum = sc ? (sc.score + "/" + sc.total) : "（请先完成考试）";
    $("reportSummary").innerHTML = "<b>Day " + d.day + " · " + escapeHtml(d.topicTitle) + "</b><br>日期：" + d.date +
      "<br>你的得分：<b>" + sum + "</b>";
    $("reportCopied").textContent = "";
    $("reportName").value = "";
    $("reportDept").value = "";
    $("reportModal").hidden = false;
  }

  function copyAndOpenBoard() {
    var d = DAYS[currentDate];
    if (!d) return;
    var sc = loadScore(d.date);
    var name = ($("reportName").value || "").trim() || "（未填姓名）";
    var dept = ($("reportDept").value || "").trim();
    var score = sc ? (sc.score + "/" + sc.total) : "未考试";
    var line = "【" + (SITE.keyPrefix || "A3") + "学习上报】姓名：" + name + (dept ? "｜部门：" + dept : "") +
      "｜" + d.date + " Day" + d.day + " " + d.topicTitle + "｜得分 " + score;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(line).then(
        function () { $("reportCopied").textContent = "已复制，去榜单粘贴一行即可 ✓"; },
        function () { $("reportCopied").textContent = "复制失败，请手动记录：" + line; }
      );
    } else {
      $("reportCopied").textContent = "请手动复制：" + line;
    }
    window.open(CONFIG.BASE_URL, "_blank");
  }

  // ---------- 案例工作簿（聚合 3 个递进案例的演练产出）----------
  function openWorkbook() {
    var body = $("workbookBody");
    if (!WORKBOOK.length) {
      body.innerHTML = '<p style="color:var(--ink-soft)">暂无案例工作簿配置。</p>';
      $("workbookModal").hidden = false;
      return;
    }
    var html = "";
    WORKBOOK.forEach(function (cs, ci) {
      html += '<div class="wb-case">';
      html += '<div class="wb-case-head"><span class="wb-case-no">案例 ' + (ci + 1) + '</span><span class="wb-case-title">' + escapeHtml(cs.title) + '</span></div>';
      if (cs.intro) html += '<div class="wb-case-intro">' + cs.intro + '</div>';
      (cs.sections || []).forEach(function (sec) {
        var d = DAYS[sec.date];
        var drill = d && d.drill ? d.drill : null;
        var saved = loadDrill(sec.date);
        html += '<div class="wb-sec">';
        html += '<div class="wb-sec-head"><span class="wb-sec-label sec-' + (sec.label) + '">' + escapeHtml(sec.label) + '</span>' +
          '<span class="wb-sec-day">Day ' + (d ? d.day : "?") + ' · ' + sec.date + '</span></div>';
        if (drill && drill.task) html += '<div class="wb-sec-task"><b>任务：</b>' + drill.task + '</div>';
        html += '<div class="wb-sec-mine"><b>我的作答：</b>' + (saved && saved.text ? escapeHtml(saved.text).replace(/\n/g, "<br>") : '<span class="wb-empty">（还没写，去对应那天写）</span>') + '</div>';
        if (drill && drill.reference) html += '<details class="wb-sec-ref"><summary>教练对照答案</summary>' + drill.reference + '</details>';
        html += '</div>';
      });
      html += '</div>';
    });
    body.innerHTML = html;
    $("workbookModal").hidden = false;
  }

  // ---------- 学习档案导出 / 导入 ----------
  function exportArchive() {
    var data = { type: KEY + "-archive", version: 1, at: Date.now(), days: {} };
    MANIFEST.forEach(function (m) {
      var d = m.date;
      var read = function (k) { try { return JSON.parse(localStorage.getItem(k) || "null"); } catch (e) { return null; } };
      data.days[d] = { score: read(scoreKey(d)), ref: read(refKey(d)), ans: read(examAnsKey(d)), drill: read(drillKey(d)) };
    });
    var blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = (SITE.archiveName || "学习档案") + "_" + new Date().toISOString().slice(0, 10) + ".json";
    a.click();
    URL.revokeObjectURL(url);
  }

  function importArchive(file) {
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var data = JSON.parse(reader.result);
        if (!data.days) throw new Error("文件格式不对");
        Object.keys(data.days).forEach(function (d) {
          var dd = data.days[d];
          if (dd.score) localStorage.setItem(scoreKey(d), JSON.stringify(dd.score));
          if (dd.ref) localStorage.setItem(refKey(d), JSON.stringify(dd.ref));
          if (dd.ans) localStorage.setItem(examAnsKey(d), JSON.stringify(dd.ans));
          if (dd.drill) localStorage.setItem(drillKey(d), JSON.stringify(dd.drill));
        });
        renderSidebar(); updateProgress(); renderPlan();
        if (currentDate) { renderExam(DAYS[currentDate]); renderReflection(currentDate); }
        alert("档案已导入：共恢复 " + Object.keys(data.days).length + " 天的数据");
        scheduleAutoBackup();
      } catch (e) { alert("导入失败：" + e.message); }
    };
    reader.readAsText(file);
  }

  function setIfAbsent(key, obj) { if (!localStorage.getItem(key)) localStorage.setItem(key, JSON.stringify(obj)); }
  function setIfAbsentRaw(key, rawVal) { if (!localStorage.getItem(key)) localStorage.setItem(key, rawVal); }

  function importFromText(text) {
    text = (text || "").trim();
    if (!text) { $("importMsg").textContent = "请先粘贴内容"; return; }
    var imported = 0;
    try {
      var obj = JSON.parse(text);
      if (obj && obj.days) {
        Object.keys(obj.days).forEach(function (d) {
          var dd = obj.days[d];
          if (dd.score) setIfAbsent(scoreKey(d), dd.score);
          if (dd.ref) setIfAbsent(refKey(d), dd.ref);
          if (dd.ans) setIfAbsent(examAnsKey(d), dd.ans);
          if (dd.drill) setIfAbsent(drillKey(d), dd.drill);
          imported++;
        });
      } else if (typeof obj === "object" && obj !== null) {
        Object.keys(obj).forEach(function (k) {
          if (k.indexOf(KEY + "_") === 0) { setIfAbsentRaw(k, obj[k]); imported++; }
        });
      }
    } catch (e) {
      text.split(/\r?\n/).forEach(function (ln) {
        var m = ln.match(new RegExp("^(" + KEY + "_[A-Za-z0-9_]+)\\s*[:=]\\s*(.*)$")) || ln.match(new RegExp("^(" + KEY + "_[A-Za-z0-9_]+)\\t(.*)$"));
        if (m) { setIfAbsentRaw(m[1], m[2]); imported++; }
      });
    }
    if (!imported) { $("importMsg").textContent = "没识别到 " + KEY + "_ 开头的数据，请确认粘贴内容来自 DevTools 的 localStorage"; return; }
    renderSidebar(); updateProgress(); renderPlan();
    if (currentDate) { renderExam(DAYS[currentDate]); renderReflection(currentDate); }
    $("importMsg").textContent = "✅ 成功恢复 " + imported + " 条数据，已合并进本浏览器（原有数据不会被覆盖）";
    scheduleAutoBackup();
  }

  // ---------- 自动备份（防换网址丢分） ----------
  var AUTO_BACKUP_NAME = (SITE.archiveName || "学习档案") + "-自动备份.json";
  var _backupTimer = null;
  function buildArchive() {
    var data = { type: KEY + "-archive", version: 1, at: Date.now(), days: {} };
    MANIFEST.forEach(function (m) {
      var d = m.date;
      var read = function (k) { try { return JSON.parse(localStorage.getItem(k) || "null"); } catch (e) { return null; } };
      data.days[d] = { score: read(scoreKey(d)), ref: read(refKey(d)), ans: read(examAnsKey(d)), drill: read(drillKey(d)) };
    });
    return data;
  }
  function triggerBackupDownload() {
    var data = buildArchive();
    var blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url; a.download = AUTO_BACKUP_NAME; document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  }
  function showBackupToast() {
    var t = $("backupToast");
    if (!t) { t = document.createElement("div"); t.id = "backupToast"; t.className = "backup-toast"; document.body.appendChild(t); }
    t.textContent = "✅ 已自动备份到下载文件夹（换网址后用「📥 导入」恢复）";
    t.classList.add("show");
    clearTimeout(t._h); t._h = setTimeout(function () { t.classList.remove("show"); }, 3200);
  }
  function scheduleAutoBackup() {
    try { localStorage.setItem(KEY + "_lastbackup_at", String(Date.now())); } catch (e) {}
    if (_backupTimer) clearTimeout(_backupTimer);
    _backupTimer = setTimeout(function () {
      try { triggerBackupDownload(); } catch (e) {}
    }, 1500);
  }

  // ---------- 事件绑定 ----------
  function bind() {
    $("showAllRefBtn").onclick = openAllRef;
    $("closeAllRef").onclick = function () { $("allRefModal").hidden = true; };
    $("allRefModal").addEventListener("click", function (e) { if (e.target === $("allRefModal")) $("allRefModal").hidden = true; });

    $("teamBoardBtn").onclick = function () { window.open(CONFIG.BASE_URL, "_blank"); };
    $("copyReport").onclick = copyAndOpenBoard;
    $("closeReport").onclick = function () { $("reportModal").hidden = true; };
    $("reportModal").addEventListener("click", function (e) { if (e.target === $("reportModal")) $("reportModal").hidden = true; });

    $("workbookBtn").onclick = openWorkbook;
    $("closeWorkbook").onclick = function () { $("workbookModal").hidden = true; };
    $("workbookModal").addEventListener("click", function (e) { if (e.target === $("workbookModal")) $("workbookModal").hidden = true; });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        if (!$("allRefModal").hidden) $("allRefModal").hidden = true;
        if (!$("reportModal").hidden) $("reportModal").hidden = true;
        if (!$("importModal").hidden) $("importModal").hidden = true;
        if (!$("workbookModal").hidden) $("workbookModal").hidden = true;
      }
    });

    $("exportBtn").onclick = exportArchive;
    $("importBtn").onclick = function () { $("importModal").hidden = false; };
    $("closeImport").onclick = function () { $("importModal").hidden = true; };
    $("importModal").addEventListener("click", function (e) { if (e.target === $("importModal")) $("importModal").hidden = true; });
    $("pickFileBtn").onclick = function () { $("importFile").click(); };
    $("importFile").onchange = function (e) { if (e.target.files[0]) importArchive(e.target.files[0]); e.target.value = ""; };
    $("importTextBtn").onclick = function () { importFromText($("importText").value); };

    document.querySelectorAll(".tab").forEach(function (t) {
      t.onclick = function () { switchTab(t.dataset.tab); };
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { bind(); boot(); });
  else { bind(); boot(); }
})();
