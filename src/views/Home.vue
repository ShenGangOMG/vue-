<template>
  <!-- <h1>此为首页</h1> -->
  <el-container>
    <el-header>
      <el-row type="flex" justify="space-between" align="middle">
        <el-col :span="6">
          <img src="../assets/logo.png" alt />
        </el-col>
        <el-col>
          <h1>后台管理系统</h1>
        </el-col>
        <el-col :span="6" class="header-right">
          <div>
            欢迎39期超级VIP
            <a href="#" @click.prevent="logout">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <!-- 左侧边栏 -->
      <el-aside width="200px">
        <!-- 设置默认高亮的菜单项,赋值内容为菜单项的index值 -->
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :unique-opened="true"
          :router="true"
        >
          <!-- submenu的属性  index是菜单id -->
          <!-- menu-item 这个组件就是每个没有子菜单的菜单 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/user">
              <i class="el-icon-menu"></i>
              <span>用户管理</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="#">
              <i class="el-icon-menu"></i>
              <span>角色列表</span>
            </el-menu-item>
            <el-menu-item index="#">
              <i class="el-icon-menu"></i>
              <span>权限列表</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="#">
              <i class="el-icon-menu"></i>
              <span>商品列表</span>
            </el-menu-item>
            <el-menu-item index="#">
              <i class="el-icon-menu"></i>
              <span>分类参数</span>
            </el-menu-item>
            <el-menu-item index="#">
              <i class="el-icon-menu"></i>
              <span>商品分类</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="#">
              <i class="el-icon-menu"></i>
              <span>订单列表</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="#">
              <i class="el-icon-menu"></i>
              <span>数据报表</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  // 退出功能
  methods: {
    logout() {
      // 清空token
      localStorage.removeItem("token");
      // 跳转至登录页
      this.$router.push("/login");
    }
  }
};
</script>


<style lang="less">
.el-container {
  height: 100%;
  .el-header {
    background-color: #b3c1cd;
    padding: 0;

    img {
      width: 200px;
    }
    h1 {
      font-size: 28px;
      color: #fff;
      font-weight: bolder;
      padding: 0;
      margin: 0;
      text-align: center;
    }
    div a {
      color: orange;
    }
  }
}
.header-right {
  font-weight: bolder;
  text-align: right;
  padding-right: 20px;
}
.el-menu-vertical-demo.el-menu {
  height: 100%;
}
</style>
