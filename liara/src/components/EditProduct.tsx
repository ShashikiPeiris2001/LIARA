// // import React, { useEffect, useState } from "react";
// // import { useNavigate, useParams } from "react-router-dom";
// // import axios from "axios";

// // // Reusable input field
// // type InputFieldProps = {
// //   label: string;
// //   name: string;
// //   type?: "text" | "number";
// //   value: string | number;
// //   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// // };
// // const InputField: React.FC<InputFieldProps> = ({
// //   label,
// //   name,
// //   type = "text",
// //   value,
// //   onChange,
// // }) => (
// //   <div>
// //     <label className="block text-sm font-medium text-gray-700 mb-1">
// //       {label}
// //     </label>
// //     <input
// //       type={type}
// //       name={name}
// //       value={value}
// //       onChange={onChange}
// //       className="w-full px-3 py-2 border border-gray-300 rounded-lg"
// //     />
// //   </div>
// // );

// // interface ProductForm {
// //   name: string;
// //   price: number;
// //   stock: number;
// //   categoryName: string;
// //   subCategoryName: string;
// //   colors: string[];
// //   sizes: string[];
// //   images?: string[];
// // }

// // const EditProduct: React.FC = () => {
// //   const { id } = useParams<{ id: string }>();
// //   const navigate = useNavigate();

// //   const [formData, setFormData] = useState<ProductForm>({
// //     name: "",
// //     price: 0,
// //     stock: 0,
// //     categoryName: "",
// //     subCategoryName: "",
// //     colors: [],
// //     sizes: [],
// //   });

// //   const [imageUrl, setImageUrl] = useState<string>(""); // Current image
// //   const [newImage, setNewImage] = useState<File | null>(null); // New uploaded image
// //   const [error, setError] = useState<string>("");
// //   const [successMessage, setSuccessMessage] = useState<string>("");
// //   const [isLoading, setIsLoading] = useState<boolean>(false);

// //   // Fetch product details
// //   useEffect(() => {
// //     const fetchProduct = async () => {
// //       try {
// //         setIsLoading(true);
// //         const res = await axios.get(
// //           `http://localhost:5005/api/Product/GetProductDetails/${id}`
// //         );
// //         const product = res.data;

// //         setFormData({
// //           name: product.name,
// //           price: product.price,
// //           stock: product.stock,
// //           categoryName: product.categoryName,
// //           subCategoryName: product.subCategoryName,
// //           colors: product.colors || [],
// //           sizes: product.sizes || [],
// //         });
// //         setImageUrl(product.imageUrl || "");
// //       } catch (err) {
// //         console.error(err);
// //         setError("Failed to fetch product details.");
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     };

// //     if (id) fetchProduct();
// //   }, [id]);

// //   const handleChange = (
// //     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
// //   ) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({
// //       ...prev,
// //       [name]: e.target.type === "number" ? Number(value) : value,
// //     }));
// //   };

// //   const handleArrayInputChange = (
// //     e: React.ChangeEvent<HTMLInputElement>,
// //     field: "colors" | "sizes"
// //   ) => {
// //     const array = e.target.value
// //       .split(",")
// //       .map((item) => item.trim())
// //       .filter(Boolean);
// //     setFormData((prev) => ({ ...prev, [field]: array }));
// //   };

// //   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     if (e.target.files && e.target.files.length > 0) {
// //       setNewImage(e.target.files[0]);
// //     }
// //   };

// //   const handleUpdate = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setError("");
// //     setSuccessMessage("");
// //     setIsLoading(true);

// //     const data = new FormData();
// //     data.append("Name", formData.name);
// //     data.append("Price", formData.price.toString());
// //     data.append("Stock", formData.stock.toString());
// //     data.append("CategoryName", formData.categoryName);
// //     data.append("SubCategoryName", formData.subCategoryName);
// //     data.append("Colors", formData.colors.join(","));
// //     data.append("Sizes", formData.sizes.join(","));

// //     if (newImage) {
// //       data.append("Image", newImage);
// //     }

