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
      <el-form-item label="事故责任" prop="accidentDutyId">
        <el-select v-model="formData.accidentDutyId" placeholder="请选择">
          <el-option v-for="item in dutyList" :key="item.id" :label="item.dutyName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="理赔金额" prop="claimAmount">
        <el-input v-model="formData.claimAmount"></el-input>
      </el-form-item>
      <el-form-item label="实际赔付" prop="actualAmount">
        <el-input v-model="formData.actualAmount"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="formData.remark"></el-input>
      </el-form-item>
      <el-form-item label="承运人责任险保单号" v-if="id" prop="xxx">
        <el-input disabled v-model="formData.xxx"></el-input>
      </el-form-item>
      <el-form-item label="交强险保单号" v-if="id" prop="xxx">
        <el-input disabled v-model="formData.xxx"></el-input>
      </el-form-item>
      <el-form-item label="商业险保单号" v-if="id" prop="xxx">
        <el-input disabled v-model="formData.xxx"></el-input>
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
      dutyList: [],
      formData: {
        companyId: sessionStorage.getItem('companyId'),
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
        companyPrincipal: '',
        accidentDutyId: '',
        remark: '',
        claimAmount: '',
        actualAmount: ''
      },
      rules: {},
      apiName: 'accident/',
      addApi: 'addAccident',
      updateApi: 'updateAccident'
    }
  },
  mounted() {
    this.getOrderList()
    this.getDutyList()
    this.id && this.getDetail()
  },
  methods: {
    async getDutyList() {
      let {data} = await this.$http({
        url: 'accidentDuty/getAccidentDutyList'
      })
      if (data.code == 0) {
        this.dutyList = data.data
      }
    },
    async getOrderList() {
      let {data} = await this.$http({
        url: 'order/getOrderList',
        params: {
          companyId: sessionStorage.getItem('companyId'),
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
          accidentId: this.id
        }
      })
      if (data.code == 0) {
        this.formData = data.data
        this.formData.accidentId = this.id
      }
    }
  }
}
</script>
