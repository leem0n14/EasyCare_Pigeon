<template>
	<view>
		<view class="circle">
			<view class="houseId box-showdow row-center" v-model="houseId">
				{{nfcId ? '鸽舍号：'+nfcId : '鸽舍号'}}
			</view>
			<view class="control box-showdow row-center">
				{{control}}中
			</view>
			<view class="ul">
				<view class="li" v-for="(item,index) in num" :key="index" @tap="selectNum(item)">
					<li class="list" :class="{warn:item.warn}">
						{{item.text}}
					</li>
					<span v-show="item.cdWarn" :data-item="item">产蛋异常</span>
					<span v-show="item.pdWarn" :data-item="item">破蛋异常</span>
					<span v-show="item.qfWarn" :data-item="item">弃孵异常</span>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapGetters} from 'vuex'
	// import mixin from '@/mixins/index.js'
	export default {
		data() {
			return {
				num: [{
					text: 1,
					warn: false,
					pdWarn: false,
					cdWarn: false,
					qfWarn: false
				}, {
					text: 4,
					warn: false,
					pdWarn: false,
					cdWarn: false,
					qfWarn: false
				}, {
					text: 2,
					warn: false,
					pdWarn: false,
					cdWarn: false,
					qfWarn: false
				}, {
					text: 5,
					warn: false,
					pdWarn: false,
					cdWarn: false,
					qfWarn: false
				}, {
					text: 3,
					warn: false,
					pdWarn: false,
					cdWarn: false,
					qfWarn: false
				}, {
					text: 6,
					warn: false,
					pdWarn: false,
					cdWarn: false,
					qfWarn: false
				}, ],
				houseId: '',
				control:''
			}
		},
		mounted() {
			this.houseId = this.$store.state.NFC.nfcId
			this.control = uni.getStorageSync('control')
			// let pages = getCurrentPages();
			// this.route = pages[pages.length - 1].$page.fullPath
			// console.log("当前页面的路由", pages[pages.length - 1].$page.fullPath)
		},
		onShow() {
			// this.testNFC(this.isTo,this.isOpen)
		},
		computed: {
			...mapGetters(['nfcId'])
		},
		methods: {
			selectNum(item) {
				console.log(item)
				uni.setStorageSync('cageId', item.text)
				uni.navigateTo({
					url: uni.getStorageSync('url')
				})
			},
			// getPdWarn() {
			// 	reqGetPdWarn(this.houseId).then(({
			// 		data
			// 	}) => {
			// 		if (data.code == 200) {

			// 			if (data.cageId) {
			// 				let cageIds = data.cageId
			// 				let nums = this.num
			// 				console.log('cageIds', cageIds)
			// 				console.log('nums', nums)
			// 				// 过滤拿到数组的值
			// 				let list = cageIds.filter(item => {
			// 					// 循环nums，判断该数组元素中text属性是否与item相等
			// 					for (let i = 0; i < nums.length; i++) {
			// 						if (nums[i].text == item) {
			// 							return item
			// 						}
			// 					}
			// 				})
			// 				console.log('list', list)
			// 				list.filter(item => {
			// 					this.num[item - 1].warn = true
			// 					this.num[item - 1].pdWarn = true
			// 				})
			// 			}
			// 		}
			// 	})
			// },
			// getCdWarn() {
			// 	reqGetCdWarn(this.houseId).then(({
			// 		data
			// 	}) => {
			// 		if (data.code == 200) {
			// 			if (data.cageId) {
			// 				let cageIds = data.cageId
			// 				let nums = this.num
			// 				console.log('cageIds', cageIds)
			// 				console.log('nums', nums)
			// 				// 过滤拿到数组的值
			// 				let list = cageIds.filter(item => {
			// 					// 循环nums，判断该数组元素中text属性是否与item相等
			// 					for (let i = 0; i < nums.length; i++) {
			// 						if (nums[i].text == item) {
			// 							return item
			// 						}
			// 					}
			// 				})
			// 				console.log('list', list)
			// 				list.filter(item => {
			// 					this.num[item - 1].warn = true
			// 					this.num[item - 1].cdWarn = true
			// 				})
			// 			}
			// 		}
			// 	})
			// },
			// getQfWarn() {
			// 	reqQifuWarn(this.houseId).then(({
			// 		data
			// 	}) => {
			// 		if (data.code == 200) {
			// 			let cageIds = data.cageId
			// 			let nums = this.num
			// 			console.log('cageIds', cageIds)
			// 			console.log('nums', nums)
			// 			// 过滤拿到数组的值
			// 			let list = cageIds.filter(item => {
			// 				// 循环nums，判断该数组元素中text属性是否与item相等
			// 				for (let i = 0; i < nums.length; i++) {
			// 					if (nums[i].text == item) {
			// 						return item
			// 					}
			// 				}
			// 			})
			// 			list.filter(item => {
			// 				this.num[item - 1].warn = true
			// 				this.num[item - 1].qfWarn = true
			// 			})
			// 		}
			// 	})
			// }
		}
	}
</script>

<style lang="scss" scoped>
	.houseId {
		width: 80%;
		margin:0 auto;
		padding: 18.12rpx 18.12rpx;
		font-size: 39.86rpx;
		font-weight: 700;
	}
	.control{
		width: 70%;
		margin:0 auto;
		font-size: 36rpx;
		font-weight: 700;
		color:#2979ff;
		padding: 18.12rpx 18.12rpx;
	}

	.circle {
		width: 100%;
		height: 100%;

		h1 {
			text-align: center;
			font-weight: 700;
		}

		.ul {
			display: flex;
			justify-content: space-around;
			align-content: space-around;
			width: 100%;
			flex-wrap: wrap;
			margin-top: 20rpx;

			.li {
				display: flex;
				flex-direction: column;
				margin: 100rpx 100rpx;
				text-align: center;

				.list {
					width: 150rpx;
					height: 150rpx;
					line-height: 150rpx;
					font-size: 100rpx;
					font-weight: 700;
					box-shadow: 0 0 10rpx gray;
					list-style: none;
					background-color: #f0f3fa;
					box-shadow: 10px 10px 20px 10px #d7dfef;
					border-radius: 36.23rpx;
				}

				span {
					margin-top: 10rpx;
					font-weight: normal;
					color: red;
					font-size: 30rpx
				}
			}
		}
	}

	@media (min-width: 768px) {
		.circle .ul .li {
			margin: 60rpx 60rpx
		}
	}
</style>