import { createApp } from "vue";
import { ref } from 'vue';
import { createPinia } from "pinia";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import App from "./App.vue";
import router from "./router";
import { usePermissStore } from "./store/permiss";
import { Store } from 'vuex'
import "element-plus/dist/index.css";
import "./assets/css/icon.css";

// // 定义全局State的类型
// interface RootState {
//   registeredInfo:{
//     id: number;
//     username: string;
//   }[];
// }


const app = createApp(App);
app.use(createPinia());
app.use(router);
// 将store注入到Vue实例中，这里需要指定Store的泛型参数为RootState
// app.provide('userStore', userStore);

// 注册elementplus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
// 自定义权限指令
const permiss = usePermissStore();
app.directive("permiss", {
  mounted(el, binding) {
    console.log(!permiss.key.includes(String(binding.value)));
    console.log("binding===============", binding.value);

    if (!permiss.key.includes(String(binding.value))) {
      el["hidden"] = true;
    }
  },
});

// export const registeredInfoRef = ref([]);

app.mount("#app");
