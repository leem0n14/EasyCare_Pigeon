import Vue from 'vue';
import App from './App';
import store from './store';
import uView from '@/components/uview-ui';

// 注册全局组件
import Loading from '@/components/loading/loading';
Vue.component('loading', Loading);
import Proportion from '@/components/proportion/proportion';
Vue.component('proportion', Proportion);
Vue.prototype.$loading = () => {
	uni.showLoading({
		title: '',
		// mask: true,
	});
};
Vue.prototype.$hide = () => {
	uni.hideLoading();
};
Vue.prototype.$Toast = (title, icon = 'none', duration = 500) => {
	uni.showToast({
		title,
		icon,
		duration,
	});
};
// Vue.prototype.$debounce(fn, delay){
// 	let timer
// 	return function() {
// 		const _this = this
// 		if (timer) {
// 			clearTimeout(timer);
// 			console.log('清楚了定时器', timer)
// 		}
// 		timer = setTimeout(function() {
// 			// console.log(fn)
// 			console.log('this的值', _this)
// 			// fn.apply(_this,arguments)
// 			fn()
// 		}, delay);
// 		timer = null
// 		console.log('创建了定时器', timer)
// 	};
// };

// 获取网络状态
uni.onNetworkStatusChange((res) => {
	if (res.isConnected === false) {
		store.commit('SETNET', true);
		uni.showToast({
			title: '当前网络不可用，请检查网络连接设置',
			icon: 'none',
			position: 'top',
		});
		console.log('showshowhsohows');
	} else {
		store.commit('SETNET', false);
	}
});
// 返回指定页面
function back() {
	const pages = getCurrentPages();
	// 函数用于获取当前页面栈的实例，以数组形式按栈的顺序给出，第一个元素为首页，最后一个元素为当前页面
	const num = pages.length;
	// 当前页面栈总数
	let backnum;
	// 需要返回的页数
	for (let i = 0; i < num; i++) {
		console.log(pages[i].route);
		// 循环找到指定页面路由所在的页数
		if (pages[i].route === 'pages/readNFC/readNFC') {
			// 'pages/mypage/mypage'替换成A页面的路由地址
			backnum = num - i - 1;
			// 计算返回的层数，总数-指定页面页数-1
		}
	}
	uni.navigateBack({
		delta: backnum,
		// 返回的页面数，如果 delta 大于现有页面数，则返回到首页.
	});
}

Vue.prototype.$back = back();

Vue.config.productionTip = false;


Vue.use(uView);
App.mpType = 'app';
// Vue.mixin(minxinsApp);
const app = new Vue({
	...App,
	store,
});
app.$mount();
