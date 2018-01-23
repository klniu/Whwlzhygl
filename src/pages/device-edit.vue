<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="150px" size="medium">
      <el-form-item label="车辆维修安全合同" prop="maintenanceContractPath">
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
    <h3>二级维修计划：</h3>
    <maintenance-list :id="id"></maintenance-list>
  </div>
</template>
<script>
import MaintenanceList from './maintenance'
import saveMixin from '@/mixins/saveform'
import uploadMixin from '@/mixins/upload'
export default {
  mixins: [uploadMixin, saveMixin],
  components: {
    MaintenanceList
  },
  data() {
    return {
      id: 1,
      formData: {
        companyId: 1,
        maintenanceContractPath: ''
      },
      picsList: [],
      rules: {},
      apiName: 'deviceMaintenance/',
      addApi: 'addDeviceMaintenance',
      updateApi: 'updateDeviceMaintenance'
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
        url: 'deviceMaintenance/getDeviceMaintenance',
        params: {
          deviceMaintenanceId: this.id
        }
      })
      if (data.code == 0) {
        this.formData = data.data
        this.formData.id = this.id
        this.picsList = this.pushPicInitList(this.formData.maintenanceContractPath)
      }
    },
    beforePost() {
      this.formData.maintenanceContractPath = this.joinPicIntoString(this.picsList)
    }
  }
}
</script>
