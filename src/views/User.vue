<template>
  <div>
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
          <el-switch v-model="row.type" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <!-- 内容按钮 -->
      <el-table-column label="操作">
        <el-button type="primary" plain size="mini" icon="el-icon-edit"></el-button>
        <el-button type="danger" icon="el-icon-delete" size="mini" plain></el-button>
        <el-button type="success" icon="el-icon-check" size="mini" plain>分配角色</el-button>
      </el-table-column>
    </el-table>
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
