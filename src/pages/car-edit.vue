<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="200px" size="medium">
      <div class="form-title">行驶证信息</div>
      <div class="form-block">
        <el-form-item label="车牌" prop="plateNum">
          <el-input v-model="formData.plateNum"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="formData.address"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-input v-model="formData.type"></el-input>
        </el-form-item>
        <el-form-item label="使用性质" prop="useProperty">
          <el-input v-model="formData.useProperty"></el-input>
        </el-form-item>
        <el-form-item label="品牌型号" prop="brand">
          <el-input v-model="formData.brand"></el-input>
        </el-form-item>
        <el-form-item label="车架号" prop="vin">
          <el-input v-model="formData.vin"></el-input>
        </el-form-item>
        <el-form-item label="整备重量" prop="approveWeight">
          <el-input v-model="formData.approveWeight"></el-input>
        </el-form-item>
        <el-form-item label="核载重量" prop="curbWeight">
          <el-input v-model="formData.curbWeight"></el-input>
        </el-form-item>
        <el-form-item label="发动机号" prop="engineNum">
          <el-input v-model="formData.engineNum"></el-input>
        </el-form-item>
        <el-form-item label="档案编号" prop="fileNumber">
          <el-input v-model="formData.fileNumber"></el-input>
        </el-form-item>
        <el-form-item label="发证日期" prop="issuingDate">
          <el-date-picker v-model="formData.issuingDate" type="date" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
        </el-form-item>
        <el-form-item label="所有人" prop="owner">
          <el-input v-model="formData.owner"></el-input>
        </el-form-item>
        <el-form-item label="载客人数" prop="peopleNumber">
          <el-input v-model="formData.peopleNumber"></el-input>
        </el-form-item>
        <el-form-item label="牵引重量" prop="pullWeight">
          <el-input v-model="formData.pullWeight"></el-input>
        </el-form-item>
        <el-form-item label="车辆行驶证注册日期" prop="registerDate">
          <el-date-picker v-model="formData.registerDate" type="date" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
        </el-form-item>
        <el-form-item label="尺寸" prop="size">
          <el-input v-model="formData.size"></el-input>
        </el-form-item>
        <el-form-item label="总重量" prop="totalWeight">
          <el-input v-model="formData.totalWeight"></el-input>
        </el-form-item>
        <el-form-item label="行驶证图片" prop="carDrivingLicensePath">
          <el-upload
            :data="{fileType: 'CAR_DRIVING_LICENSE'}"
            class="small"
            :action="$baseURL + 'accessory/addAccessory'"
            :file-list="picsList1"
            :on-success="handleUpload1"
            :on-remove="handleRemove1"
            :on-preview="handlePictureCardPreview"
            list-type="picture-card">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="检验有效截止日期" prop="checkEndDate">
          <el-date-picker v-model="formData.checkEndDate" type="date" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
        </el-form-item>
      </div>
      <div class="form-title">保险信息</div>
      <div class="form-block">
        <el-form-item label="承运人责任险有效期截止日期" prop="cliValidityEndDate">
          <el-date-picker v-model="formData.cliValidityEndDate" type="date" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
        </el-form-item>
        <el-form-item label="承运人责任险有效期开始日期" prop="cliValidityStartDate">
          <el-date-picker v-model="formData.cliValidityStartDate" type="date" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
        </el-form-item>
        <el-form-item label="承运人责任险图片" prop="cliPath">
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
        <el-form-item label="交强险保单号" prop="tciNum">
          <el-input v-model="formData.tciNum"></el-input>
        </el-form-item>
        <el-form-item label="交强险有效截止日期" prop="tciValidityEndDate">
          <el-date-picker v-model="formData.tciValidityEndDate" type="date" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
        </el-form-item>
        <el-form-item label="交强险图片" prop="tciPath">
          <el-upload
            class="small"
            :action="$baseURL + 'accessory/addAccessory'"
            :file-list="picsList8"
            :on-success="handleUpload8"
            :on-remove="handleRemove8"
            :on-preview="handlePictureCardPreview"
            list-type="picture-card">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商业险保单号" prop="ciNum">
          <el-input v-model="formData.ciNum"></el-input>
        </el-form-item>
        <el-form-item label="商业险有效截止日期" prop="ciValidityEndDate">
          <el-date-picker v-model="formData.ciValidityEndDate" type="date" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
        </el-form-item>
        <el-form-item label="商业险图片" prop="ciPath">
          <el-upload
            class="small"
            :action="$baseURL + 'accessory/addAccessory'"
            :file-list="picsList9"
            :on-success="handleUpload9"
            :on-remove="handleRemove9"
            :on-preview="handlePictureCardPreview"
            list-type="picture-card">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </div>
      <div class="form-title">营运证信息</div>
      <div class="form-block">
        <el-form-item label="营运证号" prop="roadTransportNum">
          <el-input v-model="formData.roadTransportNum"></el-input>
        </el-form-item>
        <el-form-item label="营运证有效期截止日期" prop="roadTransportValidityEndDate">
          <el-date-picker v-model="formData.roadTransportValidityEndDate" type="date" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
        </el-form-item>
        <el-form-item label="营运证有效期开始时间" prop="roadTransportValidityStartDate">
          <el-date-picker v-model="formData.roadTransportValidityStartDate" type="date" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
        </el-form-item>
        <el-form-item label="营运证年审有效期" prop="motValidityEndDate">
          <el-date-picker v-model="formData.motValidityEndDate" type="date" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
        </el-form-item>
        <el-form-item label="营运证图片" prop="motPath">
          <el-upload
            class="small"
            :action="$baseURL + 'accessory/addAccessory'"
            :file-list="picsList4"
            :on-success="handleUpload4"
            :on-remove="handleRemove4"
            :on-preview="handlePictureCardPreview"
            list-type="picture-card">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </div>
      <div class="form-title">罐体信息</div>
      <div class="form-block">
        <el-form-item label="罐体检测有效期" prop="tankValidityEndDate">
          <el-input v-model="formData.tankValidityEndDate"></el-input>
        </el-form-item>
        <el-form-item label="罐体检测报告" prop="tankReportPath">
          <el-upload
            class="small"
            :action="$baseURL + 'accessory/addAccessory'"
            :file-list="picsList6"
            :on-success="handleUpload6"
            :on-remove="handleRemove6"
            :on-preview="handlePictureCardPreview"
            list-type="picture-card">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </div>
      <div class="form-title">技术等级信息</div>
      <div class="form-block">
        <el-form-item label="技术等级评定" prop="technicalGrade">
          <el-input v-model="formData.technicalGrade"></el-input>
        </el-form-item>
        <el-form-item label="技术等级评定有效期截止日期" prop="technicalGradeValidityEndDate">
          <el-date-picker v-model="formData.technicalGradeValidityEndDate" type="date" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
        </el-form-item>
        <el-form-item label="技术等级评定有效期开始日期" prop="technicalGradeValidityStartDate">
          <el-date-picker v-model="formData.technicalGradeValidityStartDate" type="date" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
        </el-form-item>
        <el-form-item label="技术等级证书图片" prop="technicalGradePath">
          <el-upload
            class="small"
            :action="$baseURL + 'accessory/addAccessory'"
            :file-list="picsList7"
            :on-success="handleUpload7"
            :on-remove="handleRemove7"
            :on-preview="handlePictureCardPreview"
            list-type="picture-card">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </div>
      <div class="form-title">其他信息</div>
      <div class="form-block">
        <el-form-item label="GPS安装证明图片" prop="gpsInstallPath">
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
        </el-form-item>
        <el-form-item label="登记证书图片" prop="registerPath">
          <el-upload
            class="small"
            :action="$baseURL + 'accessory/addAccessory'"
            :file-list="picsList5"
            :on-success="handleUpload5"
            :on-remove="handleRemove5"
            :on-preview="handlePictureCardPreview"
            list-type="picture-card">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </div>
      <el-dialog :visible.sync="dialogVisible" append-to-body>
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
      id: parseInt(this.$route.query.id),
      formData: {
        carTeamId: this.sid,
        plateNum: '',
        address: '',
        approveWeight: '',
        brand: '',
        carDrivingLicensePath: '',
        checkEndDate: '',
        cliPath: '',
        cliValidityEndDate: '',
        cliValidityStartDate: '',
        curbWeight: '',
        engineNum: '',
        fileNumber: '',
        gpsInstallPath: '',
        issuingDate: '',
        motPath: '',
        motValidityEndDate: '',
        owner: '',
        peopleNumber: '',
        pullWeight: '',
        registerDate: '',
        registerPath: '',
        roadTransportNum: '',
        roadTransportValidityEndDate: '',
        roadTransportValidityStartDate: '',
        size: '',
        tankValidityEndDate: '',
        tankReportPath: '',
        technicalGrade: '',
        technicalGradePath: '',
        technicalGradeValidityEndDate: '',
        technicalGradeValidityStartDate: '',
        totalWeight: '',
        type: '',
        useProperty: '',
        vin: '',
        tciNum: '',
        tciPath: '',
        tciValidityEndDate: '',
        ciNum: '',
        ciPath: '',
        ciValidityEndDate: ''
      },
      rules: {},
      apiName: 'car/',
      addApi: 'addCar',
      updateApi: 'updateCar',
      picsList1: [],
      picsList2: [],
      picsList3: [],
      picsList4: [],
      picsList5: [],
      picsList6: [],
      picsList7: [],
      picsList8: [],
      picsList9: []
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
        if (res.data.accessoryContent.car) {
          this.formData.address = res.data.accessoryContent.car.address
          this.formData.brand = res.data.accessoryContent.car.brand
          this.formData.engineNum = res.data.accessoryContent.car.engineNum
          this.formData.issuingDate = res.data.accessoryContent.car.issuingDate
          this.formData.owner = res.data.accessoryContent.car.owner
          this.formData.plateNum = res.data.accessoryContent.car.plateNum
          this.formData.registerDate = res.data.accessoryContent.car.registerDate
          this.formData.type = res.data.accessoryContent.car.type
          this.formData.useProperty = res.data.accessoryContent.car.useProperty
          this.formData.vin = res.data.accessoryContent.car.vin
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
    handleRemove5(file, list) {
      this.picsList5 = list
    },
    handleUpload5(res) {
      if (res.code == 0) {
        this.picsList5.push({name: res.data.accessoryName, url: this.$baseURL + res.data.accessoryName})
      }
    },
    handleRemove6(file, list) {
      this.picsList6 = list
    },
    handleUpload6(res) {
      if (res.code == 0) {
        this.picsList6.push({name: res.data.accessoryName, url: this.$baseURL + res.data.accessoryName})
      }
    },
    handleRemove7(file, list) {
      this.picsList7 = list
    },
    handleUpload7(res) {
      if (res.code == 0) {
        this.picsList7.push({name: res.data.accessoryName, url: this.$baseURL + res.data.accessoryName})
      }
    },
    handleRemove8(file, list) {
      this.picsList8 = list
    },
    handleUpload8(res) {
      if (res.code == 0) {
        this.picsList8.push({name: res.data.accessoryName, url: this.$baseURL + res.data.accessoryName})
      }
    },
    handleRemove9(file, list) {
      this.picsList9 = list
    },
    handleUpload9(res) {
      if (res.code == 0) {
        this.picsList9.push({name: res.data.accessoryName, url: this.$baseURL + res.data.accessoryName})
      }
    },
    async getDetail() {
      let {data} = await this.$http({
        url: 'car/getCar',
        params: {
          carId: this.id
        }
      })
      if (data.code == 0) {
        this.formData = data.data
        this.formData.id = this.id
        this.formData.carTeamId = this.sid
        this.picsList1 = this.pushPicInitList(this.formData.carDrivingLicensePath)
        this.picsList2 = this.pushPicInitList(this.formData.cliPath)
        this.picsList3 = this.pushPicInitList(this.formData.gpsInstallPath)
        this.picsList4 = this.pushPicInitList(this.formData.motPath)
        this.picsList5 = this.pushPicInitList(this.formData.registerPath)
        this.picsList6 = this.pushPicInitList(this.formData.tankReportPath)
        this.picsList7 = this.pushPicInitList(this.formData.technicalGradePath)
        this.picsList8 = this.pushPicInitList(this.formData.tciPath)
        this.picsList9 = this.pushPicInitList(this.formData.ciPath)
      }
    },
    beforePost() {
      this.formData.carDrivingLicensePath = this.joinPicIntoString(this.picsList1)
      this.formData.cliPath = this.joinPicIntoString(this.picsList2)
      this.formData.gpsInstallPath = this.joinPicIntoString(this.picsList3)
      this.formData.motPath = this.joinPicIntoString(this.picsList4)
      this.formData.registerPath = this.joinPicIntoString(this.picsList5)
      this.formData.tankReportPath = this.joinPicIntoString(this.picsList6)
      this.formData.technicalGradePath = this.joinPicIntoString(this.picsList7)
      this.formData.tciPath = this.joinPicIntoString(this.picsList8)
      this.formData.ciPath = this.joinPicIntoString(this.picsList9)
    }
  }
}
</script>