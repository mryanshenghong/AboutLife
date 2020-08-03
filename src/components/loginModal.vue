<template>
  <el-dialog
    :title="$t('message.login.modalTitle')"
    :visible.sync="show"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :lock-scroll="true"
    :modal-append-to-body="false"
  >
    <el-tabs v-model="formTab" @tab-click="handleFormChange">
      <el-tab-pane label="Login" name="login">
        <el-form ref="loginModal" @submit.native.prevent :model="form" :rules="rules">
          <el-form-item :label="$t('message.login.modalEmailLabel')" prop="email">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item :label="$t('message.login.modalPwdLabel')" prop="password">
            <el-input v-model="form.password" type="password" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="Signup" name="signup">
        <el-form ref="signupModal" @submit.native.prevent :model="signupForm" :rules="signupRules">
          <el-form-item label="Name" prop="nickname">
            <el-input v-model="signupForm.nickname" autocomplete="off" type="text"></el-input>
          </el-form-item>
          <el-form-item :label="$t('message.login.modalEmailLabel')" prop="email">
            <el-input v-model="signupForm.email" autocomplete="off" type="email"></el-input>
          </el-form-item>
          <el-form-item :label="$t('message.login.modalPwdLabel')" prop="password">
            <el-input v-model="signupForm.password" type="password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Confirm Password" prop="confirmPassword">
            <el-input v-model="signupForm.confirmPassword" type="password" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <div slot="footer" class="login-footer">
      <el-button @click="closeModal">{{ $t('message.login.modalCancel') }}</el-button>
      <el-button :disabled="!canSubmit" :loading="submiting" @click="loginOrSignUp" type="primary">
        {{
        $t('message.login.modalConfirm')
        }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { login, signup } from '../api/login'
import { mapMutations } from 'vuex'

export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    'form.email' (val) {
      if (val.length > 0) {
        if (this.form.password.length > 0) {
          this.canSubmit = true
        }
      } else {
        this.canSubmit = false
      }
    },
    'form.password' (val) {
      if (val.length > 0) {
        if (this.form.email.length > 0) {
          this.canSubmit = true
        }
      } else {
        this.canSubmit = false
      }
    },
    'signupForm.email' (val) {
      if (val.length > 0) {
        if (this.signupForm.password.length > 0) {
          this.canSubmit = true
        }
      } else {
        this.canSubmit = false
      }
    },
    'signupForm.password' (val) {
      if (val.length > 0) {
        if (this.signupForm.email.length > 0) {
          this.canSubmit = true
        }
      } else {
        this.canSubmit = false
      }
    },
  },
  data () {
    const $t = this.$t.bind(this)

    const validateConfirmPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.signupForm.password) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      formTab: 'login',
      form: {
        email: '',
        password: '',
      },
      signupForm: {
        nickname: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      rules: {
        email: [
          {
            required: true,
            message: $t('message.login.modalEmailInvalid'),
            trigger: 'change',
          },
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'change' }],
      },
      signupRules: {
        nickname: [{ required: true, message: '请输入你的名字', trigger: 'change' }],
        email: [
          {
            required: true,
            message: $t('message.login.modalEmailInvalid'),
            trigger: 'change',
          },
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'change' }],
        confirmPassword: [{ required: true, message: '请再次输入密码', trigger: 'change' }, { validator: validateConfirmPwd, trigger: 'blur' }],
      },
      canSubmit: false,
      submiting: false,
    }
  },
  methods: {
    closeModal () {
      this.$refs.loginModal.resetFields()
      this.canSubmit = false
      this.$emit('closeModal', false)
    },
    submitLogin () {
      this.submiting = true
      login(this.form.email, this.form.password)
        .then((res) => {
          if (res.code === 200) {
            localStorage.setItem('user_name', res.result.user_name)
            localStorage.setItem('token', res.result.token)
            localStorage.setItem('role', res.result.role)
            this.closeModal()
            this.setLogin(true)
            this.setUseInfo(res.result)
            this.$message({
              message: 'Login successfully',
              type: 'success',
            })
          } else {
            this.$message({
              message: res.msg,
              type: 'error',
            })
          }
          this.submiting = false
        })
        .catch(() => {
          this.closeModal()
          this.submiting = false
        })
    },
    loginOrSignUp () {
      this.formTab === 'login' ? this.submitLogin() : this.submitSignUp()
    },
    submitSignUp () {
      this.$refs.signupModal.validate((valid) => {
        if (valid) {
          this.submiting = true;
          const newUser = {
            user_name: this.signupForm.nickname,
            user_pwd: this.signupForm.password,
            email: this.signupForm.email
          }
          signup(newUser).then((res) => {
            if (res.code === 200) {
              this.$message({
                message: 'Signup successfully',
                type: 'success',
              })
              this.$router.push({
                name: 'Staging',
                params: {
                  name: res.result.user_name,
                  email: res.result.email
                }
              }
              )
              this.closeModal()
            } else {
              this.$message({
                message: 'Could not signup',
                type: 'error',
              })
            }
            this.submiting = false
          }).catch((err) => {
            this.$message({
              message: 'Could not signup',
              type: 'error',
            })
          })
        } else {
          return false
        }
      })
    },
    handleFormChange (tab) {
      this.$refs.loginModal.resetFields();
      this.$refs.signupModal.resetFields()
      this.formTab = tab.paneName
    },
    ...mapMutations({
      setLogin: 'SET_LOGIN',
      setUseInfo: 'SET_USERINFO',
    }),
  },
}
</script>

<style>
.el-dialog {
  min-width: 300px;
  max-width: 500px;
}
</style>
