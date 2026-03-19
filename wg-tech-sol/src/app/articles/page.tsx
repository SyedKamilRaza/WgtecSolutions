"use client";
import { useEffect, useState } from "react";
import { getAllArticles } from "../../api/module/articles";
import Banner from "../components/banner";
import { banner } from "../components/bannerData";
import BlogArticleCards from "../components/blogArticleCards";
import { ArticleItem } from "./types";

function Page() {
  const [articleData, setArticleData] = useState<ArticleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    handleGetArticles();
  }, []);

  const handleGetArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllArticles();

      if (response.status === 200 || response.status === 201) {
        const articles = response?.data?.data?.articles || [];
        setArticleData(articles);
      } else {
        setError("Failed to fetch articles");
      }
    } catch (error) {
      console.error("Article Fetch Error:", error);
      setError("Error loading articles. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Banner
        bgImage={banner[8].bgImage}
        heading={banner[8].heading}
        subheading={banner[8].subheading}
      />
      {loading ? (
        <div className="w-full min-h-[200px] flex items-center justify-center text-gray-400">
          Loading articles...
        </div>
      ) : error ? (
        <div className="w-full min-h-[200px] flex items-center justify-center text-red-400">
          {error}
        </div>
      ) : (
        <BlogArticleCards data={articleData} basePath="/articles" />
      )}
    </div>
  );
}

export default Page;
