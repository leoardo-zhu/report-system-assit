import { submitReport } from './service';

const Model = {
  namespace: 'newReport',
  state: {
    report: {},
  },
  effects: {
    *submit({ payload }, { call }) {
      console.log(payload);

      yield call(submitReport, payload);
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
      };
    },
  },
};

export default Model;
