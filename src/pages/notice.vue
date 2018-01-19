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
        prop="name"
        label="通知主题">
      </el-table-column>
      <el-table-column
        prop="type"
        label="通知类型">
      </el-table-column>
      <el-table-column
        prop="date"
        label="通知日期">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="editClick(scope.row.id)" type="text" size="small">编辑</el-button>
          <el-button @click="delectClick([scope.row.id])" type="text" size="small">删除</el-button>
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
export default {
  mixins: [listMixin],
  data() {
    return {
      // TODO: 改api地址
      editRoute: 'NoticeEdit',
      apiName: 'customer',
      deleteApi: '/deleteCustomer',
      getListApi: '/getCustomerListByCustomerName'
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
  }
}
</script>