import { getUserList, getUserMsg } from "../services/example";
import { message } from "antd";

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
        },
        changeColor(state, { payload }) {
            updateTheme(payload);
            return { ...state }   
        }
    },

    subscriptions: {
        
    }
};

let lessNodesAppended;
function updateTheme(primaryColor) {
    if(!primaryColor) {
        return;
    }
    const hideMessage = message.loading("正在编译主题!", 0);
    function buildIt() {
        if(!window.less) {
            return;
        }
        setTimeout(() => {
            window.less.modifyVars({
                "@primary-color": primaryColor
            })
            .then(() => {
                hideMessage();
            })
            .catch(() => {
                message.error("Failed to update theme");
                hideMessage();
            });
        }, 200);
    }
    if(!lessNodesAppended) {
        const lessStyleNode = document.createElement("link");
        const lessConfigNode = document.createElement("script");
        const lessScriptNode = document.createElement("script");
        lessStyleNode.setAttribute("rel", "stylesheet/less");
        lessStyleNode.setAttribute("href", "/color.less");
        lessConfigNode.innerHTML = `window.less = {
            async: true,
            env: "development",
            javascriptEnabled: true
        }`;
        lessScriptNode.src = "https://gw.alipayobjects.com/os/lib/less.js/3.8.1/less.min.js";
        lessScriptNode.async = true;
        lessScriptNode.onload = () => {
            buildIt();
            lessScriptNode.onload = null;
        };
        document.body.appendChild(lessStyleNode);
        document.body.appendChild(lessConfigNode);
        document.body.appendChild(lessScriptNode);
        lessNodesAppended = true;
    } else {
        buildIt();
    }
}
