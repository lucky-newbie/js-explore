import React from 'react';
import FormattedDate from 'components/FormattedDate'

class App extends React.PureComponent{
  constructor(props) {
    super();
    console.log('父类 constructor')
    this.state = {
      time: new Date()
    }
  }

  componentDidMount() {
    console.log('父类 componentDidMount')
    this.timeId = setInterval(() => {
      this.setState({
        time: new Date()
      })
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
    </div>
  }
}

export default App;
