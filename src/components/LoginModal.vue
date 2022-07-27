<template>
  <el-dialog
    :title="$t('message.login.modalTitle')"
    v-model="show"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :lock-scroll="true"
    :modal-append-to-body="false"
  >
    <el-tabs v-model="state.formTab" @tab-click="handleFormChange">
      <el-tab-pane label="Login" name="login">
        <el-form ref="loginModalRef" @submit.native.prevent :model="state.form" :rules="rules">
          <el-form-item :label="$t('message.login.modalEmailLabel')" prop="email">
            <el-input v-model="state.form.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item :label="$t('message.login.modalPwdLabel')" prop="password">
            <el-input v-model="state.form.password" type="password" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="Signup" name="signup">
        <el-form ref="signupModalRef" @submit.native.prevent :model="state.signupForm" :rules="signupRules">
          <el-form-item label="Name" prop="nickname">
            <el-input v-model="state.signupForm.nickname" autocomplete="off" type="text"></el-input>
          </el-form-item>
          <el-form-item :label="$t('message.login.modalEmailLabel')" prop="email">
            <el-input v-model="state.signupForm.email" autocomplete="off" type="email"></el-input>
          </el-form-item>
          <el-form-item :label="$t('message.login.modalPwdLabel')" prop="password">
            <el-input v-model="state.signupForm.password" type="password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Confirm Password" prop="confirmPassword">
            <el-input v-model="state.signupForm.confirmPassword" type="password" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <div slot="footer" class="login-footer">
      <el-button @click="closeModal">{{ $t("message.login.modalCancel") }}</el-button>
      <el-button :disabled="!state.canSubmit" :loading="state.submiting" @click="loginOrSignUp" type="primary">
        {{ $t("message.login.modalConfirm") }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { getCurrentInstance, reactive, ref, watch } from "vue";
import { login, signup } from "../api/login";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useStore } from "@/store";
import { useMessage } from "@/utils/element-plus";

const $message = useMessage(getCurrentInstance());
const { t: $t } = useI18n();
const router = useRouter();
const store = useStore();

// props, state, dispatch
const emit = defineEmits<{ (e: "closeModal", show: boolean): void }>();
defineProps<{ show: boolean }>();
const state = reactive({
  formTab: "login",
  form: {
    email: "",
    password: "",
  },
  signupForm: {
    nickname: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  canSubmit: false,
  submiting: false,
});

// Refs
const loginModalRef = ref();
const signupModalRef = ref();

// Form rules
const validateConfirmPwd = (rule: any, value: any, callback: Function) => {
  if (value === "") {
    callback(new Error("请再次输入密码"));
  } else if (value !== state.signupForm.password) {
    callback(new Error("两次输入密码不一致"));
  } else {
    callback();
  }
};
const rules = {
  email: [
    {
      required: true,
      message: $t("message.login.modalEmailInvalid"),
      trigger: "change",
    },
  ],
  password: [{ required: true, message: "请输入密码", trigger: "change" }],
};
const signupRules = {
  nickname: [{ required: true, message: "请输入你的名字", trigger: "change" }],
  email: [
    {
      required: true,
      message: $t("message.login.modalEmailInvalid"),
      trigger: "change",
    },
  ],
  password: [{ required: true, message: "请输入密码", trigger: "change" }],
  confirmPassword: [
    { required: true, message: "请再次输入密码", trigger: "change" },
    { validator: validateConfirmPwd, trigger: "blur" },
  ],
};

// Watchers
// this won't work because we are passing a number to watch(): https://vuejs.org/guide/essentials/watchers.html#basic-example
watch(
  () => state.form.email,
  (newEmail: string) => {
    if (newEmail.length > 0) {
      if (state.form.password.length > 0) {
        state.canSubmit = true;
      }
    } else {
      state.canSubmit = false;
    }
  }
);

watch(
  () => state.form.password,
  (newPassword: string) => {
    if (newPassword.length > 0) {
      if (state.form.email.length > 0) {
        state.canSubmit = true;
      }
    } else {
      state.canSubmit = false;
    }
  }
);
watch(
  () => state.signupForm.email,
  (newEmail: string) => {
    if (newEmail.length > 0) {
      if (state.signupForm.password.length > 0) {
        state.canSubmit = true;
      }
    } else {
      state.canSubmit = false;
    }
  }
);

watch(
  () => state.signupForm.password,
  (newPassword: string) => {
    if (newPassword.length > 0) {
      if (state.signupForm.email.length > 0) {
        state.canSubmit = true;
      }
    } else {
      state.canSubmit = false;
    }
  }
);

// Methonds
const closeModal = () => {
  loginModalRef.value.resetFields();
  state.canSubmit = false;
  emit("closeModal", false);
};

const submitLogin = async () => {
  let { form, submiting } = state;
  submiting = true;
  try {
    const res: any = await login(form.email, form.password);
    if (res.code === 200) {
      localStorage.setItem("user_name", res.result.user_name);
      localStorage.setItem("token", res.result.token);
      localStorage.setItem("role", res.result.role);
      closeModal();
      store.commit("setLoginStatus", true);
      store.commit("setUser", res.result);
      $message?.success("Login successfully");
    } else {
      throw Error(res.message);
    }
  } catch (err: any) {
    closeModal();
    $message?.error(err.toString() || "Can not login");
  } finally {
    submiting = false;
  }
};

const loginOrSignUp = () => (state.formTab === "login" ? submitLogin() : submitSignUp());

const submitSignUp = async () => {
  signupModalRef.value.validate(async (valid: boolean) => {
    if (!valid) return;
    state.submiting = true;
    const newUser = {
      user_name: state.signupForm.nickname,
      user_pwd: state.signupForm.password,
      email: state.signupForm.email,
    };
    try {
      const res: any = await signup(newUser);
      if (res.code === 200) {
        $message?.success("Signup successfully");
        router.push({
          name: "Staging",
          params: {
            name: res.result.user_name,
            email: res.result.email,
          },
        });
        closeModal();
      } else {
        throw Error("Could not signup");
      }
    } catch (err: any) {
      $message?.error(err || "Could not signup");
    } finally {
      state.submiting = true;
    }
  });
};
const handleFormChange = (tab: any) => {
  loginModalRef.value.resetFields();
  signupModalRef.value.resetFields();
  state.formTab = tab.paneName;
};
</script>

<style>
.el-dialog {
  min-width: 300px;
  max-width: 500px;
}
</style>
