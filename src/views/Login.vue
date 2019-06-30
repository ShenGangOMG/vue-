<template>
  <!-- el-row 这个组件类似div,用来布局 -->
  <!-- type 是布局模式,使用flex -->
  <!-- justify 用来设置水平对齐方式 -->
  <el-row type="flex" class="row-bg" justify="center" align="middle">
    <!-- el-col 布局组件 列组件 -->
    <!-- span 属性用来设置当前列所占格数 -->
    <el-col :xs="14" :sm="12" :md="10" :lg="8" :xl="6">
      <pre class="pre_box">
      <h1>沉梦昂志</h1>

                                        --大刚哥
    </pre>
      <!-- 表单内容 -->
      <el-form
        ref="loginForm"
        :rules="formRules"
        :model="form"
        class="login-form"
        label-position="top"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <!-- 这个地方的show-password就是密码可视化的小眼睛 -->
          <el-input type="password" v-model="form.password" show-password></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
// 表单校验的实现:
// 1. 给数据添加校验规则对象
// 2. rules: {表单绑定数据名:[{required: true, message: "提示信息",trigger: "触发校验的时机  blur change"}]}
// 3. 把规则绑定对象绑定到el-form组件上 :rules="校验规则对象"
// 4. 需要给每一项被校验的el-form-item组件添加prop属性 属性值就是 绑定的数据的名称

//发送ajax--在baseURL原型中
// import axios from "axios";
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      formRules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          },
          {
            min: 5,
            max: 12,
            message: "用户名必须5到12位",
            trigger: "change"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            min: 6,
            max: 15,
            message: "密码必须6到15位",
            trigger: "change"
          }
        ]
      }
    };
  },
  // 请求失败的处理
  methods: {
    async submitForm(formName) {
      // 通过validate方法,对表单做整体校验
      let valid = await this.$refs[formName].validate();
      // 在JavaScript可以使用try...catch来进行异常处理
      if (valid) {
        try {
          let res = await this.$http({
            url: "login",
            method: "post",
            data: this.form
          });

          if (res.data.meta.status == 200) {
            localStorage.setItem("token", res.data.data.token);
            this.$router.push("/home");
          } else {
            this.$message({
              message: res.data.meta.mag,
              type: "error",
              duration: 1000
            });
          }
        } catch (err) {
          // catch 就相当于失败的回调
          console.log("请求发送失败", err);
        }
      } else {
        return false;
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style>
.row-bg {
  height: 100%;
  background-color: #ccc;
}
.login-form {
  background-color: #fff;
  border-radius: 10px;
  padding: 30px 20px;
  min-width: 400px;
}
.pre_box {
  position: relative;
  top: -40px;
  right: -30px;
}
</style>
