import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import { createHashHistory } from "history";
import RedBox from "redbox-react";
import { createLogger } from "redux-logger";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { routerMiddleware, routerReducer } from "react-router-redux";
import reducers from "./reducers";


const history = createHashHistory();
const middlewares = [
	routerMiddleware(history),
	process.env.NODE_ENV === "development" && createLogger(),
].filter(Boolean);
const enhancer = compose(
    applyMiddleware(...middlewares),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : args => args
);
const initialState = {};
const store = createStore(
	combineReducers({
		...reducers, 
		routing: routerReducer
	}),
	initialState, 
	enhancer
);

let render = () => {
	const RouterConfig = require("./router").default;
	ReactDOM.render(
		<Provider store={store}>
			<RouterConfig store={store} history={history}></RouterConfig>
		</Provider>,
		document.getElementById("root")
	);
};

render();

if(module.hot) {
    const renderNormally = render;
    const renderException = (error) => {
        ReactDOM.render(<RedBox error={error}/>, document.getElementById("root"));
    };
    render = () => {
        try {
            renderNormally();
        } catch (error) {
            renderException(error);
        }
    };
    module.hot.accept("./router", () => {
        render();
    });
}

export default store;