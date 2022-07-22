import axios from "axios";

export const uploadImg = (imgFile: any, token: string) => {
  return new Promise((resolve, reject) => {
    const fordata = new FormData();
    fordata.append("data", imgFile);
    axios
      .post(`${process.env.VUE_APP_URL}/myWeb/uploadImg`, fordata, {
        headers: { authorization: "Bearer " + token, "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        resolve(res.data.result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const uploadFiles = (files: any, token: string) => {
  return new Promise((resolve, reject) => {
    const formdata = new FormData();
    files.forEach((file: any) => {
      formdata.append("data", file);
    });
    axios
      .post(`${process.env.VUE_APP_URL}/myWeb/uploadFiles`, formdata, {
        headers: { authorization: "Bearer " + token, "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        resolve(res.data.result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getCloudFiles = (token: string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${process.env.VUE_APP_URL}/myWeb/files`, {
        headers: { authorization: "Bearer " + token, "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        resolve(res.data.result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getCloudFilesDetail = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${process.env.VUE_APP_URL}/myWeb/filesDetail`, {
        headers: { authorization: "Bearer " + localStorage.token, "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        resolve(res.data.result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const deleteFile = (fileName: string) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${process.env.VUE_APP_URL}/myWeb/file`, {
        params: { fileName },
        headers: { authorization: "Bearer " + localStorage.token, "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
