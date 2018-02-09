<template>
  <div>
    <el-container>
      <el-header>
        危化物流智慧云管理平台
        <div style="float: right">
          <user-info></user-info>
        </div>
      </el-header>
      <el-container :style="height">
        <el-aside width="200px">
          <el-menu router>
            <template v-for="(item, i) in menuList">
              <el-menu-item :index="item.route || ('index'+i)" :key="i" v-if="item.children.length == 0">
                <i class="el-icon-menu"></i>
                <span slot="title">{{item.menuName}}</span>
              </el-menu-item>
              <el-submenu :index="item.route || ('index'+i)" :key="i" v-else>
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>{{item.menuName}}</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item :index="sub.route || ('index'+i)" v-for="sub in item.children" :key="sub.id">{{sub.menuName}}</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </template>
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
import UserInfo from '@/pages/user-info'
export default {
  mixins: [login],
  components: {
    UserInfo
  },
  name: 'app',
  data() {
    return {
      height: {
        height: (document.documentElement.clientHeight - 120) + 'px'
      },
      menuList: []
    }
  },
  mounted() {
    this.getMenuList()
  },
  methods: {
    async getMenuList() {
      let {data} = await this.$http({
        url: 'menus/getMenusAll'
      })
      if (data.code == 0) {
        this.menuList = data.data[0] && data.data[0].children
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
