<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="100px" size="medium">
      <el-form-item label="汽车id" prop="carId">
        <el-input v-model="formData.carId"></el-input>
      </el-form-item>
      <el-form-item label="检查日期" prop="checkDate">
        <el-date-picker v-model="formData.checkDate" type="datetime" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
      </el-form-item>
      <el-form-item label="检查人" prop="checkPerson">
        <el-input v-model="formData.checkPerson"></el-input>
      </el-form-item>
      <el-form-item label="附件照片名称" prop="accessoryNames">
        <el-input v-model="formData.accessoryNames"></el-input>
      </el-form-item>
      <el-form-item label="整改请求" prop="reformRequest">
        <el-input v-model="formData.reformRequest"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" :loading="posting">保存</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import saveMixin from '@/mixins/saveform'
export default {
  mixins: [saveMixin],
  data() {
    return {
      id: parseInt(this.$route.query.id),
      orderIdList: [],
      formData: {
        companyId: 1,
        carId: '',
        checkDate: '',
        checkPerson: '',
        accessoryNames: '',
        reformRequest: ''
      },
      rules: {},
      apiName: 'carCheckRecord/',
      addApi: 'addCarCheckRecord',
      updateApi: 'updateCarCheckRecord'
    }
  },
  mounted() {
    this.id && this.getDetail()
  },
  methods: {
    async getDetail() {
      let {data} = await this.$http({
        url: 'carCheckRecord/getCarCheckRecord',
        params: {
          carCheckRecordId: this.id
        }
      })
      if (data.code == 0) {
        this.formData = data.data
        this.formData.carCheckRecordId = this.id
      }
    }
  }
}
</script>
