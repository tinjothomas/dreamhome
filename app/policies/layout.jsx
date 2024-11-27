import Header from "@/components/header";
import Footer from "@/components/footer";

export default function DashboardLayout({
  children, // will be a page or nested layout
}) {
  return (
    <div className="max-w-7xl w-full bg-white">
      <Header />
      <div className="markdown-content">{children}</div>
      <Footer />
    </div>
  );
}
