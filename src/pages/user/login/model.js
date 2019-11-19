import { fakeAccountLogin, getFakeCaptcha } from './service';
import { getPageQuery, setAuthority, setToken } from './utils/utils';
import { router } from 'umi';
import { routerRedux } from 'dva/router';
import { reloadAuthorized } from '@/utils/Authorized';

const Model = {
  namespace: 'userLogin',
  state: {
    status: undefined,
    message: String,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      }); // Login successfully

      /*if (response) {
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }

        yield put(routerRedux.replace(redirect || '/'));
      }*/
      reloadAuthorized();
      yield put(routerRedux.replace('/'));
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.role);
      setToken(payload.token);
      return { ...state, status: payload.flag, message: payload.message };
    },
  },
};
export default Model;
