<template>
  <div id="app">
    <el-container>
      <el-header>头部</el-header>
      <el-container :style="height">
        <el-aside width="200px">
          <el-menu router>
            <el-menu-item index="notice">
              <i class="el-icon-menu"></i>
              <span slot="title">通知</span>
            </el-menu-item>
            <el-submenu index="safe">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>菜单1</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="safe1">安全1</el-menu-item>
                <el-menu-item index="safe2">安全2</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="page3">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
      <el-footer>底部</el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      height: {
        height: (document.documentElement.clientHeight - 120) + 'px'
      }
    }
  }
}
</script>

<style>
</style>
