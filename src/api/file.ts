import axios from "axios";

export const uploadImg = (imgFile: any, token: string) => {
  return new Promise((resolve, reject) => {
    const fordata = new FormData();
    fordata.append("data", imgFile);
    axios
      .post(`${import.meta.env.VITE_APP_URL}/myWeb/uploadImg`, fordata, {
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

export const uploadFiles = (files: FileList, token: string) => {
  return new Promise((resolve, reject) => {
    const formdata = new FormData();
    [...files].forEach((file: File) => {
      formdata.append("data", file);
    });
    axios
      .post(`${import.meta.env.VITE_APP_URL}/myWeb/uploadFiles`, formdata, {
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
      .get(`${import.meta.env.VITE_APP_URL}/myWeb/files`, {
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
      .get(`${import.meta.env.VITE_APP_URL}/myWeb/filesDetail`, {
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
      .delete(`${import.meta.env.VITE_APP_URL}/myWeb/file`, {
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
