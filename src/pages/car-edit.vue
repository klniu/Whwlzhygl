<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="160px" size="medium">
      <el-form-item label="车牌" prop="plateNum">
        <el-input v-model="formData.plateNum"></el-input>
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
import uploadMixin from '@/mixins/upload'
import saveMixin from '@/mixins/saveform'
export default {
  mixins: [uploadMixin, saveMixin],
  data() {
    return {
      formData: {
        carTeamId: this.sid
      },
      rules: {},
      apiName: 'car/',
      addApi: 'addCar',
      updateApi: 'updateCar'
    }
  },
  props: {
    id: {
      type: Number
    },
    sid: {
      type: Number
    }
  },
  mounted() {
    this.id && this.getDetail()
  },
  methods: {
    async getDetail() {
      let {data} = await this.$http({
        url: 'car/getCar',
        params: {
          carId: this.id
        }
      })
      if (data.code == 0) {
        this.formData = data.data
        this.formData.id = this.id
        this.formData.carTeamId = this.sid
      }
    }
  }
}
</script>