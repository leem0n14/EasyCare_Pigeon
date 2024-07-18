<template>
	<view>
		<view class="tab">
			<span v-for="(item,index) in list" :key="index" @tap="choose(item)"
				:class="item.handle ? 'choose_bg' : 'bg'">{{item.text}}</span>
		</view>
		<view class="middle">
			<view class="title">
				<view style="width: 20%;">舍号</view>
				<view style="width: 20%;">笼号</view>
				<view style="width: 20%;">时间</view>
				<view style="width: 40%;">操作</view>
			</view>
			<u-loading class="loading" mode="circle" v-if="isLoading" size="36" color="blue"></u-loading>
			<template v-else>
				<view v-if="!egg_warn_list.length" class="loading">暂无数据</view>
				<template v-else>
					<scroll-view v-if="egg_warn_list.length" scroll-y="true" style="height: 70vh;">
						<view class="title" v-for="i in egg_warn_list" :key="i.id"
							style="background-color: #fff; color: #000">
							<view style="width: 20%;">{{format(i.house_id,params.site_id)}}</view>
							<view style="width: 20%;">{{i.cage_id}}</view>
							<view style="width: 20%;">{{formatDate(i.egg_time)}}</view>
							<view style="width: 40%;">
								<!-- <u-button type="primary" size="mini">编辑</u-button> -->
								<u-button type="error" size="mini" @click="del(i.id)">删除</u-button>
								<!-- </span> -->
							</view>
						</view>
						<view class="middle_bottom" v-show="params.page === totalPage">我也是有底线的~</view>
					</scroll-view>
				</template>
			</template>
		</view>
		<u-modal v-model="isModal" @confirm="confirm" ref="uModal" :async-close="true" :content="content"
			:show-cancel-button="true"></u-modal>
		<!-- 分页-->
		<view class="bottom">
			<Pagination :pageNo="params.page" :pageSize="params.pageSize" :total="total" :continues="3"
				@getPageNo="selectPage">
			</Pagination>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import {
		reqDelWarn,
		reqPostWarnList,
		reqWarnList,
		reqPCWarnList	} from '@/api/index.js'
	import{
		state,
		mutations,
		actions,
	}from '@/store/modules/eggWarning.js'
	import {
		format
	} from '@/utils/format_HouseId.js'
	import Pagination from '@/components/pagination/pagination.vue'
	export default {
		components: {
			Pagination
		},
		data() {
			return {
				isModal: false,
				content: ' 确认删除这条记录吗？',
				// 存储对应预警信息的id便于删除操作
				id: '',
				list: [{
					id: 1,
					text: '1仓',
					handle: true
				}, {
					id: 2,
					text: '2仓',
					handle: false
				}, {
					id: 3,
					text: '3仓',
					handle: false
				}],
				params: {
					site_id: 1,
					page: 1,
					pageSize: 20
				},
				egg_w: [],
				formData:{
					site_id:'',
					house_id:'',
					cage_id:'',
					egg_time:'',
					ststu:'',
					diffInDays:''
				}
			};
		},
		computed: {
			...mapGetters(['egg_warn_list', 'total', 'isLoading']),
			totalPage() {
				//向上取证
				return Math.ceil(this.total / this.params.pageSize);
			},
		},
		mounted() {
			this.saveWarnList(this.params.site_id);
			this.$store.dispatch('getWarnList', this.params)
		},
		methods: {
			// 选中仓库号时
			choose(e) {
				for (let i in this.list) {
					// console.log(i)
					this.list[i].handle = false
				}
				this.list[e.id - 1].handle = true
				this.params.site_id = e.id
				console.log(this.params)
				this.saveWarnList(e.id);
				this.$store.dispatch('getWarnList', this.params)
				// reqPCWarnList(params).then(resp => {
				// 	// console.log('历史操作resp', resp)
				// 	if (resp.code === 200) {
				// 		this.list = resp.data
				// 		this.total = resp.total
				// 		if (resp.type === 'success') {
				// 			this.isnoList = false
				// 		} else if (resp.type === 'warning') {
				// 			this.isnoList = true
				// 		}
				// 	}
				// }).finally(() => {
				// 	this.isLoading = false
				// 	uni.stopPullDownRefresh()
				// })
			},
			// 选中页号时
			selectPage(data) {



				// console.log(data)
				this.params.page = data
				// console.log(this.params)
				this.$store.dispatch('getWarnList', this.params)
			},
			// 删除预警
			del(id) {
				this.isModal = true
				this.id = id
			},
			confirm() {
				console.log('删除操作传递的id', this.id)
				const obj = {
					id: this.id
				}
				reqDelWarn(obj).then((resp) => {
					console.log(resp)
					if (resp.code === 200) {
						this.isModal = false
						this.$Toast('删除成功')
						this.$store.dispatch('getWarnList', this.params)
					} else {
						this.$Toast('删除失败')
					}
				})
			},
			// 格式化日期
			formatDate(dateStr) {
				const date_left = dateStr.split('T')[0];
				const month = date_left.split('-')[1];
				const day = date_left.split('-')[2];
				return `${month}-${day}`;
			},
			async saveWarnList(siteId){
				let res = await reqPostWarnList({siteId: siteId});
				if(res.code === 200){
					return;
				}
			},
			// 格式化鸽舍
			format(houseId, siteId) {
				console.log(houseId, siteId);
				let rowNum;
				switch (siteId) {
					case 1:
						rowNum = 138;
						break;
					case 2:
						rowNum = 138;
						break;
					case 3:
						rowNum = 138;
						break;
				}
				console.log(houseId, siteId);
				console.log(typeof rowNum);
				if (houseId > rowNum) {
					const hid_sec = houseId % rowNum === 0 ? houseId % rowNum + rowNum : houseId % rowNum;
					const hid_fir = parseInt(houseId % rowNum) === 0 ?
						parseInt(houseId / rowNum) :
						parseInt(houseId /
							rowNum) + 1;
					return `${hid_fir}-${hid_sec}`;
				} else {
					return `1-${houseId}`;
				}
			}
		}
	}
</script>

<style lang="scss">
	.bg {
		background-color: #E8F2FC;
	}

	.choose_bg {
		background-color: #9EB8E3;
	}

	.tab {
		display: flex;
		position: sticky;
		top: 0;
		justify-content: space-evenly;
		align-items: center;
		height: 10vh;
		background-color: #fff;

		span {
			width: 132rpx;
			height: 54rpx;
			text-align: center;
			line-height: 54rpx;
			border-radius: 10rpx;
			font-weight: bold;
			font-size: 32rpx
		}
	}

	.middle {
		position: relative;
		width: 90%;
		margin: 18.35rpx auto;
		height: 80vh;
		.title {
			display: flex;
			width: 100%;
			padding: 12.84rpx 4.59rpx;
			justify-content: flex-start;
			background-color: #9EB8E3;
			color: #fff;
			font-weight: bold;
			font-size: 20.18rpx;

			view {
				display: flex;
				justify-content: space-around;
				align-items: center;
			}
		}

		.loading {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}

		.middle_bottom {
			color: darkgray;
			text-align: center;
		}
	}

	.bottom {
		display: flex;
		position: absolute;
		bottom: 0;
		justify-content: center;
		align-items: center;
		padding: 9.17rpx 0;
		background-color: #fff;
	}
</style>