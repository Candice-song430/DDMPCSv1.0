import axios from 'axios'
import Vue from 'vue'
import {getCategoryInPort} from '@/utils/categories.js'
const state = {
  length: 0,
  nodes: [

  
  ],
  currentClickNode: -1
}

const mutations = {
  CHANGE_POSITION_BY_ID(state, {
    id,
    pos_x,
    pos_y
  }) {
    //console.log(id, pos_x, pos_y);
    state.nodes[id].x += pos_x;
    state.nodes[id].y += pos_y;
    if(state.nodes[id].ports.length > 0) {
      state.nodes[id].ports.forEach(port => {
        port.pos_x = state.nodes[id].x + port.off_x + 8;
        port.pos_y = state.nodes[id].y + port.off_y + 8;
  
      })
    }
  },
  CREATE_NODE(state, {title, x, y, ports, type, data_state}) {
   
    let id = state.length++;
    let newNode = {
      id: id,
      title: title,
      x: x,
      y: y,
      type: type,
      ports: [],
      desc: '',
      sql: '',
      custom_data: {}
    }
   
    if(data_state){
    
      newNode.data_state = JSON.parse(JSON.stringify(data_state));
      newNode.data_state.field.forEach(it => {
        it.my_field = `t${id}$` + it.ori_field.split('$')[1]
      })
    }
    else{
    
      newNode.data_state = {
        "field":[],
        "ori_name":`t${id}`
      };
    }


    switch(type){
      case "Sort":{
        newNode.custom_data.method = "ASC"
        break;
      }
      case "Distinct":{
        newNode.custom_data.choiceField = [];
      }
      case "Conditional Filter":{
        newNode.custom_data.conditions = [
          {
            choiceField: [''],
            method: [''],
            val: ''
          }
        ];
      }
    }
   
    if(ports.length > 0) {
      ports.map((it, index) => {
        let newPort = {
          id: index,
          name: `${id}_${index}`,
          lineId: -1,
          pos_x: x + it.pos_x,
          pos_y: y + it.pos_y,
          off_x: it.pos_x - 8,
          off_y: it.pos_y - 8
        }
        newNode.ports.push(newPort);
      })
    }
    state.nodes.push(newNode)
  },
  CHANGE_PORT_LINE_ID(state, {nodeId, portId, lineId}) {
    state.nodes[nodeId].ports[portId].lineId = lineId;
  },
  CHANGE_CURRENT_CLICK_NODE(state, { nodeId }) {
    state.currentClickNode = nodeId;
  },
  DELETE_NODE(state){
    state.nodes.splice(state.currentClickNode,1, null);
    state.currentClickNode = -1;
  },
  SET_MY_NODES(state, newmynodes){
    // Vue.set(Vue.$store.state, 'mynodes', newmynodes);
    // console.log(Vue.$store.state);
    state.nodes = newmynodes.nodes;
    state.currentClickNode = newmynodes.currentClickNode;
    state.length = newmynodes.length;

  }
}

function getNodeByLine(rootState, node, portId){
  let lineId = node.ports[portId].lineId;
  if(lineId === -1) return null;
  else {
    let selfName = node.ports[portId].name;
    let line = rootState.mylines.lines[lineId];
    let otherNode;
    if(line.start === selfName){
      otherNode = line.end.split('_')[0];
    }
    else {
      otherNode = line.start.split('_')[0];
    }
    return rootState.mynodes.nodes[otherNode];
  }
}

function getNodeByLinePayload(nodes, lines, node, portId){
  let lineId = node.ports[portId].lineId;
  if(lineId === -1) return null;
  else {
    let selfName = node.ports[portId].name;
    let line = lines[lineId];
    let otherNode;
    if(line.start === selfName){
      otherNode = line.end.split('_')[0];
    }
    else {
      otherNode = line.start.split('_')[0];
    }
    return nodes[otherNode];
  }
}

