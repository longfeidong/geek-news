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