import Link from "next/link";
import ImagesSlider from "@/components/ImagesSlider";
import classes from './page.module.css'
import Review from "@/components/Review";
import Subhero from "@/components/Subhero";
export default function Home() {
    return (
        <>
            <header className='  flex flex-col lg:flex-row items-center gap-12 mx-auto w-full max-w-6xl '>
                <div className='flex-grow w-full h-[20rem] md:h-96'>
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
            <main>
                <Subhero />
                <Review />
            </main>
            <footer className={`${classes.footer}  text-white py-8`}>
                <div className='flex flex-col lg:flex-row justify-between items-center gap-4 mx-auto w-full max-w-6xl px-4'>
                    <div>
                        <h3 className='text-lg font-bold'>شعبيات القاهرة</h3>
                        <p>المكان الأول لأكلات مصرية أصيلة.</p>
                    </div>
                    <div>
                        <h4 className='text-md font-semibold'>روابط سريعة</h4>
                        <ul>
                            <li><a href="/community" className='hover:text-gray-300'>انضم لعيلتنا</a></li>
                            <li><a href="/meals" className='hover:text-gray-300'>اكتشف أكلاتنا</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className='text-md font-semibold'>تواصل معانا</h4>
                        <p>لأي استفسارات أو ملاحظات، لا تتردد في التواصل.</p>
                    </div>
                </div>
            </footer>
        </>
    );
}
