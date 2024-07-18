<template>
      <div style="background-color: white; padding: 10px;">
  <div style="margin: 20px;">
    日期：      
    <el-date-picker
        v-model="selectedDate"
        type="date"
        placeholder="选择日期"
        style="width: 200px;"
        @change="handleDateChange"
      >
      </el-date-picker>
  </div>

  <div style="margin: 10px;">

    <el-table :data="filteredTableData" style="width: 100%" border>
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="siteId" label="鸽仓" width="180"></el-table-column>
      <el-table-column prop="pigeonHouseId" label="鸽舍" width="180"></el-table-column>
      <el-table-column prop="cageId" label="鸽笼" width="180"></el-table-column>
      <el-table-column prop="description" label="操作"></el-table-column>
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
  <el-table-column prop="time" label="时间" width="180"></el-table-column>

    </el-table>

  </div>
  <!-- <div style="display: flex; justify-content: space-between; align-items: center;margin-bottom: 30px;">
      <el-pagination
        :total="totalCount"
        :page-sizes="[50, 100, 150, 200]"
        :page-size="50"
        :current-page="currentPage"
        layout="sizes,prev, pager, next,jumper"
        @current-change="handlePageChange"
        @size-change="handleSizeChange"
      ></el-pagination>
    </div> -->
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted ,computed,watch} from 'vue';
import axios from 'axios';
import dayjs from 'dayjs';
import service from "../utils/request";


interface LogItem {
  id: number;
  user_id: number;
  site_id: number;
  house_id: number;
  cage_id: number;
  number: number;
  log_time: string;
  description: string;
}

interface EggHistoryItem {
  siteId: number;
  pigeonHouseId: string;
  cageId: number;
  time: string;
  description: string;
}

// 存储日期
const dateList = ref([]);

const selectedDate = ref<string | null >('')

const tableData = ref<EggHistoryItem[]>([]);
const totalCount = ref(0); // 总记录数
const currentPage = ref(1); // 当前页码
const pageSize = ref(Number.MAX_SAFE_INTEGER); // 每页记录数
// const pageCount = computed(() => Math.ceil(totalCount.value / pageSize.value)); // 总页数

// 定义筛选条件
const filterKey = ref(''); // 当前筛选的键
const filterValue = ref(''); // 当前筛选的值


// const formatDate = (timestamp: string) => dayjs(timestamp).format('YYYY-MM-DD   HH:mm:ss');

const simplifyDescription = (description: string): string => {
  let simplified = description;

  simplified = simplified.replace(/进行了(.+?)操作/, '$1');

  simplified = simplified.replace(/添加了死亡 种鸽0; 雏鸽(\d+)的死亡情况/
  , '死亡雏鸽$1');

  simplified = simplified.replace(/添加了(.+?)的死亡情况/, '$1');

  simplified = simplified.replace(/添加了(.+?)的异常/, '$1');

  simplified = simplified.replace(/添加了(.+?)异常/, '添加$1');

  simplified = simplified.replace(/删除了id为(\d+)的(.+?)记录/, '撤销$2');

  simplified = simplified.replace(/新增了id为(.+?)的(.+?)记录/, '添加$2');

  simplified = simplified.replace(/修改了异常状态操作/, '处理了异常');

  return simplified;
};

const simplifyTime = (log_time: string): { date: string; time: string } => {
  const datePart = log_time.substring(0, 10);
  const timePart = log_time.substring(11, 19);
  return { date: datePart, time: timePart };
};

const formatHouseId = (houseIdValue: number, siteIdValue: number): string => {
  let rowNum = 0; 

  if (siteIdValue === 1 || siteIdValue === 2 || siteIdValue === 3) {
    rowNum = 138;
  }

  const baseNumber = 138;

  if (houseIdValue > baseNumber) {
    const hidSec = houseIdValue % rowNum === 0 ? houseIdValue % rowNum + rowNum : houseIdValue % rowNum;
    const hidFir = houseIdValue % rowNum === 0 ? houseIdValue / rowNum : Math.ceil(houseIdValue / rowNum);
    return `${hidFir}-${hidSec}`;
  } else {
    return `1-${houseIdValue}`;
  }
};

const fetchData = async () => {
  try {
    const response = await service.get<{
      code: number;
      msg: string;
      totalCount: number;
      logs: LogItem[];
      type: string;
    }>('/sys/egg/LogList', {
      params: {
        page: currentPage.value,
        pageSize: pageSize.value,
        [filterKey.value]: filterValue.value,
        data:selectedDate.value || '',
      },
    });

    // console.log('@@@@', response.data);

    if (response.data.code === 200 && response.data.logs) {
      tableData.value = response.data.logs.map((item) => ({
        cageId: item.cage_id,
        siteId: item.site_id,
        pigeonHouseId: formatHouseId(item.house_id, item.site_id),
        description: simplifyDescription(item.description), // 使用简化函数
        time:simplifyTime(item.log_time).time,
        date:simplifyTime(item.log_time).date
      }));
      totalCount.value = response.data.totalCount;

      // if (response.data.totalCount > 0 && !Number.isInteger(pageSize.value)) {
      //   pageSize.value = response.data.totalCount;
      // }
      pageSize.value = response.data.totalCount;


      const dates = response.data.logs.map(item => item.log_time);
      const uniqueDates = Array.from(new Set(dates)).map(date => dayjs(date).format('YYYY-MM-DD'));
      dateList.value = uniqueDates;
    } else {
      console.error('数据错误：', response.data);
    }
  } catch (error) {
    console.error('获取数据失败', error);
  }
};

// 当日期改变时
const handleDateChange = async (value: string) => {
  const timestamp = dayjs(value).format('YYYY-MM-DD');
  selectedDate.value = timestamp;
  // 清除旧数据
  tableData.value = [];
  currentPage.value = 1; // 重置为第一页
  // pageSize.value = 20; // 重置每页记录数
  // 重新获取数据
  await fetchData(selectedDate.value);
};


const filteredTableData = computed(() => {
  let result = tableData.value;
  if (selectedDate.value) {
    // const selectedDateFormat = dayjs(selectedDate.value).format('YYYY-MM-DD');
    result = result.filter(item => item.date === selectedDate.value);
  }
  return result;
});

onMounted(async () => {
  const currentDateString = dayjs().format('YYYY-MM-DD');
  selectedDate.value = currentDateString;
  await fetchData();
});
</script>
