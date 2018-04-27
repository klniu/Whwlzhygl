<template>
  <div>
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
  </div>
</template>
<script>
import uploadMixin from '@/mixins/upload'
export default {
  mixins: [uploadMixin],
  data() {
    return {
      picsList: this.pushPicInitList(this.path),
    }
  },
  props: {
    path: [String]
  },
  methods: {
    handleUpload(res) {
      if (res.code == 0) {
        this.picsList.push({name: res.data.accessoryName, url: this.$baseURL + res.data.accessoryName})
        this.$emit('update:path', this.joinPicIntoString(this.picsList))
      }
    },
    handleRemove(file, list) {
      this.picsList = list
      this.$emit('update:path', this.joinPicIntoString(this.picsList))
    }
  }
}
</script>
