<template>
  <div>
    <el-dropdown split-button @command="handleCommand">
      帐号：{{userName}}
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <router-link to="admin">
      <el-button>进入系统</el-button>
    </router-link>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userName: sessionStorage.getItem('userName'),
    }
  },
  methods: {
    handleCommand(c) {
      if (c == 'logout') {
        this.logout()
      }
    },
    logout() {
      sessionStorage.setItem('loginkey', '')
      sessionStorage.setItem('companyId', '')
      sessionStorage.setItem('userName', '')
      this.$router.push({
        name: 'Login'
      })
    }
  }
}
</script>
