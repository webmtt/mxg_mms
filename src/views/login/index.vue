<template>
  <div class="login-container">
    <!-- :rules="rules" 表单验证, ref 相当于 id，:model 表单数据对象, label-width 表单域标签的的宽度 -->
    <el-form :rules="rules" ref="form" :model="form" label-width="80px" class="login-form">
      <h2 class="login-title">梦学谷会员管理系统</h2>
      <!-- 注意： prop 是加在 el-form-item 组件上 -->
      <el-form-item label="帐号" prop="username">
        <el-input v-model="form.username" placeholder="请输入帐号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login, getUserInfo } from "@/api/login";
export default {
  data() {
    return {
      form: {},
      rules: {
        username: [
          // 对应el-form-item 的 prop 值
          { required: true, message: "请输入有效帐号", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入有效密码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 注意：按钮上调用的函数名要一致 onSubmit
    onSubmit(form) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 验证帐号和密码是否通过，
          login(this.form.username, this.form.password).then(response => {
            const resp = response.data;
            console.log(
              resp.code,
              resp.message,
              resp.data.token,
              resp.code === 2000
            );
            if (resp.flag) {
              // 通过，获取用户信息 异步请求
              getUserInfo(resp.data.token).then(response => {
                // 存入session中
                const respUser = response.data;
                if (respUser.flag) {
                  // 将信息保存到浏览器的 localStorage 中
                  localStorage.setItem(
                    "mgx-msm-user",
                    JSON.stringify(respUser.data)
                  );
                  // 方便后面重新验证
                  localStorage.setItem("mgx-msm-token", resp.data.token);
                  // 前往首页
                  this.$router.push("/");
                } else {
                  // 获取信息失败, 弹出警告
                  this.$message({
                    message: respUser.message,
                    type: "warning"
                  });
                }
              });
            } else {
              // 未通过,弹出警告
              this.$message({
                message: resp.message,
                type: "warning"
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.login-form {
  width: 350px;
  /* 上下间隙150px, 左右自动 */
  margin: 160px auto;
  /*透明背景色*/
  background-color: rgb(255, 255, 255, 0.8);
  padding: 30px;
  /* 圆角 */
  border-radius: 20px;
}
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../../assets/login.jpg");
  overflow: hidden;
}
/* 标题 */
.login-title {
  text-align: center;
  color: #303133;
}
</style>
