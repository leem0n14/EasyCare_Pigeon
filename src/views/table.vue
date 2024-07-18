


	   

<template>
	<div class="container">
		<div class="handle-box">
			<el-select v-model="selectedSite" placeholder="选择仓库ID" @change="filterData">
				<el-option value="">全部</el-option>
				<el-option v-for="site in sites" :key="site.site_id" :value="site.site_id"
					:label="site.site_id"></el-option>
			</el-select>
		</div>
		<el-table :data="filteredCages" border class="table" header-cell-class-name="table-header">
			<el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
			<el-table-column prop="site_id" label="仓库ID"></el-table-column>
			<el-table-column prop="house_id" label="鸽舍ID">
				<template #default="{ row }">
					<span>{{ form(row.site_id, row.house_id) }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="numberSum" label="种鸽总数量"></el-table-column>
			<el-table-column prop="cubNumberSum" label="雏鸽总数量"></el-table-column>
			<el-table-column label="详情">
				<template #default="{ row }">
					<el-button type="primary" @click="showDetails(row)">查看详情</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div>
			<div class="popup-bg" v-show="isPopupVisible" @click="hideDetails"></div>
			<div class="popup" v-show="isPopupVisible">
				<div class="popup-header">
					<p>仓库ID：{{ selectedCage?.site_id }}</p>
					<p>鸽舍ID：{{ form(selectedCage?.site_id, selectedCage?.house_id) }}</p>
				</div>
				<div class="popup-body">
					<el-table :data="cageDetails" border class="table" header-cell-class-name="table-header">
						<el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
						<el-table-column prop="cage_id" label="笼子ID"></el-table-column>
						<el-table-column prop="number" label="种鸽数量"></el-table-column>
						<el-table-column prop="statu" label="状态"></el-table-column>
						<el-table-column prop="cub_number" label="雏鸟数量"></el-table-column>
						<el-table-column label="操作按钮" width="300">
							<template #default="{ row }">
								<el-button type="primary" @click="showUpdate(row)">修改数据</el-button>
								<el-button type="primary" @click="showhistoryDetail(row)">查看数据</el-button>

							</template>
						</el-table-column>
					</el-table>

				</div>
			</div>
		</div>
		<div class="popup-bg2" v-show="isPopupVisible2" @click="hideDetails2"></div>
		<div class="popup2" v-show="isPopupVisible2">
			<div class="popup2header">
				<p class="p2t">鸽舍-笼号：{{ form(modifiedData.site_id, modifiedData.house_id) }}---{{ modifiedData.cage_id }}</p>
				<div class="phb">
					<div class="p2l">
						<p>种鸟数量:{{ bef_cageUpdate.numberSum }}</p>
						<p>雏鸟数量:{{ bef_cageUpdate.cubNumberSum }}</p>
						<p>状态：{{ bef_cageUpdate.Statu }}</p>
					</div>
					<p></p>
					<div class="p2r">
						<p>种鸟数量:{{ modifiedData.numberSum }}</p>
						<p>雏鸟数量:{{ modifiedData.cubNumberSum }}</p>
						<p>状态：{{ modifiedData.Statu }}</p>
					</div>
				</div>
			</div>
			<div class="inputcase">
				<label>
					种鸽数量:
					<el-radio-group v-model="modifiedData.numberSum" class="ml-4">
						<el-radio :label="0"> 0</el-radio>
						<el-radio :label="1"> 1</el-radio>
						<el-radio :label="2"> 2</el-radio>
					</el-radio-group>
				</label>
				<label>
					雏鸽数量:
					<el-radio-group v-model="modifiedData.cubNumberSum" class="ml-4">
						<el-radio :label="0">0</el-radio>
						<el-radio :label="1">1</el-radio>
						<el-radio :label="2">2</el-radio>
						<el-radio :label="3">3</el-radio>
						<el-radio :label="4">4</el-radio>
					</el-radio-group>
				</label>
				<label>
					状态:
					<el-radio-group v-model="modifiedData.Statu" class="ml-1">
						<el-radio label="初始状态"> 初始状态</el-radio>
						<el-radio label="预抽蛋"> 预抽蛋</el-radio>
						<el-radio label="留窝"> 留窝</el-radio>
						<el-radio label="抽蛋"> 抽蛋</el-radio>
						<el-radio label="带仔中"> 带仔中</el-radio>
					</el-radio-group>
				</label>
				<el-button style="margin: 0 260px;" type="primary" @click="submiter(modifiedData)">提交修改</el-button>
			</div>
		</div>
		<div class="popup-bg3" v-show="isPopupVisible3" @click="hideDetails3"></div>
		<div class="popup3" v-show="isPopupVisible3">
			<div class="titlehistory">仓库-鸽舍-笼号：{{ sid }}-{{ form(sid, hid) }}-{{ cid }}</div>
			<el-table :data="cageHistory" border class="historytable" header-cell-class-name="table-header">
				<el-table-column prop="status" label="状态"></el-table-column>
				<el-table-column prop="time" label="日期">
					<template #default="{ row }">
						{{ formatDate(row.time) }}
					</template>
				</el-table-column>
				<!-- <el-table-column label="操作按钮" width="300">
					<template #default="{ row }">
						<el-button type="primary" @click="updateHistory(row)">修改数据</el-button>

					</template>
				</el-table-column> -->
			</el-table>
		</div>
		<!-- <div class="popup4" v-show="isPopupVisible4">
			<div class="titlehistory">仓库-鸽舍-笼号：{{ sid }}-{{ hid }}-{{ cid }}</div>

		</div> -->
	</div>
</template>
		
<script setup lang="ts">
import { ref, computed, onBeforeUnmount, Ref } from 'vue';
import service from '../utils/request';
import dayjs from 'dayjs';
import { number } from 'echarts';

interface TableItem {
	id: number;
	site_id: number;
	house_id: number;
	cage_id: number;
	numberSum: number | null;
	Statu: string;
	cubNumberSum: number | null;
}



const cages = ref<TableItem[]>([]);
const selectedSite = ref<number | null>(null);
const cageDetails = ref<TableItem[]>([]);
const isPopupVisible = ref(false);
const isPopupVisible2 = ref(false);
const isPopupVisible3 = ref(false)
const isPopupVisible4 = ref(false)
const selectedCage = ref<TableItem | null>(null);
const cageDetail = ref<TableItem>

// const modifiedData = ref<TableItem>;
const modifiedData: Ref<TableItem> = ref({
	id: 0,
	site_id: 0,
	house_id: 0,
	cage_id: 0,
	numberSum: null,
	Statu: '',
	cubNumberSum: null
});
const bef_cageUpdate: Ref<TableItem> = ref({
	id: 0,
	site_id: 0,
	house_id: 0,
	cage_id: 0,
	numberSum: null,
	Statu: '',
	cubNumberSum: null
});

const form = (siteid: number, houseid: number) => {
	let rowNum = 0;
	switch (siteid) {
		case 1:
			rowNum = 138;
			break;
		case 2:
			rowNum = 142;
			break;
		case 3:
			rowNum = 138;
			break;
		default:
			break;
	}

	if (houseid > rowNum) {
		const hid_sec = houseid % rowNum === 0 ? houseid % rowNum + rowNum : houseid % rowNum
		const hid_fir = parseInt(houseid % rowNum) === 0 ? parseInt(houseid / rowNum) : parseInt(houseid /
			rowNum) + 1;
		return `${hid_fir}-${hid_sec}`
	} else return '1-' + houseid
}



const cageHistory = ref([])
const getData = async () => {
	try {
		const response = await service.get('/sys/cage/numberAndCubNumberSum');
		cages.value = response.data;
		console.log(cages.value);
	} catch (error) {
		console.error('获取数据失败:', error);
	}
};
const fetchCageDetails = async (siteId: number, houseId: number) => {
	try {
		const response = await service.get(`/sys/cage/cageDetail?site_id=${siteId}&house_id=${houseId}`);
		cageDetails.value = response.data.cages;

		console.log(cageDetails.value)
	} catch (error) {
		console.error('获取鸽舍详情失败:', error);
	}
};
const fetchCageHistory = async (siteId: number, houseId: number, cageId: number) => {
	try {
		const response = await service.get(`/sys/cage/cageStatus?site_id=${siteId}&house_id=${houseId}&cage_id=${cageId}`);
		// cageHistory.value = response.data.cages;
		console.log(response, "history")
		cageHistory.value = response.data.cagesStatus
		console.log(cageHistory.value, "historycage")


	} catch (error) {
		console.error('获取鸽舍详情失败:', error);
	}
}
getData();

const sites = computed(() => {
	const siteIds = Array.from(new Set(cages.value.map((item) => item.site_id)));
	return siteIds.map((siteId) => ({ site_id: siteId }));
});

const filteredCages = computed(() => {
	if (selectedSite.value) {
		return cages.value.filter((item) => item.site_id === selectedSite.value);
	}
	return cages.value;
});

const filterData = () => {
	// 执行筛选操作
};

const showDetails = (cage: TableItem) => {
	selectedCage.value = cage;
	isPopupVisible.value = true;
	fetchCageDetails(cage.site_id, cage.house_id);

};
const sid = ref()
const hid = ref()
const cid = ref();
const showhistoryDetail = (cage: TableItem) => {
	sid.value = cage.site_id
	hid.value = cage.house_id
	cid.value = cage.cage_id
	fetchCageHistory(cage.site_id, cage.house_id, cage.cage_id)
	isPopupVisible3.value = true;

}
const hideDetails3 = () => {
	isPopupVisible3.value = false
}
const showUpdate = (row: TableItem) => {
	// submiter(row);
	modifiedData.value.site_id = row.site_id;
	modifiedData.value.house_id = row.house_id;
	modifiedData.value.cage_id = row.cage_id;

	modifiedData.value.numberSum = row.number;
	modifiedData.value.Statu = row.statu;
	modifiedData.value.cubNumberSum = row.cub_number;

	bef_cageUpdate.value.site_id = row.site_id;
	bef_cageUpdate.value.house_id = row.house_id;
	bef_cageUpdate.value.cage_id = row.cage_id;

	bef_cageUpdate.value.numberSum = row.number;
	bef_cageUpdate.value.Statu = row.statu;
	bef_cageUpdate.value.cubNumberSum = row.cub_number;

	console.log(modifiedData.value, "modifiedData_value")
	console.log(row, "rowrowrow")
	isPopupVisible2.value = true;
}

const hideDetails2 = () => {
	isPopupVisible2.value = false;
	modifiedData.value.numberSum = 0;
	modifiedData.value.Statu = '';
	modifiedData.value.cubNumberSum = null;
}
const hideDetails = () => {
	selectedCage.value = null;
	isPopupVisible.value = false;
};
const submiter = (modifiedData: TableItem) => {
	const siteId = modifiedData.site_id;
	const houseId = modifiedData.house_id;
	const cageId = modifiedData.cage_id;

	const numberSum = modifiedData.numberSum
	const Statu = modifiedData.Statu
	const cubNumberSum = modifiedData.cubNumberSum
	console.log(modifiedData)
	const data = {
		site_id: siteId,
		house_id: houseId,
		cage_id: cageId,
		number: numberSum,
		statu: Statu,
		cub_number: cubNumberSum
	}
	console.log("data++")
	console.log(data)
	service.put("/sys/cage/update", data)
		.then(response => {
			console.log("response");
			console.log(response);
			fetchCageDetails(siteId, houseId);
			getData();
			isPopupVisible2.value = false;
			isPopupVisible.value = false;
		}).catch(error => {
			// 发生错误时在控制台中输出错误信息。
			alert("修改失败");
			console.error(error);
		});
	console.log(1);




}
const formatDate = (date: Date) => {
	return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
};
interface cageHistoryhandle {
	id: number,
	site_id: number,
	house_id: number,
	cage_id: number,
	time: string,
	statu: string
}
const updateHistory = (hishandle: cageHistoryhandle) => {
	hishandle.site_id = sid.value
	hishandle.house_id = hid.value
	hishandle.cage_id = cid.value
	isPopupVisible4.value = true
	console.log(hishandle, "xxxxxxxxx-------------")
}
const interval = setInterval(() => {
	getData();
	console.log("table!")
}, 200000);
onBeforeUnmount(() => {
	clearInterval(interval);
});

</script>
		
<style scoped>
.handle-box {
	margin-bottom: 20px;
}

.table {
	width: 100%;
	font-size: 14px;
}

.popup-bg {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 999;
}

.popup {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 800px;
	min-height: 200px;
	background-color: #fff;
	border-radius: 5px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
	z-index: 1000;
}

.popup-header {
	padding: 20px;
	font-size: 20px;
	font-weight: bold;
	background-color: #f0f0f0;
}

.popup-body {
	padding: 20px;
}


.popup-bg2 {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 1001;
}

.popup2 {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 800px;
	min-height: 200px;
	background-color: #fff;
	border-radius: 5px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
	z-index: 1002;
	border-radius: 10px;
	overflow: hidden;
}

.popup-bg3 {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 1001;
}

.popup3 {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 900px;
	height: 500px;
	min-height: 200px;
	background-color: #fff;
	border-radius: 5px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
	z-index: 1002;
	border-radius: 10px;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
}

.historytable {
	margin-top: 20px;
	width: 90%;
}

.inputcase {
	margin-top: 20px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;

	gap: 20px;
}

.inputcase input {
	height: 40px;
	all: unset;
}

.popup2header {
	font-size: 20px;
	font-weight: bold;
	background-color: #f0f0f0;
	display: flex;
}

.p2t {
	position: absolute;
	padding-top: 20px;
	width: 100%;
	text-align: center;
}

.phb {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	padding-top: 50px;
	gap: 50px;
	padding-bottom: 20px;
}

.p2l {}

.titlehistory {
	height: 40px;
	width: 100%;
	background-color: #fff;
	text-align: center;
	font-size: 24px;
	padding-top: 20px;
	font-weight: 700;
}

.inputcase {
	padding-bottom: 20px;
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	padding-left: 100px;
}

.normalinputradio {
	width: 20px;
	background-color: antiquewhite;
	height: 20px;
}
</style>

