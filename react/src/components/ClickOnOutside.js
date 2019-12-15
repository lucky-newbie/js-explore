import React from 'react';

class ClickOnOutSide extends React.PureComponent {

  constructor (props) {
    super();
    this.ref = React.createRef();
    this.state = {
      isOpen: false
    }
  }

  componentDidMount() {
    window.addEventListener('click', this.handleClick);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleClick);
  }

  clickButton = () => {
    this.setState({
      isOpen: true
    })
    console.log(this.state.isOpen)
  }

  handleClick = (e) => {
    const { isOpen } = this.state;
    console.log('!this.ref.current', this.ref.current)
    if (isOpen && !this.ref.current.contains(e.target)) {
      this.setState({
        isOpen: false
      })
    }
  }

  render () {
    const { isOpen } = this.state;
    return (<div ref={this.ref} style={{width: '200px', height: '200px', background: 'red'}}>
      <button onClick={this.clickButton}>click me</button>
      {isOpen && <ul>
        <li>item1</li>
        <li>item2</li>
        <li>item3</li>
      </ul>}
    </div>)
  }
}

export default ClickOnOutSide