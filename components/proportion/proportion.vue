<template>
	<view class="proportion">
		<view class="progress_bar">
			<view class="progress_left" :style="{width: leftValuePR + '%'}" v-if="leftValue">留窝: {{leftValue}}</view>
			<view class="progress_right" :style="{width: rightValuePR + '%'}" v-if="rightValue">抽蛋: {{rightValue}}</view>
		</view>
		<view class="info">
			<div v-show="leftValuePR"><span class="text">留窝: </span><span class="PR">{{saveTwoSmallNum(leftValuePR)}}%</span></div>
			<div v-show="rightValue"><span class="text">抽蛋: </span><span class="PR">{{saveTwoSmallNum(rightValuePR)}}%</span></div>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			leftValue:{
				type: Number
			},
			rightValue:{
				type: Number
			}
		},
		data(){
			return {
				siteId: uni.getStorageSync('siteId')
			}
		},
		mounted(){
			console.log('比例组件挂载')
		},
		computed:{
			leftValuePR(){
				return this.leftValue / this.allValue * 100
			},
			rightValuePR(){
				return this.rightValue / this.allValue * 100
			},
			allValue(){
				return this.leftValue + this.rightValue
			}
		},
		methods:{
			saveTwoSmallNum(number){
				return number.toFixed(2)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.proportion{
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 6vh;
		margin: 10rpx auto;
		justify-content: space-around;
		font-size: 26.92rpx;
		.progress_bar{
			width: 100%;
			height: 50%;
			display: flex;
			justify-content: space-around;
			color: #fff;
			.progress_left,.progress_right{
				display: flex;
				height: 100%;
				justify-content: center;
				align-items: center;
			}
			.progress_left{
				border-radius: 10px 10px 0 10px;
				background-color: #a1c4fd;
				animation: slide-in-left 0.8s ease-in forwards
			}
			.progress_right{
				border-radius:  10px 10px 10px 0;
				background-color: #c2e9fb;
				animation: slide-in-right 0.8s ease-in forwards;
			}
		}
		.info{
			display: flex;
			justify-content: space-between;
			width: 100%;
			height: 40%;
			font-size: 28rpx;
			text-align: center;
			
			.PR{
				font-size: 34.62rpx;
				font-weight: bold;
			}
		}
	}
	@keyframes slide-in-left{
	  from{
	    transform: scaleX(0);
	    transform-origin: left;
	  }
	  to{
	    transform: scaleX(1);
	    transform-origin: left;
	  }
	}
	@keyframes slide-in-right{
	  from{
	    transform: scaleX(0);
	    transform-origin: right;
	  }
	  to{
	    transform: scaleX(1);
	    transform-origin: right;
	  }
	}
</style>