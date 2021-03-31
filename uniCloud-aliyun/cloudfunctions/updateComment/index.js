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
		content, // 评论内容
		comment_id = '', // 评论id
		reply_id = '', // 子回复id
		is_reply = false // 是否有子回复
	} = event
	
	let user = await db.collection('user').doc(user_id).get()
	user = user.data[0]
	
	// 获取当前的文章信息
	const article = await db.collection('article').doc(article_id).get()
	// 获取当前文章下的所有评论，一组数组信息
	const comments = article.data[0].comments
	
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
		replys: [], // 回复信息
		is_reply: is_reply // 区分是主回复 还是子回复
	}
	
	if (comment_id === '') {
		// 评论文章
		commentObj.replys = []
		commentObj = dbCmd.unshift(commentObj)
	} else {
		// 回复评论内容
		// 获取当前要回复评论的索引
		let commentIndex = comments.findIndex(item => item.comment_id === comment_id)
		let commentAuthor
		if (is_reply) {
			// 子回复
			// 获取当前子回复的作者信息(回复给谁)
			commentAuthor = comments[commentIndex].replys.find(item => item.comment_id === reply_id)
		} else {
			// 主回复
			// 获取当前评论的作者信息(回复给谁)
			commentAuthor = comments.find(item => item.comment_id === comment_id)
		}
		commentAuthor = commentAuthor.author.author_name
		// 保存要回复的作者昵称
		commentObj.to = commentAuthor
		// console.log(commentObj)
		
		// 更新回复信息
		// 更新数组某一个下标下指定的某一个字段
		commentObj = {
			[commentIndex]: {
				replys: dbCmd.unshift(commentObj)
			}
		}
		// console.log(commentObj)
		/*
		let obj = {
			arr: [{name: 1}, {name: 2}]
		}
		xxx.update({
			arr: {
				1: {
					name: 3
				}
			}
		})
		*/
	}
	
	// 更新文章评论信息
	await db.collection('article').doc(article_id).update({
		comments: commentObj
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
