<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="150px" size="medium">
      <el-form-item label="车队名称" prop="teamName">
        <el-input v-model="formData.teamName"></el-input>
      </el-form-item>
      <el-form-item label="负责人名称" prop="principalName">
        <el-input v-model="formData.principalName"></el-input>
      </el-form-item>
      <el-form-item label="负责人联系号码" prop="principalMobile">
        <el-input v-model="formData.principalMobile"></el-input>
      </el-form-item>
      <el-form-item label="车队安全责任状图片" prop="safeResponsibilityPath">
        <img-upload
          :path.sync="formData.safeResponsibilityPath">
        </img-upload>
      </el-form-item>
      <el-dialog :visible.sync="dialogVisible" append-to-body>
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" :loading="posting">保存</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import CarList from './car'
import saveMixin from '@/mixins/saveform'
import uploadMixin from '@/mixins/upload'
export default {
  mixins: [saveMixin, uploadMixin],
  data() {
    return {
      id: parseInt(this.$route.query.id),
      formData: {
        companyId: sessionStorage.getItem('companyId'),
        teamName: '',
        principalName: '',
        principalMobile: '',
        safeResponsibilityPath: ''
      },
      rules: {},
      apiName: 'carTeam/',
      addApi: 'addCarTeam',
      updateApi: 'updateCarTeam'
    }
  },
  mounted() {
    this.id && this.getDetail()
  },
  methods: {
    async getDetail() {
      let {data} = await this.$http({
        url: 'carTeam/getCarTeam',
        params: {
          carTeamId: this.id
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
