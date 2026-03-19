"use client";
import { useEffect, useState } from "react";
import { getAllBlogs } from "../../api/module/blog";
import Banner from "../components/banner";
import { banner } from "../components/bannerData";
import BlogArticleCards from "../components/blogArticleCards";
import { BlogItem } from "./types";

function Page() {
  const [blogData, setBlogData] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    handleGetBlog();
  }, []);

  const handleGetBlog = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllBlogs();

      if (response.status === 200 || response.status === 201) {
        const blogs = response?.data?.data?.blogs || [];
        setBlogData(blogs);
      } else {
        setError("Failed to fetch blogs");
      }
    } catch (error) {
      console.error("Blog Fetch Error:", error);
      setError("Error loading blogs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Banner
        bgImage={banner[6].bgImage}
        heading={banner[6].heading}
        subheading={banner[6].subheading}
      />
      {loading ? (
        <div className="w-full min-h-[200px] flex items-center justify-center text-gray-400">
          Loading blogs...
        </div>
      ) : error ? (
        <div className="w-full min-h-[200px] flex items-center justify-center text-red-400">
          {error}
        </div>
      ) : (
        <BlogArticleCards data={blogData} basePath="/blogs" />
      )}
    </div>
  );
}

export default Page;
