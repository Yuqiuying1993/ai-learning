// Day 9 结构化数据（网页版）。由「AI 应用教练」专家生成并经飞书推送。
window.AI_DAYS = window.AI_DAYS || {};
window.AI_DAYS["2026-08-28"] = {
  date: `2026-08-28`,
  day: 9,
  topicIndex: 8,
  topicTitle: `证据管理技能：证据链与可信度评分`,
  oneLiner: `查得再多，证据链一断、可信度说不清，结论就站不住。今天把本地 evidence-management 技能的证据全生命周期、保管链、可采性评分编成你自己的"证据管理"技能——让 AI 帮你管链、打分、出可呈堂底稿。`,
  learning: `
    <p class="lead">设计视角：Day 7 你用"事实 vs 推论"搭了调查推理技能，Day 8 用 7 把尺子做了问题定位技能。今天进入<b>阶段二·审计场景专项技能</b>的第四条主线——<b>证据管理</b>。它解决的是前两天的"地基问题"：推理再漂亮、定位再准，<b>证据链断了、可信度评不出来，一切归零</b>。学完今天，你会用本地 <b>evidence-management</b> 技能的全生命周期、链式保管(Chain of Custody)、可采性评估，把它直接编成你自己的"证据管理"技能。</p>

    <h3>一、先立住两个概念：证据链 ≠ 一堆材料</h3>
    <p><b>证据链（Chain of Custody）</b>：从"原始证据"到"可呈堂底稿"的保管轨迹——每件证据都有完整的提取人、时间、方式、哈希值、移交记录。<b>可信度评分</b>：对每份证据的"能不能用、证明力多强"做可计算判断，而不是凭感觉说"这证据挺硬"。</p>
    <div class="key-point">一句话立住：<b>证据管理是调查的"产品线"——识别→收集→保全→记录→分析→保管→呈现→归档。链不断、分可采、底稿合规，结论才站得住；这三项任何一项塌了，前面的推理和定位全白费。</b></div>

    <h3>二、核心机制 1：证据全生命周期与链式保管</h3>
    <p>照你本地 <b>evidence-management</b> 技能，证据按形式（书证/电子证据/物证/证言/视听/专家）和证明力（直接/间接/佐证）分类。<b>保管五原则</b>：</p>
    <ul>
      <li>① 最少经手人；② 每次交接必签名；③ 封存完好；④ 电子证据加哈希；⑤ 环境可控。</li>
    </ul>
    <p>最关键环节是<b>链式保管记录</b>：每件证据都要能回溯"谁、何时、用什么方式、怎么移交"，一旦断点，证据的可信度直接打折甚至不被采。</p>

    <h3>三、核心机制 2：可信度评分 = 可采性四级过滤 + SPIRIT</h3>
    <p>给证据打分不是拍脑袋，而是两层过滤：</p>
    <ol>
      <li><b>可采性四级过滤（顺序固定）</b>：相关性 → 合法性 → 可靠性 → 最优性。一级不过即淘汰，不进入下一级。</li>
      <li><b>SPIRIT 充分性框架</b>：Sufficient（充分）/ Pertinent（相关）/ Independent（独立）/ Reliable（可靠）/ Integrity（完整）/ Timeliness（及时）——六维判断"这份证据够不够撑起一个结论"。</li>
    </ol>
    <div class="key-point">可信度评分的可计算定义：<b>可采性四级全过 + SPIRIT 六维达标 + 保管链无断点</b> = 高可信；任一级不过或链有断点 = 降档并标注"待补/待复核"。这正是 Day 7 "置信度随证据更新"的底层支撑。</div>

    <h3>四、核心机制 3：底稿标准与证据结构</h3>
    <p>底稿遵循 <b>ALCOA 原则</b>：Attributable（可归责）/ Legible（清晰）/ Contemporaneous（当时记录）/ Original（原始）/ Accurate（准确）。证据结构化用 <b>证据注册表（evidence_registry.json）</b> + <b>推理节点 nodes/</b>：7 种节点类型 EV（证据）/ LS（逻辑步骤）/ ARG（论证）/ FND（发现）/ ENT（实体）/ HYP（假设）/ EVT（事件），通过 frontmatter 的 relations 声明 8 种关系（supports/contradicts/derived_from…）。状态机：draft → ready（仅人工）→ superseded。</p>

    <h3>五、为什么重要（业务 + 审计双视角）</h3>
    <p><b>业务视角</b>：证据链断、底稿不合规，对内复议翻案、对外（监管/司法）不被采，前面所有投入归零，还可能惹法律风险。</p>
    <p><b>审计视角</b>：可采性 + ALCOA + 保管链，是审计底稿"经得起复议、监管、法庭检验"的三道闸。今天这套，把"证据管理"从个人习惯变成可复用、可传授的技能。</p>

    <h3>六、实操步骤：把"证据管理技能"亲手造出来</h3>
    <ol>
      <li><b>写 description（触发词）</b>："帮我给这份证据做可信度评分""这条证据链有没有断点""这份底稿符不符合 ALCOA""原始文档 PDF 帮我解析建 EV 节点"。</li>
      <li><b>列输入</b>：凭证/流水/合同/工商/通信/系统日志，以及原始文档（PDF/扫描件/图片）。</li>
      <li><b>编码证据结构</b>：证据注册表 + 推理节点（EV/LS/ARG/FND/ENT/HYP/EVT）+ 8 种关系。</li>
      <li><b>编码评分逻辑</b>：可采性四级过滤 + SPIRIT 六维 + 保管链完整性 → 输出"可信度评级 + 缺口"。</li>
      <li><b>references 沉淀</b>：evidence-management 的 evidence-collection-and-custody.md、admissibility-assessment.md、working-paper-standards.md（ALCOA）、document-parsing（原始文档先解析再建 EV）。</li>
    </ol>

    <h3>七、反模式（证据管理技能专属坑）</h3>
    <ul>
      <li><b>链断点</b>：证据交接无签名/无哈希 → 可信度直接打折；</li>
      <li><b>可采性跳级</b>：不合法（偷录/越权获取）的证据硬用 → 一级不过全盘不被采；</li>
      <li><b>SPIRIT 不全</b>：只看"相关"忽略"独立/完整" → 单一来源、缺反证；</li>
      <li><b>底稿非原始</b>：抄录走样、非当时记录 → 违反 ALCOA；</li>
      <li><b>原始文档不解析直接用</b>：PDF/扫描件先经 document-parsing 解析为结构化 JSON 再建 EV，否则易丢字段；</li>
      <li><b>节点关系乱造边文件</b>：关系应在节点 frontmatter 内声明，不在独立边文件里。</li>
    </ul>

    <h3>八、生活化例子：技能 = 证据的"仓库管理员 + 质检员"</h3>
    <p>以前管证据像"抽屉里塞材料"，要用时找不到来源、说不清可信度；现在技能是<b>仓库管理员</b>（每件贴标签、记流转、加哈希）+ <b>质检员</b>（四级过滤 + SPIRIT 打分、链有断点就报警）。它不替你下结论，只保证你拿出的每份证据都"链不断、分可采、底稿合规"——这就是调查底稿能呈堂的地基。</p>

    <div class="key-point">一句话记住：<b>查得再多，证据链一断、可信度说不清就归零。把"全生命周期 + 保管链五原则 + 可采性四级过滤 + SPIRIT + ALCOA"编成技能，让 AI 帮你管链、打分、出可呈堂底稿——链不断、分可采、底稿合规，结论才站得住。</b></div>
  `,
  exam: [
    {
      type: "single",
      q: `在证据管理中，链式保管（Chain of Custody）最关键的环节是？`,
      options: [`A. 证据数量统计`, `B. 每件证据有完整的提取人/时间/方式/哈希/移交记录`, `C. 证据命名规范`, `D. 证据分类标签`],
      answer: "B",
      analysis: `链式保管的核心是可回溯的保管轨迹：每件证据都要有提取人、时间、方式、哈希值、移交记录。一旦断点，可信度直接打折甚至不被采。A/C/D 是辅助管理，不是最关键的"链完整性"。`
    },
    {
      type: "multiple",
      q: `下列属于"保管五原则"的有？（多选）`,
      options: [`A. 最少经手人`, `B. 每次交接必签名`, `C. 电子证据加哈希`, `D. 证据越多越好、随意调阅`],
      answer: ["A", "B", "C"],
      analysis: `保管五原则：①最少经手人 ②每次交接必签名 ③封存完好 ④电子证据加哈希 ⑤环境可控。A/B/C 符合；D 错：随意调阅破坏"最少经手人+环境可控"，且证据多≠好。`
    },
    {
      type: "single",
      q: `证据"可采性四级过滤"的正确顺序是？`,
      options: [`A. 合法性→相关性→可靠性→最优性`, `B. 相关性→合法性→可靠性→最优性`, `C. 可靠性→相关性→合法性→最优性`, `D. 最优性→可靠性→合法性→相关性`],
      answer: "B",
      analysis: `四级过滤顺序固定：相关性 → 合法性 → 可靠性 → 最优性。一级不过即淘汰，不进入下一级。合法性（如非法取证）在相关性之后、可靠性之前——先问"跟案子有关吗"，再问"取得合法吗"。`
    },
    {
      type: "short",
      q: `简述 SPIRIT 充分性框架的六个维度，并说明它用来判断什么。`,
      answer: null,
      analysis: `参考要点：Sufficient 充分 / Pertinent 相关 / Independent 独立 / Reliable 可靠 / Integrity 完整 / Timeliness 及时。它用于判断"这份证据是否足够撑起一个结论"——不只看相关，还要独立（非单一来源）、完整（含反证）、及时（时窗对）。与可采性四级过滤配合，构成"可信度评分"的两层逻辑。`
    },
    {
      type: "multiple",
      q: `关于审计底稿的 ALCOA 原则，正确的包括？（多选）`,
      options: [`A. Attributable 可归责（谁做的清楚）`, `B. Contemporaneous 当时记录（非事后补）`, `C. Original 原始（非抄录走样）`, `D. Accurate 准确`],
      answer: ["A", "B", "C", "D"],
      analysis: `ALCOA=A(可归责) L(清晰) C(当时记录) O(原始) A(准确)。A/B/C/D 分别对应 A、C、O、A（最后一个 Accurate），四项都正确。底稿违反任一项（如事后补录、抄录走样）即不合规。`
    },
    {
      type: "single",
      q: `在 evidence-management 的推理节点状态机中，节点从 draft 到 superseded 之间必须经过哪个状态？`,
      options: [`A. approved（自动）`, `B. ready（仅人工）`, `C. published`, `D. archived`],
      answer: "B",
      analysis: `状态机：draft → ready（仅人工）→ superseded。ready 必须由人工确认，不能自动流转——这保证了"证据/结论进入可用状态"有人把关，呼应 Day 7 "人保留最终裁决权"。`
    },
    {
      type: "multiple",
      q: `下列节点类型中，属于 evidence-management 推理节点 7 种类型的有？（多选）`,
      options: [`A. EV（证据）`, `B. FND（发现）`, `C. HYP（假设）`, `D. PDF（文档）`],
      answer: ["A", "B", "C"],
      analysis: `7 种节点：EV 证据 / LS 逻辑步骤 / ARG 论证 / FND 发现 / ENT 实体 / HYP 假设 / EVT 事件。A/B/C 正确；D 的 PDF 不是节点类型——PDF 是原始文档，应先经 document-parsing 解析为结构化 JSON 再建 EV 节点。`
    },
    {
      type: "short",
      q: `用你一个真实案例，说明如何给一份关键证据做"可信度评分"：可采性四级过滤过到哪一级、SPIRIT 六维各达标否、保管链有无断点，最后给评级并写明缺口。`,
      answer: null,
      analysis: `参考要点（以"银行流水截图"为例）：可采性=相关性(是,直接证明付款)→合法性(来源合规,非越权)→可靠性(银行盖章/系统导出)→最优性(全量非抽样) 全过；SPIRIT=充分(覆盖争议期)相关(直连)独立(第三方出具)可靠(系统源)完整(含对手方)及时(当期导出) 全达标；保管链=导出人/时间/哈希/移交签名齐全 无断点 → 评级"高可信"。若缺哈希或交接无签名 → 降"中可信"并标缺口"补哈希+补交接签名"。体现今天"链不断、分可采、底稿合规"。`
    },
    {
      type: "single",
      q: `证据注册表 evidence_registry.json 的顶层结构中，明确"不包含"什么？`,
      options: [`A. metadata 与 chain_nodes`, `B. evidence_items 与 findings`, `C. 关系图（关系由 nodes/ 各节点 frontmatter 声明）`, `D. hypotheses 与 event_timeline`],
      answer: "C",
      analysis: `注册表含 metadata/chain_nodes/entities/evidence_items/findings/hypotheses/event_timeline 七个顶层结构，但<b>不包含关系图</b>——关系由 nodes/ 中节点文件的 frontmatter 的 relations 字段声明。这是"类型在 frontmatter、关系在节点内、JSON 只做索引"的设计。`
    },
    {
      type: "multiple",
      q: `当证据来源是原始文档（PDF/扫描件/图片）时，正确的处理是？（多选）`,
      options: [`A. 直接当成 EV 节点使用`, `B. 先调用 document-parsing 解析为结构化 parsed JSON`, `C. 用 parsed 结果创建 EV 节点`, `D. 忽略原文，凭记忆记录`],
      answer: ["B", "C"],
      analysis: `evidence-management 明确：原始文档应先经 document-parsing 解析为结构化 JSON，再用 parsed 结果创建 EV 节点，避免字段丢失。A 错：直接用易丢字段；D 错：凭记忆违反 ALCOA 原始/准确。`
    }
  ],
  aiBriefing: `
    <h3>🤖 今日 AI 速览（精选 · 防滞后雷达）</h3>
    <div class="key-point"><b>说明</b>：以下 3 条均来自今日联网检索的真实动态（2026-08），与"证据链与可信度评分 / 让 AI 管链、出可呈堂底稿"强相关——行业正在把"cryptographic 保管链 + 可采性评估 + 可解释 AI"做成硬标准，恰好印证今天 evidence-management 的全套机制。</div>
    <ul>
      <li><b>① AI Agent 合规审计工具成熟（2026-08）</b>：这类工具夹在 agent 与它触碰的系统之间，干四件事——capture（全保真会话记录，含中间推理步骤）、integrity（密码学保证日志不可篡改，如 Conduit 用 SHA-256 哈希 + Ed25519 签名串起浏览器会话）、evaluation（自动对照 EU AI Act / SOC 2 / GDPR）、reporting（给人类审计员的证据包）。Deloitte 已给 Omnia 审计平台加统一 agentic AI 层（来源：AIMultiple 排名、aidrugsearch 综述）。<br><span class="hint">为什么和你相关：它把"证据完整性 + 不可篡改 + 可解释"做成工程标准，正是你今天<b>保管链五原则（加哈希、环境可控）+ ALCOA + 推理节点状态机</b>的工业级镜像——AI 出证据包，人读文档做裁决。</span></li>
      <li><b>② FinHarbor AI Co-Investigator：append-only 审计轨迹 + 强制人工签字</b>：自托管 LLM，挂接统一账本、KYC/KYB、交易监控与<b>只追加（append-only）审计轨迹</b>；每次有监管后果的决定都需人工签字，分析师用自然语言提问，它组装调查画像并起草 SAR 叙述供人复核（来源：Sovereign Magazine，欧盟 AI 法案透明义务 8/2 生效前发布）。<br><span class="hint">为什么和你相关：append-only 轨迹 ≈ 你的"链式保管记录（谁/何时/方式/移交）"，强制签字 ≈ 推理节点 ready 仅人工。它用技术强制"链不断 + 人把关"，正是今天可信度评分"链有断点就降档"的落地范本。</span></li>
      <li><b>③ JACKSOFT 发表 JAudit AI 企业稽核智慧中枢（2026.08.03）</b>：地端部署，整合 ERP、内控制度、法规文件、稽核底稿与内部知识，结合"AI 资深稽核知识库 + AI 稽核机器人 + AI 决策支援"，串联持续性稽核管理平台、风险导向稽核平台，实现知识传承、持续监控、风险预警与智慧决策（来源：JACKSOFT 公司新闻）。<br><span class="hint">为什么和你相关：它把"稽核底稿 + 制度 + 知识"一体化沉淀，对应你今天<b>证据注册表 + references 沉淀（制度原文）</b>的设计——证据不是孤立文件，而是挂在"制度-流程-底稿"结构上的可信资产。地端部署还顺带解决了审计数据的保密红线。</span></li>
    </ul>
  `,
  caseStudy: `
    <h3>案例：把"证据链 + 可信度评分"做成证据管理技能</h3>
    <div class="key-point"><b>本案例与今天主题的关系</b>：今天学"把证据全生命周期、保管链、可采性评分编成技能"。这个案例用 Day 6/7/8 反复出现的"指定供应商价高"线索，演示如何拿 evidence-management 的保管链 + 可采性四级 + SPIRIT + ALCOA 给关键证据打分、排断点——正是 Day 9 要你亲手做的那种"证据管理"技能。</div>

    <h4>背景（为什么需要它）</h4>
    <p>调查收到举报：指定供应商 Z 价高 15%。过去这类线索的证据散在微信截图、Excel、口头陈述里，要用时找不到来源、说不清可信度，复议时对方一句"这截图能证明什么"就哑火。</p>

    <h4>技能怎么管（核心机制落地）</h4>
    <ol>
      <li><b>全生命周期 + 保管链</b>：流水从网银导出（导出人/时间/哈希/移交签名齐全）→ 股权穿透报告（第三方出具，独立）→ 市场比价表（当期、含对手方）。每件贴标签、记流转。</li>
      <li><b>可采性四级过滤</b>：流水相关性(是)→合法性(系统导出合规)→可靠性(银行源)→最优性(全量) 全过；微信截图因"来源不明、未哈希"卡在可靠性，降档为"佐证"而非"直接证据"。</li>
      <li><b>SPIRIT 评分</b>：股权穿透=独立(第三方)+完整(含反证:Z 有专利)+及时(当期) → 高可信；口头陈述=非独立、难复核 → 低可信，仅作线索。</li>
      <li><b>ALCOA 底稿</b>：全部当时记录、原始导出、可归责，避免抄录走样。</li>
      <li><b>结构落地</b>：evidence_registry.json 登记 + nodes/（EV 流水/FND 价高发现/HYP 关联交易/EVT 付款事件），relations 声明 supports/contradicts。</li>
    </ol>

    <h4>踩过的坑（证据管理专属反模式）</h4>
    <ul>
      <li>初版<b>微信截图无哈希、无移交签名</b> → 保管链断点，可信度打折；</li>
      <li><b>可采性跳级</b>：把"传闻陈述"当直接证据用 → 独立性不过，被复议击穿；</li>
      <li><b>原始 PDF 直接当 EV</b> 未解析 → 漏了关键条款字段，补做 document-parsing 才补齐。</li>
    </ul>

    <h4>带来的改变（对照"抽屉塞材料"）</h4>
    <table class="tbl">
      <thead><tr><th>维度</th><th>抽屉塞材料</th><th>证据管理技能</th></tr></thead>
      <tbody>
        <tr><td>链完整性</td><td>用时不找不到来源</td><td>每件可回溯提取/移交</td></tr>
        <tr><td>可信度</td><td>凭感觉"这证据挺硬"</td><td>四级过滤+SPIRIT 打分</td></tr>
        <tr><td>底稿合规</td><td>抄录走样、事后补</td><td>ALCOA 全达标</td></tr>
        <tr><td>可呈堂</td><td>对方一复议就崩</td><td>链不断、分可采、合规</td></tr>
      </tbody>
    </table>

    <h4>给审计人的启示</h4>
    <ul>
      <li><b>查得再多，链断、分不清就归零</b>——证据管理是推理( Day7 )和定位( Day8 )的地基；</li>
      <li><b>可信度要可计算</b>：可采性四级 + SPIRIT 六维 + 链完整，缺一不可，断点就降档；</li>
      <li><b>原始文档先解析再建 EV</b>，关系在节点内声明——这正是 FinHarbor append-only、JACKSOFT 地端中枢、AI 合规审计工具三条行业动态共同指向的"可呈堂证据"标准。</li>
    </ul>
  `,
  resources: [
    { type: `📘`, title: `本地技能：evidence-management（证据链 + 保管链 + 可采性）`, source: `WorkBuddy 技能库`, reason: `今天全套机制的权威源，做"证据管理技能"前务必读 evidence-collection-and-custody / admissibility-assessment / working-paper-standards 三篇。`, link: `https://www.workbuddy.cn/docs/workbuddy/Skills` },
    { type: `📰`, title: `AI Agent 合规审计工具（capture/integrity/evaluation/reporting）`, source: `aidrugsearch / AIMultiple`, reason: `cryptographic 保管链 + 可解释 AI 的工程标准，是今天保管链五原则 + 状态机 ready 仅人工的工业级镜像。`, link: `https://aidrugsearch.com/knowledge/what_are_the_best_ai_agent_compliance_auditing_tools_in_2026_and_how_do_enterprises_actually_audit_autonomous_ai_agents.php` },
    { type: `📰`, title: `FinHarbor AI Co-Investigator（append-only 轨迹 + 强制人工签字）`, source: `Sovereign Magazine`, reason: `append-only 轨迹≈链式保管记录、强制签字≈ready 仅人工，是可信度评分"断点降档"的落地范本。`, link: `https://www.sovereignmagazine.com/article/finharbor-ai-co-investigator-aml-eu-ai-act` },
    { type: `📰`, title: `JACKSOFT JAudit AI 企业稽核智慧中枢（地端部署）`, source: `JACKSOFT 公司新闻`, reason: `把"底稿+制度+知识"一体化沉淀，对应今天证据注册表 + references 设计，地端部署还解决审计保密红线。`, link: `https://www.jacksoft.com.tw/company/company_news.php` },
    { type: `🔎`, title: `搜索「证据链 链式保管 可采性 SPIRIT ALCOA 审计底稿」`, source: `联网检索入口`, reason: `取权威口径与案例，深化"可信度评分可计算定义"与保管链断点判据。`, link: `https://www.bing.com/search?q=%E8%AF%81%E6%8D%AE%E9%93%BE+%E9%93%BE%E5%BC%8F%E4%BF%9D%E7%AE%A1+%E5%8F%AF%E9%87%87%E6%80%A7+SPIRIT+ALCOA+%E5%AE%A1%E8%AE%A1%E5%BA%95%E7%A8%BF` }
  ]
};
