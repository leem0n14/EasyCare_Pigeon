import login from "../store/modules/login";

export function Audio(url) {
	const innerAudioContext = uni.createInnerAudioContext();
	innerAudioContext.autoplay = true;
	innerAudioContext.src = url;
	// 开启自动播放
	innerAudioContext.autoplay = true;
	innerAudioContext.sessionCategory = 'soloAmbient';
	innerAudioContext.onPlay(() => {
	  console.log('开始播放');
	});
	innerAudioContext.onEnded(() => {
		console.log('播放结束');
	});
	innerAudioContext.onError((res) => {
	  console.log(res.errMsg);
	  console.log(res.errCode);
	});
}

// //创建音频实例
// createAudio(audioSrc){
// 	this.innerAudioContext = uni.createInnerAudioContext(); //创建播放器对象
// 	this.innerAudioContext.src = audioSrc;//生成的mp3音频文件地址
// 	this.innerAudioContext.play();//执行播放
// 	this.innerAudioContext.onEnded(() => {
// 		//播放结束
// 		this.innerAudioContext = null;
// 	});
// 	this.innerAudioContext.onError((res) => {
// 		console.log(res.errMsg);
// 		console.log(res.errCode);
// 	})
// },
// //抽蛋音频播报
// whip(){
// 	this.createAudio('../../static/sudio/whip.mp3');
// },
// //留窝音频播报
// stay(){
// 	this.createAudio('../../static/audio/stay.mp3');
// },
// // 撤回音频播报
// withdraw(){
// 	this.createAudio('../../static/audio/withdraw.mp3');
// }
