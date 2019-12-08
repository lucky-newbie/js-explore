import React from 'react';

class FormattedDate extends React.PureComponent{
  constructor(props) {
    super();
    console.log('child constructor')
  }

  static getDrivedStateFromProps() {
    console.log('getDrivedStateFromProps')
  }

  componentDidUpdate(preProps, preState, snapshot) {
    console.log('child componentDidMount')
  }

  render () {
    console.log('child render')
    const { time } = this.props;
    return <div>时间： {time}</div>
  }
}

export default FormattedDate;
