import React, { Component } from "react";

export default class Market extends Component {
    render() {
        return (
            <div>market</div>
        )
    }

    createStore(reducer) {
        let createStore = (reducer) => {
            //    state存储(不是管理)着所有状态
            //    最开始先调用下reducer，以得到最初各组件的默认状态值
            let state = reducer(); 
            //     redux的实质其实就是观察者模式，当store里的数据发生变化时，redux会通知所有订阅者
            //    `istenners`是一个数值，里面就是所有的订阅者
            let listheners = [];
            //    getState用于从store中从获取数据
            let getState = (){
                 return state;
            };
            
            //     订阅事件，返回一个取消订阅函数
            let subscribe =  (cb)=>{
                listhenners.push(cb);
                return ()=>{
                    listhenners = listhenners.filter(item=>{
                       return  item !== cb
                    });
                }
            };
        
            let dispatch = (action)=>{
                //     `dispatch`一个action(动作)， 交给纯函数处理
                state = reducer(state, action);
                //     当数据发生改变后，通知订阅者
                listhenners.forEeach(listhener=>{ listhener() });
            };
        
           return {
                getState,
                subscribe,
                dispatch
            }
        }
        export default createStore;
    }

    init() {
        import createStore from 'redux';
        //   此处还用引入reducer 
        let store = createStore(reducer);
        //    导出的store, 在需要的地方引入即可 
        export  default store;
    }

    combineReducer() {
        let combineReducer = (reducersObj){
            //        reducerObj是一个由所有所需reducer组成的对象
            return (state={}, action={ type: Symbol() })=>{
                        //        返回值其实就是一个rootReducer, 所以参数是state， action 
                        //         注意这个rootReducer其实就是在创建store的时候传入的reducer. 
                        //        上一节中，创建store的时候需要先调用一下reducer(), 以得到state的默认状态值;此时相当于调用rootReducer({}, {type； Symbol()}) 
                        //        所以这里给action设置了一个默认值, 注意这里使用了Symbol这样会是action.type无法匹配到用户定义任何的actionTypes 
                        //        rootReducer会返回一个新的state 
                let newState = {};
                            //        当我们接收到一个action时,我们无法知道该交由哪个reducer处理， 所以这里我们 需要遍历所有reducer 
                for (let key in reducersObj){
                newState[key]  =  reducersObj[key](state[key], action)
                            //        这样一个reducer就成为了store状态树中的子树 
                            //         比如页面中有todo, counter两个组件对应着两个reducer， reducersObj = {todo, counter} 
                            //        store状态树大概长这样： {todo: {list: [], counter: {number : 0}} 
                }
                return newState;
            }
        }

        // import counter from './counter';
        // import todo from './todo';
        // import { combineReducers } from "./../redux";
       
        // const rootReducer = combineReducers({
        //     counter,
        //     todo,
        //     ...
        // });
        // export default rootReducer;


    //     import { createStore } from "redux";
    //     import rootReducers from "./reducers/index";
    //     export default const store = createStore(rootReducers)
    }

    connect() {
        import React, { Component } from 'react'
        import store from "store";
        import { createAction } from "action/actionCreateor"
        //        定义组件
        export default class xxxComponent  extends Component {
            constructor(props){
                super(props);
                this.state = {
                            //        建立从store到state的映射
                    xxx: store.getState().xxx.xxxx
                }
            }
                //       组件挂载之前， 订阅redux
            componentWillMount(){
                        this.unsubscribe = store.subscribe(()=>{
                            this.setState({
                                    number: store.getState().counter.number
                            });
                        })
            }
                //        组件卸载时，取消订阅
            componentWillUnmount(){
                        this.unsubscribe();
            }
                
            render() {
                    return (
                        `渲染页面`
                        
                    )
            }
        }
    }

    connect2() {
        import store from 'store'
        //         mapStateToProps 用来建立store到state的映射， mapDispatch将actionCreator以props的形式传入组件
        const connect = (mapStateToProps, mapDispatchToProps)=>(WrappedComponent)=>{
        
        let dispatchProps;
        if(typeof mapStateToProps  === "function" ){
                dispatchProps = mapDispatchToProps(store.dispatch)
            }else if(typeof mapStateToProps  === "object"){
                dispatchProps =( (s)=>{
                    let obj = {};
                    for(let key in s){
                        obj[key] = (params) =>{
                            store.dispatch(s[key](params));
                        }
                    }
                    return obj;
                })(mapDispatchToProps);
            }else{
                dispatchProps = {};
            }
            class Proxy  extends Component{
                constructor(){
                    super();
                    this.state ={
                        ...store.getState()
                    };  
                }
                componentWillMount(){
                this.unsubscribe =  store.subscribe(()=>{
                    this.setState({
                            ...store.getState()
                        });
                    });
                }
                componentWillUnmount(){
                    this.unsubscribe();
                }
                render(){
                    return (
                        <WrappedComponent  
                            {...mapStateToProps(this.state)}
                            {...dispatchProps}
                        />
                    )
                }
            }
            return Proxy;
        }
    }
}