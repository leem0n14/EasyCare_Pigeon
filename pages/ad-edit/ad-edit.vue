<template>
	<view>
		<view class="container">
			<u-card>
				<view class="head" slot="head">
					{{show_nfcId}}
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
								@click="handleDate"></u-input>
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
		<u-modal v-model="isModal" @confirm="confirm_edit" ref="uModal" :content="content_edit"
			:show-cancel-button="true"></u-modal>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import {
		reqEditHis
	} from '@/api/index.js'
	export default {
		data() {
			return {
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
					label: '弃仔',
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
				isNumber: false,
				// 模态框
				isModal: false
			}
		},
		onLoad(options) {
			this.params = JSON.parse(options.i)
			// console.log('params', JSON.parse(options.i))
			this.operation_edit_show = this.params.operation_show
			this.editform.operation = this.params.operation
			// console.log('operation', this.editform.operation)
			this.editform.date = this.params.time.split('T')[0]
			if (this.operation_edit_show === '放仔' || this.operation_edit_show === '调仔' || this.operation_edit_show ===
				'死亡') {
				this.isNumber = true
			}	
		},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			// console.log('传递过来的参数',this.$route.query.i)
			this.$refs.uForm.setRules(this.rules);
		},
		watch: {
			operation_edit_show(newValue) {
				if (newValue === '放仔' || newValue === '调仔' || newValue === '死亡') {
					this.isNumber = true
				} else {
					this.isNumber = false
				}
			}
		},
		computed: {
			...mapGetters(['show_nfcId', 'nfcId','editComplete'])
		},
		methods: {
			// 点击下拉
			handleInput() {
				this.select_show = true
			},
			// 点击弹出日历
			handleDate() {
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
				this.isModal = true
			},
			// 点击确认时修改数据
			confirm_edit() {
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
						this.$store.commit('SETEDITCOMPLETE',!this.editComplete)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 20rpx 40rpx;

		.head {
			width: 100%;
			height: 20vh;
			text-align: center;
			line-height: 6.7;
			font-size: 48rpx;
			background-color: royalblue;
			color: #fff;
			border-radius: 4px;
		}

		.body {
			width: 100%;
			height: 50vh;

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
				font-size: 40rpx;
				color: #fff;
				background-color: royalblue;
			}
		}
	}
</style>