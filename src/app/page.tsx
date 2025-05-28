import { Footer } from "@/components/footer";
import { MDX } from "@/components/mdx";
import { Navbar } from "@/components/navbar";
import { Prose } from "@/components/ui/typography";
import { getProfile } from "@/lib/mdx";

export default function Home() {
  const [profile] = getProfile();
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto py-6 px-4 flex-1 max-w-4xl">
        <Prose>
          <MDX code={profile.content} />
        </Prose>
      </main>
      <Footer />
    </div>
  );
}
