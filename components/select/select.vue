<template>
	<view :style="styleVar" class="peigon_select">
		<view class="select_top" @click.stop="showSelect" :class="{choose_bg: select_show}">
			<view class="selectinfo">{{ selectInfo }}</view>
			<uni-icons type="down" size="28" :class="{rotate: select_show}" class="icons"></uni-icons>
		</view>
		<uni-transition>
			<view class="select_dorp" :class="{show: select_show,}">
				<li class="select_item" v-for="(item, index) in select_list" :key="index" @click="handler(item)">{{ item }}
				</li>
			</view>
		</uni-transition>
	</view>
</template>

<script>
	export default {
		name: "select",
		props: {
			select_list: {
				type: Array,
				default: function() {
				      return [1,2,3,4];
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
		data() {
			return {
				selectInfo: this.select_list[3],
				select_show: false
			}
		},
		mounted() {
		},
		computed: {
			styleVar() {
				return {
					'--select_width': this.width,
					'--select_height': this.height,
					'--select_drop_height': this.height * this.listLength + 'rpx'
				}
			}
		},
		methods: {
			showSelect() {
				this.select_show = !this.select_show
			},
			handler(item){
				this.$emit('getPutNum',item)
				this.showSelect()
			}
		}

	}
</script>

<style lang="scss" scoped>
	.choose_bg {
		box-shadow: 0px 0px 6px #709DF7;
	}

	.rotate {
		transform: rotate(180deg);
	}

	.icons {
		transition: all 0.3s;
	}

	.peigon_select {
		display: flex;
		position: relative;
		flex-direction: column;
		justify-content: space-around;
		width: 80rpx !important;
		font-size: 22.02rpx;

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
	.uni-collapse-enter-active, .uni-collapse-leave-active {
	  transition: var(--select_drop_height) 0.3s; /* 设置动画持续时间 */
	}
	.uni-collapse-enter, .uni-collapse-leave-to {
	  height: 0; /* 设置展开/收起时的高度 */
	}
</style>