// //     try {
// //       await axios.put(
// //         `http://localhost:5005/api/Product/UpdateProduct/${id}`,
// //         data,
// //         {
// //           headers: {
// //             "Content-Type": "multipart/form-data",
// //           },
// //         }
// //       );
// //       setSuccessMessage("Product updated successfully!");
// //       setTimeout(() => navigate("/product"), 1500);
// //     } catch (err: any) {
// //       console.error(err);
// //       const serverMsg =
// //         err.response?.data?.message || err.response?.data || err.message;
// //       setError(typeof serverMsg === "string" ? serverMsg : JSON.stringify(serverMsg));
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-100 py-10 px-4">
// //       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
// //         <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white rounded-t-lg">
// //           <h2 className="text-2xl font-semibold">Edit Product</h2>
// //           <p className="text-sm text-blue-100">
// //             Modify the product information below
// //           </p>
// //         </div>

// //         <form onSubmit={handleUpdate} className="p-6 space-y-6">
// //           {error && (
// //             <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded">
// //               {error}
// //             </div>
// //           )}

// //           {successMessage && (
// //             <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded">
// //               {successMessage}
// //             </div>
// //           )}

// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //             <InputField
// //               label="Product Name"
// //               name="name"
// //               value={formData.name}
// //               onChange={handleChange}
// //             />
// //             <InputField
// //               type="number"
// //               label="Price ($)"
// //               name="price"
// //               value={formData.price}
// //               onChange={handleChange}
// //             />
// //             <InputField
// //               type="number"
// //               label="Stock Quantity"
// //               name="stock"
// //               value={formData.stock}
// //               onChange={handleChange}
// //             />
// //             <InputField
// //               label="Category"
// //               name="categoryName"
// //               value={formData.categoryName}
// //               onChange={handleChange}
// //             />
// //             <InputField
// //               label="Subcategory"
// //               name="subCategoryName"
// //               value={formData.subCategoryName}
// //               onChange={handleChange}
// //             />
// //           </div>

// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Available Colors (comma separated)
// //               </label>
// //               <input
// //                 value={formData.colors.join(", ")}
// //                 onChange={(e) => handleArrayInputChange(e, "colors")}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg"
// //                 placeholder="e.g., Red, Blue, Green"
// //               />
// //               <div className="mt-2 flex flex-wrap gap-2">
// //                 {formData.colors.map((color, idx) => (
// //                   <span
// //                     key={idx}
// //                     className="flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800"
// //                   >
// //                     <span
// //                       className="w-3 h-3 rounded-full border border-gray-300 inline-block"
// //                       style={{ backgroundColor: color.toLowerCase() }}
// //                     />
// //                     {color}
// //                   </span>
// //                 ))}
// //               </div>
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Available Sizes (comma separated)
// //               </label>
// //               <input
// //                 value={formData.sizes.join(", ")}
// //                 onChange={(e) => handleArrayInputChange(e, "sizes")}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg"
// //                 placeholder="e.g., S, M, L, XL"
// //               />
// //               <div className="mt-2 flex flex-wrap gap-2">
// //                 {formData.sizes.map((size, idx) => (
// //                   <span
// //                     key={idx}
// //                     className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-800"
// //                   >
// //                     {size}
// //                   </span>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>

// //           {/* Image Preview & Upload */}
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-2">
// //               Product Image
// //             </label>
// //             {imageUrl && (
// //               <img
// //                 src={imageUrl}
// //                 alt="Product"
// //                 className="w-40 h-40 object-cover rounded border mb-4"
// //               />
// //             )}
// //             <input
// //               type="file"
// //               accept="image/*"
// //               onChange={handleImageChange}
// //               className="block"
// //             />
// //           </div>

// //           <div className="flex justify-end pt-6 space-x-4">
// //             <button
// //               type="button"
// //               onClick={() => navigate("/product")}
// //               className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
// //               disabled={isLoading}
// //             >
// //               Cancel
// //             </button>
// //             <button
// //               type="submit"
// //               className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-70"
// //               disabled={isLoading}
// //             >
// //               {isLoading ? "Updating..." : "Update Product"}
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default EditProduct;

// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// // Reusable input field
// type InputFieldProps = {
//   label: string;
//   name: string;
//   type?: "text" | "number";
//   value: string | number;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// };
// const InputField: React.FC<InputFieldProps> = ({
//   label,
//   name,
//   type = "text",
//   value,
//   onChange,
// }) => (
//   <div>
//     <label className="block text-sm font-medium text-gray-700 mb-1">
//       {label}
//     </label>
//     <input
//       type={type}
//       name={name}
//       value={value}
//       onChange={onChange}
//       className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//     />
//   </div>
// );

