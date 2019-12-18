/**
 * 实现redux
 * 提供createStore、getState、subscribe、dispatch
 */


 function createStore(reducer, enhancer) {

    if (enhancer) {
      return enhancer(createStore)(reducer)
    }
    let listener = [];
    let currentState = undefined;

    function getState() {
      return currentState;
    }

    function subscribe(listener) {
      listener.push(listener);
    }

    function dispatch(action) {
      currentState = reducer(currentState, action);
      listener.forEach(lis => lis());
      return action;
    }

    //  初始化数据
    dispatch({type: '@init/redux'})

    return {
      dispatch,
      subscribe,
      getState
    }
 }

 // 中间件是对dispatch方法进行强化
 function applyMiddleware(...middelewares) {
   return (createStore) => (...args) => {
     const store = createStore(...args);
     const dispatch = store.dispatch; // 得到原本的dispatch方法
     const middleWareParams = {
       dispacth: (...args) => dispatch(...args),
       getState: store.getState,
     }
    }
 }

 export { createStore }
 