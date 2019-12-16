import React from 'react';
import ReactDOM from 'react-dom';

class MyDialog extends React.PureComponent {

  constructor(props) {
    super(props);
    this.dom = document.createElement('div');
    document.body.appendChild(this.dom);
  }

  ComponentWillUnmount() {
    document.body.removeChild(this.dom)
  }

  render () {
    return ReactDOM.createPortal(<div style={{position: 'absolute', width: '100%', height: '100%', backgroundColor: 'gray'}}>
      {this.props.children}
    </div>, this.dom)
  }
}
export default MyDialog;
