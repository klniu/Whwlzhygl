<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="100px" size="medium">
      <el-form-item label="货物名称" prop="goodsName">
        <el-input v-model="formData.goodsName"></el-input>
      </el-form-item>
      <el-form-item label="货物类别" prop="goodsCategoryId">
        <el-select v-model="formData.goodsCategoryId" placeholder="请选择">
          <el-option v-for="item in goodsTypeList" :key="item.id" :label="item.categoryName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="货物包装类型" prop="goodsPackage">
        <el-input v-model="formData.goodsPackage"></el-input>
      </el-form-item>
      <el-form-item label="计量单位" prop="unit">
        <el-input v-model="formData.unit"></el-input>
      </el-form-item>
      <el-form-item label="安全卡" prop="safeCardPath">
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
      id: parseInt(this.$route.query.id),
      formData: {
        goodsCategoryId: 0,
        goodsName: '',
        goodsPackage: '',
        safeCardPath: '',
        unit: ''
      },
      picsList: [],
      rules: {},
      apiName: 'goods/',
      addApi: 'addGoods',
      updateApi: 'updateGoods',
      goodsTypeList: []
    }
  },
  mounted() {
    this.id && this.getDetail()
    this.getGoodsTypeList()
  },
  methods: {
    async getGoodsTypeList() {
      let {data} = await this.$http('goodsCategory/getGoodsCategoryList')
      if (data.code == 0) {
        this.goodsTypeList = data.data.list
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
        url: 'goods/getGoods',
        params: {
          goodsId: this.id
        }
      })
      if (data.code == 0) {
        this.formData = data.data
        this.formData.id = this.id
        this.picsList = this.pushPicInitList(this.formData.safeCardPath)
      }
    },
    beforePost() {
      this.formData.safeCardPath = this.joinPicIntoString(this.picsList)
    }
  }
}
</script>
