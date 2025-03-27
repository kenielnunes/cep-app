import api from "../api";

export const registerUser = async (username, email, password) => {
  const response = await api.post("/user", {
    username,
    email,
    password,
  });

  const { content: user } = response.data;

  return {
    user,
  };
};
