import {
  fetchUsers,
  updateUser,
  fetchRandomPwd,
  postUser,
  deleteUser,
  queryUserNameExist,
  batchDeleteUser
} from '@/services/oauth';
import { message } from 'antd';

export default {
  namespace: 'ouser',

  state: {
    data: {},
    password: {},
    current: {},
  },

  effects: {
    *fetch({ payload }, { put, call }) {
      const result = yield call(fetchUsers, payload);
      yield put({
        type: 'save',
        payload: result,
      });
    },
    *update({ payload, callback }, { call }) {
      const form = { ...payload, authorities: payload.authorities.map(a => a.authority) };
      const result = yield call(updateUser, form);
      if (result.msg == 'success' && callback) callback();
    },
    *updateAll({ payload, callback }, { call }) {
      const result = yield call(updateUser, payload);
      if (result.msg == 'success' && callback) callback();
    },
    *randomPwd({ callback }, { call, put }) {
      const res = yield call(fetchRandomPwd);
      const { result } = res;
      yield put({
        type: 'savePwd',
        payload: result,
      });
      if (result && callback) callback(result);
    },
    *add({ callback, payload }, { call }) {
      const { _username, _password } = payload;
      const exist = yield call(queryUserNameExist, {
        username: _username,
      });
      const { result } = exist;
      if (result) {
        message.error('这个名字已经被占用了');
        return;
      }
      const res = yield call(postUser, {
        ...payload,
        username: _username,
        password: _password,
      });
      if (res.msg === 'success' && callback) callback();
    },
    *delete({ callback, payload }, { call }) {
      const res = yield call(deleteUser, payload);
      if (res.msg === 'success' && callback) callback();
    },
    *setCurrent({ payload }, { put }) {
      const form = {
        ...payload,
        authorities: payload.authorities.map(a => a.authority),
      };
      yield put({
        type: 'saveCurrent',
        payload: form,
      });
    },
    *batchDelete({ callback, payload }, { call }) {
      const res = yield call(batchDeleteUser, payload);
      if (res.msg === 'success' && callback) callback();
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        data: {
          ...payload,
          status: payload.enabled,
        }
      }
    },
    savePwd(state, { payload }) {
      return {
        ...state,
        password: payload,
      }
    },
    saveCurrent(state, { payload }) {
      return {
        ...state,
        current: payload,
      }
    },
  }
}