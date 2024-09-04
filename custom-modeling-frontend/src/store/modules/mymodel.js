import axios from 'axios'
import { Notification } from 'element-ui';
const state = {
  model_info:{
    model_id: -1,
    model_title: 'Default Title',
    model_desc: 'Default Description',
    model_creater: 'Total',
    model_type: []
  },
  all_models_basic_info:null,
  all_models_basic_part:null
}

const mutations = {
  SAVE_MODELS_BASIC_INFO(state, info){
    state.all_models_basic_info = info;
  },
  SAVE_MODELS_BASIC_PART(state, info){
    state.all_models_basic_part = info;
  },
  SAVE_MODEL_INFO(state, info){
    state.model_info = info;
  }
}

const actions = {
  saveModel({commit,state, rootState}){
    console.log('save');
    axios.post('/model-exec/save',{
      model_id: state.model_info.model_id,
      model_title: state.model_info.model_title,
      model_desc: state.model_info.model_desc,
      model_creater: state.model_info.model_creater,
      model_type: state.model_info.model_type,
      model_nodes: rootState.mynodes,
      model_lines: rootState.mylines
    }).then(res => {
      console.log(res);
      Notification.success({
        title: 'successfully',
        message: 'Model saved successfully.',
      })
    }).catch(err => {
      Notification.error({
        title: 'Failed',
        message: 'Failed to save model.',
      })

    })
  },
  loadModelById({commit,dispatch}, payload){
    axios.post('all-models/getModelById', {
      id: payload.id
    }).then(res => {
      let {model_id, model_title, model_desc, model_creater,model_type, model_nodes, model_lines} = res.data[0];
      model_nodes = JSON.parse(model_nodes);
      model_lines = JSON.parse(model_lines);
      let info = {
        model_id: model_id,
        model_title: model_title,
        model_desc: model_desc,
        model_creater: model_creater,
        model_type: model_type
      }
      commit('SAVE_MODEL_INFO', info);
      dispatch('mynodes/setMyNodes', model_nodes, {root:true});
      dispatch('mylines/setMyLines', model_lines, {root:true});
      Notification.success({
        title: 'successfully',
        message: 'Model loaded successfully.',
      })
    }).catch(err => {
      Notification.error({
        title: 'Failed',
        message: 'Failed to load the model.',
      })
      new Error('Failed to load the model.',err);
    })
  },
  async getModelById({commit,dispatch}, payload){
    return await axios.post('all-models/getModelById', {
      id: payload.id
    }).then(res => {
      console.log(res);
      return res;
    })
  },
  /**
   * @param {*} param0 
   * @param {*} payload 
   */
  resetModel({commit, dispatch}, payload){
    let info = {
      model_id: -1,
      model_title: 'Default Title',
      model_desc: 'Default Description',
      model_creater: 'Total',
      model_type: []
    }
    commit('SAVE_MODEL_INFO', info);
    let model_nodes = {
      length: 0,
      nodes: [
      ],
      currentClickNode: -1
    }
    dispatch('mynodes/setMyNodes', model_nodes, {root:true});
    let model_lines = {
      length: 0,
      lines: [
      ],
      tempLine: {
        start: {pos_x: 0, pos_y: 0},
        end: {pos_x: 0, pos_y: 0}
      },
      currentClickLine: -1
    }
    dispatch('mylines/setMyLines', model_lines, {root:true});
    Notification.success({
      title: 'successfully',
      message: 'Model reset successful.',
    })
  },
  async getModelsBasicInfo({commit}){
    await axios.get('all-models/basicinfo').then(res => {
      commit('SAVE_MODELS_BASIC_INFO',res.data);
      commit('SAVE_MODELS_BASIC_PART',res.data);
    }).catch(err => {
      Notification.error({
        title: 'Failed',
        message: 'Failed to retrieve basic model information.',
      })
      new Error('Failed to retrieve basic model information.',err);
    })
  },

  deleteModel({commit, dispatch}, payload){
    axios.post('/model-exec/delete',{
      id:payload.id
    }).then(res => {
      Notification.success({
        title: 'successfully',
        message: 'Model deletion successful.',
      })
      dispatch('getModelsBasicInfo');
    }).catch(err => {
      Notification.error({
        title: 'Failed',
        message: 'Delete model failure.',
      })
      new Error("Delete model failure.",err);
    })
  },

  
  saveModelsBasicPart({commit},info){
    commit('SAVE_MODELS_BASIC_PART', info);
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
