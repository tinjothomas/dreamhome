import Footer from "@/components/footer";
import Header from "@/components/header";

export const metadata = {
  title: "About us | Kvika",
};

export default function Layout({ children }) {
  return (
    <div className="pt-6 bg-white flex flex-col items-center justify-between w-full min-h-screen">
      <div className="w-full max-w-7xl">
        <Header />
      </div>
      <div className="w-full max-w-7xl flex bg-slate-50 flex-col md:flex-row rounded-lg p-8 justify-center mt-16">
        <div className="flex md:w-1/2 ">{children}</div>
        <div className="flex text-slate-800 flex-col justify-between md:w-1/2"></div>
      </div>
      <div className="w-full max-w-7xl">
        <Footer />
      </div>
    </div>
  );
}
