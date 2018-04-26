<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="120px" :inline="true">
      <div class="order-row">
        <el-form-item label="路单单号" prop="orderNum">
          <el-input v-model="formData.orderNum" disabled></el-input>
        </el-form-item>
      </div>
      <div class="order-row">
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
      </div>
      <el-form :model="cusData" ref="cusForm" v-if="formData.customerId" label-width="120px" :inline="true">
        <div class="order-row">
          <el-form-item label="发货方联系人" prop="linkmanName">
            <el-input v-model="cusData.linkmanName"></el-input>
          </el-form-item>
          <el-form-item label="发货方号码" prop="linkmanMobile">
            <el-input v-model="cusData.linkmanMobile"></el-input>
          </el-form-item>
          <el-form-item label="发货地址" prop="sendAddrIds">
            <china-city :cityarr.sync="cusData.sendAddrIds"></china-city>
          </el-form-item>
          <el-form-item label="详细地址" prop="sendAddress">
            <el-input v-model="cusData.sendAddress"></el-input>
          </el-form-item>
        </div>
        <div class="order-row">
          <el-form-item label="收货方联系人" prop="receiveName">
            <el-input v-model="cusData.receiveName"></el-input>
          </el-form-item>
          <el-form-item label="收货方号码" prop="receiveMobile">
            <el-input v-model="cusData.receiveMobile"></el-input>
          </el-form-item>
          <el-form-item label="收货地址" prop="receiveAddrIds">
            <china-city :cityarr.sync="cusData.receiveAddrIds"></china-city>
          </el-form-item>
          <el-form-item label="详细地址" prop="receiveAddress">
            <el-input v-model="cusData.receiveAddress"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div class="order-row">
        <el-form-item label="头车车辆" prop="carId">
          <el-select v-model="formData.carId" filterable placeholder="输入车牌号筛选">
            <el-option
              v-for="item in carList"
              :key="item.carId"
              :label="item.carPlateNum"
              :value="item.carId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="挂车车辆" prop="trailerId">
          <el-select v-model="formData.trailerId" filterable placeholder="输入车牌号筛选">
            <el-option
              v-for="item in carList"
              :key="item.carId"
              :label="item.carPlateNum"
              :value="item.carId">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="order-row">
        <el-form-item label="货物" prop="goodsId">
          <el-select v-model="formData.goodsId" filterable placeholder="输入货物筛选">
            <el-option
              v-for="item in goodsList"
              :key="item.goodsId"
              :label="item.goodsName"
              :value="item.goodsId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="货物重量" prop="goodsWeight">
          <el-input v-model="formData.goodsWeight"></el-input>
        </el-form-item>
      </div>
      <div class="order-row">
        <el-form-item label="驾驶员" prop="driverId">
          <el-select v-model="formData.driverId" filterable placeholder="可输入姓名筛选" @change="personChange">
            <el-option v-for="item in personList" :key="item.id" :label="item.personName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="身份证号" prop="driverIdCardNum">
          <el-input v-model="formData.driverIdCardNum"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="driverMobile">
          <el-input v-model="formData.driverMobile"></el-input>
        </el-form-item>
        <el-form-item label="从业资格证号" prop="driverQuaLicNum">
          <el-input v-model="formData.driverQuaLicNum"></el-input>
        </el-form-item>
      </div>
      <div class="order-row">
        <el-form-item label="押运员" prop="escortId">
          <el-select v-model="formData.escortId" filterable placeholder="可输入姓名筛选" @change="personChange2">
            <el-option v-for="item in personList2" :key="item.id" :label="item.personName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="身份证号" prop="escortIdCardNum">
          <el-input v-model="formData.escortIdCardNum"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="escortMobile">
          <el-input v-model="formData.escortMobile"></el-input>
        </el-form-item>
        <el-form-item label="从业资格证号" prop="escortQuaLicNum">
          <el-input v-model="formData.escortQuaLicNum"></el-input>
        </el-form-item>
      </div>
      <div class="order-row">
        <el-form-item label="装货日期" prop="loadingTime">
          <el-date-picker v-model="formData.loadingTime" type="date" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
        </el-form-item>
        <el-form-item label="托运日期" prop="transportDate">
          <el-date-picker v-model="formData.transportDate" type="date" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
        </el-form-item>
        <el-form-item label="卸货日期" prop="unloadingTime">
          <el-date-picker v-model="formData.unloadingTime" type="date" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
        </el-form-item>
      </div>
      <div class="order-row">
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" :loading="posting">保存</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
import saveMixin from '@/mixins/saveform'
import ChinaCity from '@/components/china-city'
export default {
  mixins: [saveMixin],
  components: {
    ChinaCity
  },
  data() {
    return {
      id: parseInt(this.$route.query.id),
      apiName: 'order/',
      addApi: 'addOrder',
      updateApi: 'updateOrder',
      formData: {
        companyId: sessionStorage.getItem('companyId'),
        driverIdCardNum: '',
        driverMobile: '',
        driverQuaLicNum: '',
        escortIdCardNum: '',
        escortMobile: '',
        escortQuaLicNum: ''
      },
      cusData: {
        linkmanName: '',
        linkmanMobile: '',
        sendAddrIds: '[]',
        sendAddress: '',
        receiveName: '',
        receiveMobile: '',
        receiveAddrIds: '[]',
        receiveAddress: ''
      },
      customerList: [],
      carList: [],
      goodsList: [],
      personList: [],
      personList2: [],
      rules: {}
    }
  },
  mounted() {
    this.id ? this.getDetail() : this.getOrderNum()
    this.getCustomerList()
    this.getCarList()
    this.getGoodsList()
    this.getPersonList()
    this.getPersonList2()
  },
  methods: {
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
    beforePost() {
      this.cusSave()
    },
    async personChange() {
      let {data} = await this.$http({
        url: 'person/getPerson',
        params: {
          personId: this.formData.driverId
        }
      })
      if (data.code == 0) {
        this.formData.driverIdCardNum = data.data.idCardNum
        this.formData.driverMobile = data.data.mobile
        this.formData.driverQuaLicNum = data.data.qualificationLicenseNum
      }
    },
    async personChange2() {
      let {data} = await this.$http({
        url: 'person/getPerson',
        params: {
          personId: this.formData.escortId
        }
      })
      if (data.code == 0) {
        this.formData.escortIdCardNum = data.data.idCardNum
        this.formData.escortMobile = data.data.mobile
        this.formData.escortQuaLicNum = data.data.qualificationLicenseNum
      }
    },
    async getPersonList(tid) {
      let {data} = await this.$http({
        url: 'person/getPersonListAllContent',
        params: {
          typeId: 1
        }
      })
      if (data.code == 0) {
        this.personList = data.data
      }
    },
    async getPersonList2() {
      let {data} = await this.$http({
        url: 'person/getPersonListAllContent',
        params: {
          typeId: 2
        }
      })
      if (data.code == 0) {
        this.personList2 = data.data
      }
    },
    async getGoodsList() {
      let {data} = await this.$http({
        url: '/goods/getGoodsListAllContent'
      })
      if (data.code == 0) {
        this.goodsList = data.data
      }
    },
    async getCarList() {
      let {data} = await this.$http({
        url: '/car/getCarListAll'
      })
      if (data.code == 0) {
        this.carList = data.data
      }
    },
    async getOrderNum() {
      let {data} = await this.$http({
        url: 'order/getOrderNum',
        params: {
          companyId: sessionStorage.getItem('companyId')
        }
      })
      if (data.code == 0) {
        this.formData.orderNum = data.data
      }
    },
    async getCustomerList() {
      let {data} = await this.$http({
        url: 'customer/getCustomerListAllContent',
        params: {
          companyId: sessionStorage.getItem('companyId')
        }
      })
      if (data.code == 0) {
        this.customerList = data.data
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
        this.formData.customerId && this.cusChange()
      }
    }
  }
}
</script>
<style>
.el-form--inline .el-form-item__content{
  width: 200px;
}
.order-row .el-date-editor.el-input{
  width: 200px;
}
/* .order-row{
  border-top: 1px solid #aaa;
  padding-top: 10px;
} */
</style>
