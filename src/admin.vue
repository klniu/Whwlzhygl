<template>
  <div>
    <el-container>
      <el-header>危化物流智慧云管理平台</el-header>
      <el-container :style="height">
        <el-aside width="200px">
          <el-menu router>
            <el-menu-item index="notice">
              <i class="el-icon-message"></i>
              <span slot="title">通知</span>
            </el-menu-item>
            <el-menu-item index="company">
              <i class="el-icon-menu"></i>
              <span slot="title">企业管理</span>
            </el-menu-item>
            <el-menu-item index="person">
              <i class="el-icon-menu"></i>
              <span slot="title">人员管理</span>
            </el-menu-item>
            <el-menu-item index="car-team">
              <i class="el-icon-menu"></i>
              <span slot="title">车辆管理</span>
            </el-menu-item>
            <el-menu-item index="customer">
              <i class="el-icon-menu"></i>
              <span slot="title">客户管理</span>
            </el-menu-item>
            <el-menu-item index="goods">
              <i class="el-icon-menu"></i>
              <span slot="title">货物管理</span>
            </el-menu-item>
            <el-submenu index="safe">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>安全管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="safecheck">安全监督检查</el-menu-item>
                <el-menu-item index="doorcheck">车辆门检</el-menu-item>
                <el-menu-item index="danger">隐患排查</el-menu-item>
                <el-menu-item index="accident">事故记录</el-menu-item>
                <el-menu-item index="illegal">违章记录</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="device">
              <i class="el-icon-menu"></i>
              <span slot="title">设备维护</span>
            </el-menu-item>
            <el-menu-item index="meeting">
              <i class="el-icon-menu"></i>
              <span slot="title">培训会议</span>
            </el-menu-item>
            <el-menu-item index="order">
              <i class="el-icon-menu"></i>
              <span slot="title">电子路单</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
      <el-footer>管理危化品的物流货运安全平台</el-footer>
    </el-container>
  </div>
</template>

<script>
import login from '@/mixins/login'
export default {
  mixins: [login],
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
body {
  margin: 0;
}
.el-footer, .el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
.search-input{
  width: 180px;
  margin-left: 50px;
}
</style>
