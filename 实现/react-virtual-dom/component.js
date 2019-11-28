/**
 * reactcomponent实现
 */


 class Component{
   static isReactComponent = true; // 区分是class 还是 function
   constructor(props, context) {
     // 创建一个更新器实例
     this.$updater = new Updater(this);
     this.$cache = { isMounted: false };
     this.props = props;
     this.state = {};
     this.refs = {};
     this.context = context
   }

   forceUpdate(callBack) {
      let { $updater, $cache, props, state, context } = this;
      if (!$cache.isMounted) {
        return
      }
      if ($updater.isPending) {
        $updater.addState(state)
        return
      }
   }

   setState(nextState, callBack){
     // 添加异步队列，不是每次更新
    this.$updater.addCallback(callback);
    this.$updater.addState(nextState)
   }
 }

class Updater{
  constructor(instance) {
    this.instance = instance;
    this.pendingStates = []; // 待处理状态数组
    this.pedingCallbacks = [];
    this.isPending = false;
    this.nextProps = null;
    this.nextContext = null;
    this.clearCallbacks = this.clearCallbacks.bind(this)
  }

  addState(nextState) {
    if (nextState) {
      this.pedingState.push(nextState);
      if (!this.isPending) {
        this.emitUpdate()
      }
    }
  }
}