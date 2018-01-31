export default {
  mounted() {
    let key = localStorage.getItem('loginkey')
    if (key == null) {
      this.$router.push({
        name: 'Login'
      })
      return false
    }
  }
}