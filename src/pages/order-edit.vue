<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="150px" size="medium">
      <div class="form-title">客户信息</div>
      <div class="form-block">
        <el-form-item label="路单单号" prop="orderNum">
          <el-input v-model="formData.orderNum"></el-input>
        </el-form-item>
        <el-form-item label="客户" prop="customerId">
          <el-select v-model="formData.customerId" filterable @change="cusChange">
            <el-option
              v-for="item in customerList"
              :key="item.customerId"
              :label="item.customerName"
              :value="item.customerId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form :model="cusData" ref="cusForm" v-if="formData.customerId" label-width="150px">
          <el-form-item label="联系号码" prop="linkmanMobile">
            <el-input v-model="cusData.linkmanMobile"></el-input>
          </el-form-item>
          <el-form-item label="发货地址" prop="sendAddress">
            <el-input v-model="cusData.sendAddress"></el-input>
          </el-form-item>
          <el-form-item label="收货地址" prop="receiveAddress">
            <el-input v-model="cusData.receiveAddress"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="form-title">货物信息</div>
      <div class="form-block">
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
      </div>
      <div class="form-title">车辆信息</div>
      <div class="form-block">
      </div>
      <div class="form-title">人员信息</div>
      <div class="form-block">
      </div>
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
  </div>
</template>
<script>
import saveMixin from '@/mixins/saveform'
export default {
  mixins: [saveMixin],
  data() {
    return {
      id: parseInt(this.$route.query.id),
      formData: {
        companyId: localStorage.getItem('companyId'),
        customerId: '',
        goodsId: '',
        goodsWeight: '',
        loadingTime: '',
        orderNum: '',
        transportDate: '',
      },
      cusData: {
        linkmanMobile: '',
        sendAddress: '',
        receiveAddress: ''
      },
      rules: {},
      apiName: 'order/',
      addApi: 'addOrder',
      updateApi: 'updateOrder',
      customerList: [],
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
    beforePost() {
      this.cusSave()
    },
    async cusSave() {
      let {data} = await this.$http({
        method: 'post',
        url: 'customer/updateCustomer',
        data: this.cusData
      })
      if (data.code != 0) {
        this.$message.error(data.msg)
      }
    },
    async cusChange() {
      let {data} = await this.$http({
        url: 'customer/getCustomer',
        params: {
          customerId: this.formData.customerId
        }
      })
      if (data.code == 0) {
        this.cusData = data.data
      }
    },
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
        this.cusChange()
      }
    },
    async getCustomerList() {
      let {data} = await this.$http({
        url: 'customer/getCustomerListAllContent',
        params: {
          companyId: localStorage.getItem('companyId')
        }
      })
      if (data.code == 0) {
        this.customerList = data.data
      }
    },
    async getGoodsList() {
      this.goodsPage ++
      this.loadingGoods = true
      let {data} = await this.$http({
        url: 'goods/getGoodsList',
        params: {
          companyId: localStorage.getItem('companyId'),
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
.form-title{
  margin: 10px 0;
}
.form-block{
  padding: 10px;
  border: 1px solid #ebebeb;
  border-radius: 3px;
  transition: .2s;
}
.form-block:hover{
  box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);
}
</style>
