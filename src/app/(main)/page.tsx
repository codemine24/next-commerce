import { BoxContainer } from "@/components/box-container";

import { Banner } from "./_components/banner";
import FeaturedProductCard from "./_components/featured-product-card";
import { HeroSection } from "./_components/hero/hero-section";
import { HotDeals } from "./_components/hot-deals";
import { NewArrivals } from "./_components/new-arrivals";
import { NewsLetter } from "./_components/news-letter";
import { RecentBlogs } from "./_components/recent-blogs";
import { Services } from "./_components/services";

export default function Home() {
  return (
    <BoxContainer>
      <HeroSection />
      <FeaturedProductCard />
      <NewArrivals />
      <Banner />
      <HotDeals />
      <NewsLetter />
      <RecentBlogs />
      <Services />
    </BoxContainer>
  );
}
