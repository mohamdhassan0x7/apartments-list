import axiosInstance from "./axiosInstance";

export const signUp = async (name: string, email: string, password: string) => {
  try {
    const response = await axiosInstance.post("/users/signup", { name, email, password });
    return {data: {...response.data}, statusCode: response.status};
  } catch (error: any) {
    return { 
      data: error.response ? {...error.response.data} : { message: ["An error occurred"] },
      statusCode: error.response ? error.response.status : 500 
    };
  }
};

export const signIn = async (email: string, password: string) => {
  try {    
    const response = await axiosInstance.post("/users/signin", { email, password });
    return {data: {...response.data}, statusCode: response.status};
  } catch (error: any) {
    return { 
      data: error.response ? {...error.response.data} : { message: ["An error occurred"] },
      statusCode: error.response ? error.response.status : 500 
    };
  }
};

