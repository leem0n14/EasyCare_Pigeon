<template>
	<view class="box">
		<view class="notNetWarn" v-show="isNet">
			<span class="warn_left">!</span><span class="warn_right">当前网络不可用，请检查你的网络设置</span>
		</view>
		<view class="version">
			<span>当前仓号:{{siteId}}</span>
			<view @click="openPop" class="edit" v-if="isAdmin">
				前往修改
			</view>
			<view class="logout" @click="logout">
				退出登录
			</view>
		</view>
		<view class="mask" :class="{show: this.pop}" @click="offPop"></view>
		<view class="mesInf" :class="{show: this.pop}">
			<view class="siteInput">
				<!-- <label class="siteTip" v-if="">请输入修改后的仓号</label> -->
				<input type="number" v-model="siteId" class="siteId" @click="siteAniFn" placeholder="请输入修改后的仓号">
			</view>
			<u-button type="primary" size="medium" @click="saveSiteId">确认</u-button>
			<uni-icons type="close" size="40" @click="offPop" class="offBtn" color="white"></uni-icons>
		</view>
		
			<view class="btns column-around">
				<button class="button" :class="{choosed: item.choose}" v-for='(item,index) in list' :key="index"
					v-show="item.isShow" :disabled="(index === 7 || index === 6 ) && token !== 'admin'" @click="handleClick(item,index)"
					:style="{backgroundColor: item.backgroundColor}"><span :data-item="item" class="text">{{item.text}}</span></button>
			</view>
		
		<u-modal v-model="isModal" @confirm="confirm" ref="uModal" :content="content"
			:show-cancel-button="true"></u-modal>
	</view>
</template>

