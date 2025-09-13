import Grid from "@mui/material/Grid";
import * as React from "react";

import { BoxContainer } from "@/components/box-container";

import { ArticleCard } from "./ArticleCard";
import { blogData } from "./blog-data";
import { PaginationOutlined } from "./pagination";


interface Article {
  slug: string;
  image: string;
  overlayText: string;
  title: string;
  author: string;
  date: string;
  description: string;
}
interface BlogGridProps {
  articles: Article[];
}

const ArticleGrid: React.FC<BlogGridProps> = ({ articles }) => {
  return (
    <Grid container spacing={2}>
      {articles.map((article, index) => (
        <Grid size={{ xs: 12, sm: 4, md: 3 }} key={index}>
          <ArticleCard article={article} />
        </Grid>
      ))}
    </Grid>
  );
};

const BlogPage = () => {
  return (
    <BoxContainer sx={{ py: 2 }}>
      <ArticleGrid articles={blogData} />
      <PaginationOutlined />
    </BoxContainer>
  );
};

export default BlogPage;
