import Vue from 'vue'

const categories = [
  {
    category_name: 'database', 
    in_port: 0, 
    category_type: 'database',
    comment: 'database',
    include_children: ['database']
  },
  {
    category_name: 'toolA', 
    in_port: 2,
    category_type: 'Double Entry Tool', 
    comment: 'Inner Join Two databases',
    include_children: ['Inner Join']
  },
  {
    category_name: 'toolB', 
    in_port: 1,
    category_type: 'Single Entry Tool', 
    comment: 'Sort by a field in ascending or descending order',
    include_children: ['Sort']
  },
  {
    category_name: 'toolC', 
    in_port: 1,
    category_type: 'Single Entry Tool', 
    comment: 'Distinct ',
    include_children: ['Distinct']
  },
  {
    category_name: 'toolD', 
    in_port: 2,
    category_type: 'Double Entry Tool', 
    comment: 'Outer Jion ',
    include_children: ['Outer Jion']
  },
  {
    category_name: 'toolE', 
    in_port: 2,
    category_type: 'Double Entry Tool', 
    comment: 'Left Jion ',
    include_children: ['Left Jion']
  },
  {
    category_name: 'toolF', 
    in_port: 2,
    category_type: 'Double Entry Tool', 
    comment: 'Right Jion ',
    include_children: ['Right Jion']
  },
  {
    category_name: 'toolG', 
    category_type: 'Single Entry No Output', 
    comment: 'Export',
    include_children: ['Export']
  },
  {
    category_name: 'toolH', 
    in_port: 1,
    category_type: 'Single Entry Tool', 
    comment: 'Copy',
    include_children: ['Copy']
  },
  {
    category_name: 'toolI', 
    in_port: 2,
    category_type: 'Double Entry Tool', 
    comment: 'Intersection',
    include_children: ['Intersection']
  },
  {
    category_name: 'toolJ', 
    in_port: 2,
    category_type: 'Double Entry Tool', 
    comment: 'Union',
    include_children: ['Union']
  },
  {
    category_name: 'toolK', 
    in_port: 2,
    category_type: 'Double Entry Tool', 
    include_children: ['Difference']
  },
  {
    category_name: 'toolL', 
    in_port: 1,
    category_type: 'Single Entry Tool', 
    comment: 'Conditional Filter',
    include_children: ['Conditional Filter']
  },
  {
    category_name: 'chartA', 
    category_type: 'Single Entry Tool', 
    in_port: 1,
    include_children: ['Pie chart', 'Basic line chart', 'Bar chart', 'Scatter plot', 'Radar chart', 'Heat map']
  },
  {
    category_name: 'modelInfo', 
    category_type: 'mpdel',
    in_port: 0,
    include_children: ['modelInfo']    
  },
  {
    category_name: 'modelNode', // Model Node,
    category_type: 'Model Node',
    in_port: 0,
    include_children: ['modelNode']    
  }
]

function getCategoryName(val){
  for(let cat of categories) {
    if(cat.include_children.includes(val)){
      return cat.category_name;
    }
  }
  return 'defaultCmp'
}
function getCategoryType(val){
  for(let cat of categories) {
    if(cat.include_children.includes(val)){
      return cat.category_type;
    }
  }
  new Error('categories.js： Type not found');
}
function getCategoryInPort(val){
  for(let cat of categories) {
    if(cat.include_children.includes(val)){
      return cat.in_port;
    }
  }
  new Error('categories.js： Number of entry points not found');  
}
function getComment(val){
  for(let cat of categories) {
    if(cat.include_children.includes(val)){
      return cat.comment || '';
    }
  }
  new Error('categories.js： Node annotation not obtained');  
}

Vue.filter('getCategoryName', getCategoryName);
Vue.filter('getCategoryType', getCategoryType);
Vue.filter('getComment', getComment);



export {
  getCategoryName,
  getCategoryType,
  getCategoryInPort,
  getComment
}