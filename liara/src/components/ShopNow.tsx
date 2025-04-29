import React, { useState, useEffect } from "react";
import ProductModal from "./ProductModal"; // Import the modal component

interface ProductImage {
  ImageID: number;
  base64Image: string;
}

interface Product {
  productID: number;
  name: string;
  CategoryID: number;
  SubCategoryID?: number;
  Stock: number;
  price: number;
  Color: string[];
  Size: string[];
  images: ProductImage[];
}

const ShopNow: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5005/api/Product/GetAllProducts");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data: Product[] = await response.json();
        console.log("Fetched Products:", data);

        // Filter out null values in Color and Size
        const sanitizedProducts = data.map(product => ({
          ...product,
          Color: (product.Color || []).filter((c): c is string => c !== null),
          Size: (product.Size || []).filter((s): s is string => s !== null),
        }));

        setProducts(sanitizedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="shopnow-page flex flex-col min-h-screen p-6">
      <h2 className="text-3xl font-semibold text-center mb-6">Shop Now</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.productID}
              className="p-4 border rounded-lg shadow-md text-center hover:shadow-lg transition duration-300 cursor-pointer m-3"
              onClick={() => {
                if (product.productID) {
                  console.log("Product Clicked:", product.productID);
                  setSelectedProductId(product.productID);
                } else {
                  console.error("ProductID is undefined for", product);
                }
              }}
            >
              {product.images?.length > 0 && product.images[0]?.base64Image && (
                <img
                  src={`data:image/png;base64,${product.images[0].base64Image}`}
                  alt={product.name}
                  className="w-[300px] h-[350px] object-cover "
                />
              )}

              <h3 className="text-lg font-medium mt-2">{product.name}</h3>

              <p className="text-black font-semibold mt-2">Rs. {product.price}</p>
            </div>
          ))}
        </div>
      )}

      {selectedProductId && (
        <ProductModal
          ProductID={selectedProductId}
          isOpen={Boolean(selectedProductId)}
          onClose={() => setSelectedProductId(null)}
        />
      )}
    </div>
  );
};

export default ShopNow;
