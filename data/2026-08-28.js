// Day 5 结构化数据（AI 应用提效 · 审计人工作流学习室）
window.AI_DAYS = window.AI_DAYS || {};
window.AI_DAYS["2026-08-28"] = {
  "date": "2026-08-28",
  "day": 5,
  "topicIndex": 4,
  "topicTitle": "工具操作 · 文件读写 / 代码执行 / 联网检索 / 多模态",
  "oneLiner": "审计人常用的'三板斧'：让 AI 读本地文件、跑一段 Python 做聚合、联网查制度原文、看图识表。今天把操作路径走通。",
  "learning": "<p class='lead'>多数现代助手（如 WorkBuddy）能直接<strong>读你上传的文件、执行代码、联网、看图</strong>。审计场景高频用法：</p><h3>一、四类操作对应审计动作</h3><table class='tbl'><thead><tr><th>能力</th><th>审计用法</th><th>注意</th></tr></thead><tbody><tr><td>读文件</td><td>上传 Excel/PDF，让 AI 抽取关键行</td><td>先脱敏再传</td></tr><tr><td>跑代码</td><td>Python 聚合 5000 行价格、算帕累托</td><td>让它'展示代码+结果'</td></tr><tr><td>联网</td><td>查最新制度/法规原文</td><td>核对发布时间与适用性</td></tr><tr><td>多模态</td><td>截图识别表格、票据</td><td>关键数字仍需人工复核</td></tr></tbody></table><div class='key-point'>原则：<strong>让 AI '做动作'而非'编答案'</strong>。要算数就让它跑代码并把代码给你看；要查证就让它附链接。凡是它'算出来的'，都要能复现。</div>",
  "exam": [
    {
      "type": "single",
      "q": "让 AI 统计 5000 行采购价并找异常，最稳的做法是？",
      "options": [
        "A. '你心里算一下告诉我结果'",
        "B. '请用 Python 读文件、输出聚合结果与异常清单，并展示所用代码'",
        "C. '随便估个数'",
        "D. '查百度告诉我'"
      ],
      "answer": "B",
      "analysis": "让模型执行代码并展示过程，结果可复现、可复核。"
    },
    {
      "type": "short",
      "q": "你想让 AI 从一份 30 页 PDF 制度里提取'采购审批权限表'。写出你的操作指令（含合规要求）。",
      "answer": null,
      "analysis": "参考要点：上传前确认 PDF 不含敏感信息；指令明确'提取审批权限表(金额区间/层级/例外)，输出表格，标注页码出处，仅基于文档不编造'。"
    }
  ],
  "phase": "基础校准",
  "resources": [
    {
      "type": "🔗",
      "title": "WorkBuddy 帮助中心（文件/代码/联网能力说明）",
      "source": "WorkBuddy",
      "reason": "了解你手头工具的真实能力边界，避免误用。",
      "link": "https://www.workbuddy.cn/docs/workbuddy/Overview"
    }
  ]
};
