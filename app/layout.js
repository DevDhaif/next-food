import { El_Messiri } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

// const inter = Inter({ subsets: ["latin"] });
const messiri = El_Messiri({
  subsets: ["latin", "arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-messiri",
});

export const metadata = {
  title: "NextLevel Food",
  description: "Delicious meals, shared by a food-loving community.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar">
      <body className={`relative text-right ${messiri.className}`}>
        <div className="absolute inset-[15%] block rounded-full bg-white/15 blur-[100px]"></div>
        <svg width="0" height="0">
          <defs>
            <linearGradient
              id="gradient-fill"
              x1="0%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" style={{ stopColor: "#450a0a" }} />
              <stop offset="70%" style={{ stopColor: "#dc2626" }} />
              <stop offset="100%" style={{ stopColor: "#dc2626" }} />
            </linearGradient>
          </defs>
        </svg>
        <svg
          className="absolute z-0 inset-0 w-full "
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="url(#gradient-fill)"
            fillOpacity="1"
            d="M0,288L40,288C80,288,160,288,240,261.3C320,235,400,181,480,144C560,107,640,85,720,101.3C800,117,880,171,960,170.7C1040,171,1120,117,1200,112C1280,107,1360,149,1400,170.7L1440,192L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
          ></path>
        </svg>
        <Header className="z-10" />
        <main className="relative container mx-auto pt-32 z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
