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
    <el-form ref="loginModal" @submit.native.prevent :model="form" :rules="rules">
      <el-form-item :label="$t('message.login.modalEmailLabel')" prop="email">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item :label="$t('message.login.modalPwdLabel')" prop="password">
        <el-input v-model="form.password" type="password" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="login-footer">
      <el-button @click="closeModal">{{ $t('message.login.modalCancel') }}</el-button>
      <el-button :disabled="!canSubmit" :loading="submiting" @click="submitLogin" type="primary">{{
        $t('message.login.modalConfirm')
      }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { login } from '../api/login'
import { mapMutations } from 'vuex'
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    'form.email'(val) {
      if (val.length > 0) {
        if (this.form.password.length > 0) {
          this.canSubmit = true
        }
      } else {
        this.canSubmit = false
      }
    },
    'form.password'(val) {
      if (val.length > 0) {
        if (this.form.email.length > 0) {
          this.canSubmit = true
        }
      } else {
        this.canSubmit = false
      }
    },
  },
  data() {
    const $t = this.$t.bind(this)
    return {
      form: {
        email: '',
        password: '',
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
      canSubmit: false,
      submiting: false,
    }
  },
  methods: {
    closeModal() {
      this.$refs['loginModal'].resetFields()
      this.canSubmit = false
      this.$emit('closeModal', false)
    },
    submitLogin() {
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
            this.$socket.connect()
          } else {
            this.$message({
              message: 'Could not login: email or password wrong',
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
    ...mapMutations({
      setLogin: 'SET_LOGIN',
      setUseInfo: 'SET_USERINFO',
    }),
  },
  mounted() {},
}
</script>

<style>
.el-dialog {
  min-width: 300px;
  max-width: 500px;
}
</style>
