import { BoxContainer } from "@/components/box-container";
import { CategoriesSection } from "./_components/categories/categories-section";
import { HeroSection } from "./_components/hero/hero-section";
import { NewArrivals } from "./_components/new-arrivals";
import { Banner } from "./_components/banner";
import { HotDeals } from "./_components/hot-deals";
import { NewsLetter } from "./_components/news-letter";
import { RecentBlogs } from "./_components/recent-blogs";
import { Services } from "./_components/services";
import FeaturedProductCard from "./_components/featured-product-card";

export default function Home() {
  return (
    <BoxContainer sx={{ mt: 2 }}>
      <HeroSection />
      <FeaturedProductCard />
      <CategoriesSection />
      <NewArrivals />
      <Banner />
      <HotDeals />
      <NewsLetter />
      <RecentBlogs />
      <Services />
    </BoxContainer>
  );
}
