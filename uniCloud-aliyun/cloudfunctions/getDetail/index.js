'use strict';
// 获取云数据库的引用
const db = uniCloud.database()
const $ = db.command.aggregate

exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {
		user_id,
		article_id
	} = event
	
	// 获取user数据
	let userInfo = await db.collection('user').doc(user_id).get()
	userInfo = userInfo.data[0]
	// 获取文章信息
	let articleInfo = await db.collection('article')
		.aggregate()
		.addFields({
			// 是否关注作者
			is_author_like: $.in(['$author.id', userInfo.author_likes_ids]),
			// 是否收藏文章
			is_like: $.in(['$_id', userInfo.article_likes_ids]),
			// 是否点赞
			is_thumbs_up: $.in(['$_id', userInfo.thumbs_up_article_ids])
		})
		.match({
			// 返回当前文章的内容
			_id: article_id
		})
		.project({
			coments: 0
		})
		.end()
	
	//返回数据给客户端
	return {
		code: 200,
		message: '数据获取成功',
		data: articleInfo.data[0]
	}
};
