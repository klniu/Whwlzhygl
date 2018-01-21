<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="150px" size="medium">
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
        <el-dialog :visible.sync="dialogVisible" size="tiny">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="实际维护结束日期" prop="actualEndDate">
        <el-date-picker v-model="formData.actualEndDate" type="datetime" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
      </el-form-item>
      <el-form-item label="实际维护开始日期" prop="actualStartDate">
        <el-date-picker v-model="formData.actualStartDate" type="datetime" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
      </el-form-item>
      <el-form-item label="维护的车辆id" prop="carId">
        <el-cascader
          :options="carTeamList"
          @active-item-change="getCarList"
          @change="setCarId"
          :show-all-levels="false"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="确认人" prop="confirmPerson">
        <el-input v-model="formData.confirmPerson"></el-input>
      </el-form-item>
      <el-form-item label="此次维护里程" prop="currentMaintenanceMileage">
        <el-input v-model="formData.currentMaintenanceMileage"></el-input>
      </el-form-item>
      <el-form-item label="上一次维护里程" prop="lastMaintenanceMileage">
        <el-input v-model="formData.lastMaintenanceMileage"></el-input>
      </el-form-item>
      <el-form-item label="维护截止日期" prop="maintenanceEndDate">
        <el-date-picker v-model="formData.maintenanceEndDate" type="datetime" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
      </el-form-item>
      <el-form-item label="维修人" prop="maintenancePerson">
        <el-input v-model="formData.maintenancePerson"></el-input>
      </el-form-item>
      <el-form-item label="维护开始日期" prop="maintenanceStartDate">
        <el-date-picker v-model="formData.maintenanceStartDate" type="datetime" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" :loading="posting">保存</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <div v-if="id">
      <h3>二级维护计划详情列表：</h3>
      <maintenance-detail-list :id="id"></maintenance-detail-list>
    </div>
  </div>
</template>
<script>
import MaintenanceDetailList from './maintenance-detail'
import saveMixin from '@/mixins/saveform'
import uploadMixin from '@/mixins/upload'
export default {
  mixins: [uploadMixin, saveMixin],
  components: {
    MaintenanceDetailList
  },
  data() {
    return {
      id: parseInt(this.$route.query.id),
      formData: {
        accessoryNames: '',
        actualEndDate: '',
        actualStartDate: '',
        carId: '',
        companyId: 1,
        confirmPerson: '',
        currentMaintenanceMileage: 0,
        deviceMaintenanceId: 1,
        lastMaintenanceMileage: 0,
        maintenanceEndDate: '',
        maintenancePerson: '',
        maintenanceStartDate: ''
      },
      picsList: [],
      rules: {},
      apiName: 'maintenancePlan/',
      addApi: 'addMaintenancePlan',
      updateApi: 'updateMaintenancePlan',
      carTeamList: []
    }
  },
  mounted() {
    this.id && this.getDetail()
    this.getCarTeamList()
  },
  methods: {
    // TODO: carId默认值
    setCarId(val) {
      this.formData.carId = val[1]
    },
    async getCarList(val) {
      let {data} = await this.$http({
        url: '/car/getCarListAll',
        params: {
          carTeamId: this.carTeamList[val[0]].id
        }
      })
      if (data.code == 0) {
        this.carTeamList[val[0]].children = data.data.map(item => {
          return {
            label: item.plateNum,
            value: item.carId
          }
        })
      }
    },
    async getCarTeamList() {
      let {data} = await this.$http({
        url: '/carTeam/getCarTeamListAll',
        params: {
          companyId: 1
        }
      })
      if (data.code == 0) {
        this.carTeamList = data.data.map((item, i) => {
          return {
            label: item.teamName,
            value: i,
            id: item.carTeamId,
            children: []
          }
        })
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
        url: 'maintenancePlan/getMaintenancePlan',
        params: {
          maintenancePlanId: this.id
        }
      })
      if (data.code == 0) {
        this.formData = data.data
        this.formData.id = this.id
      }
    }
  }
}
</script>
