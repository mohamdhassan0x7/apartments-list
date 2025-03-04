import axiosInstance from "./axiosInstance";

export const fetchApartments = async (
  page: number = 1,
  limit: number = 10,
  filters?: { name?: string; price?: number; location?: string }
) => {
  try {
    const response = await axiosInstance.get("/apartments", {
      params: { page, limit, ...filters },
    });
    
    return response.data;
  } catch (error) {
    console.error("Error fetching apartments:", error);
    throw error;
  }
};

export const createApartment = async (formData: {
  name: string;
  unitNumber: string;
  project: string;
  price: number;
  location: string;
  image: File | null;
}) => {
  try {
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("unitNumber", formData.unitNumber);
    formDataToSend.append("project", formData.project);
    formDataToSend.append("price", formData.price.toString());
    formDataToSend.append("location", formData.location);
    
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    const response = await axiosInstance.post("/apartments", formDataToSend, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return {data: {...response.data}, statusCode: response.status};
  } catch (error: any) {
    return { 
      data: error.response ? {...error.response.data} : { message: ["An error occurred"] },
      statusCode: error.response ? error.response.status : 500 
    };
  }
}

export const getApartmentById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/apartments/${id}`);
    return {data: {...response.data}, statusCode: response.status};
  } catch (error: any) {
    return { 
      data: error.response ? {...error.response.data} : { message: ["An error occurred"] },
      statusCode: error.response ? error.response.status : 500 
    };
  }
}