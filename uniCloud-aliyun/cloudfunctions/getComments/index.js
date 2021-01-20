'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate

exports.main = async (event, context) => {
	const {
		user_id,
		article_id
	} = event
	
	const list = await db.collection('article')
		// 获取聚合实例
		.aggregate()
		// 根据 comments 字段对文档进行拆分
		.unwind('$comments')
		// 根据查询条件过滤文档
		.match({
			_id: article_id
		})
		// 指定字段是否包含在输出中
		.project({
			_id: 0,
			comments: 1
		})
		// 指定 comments 字段作为输出的根节点
		.replaceRoot({
			newRoot: '$comments'
		})
		.end()
	
	//返回数据给客户端
	return {
		code: 200,
		msg: '数据获取成功',
		data: list.data
	}
};
