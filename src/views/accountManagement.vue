<template>
  <el-table 
  :data="registeredInfo" 
  style="width: 100%" 
  border 
  >
    <el-table-column type="index" label="序号" width="80" align="center"/>
    <el-table-column prop="username" label="账号" />
    <el-table-column prop="password" label="密码" />
    <el-table-column prop="realName" label="真实姓名" />
    <el-table-column prop="role" label="创建等级" />
    <el-table-column prop="canghao" label="所属仓号【0即1，2，3】">
      <!-- <template #default="{ row }">
        <div>{{ simplifyCangHao(row.canghao) }}</div>
      </template> -->
    </el-table-column>
    <el-table-column label="操作">
      <template #default="{ row }">
        <el-button size="mini" @click="editInfo(row)">编辑</el-button>
        <el-button size="mini" @click="deleteInfo(row)" type="danger">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="dialogVisible" title="编辑用户信息" width="30%">
    <el-form :model="newData" label-width="80px" :rules="rules">
      <el-form-item label="账号">
        <el-input v-model="newData.username" placeholder="请输入账号" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input 
        v-model="newData.password" 
        placeholder="请输入密码" 
        type="password" 
        show-password
        />
        <template #append>
      <el-button icon="view" @click="newData.password = newData.password"></el-button>
    </template>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="newData.confirmPassword" placeholder="请再次输入密码" type="password" show-password/>
        <template #append>
      <el-button icon="view" @click="newData.confirmPassword = newData.confirmPassword"></el-button>
    </template>
      </el-form-item>
      <el-form-item label="真实姓名">
        <el-input v-model="newData.realName" placeholder="请输入真实姓名" />
      </el-form-item>
      <el-form-item label="创建等级">
        <el-select v-model="newData.role" placeholder="请选择创建等级"
        @change="roleChangeHandler($event)">
          <el-option label="管理员" value="admin" />
          <el-option label="员工" value="worker" />
        </el-select>
      </el-form-item>
      <el-form-item label="所属仓号">
        <template v-if="newData.role !== 'admin'">
          <el-select v-model="newData.canghao" placeholder="请选择所属仓号">
          <el-option
            v-for="item in warehouseOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        </template>
        <template v-else>
          <span>仓号1，2，3（管理员默认仓号1，2，3）</span>
        </template>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateInfo">更新</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { reactive, onMounted, ref } from 'vue';
import { ElDialog, ElInput, ElMessageBox, ElLoading } from 'element-plus';
import axios from 'axios';
import service from '../utils/request';

const registeredInfo = reactive([

]);

const warehouseOptions = [
  { label: '仓号1', value: '1' },
  { label: '仓号2', value: '2' },
  { label: '仓号3', value: '3' }
];

// 更新表格数据
const fetchData = async () => {
  try {
    const response = await service.get(`sys/user/info`);
    
    newData = response.data; 
    
    
  } catch (error) {
    console.error('获取数据失败:', error);
  }
  updateTableKey();
};

const simplifyCangHao = (canghao) => {
  return canghao === '0' ? '1,2,3' : canghao;
};



// 组件挂载时获取数据
fetchData();

const dialogVisible = ref(false);
const newData = reactive({
  id: '',
  username: '',
  password: '',
  realName: '',
  role: '',
  canghao: '',
  confirmPassword: '',
});

const roleChangeHandler = (newRole) => {
  if (newRole === 'admin') {

    newData.canghao = '0';
  } else {
    const isOptionExist = warehouseOptions.some(option => option.value === newData.canghao);
    newData.canghao = isOptionExist ? newData.canghao : '';
  }
};


const rules = {
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于 6 个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    { validator: confirmPasswordValidator, trigger: 'blur' }
  ],
  realName: [
    { required: true, message: '请输入用户的真实姓名', trigger: 'blur' }
  ]
};

// 自定义验证器：确认密码与密码一致
function confirmPasswordValidator(rule, value, callback) {
  if (value !== newData.password) {
    callback(new Error('两次输入的密码不一致!'));
  } else {
    callback();
  }
}

const fetchUserInfo = async () => {
  try {
    const response = await service.get('/sys/user/info');
    registeredInfo.splice(0, registeredInfo.length, ...response.data.user.map(user => {
      const convertedCanghao = convertCanghaoStringToOptionValue(user.canghao);
      return {
        ...user,
        canghao: convertedCanghao
      };
    }));
  } catch (error) {
    console.error('获取用户信息失败:', error);
    ElMessage.error('获取用户信息失败: ' + error.message);
  }
};

const convertCanghaoStringToOptionValue = (canghaoString) => {
  if (canghaoString === '0') {
    return '1,2,3';
  }

  return canghaoString;
};

onMounted(fetchUserInfo);

const editInfo = (row) => {

    //复制所选行的数据到 newData
    Object.assign(newData, row);
    dialogVisible.value = true;

  roleChangeHandler(newData.role);
  };

  const updateInfo = async () => {

  roleChangeHandler(newData.role);

  if (newData.role === 'admin') {
    newData.canghao = '0';
  }
  ElLoading.service({
    text: '正在保存...',
    background: 'rgba(0, 0, 0, 0.7)',
  });

  try {
    const response = await service.put('/sys/user/update', newData);
    console.log(response);
    if (response.status===200) { 
      const updatedUser = response.data.user;
      ElMessage.success('编辑成功');

      const userIndex = registeredInfo.findIndex(item => item.id === updatedUser.id);
      if (userIndex > -1) {

        Object.assign(registeredInfo[userIndex], updatedUser);
      }
      
      // 关闭对话框
      dialogVisible.value = false;
      

    } else {
      ElMessage.error('编辑失败：' + response.data.message);
    }
  } catch (error) {
    ElMessage.error('编辑请求失败: ' + error.message);
  } finally {
    ElLoading.service().close(); // 确保加载提示被关闭
  }

};
const deleteInfo = async (row) => {
  const message = `
    <p>确定要删除以下信息吗?</p>
    <table style="width: 100%; border-collapse: collapse; border: 1px solid #ddd;">
      <tr style="border: 1px solid #ddd;">
        <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">账号</th>
        <td style="border: 1px solid #ddd; padding: 8px;width:180px">${row.username}</td>      
      </tr>      
      <tr style="border: 1px solid #ddd;">        
        <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">真实姓名</th>        
        <td style="border: 1px solid #ddd; padding: 8px;">${row.realName}</td>
      </tr>
      <tr style="border: 1px solid #ddd;">
        <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">所属仓号</th>
        <td style="border: 1px solid #ddd; padding: 8px;">${row.canghao}</td>      
      </tr>    
      <tr style="border: 1px solid #ddd;">
        <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">创建等级</th>
        <td style="border: 1px solid #ddd; padding: 8px;">${row.role}</td>      
      </tr> 
    </table>  `;  
    ElMessageBox.confirm(    
      message,    
      '提示',
      {      
        dangerouslyUseHTMLString: true,      
        distinguishCancelled: true,      
        confirmButtonText: '删除',      
        cancelButtonText: '取消',      
        type: 'warning',      
        center: true    
      } 
    ).then(async () => {    
      try {
      await service.delete(`/sys/user/delete`, { data: { username: row.username } });
      ElMessage.success('删除成功');
      //移除信息
      const index = registeredInfo.findIndex(item => item.username === row.username);
      if (index > -1) {
        registeredInfo.splice(index, 1);
      }
    } catch (error) {
      ElMessage.error('删除失败: ' + error.message);
    }
  }).catch(() => {
    ElMessage.info('已取消删除');
  });
};

</script>

<style scoped>

</style>