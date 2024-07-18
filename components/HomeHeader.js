import classes from "../app//page.module.css";
import ImagesSlider from "./ImagesSlider";
import Link from "next/link";

function HomeHeader() {
  return (
    <header className="  flex flex-col lg:flex-row items-center gap-12 mx-auto w-full max-w-6xl ">
      <div className="flex-grow w-full h-[20rem] md:h-96">
        <ImagesSlider />
      </div>
      <div>
        <div className={classes.hero}>
          <h1>أكل بيتي بطعم زمان في شعبيات القاهرة</h1>
          <p>دوق واستمتع بأشهى الأكلات المصرية الأصيلة.</p>
        </div>
        <div className={classes.cta}>
          <Link href="/community">انضم لعيلتنا</Link>
          <Link href="/meals">اكتشف أكلاتنا</Link>
        </div>
      </div>
    </header>
  );
}

export default HomeHeader;
