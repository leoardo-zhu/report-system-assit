import Mock from 'mockjs';

const { data } = Mock.mock({
  'data|3': [
    {
      id: '1154284226850443264',
      state: 0,
      projectsType: '内部项目,外包项目,商业项目',
      projects: 'demo,demo,demo',
      output: '@cword(5)',
      'actualPercent|0-100': 50,
      'actualHours|25-60': 25,
      selfAssess: '@csentence',
      opinion: null,
      managerAssess: '',
      username: '@cname',
      time: '2019-7-30',
    },
  ],
});

export default {
  'POST /api/week/check': { data },
};
