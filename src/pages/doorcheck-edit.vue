<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="200px" size="medium">
      <el-form-item :label="item.content" prop="id" v-for="item in caritemList" :key="item.id" v-if="item">
        <el-radio-group v-model="item.result">
          <el-radio :label="0">是</el-radio>
          <el-radio :label="1">否</el-radio>
        </el-radio-group>
        <img-upload
          v-if="item.result == 1"
          :path.sync="item.photoPath">
        </img-upload>
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
      <el-form-item label="检查类型" prop="checktype">
        <el-radio-group v-model="formData.checktype">
          <el-radio :label="0">场地检查</el-radio>
          <el-radio :label="1">场外检查</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="存在的问题" prop="existQuestion">
        <el-input v-model="formData.existQuestion"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="warning" v-if="target" @click="reform">整改</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')" :loading="posting">保存</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import ImgUpload from '@/components/img-upload'
import saveMixin from '@/mixins/saveform'
import reform from '@/mixins/reform'
export default {
  mixins: [saveMixin, reform],
  components: {
    ImgUpload
  },
  data() {
    return {
      id: parseInt(this.$route.query.id),
      caritemList: [],
      formData: {
        companyId: sessionStorage.getItem('companyId'),
      },
      personList: [],
      rules: {},
      imageUrl: '',
      apiName: 'carCheckRecord/',
      addApi: 'addCarCheckRecord',
      updateApi: 'updateCarCheckRecord'
    }
  },
  mounted() {
    this.id ? this.getDetail() : this.getDangerItemList()
    this.getPersonList()
  },
  methods: {
    beforePost() {
      this.formData.contents = this.caritemList
    },
    async getPersonList() {
      let {data} = await this.$http('person/getPersonListAll')
      if (data.code == 0) {
        this.personList = data.data
      }
    },
    async getDangerItemList() {
      let {data} = await this.$http({
        url: 'carCheckContent/getCarCheckContentList'
      })
      if (data.code == 0) {
        this.caritemList = data.data
        for (let i;i < this.caritemList.length; i++){
          this.caritemList[i].result = null
        }
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
        this.caritemList = this.formData.contents
      }
    }
  }
}
</script>
