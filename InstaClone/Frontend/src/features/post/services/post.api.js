import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
  } catch (error) {
    console.warn("Unable to read token from localStorage", error);
  }
  return config;
});

export const getFeedPosts = async () => {
  const response = await api.get("/posts/feed");
  return response.data;
};
export const createPost = async (postImage, caption) => {
  const formData = new FormData();
  formData.append("image", postImage);
  formData.append("caption", caption);
  const response = await api.post("/posts", formData);
  return response.data;
};
export const likePost = async (postId) => {
  const response = await api.post(`/posts/like/${postId}`);
  return response.data;
};
export const unlikePost = async (postId) => {
  const response = await api.post(`/posts/unlike/${postId}`);
  return response.data;
};
