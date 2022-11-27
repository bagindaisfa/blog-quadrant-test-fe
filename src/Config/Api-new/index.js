import { NET } from "./axios";

export const getAll = async () => {
  const res = await NET("GET", `api/content/all`, {});
  return res;
};

export const getData = async (id) => {
  const res = await NET("GET", `api/content/get?id=${id}`, {});
  return res;
};

export const getContentSearch = async (search) => {
  const res = await NET("GET", `api/content/search?keyword=${search}`, {});

  return res;
};

export const contentAdd = async (data) => {
  const res = await NET("POST", `api/content/add`, data);

  return res;
};

export const contentAddComments = async (data) => {
  const res = await NET("POST", `api/content/addComments`, data);

  return res;
};

export const deleteContent = async (id) => {
  const res = await NET("GET", `api/content/delete?id=${id}`, {});
  return res;
};

export const increaseViewer = async (id) => {
  const res = await NET("GET", `api/content/increaseViewer?id=${id}`, {});
  return res;
};

export const contentUpdate = async (data) => {
  const res = await NET("POST", `api/content/update`, data);

  return res;
};

//manajemen user
export const addUser = async (
  firstName,
  lastName,
  password,
  phoneNumber,
  userName,
  email
) => {
  const formData = new FormData();
  formData.append("firstName", firstName);
  formData.append("lastName", lastName);
  formData.append("password", password);
  formData.append("phoneNumber", phoneNumber);
  formData.append("userName", userName);
  formData.append("email", email);
  const res = await NET("POST", `api/auth/signup`, formData);

  return res;
};
