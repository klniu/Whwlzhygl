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
export default {
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
      posting: false,
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  mounted() {
    this.id && this.getDetail()
  },
  methods: {
    joinPicIntoString(list) {
      let names = list.map(i => {
        return i.name
      })
      return names.join(',')
    },
    pushPicInitList(str) {
      let pics = []
      if (str) {
        pics = str.split(',')
        pics = pics.map(i => {
          return {name: i, url: this.$baseURL + i}
        })
      }
      return pics
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formData.accessoryNames = this.joinPicIntoString(this.picsList)
          this.postForm()
        } else {
          this.$message.error('错了哦，这是一条错误消息')
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async postForm() {
      this.posting = true
      let {data} = await this.$http({
        method: 'post',
        url: 'customer/' + (this.id ? 'updateCustomer' : 'addCustomer'),
        data: this.formData
      })
      if (data.code == 0) {
        this.$message({
          message: '保存成功！',
          type: 'success'
        })
      } else {
        this.$message.error(data.msg)
      }
      this.posting = false
    }
  }
}
</script>
