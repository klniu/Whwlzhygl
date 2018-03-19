<template>
  <div>
    <div class="tools">
      <el-button size="small" icon="el-icon-circle-plus-outline" type="primary" @click="editClick(0)">添加</el-button>
      <el-button size="small" icon="el-icon-delete" type="danger" @click="delectClick(multipleSelection)">删除</el-button>
    </div>
    <el-table
      v-loading="loading"
      ref="multipleTable"
      :data="tableData.list"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection">
      </el-table-column>
      <el-table-column
        prop="carPlateNum"
        label="车牌">
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="editClick(scope.row.carId)" type="text" size="small">编辑</el-button>
          <el-button @click="delectClick([scope.row.carId])" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="height: 20px"></div>
    <el-pagination
      @size-change="handleSizeChange"
      :current-page="page"
      :page-sizes="[10, 25, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.total">
    </el-pagination>
  </div>
</template>
<script>
import listMixin from '@/mixins/list'
import CarEdit from './car-edit'
export default {
  mixins: [listMixin],
  components: {
    CarEdit
  },
  data() {
    return {
      keyword: '',
      idField: 'carId',
      editRoute: 'CarEdit',
      apiName: 'car',
      deleteApi: '/deleteCar',
      getListApi: '/getCarList'
    }
  },
  mounted() {
    this.getList()
  }
}
</script>
