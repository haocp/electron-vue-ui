<template>
    <div class="global-view-admin">
        <dv-full-screen-container style="background-color:rgb(0, 20, 45);">
            <dv-border-box-1>
                <el-container class="header-admin" style="height: 100%;width: 100%">
                    <el-header>
                        <el-row style="padding:30px" :gutter="10">
                            <el-col :span="8">
                                <div class="grid-content bg-purple">
                                    <dv-decoration-1 style="width:40%;height:18px;float: right;"/>
                                    <dv-decoration-8 style="height:30px;"/>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="grid-content bg-purple" style="text-align: center">
                                    <div style="font-size: 20px;font-weight: bold;color: white">
                                        <router-link class="sidebar-logo-link" to="/">
                                            <i class="el-icon-house" style="font-size: 20px"></i>
                                        </router-link>
                                        数据信息化全屏展示
                                    </div>
                                    <dv-decoration-5 style="width:100%; height: 30px"/>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="grid-content bg-purple">
                                    <dv-decoration-1 style="width:40%;height:18px;float: left;"/>
                                    <dv-decoration-8 :reverse="true" style="height:30px;"/>
                                </div>
                            </el-col>
                        </el-row>
                    </el-header>
                    <el-main>
                        <div class="view-content-left" style="width: 20%;height: 100%;">
                            <el-row style="height: 28%;">
                                <div class="card">
                                    <div class="container">
                                        <b style="color: white">环状图展示</b>
                                    </div>
                                    <dv-active-ring-chart :config="ringChartConfig"
                                                          style="height:100%;width: 100%;display: block;"/>
                                </div>
                            </el-row>

                            <el-row style="height: 35%;margin-top: 3%">
                                <div class="card">
                                    <div class="container">
                                        <b style="color: white">轮播表展示</b>
                                    </div>
                                    <!-- 轮播表 -->
                                    <dv-scroll-board :config="scrollBoardConfig"
                                                     style="height:92%;width: 100%;display: block;"/>
                                </div>
                            </el-row>

                            <el-row style="height: 34%;margin-top: 3%">
                                <div class="card">
                                    <div class="container">
                                        <b style="color: white">柱状图展示</b>
                                    </div>
                                    <!-- 柱状图 -->
                                    <bar-chart style="height:90%;width: 100%;display: block;"/>
                                </div>
                            </el-row>
                        </div>
                        <div class="view-content-center" style="width: 60%;height: 100%;">
                            <el-row :gutter="10" style="height: 10%;width: 100%">
                                <div class="centerTopCard">
                                    <!-- 进度池 -->
                                    <dv-percent-pond :config="percentPondConfig"
                                                     style="height:90%;width: 100%;display: block"/>
                                </div>
                                <div class="centerTopCard">
                                    <!-- 数字翻牌器 -->
                                    <dv-digital-flop :config="digitalFlopConfig"
                                                     style="height:90%;width: 100%;display: block"/>
                                </div>
                                <div class="centerTopCard">
                                    <!-- 水位图-->
                                    <dv-water-level-pond :config="waterLevelPondConfig" style="height:90%;width: 100%;display: block" />
                                </div>
                            </el-row>

                            <el-row style="height: 90%;">
                                <div class="flylineChartEnhancedCard">
                                    <div class="container">
                                        <b style="color: white">飞线图展示</b>
                                    </div>
                                    <!-- 飞线图 -->
                                    <dv-flyline-chart-enhanced :config="flylineChartEnhancedConfig"
                                                               style="height:95%;width: 100%;display: block"/>
                                </div>
                            </el-row>

                        </div>
                        <!--右侧列-->
                        <div class="view-content-right" style="width: 20%;height: 100%;">
                            <el-row style="height: 28%;">
                                <div class="card">
                                    <div class="container">
                                        <b style="color: white">胶囊柱图展示</b>
                                    </div>
                                    <dv-capsule-chart :config="capsuleChartConfig"
                                                      style="height:95%;width: 100%;"/>
                                </div>
                            </el-row>
                            <el-row style="height: 35%;margin-top: 3%">
                                <div class="card">
                                    <div class="container">
                                        <b style="color: white">折线图展示</b>
                                    </div>
                                    <!-- 折线图 -->
                                    <line-chart :chart-data="lineChartData"
                                                style="height:92%;width: 100%;display: block;"/>
                                    <!--<raddar-chart  style="height:92%;width: 100%;display: block;"/>-->
                                </div>
                            </el-row>
                            <el-row style="height: 34%;margin-top: 3%">
                                <div class="card">
                                    <div class="container">
                                        <b style="color: white">环饼图展示</b>
                                    </div>
                                    <!-- 环饼图 -->
                                    <pie-chart style="height:100%;width: 100%;display: block;"/>
                                </div>
                            </el-row>
                        </div>
                    </el-main>
                </el-container>
            </dv-border-box-1>
        </dv-full-screen-container>
    </div>
