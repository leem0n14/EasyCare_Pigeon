import { createRouter, createWebHashHistory, RouteRecordRaw,createWebHistory  } from "vue-router";
import { usePermissStore } from "../store/permiss";
import Home from "../views/home.vue";
// 添加一个全局变量来保存当前的请求
let currentRequests: any[] = [];

// 取消所有正在进行的请求
const cancelAllRequests = () => {
  currentRequests.forEach((request) => {
    if (request.cancel) {
      request.cancel();
    }
  });
  currentRequests = [];
};
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/charts",
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/charts",
        name: "charts",
        meta: {
          title: "系统首页",
          permiss: "1",
        },
        component: () =>
          import(/* webpackChunkName: "dashboard" */ "../views/charts.vue"),
      },
      {
        path: "/table",
        name: "basetable",
        meta: {
          title: "表格",
          permiss: "2",
        },
        component: () =>
          import(/* webpackChunkName: "table" */ "../views/table.vue"),
      },

      // {
      //   path: "/exportegg",
      //   name: "exportegg",
      //   meta: {
      //     title: "导出预抽蛋名单",
      //     permiss: "2",
      //   },
      //   component: () =>
      //     import(/* webpackChunkName: "export" */ "../views/exportegg.vue"),
      // },
      {
        path: "/exportcub",
        name: "exportcub",
        meta: {
          title: "导出预放仔名单",
          permiss: "2",
        },
        component: () => import("../views/exportcub.vue"),
      },
      {
        path: "/exportabnormal",
        name: "exportabnormal",
        meta: {
          title: "待处理异常名单",
          permiss: "2",
        },
        component: () =>
          import(
            /* webpackChunkName: "import" */ "../views/exportabnormal.vue"
          ),
      },
      {
        path: "/exportdeath",
        name: "exportdeath",
        meta: {
          title: "鸽子死亡名单",
          permiss: "2",
        },
        component: () =>
          import(/* webpackChunkName: "import" */ "../views/exportdeath.vue"),
      },
      {
        path: "/sumcase",
        name: "sumcase",
        meta: {
          title: "统计与预警",
          permiss: "2",
        },
        component: () =>
          import(/* webpackChunkName: "import" */ "../views/sumCase.vue"),
      },
      {
        path: "/HistoryRecord",
        name: "HistoryRecord",
        meta: {
          title: "历史记录",
          permiss: "2",
        },
        component: () =>
          import(/* webpackChunkName: "import" */ "../views/HistoryRecord.vue"),
      },
      {
        path: "/accountManagement",
        name: "accountManagement",
        meta: {
          title: "账号管理",
          permiss: "2",
        },
        component: () =>
          import(/* webpackChunkName: "import" */ "../views/accountManagement.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "登录",
    },
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/login.vue"),
  },
  {
    path: "/403",
    name: "403",
    meta: {
      title: "没有权限",
    },
    component: () => import(/* webpackChunkName: "403" */ "../views/403.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach(async (to, from, next) => {
  document.title = `鸽子养殖管理后台—${to.meta.title}`;
  const store = usePermissStore();
  let role = store.role;
  const token = localStorage.getItem("token_local");

  console.log(token);

  const pathss = store.key;

  cancelAllRequests();
  console.log("permiss", to.meta.permiss, pathss);
  console.log("正常跳转");
  next();
});

export default router;
