<template>
  <section>
    <div id="charts" class="m-t-16" />
  </section>
</template>

<script>
import { dateFormat } from '@/utils'
export default {
  data () {
    return {
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
      const res = await this.$apis.selHouseOwnerStatistics({})
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
          name: '新增人数',
          data: res.rows.map(item => Number(item.newCount))
        }, {
          name: '活跃人数',
          data: res.rows.map(item => Number(item.loginCount))
        }],
        credits: {
          enabled: false
        } // 去掉地址
      }
      this.chart = this.$highcharts.chart('charts', chartData)
      this.setSize()
    },
    // 重置图表大小
    setSize () {
      this.chart.setSize(window.innerWidth - 296, 400)
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
