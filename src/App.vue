<template>
  <div id="app">
    <el-container>
      <el-header>头部</el-header>
      <el-container :style="height">
        <el-aside width="200px">
          <el-menu>
            <el-submenu
              v-for = "(item, i) in menu"
              :key = "i"
              :index = "i+''">
              <template slot="title">{{ item.title }}</template>
              <el-menu-item-group
                v-for="(sub, j) in item.sub"
                :key="j">
                <el-menu-item
                  :index="i+'-'+j"
                  @click="clickMenu(sub.route)">
                  {{ sub.title }}
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
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
      },
      menu: [
        {
          title: '长租管理',
          sub: [{
            title: '长租套餐管理',
            route: 'page1'
          }, {
            title: '长租套餐价格管理',
            route: 'page2'
          }]
        },
        {
          title: '以租代售',
          sub: [{
            title: '以租代售套餐',
            route: 'page3'
          }]
        }
      ]
    }
  }
}
</script>

<style>
</style>
