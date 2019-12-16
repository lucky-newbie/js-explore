/**
 * 使用redux示例
 */
import React from 'react';
// import {createStore} from 'redux';
import { createStore } from '../redux/myRedux';

const reducer = (state = 0, action) => {
  switch (action.type) {
    case 'add':
      return state + 1 ;
    case 'minus':
    return state - 2;
    default: 
      return state
  }
}

const store = createStore(reducer);

class CountReduxDemo extends React.Component {
  constructor(props) {
    super();
    this.state = {
      flag: false
    }
    // store.subscribe(() => {
    //   this.forceUpdate();
    // })
  }

  ComponentDidMount() {
    store.subscribe(() => {
      return this.forceUpdate
    })
  }

  handleAdd = () => {
    store.dispatch({type: 'add'});
    // this.setState({
    //   flag: !this.state.flag
    // })
  }

  handleMinus = () => {
    store.dispatch({type: 'minus'});
    // this.setState({
    //   flag: !this.state.flag
    // })
  }


  render () {
    return <div>
      count: {store.getState()}
      <button onClick={this.handleAdd}>add</button>
      <button onClick={() => {
        store.dispatch({type: 'minus'})
      }}>add</button>
    </div>
  }
}

export default CountReduxDemo;
