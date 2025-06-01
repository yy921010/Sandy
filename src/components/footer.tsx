import { Heart, Rss } from "lucide-react";
import { SITE } from "@/config";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:justify-between md:items-center">
          <div className="text-center md:text-left flex items-center justify-center md:justify-start">
            <span className="text-xs text-muted-foreground">
              © {SITE.footer.year} {SITE.footer.allRightsReserved}
            </span>
            <Button variant="ghost" className="h-9 w-9 p-0" asChild>
              <Link
                href="/rss"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="RSS Feed"
              >
                <Rss className="h-8 w-8 text-sm" />
              </Link>
            </Button>
          </div>

          <div className="flex items-center justify-center md:justify-start space-x-1 text-xs text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-3 w-3 text-destructive fill-current" />
            <span>by</span>
            <a
              href="https://vercel.com"
              className="hover:text-foreground transition-colors"
            >
              Vercel
            </a>
          </div>

          {/* 法律链接 */}
          <div className="flex justify-center md:justify-end space-x-4 text-xs">
            <a
              href={SITE.footer.copyright}
              className="text-muted-foreground hover:text-foreground transition-colors py-1"
            >
              {SITE.footer.copyright}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
