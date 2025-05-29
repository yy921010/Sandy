import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ScrollTop } from "@/components/scroll-top";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto py-6 px-4 flex-1 max-w-4xl group/toc">
        {children}
      </main>
      <Footer />
      <ScrollTop />
    </div>
  );
}
