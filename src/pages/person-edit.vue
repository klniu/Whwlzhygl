<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="180px">
      <el-form-item label="人员名称" prop="personName">
        <el-input v-model="formData.personName"></el-input>
      </el-form-item>
      <el-form-item label="人员类型" prop="personTypeId">
        <el-select v-model="formData.personTypeId" placeholder="请选择">
          <el-option v-for="item in personTypeList" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="formData.gender">
          <el-radio :label="0">男</el-radio>
          <el-radio :label="1">女</el-radio>
          <el-radio :label="2">其他</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model="formData.age"></el-input>
      </el-form-item>
      <el-form-item label="出生日期" prop="birthday">
        <el-date-picker v-model="formData.birthday" type="datetime" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
      </el-form-item>
      <el-form-item label="民族" prop="nation">
        <el-input v-model="formData.nation"></el-input>
      </el-form-item>
      <el-form-item label="身份证地址" prop="address">
        <el-input v-model="formData.address"></el-input>
      </el-form-item>
      <el-form-item label="身份证号" prop="idCardNum">
        <el-input v-model="formData.idCardNum"></el-input>
      </el-form-item>
      <el-form-item label="联系号码" prop="mobile">
        <el-input v-model="formData.mobile"></el-input>
      </el-form-item>
      <el-form-item label="身份证正面" prop="idCardPath0">
        <el-upload
          class="small"
          :data="{fileType: 'ID_CARD0'}"
          :action="$baseURL + 'accessory/addAccessory'"
          :file-list="picsList1"
          :on-success="handleUpload1"
          :on-remove="handleRemove1"
          :on-preview="handlePictureCardPreview"
          list-type="picture-card">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="身份证反面" prop="idCardPath1">
        <el-upload
          class="small"
          :data="{fileType: 'ID_CARD1'}"
          :action="$baseURL + 'accessory/addAccessory'"
          :file-list="picsList3"
          :on-success="handleUpload3"
          :on-remove="handleRemove3"
          :on-preview="handlePictureCardPreview"
          list-type="picture-card">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="发证机关" prop="issuingAuthority">
        <el-input v-model="formData.issuingAuthority"></el-input>
      </el-form-item>
      <el-form-item label="身份证有效期开始日期" prop="idCardValidityStartDate">
        <el-date-picker v-model="formData.idCardValidityStartDate" type="datetime" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
      </el-form-item>
      <el-form-item label="身份证有效期截止日期" prop="idCardValidityEndDate">
        <el-date-picker v-model="formData.idCardValidityEndDate" type="datetime" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
      </el-form-item>
      <el-form-item label="从业资格证类型id" prop="qualificationCertificateTypeId">
        <el-select v-model="formData.qualificationCertificateTypeId" placeholder="请选择">
          <el-option v-for="item in certTypeList" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="初次领证日期" prop="qualificationFirstDate">
        <el-date-picker v-model="formData.qualificationFirstDate" type="datetime" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
      </el-form-item>
      <el-form-item label="从业资格证有效期截止日期" prop="qualificationValidityEndDate">
        <el-date-picker v-model="formData.qualificationValidityEndDate" type="datetime" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
      </el-form-item>
      <el-form-item label="从业资格证有效期开始日期" prop="qualificationValidityStartDate">
        <el-date-picker v-model="formData.qualificationValidityStartDate" type="datetime" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
      </el-form-item>
      <el-form-item label="从业资格证图片" prop="qualificationLicensePath">
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
      </el-form-item>
      <el-dialog :visible.sync="dialogVisible" append-to-body>
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
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
        personName: '',
        personTypeId: '',
        gender: '',
        age: '',
        birthday: '',
        nation: '',
        address: '',
        idCardNum: '',
        mobile: '',
        idCardPath0: '',
        idCardPath1: '',
        issuingAuthority: '',
        idCardValidityStartDate: '',
        idCardValidityEndDate: '',
        qualificationCertificateTypeId: '',
        qualificationFirstDate: '',
        qualificationValidityEndDate: '',
        qualificationValidityStartDate: '',
        qualificationLicensePath: ''
      },
      rules: {},
      apiName: 'person/',
      addApi: 'addPerson',
      updateApi: 'updatePerson',
      picsList1: [],
      picsList2: [],
      picsList3: [],
      personTypeList: [],
      certTypeList: []
    }
  },
  mounted() {
    this.getPersonTypeList()
    this.getCertTypeList()
    this.id && this.getDetail()
  },
  methods: {
    async getPersonTypeList() {
      let {data} = await this.$http('personType/getPersonTypeList')
      if (data.code == 0) {
        this.personTypeList = data.data.list
      }
    },
    async getCertTypeList() {
      let {data} = await this.$http('qualificationCertificateType/getQualificationCertificateTypeList')
      if (data.code == 0) {
        this.certTypeList = data.data.list
      }
    },
    handleRemove1(file, list) {
      this.picsList1 = list
    },
    handleUpload1(res) {
      if (res.code == 0) {
        this.picsList1.push({name: res.data.accessoryName, url: this.$baseURL + res.data.accessoryName})
        if (res.data.accessoryContent.person) {
          this.formData.address = res.data.accessoryContent.person.address
          this.formData.birthday = res.data.accessoryContent.person.birthday
          this.formData.gender = res.data.accessoryContent.person.gender
          this.formData.idCardNum = res.data.accessoryContent.person.idCardNum
          this.formData.nation = res.data.accessoryContent.person.nation
          this.formData.personName = res.data.accessoryContent.person.personName
        }
      }
    },
    handleRemove3(file, list) {
      this.picsList1 = list
    },
    handleUpload3(res) {
      if (res.code == 0) {
        this.picsList3.push({name: res.data.accessoryName, url: this.$baseURL + res.data.accessoryName})
        if (res.data.accessoryContent.person) {
          this.formData.idCardValidityEndDate = res.data.accessoryContent.person.idCardValidityEndDate
          this.formData.idCardValidityStartDate = res.data.accessoryContent.person.idCardValidityStartDate
          this.formData.issuingAuthority = res.data.accessoryContent.person.issuingAuthority
        }
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
    beforePost() {
      this.formData.idCardPath0 = this.joinPicIntoString(this.picsList1)
      this.formData.idCardPath1 = this.joinPicIntoString(this.picsList3)
      this.formData.qualificationLicensePath = this.joinPicIntoString(this.picsList2)
    },
    async getDetail() {
      let {data} = await this.$http({
        url: 'person/getPerson',
        params: {
          personId: this.id
        }
      })
      if (data.code == 0) {
        this.formData = data.data
        this.formData.id = this.id
        this.picsList1 = this.pushPicInitList(this.formData.idCardPath0)
        this.picsList3 = this.pushPicInitList(this.formData.idCardPath1)
        this.picsList2 = this.pushPicInitList(this.formData.qualificationLicensePath)
      }
    }
  }
}
</script>
