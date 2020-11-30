'use strict';
// 获取数据库的引用
const db = uniCloud.database();

exports.main = async (event, context) => {
	//event为客户端上传的参数
	// console.log('event : ', event)
	
	// 获取数据表 article 的数据，await要放在 async 中执行
	let listInfo = await db.collection('article')
	.field({
		// true 表示只返回这个字段，false 表示不返回，过滤掉
		content: false
	})
	.get()
	
	//返回数据给客户端
	return {
		code: 200,
		message: '数据请求成功',
		data: listInfo.data
	}
};
