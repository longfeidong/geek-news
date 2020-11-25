export default function $http(options){
	const { url, data } = options
	return new Promise((resolve, reject) => {
		uniCloud.callFunction({
			name: url,
			data
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