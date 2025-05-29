import { Footer } from "@/components/footer";
import { MDX } from "@/components/mdx-render";
import { Navbar } from "@/components/navbar";
import { ScrollTop } from "@/components/scroll-top";
import { Prose } from "@/components/ui/typography";
import { getProfileJsonLd } from "@/lib/jsonLd";
import { getProfile } from "@/lib/mdx";

export default function Home() {
  const [profile] = getProfile();
  const webJsonLd = getProfileJsonLd();
  return (
    <>
      <script type="application/ld+json">{JSON.stringify(webJsonLd)}</script>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="container mx-auto py-6 px-4 flex-1 max-w-4xl">
          <Prose>
            <MDX code={profile.content} />
          </Prose>
        </main>
        <Footer />
        <ScrollTop />
      </div>
    </>
  );
}
