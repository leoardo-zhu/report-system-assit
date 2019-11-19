import { getReports, submitReport, urgeManager, changeStatus, updateReport } from './service';
import { message } from 'antd';
import { router } from 'umi';

const Model = {
  namespace: 'dayReport',
  state: {
    reports: [],
    index: undefined,
    reportDetail: {},
    newReport: {},
  },
  effects: {
    *fetchReports(_, { call, put }) {
      const response = yield call(getReports);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *urgeManager(_, { call }) {
      yield call(urgeManager);
      message.success('催促成功');
    },
    *changeStatus({ payload, payload: { report } }, { call, put }) {
      const response = yield call(changeStatus, report);
      yield put({
        type: 'change',
        payload,
      });
    },
    *submitReport({ payload }, { call }) {
      yield call(submitReport, payload);
      message.success('提交成功！');
      router.push('/report/day');
    },

    *updateReport({ payload }, { call, put }) {
      yield call(updateReport, payload);
      yield put({
        type: 'change',
        payload,
      });
      message.success('提交成功！');
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        reports: payload,
      };
    },
    saveDetail(state, { payload }) {
      return {
        ...state,
        reportDetail: payload,
      };
    },
    saveIndex(state, { payload }) {
      return {
        ...state,
        index: payload,
      };
    },
    change(state, { payload }) {
      const { reports } = state;
      reports[payload.index] = payload.report;
      return {
        ...state,
        reports,
      };
    },
  },
};

export default Model;
