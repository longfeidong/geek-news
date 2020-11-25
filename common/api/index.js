// import { getLabel, getList } from './list.js'

// export default {
// 	getLabel,
// 	getList
// }

// 批量导出文件
const requireApi = require.context(
	// api 目录的相对路径
	'.',
	// 是否查询子目录
	false,
	// 查询文件的后缀名
	/\.js$/
)
// console.log(requireApi)
console.log(requireApi.keys())

let module = {}
requireApi.keys().forEach((key, index) => {
	console.log(key)
	if (key === './index.js') return
	Object.assign(module, requireApi(key))
})
console.log(module)

export default module
