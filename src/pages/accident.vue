<template>
  <div>
    <div class="tools">
      <el-button size="small" icon="el-icon-circle-plus-outline" type="primary" @click="editClick(0)">添加</el-button>
      <el-button size="small" icon="el-icon-delete" type="danger" @click="delectClick(multipleSelection)">删除</el-button>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData.list"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection">
      </el-table-column>
      <el-table-column
        prop="plateNum"
        label="车牌号">
      </el-table-column>
      <el-table-column
        prop="occurredTime"
        :formatter="timeformat"
        label="发生时间">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="editClick(scope.row.accidentId)" type="text" size="small">编辑</el-button>
          <el-button @click="delectClick([scope.row.accidentId])" type="text" size="small">删除</el-button>
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
import timeformat from '@/mixins/timeformat'
export default {
  mixins: [timeformat],
  data() {
    return {
      page: 1,
      pageSize: 10,
      tableData: [],
      multipleSelection: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      const loading = this.$loading()
      let {data} = await this.$http({
        url: 'accident/getAccidentList',
        params: {
          companyId: 1,
          currentPage: this.page,
          size: this.pageSize
        }
      })
      if (data.code == 0) {
        this.tableData = data.data
      }
      loading.close()
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    editClick(val) {
      console.log(val)
      this.$router.push({
        name: 'AccidentEdit',
        query: {
          id: val
        }
      })
    },
    delectClick(val) {
      this.$message({
        message: '删除成功！',
        type: 'success'
      })
    }
  }
}
</script>