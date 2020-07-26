import axios from 'axios';

export interface IComment {
  repliedTo: {
    name: string;
    id: string;
  } | null;
  blogId: string;
  content: string;
  parentId: string;
}

export const queryComments = (blogId: string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${process.env.VUE_APP_URL}/myWeb/comments`, {
        params: { blogId },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const newComment = (comment: IComment, token: string) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${process.env.VUE_APP_URL}/myWeb/comment`,
        {
          data: { ...comment },
        },
        {
          headers: {
            authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