// interface ProductForm {
//   name: string;
//   price: number;
//   stock: number;
//   categoryName: string;
//   subCategoryName: string;
//   colors: string[];
//   sizes: string[];
// }

// const EditProduct: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState<ProductForm>({
//     name: "",
//     price: 0,
//     stock: 0,
//     categoryName: "",
//     subCategoryName: "",
//     colors: [],
//     sizes: [],
//   });

//   const [imageUrl, setImageUrl] = useState<string>(""); // Current image
//   const [newImage, setNewImage] = useState<File | null>(null);  // New uploaded image
//   const [error, setError] = useState<string>("");
//   const [successMessage, setSuccessMessage] = useState<string>("");
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   // Fetch product details
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         setIsLoading(true);
//         const res = await axios.get(
//           `http://localhost:5005/api/Product/GetProductDetails/${id}`
//         );
//         const product = res.data;

//         setFormData({
//           name: product.name,
//           price: product.price,
//           stock: product.stock,
//           categoryName: product.categoryName,
//           subCategoryName: product.subCategoryName,
//           colors: product.colors || [],
//           sizes: product.sizes || [],
//         });
//         setImageUrl(product.imageUrl || "");
//       } catch (err) {
//         console.error(err);
//         setError("Failed to fetch product details.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (id) fetchProduct();
//   }, [id]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: e.target.type === "number" ? Number(value) : value,
//     }));
//   };

//   const handleArrayInputChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     field: "colors" | "sizes"
//   ) => {
//     const array = e.target.value
//       .split(",")
//       .map((item) => item.trim())
//       .filter(Boolean);
//     setFormData((prev) => ({ ...prev, [field]: array }));
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setNewImage(e.target.files[0]);
//     }
//   };

//   const handleUpdate = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setSuccessMessage("");
//     setIsLoading(true);

//     const data = new FormData();
//     data.append("Name", formData.name);
//     data.append("Price", formData.price.toString());
//     data.append("Stock", formData.stock.toString());
//     data.append("CategoryName", formData.categoryName);
//     data.append("SubCategoryName", formData.subCategoryName);

//     // Append each color and size separately
//     formData.colors.forEach((color) => data.append("Colors", color));
//     formData.sizes.forEach((size) => data.append("Sizes", size));

//     // Images property on DTO is List<IFormFile>? Images
//     if (newImage) {
//       data.append("Images", newImage);
//     }

//     try {
//       await axios.put(
//         `http://localhost:5005/api/Product/UpdateProduct/${id}`,
//         data,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       setSuccessMessage("Product updated successfully!");
//       setTimeout(() => navigate("/product"), 1500);
//     } catch (err: any) {
//       console.error(err);
//       const serverMsg =
//         err.response?.data?.message || err.response?.data || err.message;
//       setError(
//         typeof serverMsg === "string"
//           ? serverMsg
//           : JSON.stringify(serverMsg)
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-10 px-4">
//       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
//         <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white rounded-t-lg">
//           <h2 className="text-2xl font-semibold">Edit Product</h2>
//           <p className="text-sm text-blue-100">
//             Modify the product information below
//           </p>
//         </div>

//         <form onSubmit={handleUpdate} className="p-6 space-y-6">
//           {error && (
//             <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded">
//               {error}
//             </div>
//           )}

//           {successMessage && (
//             <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded">
//               {successMessage}
//             </div>
//           )}

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <InputField
//               label="Product Name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//             />
//             <InputField
//               type="number"
//               label="Price ($)"
//               name="price"
//               value={formData.price}
//               onChange={handleChange}
//             />
//             <InputField
//               type="number"
//               label="Stock Quantity"
//               name="stock"
//               value={formData.stock}
//               onChange={handleChange}
//             />
//             <InputField
//               label="Category"
//               name="categoryName"
//               value={formData.categoryName}
//               onChange={handleChange}
//             />
//             <InputField
//               label="Subcategory"
//               name="subCategoryName"
//               value={formData.subCategoryName}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Available Colors (comma separated)
//               </label>
//               <input
//                 value={formData.colors.join(", ")}
//                 onChange={(e) => handleArrayInputChange(e, "colors")}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//                 placeholder="e.g., Red, Blue, Green"
//               />
//               <div className="mt-2 flex flex-wrap gap-2">
//                 {formData.colors.map((color, idx) => (
//                   <span
//                     key={idx}
//                     className="flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800"
//                   >
//                     <span
//                       className="w-3 h-3 rounded-full border border-gray-300 inline-block"
//                       style={{ backgroundColor: color.toLowerCase() }}
//                     />
//                     {color}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Available Sizes (comma separated)
//               </label>
//               <input
//                 value={formData.sizes.join(", ")}
//                 onChange={(e) => handleArrayInputChange(e, "sizes")}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//                 placeholder="e.g., S, M, L, XL"
//               />
//               <div className="mt-2 flex flex-wrap gap-2">
//                 {formData.sizes.map((size, idx) => (
//                   <span
//                     key={idx}
//                     className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-800"
//                   >
//                     {size}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Image Preview & Upload */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Product Image
//             </label>
//             {imageUrl && (
//               <img
//                 src={imageUrl}
//                 alt="Product"
//                 className="w-40 h-40 object-cover rounded border mb-4"
//               />
//             )}
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="block"
//             />
//           </div>

