import Review from "@/components/Reviews/Review";
import Subhero from "@/components/Subhero";
import Reviews from "@/components/Reviews/Reviews";
import Footer from "@/components/Footer";
import HomeHeader from "@/components/HomeHeader";
export default function Home() {
  return (
    <>
      <HomeHeader />
      <main>
        <Subhero />
        <Review />
        <Reviews />
      </main>
      <Footer />
    </>
  );
}
