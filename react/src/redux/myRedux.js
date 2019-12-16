/**
 * 实现redux
 * 提供createStore、getState、subscribe、dispatch
 */


 function createStore(reducer, enhancer) {

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
 export { createStore }
 