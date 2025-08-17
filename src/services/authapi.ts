// services/registerUser.ts
import axios from "axios";

interface IFormInput {
  fullName: string;
  emailAddress: string;
  password: string;
  skills: string[];
  experienceLevel: string;
}

interface IFormInputLogin {
  emailAddress: string;
  password: string;
}

export const registerUser = async (data: IFormInput) => {
  const response = await axios.post(
    "http://localhost:5000/api/register/developer",
    data
  );
  return response.data;
};

export const loginUser = async (data: IFormInputLogin) => {
  const response = await axios.post(
    "http://localhost:5000/api/login/developer",
    data
  );
  return response.data;
};
