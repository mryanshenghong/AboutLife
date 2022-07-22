import { App, ComponentInternalInstance } from "vue";
import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/index.css";

declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    $message: typeof ElMessage;
  }
}
export const useMessage = (instance: ComponentInternalInstance | null) => {
  return instance?.proxy?.$message;
};

export default {
  install(app: App) {
    app.config.globalProperties.$message = ElMessage;
  },
};
