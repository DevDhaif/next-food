import classes from "../app/page.module.css";
export default function Footer() {
  return (
    <footer className={`${classes.footer}  text-white py-8`}>
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mx-auto w-full max-w-6xl px-4">
        <div>
          <h3 className="text-lg font-bold">شعبيات القاهرة</h3>
          <p>المكان الأول لأكلات مصرية أصيلة.</p>
        </div>
        <div>
          <h4 className="text-md font-semibold">روابط سريعة</h4>
          <ul>
            <li>
              <a href="/community" className="hover:text-gray-300">
                انضم لعيلتنا
              </a>
            </li>
            <li>
              <a href="/meals" className="hover:text-gray-300">
                اكتشف أكلاتنا
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-md font-semibold">تواصل معانا</h4>
          <p>لأي استفسارات أو ملاحظات، لا تتردد في التواصل.</p>
        </div>
      </div>
    </footer>
  );
}
