import { queryCurrent, bindManager, query as queryUsers } from '@/services/user';
import Cookies from 'js-cookie';
import { router } from 'umi';
const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },

    *bindManager({ payload: { id, username } }, { call, put }) {
      const response = yield call(bindManager, id);
      yield put({
        type: 'changeManager',
        payload: username,
      });
    },

    *logout(_, { put }) {
      yield put({
        type: 'removeCurrentUser',
      });
      Cookies.remove('Token');
      Cookies.remove('Authority');
      router.push('/user/login');
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload };
    },
    removeCurrentUser() {
      return {};
    },
    changeManager(state, { payload }) {
      const { currentUser } = state;
      currentUser.managerName = payload;
      return {
        ...state,
        currentUser,
      };
    },
    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
