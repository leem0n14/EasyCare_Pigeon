<template>
	<view class="page">
		<view class="houseId row-center">
			<!-- {{'鸽舍号：'+ fakeshownfc}} -->
			{{show_nfcId ? '鸽舍号：'+ show_nfcId : '鸽舍号'}}
		</view>
		
		<!-- <view class="tab">
			<span v-for="(item,index) in list_site" :key="index" @click="choose(item)"
				:class="item.handle ? 'choose_bg' : 'bg'">{{item.text}}</span>
		</view> -->
		
		<view style="width: 84%;margin: 0 auto;height: 80vh;">
			<view class="nav">
				<!-- //日期选择 -->
				<view class="date">
					<view class="date_item_date row-around" style="background-color: #9EB8E3;
		color: #fff; height: 52rpx; border-radius: 10rpx;" @click.stop="handleDate">
						<span>{{year}}年</span>
						<span>{{month}}月</span>
						<span>{{day}}日</span>
						<uni-icons type="down" size="28" color="#fff"
							:style="{transform: `rotate(${rotatedate}deg)`}"></uni-icons>
					</view>
					<transition name="sort">
						<view class="date_item_list_date" v-show="showdate">
							<view class="date_item row-around" v-for="(i,k) in previousMonths" :key="k"
								:class="{'choosed': i.year === year && i.month === month && i.day == day}"
								style="background-color: #E8F2FC" @click.stop="selectDate(i)">
								<span>{{i.year}}年</span>
								<span>{{i.month}}月</span>
								<span>{{i.day}}日</span>
							</view>
						</view>
					</transition>
				</view>
				<!-- 操作选择 -->
				<view class="date">
					<view class="date_item_op row-around"
						style="background-color: #9EB8E3; color: #fff; height: 52rpx;border-radius: 10rpx;"
						@click.stop="handleOp">
						<span>{{operation_show}}</span>
						<uni-icons type="down" size="28" color="#fff"
							:style="{transform: `rotate(${rotateop}deg)`}"></uni-icons>
					</view>
					<transition name="sort">
						<view class="date_item_list_op" v-show="showop">
							<view class="date_item row-center" v-for="(i,k) in oplist" :key="k"
								:class="{choosed: i.name === operation_show}" style="background-color: #E8F2FC"
								@click.stop="selectOp(i)">
								<span>{{i.name}}</span>
							</view>
						</view>
					</transition>
				</view>
				
				<!-- <view class="date">
					<view class="date_item_cage row-center"
						style="background-color: #9EB8E3; color: #fff; height: 52rpx;border-radius: 10rpx;"
						@click.stop="handleCage">
						<span>{{cage_id}}号笼</span>
						<uni-icons type="down" size="28" color="#fff"
							:style="{transform: `rotate(${rotatecage}deg)`}"></uni-icons>
					</view>
					<transition name="sort">
						<view class="date_item_list_cage" v-show="showcage">
							<view class="date_item row-center" v-for="(i,k) in cagelist" :key="k"
								:class="{'choosed': i === cage_id}" style="background-color: #E8F2FC"
								@click.stop="selectCage(i)">
								<span>{{i}}</span>
							</view>
						</view>
					</transition>
				</view> -->
			</view>
			
			<!-- //数据展示区 -->
			<view class="content">
				<!-- //转圈圈 -->
				<u-loading class="loading" mode="circle" v-if="isLoading" size="36" color="blue"></u-loading>
				<template v-else>
					<view v-if="isnoList" class="noList">暂无数据</view>
					<uni-swipe-action v-else-if="list.length > 0">
						<scroll-view scroll-y="true" style="height: 70vh;">
							<view v-for="v in list" :key="v.id">
								
								<uni-swipe-action-item :right-options="options" @click="onClick($event,v)">
									<view class="content_item">
										<!-- <view class="">
											<uni-icons type="fire-filled" color="blue" size="24"></uni-icons>
											<span style="font-weight: bold;">{{v.user}}</span>
										</view> -->
										<view class="">
											<!-- <span style="font-weight: bold;">{{v.siteId}}仓</span> -->
											<!-- <span style="font-weight: bold ;">{{fakeshownfc}}</span> -->
											<!-- <span style="font-weight: bold ;">{{show_nfcId}}</span> -->
											<span style="font-weight: bold ;">{{showcage}}</span>
											<span style="font-weight: bold;margin-right: 40rpx;">-{{v.cageId}}</span>
											<uni-icons type="fire-filled" color="blue" size="24"></uni-icons>
											<span style="font-weight: bold;margin-right: 40rpx">{{v.user}}</span>
											<span style="font-weight: bold;margin-right: 20rpx;">{{operation_show}}</span>
											<!-- <span style="margin: 0 20rpx">~</span> -->
											<!-- <span style="font-weight: bold ;">{{format(show_nfcId,v.siteId)}}</span> -->
										</view>
										<span style="color:darkgray">{{formatDate(v.time)}}</span>
									</view>
								</uni-swipe-action-item>
								
							</view>
						</scroll-view>
					</uni-swipe-action>
				</template>
				<u-modal v-model="isModal" @confirm="confirm_del" ref="uModal" :async-close="true"
					:content="content_del" :show-cancel-button="true"></u-modal>
			</view>
			
			<!-- 分页器 -->
			<view class="bottom">
				<Pagination :pageNo="page" :pageSize="pageSize" :total="total" :continues="3" @getPageNo="selectPage">
				</Pagination>
			</view>
			
			<!-- <button @click="openSheet">open</button> -->
			<view class="container">
				<view class="mask" v-if="showSheet" @click="closeSheet"></view>
				<view class="sheet" :class="{'show': showSheet}">
					<u-card padding="20">
						<view class="head" slot="head" @click="closeSheet">
							关闭
						</view>
						<view class="body" slot="body">
							<u-form :model="editform" ref="uForm" style="height: 100%;">
								<u-form-item label="操作" prop="operation">
									<u-select v-model="select_show" mode="single-column" :list="opList_edit"
										@confirm="confirm_op"></u-select>
									<u-input v-model="operation_edit_show" type="select" @click="handleInput()"
										placeholder="请选择修改后的操作" />
								</u-form-item>
								<u-form-item label="日期" prop="date">
									<u-calendar v-model="date_show" :mode="mode_date" @change="change"></u-calendar>
									<u-input v-model="editform.date" type="select" placeholder="请选择日期"
										@click="handleDateCard"></u-input>
								</u-form-item>
								<u-form-item label="数量" prop="date" v-if="isNumber">
									<u-input v-model="editform.number" type="number" placeholder="请输入数量"></u-input>
								</u-form-item>
							</u-form>
						</view>
						<view class="foot" slot="foot">
							<button @click='submit'>确认修改</button>
						</view>
					</u-card>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import {
		reqHistoryList,
		reqDelHis
	} from '@/api/index.js'
	import {
		debounce
	} from '@/utils/debounce.js'
	import Pagination from '@/components/pagination/pagination.vue'
	export default {
		components: {
			Pagination
		},
		data() {
			return {
				showcage:'',
				fakeshownfc:'1-4-84',
				modal: false,
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
				oplist: [{
					name: '抽蛋',
					operation: 'whipping'
				}, {
					name: '留窝',
					operation: 'stay'
				}, {
					name: '放仔',
					operation: 'put'
				}, {
					name: '调仔',
					operation: 'cub'
				}, {
					name: '破损',
					operation: 'breakage'
				}, {
					name: '单蛋',
					operation: 'single'
				}, {
					name: '光蛋',
					operation: 'spermatozonia'
				}, {
					name: '弃仔 ',
					operation: 'abandon'
				}, {
					name: '弃孵',
					operation: 'discard'
				}, {
					name: '种鸽死亡',
					operation: 'death_old'
				}, {
					name: '雏鸽死亡',
					operation: 'death_young'
				}],
				cagelist: [1, 2, 3, 4, 5, 6],
				// 日期选择框的高度
				height: 52,
				// icons旋转读书
				rotatedate: 0,
				rotateop: 0,
				rotatecage: 0,
				showdate: false,
				showop: false,
				showcage: false,
				// 初始选中的日期
				year: new Date().getFullYear(),
				month: new Date().getMonth() + 1,
				day:new Date().getDate(),
				// 初始选中的操作
				operation_show: '抽蛋',
				operation: 'whipping',
				// 初始选中的鸽笼
				cage_id: 1,
				// 滑动删除
				// 删除时的id
				id: '',
				list: [],
				options: [{
						text: '编辑',
						style: {
							backgroundColor: '#007aff'
						}
					}, {
						text: '删除',                                
						style: {
							backgroundColor: '#dd524d'
						}
					},
				],
				// 分页器
				page: 1,
				pageSize: 20,
				total: 0,
				// 对获取历史操作的接口进行防抖
				debounceHisList: debounce(() => {
					this.getHistoryList()
				}, 200),
				// 是否显示加载动画
				isLoading: true,
				// 请求数据为空时
				isnoList: '',
				// 确认框提示字符
				content_del: '确认删除吗？',
				// 确认框显示与否
				isModal: false,
				// 删除操作发送的params
				delParams: {},
				/// 移植
				// 底部上弹窗
				showSheet: false,
				title: '编辑信息',
				content_edit: '确认操作吗？',
				editform: {
					operation: '',
					date: '',
					number: 0
				},
				opList_edit: [{
					label: '抽蛋',
					value: 'whipping'
				}, {
					label: '留窝',
					value: 'stay'
				}, {
					label: '放仔',
					value: 'put'
				}, {
					label: '产蛋',
					value: 'lay'
				}, {
					label: '调仔',
					value: 'cub'
				}, {
					label: '破损',
					value: 'breakage'
				}, {
					label: '单蛋',
					value: 'single'
				}, {
					label: '光蛋',
					value: 'spermatozonia'
				}, {
					label: '弃仔',
					value: 'abandon'
				}, {
					label: '弃孵',
					value: 'discard'
				}, {
					label: '死亡',
					value: 'death'
				}],
				operation_edit_show: '',
				// 显示下拉列表展示 
				select_show: false,
				// 显示日历
				date_show: false,
				// 日期格式
				mode_date: 'date',
				// 表单验证
				rules: {
					operation: [{
						required: true,
						message: '请选择修改后的操作',
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change', 'blur'],
					}],
					date: [{
						required: true,
						message: '请选择日期',
						trigger: 'change'
					}]
				},
				// 传递过来的参数
				params: '',
				// 是否输入数量
				isNumber: false
			}
		},
		mounted() {
			this.getHistoryList(),
			this.NormalizationCage()
		},
		watch: {
			nfcId(newValue, oldValue) {
				if (newValue !== oldValue) {
					this.debounceHisList()
				}
			},
			editComplete(newValue) {
				this.getHistoryList()
			},
			operation_edit_show(newValue) {
				if (newValue === '放仔' || newValue === '调仔' || newValue === '死亡') {
					this.isNumber = true
				} else {
					this.isNumber = false
				}
			}
		},
		computed: {
			previousMonths() {
				return this.getPreviousMonths()
			},
			...mapGetters(['show_nfcId', 'nfcId', 'editComplete'])
		},
		methods: {
			
			// 历史数据笼号规格化
			NormalizationCage(){
				const showcage = this.show_nfcId
				const site = showcage.slice(0,1)
				const cage = showcage.slice(2,6)
				this.showcage = `${site}仓${cage}`
			},
			
			// 点击分页器的页数时
			selectPage(page) {
				if(pageSize >=20){
					this.page = page
				}
				this.getHistoryList()
			},
			
			onClick(e, i) {
				// console.log('点击了' + (e.position === 'left' ? '左侧' : '右侧') + e.content.text + '按钮')
				if (e.content.text === '编辑') {
					i.houseId = this.nfcId
					i.operation = this.operation
					i.operation_show = this.operation_show
					this.openSheet()
				} else if (e.content.text === '删除') {
					// console.log(e)
					// console.log(i)
					this.del(i)
				}
			},
			
			swipeChange(e, index) {
				// console.log('当前状态：' + e + '，下标：' + index)
			},
			
			choose(e) {
				for (let i in this.list_site) {
					this.list_site[i].handle = false
				}
				this.list_site[e.id - 1].handle = true
				this.site_id = e.id
				this.getHistoryList()
			},
			
			// 点击日期框
			handleDate() {
				// console.log(this.showdate)
				// console.log('收起还是拉伸')
				if (this.showdate === false) {
					this.showdate = true
					this.rotatedate = 180
				} else {
					this.showdate = false
					this.rotatedate = 0
				}
			},
			// 点击操作框时
			handleOp() {
				// console.log(this.showop)
				// console.log('收起还是拉伸')
				if (this.showop === false) {
					this.showop = true
					this.rotateop = 180
				} else {
					this.showop = false
					this.rotateop = 0
				}
			},
			// 点击鸽笼时
			handleCage() {
				if (this.showcage === false) {
					this.showcage = true
					this.rotatecage = 180
				} else {
					this.showcage = false
					this.rotatecage = 0
				}
			},
			// 选择日期时
			selectDate(i) {
				this.handleDate()
				this.year = i.year
				this.month = i.month
				this.day = i.day
				// console.log('year,month', this.year, this.month)
				this.getHistoryList()
			},
			// 选择操作时
			selectOp(i) {
				this.handleOp()
				this.operation_show = i.name
				this.operation = i.operation
				this.getHistoryList()
			},
			// 选择鸽笼时
			selectCage(i) {
				this.handleCage()
				this.cage_id = i
				this.getHistoryList()
			},
			// 滑动删除
			// 删除某条历史数据
			del(i) {
				// console.log('点击了第' + index + '条数据')
				// console.log('i', i)
				this.isModal = true
				i.houseId = this.nfcId
				i.operation = this.operation
				this.delParams = i
				// 将参数存储到vuex中便于长按取消操作
				this.$store.commit('SETDELPATAMS', this.delParams)
				// console.log(this.delParams)
			},
			confirm_del() {
				reqDelHis(this.delParams).then(resp => {
					if (resp.code === 200) {
						this.getHistoryList()
					}
					this.$Toast(resp.msg)
					this.isModal = false
				})
			},
			
			// 发送请求获取历史操作
			getHistoryList() {
				this.isLoading = true
				const params = {
					year: this.year,
					month: this.month,
					day:this.day,
					operation: this.operation,
					siteId: uni.getStorageSync('siteId'),
					houseId: this.nfcId,
					cageId: this.cage_id,
					page: this.page,
					pageSize: this.pageSize
				}
				console.log('history，参数为', params)
				reqHistoryList(params).then(resp => {
					console.log('历史操作resp', resp)
					if (resp.code === 200) {
						this.list = resp.data
						this.total = resp.total
						
						console.log('@@@@@')
						if (resp.type === 'success') {
							this.isnoList = false
						} else if (resp.type === 'warning') {
							this.isnoList = true
						}
					}
				}).finally(() => {
					this.isLoading = false
					uni.stopPullDownRefresh()
				})
			},
			// 编辑 ***********************************************************
			// 点击下拉
			handleInput() {
				this.select_show = true
			},
			// 点击弹出日历
			handleDateCard() {
				this.date_show = true
			},
			confirm_op(e) {
				this.operation_edit_show = e[0].label
				this.editform.operation = e[0].value
			},
			change(e) {
				// console.log(e)
				this.editform.date = e.result
			},
			submit() {
				const {
					operation,
					id,
					siteId,
					houseId,
					cageId,
					time
				} = this.params
				const params = {
					operation,
					id,
					siteId,
					houseId,
					cageId,
					modifiedOperation: this.editform.operation,
					time: time.split('T')[0] + ' ' + time.split('T')[1].split('.')[0],
					modifiedTime: this.editform.date + ' ' + time.split('T')[1].split('.')[0],
					number: this.editform.number
				}
				// console.log(params)
				reqEditHis(params).then(resp => {
					if (resp.code === 200) {
						// console.log(resp)
						uni.navigateBack()
						this.$Toast('修改成功')
						this.$store.commit('SETEDITCOMPLETE', !this.editComplete)
					}
				})
			},
			// 点击确认时修改数据
			// confirm_edit() {
			// 	const {
			// 		operation,
			// 		id,
			// 		siteId,
			// 		houseId,
			// 		cageId,
			// 		time
			// 	} = this.params
			// 	const params = {
			// 		operation,
			// 		id,
			// 		siteId,
			// 		houseId,
			// 		cageId,
			// 		modifiedOperation: this.editform.operation,
			// 		time: time.split('T')[0] + ' ' + time.split('T')[1].split('.')[0],
			// 		modifiedTime: this.editform.date + ' ' + time.split('T')[1].split('.')[0],
			// 		number: this.editform.number
			// 	}
			// 	// console.log(params)
			// 	reqEditHis(params).then(resp => {
			// 		if (resp.code === 200) {
			// 			// console.log(resp)
			// 			uni.navigateBack()
			// 			this.$Toast('修改成功')
			// 			this.$store.commit('SETEDITCOMPLETE', !this.editComplete)
			// 		}
			// 	})
			// },
			
			// 给出距今前12个月对应的年份和月份
			// getPreviousMonths() {
			// 	const currentDate = new Date(); // 当前日期
			// 	const months = []; // 存储月份
			// 	for (let i = 0; i < 12; i++) {
			// 		const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1); // 前i个月的第一天
			// 		console.log('1',currentDate.getFullYear());
			// 		console.log('2',currentDate.getMonth());
			// 		console.log('$$$$$#$',previousMonth);
			// 		const year = previousMonth.getFullYear();
			// 		const month = previousMonth.getMonth() + 1;
			// 		// const month = (previousMonth.getMonth() + 1).toString().padStart(2, '0');
			// 		months.push({
			// 			year,
			// 			month
			// 		});
			// 	}
			// 	return months;
			// },
			
			
			//算出具体某个月的天数
			getTotalDaysInMonth(year, month) {
			    const nextMonth = new Date(year, month + 1, 1);
			    const currentMonth = new Date(year, month, 1);
			    const diffTime = nextMonth.getTime() - currentMonth.getTime();
			    const totalDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
			    return totalDays;
			},
			
			// 给出距今前2个月对应的年份和月份和日期
			getPreviousMonths() {
				const currentDate = new Date(); // 当前日期
				const days = []; // 存储日期
				let flag = true; //判断日期循环的标志
				for (let i = 0; i < 2; i++) {
					const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - i,1); // 前i个月的第一天
					const year = previousMonth.getFullYear();
					const month = previousMonth.getMonth() + 1;
					const date = currentDate.getDate();
					const totalDays = this.getTotalDaysInMonth(year, month-1);
					// console.log('&&&&&',year,month,totalDays,date);
					// console.log(date);
					// const month = (previousMonth.getMonth() + 1).toString().padStart(2, '0');
					if (flag) 
						{
							for (let day = currentDate.getDate(); day >= 1; day--) {
								days.push({ year, month, day });
							}
							flag = false;
						} else {
							for (let day = totalDays; day >= 1; day--) {
								days.push({ year, month, day });
							}
							console.log(days);
						}
					}
				return days;
			},
			
			// 格式化日期
			formatDate(dateStr) {
				const date_left = dateStr.split('T')[0];
				const month = date_left.split('-')[1];
				const day = date_left.split('-')[2];
				const time = dateStr.slice(11, 16); // 从索引11（包括）到索引16（不包括）
				const hour = time.slice(0, 2); // 截取小时部分
				const minute = time.slice(3, 5); // 截取分钟部分

				return `${month}-${day} ${hour}:${minute}`;
			},
			// 格式化鸽舍
			format(houseId, siteId) {
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
				if (houseId > rowNum) {
					const hid_sec = houseId % rowNum === 0 ? houseId % rowNum + rowNum : houseId % rowNum;
					const hid_fir = parseInt(houseId % rowNum) === 0 ?
						parseInt(houseId / rowNum) :
						parseInt(houseId /
							rowNum) + 1;
					return `${hid_fir}-${hid_sec}`;
				} else {
					return `${houseId}`;
				}
			},
			openSheet() {
				this.showSheet = true
			},
			closeSheet() {
				this.showSheet = false
			}
		}
	}
