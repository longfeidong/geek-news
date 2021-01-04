'use strict';
// 获取数据库的引用
const db = uniCloud.database();
// 聚合操作符
const $ = db.command.aggregate

exports.main = async (event, context) => {
	//event为客户端上传的参数
	// console.log('event : ', event)
	
	// 接受分类，通过分类去筛选数据
	const { 
		user_id,
		value
	} = event
	
	// 获取当前用户信息
	const userInfo = await db.collection('user').doc(user_id).get()
	const article_likes_ids = userInfo.data[0].article_likes_ids
	let listInfo = await db.collection('article')

	.aggregate()
	// 追加返回的字段
	.addFields({
		is_collect: $.in(['$_id', article_likes_ids])
	})
	.match({
		title: new RegExp(value)
	})
	.project({
		content: false
	})
	.end()
	
	//返回数据给客户端
	return {
		code: 200,
		message: '数据请求成功',
		data: listInfo.data
	}
};
