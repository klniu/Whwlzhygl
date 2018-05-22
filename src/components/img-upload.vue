<template>
  <div>
    <el-upload
      :action="$baseURL + 'accessory/addAccessory'"
      :data="uploadData"
      :file-list="picsList"
      :on-success="handleUpload"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
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
      // picsList: this.pushPicInitList(this.path),
    }
  },
  computed: {
    picsList() {
      return this.pushPicInitList(this.path)
    }
  },
  props: {
    path: [String],
    uploadData: {
      default() {
        return {}
      }
    }
  },
  methods: {
    beforeRemove(file, list) {
      return this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
    },
    handleUpload(res) {
      if (res.code == 0) {
        this.picsList.push({name: res.data.accessoryName, url: this.$baseURL + res.data.accessoryName})
        this.$emit('update:path', this.joinPicIntoString(this.picsList))
      }
    },
    handleRemove(file, list) {
      this.$emit('update:path', this.joinPicIntoString(list))
    }
  }
}
</script>
