import request from '@/utils/request'

export function ruleExtraction(data) {
  return request({
    url: '/ruleExtraction/ruleExtractionProcessing',
    method: 'post',
		data: data,
		headers: {
			'Content-Type': 'multipart/form-data'
		},
  })
}

export function ruleExtractionAlgorithms(data) {
  return request({
    url: '/ruleExtraction/algorithms',
    method: 'GET'
  })
}
