// Day 4 结构化数据（网页版）。由「AI 应用教练」专家生成并经飞书推送。
window.AI_DAYS = window.AI_DAYS || {};
window.AI_DAYS["2026-08-23"] = {
  date: `2026-08-23`,
  day: 4,
  topicIndex: 3,
  topicTitle: `技能的成长与反模式：references 组织 + 4 个致命坑`,
  oneLiner: `前三天的技能会"悄悄变质"。今天学怎么用 references 管好技能、并避开 4 个让它从"利器"变"累赘"的反模式。`,
  learning: `
    <p class="lead">设计视角：技能不是写一次就完事，它会随使用悄悄变质。今天讲两件进阶该懂的事：<b>① 用 references/ 把技能养得干净可维护；② 识别并避开 4 个致命反模式</b>。这是从"会造"到"造得好、活得久"的分水岭。</p>

    <h3>一、references/ 是技能的"外挂硬盘"</h3>
    <ul>
      <li>正文只留<b>主干流程</b>；评分卡细则、品类模板、正反样本放进 <code>references/</code> 下的文件。</li>
      <li>好处：正文短小易读、改细则不碰主干、不同品类可各自成文件（如 <code>采购专项.md</code> / <code>财务专项.md</code>）。</li>
      <li>原则：<b>正文是"怎么做"，references 是"依据什么做"</b>——像审计报告把底稿留痕、正文只下结论。</li>
    </ul>

    <h3>二、4 个致命反模式（重点避坑）</h3>
    <table class="tbl">
      <thead><tr><th>反模式</th><th>症状</th><th>改法</th></tr></thead>
      <tbody>
        <tr><td>① 技能过大</td><td>采购+财务+内控塞一起，触发混乱</td><td>按品类 / 职责拆细，一个技能扛一类事</td></tr>
        <tr><td>② 触发词漂移</td><td>description 堆无关词，误触发上升</td><td>定期回看误触发，删掉不相关的词</td></tr>
        <tr><td>③ 内容过期</td><td>新品类照旧流程答、照搬旧模板</td><td>设"回顾日"，新场景补 references</td></tr>
        <tr><td>④ 缺反模式 / 约束</td><td>只写"做什么"不写"别做什么"</td><td>显式写边界与反面示例</td></tr>
      </tbody>
    </table>
    <div class="key-point">一句话立住：<b>技能像代码——要拆分、要版本维护、要加约束、要定期回看误触发。把它当"会过期的资产"管，而不是"写一次永流传"的文档。</b></div>

    <h3>三、如何用 references 反向"喂"技能变聪明</h3>
    <ul>
      <li>把"好 vs 差"样本、评分细则、边界案例持续补进 references，技能的判断就会越来越准。</li>
      <li>新品类（如服务采购、研发采购）出现，单独加一个 references 文件，不污染主干。</li>
      <li>每次误触发，都是一次"该补反模式"的信号。</li>
    </ul>

    <h3>四、生活化例子：技能 = 会过期的"SOP 手册"</h3>
    <p>公司 SOP 不会写一次管十年，流程变了要修订、合并了要拆分。技能同理：今天好用，三个月后业务一变就可能答非所问。定期翻一翻、补一补，它才一直好用。</p>

    <h3>五、今日行动钩子</h3>
    <p class="hint">回忆你前三天造 / 在用的技能，挑一个问自己：它的 description 有没有"漂移"？references 是不是空的？内容是不是该更新了？今天顺手修一处。</p>

    <div class="key-point">一句话记住：<b>技能是"会过期的资产"，不是"永流传的文档"。用 references 养干净、用 4 个反模式做体检——你造的技能才能活得好、活得久。</b></div>
  `,
  exam: [
    {
      type: "single",
      q: `关于 references/ 的作用，最准确的描述是？`,
      options: [`A. 用来放技能作者的简历`, `B. 把细则/模板/样本外挂，正文只留主干`, `C. 替代 SKILL.md`, `D. 仅用于装饰`],
      answer: "B",
      analysis: `references 是技能的"外挂硬盘"：评分卡细则、品类模板、正反样本放这里，正文只留主干流程。这样正文短小、改细则不碰主干、品类可各自成文件。`
    },
    {
      type: "multiple",
      q: `下列哪些属于"技能致命反模式"？（多选）`,
      options: [`A. 技能过大（什么都塞）`, `B. 触发词漂移（描述模糊致误触发）`, `C. 内容过期（照搬旧流程未更新）`, `D. 缺反模式 / 约束（只写做什么不写别做什么）`],
      answer: ["A", "B", "C", "D"],
      analysis: `四个都是 Day4 讲的致命反模式：过大、漂移、过期、缺约束。任一个都会让技能从"利器"变"累赘"。`
    },
    {
      type: "single",
      q: `"触发词漂移"的典型症状是？`,
      options: [`A. 技能文件太小`, `B. description 堆了无关词，误触发上升`, `C. 用户太多`, `D. 网络慢`],
      answer: "B",
      analysis: `触发词漂移 = description 随使用越来越臃肿、混入不相关词，导致该出现时不出现、不该出现时乱跳。改法是定期回看误触发、删掉无关词。`
    },
    {
      type: "short",
      q: `你的"审计程序拆解"技能，最近对"服务采购"项目仍照"货物采购"流程答，明显不对。这对应哪个反模式？给出一条具体改法。`,
      answer: null,
      analysis: `参考要点：对应"③ 内容过期"——新品类（服务采购）出现却照搬旧模板。改法：在 references/ 新增"服务采购专项.md"，写清服务采购的拆解要点与差异，并在 description / 正文提示"按品类调用对应专项"，不污染货物采购主干。`
    },
    {
      type: "multiple",
      q: `关于"用 references 反向喂技能变聪明"，下列说法正确的有？（多选）`,
      options: [`A. 把好坏样本持续补进 references`, `B. 新品类单独加文件不污染主干`, `C. 每次误触发都是"该补反模式"的信号`, `D. references 越空越好`],
      answer: ["A", "B", "C"],
      analysis: `A/B/C 都是正确做法：持续喂样本、按品类拆分、把误触发当信号。D 错：references 空着等于没沉淀依据，技能会退化成只会背主干。`
    },
    {
      type: "single",
      q: `把技能比作"会过期的 SOP 手册"，核心想强调？`,
      options: [`A. 技能写完就永不变`, `B. 技能要定期修订/拆分/更新才一直好用`, `C. 技能越旧越准`, `D. 不用管它`],
      answer: "B",
      analysis: `SOP 不会写一次管十年，流程变了要修订。技能同理：业务一变就可能答非所问，需定期翻看、补 references、修 description。`
    },
    {
      type: "short",
      q: `你是主管，团队有人造了个"万能审计技能"把采购、财务、内控、报告全塞进去，大家反馈"调不准、改不动"。请用今天所学给两条整改建议。`,
      answer: null,
      analysis: `参考要点：① 对应反模式"① 技能过大"——按品类 / 职责拆成多个细技能（采购程序拆解、财务审计定位、内控测试各一个），触发更准、易维护；② 每个拆出的技能显式写"约束与反面示例"（反模式④），把"不做什么"说清，减少误触发。`
    },
    {
      type: "multiple",
      q: `下列哪些做法有助于技能"活得久、用得稳"？（多选）`,
      options: [`A. 设"回顾日"定期更新 references`, `B. 每次误触发后补反模式`, `C. 正文越写越长显示专业`, `D. 按品类拆文件`],
      answer: ["A", "B", "D"],
      analysis: `A/B/D 是维护好习惯。C 反了：正文应短小留主干，细则外挂 references；越长越难维护、越易漂移。`
    },
    {
      type: "single",
      q: `"缺反模式 / 约束"这个反模式，最直接后果是？`,
      options: [`A. 技能跑得更快`, `B. 只写做什么不写别做，新手易踩边界坑`, `C. 文件更干净`, `D. 自动更新`],
      answer: "B",
      analysis: `只写"做什么"不写"别做什么"，等于没划边界，调用者（尤其新人）容易在错误场景使用、踩坑。显式写约束与反面示例才能挡住误用。`
    },
    {
      type: "short",
      q: `结合你前三天造/在用的技能，挑一个，指出它最可能中哪条反模式，并写一句你今天的"修复动作"。`,
      answer: null,
      analysis: `参考要点（示例）：audit-action-decomposition 早期易中"① 技能过大"——曾把采购+财务+内控塞一起；今天修复动作：确认已按品类拆细、并给每个品类单独 references 文件。学员可换自己实际在用的技能作答，重点是"能识别反模式 + 给出可执行的一小步"。`
    }
  ],
  aiBriefing: `
    <h3>🤖 今日 AI 速览（精选 · 防滞后雷达）</h3>
    <div class="key-point"><b>说明</b>：以下 3 条均来自今日联网检索的真实动态，与"技能维护 / 防翻车"强相关。</div>
    <ul>
      <li><b>① Gartner 泼冷水：到 2027 年底超 40% 智能体项目会被叫停</b>，主因"成本算不过账、价值说不清"（来源：中金在线《大厂 All in AI 办公》，2026-08）。<br><span class="hint">为什么和你相关：技能 / 智能体不是造出来就赢。今天讲的 4 个反模式，正是避免"造了一堆用不上的技能"——用"复用率 + 是否解决真问题"衡量价值，别为造而造。</span></li>
      <li><b>② Claude 企业版上线"技能 / 插件安全扫描"（beta）</b>：上传或编辑第三方技能时自动检测恶意内容，把 marketplace 扩展当 supply-chain 管（来源：Claude AI Daily 8/8）。<br><span class="hint">为什么和你相关：技能会过期、也会带风险。第③个反模式"内容过期"和第④个"缺约束"直接相关——要定期更新、加安全边界，别让技能变成未审计的入口。</span></li>
      <li><b>③ 大厂 AI 办公智能体"同质化"</b>：文档写作 / 数据分析 / 方案梳理成每款产品标配（来源：同上中金在线）。<br><span class="hint">为什么和你相关：别把"通用能力"当技能沉淀。你的技能要锚定审计专项的独特价值（问题定位尺子、程序拆解），而非重复通用助手——这恰是反模式①"过大"的反面。</span></li>
    </ul>
  `,
  caseStudy: `
    <h3>案例："审计程序拆解"技能的 4 个反模式复盘</h3>
    <div class="key-point"><b>本案例与今天主题的关系</b>：今天学"反模式"。你已在用的 <b>audit-action-decomposition</b> 上线后悄悄变质过，这四个坑它全踩过一遍。复盘给你看"坑长什么样、怎么填"。</div>

    <h4>背景（技能会悄悄变质）</h4>
    <p>技能上线 ≠ 一劳永逸。随着使用面变宽、业务场景变多，它一度从"利器"滑向"累赘"，直到做了一次体检才拉回来。</p>

    <h4>四个坑与填法</h4>
    <table class="tbl">
      <thead><tr><th>反模式</th><th>当时症状</th><th>填法</th></tr></thead>
      <tbody>
        <tr><td>① 技能过大</td><td>一度把"采购+财务+内控"塞一起，触发混乱、改不动</td><td>按品类拆成多个细技能</td></tr>
        <tr><td>② 触发词漂移</td><td>description 加了一堆无关词，误触发上升</td><td>回看误触发记录，删掉不相关词</td></tr>
        <tr><td>③ 内容过期</td><td>新品类（服务采购）照旧流程答</td><td>references 新增"服务采购专项.md"</td></tr>
        <tr><td>④ 缺反模式</td><td>只写"做什么"，新人踩"人机协同"边界</td><td>显式写"人机协同 100% 拆纯机+纯人"等约束</td></tr>
      </tbody>
    </table>

    <h4>给审计人的启示</h4>
    <ul>
      <li>技能像代码：要<b>拆分、版本维护、加约束、定期回看误触发</b>；</li>
      <li>每次误触发都是一次"<b>该补反模式</b>"的信号，别忽略；</li>
      <li>设个"回顾日"：每季度翻一遍在用的技能，今天就能挑一个开刀。</li>
    </ul>
  `,
  resources: [
    { type: `📘`, title: `WorkBuddy 技能文档（Skills）`, source: `workbuddy.cn`, reason: `references 机制与 SKILL.md 结构权威说明。`, link: `https://www.workbuddy.cn/docs/workbuddy/Skills` },
    { type: `📰`, title: `Claude 企业版技能安全扫描（supply-chain）`, source: `Claude AI Daily 8/8`, reason: `技能是执行包也会带风险，理解"扩展卫生"很重要。`, link: `https://www.cadb.info/reports/claude-ai-daily-2026-08-08.html` },
    { type: `📰`, title: `Gartner：40% 智能体项目或被叫停`, source: `中金在线`, reason: `用"价值 / 复用率"衡量技能，别为造而造。`, link: `http://mp.cnfol.com/57887/article/1787298343-142656981.html` },
    { type: `🔎`, title: `搜索「AI agent anti-patterns governance 2026」`, source: `联网检索入口`, reason: `持续跟踪智能体治理与反模式，保持前沿感知。`, link: `https://www.bing.com/search?q=AI+agent+anti+patterns+governance+2026` }
  ]
};
