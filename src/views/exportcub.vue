// @ts-nocheck

<template>
    <div>
        <div class="container">
            <div class="handle-box">
                <el-select v-model="selectedSiteId" placeholder="请选择仓库ID" style="width: 200px;">
                    <el-option v-for="item in siteIds" :key="item" :label="item" :value="item"></el-option>
                </el-select>
                <el-select v-model="selectedStatu" placeholder="请选择状态" style="width: 200px;">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="未处理" value="0"></el-option>
                    <el-option label="已处理" value="1"></el-option>
                </el-select>

                <span style="margin-left: 20px;">日期：</span><el-select v-model="selectedDate" placeholder="请选择日期"
                    style="width: 200px;">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in cubDate" :key="item" :label="item" :value="item"></el-option>
                </el-select>
                <!-- <el-select v-model="selectedSiteId" placeholder="请选择日期" style="width: 200px;">
                    <el-option v-for="item in staytimes" :key="item" :label="item" :value="item"></el-option>
                </el-select> -->




                <el-button type="primary" @click="exportXlsx">导出预放仔表格</el-button>
            </div>
            <el-table :data="filteredcubSum" border class="table" header-cell-class-name="table-header">
                <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
                <el-table-column prop="site_id" label="仓库ID">
                </el-table-column>
                <el-table-column prop="house_id" label="鸽舍ID"></el-table-column>
                <el-table-column prop="cage_id" label="笼子ID"></el-table-column>
                <el-table-column prop="stay_time" label="留窝时间">
                    <template #default="{ row }">
                        {{ formatDate(row.stay_time) }}
                    </template>
                </el-table-column>
                <el-table-column prop="statu" label="是否处理">
                    <template #default="{ row }">
                        <span :style="{ color: row.statu === 1 ? 'green' : 'red' }">
                            {{ row.statu === 1 ? '已处理' : '未处理' }}
                        </span>
                    </template>
                </el-table-column>

            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout=" sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script setup lang = "ts" name = "export" >
import { Data } from 'ant-design-vue/es/_util/type';
import { ref, computed, watch, onBeforeUnmount } from 'vue';
import * as XLSX from 'xlsx';
import axios from 'axios';
import dayjs from 'dayjs';

import service from '../utils/request'

interface TableItem {
    id: number;
    site_id: number;
    house_id: number;
    cage_id: number;
    stay_time: Data;
    statu: number;
}

const cublist = ref<TableItem[]>([]);
const selectedStatu = ref<string | null>('');
const selectedDate = ref<string | null>('');

const currentPage = ref(1);
const pageSize = ref(100); // 每页显示的数据条数
const total = ref(0);




const getData = async (page=currentPage.value,size=pageSize.value,statu?:number) => {
    try {
        const response = await service.get(`/sys/stayList/list?page=${page}&pageSize=${size}`);
        // const response = await service.get('/app/put/list');
        cublist.value = response.data.stays.map((item:any) => {
            const formattedHouseId = format(item.house_id,item.site_id);
            return{
                ...item,
                house_id: formattedHouseId
            }
        });
        total.value = response.data.totalCount;

    } catch (error) {
        console.error('获取数据失败:', error);
    }
};


const format = (houseIdValue: number, siteIdValue: number): string => {
  let rowNum = 0; // 默认值，如果 siteId 不是 1、2 或 3，则不会改变

  // 使用 if 语句代替 switch 语句，以避免在没有匹配到 case 时 rowNum 保持 undefined
  if (siteIdValue === 1 || siteIdValue === 2 || siteIdValue === 3) {
    rowNum = 138;
  }

  if (houseIdValue > rowNum) {
    const hidSec = houseIdValue % rowNum === 0 ? houseIdValue % rowNum + rowNum : houseIdValue % rowNum;
    const hidFir = houseIdValue % rowNum === 0 ? Math.floor(houseIdValue / rowNum) : Math.ceil(houseIdValue / rowNum);
    return `${hidFir}-${hidSec}`;
  } else {
    return `1-${houseIdValue}`;
  }
};

// 当每页显示数据量改变时触发的方法
const handleSizeChange=(newSize:number)=>{
    pageSize.value = newSize;
    getData();
}

// 当当前页码改变时触发的函数
const handleCurrentChange=(newPage:number)=>{
    currentPage.value=newPage;
    getData();

}
getData();

const selectedSiteId = ref<number | null>(null);

// 获取所有site_id
const siteIds = computed(() => {
    const ids = new Set(cublist.value.map(item => item.site_id));
    return [...ids];
});

const cubDate = computed(() => {
    const fordata = Array.from(cublist.value.map(item => item.stay_time)).map(date => formatDate(date));
    const dateSet = new Set(fordata);
    return dateSet;
});

// 过滤出符合筛选条件的数据
const filteredcubSum = computed(() => {
    let result = cublist.value;
    if (selectedSiteId.value !== null) {
        result = result.filter((item: TableItem) => item.site_id === selectedSiteId.value);
    }
    if (selectedStatu.value !== '') {
        result = result.filter((item: TableItem) => item.statu === parseInt(selectedStatu.value!));
    }
    if (selectedDate.value !== null && selectedDate.value !== '') {
        result = result.filter((item: TableItem) => formatDate(item.stay_time) === selectedDate.value);
    }
    return result;
});
watch(selectedSiteId, () => {
    filteredcubSum.value;
});


const exportXlsx = () => {
    const list = [['仓库ID', '鸽舍ID-笼子ID', '留窝时间']];

    filteredcubSum.value.map((item: any, i: number) => {
        const combinedId = `${item.house_id}-${item.cage_id}`;
        const arr: any[] = [item.site_id, combinedId, formatDate(item.time)];
        list.push(arr);
    });
    let WorkSheet = XLSX.utils.aoa_to_sheet(list);

    // 设置列宽
    WorkSheet['!cols'] = [
        { wch: 6 },
        { wch: 20 }, // 扩大该列宽度以适应新表头
        { wch: 10 },
    ];

    let new_workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(new_workbook, WorkSheet, '第一页');
    XLSX.writeFile(new_workbook, `预放仔表格.xlsx`);
};
const formatDate = (datex:string) => {
    return dayjs(datex).format('YYYY-MM-DD');
};

const filterHandler = (
    value: string,
    row: any,
    column: any
) => {
    const property = column['property']
    return row[property] === value
}
const interval = setInterval(() => {
    getData();
    console.log("cub!")
}, 2000);

onBeforeUnmount(() => {
    console.log(111111111111111111);

    clearInterval(interval);
});

</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
}

.table {
    width: 100%;
    font-size: 14px;
}

.red {
    color: #f56c6c;
}

.mr10 {
    margin-right: 10px;
}

.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>  