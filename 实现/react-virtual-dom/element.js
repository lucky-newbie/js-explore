/**
 * react 虚拟dom实现
 * 虚拟DOM: 简而言之就是，用JS去按照DOM结构来实现的树形结构对象，你也可以叫做DOM对象
 */


 // 虚拟DOM元素的类，构建实例对象，用来描述DOM
 class Element {
   // 不考虑key ref owner之类的东西，进创建够用虚拟dom的东西
  constructor(type, props, children) {
   this.type = type;
   this.props = props;
   this.children = children;
  }
}
// 创建虚拟DOM方法，返回虚拟节点
function createElement(type, props, children) {
  // 此处没有区分type类型，是html标签、class还是function, 都认为是html标签
  return new Element(type, props, children);
}

// 将虚拟dom转换为真实的dom
function render(domObj) {
  let ele = document.createElement(domObj.type);
  // 遍历props属性，然后给ele节点设置属性
  for (let attr in domObj.props) {
    setAttribute(ele, attr, domObj.props[attr]);
  }

  // 遍历子节点，如果是虚拟dom，则进行递归创建，如果不是则是文本节点,
  domObj.children.forEach(child => {
    let dom;
    if (child instanceof Element) {
      dom = render(child)
    } else {
      dom = document.createTextNode(child);
    }
    ele.appendChild(dom)
  });
  return ele;
}

// 设置节点属性
function setAttribute(node, key, value) {
  switch(key) {
    case 'value':
      // 假设node是一个input或者textarea，则直接设置其value即可
      if (node.tagName.toLowerCase() === 'input'
        || node.tagName.toLowerCase() === 'textarea') {
          node.value = value
      } else {
        node.setAttribute(key, value)
      }
    break;
    case 'className':
      node.setAttribute('class', value);
      break;
    case 'style':
      // 直接赋值为行内样式
      node.style.cssText = value;
      break;
    default:
      node.setAttribute(key, value);
      break;
  }
}

// ReactDOM.render方法，将虚拟节点挂载到目标节点上
function renderDOM(ele, dom) {
  dom.appendChild(ele)
}

// export {
//   renderDOM,
//   render,
//   Element,
//   createElement,
//   setAttribute
// }