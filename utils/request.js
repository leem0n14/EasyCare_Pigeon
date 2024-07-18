import axios from '../js_sdk/xtshadow-axios/axios.min';
import store from '../store';
import qs from 'qs';
import {
	acountList,
	currentPage,
	paramsToStr,
	tabbarList,
} from './tools';
import Cache from './cache';
import Cookie from './cookie';
import {
	BACK_URL,
	TOKEN,
} from '../config/cachekey';
import {
	baseURL,
} from '../config/app';

const CancelToken = axios.CancelToken; // 生成终止请求的cancelToken对象
const pendingRequest = new Array();
// 用于生成当前请求的信息生成请求的Key
// function generateReqKey(config) {
//     const { method, url, params, data } = config;
// 	console.log('生成请求的key');
//     return [method, url, qs.stringify(params), qs.stringify(data)].join('&');
// }

// 用于把当前请求信息添加到 pendingRequest对象中
// const pendingRequest = new Map();
// function addPendingRequest(config) {
// 	console.log('添加到pendingRequest对象');
//     const requestKey = generateReqKey(config);
//     config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
//         if (!pendingRequest.has(requestKey)) {
//             pendingRequest.set(requestKey, cancel);
// }
  //       } else {
		// 	const cancelToken = pendingRequest.get(requestKey);
		// 	cancelToken(requestKey);
		// 	pendingRequest.delete(requestKey);
		// 	console.log('请求取消成功');
		// }
//     });
// }

// 检查是否存在重复请求，若存在则需要取消已发出的请求
// function removePendingRequest(config) {
//     const requestKey = generateReqKey(config);
// 	addPendingRequest(config);
    // if (pendingRequest.has(requestKey)) {
    //    const cancelToken = pendingRequest.get(requestKey);
    //    cancelToken(requestKey);
    //    pendingRequest.delete(requestKey);
	   // console.log('请求取消成功');
    // }
// }

function checkParams(params) {
	if (typeof params !== 'object') { return params; }
	for (const key in params) {
		const value = params[key];
		if (value === null || value === undefined || value === '') {
			delete params[key];
		}
	}
	return params;
}


const service = axios.create({
	baseURL,
	timeout: 5000,
	header: {
		'content-type': 'application/json',
	},

});


// request拦截器
service.interceptors.request.use(
	(config) => {
		// const source = CancelToken.source(); // 每个请求时都生成一个source对象
 	// 	config.cancelToken = source.token;// 设置cancelToken字段为source的token，用于source.cancel()删除
		// store.commit('ADDREQUESTS', source);
		// 检查是否存在重复请求
		// removePendingRequest(config);
		// 将当前请求信息添加到pendingRequest对象中
		// addPendingRequest(config);
		config.data = checkParams(config.data);
		config.params = checkParams(config.params);
		if (config.method == 'GET') {
			config.url += paramsToStr(config.params);
		}
		config.header.Canghao = Cookie.get('canghao');
		// 请求头传入真token
		config.header.Authorization = Cookie.get('tureToken');
		
		return config;
	},
	(error) => {
		// Do something with request error
		console.log(error); // for debug
		Promise.reject(error);
	}
);

// response 拦截器
service.interceptors.response.use(
	async (response) => {
			if (response.data) {
				const {
					code,
					show,
					msg,
				} = response.data;
				const {
					route,
					options,
				} = currentPage();
				if (code == 0 && show && msg) {
					uni.showToast({
						title: msg,
						icon: 'none',
					});
				} else if (code == -1) {
					store.commit('LOGOUT');
					// #ifdef MP-WEIXIN
					wxMnpLogin();
					// #endif
					// #ifdef H5 || APP-PLUS
					if (route && !tabbarList.includes(route)) {
						toLogin();
					}
					// #endif
					// #ifdef H5
					if (!acountList.includes(route)) {
						Cache.set(BACK_URL, `/${route}${paramsToStr(options)}`);
					}
					// #endif
				}
			}
			// 从 pend ingRequest对象中移除请求
			// removePendingRequest(response.config);
			return Promise.resolve(response.data);
		},
		(error) => {
			console.log(error);
			console.log(`err${error}`); // for debug
			// removePendingRequest(error.config || {});
			return Promise.reject(error);
		}
);

export default service;
