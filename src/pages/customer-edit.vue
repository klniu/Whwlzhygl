<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="100px" size="medium">
      <el-form-item label="客户名称" prop="customerName">
        <el-input v-model="formData.customerName"></el-input>
      </el-form-item>
      <el-form-item label="客户地址" prop="customerAddress">
        <el-input v-model="formData.customerAddress"></el-input>
      </el-form-item>
          <el-form-item label="发货方联系人" prop="linkmanName">
            <el-input v-model="formData.linkmanName"></el-input>
          </el-form-item>
          <el-form-item label="发货方号码" prop="linkmanMobile">
            <el-input v-model="formData.linkmanMobile"></el-input>
          </el-form-item>
          <el-form-item label="发货地址" prop="sendAddrIds">
            <china-city :cityarr.sync="formData.sendAddrIds"></china-city>
          </el-form-item>
          <el-form-item label="详细地址" prop="sendAddress">
            <el-input v-model="formData.sendAddress"></el-input>
          </el-form-item>
          <el-form-item label="收货方联系人" prop="receiveName">
            <el-input v-model="formData.receiveName"></el-input>
          </el-form-item>
          <el-form-item label="收货方号码" prop="receiveMobile">
            <el-input v-model="formData.receiveMobile"></el-input>
          </el-form-item>
          <el-form-item label="收货地址" prop="receiveAddrIds">
            <china-city :cityarr.sync="formData.receiveAddrIds"></china-city>
          </el-form-item>
          <el-form-item label="详细地址" prop="receiveAddress">
            <el-input v-model="formData.receiveAddress"></el-input>
          </el-form-item>
      <el-form-item label="合同图片" prop="contractPath">
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
      <el-form-item label="营业执照图片" prop="bizLicensePath">
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
      <el-form-item label="其他附件" prop="accessoryNames">
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
import ChinaCity from '@/components/china-city'
export default {
  mixins: [uploadMixin, saveMixin],
  components: {
    ChinaCity
  },
  data() {
    return {
      id: parseInt(this.$route.query.id),
      formData: {
        companyId: sessionStorage.getItem('companyId'),
        customerAddress: '',
        customerName: '',
        linkmanMobile: '',
        linkmanName: '',
        receiveAddress: '',
        sendAddress: '',
        accessoryNames: '',
        contractPath: '',
        sendAddrIds: '[]',
        receiveAddrIds: '[]',
        bizLicensePath: ''
      },
      picsList: [],
      picsList1: [],
      picsList2: [],
      rules: {},
      apiName: 'customer/',
      addApi: 'addCustomer',
      updateApi: 'updateCustomer'
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
    async getDetail() {
      let {data} = await this.$http({
        url: 'customer/getCustomer',
        params: {
          customerId: this.id
        }
      })
      if (data.code == 0) {
        this.formData = data.data
        this.formData.id = this.id
        this.picsList = this.pushPicInitList(this.formData.accessoryNames)
        this.picsList1 = this.pushPicInitList(this.formData.contractPath)
        this.picsList2 = this.pushPicInitList(this.formData.bizLicensePath)
      }
    },
    beforePost() {
      this.formData.accessoryNames = this.joinPicIntoString(this.picsList)
      this.formData.contractPath = this.joinPicIntoString(this.picsList1)
      this.formData.bizLicensePath = this.joinPicIntoString(this.picsList2)
    }
  }
}
</script>
