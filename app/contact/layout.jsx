import Footer from "@/components/footer";
import Header from "@/components/header";

export const metadata = {
  title: "Contact us | Kvika",
};

export default function Layout({ children }) {
  return (
    <div className="pt-6 bg-white flex flex-col items-center justify-between w-full min-h-screen">
      <div className="w-full max-w-7xl">
        <Header />
      </div>
      <div className="w-full max-w-7xl flex bg-slate-50 flex-col md:flex-row rounded-lg p-8 justify-center mt-16">
        <div className="flex md:w-1/2 ">{children}</div>
        <div className="flex text-slate-800 flex-col justify-between md:w-1/2">
          <div className="px-4 p-6">
            <h4 className="text-lg font-bold text-slate-900">Kvika</h4>
            <p className="font-medium">Coredes Interactive Pvt Ltd</p>
            <p>11/275-J138, Heavenly Plaza</p>
            <p>Civil Line Road, Kakkanad</p>
            <p>Kochi - 682021</p>
          </div>
          <div className="py-8 px-4">
            <p>Email : sales@coredes.io</p>
            <p>Phone : +91 7259693630</p>
          </div>
        </div>
      </div>
      <div className="w-full max-w-7xl">
        <Footer />
      </div>
    </div>
  );
}
