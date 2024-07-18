<template>
	<div class="login-wrap">
		<div class="bci"> </div>

		<div class="ms-login">
			<div class="ms-title" style="color: rgb(255, 255, 255); font-size: 22px;font-weight: 900;"> >欢迎进入鸽子养殖后台管理系统
			</div>
			<el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
				<el-form-item prop="username">
					<el-input v-model="param.username" placeholder="username">
						<template #prepend>
							<el-button :icon="User"></el-button>
						</template>
					</el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input type="password" placeholder="password" v-model="param.password"
						@keyup.enter="submitForm(login)">
						<template #prepend>
							<el-button :icon="Lock"></el-button>
						</template>
					</el-input>
				</el-form-item>
				<div class="login-btn">
					<el-button type="primary" @click="submitForm(login)">登录</el-button>
				</div>
			</el-form>
			<div style="font-size: 8px; cursor: pointer;" @click="poper()">2023 - 12 - 24</div>


		</div>
		<div class="hidden" :class="{ 'pop': pops, 'other-class': true }">
			<span style="color: white;">
				2023-12-24
				完善了登录功能，403问题；
				<br>
			
			</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useTagsStore } from '../store/tags';
import { usePermissStore } from '../store/permiss';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import { Lock, User } from '@element-plus/icons-vue';
import service from '../utils/request';

interface LoginInfo {
	username: string;
	password: string;
}

const router = useRouter();
const param = reactive<LoginInfo>({
	username: '',
	password: ''
});
const pops = ref<boolean>(false);
const poper = () => {
	pops.value = !pops.value;
}
const rules: FormRules = {
	username: [
		{
			required: true,
			message: '请输入用户名',
			trigger: 'blur'
		}
	],
	password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
};
const permiss = usePermissStore();
const login = ref<FormInstance>();
const submitForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate((valid: boolean) => {
		if (valid) {

			service.post('/sys/user/login', {
				username: param.username,
				password: param.password
			}).then(async (response) => {
				console.log(response, "res")
				const token = response.data.token; // 假设返回的数据结构中包含 token 字段
				localStorage.setItem('token_local', token);
				console.log(token)

				// 将 token 存入 usePermissStore 中

				const role = await permiss.fetchrole();
				console.log(role, "role")
				const pathss = permiss.key;
				console.log(pathss, "pathss++++")
				permiss.setToken(token);

				ElMessage.success('登录成功');
				router.push('/');
			}).catch((error) => {
				// console.log(error); // 输出整个错误对象
				ElMessage.error('登陆失败')

			});
		}
	});
};



const tags = useTagsStore();
tags.clearTags();
</script>

<style scoped>
.login-wrap {
	position: relative;
	width: 100%;
	height: 100%;
	background-size: 100%;
}

.bci {
	background-image: url(../assets/img/login-bg.jpg);
	width: 50%;
	height: 100%;
	background-repeat: no-repeat;
	background-size: cover;
}

.ms-title {
	width: 100%;
	line-height: 50px;
	text-align: center;
	font-size: 20px;
	color: #fff;
	border-bottom: 1px solid #ddd;
}

.ms-login {
	position: absolute;
	left: 50%;
	top: 50%;
	width: 350px;
	margin: -190px 0 0 -175px;
	border-radius: 5px;
	background: rgba(255, 255, 255, 0.3);
	overflow: hidden;
}

.ms-content {
	padding: 30px 30px;
}

.login-btn {
	text-align: center;
}

.login-btn button {
	width: 100%;
	height: 36px;
	margin-bottom: 10px;
}

.login-tips {
	font-size: 12px;
	line-height: 30px;
	color: #fff;
}

.hidden {
	position: fixed;
	top: 30px;
	left: -100px;
	height: 100px;
	width: 200px;
	background-color: rgb(50, 65, 87);
	transition: ease-in-out 0.5s;
	/* display: none; */
}

.pop {
	left: 0px;
	transition: ease-in-out 0.5s;
}
</style>
<!-- <template>
	<div class="login-wrap">
		<div class="bci"> </div>

		<div class="ms-login">
			<div class="ms-title" style="color: black;"> >欢迎进入鸽子养殖后台管理系统
			</div>
			<el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
				<el-form-item prop="username">
					<el-input v-model="param.username" placeholder="username">
						<template #prepend>
							<el-button :icon="User"></el-button>
						</template>
					</el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input type="password" placeholder="password" v-model="param.password"
						@keyup.enter="submitForm(login)">
						<template #prepend>
							<el-button :icon="Lock"></el-button>
						</template>
					</el-input>
				</el-form-item>
				<div class="login-btn">
					<el-button type="primary" @click="submitForm(login)">登录</el-button>
				</div>
			</el-form>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useTagsStore } from '../store/tags';
import { usePermissStore } from '../store/permiss';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import { Lock, User } from '@element-plus/icons-vue';
import axios from 'axios';
import service from '../utils/request'; // 确认 service 的引入路径



interface LoginInfo {
	username: string;
	password: string;
}

const router = useRouter();
const param = reactive<LoginInfo>({
	username: '',
	password: ''
});

const rules: FormRules = {
	username: [
		{
			required: true,
			message: '请输入用户名',
			trigger: 'blur'
		}
	],
	password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
};
const permiss = usePermissStore();
const login = ref<FormInstance>();
const submitForm = async (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate(async (valid: boolean) => {
		if (valid) {
			try {
				const response = await service.post('/api/login', param); // 假设登录接口为 /api/login
				if (response.data.success) {
					ElMessage.success('登录成功');
					localStorage.setItem('ms_username', response.data.token);
					const keys = permiss.defaultList[param.username == 'admin' ? 'admin' : 'user'];
					permiss.handleSet(keys);
					localStorage.setItem('ms_keys', JSON.stringify(keys));
					router.push('/');
				} else {
					ElMessage.error(response.data.message || '登录失败');
				}
			} catch (error) {
				ElMessage.error('登录失败');
				console.error(error);
			}
		} else {
			ElMessage.error('登录成功');
			return false;
		}
	});
};


const tags = useTagsStore();
tags.clearTags();
</script>

<style scoped>
.login-wrap {
	position: relative;
	width: 100%;
	height: 100%;
	background-size: 100%;
}

.bci {
	background-image: url(../assets/img/login-bg.jpg);
	width: 50%;
	height: 100%;
	background-repeat: no-repeat;
	background-size: cover;
}

.ms-title {
	width: 100%;
	line-height: 50px;
	text-align: center;
	font-size: 20px;
	color: #fff;
	border-bottom: 1px solid #ddd;
}

.ms-login {
	position: absolute;
	left: 50%;
	top: 50%;
	width: 350px;
	margin: -190px 0 0 -175px;
	border-radius: 5px;
	background: rgba(255, 255, 255, 0.3);
	overflow: hidden;
}

.ms-content {
	padding: 30px 30px;
}

.login-btn {
	text-align: center;
}

.login-btn button {
	width: 100%;
	height: 36px;
	margin-bottom: 10px;
}

.login-tips {
	font-size: 12px;
	line-height: 30px;
	color: #fff;
}
</style> -->
