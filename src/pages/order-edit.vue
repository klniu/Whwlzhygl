<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="150px" size="medium">
      <el-form-item label="路单单号" prop="orderNum">
        <el-input v-model="formData.orderNum"></el-input>
      </el-form-item>
      <el-form-item label="客户" prop="customerId">
        <el-select v-model="formData.customerId" :loading="loadingCustomer" filterable>
          <el-option
            v-for="item in customerList"
            :key="item.customerId"
            :label="item.customerName"
            :value="item.customerId"
          ></el-option>
          <div class="select-more" v-if="moreCustomerBt" @click="getCustomerList">点击加载更多</div>
        </el-select>
      </el-form-item>
      <el-form-item label="货物" prop="goodsId">
        <el-select v-model="formData.goodsId" :loading="loadingGoods" filterable>
          <el-option
            v-for="item in goodsList"
            :key="item.goodsId"
            :label="item.goodsName"
            :value="item.goodsId"
          ></el-option>
          <div class="select-more" v-if="moreGoodsBt" @click="getGoodsList">点击加载更多</div>
        </el-select>
      </el-form-item>
      <el-form-item label="货物重量" prop="goodsWeight">
        <el-input v-model="formData.goodsWeight"></el-input>
      </el-form-item>
      <el-form-item label="托运日期" prop="transportDate">
        <el-date-picker v-model="formData.transportDate" type="datetime" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
      </el-form-item>
      <el-form-item label="装货日期" prop="loadingTime">
        <el-date-picker v-model="formData.loadingTime" type="datetime" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" :loading="posting">保存</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <div v-if="id">
      <h3>电子路单详情列表：</h3>
      <!-- <maintenance-detail-list :id="id"></maintenance-detail-list> -->
    </div>
  </div>
</template>
<script>
// import MaintenanceDetailList from './maintenance-detail'
import saveMixin from '@/mixins/saveform'
export default {
  mixins: [saveMixin],
  // components: {
  //   MaintenanceDetailList
  // },
  data() {
    return {
      id: parseInt(this.$route.query.id),
      formData: {
        companyId: 1,
        customerId: '',
        goodsId: '',
        goodsWeight: '',
        loadingTime: '',
        orderNum: '',
        transportDate: '',
      },
      rules: {},
      apiName: 'order/',
      addApi: 'addOrder',
      updateApi: 'updateOrder',
      customerList: [],
      customerPage: 0,
      loadingCustomer: false,
      moreCustomerBt: false,
      goodsList: [],
      goodsPage: 0,
      loadingGoods: false,
      moreGoodsBt: false
    }
  },
  mounted() {
    this.id && this.getDetail()
    this.getCustomerList()
    this.getGoodsList()
  },
  methods: {
    async getDetail() {
      let {data} = await this.$http({
        url: 'order/getOrder',
        params: {
          orderId: this.id
        }
      })
      if (data.code == 0) {
        this.formData = data.data
        this.formData.id = this.id
      }
    },
    async getCustomerList() {
      this.customerPage ++
      this.loadingCustomer = true
      let {data} = await this.$http({
        url: 'customer/getCustomerList',
        params: {
          companyId: 1,
          currentPage: this.customerPage,
          size: 50
        }
      })
      if (data.code == 0) {
        this.moreCustomerBt = data.data.hasNextPage
        if (data.data.list.length > 0) {
          this.customerList = this.customerList.concat(data.data.list)
        } else {
          this.$message('没有更多记录')
        }
      }
      this.loadingCustomer = false
    },
    async getGoodsList() {
      this.goodsPage ++
      this.loadingGoods = true
      let {data} = await this.$http({
        url: 'goods/getGoodsList',
        params: {
          companyId: 1,
          currentPage: this.goodsPage,
          size: 50
        }
      })
      if (data.code == 0) {
        this.moreGoodsBt = data.data.hasNextPage
        if (data.data.list.length > 0) {
          this.goodsList = this.goodsList.concat(data.data.list)
        } else {
          this.$message('没有更多记录')
        }
      }
      this.loadingGoods = false
    }
  }
}
</script>
<style>
.select-more{
  font-size: 12px;
  text-align: center;
  color: #aaa;
  cursor: pointer;
}
</style>
