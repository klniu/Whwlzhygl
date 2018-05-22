<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="150px" size="medium">
      <div class="form-title">基本信息</div>
      <div class="form-block">
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
        <el-form-item label="经济性质" prop="economicNature">
          <el-input v-model="formData.economicNature"></el-input>
        </el-form-item>
      </div>
      <div class="form-title">道路经营许可证信息</div>
      <div class="form-block">
        <el-form-item label="道路经营许可经营范围" prop="bizScopeIds">
          <el-transfer
            v-model="formData.bizScopeIds"
            :right-default-checked="formData.bizScopeIds"
            :data="bizScopeList"
            :titles="['可选列表', '已选列表']"
            :props="{
              key: 'id',
              label: 'scopeName'
            }" />
        </el-form-item>
        <el-form-item label="道路经营许可证号" prop="roadLicenseNum">
          <el-input v-model="formData.roadLicenseNum"></el-input>
        </el-form-item>
        <el-form-item label="道路许可证" prop="roadLicensePath">
          <img-upload
            :path.sync="formData.roadLicensePath">
          </img-upload>
        </el-form-item>
      </div>
      <div class="form-title">运输企业等级信息</div>
      <div class="form-block">
        <el-form-item label="运输企业等级" prop="roadTransportGrade">
          <el-input v-model="formData.roadTransportGrade"></el-input>
        </el-form-item>
        <el-form-item label="运输企业等级证书" prop="roadTransportGradeLicensePath">
          <img-upload
            :path.sync="formData.roadTransportGradeLicensePath">
          </img-upload>
        </el-form-item>
      </div>
      <div class="form-title">安全生产标准化达标等级信息</div>
      <div class="form-block">
        <el-form-item label="安全生产标准化达标等级" prop="safeProductGrade">
          <el-input v-model="formData.safeProductGrade"></el-input>
        </el-form-item>
        <el-form-item label="安全生产标准化达标等级证书" prop="safeProductGradeLicensePath">
          <img-upload
            :path.sync="formData.safeProductGradeLicensePath">
          </img-upload>
        </el-form-item>
      </div>
      <div class="form-title">营业执照信息</div>
      <div class="form-block">
        <el-form-item label="统一社会信用代码" prop="unifiedSocialCreditCode">
          <el-input v-model="formData.unifiedSocialCreditCode"></el-input>
        </el-form-item>
        <el-form-item label="营业执照" prop="bizLicensePath">
          <img-upload
            :data="{fileType: 'BIZ_LICENSE'}"
            @ocr="handleUpload4"
            :path.sync="formData.bizLicensePath">
          </img-upload>
        </el-form-item>
      </div>
      <el-dialog :visible.sync="dialogVisible">
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
      bizScopeList: [],
      bizScope: [],
      id: 1,
      formData: {
        bizLicensePath: '',
        companyName: '',
        economicNature: '',
        legalMobile: '',
        legalName: '',
        bizScopeIds: [],
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
      rules: {},
      apiName: 'company/',
      addApi: 'addCompany',
      updateApi: 'updateCompany'
    }
  },
  mounted() {
    this.id && this.getDetail()
    this.getBizScopeList()
  },
  methods: {
    async getBizScopeList() {
      let {data} = await this.$http('bizScope/getBizScopeList')
      if (data.code == 0) {
        this.bizScopeList = data.data
      }
    },
    handleUpload4(res) {
      if (res.company) {
        this.formData.companyName = res.company.companyName
        this.formData.registerAddress = res.company.registerAddress
        this.formData.unifiedSocialCreditCode = res.company.unifiedSocialCreditCode
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
        this.formData.bizScopeIds = this.formData.bizScopeIds || []
      }
    }
  }
}
</script>
