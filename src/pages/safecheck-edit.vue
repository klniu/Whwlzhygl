<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="100px" size="medium">
      <el-form-item label="主题" prop="recordTitle">
        <el-input v-model="formData.recordTitle"></el-input>
      </el-form-item>
      <el-form-item label="检查日期" prop="checkDate">
        <el-date-picker v-model="formData.checkDate" type="datetime" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
      </el-form-item>
      <el-form-item label="照片" prop="pic">
        <el-upload
          :action="$baseURL + 'accessory/addAccessory'"
          :file-list="picsList"
          :on-success="handleUpload"
          :on-remove="handleRemove"
          :on-preview="handlePictureCardPreview"
          list-type="picture-card">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" size="tiny">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" :loading="posting">保存</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
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
      posting: false,
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  mounted() {
    this.id && this.getDetail()
  },
  methods: {
    joinPics() {
      let names = this.picsList.map(i => {
        return i.name
      })
      this.formData.accessoryNames = names.join(',')
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleRemove(file, list) {
      this.picsList = list
    },
    handleUpload(res) {
      if (res.code == 0) {
        this.picsList.push({name: res.data.accessoryName, url: this.$baseURL + res.data.accessoryName})
      }
    },
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
          this.joinPics()
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
