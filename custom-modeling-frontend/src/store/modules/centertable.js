import axios from "axios";

/**

 */
const state = {
  show: false,
  centerCmpIs: 'showData',
  title: '',

  table_header: [],
  table_data: [],
  page: 1,

  all_data_items: 0,


  chart_options: [],


  preShowId: -1,

  pre_show_titles: [],


  condition_data: [],
  condition_field: []
}

const mutations = {
  CLOSE_TABLE(state){
    state.show = false;
    state.title = '';
    state.centerCmpIs = 'showData';
    state.table_header = [];
    state.page = 1;
    state.all_data_items = 0;
    state.table_data = [];

    state.chart_options = [];

    state.preShowId = -1;
    state.pre_show_titles = [];

    state.condition_data = [];
    state.condition_field = [];
  },
  OPEN_TABLE(state){
    state.show = true;
  },
  SET_PAGE(state, page){
    state.page = page;
  },
  SET_ALL_DATA_ITEMS(state, num){
    state.all_data_items = num;
  },
  /**
   * @param {*} state 
   * @param {*} param1 
   */
  SET_TABLE(state, {title, table_header, table_data}){
    if(title){
      state.title = title;
    }
    if(table_header.length > 0){
      state.table_header = table_header;
    }
    if(table_data){
      state.table_data = table_data;
    }
  },
  /**
   * @param {*} state 
   * @param {*} param1 
   */
  SET_FIELD(state, {title,table_data}) {
    state.title = title;
    // state.centerCmpIs = 'showField';
    state.table_data = table_data;
  },

  SET_CONDITION(state, {condition_data,condition_field}){
    state.condition_data = condition_data;
    state.condition_field = condition_field;
  },
  /**
   * @param {*} state 
   * @param {*} param1 
   */
  SET_CHART(state, {title, options}){
    state.title = title;
    // state.centerCmpIs = 'showCharts';
    state.chart_options = options;
  },
  /**
   * @param {*} state 
   * @param {*} payload 
   */
  SET_PRE_SHOW(state,payload){
    state.preShowId = payload.id;
  },
  ADD_PRE_SHOW_TITLES(state, payload){
    state.pre_show_titles = state.pre_show_titles.concat(payload);
  },
  /**
   * @param {*} state 
   * @param {*} type 
   */
  SET_TYPE(state, type){
    state.centerCmpIs = type;
  }
}

const actions = {
  closeTable({commit, dispatch}){
    commit('CLOSE_TABLE');
    dispatch('centertable/flashAll',null, {root: true});
  },

  setType({commit}, type){
    commit('SET_TYPE', type);
  },

  openTable({commit}){
    commit('OPEN_TABLE');
  },

  setPage({commit}, page){
    commit('SET_PAGE', page);
  },

  setAllDataItems({commit},num){
    commit('SET_ALL_DATA_ITEMS',num);
  },

  setTable({commit,dispatch}, payload){
   
    commit('SET_TABLE', payload);
    dispatch('setType', 'showData');
  },

  setField({commit,dispatch}, payload){
    commit('SET_FIELD', payload);
    dispatch('setType', 'showField');
  },

  setCondition({commit, dispatch}, payload){
    commit('SET_CONDITION', payload);
    dispatch('setType', 'showConditions')
  },

  setChart({commit,dispatch}, payload) {
    commit('SET_CHART', payload);
    dispatch('setType', 'showCharts');
  },

  setPreShow({commit,dispatch}, payload) {
    commit('SET_PRE_SHOW', payload);
    // dispatch('setType', 'preShow');
  },

  addPreShowTitles({commit}, payload){
    commit('ADD_PRE_SHOW_TITLES', payload);
  },


  flashAll({commit,dispatch, rootState}){
    let nodes = rootState.mynodes.nodes;
    
    nodes.forEach(it => {
      if(it!==null){
        let payload = {
          node: it
        }
        dispatch('mynodes/flashToolField',payload, {root: true});
      }
    })
  },

  getAllPortsById({commit, dispatch}, payload){
    axios.post('/model-exec/getAllPortsById',{
      id: payload.id
    }).then(res => {
      dispatch('addPreShowTitles', res.data);
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
