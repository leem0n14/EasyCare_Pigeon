<!-- dashboard 最后一个div放的位置会影响页面跳转！？ -->
<template>
  <div class="dashboard">
    <!-- <div class="wave"></div> -->
    <!-- <div class="background-icon"></div> -->
    <div class="glass">
      <!-- <div class="weaher_box">
				<div class="text1">
					<h3><strong>多云转晴</strong></h3>
					<h2>2023-11-23</h2>
					<h4>星期四</h4>


				</div> -->

      <!-- <h2>梅州梅江区天气</h2> -->

      <!-- v-if="weatherData" -->
      <!-- <p>最高温度：{{ weatherData.tempMax }}℃</p>
					<p>最低温度：{{ weatherData.tempMin }}℃</p>
					<p>晨间天气：{{ weatherData.textDay }}</p>
					<p>夜间天气：{{ weatherData.textNight }}</p> -->

      <!-- <h3>最高温度：23℃</h3>
					<p>最低温度：12℃</p>
					<p>晨间天气：多云</p>
					<p>夜间天气：大太阳</p> -->

      <!-- <div v-else>
					<p>正在加载天气数据...</p>
				</div> -->
      <!-- </div> -->
      <div class="card-container">
        <!-- <div class="card-container1">
				<img class="jyu_icon_2" src="../assets/img/jyu__icon_2.jpg" alt="嘉应学院">
				<span class="iconfont icon-gezi"></span>
				<span style="font-size: 20px; 	margin-top: 10px;
