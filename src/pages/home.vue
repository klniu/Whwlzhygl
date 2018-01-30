<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>通知公告</span>
      </div>
      <el-table
        :show-header="false"
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="date"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address">
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class="half-row">
      <div slot="header" class="clearfix">
        <span>证件到期</span>
        <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
      </div>
      <el-table
        :show-header="false"
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="date"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address">
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
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="date"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  }
}
</script>
<style scoped>
.half-row{
  width: 50%;
  float: left;
  box-sizing: border-box;
}
</style>
