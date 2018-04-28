<template>
  <div>
    <el-form-item :label="label" prop="driverId">
      <el-select v-model="xpid" filterable placeholder="可输入姓名筛选" @change="personChange">
        <el-option v-for="item in personList" :key="item.id" :label="item.personName" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="身份证号" prop="driverIdCardNum">
      <el-input v-model="xidCardNum" @change="$emit('update:idCardNum', xidCardNum)"></el-input>
    </el-form-item>
    <el-form-item label="手机号码" prop="driverMobile">
      <el-input v-model="xmobile" @change="$emit('update:mobile', xmobile)"></el-input>
    </el-form-item>
    <el-form-item label="从业资格证号" prop="driverQuaLicNum">
      <el-input v-model="xquaLicNum" @change="$emit('update:quaLicNum', xquaLicNum)"></el-input>
    </el-form-item>
  </div>
</template>
<script>
export default {
  data() {
    return {
      personList: [],
      xpid: this.pid,
      xidCardNum: this.idCardNum,
      xmobile: this.mobile,
      xquaLicNum: this.quaLicNum,
    }
  },
  props: 
    [
      'label',
      'type',
      'pid',
      'idCardNum',
      'mobile',
      'quaLicNum'
    ],
  mounted() {
    this.getPersonList()
  },
  methods: {
    async getPersonList() {
      let {data} = await this.$http({
        url: 'person/getPersonListAllContent',
        params: {
          typeId: this.type
        }
      })
      if (data.code == 0) {
        this.personList = data.data
      }
    },
    async personChange() {
      let {data} = await this.$http({
        url: 'person/getPerson',
        params: {
          personId: this.xpid
        }
      })
      if (data.code == 0) {
        this.xidCardNum = data.data.idCardNum
        this.xmobile = data.data.mobile
        this.xquaLicNum = data.data.qualificationLicenseNum
        this.$emit('update:pid', this.xpid)
      }
    }
  }
}
</script>
