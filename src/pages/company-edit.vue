<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="150px" size="medium">
      <el-form-item label="企业名称" prop="companyName">
        <el-input v-model="formData.companyName"></el-input>
      </el-form-item>
      <el-form-item label="法人代表姓名" prop="legalName">
        <el-input v-model="formData.legalName"></el-input>
      </el-form-item>
      <el-form-item label="法人联系电话" prop="legalMobile">
        <el-input v-model="formData.legalMobile"></el-input>
      </el-form-item>
      <el-form-item label="注册地" prop="registerAddress">
        <el-input v-model="formData.registerAddress"></el-input>
      </el-form-item>
      <el-form-item label="负责人姓名" prop="principalName">
        <el-input v-model="formData.principalName"></el-input>
      </el-form-item>
      <el-form-item label="负责人联系电话" prop="principalMobile">
        <el-input v-model="formData.principalMobile"></el-input>
      </el-form-item>
      <!-- TODO: 经营范围 -->
      <el-form-item label="经验范围" prop="id">
        <el-transfer v-model="companyBizScope" :data="bizScope"></el-transfer>
      </el-form-item>
      <el-form-item label="道路经营许可证号" prop="roadLicenseNum">
        <el-input v-model="formData.roadLicenseNum"></el-input>
      </el-form-item>
      <el-form-item label="道路许可证" prop="roadLicensePath">
        <el-upload
          :action="$baseURL + 'accessory/addAccessory'"
          :file-list="picsList1"
          :on-success="handleUpload1"
          :on-remove="handleRemove1"
          :on-preview="handlePictureCardPreview"
          list-type="picture-card">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="经济性质" prop="economicNature">
        <el-input v-model="formData.economicNature"></el-input>
      </el-form-item>
      <el-form-item label="运输企业等级" prop="roadTransportGrade">
        <el-input v-model="formData.roadTransportGrade"></el-input>
      </el-form-item>
      <el-form-item label="运输企业等级证书" prop="roadTransportGradeLicensePath">
        <el-upload
          :action="$baseURL + 'accessory/addAccessory'"
          :file-list="picsList2"
          :on-success="handleUpload2"
          :on-remove="handleRemove2"
          :on-preview="handlePictureCardPreview"
          list-type="picture-card">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="安全生产标准化达标等级" prop="safeProductGrade">
        <el-input v-model="formData.safeProductGrade"></el-input>
      </el-form-item>
      <el-form-item label="安全生产标准化达标等级证书" prop="safeProductGradeLicensePath">
        <el-upload
          :action="$baseURL + 'accessory/addAccessory'"
          :file-list="picsList3"
          :on-success="handleUpload3"
          :on-remove="handleRemove3"
          :on-preview="handlePictureCardPreview"
          list-type="picture-card">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="统一社会信用代码" prop="unifiedSocialCreditCode">
        <el-input v-model="formData.unifiedSocialCreditCode"></el-input>
      </el-form-item>
      <el-form-item label="营业执照" prop="bizLicensePath">
        <el-upload
          :action="$baseURL + 'accessory/addAccessory'"
          :file-list="picsList4"
          :on-success="handleUpload4"
          :on-remove="handleRemove4"
          :on-preview="handlePictureCardPreview"
          list-type="picture-card">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-dialog :visible.sync="dialogVisible" size="tiny">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" :loading="posting">保存</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import uploadMixin from '@/mixins/upload'
import saveMixin from '@/mixins/saveform'
export default {
  mixins: [uploadMixin, saveMixin],
  data() {
    return {
      companyBizScope: [],
      bizScope: [],
      id: 1,
      formData: {
        bizLicensePath: '',
        companyName: '',
        economicNature: '',
        legalMobile: '',
        legalName: '',
        principalMobile: '',
        principalName: '',
        registerAddress: '',
        roadLicenseNum: '',
        roadLicensePath: '',
        roadTransportGrade: '',
        roadTransportGradeLicensePath: '',
        safeProductGrade: '',
        safeProductGradeLicensePath: '',
        unifiedSocialCreditCode: ''
      },
      picsList1: [],
      picsList2: [],
      picsList3: [],
      picsList4: [],
      rules: {},
      apiName: 'company/',
      addApi: 'addCompany',
      updateApi: 'updateCompany'
    }
  },
  mounted() {
    this.id && this.getDetail()
  },
  methods: {
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
    handleRemove4(file, list) {
      this.picsList4 = list
    },
    handleUpload4(res) {
      if (res.code == 0) {
        this.picsList4.push({name: res.data.accessoryName, url: this.$baseURL + res.data.accessoryName})
      }
    },
    async getDetail() {
      let {data} = await this.$http({
        url: 'company/getCompany',
        params: {
          companyId: this.id
        }
      })
      if (data.code == 0) {
        this.formData = data.data
        this.formData.id = this.id
        this.picsList1 = this.pushPicInitList(this.formData.roadLicensePath)
        this.picsList2 = this.pushPicInitList(this.formData.roadTransportGradeLicensePath)
        this.picsList3 = this.pushPicInitList(this.formData.safeProductGradeLicensePath)
        this.picsList4 = this.pushPicInitList(this.formData.bizLicensePath)
      }
    },
    beforePost() {
      this.formData.roadLicensePath = this.joinPicIntoString(this.picsList1)
      this.formData.roadTransportGradeLicensePath = this.joinPicIntoString(this.picsList2)
      this.formData.safeProductGradeLicensePath = this.joinPicIntoString(this.picsList3)
      this.formData.bizLicensePath = this.joinPicIntoString(this.picsList4)
    }
  }
}
</script>
