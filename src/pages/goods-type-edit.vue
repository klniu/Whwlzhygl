<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="100px" size="medium">
      <el-form-item label="类别名称" prop="categoryName">
        <el-input v-model="formData.categoryName"></el-input>
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
      id: parseInt(this.$route.query.id),
      formData: {
        categoryName: '',
      },
      rules: {},
      apiName: 'goodsCategory/',
      addApi: 'addGoodsCategory',
      updateApi: 'updateGoodsCategory'
    }
  },
  mounted() {
    this.id && this.getDetail()
  },
  methods: {
    async getDetail() {
      let {data} = await this.$http({
        url: 'goodsCategory/getGoodsCategory',
        params: {
          goodsCategoryId: this.id
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
