// Day 1 结构化数据（AI 应用提效 · 审计人工作流学习室）
window.AI_DAYS = window.AI_DAYS || {};
window.AI_DAYS["2026-08-24"] = {
  "date": "2026-08-24",
  "day": 1,
  "topicIndex": 0,
  "topicTitle": "AI 大模型是什么 · 能力边界 · 审计人为何要懂 AI",
  "oneLiner": "先搞清大模型能做什么、不能做什么，才不会要么神话它、要么错过它。审计人懂 AI，不是要写代码，而是会'用对地方'。",
  "learning": "<p class='lead'>大模型（LLM）本质是一个'读得懂文字、能接话、会总结'的超级文本处理器。它不等于搜索引擎，也不等于数据库——它<strong>按概率生成最可能的下文</strong>，所以会'一本正经地胡说'（幻觉）。看清楚这点，你就知道哪些事该交给它、哪些必须由人把关。</p><h3>一、三类能力，三道边界</h3><table class='tbl'><thead><tr><th>它擅长</th><th>它不擅长</th><th>对审计的意味</th></tr></thead><tbody><tr><td>总结/改写/抽取/翻译</td><td>保证事实正确</td><td>让 AI 初稿，人做终审</td></tr><tr><td>按规则结构化（表格/清单）</td><td>处理未见过的新数字真相</td><td>给样本+规则，别让它'拍脑袋'</td></tr><tr><td>代码/SQL/公式生成</td><td>理解你单位的隐藏制度</td><td>把制度写成提示词喂给它</td></tr></tbody></table><div class='key-point'>一句话：AI 是'放大器'——你思路越清晰，它越强；你含糊，它就编。审计人最该学的不是技术，是<strong>把审计判断翻译成 AI 能执行的语言</strong>。</div><h3>二、为什么审计人现在就要用</h3><ul><li>① 底稿、抽凭、报告有大量'结构化+重复'劳动，AI 可省 50%+ 时间；</li><li>② 数据异常、文本核对这类'找问题'活，AI 能先帮你圈出可疑点；</li><li>③ 但它永远不能替代'职业怀疑'和'证据链判断'——这两样是你的护城河。</li></ul>",
  "exam": [
    {
      "type": "single",
      "q": "关于大模型'幻觉'，下列说法正确的是？",
      "options": [
        "A. 幻觉是 bug，升级后就不会有了",
        "B. 幻觉指模型按概率生成看似合理但可能不实的内容",
        "C. 只要联网就不会幻觉",
        "D. 审计场景可放心让 AI 直接出结论"
      ],
      "answer": "B",
      "analysis": "幻觉根植于'生成式'本质，无法根除；所以审计必须人审+留痕。"
    },
    {
      "type": "single",
      "q": "审计人用 AI 的正确定位是？",
      "options": [
        "A. 让 AI 替我做全部职业判断",
        "B. 当放大镜：AI 初稿/圈点，人做终审与证据判断",
        "C. 完全不用，风险太大",
        "D. 只用来写周报"
      ],
      "answer": "B",
      "analysis": "AI 放大你的能力，但职业怀疑与证据链判断必须人来做。"
    },
    {
      "type": "short",
      "q": "用一句话解释：为什么'你思路越清晰，AI 越强'？",
      "answer": null,
      "analysis": "参考要点：AI 按提示词执行；模糊的指令会被它'脑补'；把审计目标/口径/规则写清楚，输出才可控、可复核。"
    }
  ],
  "phase": "基础校准",
  "caseStudy": "<h4>反例：一份'编出来'的审计结论</h4><p>某同事让 AI'写一份采购审计发现'，没给任何数据，AI 生成了'供应商集中度高达 70%、存在围标嫌疑'等具体数字——全是编的。这就是<strong>未脱敏样本 + 未给数据 + 直接要结论</strong>的三重雷。正解：给真实样本、限定'仅基于提供数据、无数据处标注未知'。</p>",
  "resources": [
    {
      "type": "📘",
      "title": "Stanford · 大模型基础科普（中文译介）",
      "source": "Stanford HAI",
      "reason": "权威讲清 LLM 能力边界，适合建立正确预期。",
      "link": "https://hai.stanford.edu/news"
    },
    {
      "type": "🔗",
      "title": "OpenAI 官方 Prompt 工程指南",
      "source": "OpenAI",
      "reason": "官方最佳实践，覆盖本阶段要学的 RTF 框架。",
      "link": "https://platform.openai.com/docs/guides/prompt-engineering"
    }
  ]
};
