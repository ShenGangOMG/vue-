// 发送ajax
// import { constants } from "crypto";
export default {
  data() {
    return {
      userList: [],
      total: 0,
      pagesize: 3,
      currentpage: 1,
      keyword: '',
      // 控制添加用户模态框的展示和隐藏的数据
      isAddUserDialogShow: false,
      // 添加用户的表单数据
      addUserFormData: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 添加用户的表单校验规则
      addUserRules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          {
            min: 5,
            max: 12,
            message: '用户名长度在 5 至 12 个字符',
            trigger: 'change'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 15,
            message: '密码长度在 6 到 15 个字符',
            trigger: 'change'
          }
        ],
        email: [
          {
            pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
            message: '邮箱格式不正确',
            trigger: 'change'
          }
        ],
        mobile: [
          {
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: '手机号码格式不正确',
            trigger: 'change'
          }
        ]
      },
      // 修改用户的表单
      editUserFormData: {
        id: 0,
        username: '',
        email: '',
        mobile: ''
      },
      isEditUserDialogShow: false,
      editUserRules: {
        email: [
          {
            pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
            message: '邮箱格式不正确',
            trigger: 'change'
          }
        ],
        mobile: [
          {
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: '手机号码格式不正确',
            trigger: 'change'
          }
        ]
      }
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    getUserList() {
      this.$http({
        url: 'users',
        params: {
          query: this.keyword,
          pagenum: this.currentpage,
          pagesize: this.pagesize
        }
      }).then(res => {
        let {
          data: { data, meta }
        } = res
        this.userList = data.users
        this.total = data.total
      })
    },
    onPageChange(page) {
      // 当页码发生改变
      this.currentpage = page
      // 重新请求数据
      this.getUserList()
    },
    search() {
      // 调用getUserList方法,重新请求数据
      this.getUserList()
    },
    async toggleState(user) {
      // console.log(user);
      // 给后台发送请求,修改当前用户状态
      let res = await this.$http({
        url: `users/${user.id}/state/${user.ma_state}`,
        method: 'put'
      })
      if (res.data.meta.status == 200) {
        this.$message({
          type: 'success',
          message: res.data.meta.msg,
          duration: 1000
        })
      } else {
        this.$message({
          type: 'error',
          message: res.data.meta.msg,
          duration: 1000
        })
        // 如果请求出错,那么页面(switch)不应该修改,改回原来状态
        user.mg_state = !user.mg_state
      }
    },
    async delUser(id) {
      try {
        await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        // 向后台发送请求,删除当前用户
        let res = await this.$http({
          url: `users/${id}`,
          method: 'delete'
        })
        // 重新渲染列表数据
        if (res.data.meta.status == 200) {
          this.$message({
            type: 'success',
            message: res.data.meta.msg,
            duration: 1000
          })
          this.currentpage = 1
          this.getUserList()
        }
      } catch (err) {
        this.$message({
          type: 'info',
          message: '已经取消删除'
        })
      }
    },
    openAddUserDialog() {
      // 打开添加用户的模态框
      this.isAddUserDialogShow = true
    },
    async addUser() {
      // 表单校验

      try {
        await this.$refs.addUserForm.validate()
        // console.log("校验成功");
        // 校验成功发送ajax
        let res = await this.$http({
          url: 'users',
          method: 'post',
          data: this.addUserFormData
          // BUG
        })
        // console.log(res);
        if (res.data.meta.status == 201) {
          this.$message({
            message: res.data.meta.msg,
            type: 'success',
            duration: 1000
          })
          this.getUserList()
          this.isAddUserDialogShow = false
        } else {
          this.$message({
            message: res.data.meta.msg,
            type: 'error',
            duration: 1000
          })
        }
      } catch (err) {
        // console.log("校验失败");
      }
    },
    async openEditUserDialog(id) {
      console.log(id)
      // 打开编辑模态框
      this.isEditUserDialogShow = true
      // 用id到后台取数据,放到模态框
      let res = await this.$http({
        url: `users/${id}`
      })
      this.editUserFormData = res.data.data
    },
    async editUser() {
      try {
        await this.$refs.editUserForm.validate()
        // 向后台提交数据,修改用户数据
        let res = await this.$http({
          url: `users/${this.editUserFormData.id}`,
          method: 'put',
          data: {
            mobile: this.editUserFormData.mobile,
            email: this.editUserFormData.email
          }
        })
        if (res.data.meta.status == 200) {
          // console.log(res);
          // 提示更新成功
          this.$message({
            type: 'success',
            message: res.data.meta.msg,
            duration: 1000
          })
          // 刷新列表
          this.getUserList()
          // 关闭模态框
          this.isEditUserDialogShow = false
        } else {
          this.$message({
            type: 'error',
            message: res.data.meta.msg,
            duration: 1000
          })
        }
      } catch (err) {}
    }
  }
}
