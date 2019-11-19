import Mock from 'mockjs';
const { data } = Mock.mock({
  'data|20': [
    {
      'key|1000000-2000000': 1,
      dailyReportTime: '@date',
      'projectType|1': ['外包项目', '商业项目', '内部项目'],
      output: '@cword(4)',
      projectName: '@ctitle',
      'actualHours|5-12': 5,
      rejectText: '@csentence',
      task: '完成前端静态页面',
      'planPercent|0-100': 45,
      planDetail: '@cparagraph',
      'planHours|5-12': 6,
      question: '@csentence',
      assistStaff: '@cname',
      'actualPercent|0-100': 50,
      'status|0-3': 1,
    },
  ],
});

export default {
  'POST /api/daily/get': (req, res) => {
    setTimeout(() => {
      res.send({ data });
    }, 2000);
  },
};
