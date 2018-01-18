<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="160px" size="medium">
      <el-form-item label="检查内容" prop="checkContent">
        <el-input v-model="formData.checkContent"></el-input>
      </el-form-item>
      <el-form-item label="检查人" prop="checkPerson">
        <el-input v-model="formData.checkPerson"></el-input>
      </el-form-item>
      <el-form-item label="检查到的问题" prop="checkQuestion">
        <el-input v-model="formData.checkQuestion"></el-input>
      </el-form-item>
      <el-form-item label="受检单位" prop="checkUnitId">
        <el-select v-model="formData.checkUnitId" placeholder="请选择">
          <el-option v-for="item in checkUnitList" :key="item.id" :label="item.unitName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="检查内容照片图片" prop="contentPath">
        <el-upload
          class="small"
          :action="$baseURL + 'accessory/addAccessory'"
          :file-list="picsList1"
          :on-success="handleUpload1"
          :on-remove="handleRemove1"
          :on-preview="handlePictureCardPreview"
          list-type="picture-card">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" size="tiny" append-to-body>
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="检查到的问题照片图片" prop="questionPath">
        <el-upload
          class="small"
          :action="$baseURL + 'accessory/addAccessory'"
          :file-list="picsList2"
          :on-success="handleUpload2"
          :on-remove="handleRemove2"
          :on-preview="handlePictureCardPreview"
          list-type="picture-card">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" size="tiny" append-to-body>
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="整改后的照片图片" prop="reformPath">
        <el-upload
          class="small"
          :action="$baseURL + 'accessory/addAccessory'"
          :file-list="picsList3"
          :on-success="handleUpload3"
          :on-remove="handleRemove3"
          :on-preview="handlePictureCardPreview"
          list-type="picture-card">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" size="tiny" append-to-body>
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="整改结果" prop="reformResult">
        <el-input v-model="formData.reformResult"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" :loading="posting">保存</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import uploadMixin from '@/mixins/upload'
export default {
  mixins: [uploadMixin],
  data() {
    return {
      formData: {
        checkContent: '',
        checkPerson: '',
        checkQuestion: '',
        checkUnitId: '',
        contentPath: '',
        questionPath: '',
        reformPath: '',
        reformResult: '',
        safeCheckRecordId: this.sid
      },
      rules: {},
      checkUnitList: [],
      picsList1: [],
      picsList2: [],
      picsList3: [],
      posting: false
    }
  },
  props: {
    id: {
      type: Number
    },
    sid: {
      type: Number
    }
  },
  mounted() {
    this.id && this.getDetail()
    this.getCheckUnitList()
  },
  methods: {
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleRemove1(file, list) {
      this.picsList1 = list
    },
    handleUpload1(res) {
      if (res.code == 0) {
        this.picsList1.push({name: res.data.accessoryName, url: this.$baseURL + res.data.accessoryName})
      }
    },
    handleRemove2(file, list) {
      this.picsList2 = list
    },
    handleUpload2(res) {
      if (res.code == 0) {
        this.picsList2.push({name: res.data.accessoryName, url: this.$baseURL + res.data.accessoryName})
      }
    },
    handleRemove3(file, list) {
      this.picsList3 = list
    },
    handleUpload3(res) {
      if (res.code == 0) {
        this.picsList3.push({name: res.data.accessoryName, url: this.$baseURL + res.data.accessoryName})
      }
    },
    async getDetail() {
      let {data} = await this.$http({
        url: 'safeCheckRecordDetail/getSafeCheckRecordDetail',
        params: {
          safeCheckRecordDetailId: this.id
        }
      })
      if (data.code == 0) {
        this.formData = data.data
        this.formData.id = this.id
        this.formData.safeCheckRecordId = this.sid
        this.picsList1 = this.pushPicInitList(this.formData.contentPath)
        this.picsList2 = this.pushPicInitList(this.formData.questionPath)
        this.picsList3 = this.pushPicInitList(this.formData.reformPath)
      }
    },
    async getCheckUnitList() {
      let {data} = await this.$http({
        url: 'checkUnit/getCheckUnitList'
      })
      if (data.code == 0) {
        this.checkUnitList = data.data.list
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formData.contentPath = this.joinPicIntoString(this.picsList1)
          this.formData.questionPath = this.joinPicIntoString(this.picsList2)
          this.formData.reformPath = this.joinPicIntoString(this.picsList3)
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
        url: 'safeCheckRecordDetail/' + (this.id ? 'updateSafeCheckRecordDetail' : 'addSafeCheckRecordDetail'),
        data: this.formData
      })
      if (data.code == 0) {
        this.$message({
          message: '保存成功！',
          type: 'success'
        })
        this.$emit('save-ok')
      } else {
        this.$message.error(data.msg)
      }
      this.posting = false
    }
  }
}
</script>
<style>
.small .el-upload-list--picture-card .el-upload-list__item,.small .el-upload--picture-card {
  width: 72px;
  height: 72px;
  line-height: 81px;
}
</style>
