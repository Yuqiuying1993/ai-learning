// Day 2 结构化数据（网页版）。由「AI 应用教练」专家生成并经飞书推送。
window.AI_DAYS = window.AI_DAYS || {};
window.AI_DAYS["2026-08-21"] = {
  date: `2026-08-21`,
  day: 2,
  topicIndex: 1,
  topicTitle: `技能的命门：把 description 写成"高精准触发器"`,
  oneLiner: `昨天你懂了"技能是什么"。今天专攻最易翻车的点——description 触发词工程：怎么写，技能才"该出手时出手、不该出手时安静"。`,
  learning: `
    <p class="lead">设计视角：你已会基础、要亲手造技能。Day1 说 description 是命门，今天把它彻底拆透：<b>触发词怎么设计、正反例长什么样、怎么用"关键词 + 反面示例"把精度拉满</b>。这是造技能的第一道肌肉记忆。</p>

    <h3>一、为什么"触发精度"决定技能成败</h3>
    <ul>
      <li><b>误触发</b>：你问 A，却调出 B——等于多了一个会抢话的同事，反而更累。</li>
      <li><b>漏触发</b>：你明明需要它，它却没出现——等于白造。</li>
      <li>两者根因都在 <code>description</code> 写得不准。所以"精准触发"比"功能多"重要得多。</li>
    </ul>

    <h3>二、description 的"黄金结构"</h3>
    <table class="tbl">
      <thead><tr><th>要素</th><th>作用</th><th>写法要点 / 例子</th></tr></thead>
      <tbody>
        <tr><td>触发场景（原话）</td><td>什么时候调我</td><td>写用户真实会说的原话与近义表述，如"拆解审计程序 / 把动作拆细"</td></tr>
        <tr><td>关键词</td><td>覆盖同义词</td><td>拆细 / 颗粒度 / 动作级 都写上，避免只写一个词</td></tr>
        <tr><td>反面示例</td><td>明确不触发</td><td>"不用于纯写报告文案、不用于财务系统操作"</td></tr>
        <tr><td>适用边界</td><td>限定职责</td><td>采购审计 / 数据分析等，一个技能只扛一类事</td></tr>
      </tbody>
    </table>

    <h3>三、正反例对比（一眼看懂）</h3>
    <div class="key-point"><b>反例（模糊灾难）</b>：<code>"审计相关的事都可以用我"</code> → 什么都触发，用户问排期也调出来，答非所问。<br><b>正例（精准）</b>：<code>"当用户要'拆解审计程序 / 把审计动作拆细 / 判断哪些能 AI 做 / 做审计程序颗粒度体检'时调用；不适用于纯写报告文案、不适用于财务系统操作。"</code></div>

    <h3>四、工程化技巧（避坑）</h3>
    <ul>
      <li><b>原话优先</b>：触发词从你真实问过的话里提炼，别凭空编。</li>
      <li><b>反面示例比正面更省心</b>：写清"不做什么"能挡掉 80% 误触发。</li>
      <li><b>关键词覆盖同义词</b>：用户说法不一，全写上才不会漏触发。</li>
      <li><b>控制范围</b>：description 的边界就是技能的职责边界，别贪大。</li>
    </ul>

    <h3>五、生活化例子：触发词 = 给"虚拟同事"写岗位说明书里的"什么情况找我"</h3>
    <p>老员工带新人会说："这种事问我、那种事问老王。"description 就是把这句话写清楚——技能才知道什么时候该自己上、什么时候该安静。写得好，虚拟同事"指哪打哪"；写得糊，它就到处抢话。</p>

    <div class="key-point">一句话记住：<b>description 不是"介绍词"，是"调度规则"——写清"什么时候用我、什么时候别用我"，技能的精度就稳了。今天改一个你手头技能的 description 试试。</b></div>
  `,
  exam: [
    {
      type: "single",
      q: `在技能工程里，"误触发"最准确的意思是？`,
      options: [`A. 技能从来不出现`, `B. 你问 A 却调出了 B`, `C. 技能运行报错`, `D. 技能响应太慢`],
      answer: "B",
      analysis: `误触发 = 用户意图是 A，系统却调出了不相干的技能 B。它比"完全不触发"更隐蔽也更烦人，因为会打断工作流。根因几乎都在 description 写得不准。`
    },
    {
      type: "multiple",
      q: `一个高质量的 description 通常应包含哪些要素？（多选）`,
      options: [`A. 触发场景 / 用户原话`, `B. 关键词与近义表述`, `C. 反面示例（明确不触发）`, `D. 技能作者的工号`],
      answer: ["A", "B", "C"],
      analysis: `精准 description = 触发场景原话 + 关键词同义词 + 反面示例 + 适用边界。作者工号与触发精度无关，不应写进 description。`
    },
    {
      type: "single",
      q: `为什么"反面示例（明确不做什么）"在 description 里特别有用？`,
      options: [`A. 为了让文件更长`, `B. 能挡掉大量误触发`, `C. 给系统做广告`, `D. 满足格式要求`],
      answer: "B",
      analysis: `新手常只写"正面能做什么"，但"不该做什么"往往更能精准划定边界、挡掉 80% 的误触发。例如写清"不用于起草新合同，仅用于已有合同风险审查"。`
    },
    {
      type: "short",
      q: `请把这句模糊的 description 改写成精准版本："审计相关的事都可以用我"。`,
      answer: null,
      analysis: `参考要点：应写清具体触发场景（如"拆解审计程序 / 把审计动作拆细 / 判断哪些能 AI 做 / 程序颗粒度体检"）、覆盖同义词（拆细 / 颗粒度 / 动作级）、并加反面示例（不用于纯写报告文案、不用于财务系统操作），把职责边界说清，让"该出手时出手、不该出手时安静"。`
    },
    {
      type: "multiple",
      q: `关于"关键词要覆盖同义词"，下列说法正确的有？（多选）`,
      options: [`A. 用户可能用"拆细""颗粒度""动作级"等不同说法`, `B. 只写一个词会降低触发率`, `C. 同义词越多越好、可堆到几百个`, `D. 应取自你真实问过的话`],
      answer: ["A", "B", "D"],
      analysis: `A/B/D 正确：覆盖同义词能避免漏触发，且词应来自真实语料。C 错：堆几百个同义词会稀释精度、引入噪声，并非越多越好。`
    },
    {
      type: "single",
      q: `把"触发词工程"的目标浓缩成一句话，最贴切的是？`,
      options: [`A. 让技能看起来更高级`, `B. "该出手时出手、不该出手时安静"`, `C. 让文件最短`, `D. 避免用任何动词`],
      answer: "B",
      analysis: `触发词工程的全部努力，就为达到"精准调度"：需要时出现、不需要时安静。其余选项都是表面指标。`
    },
    {
      type: "short",
      q: `你团队有个"采购合同风险审查"技能，但经常被问"帮我写一份采购合同"时误触发。请从 description 角度给出两条改法。`,
      answer: null,
      analysis: `参考要点：① 正面触发写清"审查 / 核对 / 识别风险 / 条款体检"等审查类原话；② 加反面示例"不用于起草 / 生成新合同，仅用于已有合同的风险审查"，用"审查 vs 起草"的边界挡掉误触发。核心是把"审查"和"生成"两类意图分开。`
    },
    {
      type: "multiple",
      q: `下列哪些属于"技能触发精度低"的典型症状？（多选）`,
      options: [`A. 问 A 却调出 B`, `B. 需要时技能没出现`, `C. 每次都精准出现`, `D. 用户被无关技能打扰`],
      answer: ["A", "B", "D"],
      analysis: `A/B/D 都是精度低的表现（误触发或漏触发）。C 是理想状态，不属于症状。`
    },
    {
      type: "single",
      q: `用"老员工带新人"类比，description 最接近岗位说明书里的哪一部分？`,
      options: [`A. 薪资待遇`, `B. "什么情况找我、什么情况找别人"`, `C. 入职日期`, `D. 年终奖`],
      answer: "B",
      analysis: `老员工会说"这种事问我、那种事问老王"——description 就是把这句话写清楚，让技能知道自己的职责边界，该上则上、该让则让。`
    },
    {
      type: "short",
      q: `设你是审计主管，要造一个"审计底稿抽查"技能。请写出它的 description 里最该写清的两类信息。`,
      answer: null,
      analysis: `参考要点：① 触发场景 / 原话：如"抽查审计底稿 / 复核工作底稿完整性 / 底稿质量体检"；② 反面示例与边界：如"不用于重新执行审计程序、仅用于已生成底稿的质量与完整性核查"，并说明适用的底稿类型 / 项目阶段。让技能只在"查已生成的底稿"时出手。`
    }
  ],
  aiBriefing: `
    <h3>🤖 今日 AI 速览（精选 · 防滞后雷达）</h3>
    <div class="key-point"><b>说明</b>：以下 3 条均来自今日联网检索的真实动态，与"技能 / 审计人提效"强相关。</div>
    <ul>
      <li><b>① Anthropic 于 8/21 宣布 Agent Skills 全面可用（GA）</b>：企业可上传并管理专有"技能文件夹"（含指令 / 脚本 / 模板），在沙盒安全运行、跨会话复用（来源：ddsboston 每日 AI 简报、搜狐科技）。<br><span class="hint">为什么和你相关：你这 30 天造的 WorkBuddy 技能，正是同一思路——把专业经验产品化、可复用；Skills 进 GA 说明"技能化"已成企业级主流范式，你踩在点上。</span></li>
      <li><b>② MCP（模型上下文协议）月下载量突破 4 亿</b>（约为年初 4 倍），2026-07-28 新规范带来无状态内核 + 标准 OAuth / OIDC（来源：ddsboston 8/21 简报）。<br><span class="hint">为什么和你相关：技能要"够得着"你的数据（采购系统、底稿、ERP），MCP 正是让技能无需定制连接器就能调用工具 / 库的底座；理解它，你造的技能才能接上真实业务系统。</span></li>
      <li><b>③ Claude 企业版上线"技能 / 插件安全扫描"（beta）</b>：上传或编辑第三方技能时自动检测恶意内容（来源：Claude AI Daily 8/8）。<br><span class="hint">为什么和你相关：技能是"可执行的扩展包"，也会成为供应链攻击面；你造 / 用技能时要像对待代码一样做基本卫生（来源可信、不上传敏感凭据、定期审一遍）。</span></li>
    </ul>
  `,
  caseStudy: `
    <h3>案例：把一个"总误触发"的技能改造成"指哪打哪"——audit-action-decomposition 的 description 演进</h3>
    <div class="key-point"><b>本案例与今天主题的关系</b>：今天学"触发词工程"。你已在用 <b>audit-action-decomposition（审计程序拆解）</b> 技能，它早期就栽在"description 太模糊"上。这个案例把"模糊 → 精准"的改造过程拆给你看。</div>

    <h4>背景（为什么需要改）</h4>
    <p>早期 description 写成"审计程序相关可用我"。结果用户问"审计程序怎么排期"也被调出，答非所问；而真正要"把动作拆细"的人，有时反而没被精准命中。技能变成了"抢话同事"。</p>

    <h4>怎么改的（四步走）</h4>
    <ol>
      <li><b>收集真实触发原话</b>：从对话里提炼"拆审计程序 / 动作拆细 / 颗粒度体检 / 人机协同怎么分"。</li>
      <li><b>提炼关键词同义词</b>：拆细 / 颗粒度 / 动作级 一起写进 description。</li>
      <li><b>加反面示例</b>：明确"不用于排期、不用于写报告文案"。</li>
      <li><b>限定适用边界</b>：标注适用"采购 / 财务 / 内控"等品类，不越界。</li>
    </ol>

    <h4>带来的改变（对照改造前）</h4>
    <table class="tbl">
      <thead><tr><th>维度</th><th>改造前（模糊）</th><th>改造后（精准）</th></tr></thead>
      <tbody>
        <tr><td>误触发率</td><td>高（问排期也跳出来）</td><td>低（只在"拆动作"时出手）</td></tr>
        <tr><td>用户满意度</td><td>常被答非所问</td><td>"指哪打哪"</td></tr>
        <tr><td>复用意愿</td><td>团队不爱用</td><td>每周高频调用</td></tr>
      </tbody>
    </table>

    <h4>给审计人的启示</h4>
    <ul>
      <li>description 是<b>"调度规则"不是"广告词"</b>——别写"我很厉害"，要写"什么时候找我"。</li>
      <li>上线后<b>看误触发再迭代</b>：哪里答非所问，就往反面示例里加一条边界。</li>
      <li>你造的每一个技能，第一版 description 都值得这样打磨一遍。</li>
    </ul>
  `,
  resources: [
    { type: `📘`, title: `WorkBuddy 技能文档（Skills）`, source: `workbuddy.cn`, reason: `官方技能机制与 SKILL.md 写法权威说明，造技能前必读。`, link: `https://www.workbuddy.cn/docs/workbuddy/Skills` },
    { type: `📰`, title: `Anthropic Agent Skills 正式 GA（8/21）`, source: `ddsboston 每日 AI 简报`, reason: `印证"技能化"已成企业级主流范式，和你 30 天训练同频。`, link: `https://ddsboston.com/blogs/vibe-code-academy/ai-news-for-vibe-coders-daily-2026-08-21` },
    { type: `🧩`, title: `你已在用的示例技能：audit-action-decomposition`, source: `本地技能库`, reason: `今天案例的主角，打开它的 SKILL.md 看真实 description 演进。`, link: `file:///C:/Users/ruijie/.workbuddy/skills/audit-action-decomposition/SKILL.md` },
    { type: `🔎`, title: `搜索「MCP Model Context Protocol 2026」`, source: `联网检索入口`, reason: `技能要接业务系统，MCP 是底座；按需了解无状态内核与标准授权。`, link: `https://www.bing.com/search?q=MCP+Model+Context+Protocol+2026` }
  ]
};
