

<template>
  <div>
    <div class="container">
      <div class="handle-box">
        <el-select v-model="selectedSiteId" placeholder="请选择仓库ID">
          <el-option label="仓库1" :value="1"></el-option>
          <el-option label="仓库2" :value="2"></el-option>
        </el-select>
        <el-button type="primary" @click="exportXlsx">导出统计</el-button>
      </div>
      <el-table :data="filteredData" border class="table" header-cell-class-name="table-header">
        <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
        <el-table-column prop="site_id" label="仓库ID"></el-table-column>
        <el-table-column prop="death_sum" label="死亡总数"></el-table-column>
        <el-table-column prop="time" label="时间">
          <template #default="{ row }">
            {{ formatDate(row.time) }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount } from 'vue';
import * as XLSX from 'xlsx';
import dayjs from 'dayjs';
import service from '../utils/request';

interface TableItem {
  id: number;
  site_id: number;
  death_sum: number;
  time: Date;
}

const deathCount = ref<TableItem[]>([]);

const getData = async () => {
  try {
    const response = await service.get('/sys/count/list');
    deathCount.value = response.data.count;
  } catch (error) {
    console.error('获取数据失败:', error);
  }
};
getData();

const selectedSiteId = ref<number | null>(null);

const filteredData = computed(() => {
  if (selectedSiteId.value === null) {
    return deathCount.value;
  } else {
    return deathCount.value.filter((item: TableItem) => {
      return item.site_id === selectedSiteId.value;
    });
  }
});

const exportXlsx = () => {
  const list = [['ID', '仓库ID', '死亡总数', '时间']];
  filteredData.value.map((item: TableItem, i: number) => {
    const arr: any[] = [i, item.site_id, item.death_sum, formatDate(item.time)];
    list.push(arr);
  });
  let WorkSheet = XLSX.utils.aoa_to_sheet(list);
  let new_workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(new_workbook, WorkSheet, '死亡统计');
  XLSX.writeFile(new_workbook, `死亡统计.xlsx`);
};


const formatDate = (date: Date) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
};

</script>
  
<style scoped>
.handle-box {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.table {
  width: 100%;
  font-size: 14px;
}
</style>
  