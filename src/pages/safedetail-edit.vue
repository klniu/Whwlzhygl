<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="100px" size="medium">
      <el-form-item label="测试表单" prop="xxx">
        <el-input v-model="formData.xxx" placeholder="填些什么"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        xxx: ''
      },
      rules: {}
    }
  },
  props: {
    id: {
      type: Number,
      default: 1
    }
  }
}
</script>
