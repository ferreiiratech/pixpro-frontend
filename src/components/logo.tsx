import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/">
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="relative h-8 w-8">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-lg" />
          <div className="absolute inset-0.5 bg-background rounded-lg flex items-center justify-center">
            <GalleryVerticalEnd className="size-4" />
          </div>
        </div>
        <span className="text-xl font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          PixPro
        </span>
      </div>
    </Link>
  );
}
