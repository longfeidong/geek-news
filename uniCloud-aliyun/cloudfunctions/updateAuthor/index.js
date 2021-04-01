'use strict';
// 获取数据库索引
const db = uniCloud.database()
// 获取数据库操作符
const dbCmd = db.command

exports.main = async (event, context) => {
	const {
		user_id, // 当前登录用户的id
		author_id // 要关注的作者id
	} = event
	
	// 获取当前用户的信息
	const user = await db.collection('user').doc(user_id).get()
	// 获取当前用户关注的作者id列表
	const author_likes_ids = user.data[0].author_likes_ids
	
	// 判断当前是关注还是取消关注
	let author_ids = null
	if (author_likes_ids.includes(author_id)) {
		author_ids = dbCmd.pull(author_id)
	} else {
		author_ids = dbCmd.addToSet(author_id)
	}
	
	// 更新作者id列表
	await db.collection('user').doc(user_id).update({
		author_likes_ids: author_ids
	})
	
	
	//返回数据给客户端
	return {
		code: 200,
		msg: '数据更新成功'
	}
};
