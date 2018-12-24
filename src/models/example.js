import { getUserList, getUserMsg } from "../services/example";

export default {

    namespace: "example",

    state: {
        data: null
    },

    effects: {
        *getUserList({ payload }, { call, put }) {
            const result = yield call(getUserList, payload);
            yield put({
                type: "changeState",
                payload: result
            });
        },
        *getUserMsg(_, { call, put }) {
            const result = yield call(getUserMsg);
            yield put({
                type: "changeState",
                payload: result
            });
        }
    },

    reducers: {
        changeState(state, { payload }) {
            return {
                ...state,
                data: payload
            }
        }
    },

    subscriptions: {
        
    }
};