</script>

<style lang="scss">
	.page {
		position: relative;
	}

	// 元素动画过渡
	.sort-enter {
		height: 0px;
	}

	// 过渡动画结束
	.sort-enter-to {
		height: auto;
	}

	// 定义动画时间，速率
	.sort-enter-active {
		transition: all 0.5s linear;
	}

	.choosed {
		color: orangered
	}

	%date_item_list {
		width: 100%;
		font-weight: bold;
		position: absolute;
		transition: all linear 0.2s;
		z-index: 9999;
		font-size: 22.02rpx
	}

	.bg {
		background-color: #E8F2FC;
	}

	.choose_bg {
		background-color: #9EB8E3;
	}

	.cao {
		background-color: #9EB8E3;
		color: #fff
	}

	.houseId {
		width: 100%;
		margin: 10rpx auto;
		padding: 18.12rpx 18.12rpx;
		font-size: 39.86rpx;
		border-radius: 14.49rpx;
		color: #fff;
		background-color: #7d9ad2;
	}

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

	.nav {
		display: flex;
		justify-content: space-around;

		.date {
			position: relative;

			border-radius: 5px;

			.date_item {
				height: 55.05rpx;
			}

			.date_item_date {
				width: 100%;
				height: 52rpx;
				font-weight: bold;
				padding: 1.83rpx 3.67rpx;
				font-size: 20.18rpx
			}

			.date_item_op {
				width: 100%;
				height: 52rpx;
				font-weight: bold;
				padding: 1.83rpx 16.51rpx;
				font-size: 20.18rpx
			}

			.date_item_cage {
				width: 100%;
				height: 52rpx;
				font-weight: bold;
				padding: 1.83rpx 16.51rpx;
				font-size: 20.18rpx
			}

			.date_item_list_date {
				@extend %date_item_list;
				height: 286.24rpx;
			}

			.date_item_list_op {
				@extend %date_item_list;
				height: 262.39rpx;
			}

			.date_item_list_cage {
				@extend %date_item_list;
				height: 143.12rpx;
			}
		}
	}

	.list {
		.list_item {
			width: 100%;
			padding: 10rpx 10rpx;
		}
	}

	.content {
		margin-top: 20rpx;
		width: 100%;
		height: 50vh;

		.loading {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}

		.noList {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			color: darkgray
		}

		.content_item {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-around;
			height: 100rpx;
			font-size: 18.35rpx;
		}

	}

	.bottom {
		display: flex;
		position: absolute;
		bottom: 0;
		justify-content: center;
		align-items: center;
		padding: 20rpx 0;
		background-color: #fff;
	}

	.container {
		padding: 20rpx 40rpx;
		position: relative;

		.mask {
			position: fixed;
			width: 70%;
			top: 0;
			right: 0;
			bottom: 0;
			background: rgba(0, 0, 0, 0.5);
			z-index: 999;
			transition: opacity 0.3s;
		}


		.sheet {
			position: fixed;
			right: 0;
			bottom: 0;
			width: 70%;
			height: 70vh;
			background-color: #fff;
			z-index: 1000;
			transform: translateY(100%);
			transition: transform 0.3s;

			// .head {
			// 	width: 100%;
			// 	height: 20vh;
			// 	text-align: center;
			// 	line-height: 6.7;
			// 	font-size: 48rpx;
			// 	background-color: royalblue;
			// 	color: #fff;
			// 	border-radius: 4px;
			// }
			&.show {
				transform: translateY(0);
			}

			.body {
				width: 100%;

				::v-deep .u-form-item {
					padding-top: 5vh;
					font-size: 32rpx
				}

				::v-deep .uni-input-input {
					font-size: 28rpx;
				}
			}

			.foot {
				button {
					font-size: 25.69rpx;
					color: #fff;
					background-color: royalblue;
				}
			}
		}
	}
</style>