import Review from "@/components/Reviews/Review";
import Subhero from "@/components/Subhero";
import Reviews from "@/components/Reviews/Reviews";
import Footer from "@/components/Footer";
import HomeHeader from "@/components/HomeHeader";
export default function Home() {
  return (
    <>
      <HomeHeader />
      <img
        src={"http://64.225.107.17/storage/2/img.png"}
        // alt={name}
        className="object-cover w-96 h-96"
      />
      <main>
        <Subhero />
        <Review />
        <Reviews />
      </main>
      <Footer />
    </>
  );
}
