import {getLabelByValue} from '@/utils/modelType.js'

function getPortByStr(state, payload) {
  let args = payload.str.split('_');
  if(args.length != 2) {
    throw Error('state数组对象错误');
  }
  return state.mynodes.nodes[args[0]].ports[args[1]]
}
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  nodearr: state => state.mynodes.nodes.filter(node => node !== null),
  linearr: state => state.mylines.lines.filter(line => line !== null),
  databasesarr: state => state.mydatabases.databases,

  lineTemp: state => state.mylines.tempLine,
  getCurrentClickNode(state) {
    if(state.mynodes.currentClickNode == -1) {
      return {
        type:'defaultCmp',
        id: -1
      };
    }
    else if(state.mynodes.currentClickNode == -2){
      return {
        type: 'modelInfo',
        id: -2
      }
    }
    else {
      return state.mynodes.nodes[state.mynodes.currentClickNode];
    }
  },
  getCurrentClickLine(state) {
    return state.mylines.currentClickLine
  },
  getLinePosAll(state) {

    return state.mylines.lines.filter(line => line!== null).map(item => {
      return {
        id:item.id,
        start:getPortByStr(state, {str:item.start}),
        end:getPortByStr(state, {str:item.end})
      }
    })
  },

  /**
   * centertable
   */
  getShowState: state => state.centertable.show,
  getTableTitle: state => state.centertable.title,
  getTableHeader: state => state.centertable.table_header,
  getTableData: state => state.centertable.table_data,
  getAllDataItems: state => state.centertable.all_data_items,
  getPreShowTitles: state => state.centertable.pre_show_titles,
  getPreShowId: state => state.centertable.preShowId,

  getConditionData: state => state.centertable.condition_data,
  getConditionField: state => state.centertable.condition_field,

  getCenterCmpIs: state => state.centertable.centerCmpIs,

  getChartOptions: state => state.centertable.chart_options,

  /**
   * modelInfo
   */
  getModelInfo: state => state.mymodel.model_info,
  getModelsAll: state => state.mymodel.all_models_basic_info,
  getModelsPart: state => state.mymodel.all_models_basic_part,
  getModelsFormatTree: state => {
    let res = [];
    res.push({
      label: 'Top_node'
      
    });
    if(state.mymodel.all_models_basic_info){
      res[0].children = [];
      let root = res[0].children;
      state.mymodel.all_models_basic_info.forEach(it => {
        let labelType = getLabelByValue(it.model_type);
        let findFlag = false;
        for(let i = 0; i < root.length; i++){
          if(root[i].label == labelType){
            findFlag = true;
            let child = JSON.parse(JSON.stringify(it));
            child.label = child.model_title;
            root[i].children.push(child);
            break;
          }
        }
        if(!findFlag){
          let child = JSON.parse(JSON.stringify(it));
          child.label = child.model_title;
          root.push({
            label: labelType,
            children: [child]
          })

        }
        
      })
    }
    return res;
  } ,
  /**
   * mydatabases
   */
  getAllDatabases: state => state.mydatabases.databases,
  getAllDatabasesByCategory: (state) => {
    if (state.mydatabases.databases){
      let res = {};
      state.mydatabases.databases.forEach(it => {
        if(!res[it.category]){
          res[it.category] = [];
        }
        res[it.category].push(it);
      })
  
      return res;

    }
    else {
      return {};
    }
  },

}
export default getters
