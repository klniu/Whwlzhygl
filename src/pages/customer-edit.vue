<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="100px" size="medium">
      <el-form-item label="客户地址 " prop="customerAddress">
        <el-input v-model="formData.customerAddress"></el-input>
      </el-form-item>
      <el-form-item label="客户名称" prop="customerName">
        <el-input v-model="formData.customerName"></el-input>
      </el-form-item>
      <el-form-item label="联系人姓名" prop="linkmanName">
        <el-input v-model="formData.linkmanName"></el-input>
      </el-form-item>
      <el-form-item label="联系人号码" prop="linkmanMobile">
        <el-input v-model="formData.linkmanMobile"></el-input>
      </el-form-item>
      <el-form-item label="收货地址" prop="receiveAddress">
        <el-input v-model="formData.receiveAddress"></el-input>
      </el-form-item>
      <el-form-item label="发货地址" prop="sendAddress">
        <el-input v-model="formData.sendAddress"></el-input>
      </el-form-item>
      <el-form-item label="证件" prop="pic">
        <el-upload
          :action="$baseURL + 'accessory/addAccessory'"
          :file-list="picsList"
          :on-success="handleUpload"
          :on-remove="handleRemove"
          :on-preview="handlePictureCardPreview"
          list-type="picture-card">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" size="tiny">
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
import uploadMixin from '@/mixins/upload'
import saveMixin from '@/mixins/saveform'
export default {
  mixins: [uploadMixin, saveMixin],
  data() {
    return {
      id: parseInt(this.$route.query.id),
      formData: {
        companyId: 1,
        customerAddress: '',
        customerName: '',
        linkmanMobile: '',
        linkmanName: '',
        receiveAddress: '',
        sendAddress: '',
        accessoryNames: ''
      },
      picsList: [],
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
        url: 'customer/getCustomer',
        params: {
          customerId: this.id
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