</template>
<script>
    import map from './components/img/flylineChart/map.jpg'
    import mapCenterPoint from './components/img/flylineChart/mapCenterPoint.png'
    import LineChart from './components/LineChart'
    import RaddarChart from './components/RaddarChart'
    import PieChart from './components/PieChart'
    import BarChart from './components/BarChart'

    const lineChartData = {
        newVisitis: {
            expectedData: [100, 120, 161, 134, 105, 160, 165],
            actualData: [120, 82, 91, 154, 162, 140, 145]
        },
        messages: {
            expectedData: [200, 192, 120, 144, 160, 130, 140],
            actualData: [180, 160, 151, 106, 145, 150, 130]
        },
        purchases: {
            expectedData: [80, 100, 121, 104, 105, 90, 100],
            actualData: [120, 90, 100, 138, 142, 130, 130]
        },
        shoppings: {
            expectedData: [130, 140, 141, 142, 145, 150, 160],
            actualData: [120, 82, 91, 154, 162, 140, 130]
        }
    };

    export default {
        name: 'GlobalView',
        components: {
            LineChart,
            RaddarChart,
            PieChart,
            BarChart,
        },
        computed: {
            // 滚动区高度
            // (业务需求：手机屏幕高度减去头部标题和底部tabbar的高度，当然这2个高度也是可以动态获取的)
            /*  fullScreenContainerHeight1: function () {
                  return Number(window.innerHeight) + 'px';
              },
              scrollerHeight: function () {
                  return Number(window.innerHeight) * 0.8 + 'px';
              }*/
        },
        mounted() {
            /*var _this = this;
            // 定义窗口大小变更通知事件
            window.onresize = function () {
                // 窗口宽度
                _this.screenWidth = document.documentElement.clientWidth;
                // 窗口高度
                _this.screenHeight = document.documentElement.clientHeight;
            }*/
        },
        watch: {
            // 标签默认高度都在标签style上
            // 监听屏幕宽度变化
            /*'screenWidth': function (val) {
                var oIframe = document.getElementById('dv-full-screen-container');
                oIframe.style.width = (Number(val)) + 'px' // '120'是页面布局调整，可去除
            },
            // 监听屏幕高度变化
            'screenHeight': function (val) {
                var oIframe = document.getElementById('dv-full-screen-container');
                oIframe.style.height = (Number(val)) + 'px'
            },*/

        },
        data() {
            return {
                lineChartData: lineChartData.newVisitis,
                // 环形图
                ringChartConfig: {
                    // 半径大小
                    radius: '58%',
                    activeRadius: '45%',
                    // 环形的粗细
                    lineWidth: 20,
                    data: [
                        {
                            name: '周口',
                            value: 55
                        },
                        {
                            name: '南阳',
                            value: 120
                        },
                        {
                            name: '西峡',
                            value: 78
                        },
                        {
                            name: '驻马店',
                            value: 66
                        },
                        {
                            name: '新乡',
                            value: 80
                        }
                    ],
                    digitalFlopStyle: {
                        fontSize: 20
                    }
                },
                // 轮播表
                scrollBoardConfig: {
                    // 表头背景色
                    headerBGC: '#3F96A5',
                    header: ['列1', '列2', '列3'],
                    headerHeight: 30,
                    data: [
                        ['<span style="color:#37a2da;">行1列1</span>', '行1列2', '行1列3'],
                        ['行2列1', '<span style="color:#32c5e9;">行2列2</span>', '行2列3'],
                        ['行3列1', '行3列2', '行3列3'],
                        ['行4列1', '<span style="color:#ff9d15;">行4列2</span>', '行4列3'],
                        ['行5列1', '行5列2', '行5列3'],
                        ['行6列1', '行6列2', '行6列3'],
                        ['行7列1', '行7列2', '行7列3'],
                        ['行8列1', '行8列2', '行8列3'],
                        ['行9列1', '行9列2', '行9列3'],
                        ['行10列1', '行10列2', '行10列3']
                    ],
                    index: true,
                    // 悬浮暂停轮播
                    hoverPause: false,
                    columnWidth: [50],
                    align: ['center']
                },
                // 飞线图
                flylineChartEnhancedConfig: {
                    points: [
                        {
                            name: '郑州',
                            coordinate: [0.48, 0.35],
                            icon: {
                                src: mapCenterPoint,
                                width: 30,
                                height: 30
                            },
                            halo: {
                                show: true,
                            },
                            text: {
                                color: '#fb7293'
                            }
                        },
                        {
                            name: '新乡',
                            coordinate: [0.52, 0.23]
                        },
                        {
                            name: '焦作',
                            coordinate: [0.43, 0.29]
                        },
                        {
                            name: '开封',
                            coordinate: [0.59, 0.35]
                        },
                        {
                            name: '许昌',
                            coordinate: [0.53, 0.47]
                        },
                        {
                            name: '平顶山',
                            coordinate: [0.45, 0.54]
                        },
                        {
                            name: '洛阳',
                            coordinate: [0.36, 0.38]
                        },
                        {
                            name: '周口',
                            coordinate: [0.62, 0.55]
                        },
                        {
                            name: '漯河',
                            coordinate: [0.56, 0.56]
                        },
                        {
                            name: '南阳',
                            coordinate: [0.37, 0.66]
                        },
                        {
                            name: '信阳',
                            coordinate: [0.55, 0.81]
                        },
                        {
                            name: '驻马店',
                            coordinate: [0.55, 0.67]
                        },
                        {
                            name: '济源',
                            coordinate: [0.37, 0.29]
                        },
                        {
                            name: '三门峡',
                            coordinate: [0.20, 0.36]
                        },
                        {
                            name: '商丘',
                            coordinate: [0.76, 0.41]
                        },
                        {
                            name: '鹤壁',
                            coordinate: [0.59, 0.18]
                        },
                        {
                            name: '濮阳',
                            coordinate: [0.68, 0.17]
                        },
                        {
                            name: '安阳',
                            coordinate: [0.59, 0.10]
                        }
                    ],
                    lines: [
                        {
                            source: '新乡',
                            target: '郑州'
                        },
                        {
                            source: '焦作',
                            target: '郑州'
                        },
                        {
                            source: '开封',
                            target: '郑州'
                        },
                        {
                            source: '许昌',
                            target: '郑州'
                        },
                        {
                            source: '平顶山',
                            target: '郑州'
                        },
                        {
                            source: '洛阳',
                            target: '郑州'
                        },
                        {
                            source: '周口',
                            target: '郑州'
                        },
                        {
                            source: '漯河',
                            target: '郑州'
                        },
                        {
                            source: '南阳',
                            target: '郑州'
                        },
                        {
                            source: '信阳',
                            target: '郑州'
                        },
                        {
                            source: '驻马店',
                            target: '郑州'
                        },
                        {
                            source: '济源',
                            target: '郑州'
                        },
                        {
                            source: '三门峡',
                            target: '郑州'
                        },
                        {
                            source: '商丘',
                            target: '郑州'
                        },
                        {
                            source: '鹤壁',
                            target: '郑州'
                        },
                        {
                            source: '濮阳',
                            target: '郑州'
                        },
                        {
                            source: '安阳',
                            target: '郑州'
                        }
                    ],
                    icon: {
                        show: true,
                        src: mapCenterPoint
                    },
                    text: {
                        show: true,
                    },
                    bgImgSrc: map
                },
                // 胶囊
                capsuleChartConfig: {
                    data: [
                        {
                            name: '南阳',
                            value: 167
                        },
                        {
                            name: '周口',
                            value: 123
                        },
                        {
                            name: '漯河',
                            value: 98
                        },
                        {
                            name: '郑州',
                            value: 75
                        },
                        {
                            name: '西峡',
                            value: 66
                        },
                    ],
                    colors: ['#e062ae', '#fb7293', '#e690d1', '#32c5e9', '#96bfff'],
                    unit: '单位',
                    showValue: true
                },
                // 数字翻牌
                digitalFlopConfig: {
                    number: [123, 456],
                    content: '{nt},{nt}个',
                },
                // 进度池
                percentPondConfig: {
                    value: 66
                },
                // 水位图
                waterLevelPondConfig:{
                    data: [66, 45],
                    shape: 'roundRect'
                }
            }
        },
        mothods: {}
    }
