<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="120px">
      <el-form-item label="培训会议主题" prop="meetingTitle" required>
        <el-input v-model="formData.meetingTitle"></el-input>
      </el-form-item>
      <el-form-item label="参加人员" prop="joinPerson">
        <el-input v-model="formData.joinPerson"></el-input>
      </el-form-item>
      <el-form-item label="参加地址" prop="joinAddress">
        <el-input v-model="formData.joinAddress"></el-input>
      </el-form-item>
      <el-form-item label="主持人" prop="compere">
        <el-input v-model="formData.compere"></el-input>
      </el-form-item>
      <el-form-item label="记录人" prop="recordPerson">
        <el-input v-model="formData.recordPerson"></el-input>
      </el-form-item>
      <el-form-item label="会议内容" prop="meetingContent">
        <el-input type="textarea" v-model="formData.meetingContent"></el-input>
      </el-form-item>
      <el-form-item label="会议时间" prop="meetingDate">
        <el-date-picker v-model="formData.meetingDate" type="datetime" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
      </el-form-item>
      <el-form-item label="签到" prop="signInIds">
        <el-select v-model="formData.signInIds" multiple placeholder="请选择">
          <el-option
            v-for="item in personList"
            :key="item.personId"
            :label="item.personName"
            :value="item.personId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="附件" prop="pic">
        <el-upload
          :action="$baseURL + 'accessory/addAccessory'"
          :file-list="fileList"
          :on-success="handleUpload"
          :on-remove="handleRemove">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// TODO: 人员管理编辑页
import saveMixin from '@/mixins/saveform'
import uploadMixin from '@/mixins/upload'
export default {
  mixins: [uploadMixin, saveMixin],
  data() {
    return {
      id: parseInt(this.$route.query.id),
      formData: {
        companyId: 1,
        meetingTitle: '',
        joinPerson: '',
        joinAddress: '',
        compere: '',
        recordPerson: '',
        meetingContent: '',
        meetingDate: '',
        accessoryNames: ''
      },
      rules: {},
      apiName: 'meeting/',
      addApi: 'addMeeting',
      updateApi: 'updateMeeting',
      fileList: [],
      personList: []
    }
  },
  mounted() {
    this.getPersonList()
    this.id && this.getDetail()
  },
  methods: {
    async getPersonList() {
      let {data} = await this.$http('person/getPersonListAll')
      if (data.code == 0) {
        this.personList = data.data
      }
    },
    handleRemove(file, list) {
      this.fileList = list
    },
    handleUpload(res) {
      if (res.code == 0) {
        this.fileList.push({name: res.data.accessoryName, url: this.$baseURL + res.data.accessoryName})
      }
    },
    beforePost() {
      this.formData.accessoryNames = this.joinPicIntoString(this.fileList)
    },
    async getDetail() {
      let {data} = await this.$http({
        url: 'meeting/getMeeting',
        params: {
          meetingId: this.id
        }
      })
      if (data.code == 0) {
        this.formData = data.data
        this.formData.id = this.id
        this.fileList = this.pushPicInitList(this.formData.accessoryNames)
      }
    }
  }
}
</script>
