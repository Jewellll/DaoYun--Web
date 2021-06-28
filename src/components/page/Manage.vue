<template>
<div class="manage-container" >
    <div class="container">
        <div class="user" style="width: 100%">
            <div ref="gaugeChart" style="width: 400px;display: inline-block; height: 400px; background-color: #ffffff; padding: 20px; border-radius: 5px;"></div>
            <div style="display: inline-block; height: 300px;width: 200px">
                    <el-card :body-style="{ padding: '0px' }">
                        <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
                        <div style="padding: 14px;">
                            <span>朱文龙</span>
                            <div class="bottom clearfix">
                                <p>200327128</p>
                            </div>
                        </div>
                    </el-card>
            </div>
            <div style="display: inline-block; width: 30%">
            <el-carousel :interval="5000" arrow="always" class="car" style="height: 400px">
                <el-carousel-item v-for="(img,index) in imgList" :key="index">
                    <img class="img" v-bind:src="img.url">
                </el-carousel-item>
            </el-carousel>
            </div>
        </div>
    <div class="info">
        <div ref="myChart" style="width: 35%;display: inline-block;box-sizing: border-box; margin-right: 10px; height: 500px; background-color: #ffffff; padding:80px 50px 20px 70px; border-radius: 5px;"></div>
        <div ref="lineChart" style="width: 64.1%;display: inline-block;box-sizing: border-box; height: 500px; background-color: #ffffff;padding: 20px 50px 20px 70px; border-radius: 5px;"></div>



<!--            <el-table :data="tableData" :header-cell-style="{background:'#F5F6FA',color:'#666E92'}"-->
<!--                      :row-style="{height:'25px'}" :cell-style="{padding:'1px'}"-->
<!--                      highlight-current-row class="table" >-->
<!--                <el-table-column prop="name" label="姓名" >-->
<!--                </el-table-column>-->
<!--                <el-table-column prop="card" label="学号">-->
<!--                </el-table-column>-->
<!--            </el-table>-->

    </div>
    </div>
</div>
</template>

<script>

import * as echarts from 'echarts'
export default {
    name: 'Manage',
    mounted () {
        this.myChart = echarts.init(this.$refs.myChart)
        this.myChart.setOption({
            title: {
                text: '32469',
                subtext: '评价数',
                left: 'center',
                top: '43%',
                subtextStyle: {
                    fontSize: 18
                }
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                icon: 'circle',
                top: '0',
                left: 'right'
            },
            series: [
                {
                    name: '咨询数量',
                    type: 'pie',
                    radius: ['40%', '55%'],
                    label: {
                        show: true,
                        padding: [0, -60],
                        overflow: 'none',
                        fontSize: '15',
                        fontWeight: 'bold',
                        formatter: '{d}%\n\n{c}'
                    },
                    labelLine: {
                        show: true,
                        length: 15,
                        length2: 60
                    },
                    itemStyle: {
                        normal: {
                            color: function (params) {
                                var colorList = ['#4FC3F7', '#00C853', '#F57F17']
                                return colorList[params.dataIndex]
                            }
                        }
                    },
                    data: [
                        { name: '好评', value: 1048 },
                        { name: '一般', value: 735 },
                        { name: '差评', value: 180 }
                    ]
                }
            ]
        })
        this.lineChart = echarts.init(this.$refs.lineChart)
        this.lineChart.setOption({
            title: {
                text: '评价数据分析'
            },
            // 提示框
            tooltip: {
                trigger: 'axis'
            },
            // 图例
            legend: {
                icon: 'circle',
                left: 'center',
                top: 0,
                data: ['好评', '一般', '差评']
            },
            grid: {
                left: '3%',
                right: '3%',
                bottom: '3%',
                containLabel: true
            },
            // 工具栏
            toolbox: {
                feature: {
                    saveAsImage: {
                        type: 'png'
                    },
                    magicType: {
                        type: ['line', 'bar', 'stack']
                    }
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '好评',
                    type: 'line',
                    // smooth: true, // 平滑曲线显示
                    data: [120, 132, 101, 134, 190, 230, 210, 201, 234, 290, 230, 210]
                },
                {
                    name: '一般',
                    type: 'line',
                    // smooth: true,
                    data: [100, 82, 91, 54, 90, 76, 110, 81, 104, 90, 130, 110]
                },
                {
                    name: '差评',
                    type: 'line',
                    stack: '总量',
                    // smooth: true,
                    data: [10, 22, 21, 14, 19, 13, 20, 11, 34, 29, 20, 10]
                }
            ]
        })
        this.gaugeChart = echarts.init(this.$refs.gaugeChart)
        this.gaugeChart.setOption({
            series: [
                {
                    name: '评价',
                    type: 'gauge',
                    center: ['50%', '55%'],
                    radius: '75%',
                    min: 0,
                    max: 300,
                    itemStyle: {
                        color: '#4FC3F7',
                        shadowColor: 'rgba(0,138,255,0.45)'
                    },
                    // 进度条
                    progress: {
                        show: true,
                        width: 20,
                        roundCap: true
                    },
                    // 坐标轴线
                    axisLine: {
                        show: true,
                        roundCap: true,
                        lineStyle: {
                            width: 20
                        }
                    },
                    // 仪表盘指针
                    pointer: {
                        show: false
                    },
                    // 刻度标签
                    axisLabel: {
                        show: false
                    },
                    // 刻度
                    axisTick: {
                        show: false
                    },
                    // 分隔线
                    splitLine: {
                        show: false
                    },
                    title: {
                        offsetCenter: [0, '20%'],
                        fontSize: 20
                    },
                    detail: {
                        offsetCenter: [0, '-10%'],
                        valueAnimation: true,
                        textStyle: {
                            fontSize: 30
                        },
                        formatter: '{value}'
                    },
                    data: [
                        { value: 270, name: "好评数" }
                    ]
                }
            ]
        })
    },
    data() {
        return {
            currentDate: new Date(),
            imgList:[
                {url:require('../../assets/img/img1.jpg')},
                {url:require('../../assets/img/img2.jpg')},
                {url:require('../../assets/img/img3.jpg')}
            ],
            tableData: [{
                name: '朱文龙',
                card: '200327128'
            }, {
                name: '陈黎',
                card: '200327011'
            }, {
                name: '杨礼亮',
                card: '200327104'
            }, {
                name: '魏凌',
                card: '200327176'
            }]
        }
    }
}
</script>

<style scoped>
.info{
    width: 100%;
}
.container{
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
    background-color: #2c3e50;
    height: 100%;
    border-radius: 5px;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
}
.img{
    height: 100%;
    width: 100%;
}
/*卡片*/

.bottom {
    margin-top: 13px;
    line-height: 12px;
}

.image {
    width: 100%;
    display: block;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}
.table{
    border: none;
    width: 50%;
    align-content: center;
}
/*.car{*/
/*    width: 500px;*/
/*    height: 50%;*/
/*    margin-left: 460px;*/
/*    border: none;*/
/*}*/
/*.el-carousel__item:nth-child(2n) {*/
/*    background-color: #99a9bf;*/
/*}*/

/*.el-carousel__item:nth-child(2n+1) {*/
/*    background-color: #d3dce6;*/
/*}*/
</style>
