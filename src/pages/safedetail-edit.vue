<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="150px" size="medium">
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
          :file-list="picsList"
          :on-success="handleUpload"
          :on-remove="handleRemove"
          :on-preview="handlePictureCardPreview"
          list-type="picture-card">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" size="tiny" append-to-body>
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="检查内容照片图片" prop="contentPath">
        <el-input v-model="formData.contentPath"></el-input>
      </el-form-item>
      <el-form-item label="检查到的问题照片图片" prop="questionPath">
        <el-input v-model="formData.questionPath"></el-input>
      </el-form-item>
      <el-form-item label="整改后的照片图片" prop="reformPath">
        <el-input v-model="formData.reformPath"></el-input>
      </el-form-item>
      <el-form-item label="整改结果" prop="reformResult">
        <el-input v-model="formData.reformResult"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
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
      picsList: [],
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  props: {
    id: {
      type: Number,
      default: 1
    },
    sid: {
      type: Number,
      default: 1
    }
  },
  mounted() {
    this.id && this.getDetail()
    this.getCheckUnitList()
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
        url: 'safeCheckRecordDetail/getSafeCheckRecordDetail',
        params: {
          safeCheckRecordDetailId: this.sid
        }
      })
      if (data.code == 0) {
        this.formData = data.data
        this.formData.id = this.sid
        this.formData.sid = this.id
      }
    },
    async getCheckUnitList() {
      let {data} = await this.$http({
        url: 'checkUnit/getCheckUnitList'
      })
      if (data.code == 0) {
        this.checkUnitList = data.data.list
      }
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
