import curveLine from './CurveLine'
import myNode from './MyNode'
import myPort from './MyPort'
import sourceItem from './SourceItem'
import centerTable from './CenterTable'
import myTree from './MyTree'
import buttonTool from './ButtonTool'
// 所有要共用的组件
const cmps = {
  curveLine: curveLine,
  myNode: myNode,
  myPort: myPort,
  sourceItem: sourceItem,
  centerTable: centerTable,
  myTree: myTree,
  buttonTool:buttonTool
}
const installCmps = function(Vue) {
  Object.keys(cmps).forEach(key => {
    Vue.component(cmps[key].name, cmps[key])
  })
}

export {
  installCmps
}