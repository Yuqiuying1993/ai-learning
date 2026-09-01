// Day 12 结构化数据（网页版）。由「AI 应用教练」专家生成并经飞书推送。
window.AI_DAYS = window.AI_DAYS || {};
window.AI_DAYS["2026-08-31"] = {
  date: `2026-08-31`,
  day: 12,
  topicIndex: 11,
  topicTitle: `文档解析技能：OCR 与合同结构化提取`,
  oneLiner: `审计底稿的源头是"文件"，但文件散成 PDF/扫描件/图片就抓不出字段。今天把本地 document-parsing 技能的 OCR + 结构化 schema + 质量评估编成你自己的"文档解析"技能——让 AI 把扫描合同变成可检索、可比对的结构化 JSON。`,
  learning: `
    <p class="lead">设计视角：Day 6–11 你做了五个专项技能，其中 Day 9 证据管理、Day 11 数据分析都提到"原始文档先解析再处理"。今天进入<b>阶段二·审计场景专项技能</b>第七条主线——<b>文档解析</b>。它解决的是所有专项的"源头问题"：审计证据大量是 PDF/扫描件/图片，<b>不解析就抽不出字段、比对不了、进不了证据链</b>。学完今天，你会用本地 <b>document-parsing</b> 技能的 OCR、结构化 schema、质量评估，把它直接编成你自己的"文档解析"技能。</p>

    <h3>一、先立住一个认知：解析不是"转文字"，是"建结构"</h3>
    <p><b>OCR（光学字符识别）</b>：把图片/扫描 PDF 变成可检索文字。<b>结构化提取（Structured Extraction）</b>：从文字里按 schema 抽字段（甲方/金额/违约条款/签署日）。<b>质量评估</b>：对解析结果打分（清晰度/完整度/字段置信度）。三者关系：<b>OCR 是地基，结构化是产出，质量评估是闸门</b>——OCR 糊了，结构化必丢字段。</p>
    <div class="key-point">一句话立住：<b>文档解析技能 = OCR 引擎 + 结构化 schema + 质量闸门。它不替你读合同，只保证"扫得清、抽得全、字段可比对、低质量必报警"，把图片变成可进 Day 9 证据链的结构化资产。</b></div>

    <h3>二、核心机制 1：OCR 与类型识别</h3>
    <p>照你本地 <b>document-parsing</b> 技能，先识别文档类型（合同/凭证/发票/纪要），再选解析路径：</p>
    <ul>
      <li><b>文本型 PDF</b>：直接抽文本层，无需 OCR；</li>
      <li><b>扫描型/图片型</b>：OCR 识别 → 文字层；</li>
      <li><b>表格/多栏</b>：版式分析保结构，避免串行错乱；</li>
      <li><b>手写/印章</b>：单独标注，低置信度字段必人工复核。</li>
    </ul>
    <p>最易错的是<b>把 OCR 结果当 100% 可靠</b>——模糊、印章遮挡、表格串行都会丢字段。</p>

    <h3>三、核心机制 2：结构化 schema 与字段抽取</h3>
    <p>按文档类型套 schema 抽字段，例如合同：</p>
    <ol>
      <li><b>主体字段</b>：甲方/乙方/统一信用代码/签署日；</li>
      <li><b>金额字段</b>：总价/付款节点/币种/违约金比例；</li>
      <li><b>条款字段</b>：交货期/验收/保密/争议解决/终止；</li>
      <li><b>关系字段</b>：担保方/关联方/签署人授权。</li>
    </ol>
    <p>抽出的字段写入结构化 JSON（对应 Day 9 的 parsed/ 与 EV 节点），<b>字段缺失即报警</b>。</p>
    <div class="key-point">结构化提取的可计算定义：每字段带"值 + 来源坐标 + 置信度"；置信度低于阈值或 schema 必填缺失 → 标"待人工复核"。这正是 Day 9 证据可信度 + Day 11 异常检测在文档层的落地——解析质量也是"可信度"。</div>

    <h3>四、核心机制 3：质量评估 + 版本写入</h3>
    <p>质量评估三指标：<b>清晰度</b>（OCR 可否读）、<b>完整度</b>（必填字段齐全否）、<b>字段置信度</b>（均值与最低）。低质量文档不进证据链，先退回重扫。结果按<b>版本写入</b>（raw → parsed → 人工校正版），保留可追溯。</p>

    <h3>五、为什么重要（业务 + 审计双视角）</h3>
    <p><b>业务视角</b>：合同/凭证散成扫描件，人工录字段慢且错；结构化后可直接比对、预警（如违约条款、关联担保）。</p>
    <p><b>审计视角</b>：未解析的原始文档无法进证据链（Day 9 明确"原始文档先解析再建 EV"）。今天这套把"文档"从图片变成可检索、可比对、可呈堂的结构化证据。</p>

    <h3>六、实操步骤：把"文档解析技能"亲手造出来</h3>
    <ol>
      <li><b>写 description（触发词）</b>："帮我把这份扫描合同结构化提取""这张发票 OCR 后抽金额和税号""这份 PDF 字段置信度低，标待复核""两份合同做条款比对"。</li>
      <li><b>列输入</b>：PDF/扫描件/图片（合同/凭证/发票/纪要）。</li>
      <li><b>编码类型识别 + OCR</b>：文本型直抽、扫描型 OCR、表格保版式、手写印章标注。</li>
      <li><b>编码 schema 抽取</b>：按类型套字段 schema，输出"值+坐标+置信度"，必填缺失报警。</li>
      <li><b>编码质量评估</b>：清晰度/完整度/置信度三指标 → 低质量退回重扫，版本写入 raw/parsed/校正。</li>
      <li><b>references 沉淀</b>：document-parsing 的 ocr / structured-extraction / quality-assessment 三篇，对齐 Day 9（EV 节点）、Day 11（字段比对）。</li>
    </ol>

    <h3>七、反模式（文档解析技能专属坑）</h3>
    <ul>
      <li><b>OCR 当 100% 可靠</b>：模糊/印章遮挡字段直接信 → 进证据链出错；</li>
      <li><b>不套 schema 全量抽</b>：只转文字不抽字段 → 无法比对、进不了 EV；</li>
      <li><b>表格串行不保版式</b>：多栏合同串行错乱 → 字段张冠李戴；</li>
      <li><b>低质量硬进链</b>：置信度低不报警 → 违反 Day 9 可信度；</li>
      <li><b>手写印章不标注</b>：当高置信 → 实际需人工；</li>
      <li><b>不留版本</b>：raw/parsed/校正混一 → 不可追溯、不可复核。</li>
    </ul>

    <h3>八、生活化例子：技能 = 文档的"扫描仪 + 档案员 + 质检员"</h3>
    <p>以前处理扫描合同像"拿眼睛逐行读"——慢、错、比不了；现在技能是<b>扫描仪</b>（OCR 转文字）+ <b>档案员</b>（按 schema 抽字段建 JSON）+ <b>质检员</b>（三指标打分、低质量报警）。它不替你审合同，只保证"扫得清、抽得全、字段可比对、低质量必报警"——这正是 Day 9 可呈堂证据在文档层的前置。</p>

    <div class="key-point">一句话记住：<b>文件散成 PDF/扫描件就抓不出字段。把"OCR + 结构化 schema（值/坐标/置信度）+ 质量三指标闸门 + 版本写入"编成技能，让 AI 把扫描合同变成可检索、可比对、可进证据链的结构化 JSON——扫得清、抽得全、低质量必报警。</b></div>
  `,
  exam: [
    {
      type: "single",
      q: `文档解析技能中，OCR、结构化提取、质量评估的正确关系是？`,
      options: [`A. 结构化是地基、OCR 是产出`, `B. OCR 是地基、结构化是产出、质量评估是闸门`, `C. 质量评估最重要、其余可选`, `D. 三者独立无关系`],
      answer: "B",
      analysis: `OCR 把图片变文字（地基），结构化按 schema 抽字段（产出），质量评估做闸门（低质量报警）。A 因果倒置；C/D 错。`
    },
    {
      type: "multiple",
      q: `结构化提取的合同字段，通常包括？（多选）`,
      options: [`A. 主体字段（甲方/乙方/信用代码）`, `B. 金额字段（总价/付款节点/违约金）`, `C. 条款字段（交货/验收/争议解决）`, `D. 关系字段（担保方/关联方）`],
      answer: ["A", "B", "C", "D"],
      analysis: `合同 schema 抽四类字段：主体/金额/条款/关系。四项都正确，且字段应带"值+坐标+置信度"，必填缺失即报警。`
    },
    {
      type: "single",
      q: `一份 OCR 结果清晰度差、某必填字段置信度仅 0.3，正确做法是？`,
      options: [`A. 直接进 Day 9 证据链`, `B. 标"待人工复核"并退回重扫`, `C. 忽略低置信字段`, `D. 用默认值填充`],
      answer: "B",
      analysis: `低质量文档不进证据链，先退回重扫；字段低置信标待人工复核。A 违反 Day 9 可信度；C/D 造假/失真，不可取。`
    },
    {
      type: "short",
      q: `简述质量评估三指标（清晰度/完整度/字段置信度）各自衡量什么，并说明"版本写入"为何重要。`,
      answer: null,
      analysis: `参考要点：清晰度=OCR 可否读（模糊/遮挡）；完整度=必填字段是否齐全；字段置信度=各字段识别把握（均值与最低）。版本写入=raw(原图)→parsed(初解析)→校正(人工改)三版留存，保证可追溯、可复核、可回滚——呼应 Day 9 ALCOA 原始/当时记录，也避免"解析覆盖原图说不清改了啥"。`
    },
    {
      type: "multiple",
      q: `下列属于文档解析反模式的有？（多选）`,
      options: [`A. 把 OCR 结果当 100% 可靠`, `B. 多栏表格不保版式导致串行`, `C. 手写/印章单独标注低置信`, `D. 低质量文档硬进证据链`],
      answer: ["A", "B", "D"],
      analysis: `A 模糊/印章字段直接信→出错；B 表格串行→字段张冠李戴；D 低质量进链→违反 Day 9 可信度。C 是正确做法（手写印章标低置信待人工），非反模式。`
    },
    {
      type: "single",
      q: `文本型 PDF 与扫描型 PDF 的解析路径，主要区别是？`,
      options: [`A. 文本型需 OCR、扫描型直接抽`, `B. 扫描型需 OCR、文本型直接抽文字层`, `C. 两者都需 OCR`, `D. 两者都不需 OCR`],
      answer: "B",
      analysis: `文本型 PDF 已有文字层，直接抽取无需 OCR；扫描型/图片型先 OCR 成文字再结构化。选 A 因果反了。`
    },
    {
      type: "multiple",
      q: `文档解析技能与 Day 9 证据管理、Day 11 数据分析的衔接，正确的有？（多选）`,
      options: [`A. 解析结果建 EV 节点进证据链`, `B. 解析出的字段可直接做 Day 11 异常比对`, `C. 低质量解析标待复核，不进链`, `D. 解析替代了人工审合同`],
      answer: ["A", "B", "C"],
      analysis: `解析结果建 EV 节点（Day 9）、字段供 Day 11 比对、低质量不进链。D 错：解析不替代人工审合同，只把图片变结构化资产，人保留裁决。`
    },
    {
      type: "short",
      q: `用你一份真实扫描合同，演示"OCR → 结构化 → 质量评估 → 进证据链"：抽哪些字段、哪类低质量会报警、如何版本写入。`,
      answer: null,
      analysis: `参考要点：扫描版采购合同→OCR 转文字（印章遮挡处标注）→套合同 schema 抽甲方/乙方/总价/付款节点/违约金/担保方（值+坐标+置信度）→质量评估：清晰度可、完整度缺"签署日"(遮挡)、置信度最低0.4 → 标待人工复核、退回重扫；版本写入 raw(扫描图)/parsed(初抽)/校正(补签署日)。校正版建 EV 节点接 Day 9 证据注册表。`
    },
    {
      type: "single",
      q: `结构化字段"带来源坐标"的主要目的是？`,
      options: [`A. 美观`, `B. 可追溯、可复核（值从哪页哪行来）`, `C. 减小文件`, `D. 加快 OCR`],
      answer: "B",
      analysis: `来源坐标让每个字段可回溯到原文位置，保证可复核、可呈堂，呼应 Day 9 证据可采性与 ALCOA。非装饰或性能考虑。`
    },
    {
      type: "multiple",
      q: `关于"版本写入 raw/parsed/校正"，正确的包括？（多选）`,
      options: [`A. 保留原图不被覆盖`, `B. 记录人工改了什么`, `C. 支持回滚与复核`, `D. 三版混一更省空间`],
      answer: ["A", "B", "C"],
      analysis: `版本写入=raw(原图)→parsed(初解析)→校正(人工)三版分离，保证原图不丢、改动能追溯、可回滚复核。D 错：混一会破坏可追溯，违反 Day 9 ALCOA。`
    }
  ],
  aiBriefing: `
    <h3>🤖 今日 AI 速览（精选 · 防滞后雷达）</h3>
    <div class="key-point"><b>说明</b>：以下 3 条均来自今日联网检索的真实动态（2026-08 末），与"OCR/扫描文档解析/把非结构化文件变结构化可分析"强相关——行业正把"接地扫描 PDF + 自动校验 + 结构化抽取"做成生产级能力，恰好印证今天文档解析技能的"OCR + 结构化 schema + 质量闸门"。</div>
    <ul>
      <li><b>① Google Workspace Studio：声明式 agent 能"接地"到扫描 PDF（2026 末八月）</b>：Google 给 Workspace 的 flows/agents 加了企业级安全与身份控制，其中声明式 agent 可直接"ground in scanned PDFs"——即把扫描件当成可检索、可推理的知识源（来源：aiagentstore.ai 商业自动化周报）。<br><span class="hint">为什么和你相关：这正是今天"扫描件→结构化→可比对"的工业级范本——Google 让 agent 直接吃扫描 PDF，和你 document-parsing 把图片变 EV 节点同构；配 DLP + 审计日志还顺带解决保密红线。</span></li>
      <li><b>② Microsoft 365 Copilot：Excel 内 Python + 扫描 PDF 接地（2026-08-25）</b>：Copilot 新能力包括 Excel 中直接执行 Python、声明式 agent 可接地到扫描版 PDF，把分析/异常检测延伸到"非结构化文件也能算"的场景（来源：aiagentstore.ai / Microsoft 365 发布说明）。<br><span class="hint">为什么和你相关：昨天你用 Python 跑异常检测，今天补上"扫描 PDF 也能进分析"——两类能力拼起来，就是"文档解析→字段抽取→异常比对"的完整链路，省去人工录字段。</span></li>
      <li><b>③ Coupa「发票附件校验 Agent」：附件 vs 发票交叉比对（2026-08-20）</b>：Invoice Attachment Validation Agent 自动把发票附件明细与发票记录交叉引用，做 approve/reject（来源：Coupa 九月版新闻稿）。<br><span class="hint">为什么和你相关：它前提是"发票/附件先被结构化解析"——你的文档解析技能抽出的字段，正是它 cross-reference 的原料；今天学的 schema 抽取，是这类自动校验的上游。低质量解析（昨天质量三指标）会直接拖垮下游校验。</span></li>
    </ul>
  `,
  caseStudy: `
    <h3>案例：把"OCR + 结构化 + 质量闸门"做成文档解析技能</h3>
    <div class="key-point"><b>本案例与今天主题的关系</b>：今天学"把 OCR + 结构化 schema + 质量三指标闸门 + 版本写入编成技能"。这个案例用 Day 6 指定供应商 Z 的扫描合同，演示如何拿 document-parsing 把图片变结构化 JSON 并接 Day 9 证据链——正是 Day 12 要你亲手做的那种"文档解析"技能。</div>

    <h4>背景（为什么需要它）</h4>
    <p>审计调证收到 Z 的采购合同，是盖章扫描 PDF + 一张手写补充协议照片。过去靠人眼逐行读，慢、易错、比不了，也进不了 Day 9 证据链（原始文档未解析）。</p>

    <h4>技能怎么解析（核心机制落地）</h4>
    <ol>
      <li><b>类型识别 + OCR</b>：扫描合同 OCR 转文字（印章遮挡处标注低置信）；手写补充协议单独标注"需人工"。</li>
      <li><b>schema 抽取</b>：套合同 schema 抽甲方/乙方/总价/付款节点/违约金/担保方（值+坐标+置信度）。</li>
      <li><b>质量评估</b>：清晰度可、完整度缺"签署日"(印章遮挡)、字段置信度最低 0.4 → 标待人工复核、退回重扫。</li>
      <li><b>版本写入</b>：raw(扫描图)→parsed(初抽)→校正(补签署日)，三版分离。</li>
      <li><b>进证据链</b>：校正版建 EV 节点，字段供 Day 11 比对（发现违约金比例与制度不符）。</li>
    </ol>

    <h4>踩过的坑（文档解析专属反模式）</h4>
    <ul>
      <li>初版<b>OCR 当 100% 可靠</b>：印章遮挡的"签署日"误读 → 进链出错，被 Day 9 打回；</li>
      <li><b>表格串行不保版式</b>：多栏付款节点串行错乱 → 字段张冠李戴；</li>
      <li><b>不留版本</b>：parsed 覆盖原图 → 说不清改了啥，不可追溯。</li>
    </ul>

    <h4>带来的改变（对照"拿眼睛逐行读"）</h4>
    <table class="tbl">
      <thead><tr><th>维度</th><th>人眼逐行读</th><th>文档解析技能</th></tr></thead>
      <tbody>
        <tr><td>速度</td><td>慢</td><td>秒级结构化</td></tr>
        <tr><td>质量</td><td>易错、漏印章</td><td>三指标闸门报警</td></tr>
        <tr><td>可比对</td><td>难</td><td>字段 JSON 直接比</td></tr>
        <tr><td>可呈堂</td><td>说不清来源</td><td>值+坐标+版本可追溯</td></tr>
      </tbody>
    </table>

    <h4>给审计人的启示</h4>
    <ul>
      <li><b>解析是证据的源头闸</b>——OCR 糊了结构化必丢，低质量必报警；</li>
      <li><b>字段带坐标才可信</b>：可回溯呼应 Day 9 ALCOA；</li>
      <li><b>版本写入不可省</b>：这正是 Google 扫描 PDF 接地、Copilot 扫描 PDF 分析、Coupa 附件校验三条行业动态共同指向的"非结构化→结构化→可分析"链路上游。</li>
    </ul>
  `,
  resources: [
    { type: `📘`, title: `本地技能：document-parsing（OCR + 结构化 + 质量评估）`, source: `WorkBuddy 技能库`, reason: `今天全套机制的权威源，做"文档解析技能"前务必读 ocr / structured-extraction / quality-assessment 三篇。`, link: `https://www.workbuddy.cn/docs/workbuddy/Skills` },
    { type: `📰`, title: `Google Workspace Studio：声明式 agent 接地扫描 PDF`, source: `aiagentstore.ai 商业自动化周报`, reason: `扫描件当可推理知识源的工业级范本，对应今天 OCR+结构化+可追溯。`, link: `https://aiagentstore.ai/ai-agent-news/topic/business-automation/2026-05-19/detailed` },
    { type: `📰`, title: `Microsoft 365 Copilot：Excel Python + 扫描 PDF 接地`, source: `aiagentstore.ai / Microsoft 发布说明`, reason: `文档解析接异常检测，拼成"解析→抽取→比对"完整链路。`, link: `https://aiagentstore.ai/ai-agent-news/topic/workforce-impact-business-side` },
    { type: `📰`, title: `Coupa Invoice Attachment Validation（附件 vs 发票交叉比对）`, source: `Coupa 新闻稿`, reason: `文档解析抽出的字段是其 cross-reference 原料，今天是它的上游。`, link: `https://www.coupa.com/newsroom/coupas-september-release-accelerates-agentic-spend-capabilities` },
    { type: `🔎`, title: `搜索「OCR 合同结构化抽取 字段 schema 质量评估 审计」`, source: `联网检索入口`, reason: `取权威口径与 schema 设计，深化"结构化 + 质量三指标"的可计算方法。`, link: `https://www.bing.com/search?q=OCR+%E5%90%88%E5%90%8C%E7%BB%93%E6%9E%84%E5%8C%96%E6%8A%BD%E5%8F%96+%E5%AD%97%E6%AE%B5schema+%E8%B4%A8%E9%87%8F%E8%AF%84%E4%BC%B0` }
  ]
};
