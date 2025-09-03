import { BoxContainer } from "@/components/layout/box-container";
import { CategoriesSection } from "./_components/categories/categories-section";
import { HeroSection } from "./_components/hero/hero-section";
import { NewArrivals } from "./_components/new-arrivals";
import { Banner } from "./_components/banner";
import { HotDeals } from "./_components/hot-deals";
import { NewsLetter } from "./_components/news-letter";

export default function Home() {
  return (
    <BoxContainer sx={{ mt: 2 }}>
      <HeroSection />
      <CategoriesSection />
      <NewArrivals />
      <Banner />
      <HotDeals />
      <NewsLetter />
    </BoxContainer>
  )
}