">嘉应学院614实验室开发</span>
			</div> -->
        <div class="card-container2">
          <!-- <router-link to="/exportdeath">
						<div class="card">
							<div class="text">
								<span class="card-header">今日产蛋数</span>
								<div class="card-body">
									<div>{{ card5Data }}</div>
									<div class="compare">
										<span class="comparetext" v-if="card5Data > yesterdayData5" style="color: green;">
											<span class="iconfont">&#xe61d;</span>
											{{ card5Data -
												yesterdayData5
											}}
										</span>
										<span class="comparetext" v-if="card5Data < yesterdayData5"
											style="color: rgb(255, 108, 108);"><span class="iconfont">&#xe61e;</span> {{
												yesterdayData5 -
												card5Data }}</span>
										<span v-if="card5Data === yesterdayData5">-</span>
									</div>
								</div>
							</div>
							<div class="iconbox">
								<svg class="icon" aria-hidden="true">
									<use xlink:href="#icon-caidan"></use>
								</svg>
							</div>
						</div>


					</router-link> -->
          <div class="card">
            <div class="text">
              <span class="card-header">选择仓库</span>
              <div class="card-body">
              </div>
              <el-select
                  class="site-select"
                  v-model="site_sid"
                  @change="refreshData"
                  placeholder="123"
                >
                  <el-option
                    v-for="(item, index) in siteIdList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
            </div>
          </div>
          <router-link to="/table">
            <div class="card">
              <div class="text">
                <span class="card-header">今日产蛋数</span>
                <div class="card-body">
                  <div>{{ card5Data }}</div>
                  <div class="compare">
                    <span
                      class="comparetext"
                      v-if="card5Data > yesterdayData5"
                      style="color: green"
                    >
                      <span class="iconfont">&#xe61d;</span>
                      {{ card5Data - yesterdayData5 }}
                    </span>
                    <span
                      class="comparetext"
                      v-if="card5Data < yesterdayData5"
                      style="color: rgb(255, 108, 108)"
                      ><span class="iconfont">&#xe61e;</span>
                      {{ yesterdayData5 - card5Data }}</span
                    >
                    <span v-if="card5Data === yesterdayData5">-</span>
                  </div>
                </div>
              </div>
              <div class="iconbox">
                <svg class="icon" aria-hidden="false">
                  <use xlink:href="#icon-caidan"></use>
                </svg>
              </div>
            </div>
          </router-link>

          <router-link to="/table">
            <div class="card">
              <div class="text">
                <span class="card-header">昨日产蛋数</span>
                <div class="card-body">
                  <div>{{ card9Data }}</div>
                  <div class="compare">
                    <span
                      class="comparetext"
                    >
                    </span>
                  </div>
                </div>
              </div>
              <div class="iconbox">
                <svg class="icon" aria-hidden="false">
                  <use xlink:href="#icon-caidan"></use>
                </svg>
              </div>
            </div>
          </router-link>

          <router-link to="/exportcub">
            <div class="card">
              <div class="text">
                <span class="card-header">今日放仔数</span>
                <div class="card-body">
                  <div>{{ card4Data }}</div>
                  <div class="compare">
                    <span
                      class="comparetext"
                      v-if="card4Data > yesterdayData4"
                      style="color: green"
                    >
                      <span class="iconfont">&#xe61d;</span>
                      {{ card4Data - yesterdayData4 }}
                    </span>
                    <span
                      class="comparetext"
                      v-if="card4Data < yesterdayData4"
                      style="color: rgb(255, 108, 108)"
                      ><span class="iconfont">&#xe61e;</span>
                      {{ yesterdayData4 - card4Data }}</span
                    >
                    <span v-if="card4Data === yesterdayData4">-</span>
                  </div>
                </div>
              </div>
              <div class="iconbox">
                <!-- <img src="../assets/img/img_icon/图片3.png" alt=""> -->
                <svg class="icon" style="color: black" aria-hidden="true">
                  <use xlink:href="#icon-dove"></use>
                </svg>
              </div>
            </div>
          </router-link>

          <router-link to="/exportcub">
            <div class="card">
              <div class="text">
                <span class="card-header">昨日放仔数</span>
                <div class="card-body">
                  <div>{{ yesterdayData4 }}</div>
                </div>
              </div>
              <div class="iconbox">
                <!-- <img src="../assets/img/img_icon/图片3.png" alt=""> -->
                <svg class="icon" style="color: black" aria-hidden="true">
                  <use xlink:href="#icon-dove"></use>
                </svg>
              </div>
            </div>
          </router-link>

          <!-- <router-link to="/exportcub">
            <div class="card">
              <div class="text">
                <span class="card-header">今日留窝数</span>

                <div class="card-body">
                  <div>{{ card6Data }}</div>
                  <div class="compare">
                    <span
                      class="comparetext"
                      v-if="card6Data > yesterdayData6"
                      style="color: green"
                    >
                      <span class="iconfont">&#xe61d;</span>
                      {{ card6Data - yesterdayData6 }}
                    </span>
                    <span
                      class="comparetext"
                      v-if="card6Data < yesterdayData6"
                      style="color: rgb(255, 108, 108)"
                      ><span class="iconfont">&#xe61e;</span>
                      {{ yesterdayData6 - card6Data }}</span
                    >
                    <span v-if="card6Data === yesterdayData6">-</span>
                  </div>
                </div>
              </div>
              <div class="iconbox">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-niaochao1"></use>
                </svg>
              </div>
            </div>
          </router-link> -->

          <router-link to="/exportdeath">
            <div class="card">
              <div class="card">
                <div class="text">
                  <span class="card-header">今日死亡数</span>

                  <div class="card-body">
                    <div>{{ card1Data }}</div>
                    <div class="compare">
                      <span
                        class="comparetext"
                        v-if="card1Data > yesterdayData1"
                        style="color: green"
                      >
                        <span class="iconfont">&#xe61d;</span>
                        {{ card1Data - yesterdayData1 }}
                      </span>
                      <span
                        class="comparetext"
                        v-if="card1Data < yesterdayData1"
                        style="color: rgb(255, 108, 108)"
                        ><span class="iconfont">&#xe61e;</span>
                        {{ yesterdayData1 - card1Data }}</span
                      >
                      <span v-if="card1Data === yesterdayData1">-</span>
                    </div>
                  </div>
                </div>
                <div class="iconbox">
                  <!-- <img src="../assets/img/img_icon/图片3.png" alt=""> -->
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-siwangdengji"></use>
                  </svg>
                </div>
              </div>
            </div>
          </router-link>

          <div class="card">
            <div class="card">
              <div class="text">
                <span class="card-header">种鸽总数</span>

                <div class="card-body">
                  <div>{{ card3Data }}</div>
                  <div class="compare"></div>
                </div>
              </div>
              <div class="iconbox">
                <!-- <img src="../assets/img/img_icon/图片3.png" alt=""> -->
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-dove"></use>
                </svg>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card">
              <div class="text">
                <span class="card-header">雏鸽总数</span>

                <div class="card-body">
                  <div>{{ card8Data }}</div>
                  <div class="compare"></div>
                </div>
              </div>
              <div class="iconbox">
                <!-- <img src="../assets/img/img_icon/图片3.png" alt=""> -->
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-dove"></use>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- div1:不能正常跳转  -->
      <div class="chart-container">
        <div class="chart2">
          <div class="sel0">
            <el-select v-model="pieChartss" @change="fetchpie(pieChartss)">
              <el-option value="pie1Chart" label="异常种类占比" selected
                >异常种类占比</el-option
              >
              <el-option value="pie2Chart" label="抽蛋留窝占比"
                >抽蛋留窝占比</el-option
              >
            </el-select>
          </div>
          <div :ref="pieChartss" class="schart2"></div>
          <!-- <div ref="pie2Chart" class="schart3"></div> -->
        </div>
        <div class="weatherchart">
          <h1>梅州市梅江区最近七天天气</h1>
          <!-- <div v-if="weatherData">
						<p>{{ weatherData.tempMax }}</p>
						<p>{{ weatherData.tempMin }}</p>
						<p>{{ weatherData.textDay }}</p>
						<p>{{ weatherData.textNight }}</p>
					</div>
					<div v-else>天气数据正在加载中</div> -->
          <!-- <p>当天最高气温：23</p>
						<p>当天最低气温：13</p>
						<p>日间天气：多云</p>
						<p>夜间天气：多云</p> -->
          <!-- <el-table :data="weatherData" border class="table" header-cell-class-name="table-header">
						<el-table-column prop="fxDate" label="日期" width="105">
						</el-table-column>
						<el-table-column prop="tempMax" label="最高气温" width="85">
						</el-table-column>
						<el-table-column prop="tempMin" label="最低气温" width="85">
						</el-table-column>
						<el-table-column prop="textDay" label="日间天气" width="85">
						</el-table-column>
						<el-table-column prop="textNight" label="夜间天气" width="85">
						</el-table-column>
					</el-table> -->
          <div class="Weatherchart-container">
            <div id="Weatherchart" style="width: 100%; height: 300px"></div>
          </div>
        </div>

        <div class="chart1">
          <div class="map">
            <div class="title1">
              <span>
                {{ map_title }}
              </span>
            </div>
            <div class="selbox"></div>
            <div class="schart-box1">
              <div ref="line_chart" class="schart1"></div>
            </div>
          </div>
          <div class="sel1">
            <el-select
              v-model="site_sid"
              @change="fetchlineData(site_sid, akaDays, mapChoice)"
            >
              <el-option value="1" label="一号仓库" selected
                >一号仓库</el-option
              >
              <el-option value="2" label="二号仓库">二号仓库</el-option>
              <el-option value="3" label="三号仓库">二号仓库</el-option>
            </el-select>
          </div>
          <div class="sel2">
            <el-select
              v-model="akaDays"
              @change="fetchlineData(site_sid, akaDays, mapChoice)"
            >
              <el-option value="7" label="最近七天" selected
                >最近七天</el-option
              >
              <el-option value="30" label="最近三十天">最近三十天</el-option>
              <el-option value="180" label="最近半年">最近半年</el-option>
              <el-option value="365" label="最近半年">最近一年</el-option>
            </el-select>
          </div>
          <div class="sel3">
            <el-select
              v-model="mapChoice"
              @change="fetchlineData(site_sid, akaDays, mapChoice)"
            >
              <el-option value="2" label="产蛋趋势图" selected
                >产蛋趋势图</el-option
              >
              <el-option value="1" label="死亡趋势图">死亡趋势图</el-option>
            </el-select>
          </div>

          <!-- <div class="choosemap">
					
						

					</div> -->
        </div>
        <!-- <el-option value="3" label="放仔趋势图">放仔趋势图</el-option> -->

        <!-- <div class="chart4"></div> -->
      </div>
      <!-- div2:能正常跳转 -->
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Schart from "vue-schart"; // 确认组件名称是否正确
import dayjs from "dayjs"; // 引入 dayjs
import service from "../utils/request"; // 确认 service 的引入路径
import * as echarts from "echarts";
import axios from "axios";
export default {
  name: "Dashboard",
  components: {
    Schart,
  },
  data() {
    return {
      weatherData: "",
      map_title: "折线图",
      // card10Data: "-",
      card9Data: "0",
      card5Data: "0",
      card6Data: "0",
      card7Data: "0",
      card8Data: "0",
      card1Data: "0",
      card2Data: "0",
      card3Data: "0",
      card4Data: "0",
      akaDays: "7",
      todaydata: "",
      yesterdayData5: "0",
      yesterdayData4: "0",
      mapChoice: "2",
      site_sid: "1",
      page: "1",
      pageSize: "1",
      pieChartss: "pie1Chart",
      pieData:[
        'pie1data',
        'pie2data'
      ],
      weatherData: [],
      siteIdList: [
        {
          label: "一号仓库",
          value: "1",
        },
        {
          label: "二号仓库",
          value: "2",
        },
        {
          label: "三号仓库",
          value: "3",
        },
      ],
      line_options: {
        labels: [], // 添加labels属性
        series: [
          {
            name: "总死亡数",
            type: "line",
            data: [], // 添加data属性
          },
          {
            name: "当天死亡数",
            type: "bar",
            yAxisIndex: 1,
            data: [], // 添加data属性
          },
          {
            name: "总产蛋数",
            type: "line",
            data: [], // 添加data属性
          },
          {
            name: "当天产蛋数",
            type: "bar",
            yAxisIndex: 1,
            data: [], // 添加data属性
          },
        ],
      },
    };
  },
  // 加载动画

  mounted() {
    this.refreshData();

    this.todaydata = this.getNowFormatDate();
    this.getWeatherData();
  },
  created() {
    // let ws = new webs({ url: 'ws://192.168.1.105:8080/sys/cage/cubNumberSum' });
    // ws.connect()
    // const socket = new WebSocket('ws://192.168.1.105:8080/sys/cage/cubNumberSum',)
    // socket.addEventListener('open', event => {
    // 	console.log('WebSocket connected')
    // 	socket.send('Hello from client') // 发送一个测试消息到服务器
    // })
    // socket.addEventListener('message', event => {
    // 	const data = JSON.parse(event.data);
    // 	console.log('Received data:', JSON.stringify(data));
    // 	this.card4Data = data.data;
    // })
    // socket.addEventListener('close', event => {
    // 	console.log('WebSocket disconnected')
    // })
    // this.fetchstayData(this.site_sid);
    // this.fetcheggData(this.site_sid);
  },
  beforeRouteLeave(to, from, next) {
    // 清除定时器
    clearInterval(this.intervalId);
    next();
  },
  methods: {
    getWeatherData() {
      const apiKey = "316607f1c374442aafc240774bb82c8f";
      const city = "116.12,24.32"; // 梅州梅江区所在城市

      const url = `https://devapi.qweather.com/v7/weather/7d?location=${city}&key=${apiKey}`;

      axios
        .get(url)
        .then((response) => {
          this.weatherData = response.data.daily;
          this.renderWeatherChart();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    renderWeatherChart() {
      const dates = [];

      const tempMax = [];
      const tempMin = [];

      const textDay = [];
      const textNight = [];

      this.weatherData.forEach((data) => {
        dates.push(data.fxDate);
        tempMax.push(data.tempMax);
        tempMin.push(data.tempMin);
        textDay.push(data.textDay);
        textNight.push(data.textNight);
      });
      // 使用echarts库创建图表实例
      const chart = echarts.init(document.getElementById("Weatherchart"));

      // 配置图表选项
      const option = {
        legend: {
          data: ["最高气温", "最低气温"],
        },
        label: {
          show: true,
          position: "inside",
          formatter: "{c}", // 显示折线图上的具体数值
        },
        tooltip: {
          trigger: "axis",
          formatter: function (params) {
            const dataIndex = params[0].dataIndex;
            const dayWeather = textDay[dataIndex];
            const nightWeather = textNight[dataIndex];
            return `日期：${dates[dataIndex]}<br/>最高气温：${params[0].value}°C<br/>最低气温：${params[1].value}°C<br/>日间天气：${dayWeather}<br/>夜间天气：${nightWeather}`;
          },
        },
        xAxis: {
          type: "category",
          data: dates,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "最高气温",
            type: "line",
            data: tempMax,
          },
          {
            name: "最低气温",
            type: "line",
            data: tempMin,
          },
        ],
      };

      // 渲染图表
      chart.setOption(option);
    },
    fetchlineData(id, akaDays, mapChoice) {
      let maptext = "";

      if (mapChoice == "1") {
        maptext = "死亡趋势图";

        this.line_options.labels.length = 0; // 清空标签
        this.line_options.series[0].data.length = 0; // 清空总死亡数数据集
        this.line_options.series[1].data.length = 0;

        const page = 1;
        const pageSize = akaDays;
        Promise.all([
          service.get(
            `/sys/count/list?site_id=${id}&page=${page}&pageSize=${pageSize}`
          ),
          // service.get(`/sys/egg/eggTrend?site_id=${id}`),
          // service.get(`/sys/stay/stayTrend?site_id=${id}`),
          // service.get(`/sys/put/putTrend?site_id=${id}`)
        ])
          .then((responses) => {
            const deathdata = responses[0].data.count;
            let z = 0;
            for (let i = 0; i < deathdata.length; i++) {
              const item = deathdata[i]; // 获取当前数据项
              
              const datet = this.formatDate(item.time);
              const deathsum = item.death_sum;
              const daydeath = item.day_death;
              this.line_options.labels.push(datet); // 将日期添加到labels数组中.
              this.line_options.series[0].data.push(deathsum);
              this.line_options.series[1].data.push(daydeath);

              // if (z == deathdata.length) {
              // 	this.line_options.labels.reverse()
              // 	this.line_options.series[0].data.reverse()
              // 	this.line_options.series[1].data.reverse()
              // 	console.log("datareverse" + z)
              // }
              // data.length
              if (z == akaDays - 1 || z == deathdata.length - 1) {
                this.line_options.labels.reverse();
                this.line_options.series[0].data.reverse();
                this.line_options.series[1].data.reverse();
                // console.log(this.line_options.series[0].data)
                // console.log(this.line_options.series[1].data)
                // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
                break;
              }
              z++;
            }
            this.renderChart(mapChoice);
          })
          .catch((error) => {
            console.error(error);
          });
      }
      if (mapChoice == "2") {
        maptext = "产蛋趋势图";
        this.line_options.labels.length = 0; // 清空标签
        this.line_options.series[0].data.length = 0; // 清空总死亡数数据集
        this.line_options.series[1].data.length = 0;
        this.line_options.series[2].data.length = 0; // 清空总死亡数数据集
        this.line_options.series[3].data.length = 0;
        Promise.all([
          // service.get(`/sys/count/list?site_id=${id}`),
          service.get(`/sys/egg/eggTrend?site_id=${id}`),
          // service.get(`/sys/stay/stayTrend?site_id=${id}`),
          // service.get(`/sys/put/putTrend?site_id=${id}`)
        ])
          .then((responses) => {
            const eggdata = responses[0].data.eggsTrend;
            let z = 0;
            for (let i = 0; i < eggdata.length; i++) {
              const item = eggdata[i]; // 获取当前数据项
              const datet = this.formatDate(item.date);
              const eggsum = item.sum;
              const dayegg = item.count;
              this.line_options.labels.push(datet); // 将日期添加到labels数组中.
              this.line_options.series[2].data.push(eggsum);
              this.line_options.series[3].data.push(dayegg);
              // data.length
              if (z == akaDays - 1 || z == eggdata.length - 1) {
                this.line_options.labels.reverse();
                this.line_options.series[2].data.reverse();
                this.line_options.series[3].data.reverse();
                // console.log(this.line_options.labels)
                // console.log(this.line_options.series[2].data)
                // console.log(this.line_options.series[3].data)
                break;
              }
              z++;
            }

            this.renderChart(mapChoice);
          })
          .catch((error) => {
            console.error(error);
          });
      }
      if (mapChoice == "3") {
        maptext = "放仔趋势图";
      }
      let titletextday = "";
      if (akaDays == 180) titletextday = "半年";
      if (akaDays == 365) titletextday = "一年";
      if (akaDays == 7) titletextday = "一周";
      if (akaDays == 30) titletextday = "一个月";

      this.map_title = `${id}号仓库最近${titletextday}${maptext}`;
    },
    renderChart(mapChoice) {
      const chart1 = echarts.init(this.$refs.line_chart);

      if (mapChoice == "1") {
        const options = {
          legend: {
            data: ["总死亡数", "当天死亡数"],
          },
          xAxis: {
            type: "category",
            data: this.line_options.labels,
          },
          yAxis: [
            {
              type: "value",
              name: "总死亡数",
              position: "left",
              axisLabel: {
                formatter: "{value}",
              },
            },
            {
              type: "value",
              name: "当天死亡数",
              position: "right",
              axisLabel: {
                formatter: "{value}",
              },
              max: 300,
            },
          ],
          series: [
            {
              name: "总死亡数",
              type: "line",
              data: this.line_options.series[0].data,
              lineStyle: {
                normal: {
                  color: "skyblue",
                  width: 2,
                  type: "soild",
                },
              },
              yAxisIndex: 0,
              label: {
                show: true,
              },
              grid: {
                top: 180,
                x: 150,
                x2: 140,
                y2: 180,
              },

              areaStyle: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    { offset: 0, color: "rgba(193, 208, 236,0.23)" },
                    { offset: 0.8, color: "rgba(0, 128, 255, 0)" },
                  ],
                },
              },
            },
            {
              name: "当天死亡数",
              type: "bar",
              data: this.line_options.series[1].data,
              label: {
                show: true,
                position: "inside",
                formatter: "{c}", // 显示折线图上的具体数值
              },
              itemStyle: {
                // 设置柱子的样式
                normal: {
                  borderRadius: [10, 10, 0, 0],
                  color: "rgba(51, 103, 151, 1)", // 将柱子颜色设置为蓝色
                },
              },

              yAxisIndex: 1,
            },
          ],
        };

        chart1.setOption(options);
      }

      if (mapChoice == "2") {
        const options = {
          legend: {
            data: ["总产蛋数", "当天产蛋数"],
          },
          xAxis: {
            type: "category",
            data: this.line_options.labels,
          },
          yAxis: [
            {
              type: "value",
              name: "总产蛋数",
              position: "left",
              axisLabel: {
                formatter: "{value}",
              },
            },
            {
              type: "value",
              name: "当天产蛋数",
              position: "right",
              axisLabel: {
                formatter: "{value}",
              },
              max: 300,
            },
          ],
          series: [
            {
              name: "总产蛋数",
              type: "line",
              data: this.line_options.series[2].data,
              lineStyle: {
                normal: {
                  color: "grey",
                  width: 2,
                  type: "dashed",
                },
              },
              yAxisIndex: 0,
              label: {
                show: true,
              },

              areaStyle: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    { offset: 0, color: "rgba(193, 208, 236,0.8)" },
                    { offset: 0.8, color: "rgba(0, 128, 255, 0)" },
                  ],
                },
              },
            },
            {
              name: "当天产蛋数",
              type: "bar",
              data: this.line_options.series[3].data,
              label: {
                show: true,
                position: "inside",
                formatter: "{c}", // 显示折线图上的具体数值
                color: "#000",
              },
              itemStyle: {
                // 设置柱子的样式
                normal: {
                  borderRadius: [10, 10, 0, 0],
                  color: "rgba(142, 176, 195,0.6)", // 将柱子颜色设置为蓝色
                  borderWidth: 1, // 设置边框宽度
                  borderColor: "rgb(50, 65, 87)",
                },
              },

              yAxisIndex: 1,
            },
          ],
        };

        chart1.setOption(options);
      }
    },
    fetchpie(values) {
      if (values == "pie1Chart") {
        this.pieChartss = "pie1Chart";
        this.fetchpie1Data(1);
      }
      if (values == "pie2Chart") {
        this.pieChartss = "pie2Chart";

        this.fetchpie2Data(1);
      }
    },
    fetchpie1Data(id) {
      service
        .get(`/sys/abnormal/typeProportion?site_id=${id}`)
        .then((response) => {
          // 成功获取数据，response.data包含响应主体中的数据。
          const pie1data = response.data;
          this.createPie1Chart(pie1data);
        })
        .catch((error) => {
          // 发生错误时在控制台中输出错误信息。
          console.error(error);
        });
    },
    createPie1Chart(data) {
      // 根据数据创建饼图的series数据
      const seriesData = Object.keys(data).map((key) => ({
        name:
          key === "breakageCount"
            ? "破损"
            : key === "abandonCount"
            ? "弃养"
            : key === "discardCount"
            ? "弃孵"
            : key === "deathCount"
            ? "死亡"
            : key === "spermatozoniaCount"
            ? "光蛋"
            : key === "singleCount"
            ? "单蛋"
            : "",

        value: data[key],
        itemStyle: {
          // 设置每个数据项的颜色
          color:
            key === "breakageCount"
              ? "rgb(196, 103, 94)"
              : key === "abandonCount"
              ? "rgb(238, 193, 187)"
              : key === "discardCount"
              ? "rgb(251, 238, 237)"
              : key === "deathCount"
              ? "rgb(233, 135, 136)"
              : key === "spermatozoniaCount"
              ? "rgb(232, 115, 136)"
              : key === "singleCount"
              ? "#ff6363"
              : "",

          borderWidth: 3, // 设置边框宽度
          borderColor: "#FFFFFF", // 设置边框颜色
        },
      }));

      // 配置饼图的选项
      const pie1options = {
        title: {
          text: "异常种类占比", // 添加表头文本
          left: "center", // 设置标题居中
          top: 20, // 设置标题距离顶部的距离
        },
        legend: {
          // 添加图例组件
          orient: "algin", // 设置图例的布局方向为垂直
          right: 110, // 设置图例距离右侧的距离
          left: 520,
          top: 90, // 设置图例距离顶部的距离
          align: "left", // 设置图例文字在图例项的左边
          textStyle: {
            color: "#333", // 设置图例文字的颜色
            fontSize: 20, // 设置图例文字的字体大小
          },
          formatter: function (name) {
            // 自定义图例项的显示格式
            const value = seriesData.find((item) => item.name === name).value;
            return name + ": " + value;
          },
        },
        series: [
          {
            name: "异常种类占比",
            type: "pie",
            // radius: ['10%', '20%'],
            radius: "60%",
            center: ["40%", "57%"],
            data: seriesData,
            label: {
              // 添加label选项
              show: true, // 显示标签
              position: "outside",
              formatter: "{b},({d}%)", // 标签的格式
              truncate: false, // 不自动隐藏标签内容
            },

            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 4,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };

      // 使用配置项绘制饼图
      const chart = echarts.init(this.$refs.pie1Chart);
      chart.setOption(pie1options);
    },

    fetchpie2Data(id) {
      service
        .get(`/sys/eggAndWhipping/eggAndWhippingSum?site_id=${id}`)
        .then((response) => {
          // 成功获取数据，response.data包含响应主体中的数据。
          const pie2data = response.data;
          this.createPie2Chart(pie2data);
        })
        .catch((error) => {
          // 发生错误时在控制台中输出错误信息。
          console.error(error);
        });
    },
    createPie2Chart(data) {
      // 根据数据创建饼图的series数据
      const seriesData = Object.keys(data).map((key) => ({
        name:
          key === "whippingCount" ? "抽蛋" : key === "stayCount" ? "留窝" : "",
        value: data[key],
        itemStyle: {
          // 设置每个数据项的颜色
          color:
            key === "whippingCount"
              ? "rgb(196, 103, 94)"
              : key === "stayCount"
              ? "rgb(238, 193, 187)"
              : "",

          borderWidth: 3, // 设置边框宽度
          borderColor: "#FFFFFF", // 设置边框颜色
        },
      }));

      // 配置饼图的选项
      const pie2options = {
        title: {
          text: "抽蛋留窝占比", // 添加表头文本
          left: "center", // 设置标题居中
          top: 20, // 设置标题距离顶部的距离
        },
        legend: {
          // 添加图例组件
          orient: "algin", // 设置图例的布局方向为垂直
          right: 110, // 设置图例距离右侧的距离
          left: 520,
          top: 90, // 设置图例距离顶部的距离
          align: "left", // 设置图例文字在图例项的左边
          textStyle: {
            color: "#333", // 设置图例文字的颜色
            fontSize: 20, // 设置图例文字的字体大小
          },
          formatter: function (name) {
            // 自定义图例项的显示格式
            const value = seriesData.find((item) => item.name === name).value;
            return name + ": " + value;
          },
        },
        // legend: {
        // 	orient: 'vertical',
        // 	top: 40,
        // 	left: 10,
        // 	data: seriesData.map(item => item.name) // 使用seriesData中的name作为legend的data
        // },
        series: [
          {
            name: "抽蛋种类占比",
            type: "pie",
            radius: "60%",
            center: ["40%", "57%"],
            data: seriesData,
            label: {
              position: "outside",
              trigger: "item",
              formatter: "{b}: {c}\n({d}%)",
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };

      // 使用配置项绘制饼图
      const chart = echarts.init(this.$refs.pie2Chart);
      chart.setOption(pie2options);
    },
    formatDate(date) {
      let datePart = date.split("T")[0];
      return datePart;
      // return dayjs(date).format('YYYY-MM-DD');
    },

    getNowFormatDate() {
      let date = new Date(),
        year = date.getFullYear(), //获取完整的年份(4位)
        month = date.getMonth() + 1, //获取当前月份(0-11,0代表1月)
        strDate = date.getDate(); // 获取当前日(1-31)
      if (month < 10) month = `0${month}`; // 如果月份是个位数，在前面补0
      if (strDate < 10) strDate = `0${strDate}`; // 如果日是个位数，在前面补0

      return `${year}-${month}-${strDate}`;
    },

    //当天死亡数
    fetchtodaydeathSum(id) {
      service
        .get(`/sys/count/list?site_id=${id}&page=1&pageSize=1`)
        .then((response) => {
          const data = response.data.count;
          this.card1Data = data[0].day_death;
          console.log("this.card1Data" + this.card1Data);
          console.log('!',data[1].day_death)
          this.yesterdayData1 = data[1].day_death;
          // console.log(this.formatDate(data[0].time))
          // console.log(this.todaydata, "lpjjjjjj")

          // if (this.todaydata !== this.formatDate(data[0].time)) {
          // 	this.card1Data = '-'
          // }
        })
        .catch((error) => {
          console.error(error);
        });
    },

    // 死亡总数
    fetchdeathSum() {
      service
        .get("/sys/count/deathSum")
        .then((response) => {
          const death_sum = response.data.deathSum;
          this.card2Data = death_sum;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // 种鸽个数
    fetcholdSum() {
      service
        .get("/sys/cage/numberSum")
        .then((response) => {
          let number_sum = response.data.numberSum;
          console.log("numberSum-----------------------------", number_sum);
          this.card3Data = number_sum;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    // 放仔次数卡片
    fetchyoungSum(id) {
      service
        .get(`/sys/put/putTrend?site_id=${id}`)
        .then((response) => {
          console.log('@@@!!!@', response.data.putsTrend);

          const putdata = response.data.putsTrend[0].count;
          this.card4Data = putdata;
          const putdatayester = response.data.putsTrend[1].count;
          this.yesterdayData4 = putdatayester;

          // this.card10Data = this.yesterdayData4;

          if (
            this.todaydata !== this.formatDate(response.data.putsTrend[0].date)
          )
            this.card4Data = "0";
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // 雏鸽个数				this.card8Data = cubSum;
    fetchyoungSums() {
      service
        .get("/sys/cage/cubNumberSum")
        .then((response) => {
          const cubsums = response.data.cubNumberSum;
          this.card8Data = cubsums;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    fetcheggData(id) {
      service
        .get(`/sys/egg/eggTrend?site_id=${id}`)
        .then((response) => {
          
          const eggdata = response.data.eggsTrend[0].count;
          this.card5Data = eggdata;
          
          // console.log('@@@',this.card5Data)
          const eggdatayester = response.data.eggsTrend[1].count;
          this.card9Data = eggdatayester
          this.yesterdayData5 = eggdatayester;
          if (
            this.todaydata !== this.formatDate(response.data.eggsTrend[0].date)
          )
            this.card5Data = "0";
        })
        .catch((error) => {
          console.error(error);
        });
    },
    fetchstayData(id) {
      service
        .get(`/sys/stay/stayTrend?site_id=${id}`)
        .then((response) => {
          const staydata = response.data.staysTrend[0].count;
          console.log("!!!!!!!!!", response.data);
          const staydatayester = response.data.staysTrend[1].count;
          this.card6Data = staydata;
          this.yesterdayData6 = staydatayester;

          if (
            this.todaydata !== this.formatDate(response.data.staysTrend[0].date)
          )
            this.card6Data = "0";
        })
        .catch((error) => {
          console.error(error);
        });
    },

    refreshData() {
      this.fetchlineData(this.site_sid, this.akaDays, this.mapChoice);
      this.fetchtodaydeathSum(this.site_sid);
      this.fetchdeathSum();
      this.fetcholdSum();
      this.fetchyoungSums();
      this.fetchyoungSum(this.site_sid);
      this.fetchstayData(this.site_sid);
      this.fetcheggData(this.site_sid);
      this.fetchpie1Data();
      this.fetchpie2Data();
      this.fetchtodaydeathSum();
      this.createPie1Chart(this.pieData);
    },
  },
};
</script>
<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  padding: 11px;
  background-color: rgb(50, 65, 87);
  border-radius: 12px;
  padding-bottom: 40px;
}

.background-icon {
  -webkit-clip-path: circle(75.7% at 70% 95%);
  clip-path: circle(75.7% at 70% 95%);
  position: absolute;
  top: 100px;
  background-color: rgb(167, 197, 183);
  height: 1000px;
  width: 1000px;
  animation: cirrun 6s infinite;
}

@keyframes cirrun {
  0% {
    -webkit-clip-path: circle(28.4% at 55% 50%);
    clip-path: circle(28.4% at 55% 50%);
  }

  10% {
    -webkit-clip-path: circle(28.4% at 70% 72%);
    clip-path: circle(28.4% at 70% 72%);
  }

  20% {
    -webkit-clip-path: circle(28.4% at 24% 46%);
    clip-path: circle(28.4% at 24% 46%);
  }

  40% {
    -webkit-clip-path: circle(28.4% at 82% 16%);
    clip-path: circle(28.4% at 82% 16%);
  }

  60% {
    -webkit-clip-path: circle(28.4% at 91% 63%);
    clip-path: circle(28.4% at 91% 63%);
  }

  79% {
    -webkit-clip-path: circle(28.4% at 5% 79%);
    clip-path: circle(28.4% at 5% 79%);
  }

  98% {
    -webkit-clip-path: circle(28.4% at 39% 14%);
    clip-path: circle(28.4% at 39% 14%);
  }

  100% {
    -webkit-clip-path: circle(28.4% at 55% 50%);
    clip-path: circle(28.4% at 55% 50%);
  }
}

.glass {
  padding-top: 20px;
  display: flex;
  width: 100%;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  background: rgba(194, 234, 255, 0.3);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding-bottom: 30px;
}

.card-container {
  display: flex;
  justify-content: center;
  width: 1255px;
  /* background-color: white; */
  border-radius: 8px;

  margin-bottom: 20px;
}

.card-container1 {
  height: 220px;
  width: 280px;
  /* background-color: white; */
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: auto;
  border-radius: 20px;
}

.card-container2 {
  display: flex;
  /* flex-wrap: nowrap; */
  flex-wrap: wrap;

  align-items: center;
  gap: 11px;
  /* width: 1200px; */
  justify-content: center;
  width: 100%;
  /* margin-top: 0px; */
}

.card {
  /* width: 300px; */
  height: 100px;
  display: flex;
  width: 200px;
  /* flex-direction: column;*/
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 10px 12px 2px rgba(4, 39, 66, 0.748);
  /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15); */
  cursor: pointer;
  transition: 0.5s;
}

.iconbox {
  height: 120px;
  width: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  position: relative;
}

.icon {
  height: 70px;
  width: 70px;
  border-radius: 10px;
  position: relative;
  /* background-color: rgba(255, 137, 40, 0.877); */
}

.iconbox::before {
  content: "";
  position: absolute;
  height: 100%;
  top: 0px;
  right: -25px;
  width: 100px;
  transition: all 0.7s;
  -webkit-clip-path: polygon(0 0, 60% 0, 100% 100%, 20% 100%);
  clip-path: polygon(0 0, 60% 0, 100% 100%, 30% 100%);
  border-radius: 10px;

  background-color: rgb(255, 168, 7);
  mix-blend-mode: darken;
}

.card:hover .iconbox::before {
  height: 100%;
  background-color: rgb(255, 221, 72);
}

.sel0 {
  top: 20px;
  left: 20px;
  width: 180px;
  position: absolute;
  z-index: 20000;
}

.text {
  padding-top: 2px;
  position: relative;
  height: 100px;
  width: 200px;
  padding-left: 20px;
  /* display: flex;
	/* flex-direction: column; */
  /*flex-wrap:nowrap ;
	overflow: hidden; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  /* transition:  10s; */
  /* transition: transform 0.5s; 添加过渡效果 */
  /* 添加过渡效果 */
}

.card-header {
  /* position: relative; */
  font-size: 16px;
  font-weight: bold;
  position: absolute;
  bottom: 70px;
  transition: 0.5s;
  z-index: 100;
}

/* .card-header::before {
	content: '';
	height: 400px;
	left: 0px;
	top: -10px;
	width: calc(240px);
	position: absolute;
	background-color: rgba(39, 39, 39, 0.329);
	-webkit-clip-path: polygon(0 0, 100% 11%, 100% 0);
	clip-path: polygon(0 0, 100% 11%, 100% 0);
} */

.card-header::after {
  content: "";
  position: absolute;
  height: 100%;
  left: -10px;
  width: calc(10%);
  transition: all 0.7s;
  background-color: rgba(255, 99, 99, 0.603);
  border-radius: 10px;
  mix-blend-mode: multiply;

  /* 设置混合模式为multiply */
}

.card:hover .card-header::after {
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.392);
  width: calc(120% + 4px);
}

.compare {
  top: 23px;
  font-size: 20px;
  display: flex;
  flex-wrap: nowrap;
  width: 0px;
}

.comparetext {
  font-size: 20px;
}

.iconfont {
  font-size: 30px;
  margin-top: 20px;
}

.card:nth-child(1) {
}

.card:nth-child(2) {
}

.card:nth-child(3) {
}

.card:nth-child(4) {
}

.card-body {
  display: flex;
  position: relative;
  top: 8px;
  font-weight: bold;
  transition: 0.5s;
  padding-top: 20px;
  font-size: 40px;
  /* 添加过渡效果 */
}

/* .card-body::before {
	content: '';
	position: absolute;
	bottom: -18px;
	left: -2px;
	width: calc(10% + 10px);
	transition: all 0.7s;
	border-top: 30px rgb(119, 189, 175) solid;
}

.card:hover .card-body::before {
	width: calc(100% + 1px);

} */

.chart-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.chart1 {
  width: 1257px;
  height: 400px;
  /* margin-right: 35px; */
  background-color: #fff;
  border-radius: 8px;
  /* position: relative; */
  box-shadow: 10px 12px 2px rgba(4, 39, 66, 0.748);
  /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15); */
  display: flex;
  align-items: center;
  transition: 0.5s;
  position: relative;
}

.title1 {
  margin-top: 12px;
  font-size: 20px;
  font-weight: 400;
}

.map {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sel1 {
  position: absolute;
  width: 100px;
  top: 10px;
  left: 10px;
}

.sel2 {
  position: absolute;
  width: 120px;
  top: 10px;
  left: 140px;
}

.sel3 {
  position: absolute;
  width: 180px;
  top: 10px;
  left: 270px;
}

.selbox {
  display: flex;
  flex-direction: row;
  gap: 10px;
  position: relative;
  left: 0px;
}

.choosemap {
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  /* background-color: grey; */
  width: 30%;
  border-radius: 10px;
  /* background-color: #94dfe1; */
  height: 100%;
}

.choosemap::before {
  content: "";
  position: absolute;
  height: 20px;
  width: 20px;
  top: 0px;
  left: 0px;
  border-radius: 10px;
  height: 80%;
  border-left: 3px solid black;
  background-color: #94dfe1;
}

.sel {
  margin-top: 10px;
}

.schart-box1 {
  margin-top: 10px;
  width: 90%;
  padding: 20px;
  /* background-color: aqua; */
  height: 70%;
}

.schart1 {
  background-color: #fff;
  height: 100%;
}

.chart2 {
  position: relative;
  display: flex;
  /* flex-direction: column; */
  width: 730px;
  /* 27 */
  /* margin-right: 27px; */
  height: 320px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 10px 12px 2px rgba(4, 39, 66, 0.748);
}

.schart2 {
  background-color: #fff;
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
}

.weatherchart {
  background-color: #fff;
  height: 320px;
  width: 500px;
  border-radius: 8px;
  box-shadow: 10px 12px 2px rgba(4, 39, 66, 0.748);
}

.Weatherchart-container {
  height: 100px;
  width: 100%;
}

.weatherchart h1 {
  font-size: 30px;
  text-align: center;
}

.weathers {
  padding-left: 20px;
  padding-right: 20px;
}

.table {
  padding-left: 30px;
  padding-right: 40px;
  height: 80%;
}

.weathers p {
  font-size: 20px;
}

.chart3 {
  margin-top: 20px;
  width: 320px;
  height: 300px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.chart1:hover {
  box-shadow: 10px 12px 12px rgba(4, 39, 66, 0.748);
}

.chart2:hover {
  box-shadow: 10px 12px 2px rgba(4, 39, 66, 0.748);
}

.chart3:hover {
  box-shadow: 10px 12px 2px rgba(4, 39, 66, 0.748);
}

.card-container1:hover {
}

.card:hover {
  box-shadow: 10px 12px 12px rgba(4, 39, 66, 0.748);
}

.schart3 {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
}

a {
  all: unset;
}

.wave {
  position: absolute;
  width: 1300px;
  height: 1000px;
  --c: #94dfe1;
  --w1: radial-gradient(100% 57% at top, #0000 100%, var(--c) 100.5%) no-repeat;
  --w2: radial-gradient(100% 57% at bottom, var(--c) 100%, #0000 100.5%)
    no-repeat;
  background: var(--w1), var(--w2), var(--w1), var(--w2);
  background-position-x: -200%, -100%, 0%, 100%;
  background-position-y: 100%;
  background-size: 50.5% 100%;
  animation: m 3s infinite linear;
}

@keyframes m {
  0% {
    background-position-x: -200%, -100%, 0%, 100%;
  }

  100% {
    background-position-x: 0%, 100%, 200%, 300%;
  }
}
</style>
