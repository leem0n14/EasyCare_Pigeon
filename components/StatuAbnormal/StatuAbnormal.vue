<template>
	<view>
		<view class="card row-around">
			<view class="card_left">
				<view class="card_title row-center">
					<uni-icons type="fire" color="#9EB8E3" size="60"></uni-icons>
					<view class="text">状态</view>
				</view>
				<view class="statu row-center">
					{{cageStatu}}
				</view>
			</view>
			<view class="card_right">
				<view class="card_title row-center">
					<uni-icons type="fire" color="#9EB8E3" size="60"></uni-icons>
					<view class="text">异常</view>
				</view>
				<view class="abnormal row-center">
					<span v-if="!abnormal.length">无异常</span>
					<template v-else>
						<span v-for="(item,index) in abnormal" :key="index">{{statuAbnormal(item)}}</span>
					</template>
				</view>
			</view>
			<view class="card-buttom">
					<view class="span">
						<span class="row">当前</span>
						<span class="row" :class=" oldnumlength  ===  1 ||oldnumlength  ===  0
						 ? 'oldstyle' : '' ">种鸽数量：{{oldNum}}</span>
						<span class="row">雏鸽数量：{{youngNum}}</span>
					</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {
		reqWhipStay,
		reqGetWhipping,
		reqStayNum,
		reqCageDetail
	} from '@/api/index.js'
	import {
		abnormalString
	} from '@/utils/abnormalString.js'
import { transformVNodeArgs } from "vue";
import cageId from '../../store/modules/cageId';
	export default {
		props: {
			cageStatu: {
				type: String,
				required: true
			},
			abnormal: {
				type: Array,
				required: true
			},
			number: {
				type:String,
				required: false
			},
			oldNum: {
				type: Number,
				required:true
			},
			youngNum:{
				type: Number,
				required:true
			},
			
		},
		mounted() {
			// this.CageDetail()
		},
		computed:{
			oldnumlength(){
				return this.oldNum;
			}
		},
		watch: {},
		methods: {
			
			// async CageDetail(){
			// 	const params = {
			// 		site_id: uni.getStorageSync('siteId'),
			// 		house_id: this.nfcId,
			// 	}
			// 	let result = await reqCageDetail(params);
			// 	console.log('result',result);
			// 	if(result.code === 200){
			// 		this.oldNum = result[cageId-1].num;
			// 		this.abnormal = result[cageId-1].cubNumber;
			// 	}
			// },
			
			statuAbnormal(abnormalStr) {
				console.log('abnormal type:', typeof abnormalStr);
				console.log('abnormal value:', abnormalStr);
				if (abnormalStr === 'single') return '单蛋';
				else if (abnormalStr === 'spermatozonia') return '光蛋';
				else if (abnormalStr === 'breakage') return '破损';
				else if (abnormalStr === 'abandon') return '弃仔';
				else if (abnormalStr === 'discard') return '弃孵';
				else if (abnormalStr.substring(0, abnormalStr.length - 1) === 'death_old')
					return ` 种鸽死亡${abnormalStr.substring(abnormalStr.length-1,abnormalStr.length)}`;  //$为拼接字符串
				else if (abnormalStr.substring(0, abnormalStr.length - 1) === 'death_young')
					return ` 雏鸽死亡${abnormalStr.substring(abnormalStr.length-1,abnormalStr.length)}`;
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #eeeeef;
	}

	.card {
		position: relative;
		
		width: 100%;
		height: 500rpx;
		background-color: #fff;

		.card_left,
		.card_right {
			width: 40%;
			height: 100%;

			.contrast {
				height: 59.63rpx;
				line-height: 59.63rpx;
			}

			.card_title {
				width: 100%;
				height: 40%;

				.text {
					font-size: 23.85rpx;
					font-weight: bold;
				}
			}

			.statu {
				font-size: 33.03rpx;
				font-weight: bold;
			}

			.abnormal{
				font-size: 22.02rpx;
				color: #909399
			}
			
			.number{
				font-size: 22.02rpx;
				font-weight: bold;
			}

			.proportion {
				font-weight: bold;
			}
			
		}
		
		.card-buttom {
			position: absolute;
			left: 0;
			margin-left: 12%;
			font-weight: bold;
			margin-top: 35%;
			.row{
				font-size: 30.03rpx;
				margin-top: 5%;
				align-items: flex-start;
				margin-bottom: 0;
			}
			
		}
		.oldstyle{
			color: red;
		}
	}
</style>