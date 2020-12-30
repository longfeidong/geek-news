'use strict';
// 获取云数据库的引用
const db = uniCloud.database()
// 获取数据库聚合操作符
const $ = db.command.aggregate
// 获取查询操作符
const dbCmd = db.command

exports.main = async (event, context) => {
	
	const {
		user_id, // 用户id
		article_id, // 文章id
		content // 评论内容
	} = event
	
	let user = await db.collection('user').doc(user_id).get()
	user = user.data[0]
	// 评论的信息
	let commentObj = {
		comment_id: createId(5), // 评论id
		comment_content: content, // 评论内容
		create_time: new Date().getTime(), // 创建评论的时间
		author: {
			author_id: user._id, // 作者id
			author_name: user.author_name, // 作者名称
			author: user.avatar, // 作者头像
			professional: user.professional // 作者专业
		},
		replys: [] // 回复信息
	}
	
	// 更新文章评论信息
	await db.collection('article').doc(article_id).update({
		comments: dbCmd.unshift(commentObj)
	})
	
	//返回数据给客户端
	return {
		code: 200,
		message: '数据更新成功'
	}
};

function createId(length) {
	return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36)
}
