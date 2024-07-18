<template>
    <div class="container">
        <el-input v-model="sid" placeholder="请输入仓库id"></el-input>
        <el-input v-model="cubdeasum" placeholder="请输入雏鸽死亡总数"></el-input>
        <el-input v-model="matsum" placeholder="请输入出栏总数"></el-input>
        <el-button @click="addSum()" type="primary"> 加入总数</el-button>
        间隔天数： <el-input class="puter" v-model="days" placeholder="请输入间隔天数" @change="fetchdiffin(days)"></el-input>
        <el-button type="primary" class="buter" @click="fetchdiffin(days)">查询</el-button>
        <div v-if="warnings.length === 0">
            <div class="nos">没有间隔{{ days }}天没下蛋的鸽子</div>
        </div>
        <div v-else>
            <div class="ins">间隔{{ dayser }}天没下蛋的鸽子</div>

            <el-table :data="warnings" border class="table" header-cell-class-name="table-header">
                <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
                <el-table-column prop="site_id" label="仓库ID" width="75"></el-table-column>
                <el-table-column prop="house_id" label="鸽舍ID-笼子ID">
                    <template #default="{ row }">
                        {{ form(row.site_id, row.house_id) }}-----{{ row.cage_id }}
                    </template>
                </el-table-column>
                <el-table-column prop="diffInDays" label="生蛋间隔天数" width="125"></el-table-column>
            </el-table>
        </div>

    </div>
</template>
		
<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount, onMounted } from 'vue';
import * as XLSX from 'xlsx';
import service from '../utils/request'; // 导入axios实例
interface TableItem {
    site_id: number;
    house_id: number;
    cage_id: number;
    diffInDays: number;
}

const warnings = ref<TableItem[]>([]);
const days = ref(1)
const dayser = ref(1)

const sid = ref();
const cubdeasum = ref();
const matsum = ref();
const fetchdiffin = async (aka: number) => {
    try {
        const response = await service.get(`/sys/egg/eggWarn/${aka}`)
        warnings.value = response.data.warningEgg
        dayser.value = aka
    } catch (error) {
        console.error('获取数据失败:', error);
    }
}
const form = (siteid: number, houseid: number) => {
    let rowNum = 0;
    switch (siteid) {
        case 1:
            rowNum = 3;
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
const addSum = async () => {
    try {
        const response = await service.post('/sys/sum/addSum', {
            site_id: sid.value,
            cub_death_sum: cubdeasum.value,
            mature_sum: matsum.value,
            time: new Date().toISOString(),


        });

        sid.value = ''
        cubdeasum.value = ''
        matsum.value = ''
        console.log(response);
    } catch (error) {
        console.error('新增数据总量失败:', error);
    }
}
onMounted(() => {
    fetchdiffin(days.value);
});
</script>
		
<style scoped>
.puter {
    width: 200px;
    height: 40px;
    margin-bottom: 12px;
}

.buter {
    width: 100px;
    height: 40px;
    margin-left: 20px;
    margin-bottom: 2px;

}

.nos {
    text-align: center;
    font-size: 30px;
}

.ins {
    text-align: center;
    font-size: 20px;
    padding-bottom: 14px;
}
</style>