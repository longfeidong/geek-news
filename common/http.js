export default function $http(options){
	const { url, data } = options
	// 添加请求参数 user_id
	const dataObj = {
		'user_id': '5fb37b3fde65bb0001ec3f54',
		...data
	}
	return new Promise((resolve, reject) => {
		uniCloud.callFunction({
			name: url,
			data: dataObj
		}).then((res) => {
			if (res.result.code === 200) {
				resolve(res.result)
				// const { result } = res
				// this.labelList = result.data
				// console.log(this.labelList)
			} else {
				reject(res.result)
			}
		}).catch((err) => {
			reject(err)
			console.log(err)
		})
	})
}