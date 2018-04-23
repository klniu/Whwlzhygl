<template>
  <div>
    <el-tag
      :key="tag.id"
      v-for="tag in dynamicTags"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)">
      {{tag.content}}
    </el-tag>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    >
    </el-input>
    <el-button v-else class="button-new-tag" size="small" icon="el-icon-circle-plus-outline" @click="showInput">新增</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      ApiName: this.apiName.substring(0,1).toUpperCase() + this.apiName.substring(1)
    }
  },
  props: {
    apiName: [String]
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      let {data} = await this.$http({
        url: this.apiName + 'CheckContent/get' + this.ApiName + 'CheckContentList'
      })
      if (data.code == 0) {
        this.dynamicTags = data.data
      }
    },
    async handleClose(tag) {
      let {data} = await this.$http({
        method: 'post',
        url: this.apiName + 'CheckContent/delete' + this.ApiName + 'CheckContent',
        data: {
          ids: [tag.id]
        }
      })
      if (data.code == 0) {
        this.getList()
      }
      // this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    async handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        let {data} = await this.$http({
          method: 'post',
          url: this.apiName + 'CheckContent/add' + this.ApiName + 'CheckContent',
          data: {
            content: inputValue
          }
        })
        if (data.code == 0) {
          this.getList()
          // this.dynamicTags.push(inputValue);
          this.inputVisible = false;
          this.inputValue = "";
        }
      }
    }
  }
}
</script>
<style>
.el-tag{
  margin-bottom: 10px;
}
</style>
