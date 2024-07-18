<template>
    <div>
        <div class="container">
            <div class="handle-box">
                <el-select v-model="selectedSiteId" placeholder="请选择仓库ID" style="width: 200px;">
                    <el-option v-for="item in siteIds" :key="item" :label="item" :value="item"></el-option>
                </el-select>
                状态： <el-select v-model="selectedStatu" placeholder="请选择状态" style="width: 200px;">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="未解决" value="0"></el-option>
                    <el-option label="已解决" value="1"></el-option>
                </el-select>
                日期：<el-select v-model="selectedDate" placeholder="请选择日期" style="width: 200px;">
                <el-option label="全部" value=""></el-option>
                <el-option v-for="item in abaDate" :key="item" :label="item" :value="item"></el-option>
            </el-select>
                <el-button type="primary" @click="exportXlsx">导出待处理异常名单</el-button>
            </div>
            <el-table 
            :data="filteredAbnormals" 
            border 
            class="table" 
            header-cell-class-name="table-header" 
            :row-class-name="rowStyle"
            >
                <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
                <el-table-column prop="site_id" label="仓库ID"></el-table-column>
                <el-table-column prop="house_id" label="鸽舍ID"></el-table-column>
                <el-table-column prop="cage_id" label="笼子ID"></el-table-column>
                <el-table-column prop="refer" label="异常情况"></el-table-column>
                <el-table-column prop="time" label="出现异常时间">
                    <template #default="{ row }">
                        {{ formatDate(row.time) }}
                    </template>
                </el-table-column>

                <el-table-column prop="statu" label="是否解决">
                    <template #default="{ row }">
                        <span :style="{ color: row.statu === 1 ? 'green' : 'red' }">
                            {{ row.statu === 1 ? '已解决' : '未解决' }}
                        </span>
                    </template>
                </el-table-column>
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="pageSize"
                    layout="sizes, prev, pager, next, jumper"
                    :total="total"
                    >
                </el-pagination>
            </el-table>


            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[50, 100, 150, 200]"
                :page-size="50"
                layout="sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>
    
<script setup lang="ts" name = "export">
import { ref, computed, watch, onBeforeUnmount } from 'vue';
import * as XLSX from 'xlsx';
import axios from 'axios';
import dayjs from 'dayjs';
import { Data } from 'ant-design-vue/es/_util/type';

import service from '../utils/request'; // 导入axios实例

// interface TableItem {
//     id: number;
//     site_id: number;
//     house_id: number;
//     cage_id: number;
//     refer: string;
//     time: Data;
//     statu: number;
// }

interface TableItem {
    id: number;
    site_id: number;
    house_id: number;
    cage_id: number;
    refer: string;
    time: Data;
    statu: number;
}


// 分页相关数据
const currentPage = ref(1); // 当前页码
const pageSize = ref(50); // 每页显示的数据条数
const total = ref(0); // 总数据量
const abnormals = ref<TableItem[]>([]);

const selectedDate = ref<string | null>('');
const abaDate = computed(() => {

    const fordata = Array.from(abnormals.value.map(item => item.time)).map(date => formatDate(date));
    const dateSet = new Set(fordata);
    return dateSet;
});

const getData = async (page = currentPage.value, size = pageSize.value) => {
  try {
    const response = await service.get(`/sys/abnormal/list?page=${page}&pageSize=${size}`);

    abnormals.value = response.data.abnormal.map((item:any) => {
      // 假设您想要根据 site_id 来格式化 house_id
      const formattedHouseId = format(item.house_id, item.site_id);
      return {
        ...item,
        house_id: formattedHouseId // 更新 house_id 为格式化后的值
      };
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
const handleSizeChange = (newSize: number) => {
  pageSize.value = newSize;
//   currentPage.value = 1; // 重置当前页码为第一页
  getData();
};

// 当当前页码改变时触发的方法
const handleCurrentChange = (newPage: number) => {
  currentPage.value = newPage;
  getData();
};

getData();

const rowStyle = ({ row, rowIndex }:any) => {
  // 根据条件返回不同的类名
  if (row.refer === '死亡 种鸽2'||row.refer === '死亡 种鸽1') {
    return 'red-row';
  }
  else if(row.refer === '淘汰'){
    return 'yellow-row';

  }
  else if(row.refer === '死仔'){
    return 'purple-row';

  }
  return '';
};


const formatDate = (date: string) => {
    let datePart = date.split('T')[0];
    console.log(datePart, "dr")
    return datePart
    // return dayjs(date).format('YYYY-MM-DD');
};
const selectedSiteId = ref<number | null>(null);
const selectedStatu = ref<string>('');

// 获取所有site_id
const siteIds = computed(() => {
    const ids = new Set(abnormals.value.map(item => item.site_id));
    return [...ids];
});

// 过滤出符合筛选条件的数据
const filteredAbnormals = computed(() => {
    if (selectedSiteId.value === null && selectedStatu.value === ''&& selectedDate.value === '') {
        return abnormals.value;
    } else {
        return abnormals.value.filter((item: TableItem) => {
            // 根据site_id和statu进行筛选
            if (selectedSiteId.value !== null && item.site_id !== selectedSiteId.value) {
                return false;
            }
            if (selectedStatu.value !== '' && item.statu.toString() !== selectedStatu.value) {
                return false;
            }
            if (selectedDate.value !== null && formatDate(item.time.toString()) !== selectedDate.value) {
                // console.log("======================")
                // console.log(selectedDate.value, "++")
                // console.log(item.time, "--")
                return false;
            }
            return true;
        });
    }
});

// 监听selectedSiteId和selectedStatu变化，重新计算filteredAbnormals
watch([selectedSiteId, selectedStatu,selectedDate], () => {
    filteredAbnormals.value;
});


const exportXlsx = () => {
    const list = [
        ['仓库ID', '鸽舍ID-笼子ID', '异常情况', '出现异常时间', '是否解决'],
    ];
    filteredAbnormals.value.map((item: any, i: number) => {
        const combinedId = `${item.house_id}-${item.cage_id}`;

        const arr: any[] = [
            item.site_id,
            combinedId,
            item.refer,
            formatDate(item.time),
            item.statu === 1 ? '已解决' : '未解决'
        ];
        list.push(arr);
    });
    let WorkSheet = XLSX.utils.aoa_to_sheet(list);

    // 设置列宽
    WorkSheet['!cols'] = [
        { wch: 10 },
        { wch: 20 },
        { wch: 40 },
        { wch: 20 },
        { wch: 10 }
    ];
    let new_workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(new_workbook, WorkSheet, '待处理异常表格');
    XLSX.writeFile(new_workbook, "待处理异常表格.xlsx");
};

const interval = setInterval(() => {
    getData();
    console.log("abnormal!")
}, 2000);

onBeforeUnmount(() => {
    console.log(111111111111111111);
    console.log(interval)
    clearInterval(interval);
});
</script>
    
<style scoped>
::v-deep .red-row {
  background-color: rgba(255, 60, 0, 0.488);
  color: rgb(0, 0, 0); /* 可选：设置文本颜色 */
}
::v-deep .yellow-row {
  background-color: rgba(250, 194, 104, 0.97);
  color: rgb(0, 0, 0); /* 可选：设置文本颜色 */
}
::v-deep .purple-row {
  background-color: rgba(158, 140, 181, 0.97);
  color: rgb(0, 0, 0); /* 可选：设置文本颜色 */
}
.handle-box {
    margin-bottom: 20px;
}

.el-select {
    margin-right: 20px;
}

.table {
    width: 100%;
    font-size: 14px;
}
</style>