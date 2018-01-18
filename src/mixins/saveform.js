export default {
  data() {
    return {
      posting: false
    }
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async postForm() {
      this.posting = true
      let {data} = await this.$http({
        method: 'post',
        url: this.apiName + (this.id ? this.updateApi : this.addApi),
        data: this.formData
      })
      if (data.code == 0) {
        this.$message({
          message: '保存成功！',
          type: 'success'
        })
        this.$emit('save-ok')
      } else {
        this.$message.error(data.msg)
      }
      this.posting = false
    }
  }
}