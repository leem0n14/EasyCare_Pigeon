<script>
	import Cookie from '@/utils/cookie.js'
	export default {
		data() {
			return {
				// 当前版本号
				version: '',
				// 最新版本号
				version_new: '',
				pro:'',
				isDown:''
			}
		},
		onLaunch: function(options) {
			// #ifdef APP-PLUS
			//设置2.4秒后主动关闭，最多设置6秒
			setTimeout(() => {
				plus.navigator.closeSplashscreen();
			}, 2400);
			// #endif
			// console.log(Cookie.get('ROLE'));
			// Cookie.remove('ROLE')
			if(!Cookie.get('ROLE')){
				// console.log(Cookie.get('ROLE'))
				uni.reLaunch({
					url:'/pages/login/login'
				})
			}
		},
		onShow: function(options) {

		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			//用于对比的函数
			// duibi(version1, version2) { // version1 代表当前版本， version2 代表最新版本
			// 	let arr1 = version1.split(".");
			// 	let arr2 = version2.split(".");
			// 	let length = Math.max(arr1.length, arr2.length);
			// 	for (let i = 0; i < length; i++) {
			// 		const n1 = Number(arr1[i] || 0)
			// 		const n2 = Number(arr2[i] || 0)
			// 		// 第一个版本号大
			// 		if (n1 > n2) return 1
			// 		//第二个版本号大
			// 		if (n1 < n2) return 2
			// 	}
			// 	return false;
			// },
			// // 获取当前的版本号
			// getNowVersion() {
			// 	plus.runtime.getProperty(plus.runtime.appid, (widgetInfo) => {
			// 		this.version = widgetInfo.version;
			// 		uni.setStorageSync('version',this.version)
			// 		console.log('版本号', this.version)
			// 	});
			// },
			// // 进行弹框询问和下载安装api调用，重启app完成热更新
			// update() {
			// 	this.getNowVersion()
			// 	const flag = this.duibi(this.version,this.version_new)
			// 	if (flag === 2) {
			// 		uni.showModal({
			// 			title: "系统提示",
			// 			content: `当前版本号为 ${this.version} ，邀您更新版本 ${this.version_new}`,
			// 			success: (res) => {
			// 				//用户确认更新
			// 				if (res.confirm) {
			// 					//使用下载api(uni.downloadFile)
			// 					let uploadTask = uni.downloadFile({
			// 						url: '下载地址',
			// 						success: (downloadResult) => {
			// 							//使用安装wgtapi(plus.runtime.install)
			// 							plus.runtime.install(
			// 								downloadResult.tempFilePath, {
			// 									force: true
			// 								},
			// 								function() {
			// 									uni.showModal({
			// 										title: '系统提示',
			// 										content: '新版本已经更新完成，需要重启应用',
			// 										showCancel: false,
			// 										//用户点击确认重启
			// 										success: function(
			// 											res) {
			// 											if (res.confirm) {
			// 												// 调用重启api
			// 												plus.runtime.restart();
			// 											} else if (res.cancel) {
			// 												console.log('用户点击取消');
			// 											}
			// 										}
			// 									});
			// 								}
			// 							)

			// 						}
			// 					});

			// 					//在这里监听用户下载进度
			// 					uploadTask.onProgressUpdate((res) => {
			// 						this.pro = res.progress;
			// 						console.log(this.pro);
			// 						if (this.pro == 100) {
			// 							this.isDown = false;
			// 						}
			// 					})

			// 				}
			// 			}
			// 		});
			// 	}
			// }
		}
	}
</script>

<style lang='scss'>
	@import 'styles/base.scss';
	@import '@/static/iconfont/iconfont.css';
	/*每个页面公共css */
	@import "components/uview-ui/index.scss";

	.uni-nav-bar {
		font-weight: bold;
	}
</style>