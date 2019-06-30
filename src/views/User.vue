<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-row :hutter="20">
      <el-col :span="6">
        <el-input
          placeholder="请输入内容"
          v-model="keyword"
          @keyup.enter.native="search"
          class="input-with-select"
        >
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </el-col>

      <el-col :span="6">
        <el-button type="success" plain @click="openAddUserDialog">添加用户</el-button>
      </el-col>
    </el-row>

    <!-- data 用来绑定这个表格要展示的数据对象 -->
    <!-- stripe属性可以创建带斑马纹的表格。它接受一个Boolean，默认为false，设置为true即为启用。-->
    <el-table :data="userList" stripe style="width: 100%">
      <!-- prop 设置当前列中展示的数据的属性名 -->
      <!-- label 当前列的表头文字 -->
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <!-- 如果当前列不展示数据,不设prop属性 -->
      <el-table-column label="用户状态">
        <!-- 数据在组件中,通过插槽接收数据 -->
        <template v-slot="{row}">
          <!-- row.mg_state -->
          <el-switch
            v-model="row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="toggleState(row)"
          ></el-switch>
        </template>
      </el-table-column>
      <!-- 内容按钮 通過作用域插槽拿到数据-->
      <el-table-column label="操作">
        <template v-slot="{row}">
          <el-button
            type="primary"
            plain
            size="mini"
            icon="el-icon-edit"
            @click="openEditUserDialog(row.id)"
          ></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" plain @click="delUser(row.id)"></el-button>
          <el-button type="success" icon="el-icon-check" size="mini" plain>分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- @current-change="onPageChange" 这个是页码发生改变的时候触发的事件 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pagesize"
      :current-page="currentpage"
      @current-change="onPageChange"
    ></el-pagination>
  </div>
</template>

<script>
// 发送ajax
import axios from "axios";
export default {
  data() {
    return {
      userList: []
    };
  },
  created() {
    axios({
      url: "http://localhost:8888/api/private/v1/users",
      params: {
        pagenum: 1,
        pagesize: 5
      },
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(res => {
      let {
        data: { data, meta }
      } = res;
      this.userList = data.users;
    });
  }
};
</script>

<style>
.el-breadcrumb.breadcrumb {
  background-color: #d4dae0;
  height: 50px;
  font-size: 16px;
  line-height: 50px;
  padding-left: 10px;
}
</style>

