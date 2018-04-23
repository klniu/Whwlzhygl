<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="150px" size="medium">
      <el-form-item label="车辆" prop="carId">
        <el-select v-model="formData.carId" filterable placeholder="输入车牌号筛选">
          <el-option
            v-for="item in carList"
            :key="item.carId"
            :label="item.carPlateNum"
            :value="item.carId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="检查类型" prop="checktype">
        <el-radio-group v-model="formData.checktype">
          <el-radio :label="0">场地检查</el-radio>
          <el-radio :label="1">场外检查</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="检查日期" prop="checkDate">
        <el-date-picker v-model="formData.checkDate" type="date" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
      </el-form-item>
      <el-form-item label="检查人" prop="personIds">
        <el-select
          v-model="formData.personIds"
          multiple
          filterable
          placeholder="请选择人员">
          <el-option
            v-for="item in personList"
            :key="item.personId"
            :label="item.personName"
            :value="item.personId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="附件照片名称" prop="accessoryNames">
        <el-upload
          :action="$baseURL + 'accessory/addAccessory'"
          :file-list="picsList"
          :on-success="handleUpload"
          :on-remove="handleRemove"
          :on-preview="handlePictureCardPreview"
          list-type="picture-card">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="整改请求" prop="reformRequest">
        <el-input v-model="formData.reformRequest"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" :loading="posting">保存</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <div v-if="id">
      <h3>检查项</h3>
      <check-list :id="id"></check-list>
    </div>
  </div>
</template>
<script>
import CheckList from './car-check'
import saveMixin from '@/mixins/saveform'
import uploadMixin from '@/mixins/upload'
export default {
  mixins: [uploadMixin, saveMixin],
  components: {
    CheckList
  },
  data() {
    return {
      id: parseInt(this.$route.query.id),
      orderIdList: [],
      formData: {
        companyId: sessionStorage.getItem('companyId'),
        carId: '',
        checkDate: '',
        checkPerson: '',
        accessoryNames: '',
        reformRequest: ''
      },
      picsList: [],
      personList: [],
      rules: {},
      apiName: 'carCheckRecord/',
      addApi: 'addCarCheckRecord',
      updateApi: 'updateCarCheckRecord',
      carList: []
    }
  },
  mounted() {
    this.id && this.getDetail()
    this.getPersonList()
    this.getCarList()
  },
  methods: {
    async getCarList() {
      let {data} = await this.$http({
        url: '/car/getCarListAll'
      })
      if (data.code == 0) {
        this.carList = data.data
      }
    },
    async getPersonList() {
      let {data} = await this.$http('person/getPersonListAll')
      if (data.code == 0) {
        this.personList = data.data
      }
    },
    handleRemove(file, list) {
      this.picsList = list
    },
    handleUpload(res) {
      if (res.code == 0) {
        this.picsList.push({name: res.data.accessoryName, url: this.$baseURL + res.data.accessoryName})
      }
    },
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