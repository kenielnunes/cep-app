import api from "../api";

export const authUser = async (email, password) => {
  const response = await api.post("/auth", {
    email,
    password,
  });

  const { content: auth } = response.data;

  return {
    auth,
  };
};
