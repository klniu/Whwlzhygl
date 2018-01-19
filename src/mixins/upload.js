export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    joinPicIntoString(list) {
      let names = list.map(i => {
        return i.name
      })
      return names.join(',')
    },
    pushPicInitList(str) {
      let pics = []
      if (str) {
        pics = str.split(',')
        pics = pics.map(i => {
          return {name: i, url: this.$baseURL + i}
        })
      }
      return pics
    }
  }
}