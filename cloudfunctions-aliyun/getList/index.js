'use strict';
// 获取数据库的引用
const db = uniCloud.database();

exports.main = async (event, context) => {
	//event为客户端上传的参数
	// console.log('event : ', event)
	
	// 接受分类，通过分类去筛选数据
	const { 
		name,
		page = 1,
		pageSize = 10
	} = event
	
	let matchObj = {}
	if (name !== '全部') {
		matchObj = {
			classify: name
		}
	}
	
	let listInfo = await db.collection('article')
	.aggregate()
	.match(matchObj)
	.project({
		content: false
	})
	// 计算跳过多少条数据
	.skip(pageSize*(page-1))
	// 每次限制输出多少条
	.limit(pageSize)
	.end()
	
	// 获取数据表 article 的数据，await要放在 async 中执行
	// let listInfo = await db.collection('article')
	// .field({
	// 	// true 表示只返回这个字段，false 表示不返回，过滤掉
	// 	content: false
	// })
	// .get()
	
	//返回数据给客户端
	return {
		code: 200,
		message: '数据请求成功',
		data: listInfo.data
	}
};