</script>
<style lang="scss" type="text/scss">
    .global-view-admin {
        margin: 0;
        height: 100%;
        width: 100%;
    }

    .view-content-left {
        float: left;
        .el-row {
            position: relative;
        }
        .card {
            box-shadow: 0 4px 8px 0 rgb(32, 185, 186);
            transition: 0.3s;
            width: 100%;
            height: 100%;
            border-radius: 5px;
            .dv-scroll-board {
                .header {
                    border-radius: 3px;
                }
            }
        }

        .card:hover {
            box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
        }
    }

    .view-content-center {
        float: left;
        .el-row {
            position: relative;
        }
        .centerTopCard {
            padding-left: 3%;
            transition: 0.3s;
            width: 30%;
            height: 100%;
            float: left;
        }

        .flylineChartEnhancedCard {
            padding-left: 2%;
            box-shadow: 0 4px 8px 0 #001736;
            transition: 0.3s;
            width: 100%;
            height: 100%;
        }
    }

    .view-content-right {
        float: left;
        .el-row {
            position: relative;
        }
        .card {
            box-shadow: 0 4px 8px 0 rgb(32, 185, 186);
            transition: 0.3s;
            width: 100%;
            height: 100%;
            border-radius: 5px;
            .dv-scroll-board {
                .header {
                    border-radius: 3px;
                }
            }
        }

        .card:hover {
            box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
        }
    }
</style>