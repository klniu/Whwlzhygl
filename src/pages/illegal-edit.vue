<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="100px" size="medium">
      <el-form-item label="违章驾驶人" prop="regulationPerson">
        <el-input v-model="formData.regulationPerson"></el-input>
      </el-form-item>
      <el-form-item label="违章车辆id" prop="carId">
        <el-input v-model="formData.carId"></el-input>
      </el-form-item>
      <el-form-item label="违章时间" prop="regulationTime">
        <el-date-picker v-model="formData.regulationTime" type="datetime" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
      </el-form-item>
      <el-form-item label="违章地址" prop="regulationAddress">
        <el-input v-model="formData.regulationAddress"></el-input>
      </el-form-item>
      <el-form-item label="该记录状态" prop="recordStatus">
        <el-input v-model="formData.recordStatus"></el-input>
      </el-form-item>
      <el-form-item label="附件照片名称" prop="accessoryNames">
        <el-upload
          :action="$baseURL + 'accessory/addAccessory'"
          :file-list="picsList"
          :on-success="handleUpload"
          :on-remove="handleRemove"
          :on-preview="handlePictureCardPreview"
          list-type="picture-card">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
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
import saveMixin from '@/mixins/saveform'
import uploadMixin from '@/mixins/upload'
export default {
  mixins: [uploadMixin, saveMixin],
  data() {
    return {
      id: parseInt(this.$route.query.id),
      formData: {
        companyId: 1,
        regulationPerson: '',
        // TODO: 选车id
        carId: '',
        regulationTime: '',
        regulationAddress: '',
        recordStatus: '',
        accessoryNames: ''
      },
      picsList: [],
      rules: {},
      apiName: 'regulationRecord/',
      addApi: 'addRegulationRecord',
      updateApi: 'updateRegulationRecord'
    }
  },
  mounted() {
    this.id && this.getDetail()
  },
  methods: {
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
        url: 'regulationRecord/getRegulationRecord',
        params: {
          regulationRecordId: this.id
        }
      })
      if (data.code == 0) {
        this.formData = data.data
        this.formData.id = this.id
        this.picsList = this.pushPicInitList(this.formData.accessoryNames)
      }
    },
    beforePost() {
      this.formData.accessoryNames = this.joinPicIntoString(this.picsList)
    }
  }
}
</script>
