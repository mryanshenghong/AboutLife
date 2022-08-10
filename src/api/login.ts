import { GlobalState } from "@/store";
import axios from "axios";

export const login = (email: string, pwd: string) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${import.meta.env.VITE_APP_URL}/myWeb/user/login`, {
        data: {
          email,
          user_pwd: pwd,
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const activateAccount = (id: string) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${import.meta.env.VITE_APP_URL}/myWeb/user/activate`, {
        data: { id },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const signup = (user: { user_name: string; user_pwd: string; email: string }) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${import.meta.env.VITE_APP_URL}/myWeb/user/signup`, {
        data: { ...user },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const verifyToken = (user_name: string, token: string): Promise<GlobalState["user"]> => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${import.meta.env.VITE_APP_URL}/myWeb/verifyToken`, {
        data: {
          user_name,
          token,
        },
      })
      .then((res) => {
        if (res.data.code === 200) {
          resolve(res.data.result);
        } else {
          reject();
        }
      })
      .catch(() => {
        reject();
      });
  });
};

export const logout = (email: string) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${import.meta.env.VITE_APP_URL}/myWeb/user/logout`, {
        data: {
          email,
        },
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
