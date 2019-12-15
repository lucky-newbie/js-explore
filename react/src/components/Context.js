import React from 'react';

const Context = React.createContext();

class ContextTheme extends React.PureComponent {

  render () {
    return <Context.Provider value={'dark'}>
      <ButtonContainer />
    </Context.Provider>
  }
}

function ButtonContainer () {
  return <React.Fragment>
    <Button />
    <Button2 />
    </React.Fragment>
}

class Button extends React.PureComponent {
  static contextType = Context; // 需要指定一个静态属性， 这样this中会绑定context值

  render () {
    console.log(this.context, 111)
    return <button style={{background: this.context == 'dark'? 'red' : 'green'}}>颜色</button>
  }
}

const Button2 = () => {
  return <Context.Consumer>
    {(context) => {
      return <button style={{background: context == 'dark' ? 'blue' : "yellow"}}>函数式comsumer</button>
    }}
  </Context.Consumer>
}

export default ContextTheme;
