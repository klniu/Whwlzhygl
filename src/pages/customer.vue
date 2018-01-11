<template>
  <div>
    <div class="tools">
      <el-button size="small" icon="el-icon-circle-plus-outline" type="primary" @click="editClick(0)">添加</el-button>
      <el-button size="small" icon="el-icon-delete" type="danger" @click="delectClick(multipleSelection)">删除</el-button>
      <el-input v-model="keyword" placeholder="商户名" size="small" class="search-input"></el-input>
      <el-button size="small" icon="el-icon-search" type="primary" @click="getList">搜索</el-button>
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
        prop="customerName"
        label="客户名称">
      </el-table-column>
      <el-table-column
        prop="sendAddress"
        label="收货地址">
      </el-table-column>
      <el-table-column
        prop="receiveAddress"
        label="发货地址">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="editClick(scope.row.customerId)" type="text" size="small">编辑</el-button>
          <el-button @click="delectClick([scope.row.customerId])" type="text" size="small">删除</el-button>
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
export default {
  data() {
    return {
      page: 1,
      pageSize: 10,
      tableData: [],
      multipleSelection: [],
      keyword: ''
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      const loading = this.$loading()
      let {data} = await this.$http({
        url: 'customer/getCustomerListByCustomerName',
        params: {
          companyId: 1,
          currentPage: this.page,
          size: this.pageSize,
          customerName: this.keyword
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
        name: 'CustomerEdit',
        query: {
          id: val
        }
      })
    },
    async delectClick(val) {
      let {data} = await this.$http({
        method: 'post',
        url: 'customer/deleteCustomer',
        data: {
          id: val
        }
      })
      if (data.code == 0) {
        this.$message({
          message: '删除成功！',
          type: 'success'
        })
      } else {
        this.$message.error(data.msg)
      }
    }
  }
}
</script>
<style>
.search-input{
  width: 180px;
  margin-left: 50px;
}
</style>
