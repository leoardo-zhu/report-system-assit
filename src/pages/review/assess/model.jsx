import { getAssesses } from './service';

const Model = {
  namespace: 'assessReport',
  state: {
    reports: [],
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(getAssesses);
      yield put({
        type: 'get',
        payload: response,
      });
    },
  },
  reducers: {
    get(state, { payload }) {
      return {
        ...state,
        reports: payload,
      };
    },
  },
};

export default Model;
