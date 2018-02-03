export default {
  mounted() {
    let key = localStorage.getItem('loginkey')
    if (key == null || key == '') {
      this.$router.push({
        name: 'Login'
      })
      return false
    }
  }
}