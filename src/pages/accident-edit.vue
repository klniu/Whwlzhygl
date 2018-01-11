<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="100px" size="medium">
      <el-form-item label="路单id" prop="orderId">
        <el-select v-model="formData.orderId" placeholder="请选择">
          <el-option v-for="item in orderIdList" :key="item.orderId" :label="item.goodsName" :value="item.orderId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="事故时间" prop="occurredTime">
        <el-date-picker v-model="formData.occurredTime" type="datetime" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
      </el-form-item>
      <el-form-item label="事故地点" prop="occurredAddress">
        <el-input v-model="formData.occurredAddress"></el-input>
      </el-form-item>
      <el-form-item label="天气状况" prop="weatherStatus">
        <el-input v-model="formData.weatherStatus"></el-input>
      </el-form-item>
      <el-form-item label="道路状况" prop="roadStatus">
        <el-input v-model="formData.roadStatus"></el-input>
      </el-form-item>
      <el-form-item label="死亡人数" prop="deathNum">
        <el-input-number v-model="formData.deathNum" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item label="失踪人数" prop="missingNum">
        <el-input-number v-model="formData.missingNum" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item label="受伤人数" prop="injuredNum">
        <el-input-number v-model="formData.injuredNum" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item label="事故描述" prop="description">
        <el-input v-model="formData.description"></el-input>
      </el-form-item>
      <el-form-item label="事故原因" prop="reason">
        <el-input v-model="formData.reason"></el-input>
      </el-form-item>
      <el-form-item label="统计人姓名" prop="statisticsPersonName">
        <el-input v-model="formData.statisticsPersonName"></el-input>
      </el-form-item>
      <el-form-item label="填表人姓名" prop="fillPersonName">
        <el-input v-model="formData.fillPersonName"></el-input>
      </el-form-item>
      <el-form-item label="填表人号码" prop="fillPersonMobile">
        <el-input v-model="formData.fillPersonMobile"></el-input>
      </el-form-item>
      <el-form-item label="报出时间" prop="submitDate">
        <el-date-picker v-model="formData.submitDate" type="datetime" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
      </el-form-item>
      <el-form-item label="单位负责人" prop="companyPrincipal">
        <el-input v-model="formData.companyPrincipal"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      accidentId: parseInt(this.$route.query.id),
      orderIdList: [],
      formData: {
        companyId: 1,
        orderId: '',
        occurredTime: '',
        occurredAddress: '',
        weatherStatus: '',
        roadStatus: '',
        deathNum: '',
        missingNum: '',
        injuredNum: '',
        description: '',
        reason: '',
        statisticsPersonName: '',
        fillPersonName: '',
        fillPersonMobile: '',
        submitDate: '',
        companyPrincipal: ''
      },
      rules: {}
    }
  },
  mounted() {
    this.getOrderList()
    this.accidentId && this.getDetail()
  },
  methods: {
    async getOrderList() {
      let {data} = await this.$http({
        url: 'order/getOrderList',
        params: {
          companyId: 1,
          currentPage: 1,
          size: 50
        }
      })
      if (data.code == 0) {
        this.orderIdList = data.data.list
      }
    },
    async getDetail() {
      let {data} = await this.$http({
        url: 'accident/getAccident',
        params: {
          accidentId: this.accidentId
        }
      })
      if (data.code == 0) {
        this.formData = data.data
        this.formData.accidentId = this.accidentId
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
      let {data} = await this.$http({
        method: 'post',
        url: 'accident/' + (this.accidentId ? 'updateAccident' : 'addAccident'),
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
    }
  }
}
</script>
