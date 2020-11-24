'use strict';
// 获取数据库的引用
const db = uniCloud.database();

exports.main = async (event, context) => {
	//event为客户端上传的参数
	// console.log('event : ', event)
	
	// 获取数据表 Label 的数据，await要放在 async 中执行
	let label = await db.collection('label').get()
	
	//返回数据给客户端
	return {
		code: 200,
		message: '数据获取成功',
		data: label.data
	}
};
