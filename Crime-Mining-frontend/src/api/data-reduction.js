import request from '@/utils/request'

export function dataPreprocessing(data) {
  return request({
    url: '/dataReduction/dataPreprocessing',
    method: 'post',
		data: data,
		headers: {
			'Content-Type': 'multipart/form-data'
		},
		responseType: 'blob'
  })
}

export function dataReduction(data) {
  return request({
    url: '/dataReduction/dataReductionProcessing', 
    method: 'post',
		data: data,
		headers: {
			'Content-Type': 'multipart/form-data'
		},
		responseType: 'blob'
  })
}

export function dataReductionAlgorithms(data) {
  return request({
    url: '/dataReduction/algorithms', 
    method: 'GET'
  })
}
