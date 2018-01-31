<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="150px" size="medium">
      <el-form-item label="车队名称" prop="teamName">
        <el-input v-model="formData.teamName"></el-input>
      </el-form-item>
      <el-form-item label="负责人名称" prop="principalName">
        <el-input v-model="formData.principalName"></el-input>
      </el-form-item>
      <el-form-item label="负责人联系号码" prop="principalMobile">
        <el-input v-model="formData.principalMobile"></el-input>
      </el-form-item>
      <el-form-item label="车队安全责任状图片" prop="safeResponsibilityPath">
        <el-upload
          :action="$baseURL + 'accessory/addAccessory'"
          :file-list="picsList"
          :on-success="handleUpload"
          :on-remove="handleRemove"
          :on-preview="handlePictureCardPreview"
          list-type="picture-card">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-dialog :visible.sync="dialogVisible" append-to-body>
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" :loading="posting">保存</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <div v-if="id">
      <h3>车辆列表：</h3>
      <car-list :id="id"></car-list>
    </div>
  </div>
</template>
<script>
import CarList from './car'
import saveMixin from '@/mixins/saveform'
import uploadMixin from '@/mixins/upload'
export default {
  mixins: [saveMixin, uploadMixin],
  components: {
    CarList
  },
  data() {
    return {
      id: parseInt(this.$route.query.id),
      formData: {
        companyId: localStorage.getItem('companyId'),
        teamName: '',
        principalName: '',
        principalMobile: '',
        safeResponsibilityPath: ''
      },
      picsList: [],
      rules: {},
      apiName: 'carTeam/',
      addApi: 'addCarTeam',
      updateApi: 'updateCarTeam'
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
    beforePost() {
      this.formData.safeResponsibilityPath = this.joinPicIntoString(this.picsList)
    },
    async getDetail() {
      let {data} = await this.$http({
        url: 'carTeam/getCarTeam',
        params: {
          carTeamId: this.id
        }
      })
      if (data.code == 0) {
        this.formData = data.data
        this.formData.id = this.id
        this.picsList = this.pushPicInitList(this.formData.safeResponsibilityPath)
      }
    }
  }
}
</script>
