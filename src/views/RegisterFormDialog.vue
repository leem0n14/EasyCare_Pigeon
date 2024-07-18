<template>
  <el-dialog v-model="dialogVisible" title="注册账号" :close-on-click-modal="false">
    <el-form  :model="form" :rules="rules" ref="formRef" @submit="handleSubmit">
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username" placeholder="请输入账号" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input 
        type="password" 
        v-model="form.password" 
        placeholder="请输入密码" 
        show-password/>
        <template #append>
      <el-button icon="view" @click="form.password = form.password"></el-button>
    </template>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input 
        type="password" 
        v-model="form.confirmPassword" 
        placeholder="请再次输入密码" 
        show-password/>
        <template #append>
      <el-button icon="view" @click="form.confirmPassword = form.confirmPassword"></el-button>
    </template>
      </el-form-item>
      <el-form-item label="真实姓名" prop="realName">
        <el-input v-model="form.realName" placeholder="请输入真实姓名" />
        <div class="attention" style="color:red">*此真实姓名为注册账号所属人的真实姓名</div>
      </el-form-item>
      <el-form-item label="创建等级" prop="role">
        <el-select v-model="form.role" placeholder="请选择创建等级">
          <el-option label="管理员" value="admin" />
          <el-option label="员工" value="worker" />
        </el-select>
      </el-form-item>

      <el-form-item v-if="form.role==='admin'">     
        <span>所属仓号： </span>
        <span>  仓号1，2，3（管理员默认仓号1，2，3）</span>
      </el-form-item>
      <el-form-item label="所属仓号" prop="canghao" v-else>
        <el-select 
        v-model="form.canghao" 
        placeholder="请选择所属仓号"
        style="width:200px"
        >
        <el-option label="仓号1" value="1" />
        <el-option label="仓号2" value="2" />
        <el-option label="仓号3" value="3" />
      </el-select>

      </el-form-item>

    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <!-- <el-button @click="dialogVisible1 = false">取消</el-button> -->
        <el-button type="primary"  @click="handleSubmit">注册</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref,reactive,computed ,watch} from 'vue';
import { ElForm, ElFormItem, ElInput, ElButton, ElDialog, ElMessageBox, ElMessage, ElSelect, ElOption } from 'element-plus';
import { useRouter } from 'vue-router';
import { usePermissStore } from "../store/permiss";
import service from '../utils/request';

const form = reactive({
  id:'',
  username: '',
  password: '',
  confirmPassword: '',
  realName: '', 
  role: '' ,
  canghao: ''
});

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
    {  message: '请输入用户的真实姓名', trigger: 'blur' }
  ]
};

// 自定义验证器：确认密码与密码一致
function confirmPasswordValidator(rule, value, callback) {
  if (value !== form.password) {
    callback(new Error('两次输入的密码不一致!'));
  } else {
    callback();
  }
}

// 观察 role 的变化
watch(() => form.role, (newValue) => {
  // 如果是管理员，重置 canghao 为默认值
  if (newValue === 'admin') {
    form.canghao = '1';
  }
});

const dialogVisible = ref(false);
const formRef = ref(null);
const router = useRouter();
const permiss = usePermissStore();
const isLoading = ref(false);

const handleSubmit = async () => {
  isLoading.value = true;
  try {
    const valid = await formRef.value.validate();
    if (valid) {
      showRegistrationConfirmation()

    }else{
      ElMessage.error('请根据提示修改表单信息');
    }
  } 
  catch (error) {
    console.error('注册请求失败:', error);
    ElMessage.error('注册请求失败，请重试！');
  }
  finally {
    isLoading.value = false;
  }
};



// 点击注册时
const showRegistrationConfirmation = () => {
  ElMessageBox({
    title: '注册信息确认',
    message: 
    `
    <h4 style="color:red">请确认以下信息无误后再进行注册：</h4>
    <table>
      <tr><td>账号:</td><td style="margin-left:100px">${form.username}</td></tr>
      <tr><td>密码:</td><td>${form.password}</td></tr>
      <tr><td>确认密码:</td><td>${form.confirmPassword}</td></tr>
      <tr><td>真实姓名:</td><td>${form.realName}</td></tr>
      <tr><td>创建等级:</td><td>${form.role}</td></tr>
      <tr><td>所属仓号:</td><td>${form.role === 'admin' ? '1，2，3' : form.canghao}</td></tr>
    </table>
    `,
    confirmButtonText: '确认注册',
    cancelButtonText: '返回修改',
    distinguishCancelled: true,
    // ElMessageBox 的 message 属性期望的是一个纯文本字符串，所以要通过下边的属性允许转义
    dangerouslyUseHTMLString: true  // 使用这个属性来允许 HTML 标签
  }).then(async () => {
    await doRegister();  // 执行注册请求
    if (response.status === 200) { 
      dialogVisible.value = false;  // 关闭注册框
      router.push('/accountManagement');  // 跳转到账户管理页面
    } else {

      ElMessage.error('注册失败，请重试！');
    }
  }).catch(action => {
    if (action === 'cancel') {

      console.log('用户取消了注册');
      
    } else if (action === 'input') {
      // 用户选择了返回修改
      console.log('用户选择了返回修改');

      dialogVisible.value = false; // 关闭确认对话框
    }
  });
};

// 执行注册请求
const doRegister = async () => {
  
  const requestData = {
    role: form.role === 'admin' ? 'admin' : 'worker', 
    username: form.username,
    password: form.password,
    realName: form.realName,
    canghao: form.role === 'admin' ? '0' : form.canghao, // 设置canghao值
  };

  try {
    const response = await service.post('/sys/user/save', requestData);

    if (response.status === 409) {
      const errorData = response.data;
      ElMessage.error(`注册失败：${errorData.error}`);
      return; // 阻止执行后续代码
    }

    if (response.status === 200) {
      // 用户新增成功
      ElMessage.success('注册成功');
      router.go(0, '/accountManagement');
      dialogVisible.value = false;
      // registeredIndoRef.value.push(response.data.user);
    } else {
      // 其他错误状态码处理
      ElMessage.error('注册失败，状态码：' + response.status);
    }
  } catch (error) {
    // 网络请求失败的处理
    console.error('注册请求失败:', error);
    ElMessage.error('注册请求失败，请重试！');
  }
};

</script>