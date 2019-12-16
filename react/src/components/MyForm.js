/**
 * 实现AntDesign中form
 * 满足基本功能的高阶组件：数据收集、校验、提交
 * 提供全局校验功能： validateFields
 * 提供输入控件的装饰器： getFieldDecorator
 */
import React from 'react';
import { Button, Input } from 'antd';

// 创建一个高阶组件
function FormCreate(Form) {
  class comp extends React.Component {
    constructor(props) {
      super(props);
      this.options = {}; // 存放当前表单中各项的配置
      this.state = {}; // 存放表单各项值
    }

    // 表单各项装饰器
    getFieldDecorator = (field, options) => {
      this.options[field] = options; // 将本次表单项的配置存到当前属性上
      return (InputComponent) => {
        return <div>
          {React.cloneElement(InputComponent, {
            name: field,
            value: this.state[field] || '',
            onChange: this.handleChange // 监听输入框变化
          })}
          {this.state[field+'error']
            && (<p style={{color: 'red'}}>
            {this.state[field+'error']}
            </p>)}
        </div>
      }
    }
    
    // 变更处理输入框的值
    handleChange = (e) => {
      const { name, value } = e.target;
      this.setState({
        [name]: value
      }, () => {
        this.validateField(name)
      })
    }

    // 单次校验
    validateField = (name) => {
      const { rules } = this.options[name]; // 拿到当前表单项的校验规则
      // 校验每一项规则
      const hasError = rules.every(rule => {
        if (rule.required) {
          if (!this.state[name]) {
            this.setState({
              [name + 'error']: rule.message
            })
            return true
          }
        }
        return false
      });
      console.log(hasError, 'hasError')
      if (!hasError) {
        this.setState({
          [name+'error']: ''
        })
      }
      return hasError;
    }

    // 全局校验
    validateFields = (cb) => {
      // 排除异步校验
      const options = this.options; // 遍历所有的校验规则
      const res = Object.keys(options).every(rule => this.validateField(rule))
      cb(res, this.state)
    }

    render () {
      return <Form
        {...this.props}
        getFieldDecorator={this.getFieldDecorator}
        validateFields={this.validateFields}
      >
      </Form>
    }
  }
  return comp;
}


class MyForm extends React.Component {

  handleSubmit = () => {
    const { validateFields } = this.props;
    console.log(this.props, 'this.props')
    validateFields((isValid, data) => {
      if (!isValid) {
        console.log('校验成功')
      } else {
        console.log('输入错误，检查输入')
      }
    });
  }

  render () {
    const { getFieldDecorator } = this.props;
    return <div>
      {getFieldDecorator('username', {
        rules: [{
          required: true, message: '不允许为空'
        }]
      })(<input type='text' />)}
      <Button onClick={this.handleSubmit}>submit</Button>
    </div>
  }
}

export default FormCreate(MyForm);






