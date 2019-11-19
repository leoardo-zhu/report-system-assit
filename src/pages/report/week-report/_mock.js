import Mock from 'mockjs';
// const year = [2019, 2018, 2017]

// const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

// const week = Array.from({ length: 52 }, (v, k) => k + 1)
const data = Mock.mock({
  'id|+1': 1,
  status: 1,
  projectsType: '内部项目,公司项目,外包项目',
  projects: 'demo,demo,demo',
  output: '@cword(5)',
  'actualPercent|0-100': 50,
  'actualHours|25-60': 25,
  selfAssess: null, //'@cparagraph(10)',
  opinion: null,
  managerAssess: null,
  time: '@date',
});
export default {
  'POST /api/week/get': (req, res) => {
    setTimeout(() => {
      res.send({ data });
    }, 2000);
  },
};
