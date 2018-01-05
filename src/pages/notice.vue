<template>
  <div>
    <div class="tools">
      <el-button size="small" icon="el-icon-circle-plus-outline" type="primary" @click="editClick(0)">添加</el-button>
      <el-button size="small" icon="el-icon-delete" type="danger" @click="delectClick(multipleSelection)">删除</el-button>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
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
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        page: 1,
        tableData: [{
          id: 1,
          name: '主题名字',
          type: '类型1',
          date: '2016-05-03'
        }, {
          id: 2,
          name: '主题名字',
          type: '类型1',
          date: '2016-05-02'
        }, {
          id: 3,
          name: '主题名字',
          type: '类型1',
          date: '2016-05-04'
        }, {
          id: 4,
          name: '主题名字',
          type: '类型1',
          date: '2016-05-01'
        }, {
          id: 5,
          name: '主题名字',
          type: '类型1',
          date: '2016-05-08'
        }, {
          id: 6,
          name: '主题名字',
          type: '类型1',
          date: '2016-05-06'
        }, {
          id: 7,
          name: '主题名字',
          type: '类型1',
          date: '2016-05-07'
        }, {
          id: 8,
          name: '主题名字',
          type: '类型1',
          date: '2016-05-07'
        }, {
          id: 9,
          name: '主题名字',
          type: '类型1',
          date: '2016-05-07'
        }],
        multipleSelection: []
      }
    },

    methods: {
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
        this.$router.push({
          name: 'NoticeEdit',
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