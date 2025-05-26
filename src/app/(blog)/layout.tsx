import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { cn } from "@/lib/utils";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="container mx-auto py-6 px-4 flex-1">
        <div
          className={cn(
            "flex flex-col items-center justify-center",
            "min-h-[calc(100vh-64px)]",
          )}
        >
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