<script>
	import {
		getNowDate
	} from '@/getTime.js'
	import {
		mapGetters
	} from 'vuex'
	import Cookie from '@/utils/cookie.js'
	export default {
		data() {
			return {
				home: '首页',
				list: [{
					text: '查蛋',
					operation: 'CagenumberLay',
					isShow: true,
					isButtonDisabled: false,
					url: '/pages/cagenumber-layEggs/cagenumber-layEggs',
					choose: true
				}, {
					text: '放仔',
					operation: 'CagenumberPut',
					isShow: true,
					isButtonDisabled: false,
					url: '/pages/cagenumber-putEggs/cagenumber-putEggs',
					choose: false
				}, {
					text: '调仔',
					operation: 'CagenumberFeed',
					isShow: true,
					isButtonDisabled: false,
					url: '/pages/cagenumber-feedbirds/cagenumber-feedbirds',
					choose: false
				}, {
					text: '异常记录',
					operation: 'Expection',
					isShow: true,
					isButtonDisabled: false,
					url: '/pages/expectionHandle/expectionHandle',
					choose: false
				}, {
					text: '异常处理',
					operation: 'ExpectionHandle',
					isShow: true,
					isButtonDisabled: false,
					url: '/pages/expectionHandle/expectionHandle',
					choose: false
				}, {
					text: '放仔名单',
					operation: 'Putlist',
					isShow: true,
					isButtonDisabled: false,
					url: '/pages/administrator/administrator',
					choose: false
				}, 
				{
					text: '当天数据',
					operation: 'Administrator',
					isShow: true,
					isButtonDisabled: false,
					url: '/pages/administrator/administrator',
					choose: false
				}, {
					text: '异常预警',
					operation: 'Warning',
					isShow: true,
					isButtonDisabled: false,
					url: '/pages/warning/warning',
					choose: false
				}
				,{
					text: '历史数据',
					operation: 'AdHistory',
					isShow: Cookie.get('ROLE') === 'admin',
					isButtonDisabled: false,
					url: '/pages/ad-history/ad-history',
					choose: false
				},{
					text: '详细数据',
					operation: 'AdDetail',
					isShow: Cookie.get('ROLE') === 'admin',
					isButtonDisabled: false,
					url: '/pages/ad-detail/ad-detail',
					choose: false
				},{
					text: '更改舍号',
					operation: 'HouseChange',
					isShow: Cookie.get('ROLE') === 'admin',
					isButtonDisabled: false,
					url: '/pages/house-change/house-change',
					choose: false
				}
				// ,{
				// 	text: '添加仓号',
				// 	operation: 'siteNumberAdd',
				// 	isShow: Cookie.get('ROLE') === 'admin',
				// 	isButtonDisabled: false,
				// 	url: '/pages/siteNumberAdd/siteNumberAdd',
				// 	choose: false
				// },{
				// 	text: '分配员工号',
				// 	operation: 'empNumberAdd',
				// 	isShow: Cookie.get('ROLE') === 'admin',
				// 	isButtonDisabled: false,
				// 	url: '/pages/empNumberAdd/empNumberAdd',
				// 	choose: false
				// },
				],
				isShowDownload: false,
				version: uni.getStorageSync('version'),
				// 记录下当前选中操作在list中的下标，默认为0
				index: 0,
				pop: false,
				siteId: uni.getStorageSync('siteId'),
				siteAni: false,
				content: '确认登出吗？',
				isModal: false
			}
		},
		computed: {
			...mapGetters(['isNet', 'whipCount', 'stayCount', 'token']),
			isAdmin(){
				return Cookie.get('ROLE') === 'admin';
			}
		},
		methods: {
			handleClick(item, index) {
				this.list[this.index].choose = false
				this.index = index
				// uni.setStorageSync('control', item.text)
				this.$store.commit('SETOPERATION', item.operation)
				item.choose = true
			},
			goShezhi() {
				uni.navigateTo({
					url: '/pages/shezhi/shezhi'
				})
			},
			offPop() {
				this.pop = false
			},
			openPop() {
				this.pop = true
			},
			siteAniFn() {
				this.siteAni = true
			},
			saveSiteId() {
				uni.setStorageSync('siteId', this.siteId)
				this.offPop()
				if (uni.getStorageSync('siteId') === this.siteId) {
					this.$Toast('修改成功！');
					uni.reLaunch({
						url: '/pages/index/index'
					})
				}
			},
			logout(){
				this.isModal = true
			},
			confirm() {
				Cookie.remove('ROLE');
				this.$store.commit('REMOVE_TOKEN')
				uni.reLaunch({
					url:'/pages/login/login',
				})
				this.$Toast('登出成功');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 998;
		transform: translateX(-100%);

		&.show {
			transform: translateX(0);
		}
	}



	.mesInf {
		position: fixed;
		// height: 180px;
		padding: 9.17rpx;
		width: 80vw;
		border-bottom-left-radius: 20px;
		border-bottom-right-radius: 20px;
		z-index: -1;
		top: 50%;
		left: 50%;
		margin: auto auto;
		background-color: #fff;
		transform: translate(-50%, -50%);
		opacity: 0;
		transition: opacity 0.5s linear;

		&.show {
			opacity: 1;
			z-index: 999
		}

		.offBtn {
			all: unset;
			border: none;
			position: absolute;
			bottom: -100rpx;
			left: 50%;
			transform: translateX(-50%);
		}

		.siteInput {
			width: 60%;
			height: 73.39rpx;
			margin: 18.35rpx auto;
			position: relative;

			.siteId {
				display: inline-block;
				width: 100%;
				height: 100%;
				color: #2979ff;
				font-size: 29.36rpx;
				border-bottom: 2px solid #2979ff;
			}

			// .siteTip{
			// 	position: absolute;
			// 	top: 50%;
			// 	left: 50%;
			// 	transform: translate(-50%,-50%);
			// 	font-size: 18.35rpx;
			// 	color: #fff
			// }
		}
	}

	.box {
		width: 100%;
		height: 100%;
		text-align: center;
		position: relative;

		.notNetWarn {
			display: flex;
			width: 100%;
			height: 5vh;
			justify-content: center;
			background-color: #ffecee;

			.warn_left {
				display: inline-block;
				width: 32rpx;
				height: 32rpx;
				color: #fff;
				margin-right: 16rpx;
				border-radius: 50%;
				background-color: #fe536b;
			}

			.warn_right {
				color: #e26a83;
			}
		}

		.version {
			background-color: #f0f3fa;
			color: gray;
			width: 100%;
			height: 40rpx;
			border-radius: 0 2rpx 12rpx 0;

			span {
				font-size: 22.02rpx;
			}

			.logout {
				margin-top: 4.59rpx;
				border: 1px solid darkgray;
				width: 100%;
				height: 40rpx;
				border-radius: 72rpx;
				font-size: 22.02rpx;
				font-weight: bold;
				text-align: center;
				line-height: 40rpx;
				background-color: #ff8b33;
			}

			.edit {
				margin-top: 18.35rpx;
				font-size: 22.02rpx;
				color: #2979ff
			}
		}

		.btns {
			margin-top: 140rpx;

			.button {
				display: flex;
				width: 100%;
				height: 100rpx;
				// margin-top: 15%;
				justify-content: space-around;	
				border-bottom: 1px solid darkgray;
				align-items: center;

				&[disabled] {
					color: #c0c4cc;
					cursor: not-allowed
				}

				// color:#fff;
				.iconfont {
					display: inline-block;
					width: 50%;
					height: 50%;
					line-height: 50.27rpx;
					font-size: 37.48rpx;
				}

				.text {
					font-weight: 700;
					font-size: 25.59rpx;
				}

				&.choosed {
					background-color: gainsboro;
				}
			}
		}
	}
</style>