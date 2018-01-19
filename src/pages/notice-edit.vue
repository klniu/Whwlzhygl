<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="通知标题" prop="noticeTitle" required>
        <el-input v-model="formData.noticeTitle"></el-input>
      </el-form-item>
      <el-form-item label="通知内容" prop="noticeContent">
        <el-input type="textarea" v-model="formData.noticeContent"></el-input>
      </el-form-item>
      <el-form-item label="通知类型" prop="noticeTypeId">
        <el-select v-model="formData.noticeTypeId" placeholder="请选择类型">
          <el-option v-for="item in typeList" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="通知附件" prop="file">
        <el-input v-model="formData.file"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// TODO: 附件上传
import saveMixin from '@/mixins/saveform'
export default {
  mixins: [saveMixin],
  data() {
    return {
      id: parseInt(this.$route.query.id),
      formData: {
        companyId: 1,
        noticeContent: '',
        noticeTitle: '',
        noticeTypeId: 1
      },
      rules: {},
      apiName: 'notice/',
      addApi: 'addNotice',
      updateApi: 'updateNotice',
      typeList: []
    }
  },
  mounted() {
    this.id && this.getDetail()
    this.getTypeList()
  },
  methods: {
    async getTypeList() {
      let {data} = await this.$http({
        url: 'noticeType/getNoticeTypeList'
      })
      if (data.code == 0) {
        this.typeList = data.data.list
      }
    },
    async getDetail() {
      let {data} = await this.$http({
        url: 'notice/getNotice',
        params: {
          noticeId: this.id
        }
      })
      if (data.code == 0) {
        this.formData = data.data
        this.formData.id = this.id
      }
    }
  }
}
</script>
