'use strict';
const db = uniCloud.database()
const dbCmd = db.command

exports.main = async (event, context) => {
	//event为客户端上传的参数
	// console.log('event : ', event)
	const {
		user_id,
		article_id
	} = event
	
	const userInfo = await db.collection('user').doc(user_id).get()
	
	const article_id_ids = userInfo.data[0].article_likes_ids
	let dbCmdFuns = null
	if (article_id_ids.includes(article_id)) {
		dbCmdFuns = dbCmd.pull(article_id)
	} else {
		dbCmdFuns = dbCmd.addToSet(article_id)
	}
	
	await db.collection('user').doc(user_id).update({
		// 添加 addToSet push, 删除 pull
		article_likes_ids: dbCmdFuns
	})
	
	//返回数据给客户端
	return {
		code: 200,
		message: '数据请求成功',
		data: userInfo.data[0]
	}
};
