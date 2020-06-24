import axios from 'axios'

export const getBlogsBasicInfo = (cat: string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${process.env.VUE_APP_URL}/myWeb/findBlogsByCate`, {
        params: {
          isTech: false,
          cat,
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

export const getBlogCats = (token: string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${process.env.VUE_APP_URL}/myWeb/findBlogCats`, {
        headers: {
          authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        params: {
          isTech: false,
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

export const getBlog = (id: string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${process.env.VUE_APP_URL}/myWeb/getBlog`, {
        params: {
          id,
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

export const saveBlog = (blogInfo: any, token: string) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${process.env.VUE_APP_URL}/myWeb/updateBlog`, blogInfo, {
        headers: {
          authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
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

export const createBlog = (newBlog: any, token: string) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${process.env.VUE_APP_URL}/myWeb/newBlog`, newBlog, {
        headers: {
          authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
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
