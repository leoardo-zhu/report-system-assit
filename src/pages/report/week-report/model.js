import { getWeekReport, changeDate, editAssess } from './service';
import { message } from 'antd';

const Model = {
  namespace: 'weekReport',
  state: {
    report: {},
    date: String,
  },
  effects: {
    *fetchReport(_, { call, put }) {
      const response = yield call(getWeekReport);
      yield put({
        type: 'get',
        payload: response,
      });
    },

    *editAssess({ payload }, { call, put }) {
      const response = yield call(editAssess, payload);
      yield put({
        type: 'edit',
        payload,
      });
      message.success('提交成功');
    },

    *changeDate({ payload }, { call, put }) {
      const response = yield call(getWeekReport, payload);

      if (response) {
        yield put({
          type: 'get',
          payload: response,
        });
      }
    },
  },
  reducers: {
    get(state, { payload }) {
      return {
        ...state,
        report: payload,
        date: payload.time,
      };
    },
    edit(state, { payload }) {
      const { report } = state;
      report.selfAssess = payload.selfAssess;
      return {
        ...state,
        report,
      };
    },
  },
};

export default Model;
