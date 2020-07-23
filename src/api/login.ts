import axios from 'axios'

export const login = (email: string, pwd: string) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${process.env.VUE_APP_URL}/myWeb/user/login`, {
        data: {
          email,
          user_pwd: pwd,
        },
      })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const signup = (user: { user_name: string; user_pwd: string; email: string }) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${process.env.VUE_APP_URL}/myWeb/user/signup`, {
        data: { ...user },
      })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const verifyToken = (user_name: string, token: string) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${process.env.VUE_APP_URL}/myWeb/verifyToken`, {
        data: {
          user_name,
          token,
        },
      })
      .then((res) => {
        if (res.data.code === 200) {
          resolve(res.data.result)
        }
      })
      .catch(() => {
        reject({ invalid: false })
      })
  })
}

export const logout = (email: string) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${process.env.VUE_APP_URL}/myWeb/user/logout`, {
        data: {
          email,
        },
      })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
