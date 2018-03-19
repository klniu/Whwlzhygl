export default {
  mounted() {
    let key = sessionStorage.getItem('loginkey')
    if (key == null || key == '') {
      this.$router.push({
        name: 'Login'
      })
      return false
    }
  }
}