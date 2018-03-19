<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="100px" size="medium">
      <el-form-item label="违章驾驶人" prop="regulationPerson">
        <el-input v-model="formData.regulationPerson"></el-input>
      </el-form-item>
      <el-form-item label="违章车辆" prop="carId">
        <el-autocomplete
          v-model="strPlateNum"
          :fetch-suggestions="getCarList"
          placeholder="输入车牌号筛选"
          @select="setCarId"
        ></el-autocomplete>
        <el-select v-model="carTeamId" placeholder="选择车队筛选" clearable>
          <el-option v-for="item in carTeamList" :key="item.carTeamId" :label="item.teamName" :value="item.carTeamId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="违章时间" prop="regulationTime">
        <el-date-picker v-model="formData.regulationTime" type="datetime" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
      </el-form-item>
      <el-form-item label="违章地址" prop="regulationAddress">
        <el-input v-model="formData.regulationAddress"></el-input>
      </el-form-item>
      <el-form-item label="该记录状态" prop="recordStatus">
        <el-radio-group v-model="formData.recordStatus">
          <el-radio :label="0">已处理</el-radio>
          <el-radio :label="1">未处理</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="违章类型" prop="regulationType">
        <el-radio-group v-model="formData.regulationType">
          <el-radio :label="0">交通违法</el-radio>
          <el-radio :label="1">不安全行为</el-radio>
        </el-radio-group>
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
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" :loading="posting">保存</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import saveMixin from '@/mixins/saveform'
import uploadMixin from '@/mixins/upload'
export default {
  mixins: [uploadMixin, saveMixin],
  data() {
    return {
      id: parseInt(this.$route.query.id),
      formData: {
        companyId: sessionStorage.getItem('companyId'),
        regulationPerson: '',
        carId: '',
        regulationTime: '',
        regulationAddress: '',
        recordStatus: '',
        accessoryNames: '',
        regulationType: ''
      },
      picsList: [],
      rules: {},
      apiName: 'regulationRecord/',
      addApi: 'addRegulationRecord',
      updateApi: 'updateRegulationRecord',
      carTeamList: [],
      carTeamId: '',
      strPlateNum: ''
    }
  },
  mounted() {
    this.id && this.getDetail()
    this.getCarTeamList()
  },
  methods: {
    async getCarName() {
      let {data} = await this.$http({
        url: '/car/getCar',
        params: {
          carId: this.formData.carId
        }
      })
      if (data.code == 0) {
        this.strPlateNum = data.data.plateNum
      }
    },
    setCarId(val) {
      this.formData.carId = val.id
    },
    async getCarList(keyword, cb) {
      let {data} = await this.$http({
        url: '/car/getCarListAll',
        params: {
          plateNum: keyword,
          carTeamId: this.carTeamId
        }
      })
      if (data.code == 0) {
        cb(data.data.map(item => {
          return {
            id: item.carId,
            value: item.plateNum
          }
        }))
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
        url: 'regulationRecord/getRegulationRecord',
        params: {
          regulationRecordId: this.id
        }
      })
      if (data.code == 0) {
        this.formData = data.data
        this.formData.id = this.id
        this.picsList = this.pushPicInitList(this.formData.accessoryNames)
      }
    },
    beforePost() {
      this.formData.accessoryNames = this.joinPicIntoString(this.picsList)
    }
  }
}
</script>
