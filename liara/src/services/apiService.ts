// import axios from "axios";




// // Set the base URL for your ASP.NET backend
// const API_BASE_URL = "http://localhost:5000/api"; // Replace with your actual API URL

// // Example function to fetch all products
// export const fetchProducts = async () => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/Product`);
//     return response.data; // Return the data received from the backend
//   } catch (error) {
//     console.error("Error fetching product:", error);
//     return []; 
//   }
// };


// export const addproduct = async (formData: FormData) => {
//   return fetch("http://localhost:5000/api/Product", {
//     method: "POST",
//     body: formData,
//   });
// };

// export const addProduct = async (product: { name: string; price: number }) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/Product`, product);
//     return response.data;
//   } catch (error) {
//     console.error("Error adding product:", error);
//     return null;
//   }
// };

// export const Addproduct = async (formData: FormData) => {
//   return axios.post("/api/Product", formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });
// };
// export const getProducts = async () => {
//   try {
//       const response = await fetch("http://localhost:5000/api/Product");
//       return await response.json();
//   } catch (error) {
//       console.error("Error fetching product:", error);
//       return [];
//   }
// };

// export const fetchCategories = async () => {
//   try {
//     const response = await fetch("/api/Category"); // Adjust the endpoint as needed
//     if (!response.ok) {
//       throw new Error("Failed to fetch category");
//     }
//     return await response.json();
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };


// services/apiService.ts
// import axios from "axios";

// const API_BASE_URL = "http://localhost:5005/api"; // Ensure this matches your backend

// console.log("Sending data:", FormData);

// export const Addproduct = async (formData: FormData) => {
//   return fetch("http://localhost:5005/api/Product/Addproduct", {
//     method: "POST",
//     body: formData,
//   });
// };

// export const AddProduct = async (formData: FormData) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/Product/Addproduct`, formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });
   
//   if (response.status !== 200) {
//     console.error("API Error:", response.data);
//     alert(`Failed to add product: ${response.data.message || "Unknown error"}`);
//     return;
//   }

//   alert("Product added successfully!");
// } catch (err) {
//   console.error("Fetch Error:", err);
//   alert("Failed to add product.");
// }

// };

// export const getProducts = async () => {
//     try {
//         const response = await fetch("http://localhost:5005/api/Product");
//         return await response.json();
//     } catch (error) {
//         console.error("Error fetching product:", error);
//         return [];
//     }
//   };

// export const fetchProducts = async () => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/Product`);
//     if (response.status !== 200) {
//       console.error("Error: Unexpected response status", response.status);
//       return [];
//     }

//     return response.data;  // Assuming the server returns valid JSON
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     return [];
//   }
// };

// export const fetchCategories = async () => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/Category`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching categories:", error);
//     throw error;
//   }
// };
