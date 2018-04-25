<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="100px" size="medium">
      <el-form-item label="检查项表" prop="hiddenDangerCheckContentId">
        <el-select v-model="formData.hiddenDangerCheckContentId" placeholder="请选择">
          <el-option v-for="item in dangeritemList" :key="item.id" :label="item.checkContent" :value="item.id"></el-option>
        </el-select>
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
      <el-form-item label="检查日期" prop="checkDate">
        <el-date-picker v-model="formData.checkDate" type="datetime" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
      </el-form-item>
      <el-form-item label="检查结果" prop="checkResult">
        <el-input v-model="formData.checkResult"></el-input>
      </el-form-item>
      <el-form-item label="整改要求" prop="reformRequest">
        <el-input v-model="formData.reformRequest"></el-input>
      </el-form-item>
      <el-form-item label="整改结果" prop="reformResult">
        <el-input v-model="formData.reformResult"></el-input>
      </el-form-item>
      <el-form-item label="整改完成日期" prop="completeDate">
        <el-date-picker v-model="formData.completeDate" type="datetime" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="formData.remark"></el-input>
      </el-form-item>
      <el-form-item label="附件照片" prop="accessoryNames">
        <el-upload
          :action="$baseURL + 'accessory/addAccessory'"
          :file-list="picsList"
          :on-success="handleUpload"
          :on-remove="handleRemove"
          :on-preview="handlePictureCardPreview"
          list-type="picture-card">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-dialog :visible.sync="dialogVisible" append-to-body>
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
      <el-form-item>
        <el-button type="warning" v-if="target" @click="reform">整改</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')" :loading="posting">保存</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import saveMixin from '@/mixins/saveform'
import uploadMixin from '@/mixins/upload'
import reform from '@/mixins/reform'
export default {
  mixins: [saveMixin, uploadMixin, reform],
  data() {
    return {
      id: parseInt(this.$route.query.id),
      dangeritemList: [],
      formData: {
        companyId: sessionStorage.getItem('companyId'),
        hiddenDangerCheckContentId: '',
        checkPerson: '',
        checkDate: '',
        checkResult: '',
        reformRequest: '',
        reformResult: '',
        completeDate: '',
        remark: '',
        accessoryNames: ''
      },
      picsList: [],
      personList: [],
      rules: {},
      apiName: 'hiddenDangerCheckRecord/',
      addApi: 'addHiddenDangerCheckRecord',
      updateApi: 'updateHiddenDangerCheckRecord'
    }
  },
  mounted() {
    this.getDangerItemList()
    this.id && this.getDetail()
    this.getPersonList()
  },
  methods: {
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
    beforePost() {
      this.formData.accessoryNames = this.joinPicIntoString(this.picsList)
    },
    async getDangerItemList() {
      let {data} = await this.$http({
        url: 'hiddenDangerCheckContent/getHiddenDangerCheckContentList',
        params: {
          companyId: sessionStorage.getItem('companyId'),
          currentPage: 1,
          size: 50
        }
      })
      if (data.code == 0) {
        this.dangeritemList = data.data.list
      }
    },
    async getDetail() {
      let {data} = await this.$http({
        url: 'hiddenDangerCheckRecord/getHiddenDangerCheckRecord',
        params: {
          hiddenDangerCheckRecordId: this.id
        }
      })
      if (data.code == 0) {
        this.formData = data.data
        this.picsList = this.pushPicInitList(this.formData.accessoryNames)
      }
    }
  }
}
</script>
