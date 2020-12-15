'use strict';
// 获取数据库的引用
const db = uniCloud.database();
const $ = db.command.aggregate

exports.main = async (event, context) => {
	//event为客户端上传的参数
	// console.log('event : ', event)
	
	const {
		user_id,
		type
	} = event
	
	let matchObj = {}
	// 根据 type 确定是返回 我的标签 还是 全部标签
	if (type !== 'all') {
		matchObj = {
			current: true
		}
	}
	
	// 获取user数据
	let userInfo = await db.collection('user').doc(user_id).get()
	userInfo = userInfo.data[0]
	
	// 获取数据表 Label 的数据，await要放在 async 中执行
	// let label = await db.collection('label').get()
	let label = await db.collection('label')
						.aggregate()
						.addFields({
							current: $.in(['$_id', $.ifNull([userInfo.label_ids, []])])
						})
						.match(matchObj)
						.end()
	
	
	//返回数据给客户端
	return {
		code: 200,
		message: '数据获取成功',
		data: label.data
	}
};
