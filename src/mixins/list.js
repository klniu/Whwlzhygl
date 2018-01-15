export default {
  data() {
    return {
      page: 1,
      pageSize: 10,
      tableData: [],
      multipleSelection: []
    }
  },
  methods: {
    async getList() {
      const loading = this.$loading()
      let params = {
        companyId: 1,
        currentPage: this.page,
        size: this.pageSize,
        keyword: this.keyword
      }
      Object.assign(params, this.params)
      let {data} = await this.$http({
        url: this.apiName + this.getListApi,
        params: params
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
      this.multipleSelection = val.map(i => {
        return i[this.idField]
      });
    },
    editClick(val) {
      console.log(val)
      this.$router.push({
        name: this.editRoute,
        query: {
          id: val
        }
      })
    },
    async delectClick(val) {
      let {data} = await this.$http({
        method: 'post',
        url: this.apiName + this.deleteApi,
        data: {
          ids: val
        }
      })
      if (data.code == 0) {
        this.$message({
          message: '删除成功！',
          type: 'success'
        })
        this.getList()
      } else {
        this.$message.error(data.msg)
      }
    }
  }
}