//           <div className="flex justify-end pt-6 space-x-4">
//             <button
//               type="button"
//               onClick={() => navigate("/product")}
//               className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
//               disabled={isLoading}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-70"
//               disabled={isLoading}
//             >
//               {isLoading ? "Updating..." : "Update Product"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditProduct;


// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import AdminSidebar from "./AdminSidebar";
// import { useNavigate, useParams } from "react-router-dom";

// const API_BASE_URL = "http://localhost:5005/api";

// interface ProductForm {
//   name: string;
//   price: number;
//   stock: number;
//   category: string;
//   subcategory: string;
//   description: string;
//   selectedColors: string[];
//   selectedSizes: string[];
//   images: File[];
// }

// const subCategories: Record<string, string[]> = {
//   Women: ["Tops", "Dresses", "T-Shirts"],
//   Men: ["Formal Shirts", "T-Shirts", "Denims"],
//   Kids: ["Girls", "Boys", "Toddlers"],
// };

// const colorOptions = ["Blue", "Red", "Pink", "Yellow", "Green", "Black", "White"];
// const sizeOptions = ["S", "M", "L", "XL", "XXL"];

// const EditProduct: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState<ProductForm>({
//     name: "",
//     price: 0,
//     stock: 0,
//     category: "",
//     subcategory: "",
//     description: "",
//     selectedColors: [],
//     selectedSizes: [],
//     images: [],
//   });
//   const [imageUrl, setImageUrl] = useState<string>("");
//   const [error, setError] = useState<string>("");
//   const [successMessage, setSuccessMessage] = useState<string>("");
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         setIsLoading(true);
//         const res = await axios.get(`${API_BASE_URL}/Product/GetProductDetails/${id}`);
//         const p = res.data;
//         setFormData({
//           name: p.name || "",
//           price: p.price || 0,
//           stock: p.stock || 0,
//           category: p.categoryName || "",
//           subcategory: p.subCategoryName || "",
//           description: p.description || "",
//           selectedColors: p.colors || [],
//           selectedSizes: p.sizes || [],
//           images: [],
//         });
//         setImageUrl(p.imageUrl || "");
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load product.");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     if (id) fetchProduct();
//   }, [id]);

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     const { name, value, type } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'number' ? Number(value) : value,
//     } as unknown as ProductForm));
//   };

//   const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { value, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       selectedColors: checked
//         ? [...prev.selectedColors, value]
//         : prev.selectedColors.filter(c => c !== value),
//     }));
//   };

