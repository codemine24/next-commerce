import { Suspense } from "react";

import { BoxContainer } from "@/components/box-container";

import { Banner } from "./_components/banner";
import { CustomerReviewSection } from "./_components/customer-review/customer-review-section";
import FeaturedProductCard from "./_components/featured-product-card";
import { HeroSection } from "./_components/hero/hero-section";
import { HotDeals } from "./_components/hot-deals";
import { NewArrivals } from "./_components/new-arrivals";
import { NewsLetter } from "./_components/news-letter";
import { RecentBlogs } from "./_components/recent-blogs";
import { Services } from "./_components/services";
import { LoadingSpinner } from "@/components/loading-spinner";

export default function Home() {
  return (
    <BoxContainer sx={{ py: 2 }}>
      <HeroSection />
      <FeaturedProductCard />
      <HotDeals />
      <Banner />
      <NewArrivals />
      <CustomerReviewSection />
      <Suspense fallback={<LoadingSpinner />}>
        <NewsLetter />
      </Suspense>
      <RecentBlogs />
      <Services />
      {/* <Footer /> */}
    </BoxContainer>
  );
}
