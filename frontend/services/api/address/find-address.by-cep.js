import api from "../api";

export const findAddressByCep = async (cep) => {
  const response = await api.get(`/cep/${cep}`);

  const { content } = response.data;
  console.log("content", content);

  return content;
};
