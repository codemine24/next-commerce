import { Suspense } from "react";

import { BoxContainer } from "@/components/box-container";
import { LoadingSpinner } from "@/components/loading-spinner";

import { Banner } from "./_components/banner";
import { CustomerReviewSection } from "./_components/customer-review/customer-review-section";
import { FeaturedCategory } from "./_components/featured-category";
import { HeroSection } from "./_components/hero/hero-section";
import { HotDeals } from "./_components/hot-deals";
import { NewArrivals } from "./_components/new-arrivals";
import { NewsLetter } from "./_components/news-letter";
import { RecentBlogs } from "./_components/recent-blogs";
import { Services } from "./_components/services";

export default function Home() {
  return (
    <BoxContainer sx={{ py: 2 }}>
      <HeroSection />
      <FeaturedCategory />
      <HotDeals />
      <Banner />
      <NewArrivals />
      <CustomerReviewSection />
      <Suspense fallback={<LoadingSpinner />}>
        <NewsLetter />
      </Suspense>
      <RecentBlogs />
      <Services />
    </BoxContainer>
  );
}
