<template>
  <section>
    <div class="display-flex flex-between-center m-t-24 bg-f6f7f8 p-y-8">
      <div class="bg-3151ff w-4 h-24 border-radius-2" />
      <div class="fw-bold m-l-16">居住人指数</div>
    </div>
    <div id="charts" class="m-t-16" />
    <div class="display-flex flex-between-center m-t-24 bg-f6f7f8 p-y-8">
      <div class="bg-3151ff w-4 h-24 border-radius-2" />
      <div class="fw-bold m-l-16">申报类型</div>
    </div>
    <div id="charts1" class="m-t-24" />
  </section>
</template>

<script>
import { dateFormat } from '@/utils'
export default {
  data () {
    return {
      chart: '',
      chart1: ''
    }
  },

  mounted () {
    this.drawchart()
    window.addEventListener('resize', () => {
      this.setSize()
    })
  },
  methods: {
    // highcharts图表绘制
    async drawchart () {
      const res = await this.$apis.selDeclareStatistics({})
      console.log(res.rows.map(item => Number(item.newCount)))
      const chartData = {
        title: {
          text: ''
        },
        subtitle: {
          text: ''
        },
        xAxis: {
          categories: res.rows.map(item => dateFormat(item.date, 'YYYY-MM-DD'))
        },
        yAxis: {
          min: 0,
          title: ''
        },
        plotOptions: {
          line: {
            borderWidth: 0,
            dataLabels: {
              enabled: true // 设置显示对应y的值
            }
          }
        },
        series: [{
          name: '钉管家',
          data: res.rows.map(item => Number(item.dgjCount))
        }, {
          name: '流口推送',
          data: res.rows.map(item => Number(item.lkCount))

        }],
        credits: {
          enabled: false
        } // 去掉地址
      }
      const chartData1 = {
        title: {
          text: ''
        },
        subtitle: {
          text: ''
        },
        xAxis: {
          categories: res.rows.map(item => dateFormat(item.date, 'YYYY-MM-DD'))
        },
        yAxis: {
          min: 0,
          title: ''
        },
        plotOptions: {
          line: {
            borderWidth: 0,
            dataLabels: {
              enabled: true // 设置显示对应y的值
            }
          }
        },
        series: [{
          name: '居住人自主申报',
          data: res.rows.map(item => Number(item.selfCount))
        }, {
          name: '居住人代申报',
          data: res.rows.map(item => Number(item.otherCount))

        },
        {
          name: '房东代申报',
          data: res.rows.map(item => Number(item.houseOwnCount))

        }],
        credits: {
          enabled: false
        } // 去掉地址
      }
      this.chart = this.$highcharts.chart('charts', chartData)
      this.chart1 = this.$highcharts.chart('charts1', chartData1)
      this.setSize()
    },
    // 重置图表大小
    setSize () {
      this.chart.setSize(window.innerWidth - 296, 400)
      this.chart1.setSize(window.innerWidth - 296, 400)
    }
  }
}
</script>

<style lang="less" scoped>
.align-self-end{
  align-self: flex-end;
}
/deep/.appCountTabs{
  .ant-tabs-bar{
    margin:0;
    font-size: 12px;
  }
  .ant-tabs-tab{
    font-size: 12px;
  }
}
</style>
