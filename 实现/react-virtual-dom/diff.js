
/**
 * DOM-diff那一定要清楚其存在的意义，给定任意两棵树，采用先序深度优先遍历的算法找到最少的转换步骤
 * 作用：根据两个虚拟对象创建的补丁，描述改变的内容，将这个补丁用来更新DOM
 */

 let index = 0;
 function diff(oldTree, newTree){
   // 用来存放补丁的对象
   let patches = {};
   // 从0的位置开始比对两个树
   walk(oldTree, newTree, 0, patches)
   return patches;
 }

 
 function walk(oldNode, newNode, index, patches){
   let current = [];
   if (!newNode) {
    current.push({type:'REMOVE', index});
   } else if (isString(oldNode) && isString(newNode)) {
    // 判断文本是否一致
    if (oldNode !== newNode) {
      current.push({type: 'TEXT', text: newNode})
    }
   } else if (oldNode.type === newNode.type) {
    // 比较属性是否有更改
    let attr = diffAttr(oldNode.props, newNode.props);
    if (Object.keys(attr).length > 0) {
      current.push({type: 'ATTR', attr})
    }
    // 如果有子节点，则遍历子节点
    diffChildren(oldNode.children, newNode.children, patches)
   } else {
     // 说明节点被替换了
     current.push({type: 'REPLACE', newNode})
   }
   if (current.length > 0) {
     console.log(11)
    patches[index] = current;
   }
 }

 function isString(obj) {
  return typeof obj === 'string';
 }

 // 比较节点属性，合并出修改后的属性
 function diffAttr(oldAttr, newAttr){
   let patch = {};
   // 判读老属性和新属性的关系
   for (let key in oldAttr) {
    if (oldAttr[key] !== newAttr[key]) {
      patch[key] = newAttr[key]; // 可能是undefined
    }
   }
   // 老属性中没有的新属性
   for (let key in newAttr) {
    if (!oldAttr.hasOwnProperty(key)) {
      patch[key] = newAttr[key]
    }
   }
   console.log('patch', patch)
   return patch;
 }

 let num = 0;
 function diffChildren(oldChildren, newChildren, patches) {
  oldChildren.forEach((child, index) => {
    walk(child, newChildren[index], ++num, patches)
  });
 }

 /******处理补丁变更*********** */

 let sequence = 0; 
 // 为dom节点根据补丁进行更新
 function patch(node, patches){
   console.log('打补丁')
   update(node, patches)
 }

 function update(node, patches) {
   const current = patches[sequence];
   const childNodes = node.childNodes;
   sequence++;
   // 先更新子节点
   childNodes.forEach(child => update(child, patches));
   if (current) {
    doPatch(node, current); // 打上补丁
   }
 }

 function doPatch(node, patch) {
   // 遍历所有补丁
   patch.forEach(p => {
     switch (p.type) {
       case 'ATTR':
        for (let key in patch.attr) {
          const v = patch.attr[key];
          if (v) {// 如果有值则进行更新
            setAttribute(node,key, v)
          } else {
            // 没有值，则删除属性
            node.removeAttribute(key)
          }
        }
        break;
       case 'TEXT':
        node.textContent = patch.text;
        break;
       case 'REPLACE':
        let newNode = patch.newNode;
        if (newNode instanceof Element) {
          newNode = render(newNode);
        } else {
          newNode = document.createTextNode(newNode)
        }
        node.parentNode.replaceChild(newNode, node);
        break;
       case 'REMOVE':
        node.parentNode.removeChild(node);
        break;
       default:
        break;
     }
   })
 }