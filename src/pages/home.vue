<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>通知公告</span>
      </div>
      <el-table
        :show-header="false"
        :data="tableData0"
        style="width: 100%">
        <el-table-column
          prop="noticeTitle">
        </el-table-column>
        <el-table-column
          prop="noticeDate">
        </el-table-column>
      </el-table>
    </el-card>
    <div class="ov">
      <el-card class="half-row">
        <div slot="header" class="clearfix">
          <span>证件到期</span>
          <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
        </div>
        <el-table
          :show-header="false"
          :data="tableData1"
          style="width: 100%">
          <el-table-column
            prop="title">
          </el-table-column>
          <el-table-column
            width="280px"
            prop="content">
          </el-table-column>
          <el-table-column
            :formatter="timeformat"
            prop="licenseEndDate">
          </el-table-column>
        </el-table>
      </el-card>
      <el-card class="half-row">
        <div slot="header" class="clearfix">
          <span>电子路单</span>
          <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
        </div>
        <el-table
          :show-header="false"
          :data="tableData2"
          style="width: 100%">
          <el-table-column
            prop="goodsName">
          </el-table-column>
          <el-table-column
            prop="orderNum">
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <el-card class="half-row">
      <div slot="header" class="clearfix">
        <span>违章信息</span>
        <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
      </div>
      <el-table
        :show-header="false"
        :data="tableData3"
        style="width: 100%">
        <el-table-column
          prop="plateNum">
        </el-table-column>
        <el-table-column
          prop="regulationTime">
        </el-table-column>
      </el-table>
    </el-card>
    <div class="half-row">
      <e-charts :options="options1"></e-charts>
    </div>
  </div>
</template>
<script>
import ECharts from 'vue-echarts/components/ECharts.vue'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import timeformat from '@/mixins/timeformat'
export default {
  mixins: [timeformat],
  components: {
    ECharts
  },
  data() {
    return {
      tableData0: [],
      tableData1: [],
      tableData2: [],
      tableData3: [],
      tableData4: [],
      apiList: ['getNotices', 'getLicenseEndDates', 'getOrders', 'getRegulationRecords', 'getCars'],
      options1: {
        title: {
          text: '车辆分布饼状图'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: {
          name:'人数',
          type:'pie',
          radius: ['50%', '70%'],
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          data:[
            {value:50, name:'试用期员工'},
            {value:30, name:'正式员工'}
          ]
        }
      }
    }
  },
  mounted() {
    this.getList(0)
    this.getList(1)
    this.getList(2)
    this.getList(3)
    this.getList(4)
  },
  methods: {
    async getList(index) {
      let {data} = await this.$http({
        url: 'index/' + this.apiList[index],
        params: {
          companyId: 1
        }
      })
      if (data.code == 0) {
        if (index == 4) {
          this.options1.series.data = data.data.map(item => {
            return {
              name: item.type,
              value: item.count
            }
          })
        } else {
          this['tableData'+index] = data.data
        }
      }
    }
  }
}
</script>
<style scoped>
.ov{
  overflow: hidden;
}
.half-row{
  width: 50%;
  float: left;
  box-sizing: border-box;
  min-height: 300px;
  overflow: hidden;
}
</style>
