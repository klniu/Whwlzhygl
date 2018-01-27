<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="120px" size="medium">
      <el-form-item label="汽车门检项目" prop="carCheckContentId">
        <el-select v-model="formData.carCheckContentId" placeholder="请选择">
          <el-option v-for="item in contentList" :key="item.id" :label="item.content" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="检查结果" prop="result">
        <el-checkbox v-model="formData.result" true-label="合格" false-label="不合格"/>
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
      formData: {
        carCheckContentId: '',
        result: '',
        carCheckRecordId: this.sid
      },
      contentList: [],
      rules: {},
      apiName: 'carCheckRecordDetail/',
      addApi: 'addCarCheckRecordDetail',
      updateApi: 'updateCarCheckRecordDetail'
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
    this.getContentList()
  },
  methods: {
    async getContentList() {
      let {data} = await this.$http({
        url: 'carCheckContent/getCarCheckContentList'
      })
      if (data.code == 0) {
        this.contentList = data.data.list
      }
    },
    async getDetail() {
      let {data} = await this.$http({
        url: 'carCheckRecordDetail/getCarCheckRecordDetail',
        params: {
          carCheckRecordDetailId: this.id
        }
      })
      if (data.code == 0) {
        this.formData = data.data
        this.formData.id = this.id
        this.formData.carCheckRecordId = this.sid
      }
    }
  }
}
</script>
