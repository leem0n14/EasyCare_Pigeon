/** S 是否H5端 **/
// #ifdef H5
const IS_H5 = true
// #endif

// #ifndef H5
const IS_H5 = false
// #endif
/** E 是否H5端 **/

/** S API BaseURL **/
const baseURLMap = {
	// 开发环境 
	//8081是测试接口
	development: 'http://47.113.109.240:8081',
	// development: 'http://192.168.207.139:8081',
	// 生产环境
	production: IS_H5 ? location.origin +'/app/' : 'http://47.113.109.240:8081',
	// production: IS_H5 ? location.origin : 'http://192.168.207.139:8081',
}

const baseURL = baseURLMap[process.env.NODE_ENV]


/** E API BaseURL **/


module.exports = {
	HEADER: {
		'content-type': 'application/json'
	},
	baseURL, // API Base URL
}
