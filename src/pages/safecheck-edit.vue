<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="100px" size="medium">
      <el-form-item label="主题" prop="recordTitle">
        <el-input v-model="formData.recordTitle"></el-input>
      </el-form-item>
      <el-form-item label="检查日期" prop="checkDate">
        <el-date-picker v-model="formData.checkDate" type="datetime" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" :loading="posting">保存</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <h3>安全监督检查记录详情</h3>
    <safe-detail-list :id="id"></safe-detail-list>
  </div>
</template>
<script>
import SafeDetailList from './safedetail'
export default {
  components: {
    SafeDetailList
  },
  data() {
    return {
      id: parseInt(this.$route.query.id),
      formData: {
        companyId: 1,
        checkDate: '',
        recordTitle: '',
        accessoryNames: ''
      },
      picsList: [],
      rules: {},
      posting: false
    }
  },
  mounted() {
    this.id && this.getDetail()
  },
  methods: {
    async getDetail() {
      let {data} = await this.$http({
        url: 'safeCheckRecord/getSafeCheckRecord',
        params: {
          safeCheckRecordId: this.id
        }
      })
      if (data.code == 0) {
        this.formData = data.data
        this.formData.id = this.id
        if (this.formData.accessoryNames) {
          let pics = this.formData.accessoryNames.split(',')
          pics.forEach(i => {
            this.picsList.push({name: i, url: this.$baseURL + i})
          })
        }
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.postForm()
        } else {
          this.$message.error('错了哦，这是一条错误消息')
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async postForm() {
      this.posting = true
      let {data} = await this.$http({
        method: 'post',
        url: 'safeCheckRecord/' + (this.id ? 'updateSafeCheckRecord' : 'addSafeCheckRecord'),
        data: this.formData
      })
      if (data.code == 0) {
        this.$message({
          message: '保存成功！',
          type: 'success'
        })
      } else {
        this.$message.error(data.msg)
      }
      this.posting = false
    }
  }
}
</script>
