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
          action="https://jsonplaceholder.typicode.com/posts/"
          :file-list="fileList2"
          list-type="picture-card">
          <i class="el-icon-plus"></i>
        </el-upload>
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
        pic: []
      },
      rules: {},
      posting: false,
      fileList2: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
    }
  },
  mounted() {
    this.id && this.getDetail()
  },
  methods: {
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
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
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
