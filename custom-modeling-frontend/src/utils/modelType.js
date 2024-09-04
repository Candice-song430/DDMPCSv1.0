import Vue from 'vue'
const modeTypes = [
  {
    label:'Default',
    value: '',
    color: 'grey'
  },
  {
    label:'Error',
    value: 'yujing',
    color: '#0096e5'
  },

]

function getLabelByValue(val){
  for(let i = 0; i < modeTypes.length; i++){
    if(modeTypes[i].value === val){
      return modeTypes[i].label;
    }
  }
}
function getColorByValue(val){
  for(let i = 0; i < modeTypes.length; i++){
    if(modeTypes[i].value === val){
      return modeTypes[i].color;
    }
  }
}

Vue.filter('getLabelByValue',getLabelByValue)
Vue.filter('getColorByValue',getColorByValue)

export {
  modeTypes,
  getLabelByValue,
  getColorByValue
}