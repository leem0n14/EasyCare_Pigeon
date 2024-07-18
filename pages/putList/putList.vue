<template>
	<view class="container">
		<view class="tab">
			<span v-for="(item,index) in list_site" :key="index" @click="choose(item.id)"
				:class="index === bg_index-1 ? 'choose_bg' : 'bg'">{{item.text}}</span>
		</view>
		<view class="speed_put_container">
			<button @click="speed_put" :class="{complete: isAllSelect}"
				:disabled="!putList.length">{{isAllSelect ? '完成' : '快捷放仔'}}</button>
		</view>
		<view class="content">
			<u-loading class="loading" mode="circle" v-if="isLoading" size="36" color="blue"></u-loading>
			<template v-else>
				<view v-if="isnoList" class="noList">暂无数据</view>
				<scroll-view v-else class="scroll_container" scroll-y="true" style="height: 65vh">
					<view class="putList_item row-around mt10" v-for="(item,index) in putList" :key="index">
						<view class="left row-around">
							<uni-icons type="fire-filled" color="blue" size="24"></uni-icons>
							<span
								style="font-size: 22.02rpx;">{{format_houseId(item.house_id,bg_index)+'-'+item.cage_id}}</span>
						</view>
						<view class="middle">
							<span style="font-size: 22.02rpx;">放仔数量</span>
							<view :style="styleVar" class="peigon_select">
								<view class="select_top" @click="showSelect(index)"
									:class="{selectTop_choose_bg: item.isSelected}">
									<view class="selectinfo">{{ item.put_number }}</view>
									<uni-icons type="down" size="28" :class="{rotate: item.isSelected}"
										class="icons"></uni-icons>
								</view>
								<view class="select_dorp" :class="{show: item.isSelected,}">
									<li class="select_item" v-for="(num, index_putNum) in select_list"
										:key="index_putNum" @click="handler(num,index)">{{ num }}
									</li>
								</view>
							</view>
						</view>
						<view v-if="!isAllSelect" @click="PUT_ONE(item)" class="put row-around">放仔</view>
						<view class="icon_selectfail row-around" v-if="!item.choosed && isAllSelect"
							@click="put_choose(item)">
						</view>
						<view class="icon_selectsuccess row-around" v-if="item.choosed && isAllSelect"
							@click="put_choose(item)"></view>
					</view>
				</scroll-view>
			</template>
			<view v-show="isAllSelect" class="operation_container row-around">
				<view class="left">
					<button class="row-around" @click="selectAll" v-if="!allSelect">全选</button>
					<button class="row-around" @click="deselectAll" v-else>取消全选</button>
				</view>
				<view class="right">
					<button :disabled="!paramsList.length" class="row-around" @click="PUT_ALL">放仔</button>
				</view>
			</view>
		</view>
		<view class="pagination">
			<Pagination @getPageNo="getPageNo" :pageNo="pageNo" :pageSize="pageSize" :total="total" :continues="3"></Pagination>
		</view>
		<!-- 顶部提示 -->
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		reqPutEggs,
		reqGetPUTlist
	} from '@/api/index.js'
	import {
		format
	} from '@/utils/format_HouseId.js'
	import {
		getNowDate
	} from '@/getTime.js'
	import Pagination from '@/components/pagination/pagination.vue'
	export default {
		props: {
			select_list: {
				type: Array,
				default: function() {
					return [1, 2, 3, 4];
				}
			},
			width: {
				type: String,
				default: "80rpx"
			},
			height: {
				type: String,
				default: "40rpx"
			},
			listLength: {
				type: Number,
				default: 4
			}
		},
		components:{
			Pagination
		},
		data() {
			return {
				list_site: [{
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
				bg_index: 1,
				// 放仔名单
				paramsList: [],
				putList: [],
				selectInfo: 1,
				select_show: false,
				isAllSelect: false, // 判断是否为快捷放仔状态

				// 下拉框
				selectInfo: this.select_list[3],
				select_show: false,


				isLoading: false,
				isnoList: false,
				
				// 分页器
				pageSize: 2000,
				pageNo: 1,
				total: ''
			}
		},
		computed: {
			styleVar() {
				return {
					'--select_width': this.width,
					'--select_height': this.height,
					'--select_drop_height': this.height * this.listLength + 'rpx'
				}
			},
			// 判断显示全选 or 取消全选
			allSelect() {
				if (this.paramsList.length === this.putList.length) return true;
				else return false;
			}
		},
		watch: {
			bg_index(newValue, oldValue) {
				if (newValue !== oldValue) {
					this.getPUTlist();
					this.reset();
				}
			}
		},
		mounted() {
			this.getPUTlist();
		},
		methods: {
			// 获取页号
			getPageNo(num){
				this.pageNo = num;
				this.getPUTlist()
			},
			// 格式化鸽笼号
			format_houseId(houseId, siteId) {
				const result = format(houseId, siteId);
				return result;
			},
			// 获取放仔名单
			async getPUTlist() {
				this.isLoading = true;
				this.isnoList = false;
				console.log('putlist', this.bg_index)
				let resp = await reqGetPUTlist({
					siteId: this.bg_index,
					page: this.pageNo,
					pageSize: this.pageSize
				});
				if (resp.code === 200) {
					if (resp.data.length > 0){
						this.putList = resp.data;
						this.total = resp.totalCount;
					}
					else this.isnoList = true;
				}
				this.isLoading = false;
				// console.log(resp);
			},
			choose(index) {
				this.bg_index = index;
				// console.log('bn_index', this.bg_index)
			},
			// 进入或退出快捷放仔状态
			speed_put() {
				this.isAllSelect = !this.isAllSelect;
				this.deselectAll();
			},
			// 在切换仓号时将快捷放仔状态置为初始状态
			reset() {
				this.isAllSelect = false;
				this.deselectAll()
			},
			// 全选
			selectAll() {
				for (let i = 0; i < this.putList.length; i++) {
					this.putList[i].choosed = true;
					this.putList[i].site_id = this.bg_index;
					if (!this.paramsList.includes(this.putList[i])) {
						this.paramsList.push(this.putList[i]);
					}
				}
				console.log('放仔名单', this.putList);
				console.log('参数数组', this.paramsList);
			},
			// 取消全选
			deselectAll() {
				for (let i = 0; i < this.putList.length; i++) {
					const put_item = this.putList[i];
					const index = this.paramsList.indexOf(put_item);
					if (index > -1) {
						this.paramsList.splice(index, 1);
						put_item.choosed = false;
					}
				}
				console.log('放仔名单', this.putList);
				console.log('参数数组', this.paramsList);
			},
			/**
			 * @params item 点击的那个li所包含的内容
			 */
			put_choose(item) {
				for (let i = 0; i < this.putList.length; i++) {
					if (this.putList[i].house_id === item.house_id && this.putList[i].cage_id === item.cage_id) {
						this.putList[i].choosed = !this.putList[i].choosed; // 存在说明为true，点击时则是将他取消选中
					}
				}
				const index = this.paramsList.indexOf(item);
				if (index > -1) {
					this.paramsList.splice(index, 1);
					item.choosed = false;
				} else {
					item.site_id = this.bg_index;
					this.paramsList.push(item);
					item.choosed = true;
				}
				console.log('放仔名单', this.putList);
				console.log('参数数组', this.paramsList);
			},
			// 发送多个放仔数据
			PUT_ALL() {
				this.concurPUT(this.paramsList, 10).then(resp => {
					for (let i = 0; i < resp.length; i++) {
						if (resp[i].code === 200) {
							this.getPUTlist();
							this.speed_put();
							this.$refs.uToast.show({
								title: resp[i].msg,
								type: resp[i].type,
								duration: '800',
								position: 'top'
							})
							break;
						} else this.$refs.uToast.show({
							title: '操作失败，请重试',
							type: 'error',
							duration: '800',
							position: 'top'
						})
					}
				})
			},
			// 单个鸽笼放仔
			async PUT_ONE(data) {
				const params = {
					siteId: this.bg_index,
					houseId: data.nfc_id,
					cageId: data.cage_id,
					cageStatu: '带仔中',
					putNumber: data.put_number,
					putTime: getNowDate()
				}
				console.log(params);
				let result = await reqPutEggs(params);
				if (result.code === 200) {
					this.getPUTlist();
				}
				this.$refs.uToast.show({
					title: result.msg,
					type: result.type,
					duration: '800',
					position: 'top'
				})
			},

			// 放仔函数
			PUT(data) {
				const params = {
					siteId: this.bg_index,
					houseId: data.nfc_id,
					cageId: data.cage_id,
					cageStatu: '带仔中',
					putNumber: data.put_number,
					putTime: getNowDate()
				}
				return new Promise((resolve, reject) => {
					reqPutEggs(params).then(resp => {
						console.log('PUT函数中resp', resp);
						resolve(resp);
					}).catch((err) => {
						console.log('PUT函数中err', err.response.data);
						reject(err.response.data);;
					})
				})
			},

			// 并发请求
			concurPUT(paramsList, maxNum) {
				let _this = this;
				return new Promise(resolve => {
					if (paramsList.length === 0) {
						resolve([]);
						return;
					}
					const result = [];
					let index = 0;
					let count = 0;

					function request() {
						if (index === paramsList.length) {
							return;
						}
						const i = index; // 记录下当前发送的请求的下标
						const params = paramsList[i]; // 记录当前发送的请求的参数
						index++;
						_this.PUT(params).then(resp => {
							// console.log('走then', resp)
							result[i] = resp;
						}).catch(err => {
							// console.log('走catch', err)
							result[i] = err
						}).finally(() => {
							count++;
							if (count === paramsList.length) {
								resolve(result);
								return;
							}
							request();
						})
					}
					const num = Math.min(maxNum, paramsList.length);
					for (let i = 0; i < num; i++) {
						request();
					}
				})
			},
			// 显示下拉框
			showSelect(index) {
				for (let i = 0; i < this.putList.length; i++) {
					if (i !== index) this.putList[i].isSelected = false;
				}
				this.putList[index].isSelected = !this.putList[index].isSelected;
			},
			// 点击下拉框任意选项时，将选中的数字赋予对应item的put_number
			handler(num, index) {
				this.putList[index].put_number = num;
				this.showSelect(index);
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #fff;
		position: relative;
	}

	.selectTop_choose_bg {
		box-shadow: 0px 0px 6px #709DF7;
	}

	.bg {
		background-color: #E8F2FC;
	}

	.choose_bg {
		background-color: #9EB8E3;
	}

	.rotate {
		transform: rotate(180deg);
	}

	.icons {
		transition: all 0.3s;
	}

	.container {
		.tab {
			display: flex;
			position: sticky;
			top: 0;
			justify-content: space-evenly;
			align-items: center;
			height: 8vh;
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

		.speed_put_container {
			position: relative;
			width: 100%;
			height: 55.05rpx;
			margin-bottom: 4.59rpx;
			button {
				width: 91.74rpx;
				height: 100%;
				position: absolute;
				right: 55.05rpx;
				color: #909399;
				font-size: 20.18rpx;
				line-height: 55.05rpx;
				&[disabled]{
					border: none;
				}
				&.complete {
					background-color: #19be6b;
					color: #fff;
					font-weight: bold;
				}
			}
		}

		.content {
			position: relative;
			width: 100%;
			height: 70vh;

			.loading,
			.noList {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}

			.scroll_container {

				.putList_item {
					width: 100%;
					height: 60rpx;

					span {
						font-weight: bold;
					}

					.left {
						width: 28%;
						height: 100%;
					}

					.middle {
						width: 36%;
						height: 100%;
						display: flex;
						justify-content: center;
						align-items: center;

						.peigon_select {
							display: flex;
							position: relative;
							flex-direction: column;
							justify-content: space-around;
							width: 80rpx !important;
							font-size: 22.02rpx;
							margin-left: 10rpx;

							.select_top {
								display: flex;
								justify-content: space-around;
								width: 80rpx;
								height: 40rpx;
								line-height: 40rpx;
								border: 1px solid #E6E6E6;
								border-radius: 5px;

								span {
									transition: all 0.5s;
								}

								.selectinfo {
									width: 80rpx;
									height: 40rpx;
									text-align: center;
									line-height: 40rpx;
								}
							}

							.select_dorp {
								display: none;
								position: absolute;
								top: 45rpx;
								width: 80rpx;
								max-height: 0px;
								transition: max-height 0.5s ease-in-out;
								border-radius: 10px;
								box-shadow: 0px 0px 6px #709DF7;
								z-index: 999;
								background-color: #fff;

								&.show {
									display: block;
									max-height: var(--select_drop_height);
								}

								.select_item {
									width: 80rpx;
									height: 25%;
									text-align: center;
									line-height: 40rpx;
									list-style: none;
								}
							}
						}
					}

					.put {
						width: 12%;
						height: 70%;
						font-weight: bold;
						font-size: 20.18rpx;
						border: 1px solid #fff;
						background-color: #2979ff;
						color: #fff;
						border-radius: 10px;
					}

					.icon_selectfail {
						width: 12%;
						height: 70%;
						background: url(../../static/images/icon_selectfail.png) no-repeat;
						background-size: 33% auto;
						background-position: 50% 50%;
					}

					.icon_selectsuccess {
						width: 12%;
						height: 70%;
						background: url(../../static/images/icon_selectsuccess.png) no-repeat;
						background-size: 33% auto;
						background-position: 50% 50%;
					}
				}
			}

			.operation_container {
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				height: 55.05rpx;
				background-color: #f3f4f6;

				.left,
				.right {
					width: 50%;

					button {
						width: 100%;
						height: 40rpx;
						font-size: 22.02rpx;
					}
				}

				.left {
					border-right: 1px solid gray
				}
			}
		}
		.pagination{
			margin-top: 9.17rpx;
		}
	}
</style>