//   const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { value, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       selectedSizes: checked
//         ? [...prev.selectedSizes, value]
//         : prev.selectedSizes.filter(s => s !== value),
//     }));
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (files && files.length) {
//       setFormData(prev => ({ ...prev, images: Array.from(files) }));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setSuccessMessage("");
//     setIsLoading(true);

//     const data = new FormData();
//     data.append("Name", formData.name);
//     data.append("CategoryName", formData.category);
//     data.append("SubCategoryName", formData.subcategory);
//     data.append("Stock", formData.stock.toString());
//     data.append("Price", formData.price.toString());
//     data.append("Description", formData.description || "No description");

//     if (formData.selectedColors.length) {
//       formData.selectedColors.forEach(c => data.append("Colors", c));
//     } else {
//       data.append("Colors", "Default");
//     }

//     if (formData.selectedSizes.length) {
//       formData.selectedSizes.forEach(s => data.append("Sizes", s));
//     } else {
//       data.append("Sizes", "Default");
//     }

//     formData.images.forEach(img => data.append("Images", img));

//     try {
//       await axios.put(`${API_BASE_URL}/Product/UpdateProduct/${id}`, data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setSuccessMessage("Product updated successfully!");
//       setTimeout(() => navigate("/Product"), 1500);
//     } catch (err: any) {
//       console.error(err);
//       const msg = err.response?.data?.message || err.message;
//       setError(typeof msg === 'string' ? msg : JSON.stringify(msg));
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex">
//       <AdminSidebar />
//       <div className="min-h-screen bg-gray-100 flex-1 p-6">
//         <div className="max-w-3xl mx-auto bg-white rounded-md shadow-md p-8">
//           <h2 className="text-2xl font-bold mb-6">
//             Edit Product
//           </h2>
//           {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
//           {successMessage && <div className="bg-green-100 text-green-700 p-3 rounded mb-4">{successMessage}</div>}
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Name</label>
//                 <input
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Category</label>
//                 <select
//                   name="category"
//                   value={formData.category}
//                   onChange={handleChange}
//                   className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
//                   required
//                 >
//                   <option value="">Select</option>
//                   {Object.keys(subCategories).map(cat => (
//                     <option key={cat} value={cat}>{cat}</option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Subcategory</label>
//                 <select
//                   name="subcategory"
//                   value={formData.subcategory}
//                   onChange={handleChange}
//                   className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
//                   disabled={!formData.category}
//                   required
//                 >
//                   <option value="">Select</option>
//                   {formData.category && subCategories[formData.category].map(sub => (
//                     <option key={sub} value={sub}>{sub}</option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Price ($)</label>
//                 <input
//                   name="price"
//                   type="number"
//                   value={formData.price}
//                   onChange={handleChange}
//                   className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Stock Quantity</label>
//                 <input
//                   name="stock"
//                   type="number"
//                   value={formData.stock}
//                   onChange={handleChange}
//                   className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
//                   required
//                 />
//               </div>
//             </div>
           
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Select Colors</label>
//               <div className="flex flex-wrap gap-4 mt-2">
//                 {colorOptions.map(color => (
//                   <label key={color} className="inline-flex items-center">
//                     <input
//                       type="checkbox"
//                       value={color}
//                       checked={formData.selectedColors.includes(color)}
//                       onChange={handleColorChange}
//                       className="form-checkbox h-4 w-4"
//                     />
//                     <span className="ml-2">{color}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Select Sizes</label>
//               <div className="flex flex-wrap gap-4 mt-2">
//                 {sizeOptions.map(size => (
//                   <label key={size} className="inline-flex items-center">
//                     <input
//                       type="checkbox"
//                       value={size}
//                       checked={formData.selectedSizes.includes(size)}
//                       onChange={handleSizeChange}
//                       className="form-checkbox h-4 w-4"
//                     />
//                     <span className="ml-2">{size}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>
//             {/* <div>
//               <label className="block text-sm font-medium text-gray-700">Upload Images</label>
//               <input
//                 type="file"
//                 multiple
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
//               />
//               {imageUrl && (
//                 <img
//                   src={imageUrl}
//                   alt="Current Product"
//                   className="mt-4 w-32 h-32 object-cover rounded border"
//                 />
//               )}
//             </div> */}
//             <div className="flex justify-end">
//               <button
//                 type="submit"
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow"
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Updating..." : "Update Product"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditProduct;

import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { useNavigate, useParams } from "react-router-dom";

const API_BASE_URL = "http://localhost:5005/api";

interface ProductForm {
  name: string;
  price: number;
  stock: number;
  category: string;
  subcategory: string;
  selectedColors: string[];
  selectedSizes: string[];
  images: File[];
}

const subCategories: Record<string, string[]> = {
  Women: ["Tops", "Dresses", "T-Shirts"],
  Men: ["Formal Shirts", "T-Shirts", "Denims"],
  Kids: ["Girls", "Boys", "Toddlers"],
};

const colorOptions = ["Blue", "Red", "Pink", "Yellow", "Green", "Black", "White"];
const sizeOptions = ["S", "M", "L", "XL", "XXL"];

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ProductForm>({
    name: "",
    price: 0,
    stock: 0,
    category: "",
    subcategory: "",
    selectedColors: [],
    selectedSizes: [],
    images: [],
  });
  const [imageUrl, setImageUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${API_BASE_URL}/Product/GetProductDetails/${id}`);
        const p = res.data;
        setFormData({
          name: p.name || "",
          price: p.price || 0,
          stock: p.stock || 0,
          category: p.categoryName || "",
          subcategory: p.subCategoryName || "",
          selectedColors: p.colors || [],
          selectedSizes: p.sizes || [],
          images: [],
        });
        setImageUrl(p.imageUrl || "");
      } catch (err) {
        console.error(err);
        setError("Failed to load product.");
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    } as unknown as ProductForm));
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      selectedColors: checked
        ? [...prev.selectedColors, value]
        : prev.selectedColors.filter(c => c !== value),
    }));
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      selectedSizes: checked
        ? [...prev.selectedSizes, value]
        : prev.selectedSizes.filter(s => s !== value),
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length) {
      setFormData(prev => ({ ...prev, images: Array.from(files) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    // Validation: all required fields (except images) must be filled
    if (formData.name.trim() === "") {
      setError("Name is required.");
      return;
    }
    if (formData.category === "") {
      setError("Category is required.");
      return;
    }
    if (formData.subcategory === "") {
      setError("Subcategory is required.");
      return;
    }
    if (formData.price < 0) {
      setError("Price cannot be negative.");
      return;
    }
    if (formData.stock < 0) {
      setError("Stock quantity cannot be negative.");
      return;
    }
    if (formData.selectedColors.length === 0) {
      setError("Please select at least one color.");
      return;
    }
    if (formData.selectedSizes.length === 0) {
      setError("Please select at least one size.");
      return;
    }

    setIsLoading(true);

    const data = new FormData();
    data.append("Name", formData.name);
    data.append("CategoryName", formData.category);
    data.append("SubCategoryName", formData.subcategory);
    data.append("Stock", formData.stock.toString());
    data.append("Price", formData.price.toString());

    formData.selectedColors.forEach(c => data.append("Colors", c));
    formData.selectedSizes.forEach(s => data.append("Sizes", s));
    formData.images.forEach(img => data.append("Images", img));

    try {
      await axios.put(`${API_BASE_URL}/Product/UpdateProduct/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccessMessage("Product updated successfully!");
      setTimeout(() => navigate("/Product"), 1500);
    } catch (err: any) {
      console.error(err);
      const msg = err.response?.data?.message || err.message;
      setError(typeof msg === "string" ? msg : JSON.stringify(msg));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="min-h-screen bg-gray-100 flex-1 p-6">
        <div className="max-w-3xl mx-auto bg-white rounded-md shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6">Edit Product</h2>

          {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
          {successMessage && (
            <div className="bg-green-100 text-green-700 p-3 rounded mb-4">{successMessage}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
                  required
                >
                  <option value="">Select</option>
                  {Object.keys(subCategories).map(cat => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Subcategory</label>
                <select
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
                  disabled={!formData.category}
                  required
                >
                  <option value="">Select</option>
                  {formData.category &&
                    subCategories[formData.category].map(sub => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                <input
                  name="price"
                  type="number"
                  min={0}
                  value={formData.price}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Stock Quantity</label>
                <input
                  name="stock"
                  type="number"
                  min={0}
                  value={formData.stock}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
            </div>

            {/* <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
                rows={4}
                required
              />
            </div> */}

            <div>
              <label className="block text-sm font-medium text-gray-700">Select Colors</label>
              <div className="flex flex-wrap gap-4 mt-2">
                {colorOptions.map(color => (
                  <label key={color} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      value={color}
                      checked={formData.selectedColors.includes(color)}
                      onChange={handleColorChange}
                      className="form-checkbox h-4 w-4"
                    />
                    <span className="ml-2">{color}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Select Sizes</label>
              <div className="flex flex-wrap gap-4 mt-2">
                {sizeOptions.map(size => (
                  <label key={size} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      value={size}
                      checked={formData.selectedSizes.includes(size)}
                      onChange={handleSizeChange}
                      className="form-checkbox h-4 w-4"
                    />
                    <span className="ml-2">{size}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Upload Images (optional)</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
              />
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Current Product"
                  className="mt-4 w-32 h-32 object-cover rounded border"
                />
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow"
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
