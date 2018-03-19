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
        <el-form-item label="头车车牌号" prop="carId">
          <el-select v-model="formData.carId" filterable placeholder="可输入车牌号筛选" @change="carChange1">
            <el-option v-for="item in carList" :key="item.carId" :label="item.plateNum" :value="item.carId"></el-option>
          </el-select>
          <el-select v-model="carTeamId" @change="getCarList" placeholder="选择车队筛选" clearable>
            <el-option v-for="item in carTeamList" :key="item.carTeamId" :label="item.teamName" :value="item.carTeamId"></el-option>
          </el-select>
        </el-form-item>
        <el-form :model="carData1" ref="carForm1" v-if="formData.carId" label-width="150px">
          <el-form-item label="营运证号" prop="roadTransportNum">
            <el-input v-model="carData1.roadTransportNum"></el-input>
          </el-form-item>
        </el-form>
        <el-form-item label="挂车车牌号" prop="trailerId">
          <el-select v-model="formData.trailerId" filterable placeholder="可输入车牌号筛选" @change="carChange2">
            <el-option v-for="item in carList2" :key="item.carId" :label="item.plateNum" :value="item.carId"></el-option>
          </el-select>
          <el-select v-model="carTeamId2" @change="getCarList2" placeholder="选择车队筛选" clearable>
            <el-option v-for="item in carTeamList" :key="item.carTeamId" :label="item.teamName" :value="item.carTeamId"></el-option>
          </el-select>
        </el-form-item>
        <el-form :model="carData2" ref="carForm2" v-if="formData.trailerId" label-width="150px">
          <el-form-item label="营运证号" prop="roadTransportNum">
            <el-input v-model="carData2.roadTransportNum"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="form-title">人员信息</div>
      <div class="form-block">
        <el-form-item label="押运员" prop="escortId">
          <el-select v-model="formData.escortId" filterable placeholder="可输入姓名筛选" @change="personChange1">
            <el-option v-for="item in personList" :key="item.id" :label="item.personName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form :model="personData1" ref="personForm1" v-if="formData.escortId" label-width="150px">
          <el-form-item label="从业资格证号" prop="qualificationLicenseNum">
            <el-input v-model="personData1.qualificationLicenseNum"></el-input>
          </el-form-item>
        </el-form>
        <el-form-item label="驾驶员" prop="driverId">
          <el-select v-model="formData.driverId" filterable placeholder="可输入姓名筛选" @change="personChange2">
            <el-option v-for="item in personList2" :key="item.id" :label="item.personName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form :model="personData2" ref="personForm2" v-if="formData.driverId" label-width="150px">
          <el-form-item label="从业资格证号" prop="qualificationLicenseNum">
            <el-input v-model="personData2.qualificationLicenseNum"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="form-title">其他信息</div>
      <div class="form-block">
        <el-form-item label="托运日期" prop="transportDate">
          <el-date-picker v-model="formData.transportDate" type="date" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
        </el-form-item>
        <el-form-item label="装货日期" prop="loadingTime">
          <el-date-picker v-model="formData.loadingTime" type="date" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
        </el-form-item>
        <el-form-item label="卸货日期" prop="unloadingTime">
          <el-date-picker v-model="formData.unloadingTime" type="date" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
        </el-form-item>
      </div>
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
        companyId: sessionStorage.getItem('companyId'),
        customerId: '',
        goodsId: '',
        goodsWeight: '',
        loadingTime: '',
        orderNum: '',
        transportDate: '',
        carId: '',
        trailerId: '',
        escortId: '',
        driverId: '',
        unloadingTime: ''
      },
      cusData: {
        linkmanMobile: '',
        sendAddress: '',
        receiveAddress: ''
      },
      carData1: {
        roadTransportNum: ''
      },
      carData2: {
        roadTransportNum: ''
      },
      personData1: {
        qualificationLicenseNum: ''
      },
      personData2: {
        qualificationLicenseNum: ''
      },
      rules: {},
      apiName: 'order/',
      addApi: 'addOrder',
      updateApi: 'updateOrder',
      customerList: [],
      goodsList: [],
      goodsPage: 0,
      loadingGoods: false,
      moreGoodsBt: false,
      carTeamList: [],
      carList: [],
      carList2: [],
      carTeamId: '',
      carTeamId2: '',
      personList: [],
      personList2: [],
    }
  },
  mounted() {
    this.id && this.getDetail()
    this.getCustomerList()
    this.getGoodsList()
    this.getCarTeamList()
    this.getCarList()
    this.getCarList2()
    this.getPersonList()
    this.getPersonList2()
  },
  methods: {
    async getPersonList(tid) {
      let {data} = await this.$http({
        url: 'person/getPersonListAllContent',
        params: {
          typeId: 2
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
          typeId: 1
        }
      })
      if (data.code == 0) {
        this.personList2 = data.data
      }
    },
    async getCarList(tid) {
      let {data} = await this.$http({
        url: 'car/getCarListAll',
        params: {
          carTeamId: this.carTeamId,
          carType: 0
        }
      })
      if (data.code == 0) {
        this.carList = data.data
      }
    },
    async getCarList2() {
      let {data} = await this.$http({
        url: 'car/getCarListAll',
        params: {
          carTeamId: this.carTeamId2,
          carType: 1
        }
      })
      if (data.code == 0) {
        this.carList2 = data.data
      }
    },
    async getCarTeamList() {
      let {data} = await this.$http({
        url: '/carTeam/getCarTeamListAll',
        params: {
          companyId: sessionStorage.getItem('companyId')
        }
      })
      if (data.code == 0) {
        this.carTeamList = data.data
      }
    },
    beforePost() {
      this.cusSave()
      this.carSave1()
      this.carSave2()
      this.personSave1()
      this.personSave2()
    },
    async personSave1() {
      let {data} = await this.$http({
        method: 'post',
        url: 'person/updatePerson',
        data: this.personData1
      })
      if (data.code != 0) {
        this.$message.error(data.msg)
      }
    },
    async personChange1() {
      let {data} = await this.$http({
        url: 'person/getPerson',
        params: {
          personId: this.formData.escortId
        }
      })
      if (data.code == 0) {
        this.personData1 = data.data || this.personData1
      }
    },
    async personSave2() {
      let {data} = await this.$http({
        method: 'post',
        url: 'person/updatePerson',
        data: this.personData2
      })
      if (data.code != 0) {
        this.$message.error(data.msg)
      }
    },
    async personChange2() {
      let {data} = await this.$http({
        url: 'person/getPerson',
        params: {
          personId: this.formData.driverId
        }
      })
      if (data.code == 0) {
        this.personData2 = data.data || this.personData2
      }
    },
    async carSave2() {
      let {data} = await this.$http({
        method: 'post',
        url: 'car/updateCar',
        data: this.carData2
      })
      if (data.code != 0) {
        this.$message.error(data.msg)
      }
    },
    async carChange2() {
      let {data} = await this.$http({
        url: 'car/getCar',
        params: {
          carId: this.formData.trailerId
        }
      })
      if (data.code == 0) {
        this.carData2 = data.data || this.carData2
      }
    },
    async carSave1() {
      let {data} = await this.$http({
        method: 'post',
        url: 'car/updateCar',
        data: this.carData1
      })
      if (data.code != 0) {
        this.$message.error(data.msg)
      }
    },
    async carChange1() {
      let {data} = await this.$http({
        url: 'car/getCar',
        params: {
          carId: this.formData.carId
        }
      })
      if (data.code == 0) {
        this.carData1 = data.data || this.carData1
      }
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
        this.carChange1()
        this.carChange2()
        this.personChange1()
        this.personChange2()
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
    async getGoodsList() {
      this.goodsPage ++
      this.loadingGoods = true
      let {data} = await this.$http({
        url: 'goods/getGoodsList',
        params: {
          companyId: sessionStorage.getItem('companyId'),
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
