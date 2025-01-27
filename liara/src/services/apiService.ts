import axios from "axios";

// Set the base URL for your ASP.NET backend
const API_BASE_URL = "http://localhost:5000/api"; // Replace with your actual API URL

// Example function to fetch all products
export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data; // Return the data received from the backend
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Throw the error for further handling
  }
};

// Example function to add a product
export const addProduct = async (product: { name: string; price: number }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/products`, product);
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};