const actions = {
  changePositionByID({
    commit
  }, payload) {
    commit('CHANGE_POSITION_BY_ID', payload);
  },
  createNode({commit,rootState}, payload) {
    if(payload.type === "Database"){
      payload.data_state = rootState.mydatabases.databases[payload.data_state];
    }
    commit('CREATE_NODE', payload);
  },
  changePortLineId({commit}, payload) {
    commit('CHANGE_PORT_LINE_ID', payload);
  },
  changeCurrentClickNode({commit}, payload) {
    commit('CHANGE_CURRENT_CLICK_NODE', payload)
  },
  deleteNode({commit,state,dispatch}){
    
    let node = state.nodes[state.currentClickNode];
    node.ports.forEach(it => {
      if(it.lineId !== -1){
        dispatch('mylines/deleteLineById',{lineId:it.lineId},{root:true});
      }
    })

    commit('DELETE_NODE');
  },

  async countDataNum({dispatch,rootState}){
    await axios.post('/sql-exec/getNums',{
      nodes: state.nodes,
      lines: rootState.mylines.lines,
      id: state.currentClickNode,
      page: rootState.centertable.page
    }).then(res => {
      dispatch('centertable/setAllDataItems', parseInt(res.data[0].count), {root:true});
    }).catch(err => {
      new Error("Execution Failed",err);
    })
  },
  /**
   * 
   * @param {*} param0 
   * 
   */
  async execSql({commit, state, rootState, dispatch}){
    await dispatch('centertable/flashAll',null, {root:true});
    return await axios.post('/sql-exec',{
      nodes: state.nodes,
      lines: rootState.mylines.lines,
      id: state.currentClickNode,
      page: rootState.centertable.page
    }).then(res => {
      return res;
    }).catch(err => {
      new Error("Execution Failed",err);
    })
  },

  /**
   * @param {*} param0 
   * @param {*} payload 
   * @returns 
   */
  async execSqlPayload({commit, state, rootState, dispatch}, payload){
    await dispatch('centertable/flashAll',null, {root:true});
    return await axios.post('/sql-exec',{
      nodes: payload.nodes,
      lines: payload.lines,
      id: payload.currentClickNode,
      page: rootState.centertable.page
    }).then(res => {
      return res;
    }).catch(err => {
      new Error("Execution Failed",err);
    })
  },
  /**
   * @param {*} param0 
   */
  async countDataNumPayload({dispatch,rootState}, payload){
    await axios.post('/sql-exec/getNums',{
      nodes: payload.nodes,
      lines: payload.lines,
      id: payload.currentClickNode,
      page: rootState.centertable.page
    }).then(res => {
      dispatch('centertable/setAllDataItems', parseInt(res.data[0].count), {root:true});
    }).catch(err => {
      new Error("Execution Failed",err);
    })
  },
  /**
   */
  flashToolField({commit, rootState},payload){
    let node = payload.node;
  
    let portNum = getCategoryInPort(node.type);
    if(portNum === 0) return;
    let tempNodes = [];
    for(let i = 0; i < portNum; i++){
      let tempNode = getNodeByLine(rootState, node, i);
      if(tempNode){
        tempNodes.push(tempNode);
      }
    }
    if(tempNodes){
      switch(node.type){
        case 'Copy':{
          // node.data_state.field = JSON.parse(JSON.stringify(tempNodes.reduce((pre,cur) => {
          //   return pre.concat(cur.data_state.field)
          // },[])));

          break;
        }
        default:{
          node.data_state.field = tempNodes.reduce((pre,cur) => {
            return pre.concat(cur.data_state.field)
          },[]);
        }
      }
    }
    else {
      node.data_state.field = [];
    }
  },

  /**
   * 传入nodes和node
   * @param {*} param0 
   * @param {*} payload 
   * @returns 
   */
  async flashToolFieldPayload({commit, rootState},payload){
    let node = payload.node;
    let portNum = getCategoryInPort(node.type);
    if(portNum === 0) return;
    let tempNodes = [];
    for(let i = 0; i < portNum; i++){
      let tempNode = getNodeByLinePayload(payload.nodes, payload.lines, node, i);
      if(tempNode){
        tempNodes.push(tempNode);
      }
    }
    console.log('func',tempNodes);
    if(tempNodes){
      node.data_state.field = tempNodes.reduce((pre,cur) => {
        return pre.concat(cur.data_state.field)
      },[]);
      console.log('node.data_state.field',node.data_state.field);
      return node.data_state.field
    }
    else {
      node.data_state.field = [];
      return [];
    }
  },


  setMyNodes({commit}, newmynodes){
    commit('SET_MY_NODES', newmynodes);
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
