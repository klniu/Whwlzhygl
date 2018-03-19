<template>
  <div>
    <el-dialog title="登录管理后台系统" :visible="true" width="400px" :show-close="false" center>
      <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="100px" size="medium">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="formData.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="formData.password"></el-input>
        </el-form-item>
        <el-button type="success" @click="submitForm('ruleForm', 1)" :loading="posting">登录腾业</el-button>
        <el-button type="success" @click="submitForm('ruleForm', 2)" :loading="posting">登录立鑫</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      posting: false,
      companyId: 0,
      formData: {
        userName: '',
        password: ''
      },
      rules: {
        userName: {required: true, message: '请输入用户名'},
        password: {required: true, message: '请输入密码'}
      }
    }
  },
  methods: {
    async postForm() {
      this.posting = true
      let {data} = await this.$http({
        method: 'post',
        url: 'login',
        data: this.formData
      })
      if (data.code == 0) {
        localStorage.setItem('loginkey', data.data.token)
        localStorage.setItem('userId', data.data.userId)
        localStorage.setItem('personTypeId', data.data.personTypeId)
        localStorage.setItem('companyId', this.companyId)
        localStorage.setItem('userName', this.formData.userName)
        this.$router.push({
          name: 'Home'
        })
      } else {
        this.$message.error(data.msg)
      }
      this.posting = false
    },
    submitForm(formName, companyId) {
      this.companyId = companyId
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.postForm()
        }
      })
    }
  }
}
</script>
<style scoped>
.el-form{
  text-align: center;
}
</style>
