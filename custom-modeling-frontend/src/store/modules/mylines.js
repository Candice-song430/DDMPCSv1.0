/**
 * id: id,
 */
const state = {
  length: 0,
  lines: [
  ],
  tempLine: {
    start: {pos_x: 0, pos_y: 0},
    end: {pos_x: 0, pos_y: 0}
  },
  currentClickLine: -1
}

const mutations = {
  // CHANGE_POSITION_BY_ID(state,{id, pos_x, pos_y}) {
  //   console.log(id, pos_x, pos_y);
  //   state.nodes[id].x += pos_x;
  //   state.nodes[id].y += pos_y;
  // }
  /**
   * @param {*} state 
   * @param {*} param1 
   */
  CREATE_TEMP_LINE(state, {start_pos_x, start_pos_y, end_pos_x, end_pos_y}) {
    state.tempLine.start.pos_x = start_pos_x;
    state.tempLine.start.pos_y = start_pos_y;
    state.tempLine.end.pos_x = end_pos_x;
    state.tempLine.end.pos_y = end_pos_y;
  },
  /**
   * @param {*} state 
   */
  CLEAR_TEMP_LINE(state) {
    state.tempLine = {
      start: {pos_x: 0, pos_y: 0},
      end: {pos_x: 0, pos_y: 0}
    }
  },
  /**
   * @param {*} state 
   * @param {*} param1 
   */
  CREATE_LINE(state, {startPortName, endPortName}) {
    state.lines.push({
      id: state.length++,
      start: startPortName,
      end: endPortName
    })

  },
  /**
   * @param {*} state 
   * @param {*} param1 
   */
  CHANGE_CURRENT_CLICK_LINE(state, {lineId}){
    state.currentClickLine = lineId;
  },
  DELETE_LINE(state, {lineId}){
    state.lines.splice(lineId, 1, null);
    state.currentClickLine = -1;
  },
  SET_MY_LINES(state, newmylines){
    state.length = newmylines.length;
    state.lines = newmylines.lines;
    state.tempLine = newmylines.tempLine;
    state.currentClickLine = newmylines.currentClickLine;
  }
}

const actions = {
  // changePositionByID({commit}, payload) {
  //   commit('CHANGE_POSITION_BY_ID', payload);
  // }
  createTempLine({commit}, payload) {
    commit('CREATE_TEMP_LINE', payload);
  },
  clearTempLine({commit}, payload) {
    commit('CLEAR_TEMP_LINE');
  },
  createLine({state,dispatch,commit}, payload) {
    let payload1 = {
      lineId: state.length,
      nodeId: Number(payload.startPortName.split('_')[0]),
      portId: Number(payload.startPortName.split('_')[1])
    }
    let payload2 = {
      lineId: state.length,
      nodeId: Number(payload.endPortName.split('_')[0]),
      portId: Number(payload.endPortName.split('_')[1])
    }
    commit('CREATE_LINE',payload);
    dispatch("mynodes/changePortLineId", payload1, {root:true})
    dispatch("mynodes/changePortLineId", payload2, {root:true})
  },
  changeCurrentClickLine({commit}, payload){
    commit('CHANGE_CURRENT_CLICK_LINE', payload);
  },
  deleteLine({commit, state, dispatch}){
    if(state.currentClickLine !== -1){
      let payload = state.lines[state.currentClickLine];
      let payload1 = {
        lineId: -1,
        nodeId: Number(payload.start.split('_')[0]),
        portId: Number(payload.start.split('_')[1])
      }
      let payload2 = {
        lineId: -1,
        nodeId: Number(payload.end.split('_')[0]),
        portId: Number(payload.end.split('_')[1])
      }
      dispatch("mynodes/changePortLineId", payload1, {root:true})
      dispatch("mynodes/changePortLineId", payload2, {root:true})
      commit('DELETE_LINE', {lineId:state.currentClickLine});
    }
  },
  deleteLineById({commit, state, dispatch}, payload){
      let payloadl = state.lines[payload.lineId];
      let payload1 = {
        lineId: -1,
        nodeId: Number(payloadl.start.split('_')[0]),
        portId: Number(payloadl.start.split('_')[1])
      }
      let payload2 = {
        lineId: -1,
        nodeId: Number(payloadl.end.split('_')[0]),
        portId: Number(payloadl.end.split('_')[1])
      }
      dispatch("mynodes/changePortLineId", payload1, {root:true})
      dispatch("mynodes/changePortLineId", payload2, {root:true})
      commit('DELETE_LINE', {lineId:payload.lineId});
  },

  setMyLines({commit}, newmylines){
    commit('SET_MY_LINES', newmylines);
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
