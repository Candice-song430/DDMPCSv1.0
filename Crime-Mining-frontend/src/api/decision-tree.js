import request from '@/utils/request'

export function decisionTreeAnalysis(data) {
  return request({
    url: '/decisionTree/decisionTreeAnalysis',
    method: 'post',
		data: data,
		headers: {
			'Content-Type': 'multipart/form-data'
		},
  })
}

export function decisionTreeAlgorithms(data) {
  return request({
    url: '/decisionTree/algorithms', 
    method: 'GET'
  })
}

export function decisionTreeTest(data) {
  return request({
    url: '/decisionTree/test', 
    method: 'post',
		data: data,
		headers: {
			'Content-Type': 'multipart/form-data'
		},
  })
}
