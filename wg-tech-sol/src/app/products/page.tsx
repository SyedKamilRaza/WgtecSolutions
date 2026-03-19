"use client";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../api/module/product";
import Banner from "../components/banner";
import { banner } from "../components/bannerData";
import Cards from "../components/cards";
import { ProductItem } from "./types";

function Page() {
  const [productData, setProductData] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    handleGetProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllProducts();

      if (response.status === 200 || response.status === 201) {
        const products = response?.data?.data?.products || [];
        setProductData(products);
      } else {
        setError("Failed to fetch products");
      }
    } catch (error) {
      console.error("Product Fetch Error:", error);
      setError("Error loading products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Banner
        bgImage={banner[11].bgImage}
        heading={banner[11].heading}
        subheading={banner[11].subheading}
      />
      {loading ? (
        <div className="w-full min-h-[200px] flex items-center justify-center text-gray-400">
          Loading products...
        </div>
      ) : error ? (
        <div className="w-full min-h-[200px] flex items-center justify-center text-red-400">
          {error}
        </div>
      ) : (
        <Cards blogData={productData} basePath="/products" />
      )}
    </div>
  );
}

export default Page;
