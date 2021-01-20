import $http from '../http.js'

export const getLabel = (data) => {
	return $http({
		url: 'getLabel',
		data
	})
}

export const getList = (data) => {
	return $http({
		url: 'getList',
		data
	})
}

export const updateCollect = (data) => {
	return $http({
		url: 'updateCollect',
		data
	})
}

export const getSearch = (data) => {
	return $http({
		url: 'getSearch',
		data
	})
}

export const updateLabel = (data) => {
	return $http({
		url: 'updateLabel',
		data
	})
}

export const getDetail = (data) => {
	return $http({
		url: 'getDetail',
		data
	})
}

export const updateComment = (data) => {
	return $http({
		url: 'updateComment',
		data
	})
}
// 获取评论数据
export const getComments = (data) => {
	return $http({
		url: 'getComments',
		data
	})
}