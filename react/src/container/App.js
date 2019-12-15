import React from 'react';
import FormattedDate from 'components/FormattedDate'
import ClickOnOutSide from 'components/ClickOnOutSide';
import ContextTheme from 'components/Context';

class App extends React.PureComponent{
  constructor(props) {
    super();
    console.log('父类 constructor')
    this.state = {
      time: new Date(),
      counter: 0
    }
  }

  componentDidMount() {
    console.log('父类 componentDidMount')
    this.timeId = setInterval(() => {
      this.setState({
        time: new Date()
      })
    })
    // this.setState({
    //   counter: this.state.counter + 1
    // });
    // console.log(this.state.counter) // 0
    // this.setState({
    //   counter: this.state.counter + 1
    // });
    // console.log(this.state.counter) // 0
    // this.setState({
    //   counter: this.state.counter + 1
    // });
    // console.log(this.state.counter) // 0
    console.log('state 更新是异步的, console.log为同步的， 所以输出三个0')
    
    this.setState({counter: this.state.counter + 1}, (state) => {
      console.log(this.state.counter, state) // 1
    })
    this.setState({counter: this.state.counter + 1}, (state) => {
      console.log(this.state.counter, state) // 1
    })
    this.setState({counter: this.state.counter + 1}, (state) => {
      console.log(this.state.counter, state) // 1
    })
    console.log(this.state.counter,'setState采用函数的方式，获取最新的state的值');

    this.setState((preState) => {
      console.log(preState.counter, 0)
      return {counter: preState.counter + 1}
    }, (e) => {
      console.log(this.state.counter, e, 1)
    })
    console.log(this.state.counter,  11)
    this.setState((preState) => {
      console.log(preState.counter, 1)
      return {counter: preState.counter + 1}
    }, (e) => {
      console.log(this.state.counter, e,2)
    })
    this.setState((preState) => {
      console.log(preState.counter, 2)
      return {counter: preState.counter + 1}
    }, (e) => {
      console.log(this.state.counter, e, 3)
    })
  }

  componentWillUnmount(){
    console.log('parent componentWillUnmount')
    if (this.timeId) {
      clearSetInterval(this.timeId)
    }
  }

  render () {
    const { time } = this.state;
    return <div>
      <h2>hello</h2>
      <FormattedDate time={time.toLocaleTimeString()} />
      <ClickOnOutSide />
      <ContextTheme />
    </div>
  }
}

export default App;
