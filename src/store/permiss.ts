import { defineStore } from "pinia";
import service from "../utils/request";
import router from "../router"; // 导入路由实例

interface ObjectList {
  [key: string]: string[];
}

export const usePermissStore = defineStore("permiss", {
  state: () => ({
    // token: "",
    token: "",
    role: "", // role == 权限名称：admin或者user
    defaultList: {
      // admin: ["1"],
      admin: ["1", "2"],

      user: ["1"],
    },
    key: localStorage.getItem("keyser"), // 新建数组key
    username: "",
    password: "",
  }),
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setrole(role: string) {
      this.role = role;
    },
    async fetchrole() {
      this.token = localStorage.getItem("token_local");
      console.log(this.token);
      if (this.token == null) {
        console.log("token不存在，返回登录页");
        return;
      } else {
        await service
          .post("/sys/user/verifyToken", {
            token: this.token,
          })
          .then((response) => {
            this.role = response.data.role;
            console.log("role获取成功", this.role);
            this.setrole(this.role); // 调用setrole函数，将role的值赋值给role
            this.key = this.getDefaultListByRole(this.role); // 在得到role之后调用getDefaultListByRole并赋值给key数组
            localStorage.setItem("keyser", this.key);
            console.log("key==", this.key);
          })
          .catch((error) => {
            console.log("token验证失败，返回登录页");
            router.push("/login"); // 使用 router 对象进行路由跳转
            localStorage.removeItem("token_local");

            this.role = "";
          });
        return this.role;
      }
    },
    getDefaultListByRole(roles: string) {
      if (roles === "admin") {
        return this.defaultList.admin;
      } else if (roles === "user") {
        return this.defaultList.user;
      } else {
        console.log();
        return [];
      }
    },
  },
});
