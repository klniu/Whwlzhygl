<template>
  <div>
    <div class="tools">
      <el-button size="small" icon="el-icon-circle-plus-outline" type="primary" @click="editClick(0)">添加</el-button>
      <el-button size="small" icon="el-icon-delete" type="danger" @click="delectClick(multipleSelection)">删除</el-button>
      <el-input v-model="keyword" placeholder="姓名" size="small" clearable class="search-input" @keyup.13.native="getList"></el-input>
      <el-button size="small" icon="el-icon-search" type="primary" @click="getList">搜索</el-button>
      <el-select size="small" v-model="params.typeId" placeholder="选择类型搜索" @change="getList" clearable>
        <el-option
          v-for="item in typeList"
          :key="item.id"
          :label="item.typeName"
          :value="item.id">
        </el-option>
      </el-select>
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
        prop="personName"
        label="名字">
      </el-table-column>
      <el-table-column
        prop="typeName"
        label="角色">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="联系号码">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="editClick(scope.row.personId)" type="text" size="small">编辑</el-button>
          <el-button @click="delectClick([scope.row.personId])" type="text" size="small">删除</el-button>
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
      keyword: '',
      idField: 'personId',
      editRoute: 'PersonEdit',
      apiName: 'person',
      deleteApi: '/deletePerson',
      getListApi: '/getPersonListByPersonName',
      params: {
        typeId: ''
      },
      typeList: []
    }
  },
  mounted() {
    this.getList()
    this.getTypeList()
  },
  methods: {
    async getTypeList() {
      let {data} = await this.$http('personType/getPersonTypeList')
      if (data.code == 0) {
        this.typeList = data.data.list
      }
    }
  }
}
</script>