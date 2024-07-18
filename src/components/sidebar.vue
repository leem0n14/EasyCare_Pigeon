<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="sidebar.collapse"
      background-color="#324157"
      text-color="#bfcbd9"
      unique-opened
      router
    >
      <div class="sidehead" v-if="!sidebar.collapse">
        <img
          class="jyu_icon_2"
          src="../assets/img/jyu-logo-empty.png"
          alt="嘉应学院"
        />
        <span class="headspan">嘉应学院614实验室开发</span>
      </div>
      <div class="sidehead" v-else>
        <img
          class="jyu_icon_2small"
          src="../assets/img/jyu-logo-empty.png"
          alt="嘉应学院"
        />
        <span class="headspansmall">嘉应学院</span>
      </div>
      <template v-for="item in items" :key="item.index">
        <template v-if="item.subs">
          <el-sub-menu :index="item.index" v-permiss="item.permiss">
            <template #title>
              <el-icon>
                <component :is="item.icon"></component>
              </el-icon>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs" :key="subItem.index">
              <el-sub-menu
                v-if="subItem.subs"
                :index="subItem.index"
                v-permiss="subItem.permiss"
              >
                <template #title>{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem, i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                  v-permiss="subItem.permiss"
                >
                  {{ threeItem.title }}
                </el-menu-item>
              </el-sub-menu>
              <el-menu-item
                v-else
                :index="subItem.index"
                v-permiss="subItem.permiss"
              >
                {{ subItem.title }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" v-permiss="item.permiss">
            <el-icon>
              <!-- <component :is="item.image"></component> -->
              <img :src="item.icon" alt="icon" />
            </el-icon>
            <template #title
              ><span style="margin-left: 15px !important">{{
                item.title
              }}</span></template
            >
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useSidebarStore } from "../store/sidebar";
import { useRoute } from "vue-router";
import shouyeImg from "../assets/img/img_icon/shouye.png";
import yichangImg from "../assets/img/img_icon/wenjianyichang.png";
import closeImg from "../assets/img/img_icon/guanbi.png";
import jidanImg from "../assets/img/img_icon/jidan.png";
import jinzhiImg from "../assets/img/img_icon/jinzhi.png";
import shouqiImg from "../assets/img/img_icon/shouqi.png";
import jyuImg from "../assets/img/img_icon/jyulogo.png";
import birdImg from "../assets/img/img_icon/bird.png";
import Souimg from "../assets/img/img_icon/sousuo.png";
import Img2 from "../assets/img/img_icon/图片2.png";
import Img3 from "../assets/img/img_icon/图片3.png";
import Img4 from "../assets/img/img_icon/图片4.png";
import Img5 from "../assets/img/img_icon/图片5.png";
import Img6 from "../assets/img/img_icon/图片6.png";
import Img7 from "../assets/img/img_icon/图片7.png";
import Img8 from "../assets/img/img_icon/图片8.png";
import Img10 from "../assets/img/img_icon/lishijilu.png";
import Img9 from "../assets/img/img_icon/图片9.png";
import Img15 from "../assets/img/img_icon/图片15.png";
import Img16 from "../assets/img/img_icon/图片16.png";
import faceLogo from "../assets/img/img_icon/face.png";
interface MenuItem {
  icon: string;
  index: string;
  title: string;
  permiss: string;
  subs?: MenuItem[];
}
export default defineComponent({
  setup() {
    const items = ref<MenuItem[]>([
      {
        // icon: 'Odometer',
        icon: Img8,
        index: "/charts",
        title: "系统首页",
        permiss: "1",
      },
      {
        icon: Img2,
        index: "/table",
        title: "鸽舍信息列表",
        permiss: "2",
      },
      // {
      //     icon: Img3,
      //     index: '/exportegg',
      //     title: '导出预抽蛋名单',
      //     permiss: '2',
      // },
      {
        icon: Img4,
        index: "/exportcub",
        title: "导出预放仔名单",
        permiss: "2",
      },
      {
        icon: Img5,
        index: "/exportabnormal",
        title: "导出待处理异常名单",
        permiss: "2",
      },
      {
        icon: Img6,
        index: "/exportdeath",
        title: "鸽子死亡名单",
        permiss: "2",
      },
      {
        icon: Img10,
        index: "/HistoryRecord",
        title: "历史记录",
        permiss: "2",
      },
      {
        icon: Img7,
        index: "/accountManagement",
        title: "账号管理",
        permiss: "2",
      },

      // {
      //     icon: Img5,
      //     index: '/sumcase',
      //     title: '统计与预警',
      //     permiss: '2',
      // },
    ]);

    const route = useRoute();
    const onRoutes = computed(() => {
      return route.path;
    });

    const sidebar = useSidebarStore();

    return { items, onRoutes, sidebar };
  },
});
</script>
<!-- <script setup lang="ts">
import { computed } from 'vue';
import { useSidebarStore } from '../store/sidebar';
import { useRoute } from 'vue-router';

const items = [

    {
        icon: 'Odometer',
        index: '/charts',
        title: '系统首页',
        permiss: '1',
    },


    {
        icon: 'DocumentCopy',
        index: '/table',
        title: '鸽舍信息列表',
        permiss: '2',
    },
    {
        icon: 'DocumentCopy',
        index: '/exportegg',
        title: '导出预抽蛋名单',
        permiss: '2',
    },
    {
        icon: 'DocumentCopy',
        index: '/exportcub',
        title: '导出预放仔名单',
        permiss: '2',
    },
    {
        icon: 'DocumentCopy',
        index: '/exportabnormal',
        title: '导出待处理异常名单',
        permiss: '2',
    },
    {
        icon: 'DocumentCopy',
        index: '/exportdeath',
        title: '鸽子死亡名单',
        permiss: '2',
    },

];

const route = useRoute();
const onRoutes = computed(() => {
    return route.path;
});

const sidebar = useSidebarStore();
</script> -->

<style scoped>
img{
  width: 30px;
}
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
  background-color: rgb(50, 65, 87);
}

.sidebar::-webkit-scrollbar {
  width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
  background-color: rgb(50, 65, 87);
}

.sidebar > ul {
  height: 100%;
}

.sidehead {
  display: flex;
  justify-items: center;
  align-items: center;
  flex-direction: column;
  height: 240px;
  background-color: rgb(50, 65, 87);
}

.jyu_icon_2 {
  padding-top: 20px;
  height: 140px;
  width: 140px;
}

.jyu_icon_2small {
  padding-top: 20px;
  height: 40px;
  width: 40px;
}

.headspan {
  padding-top: 20px;
  font-size: 20px;
  font-weight: 900;
  color: azure;
  text-wrap: nowrap;
}

.headspansmall {
  writing-mode: vertical-rl;
  text-orientation: upright;
  /* 设置文字方向为竖直 */
  letter-spacing: 12px;
  /* 设置字间距为2像素 */
  padding-top: 20px;
  font-weight: 800;
  font-size: 20px;
  color: aliceblue;

  /* 调整行高，使文字间距合适 */
}

.el-menu-item {
  font-size: 17px;
}

.el-menu-item.is-active {
  background-color: rgb(35, 45, 59) !important;
  /* color: red; */
  color: #68cfff;
}
</style>
