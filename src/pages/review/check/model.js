import { getCheckReports, changeStatus } from './service';
import { message } from 'antd';

const Model = {
  namespace: 'checkReport',
  state: {
    checkReports: [],
  },
  effects: {
    *fetchReports(_, { put, call }) {
      const response = yield call(getCheckReports);

      yield put({
        type: 'get',
        payload: response,
      });
    },
    *changeStatus({ payload }, { put, call }) {
      const response = yield call(changeStatus, payload);
      yield put({
        type: 'edit',
        payload,
      });
      payload.status ? message.success('给予通过！') : message.error('已驳回！');
    },
  },
  reducers: {
    get(state, { payload }) {
      const { checkReports } = state;
      return {
        ...state,
        checkReports: payload,
      };
    },
    edit(state, { payload }) {
      const { checkReports } = state;
      const { status, index } = payload;

      checkReports.splice(index, 1);
      return {
        ...state,
        checkReports,
      };
    },
  },
};

export default Model;
