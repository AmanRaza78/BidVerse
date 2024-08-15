import Image from "next/image";
import Link from "next/link";
import { JSX, SVGProps } from "react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <Image
                src="/heroimage.png"
                alt="Hero"
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                width={550}
                height={550}
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Discover Rare Treasures at Our Auctions
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Explore a curated selection of unique and valuable items up
                    for auction. Bid with confidence and uncover hidden gems.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    View All Auctions
                  </Link>
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Create Your Own
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id="featured-auctions"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Featured Auctions
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Explore Our Curated Collection
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Browse our selection of rare and valuable items up for
                  auction. Bid with confidence and uncover hidden gems.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 sm:grid-cols-2 md:grid-cols-3 lg:gap-12">
              <div className="group grid gap-2">
                <img
                  src="/placeholder.svg"
                  alt="Auction Item"
                  className="mx-auto aspect-[4/3] overflow-hidden rounded-xl object-cover object-center transition-all group-hover:scale-105"
                  width="400"
                  height="300"
                />
                <div className="space-y-1">
                  <h3 className="text-lg font-bold">Antique Pocket Watch</h3>
                  <p className="text-muted-foreground">
                    Current Bid: <span className="font-semibold">$1,250</span>
                  </p>
                </div>
              </div>
              <div className="group grid gap-2">
                <img
                  src="/placeholder.svg"
                  alt="Auction Item"
                  className="mx-auto aspect-[4/3] overflow-hidden rounded-xl object-cover object-center transition-all group-hover:scale-105"
                  width="400"
                  height="300"
                />
                <div className="space-y-1">
                  <h3 className="text-lg font-bold">Vintage Typewriter</h3>
                  <p className="text-muted-foreground">
                    Current Bid: <span className="font-semibold">$850</span>
                  </p>
                </div>
              </div>
              <div className="group grid gap-2">
                <img
                  src="/placeholder.svg"
                  alt="Auction Item"
                  className="mx-auto aspect-[4/3] overflow-hidden rounded-xl object-cover object-center transition-all group-hover:scale-105"
                  width="400"
                  height="300"
                />
                <div className="space-y-1">
                  <h3 className="text-lg font-bold">Vintage Vinyl Records</h3>
                  <p className="text-muted-foreground">
                    Current Bid: <span className="font-semibold">$475</span>
                  </p>
                </div>
              </div>
              <div className="group grid gap-2">
                <img
                  src="/placeholder.svg"
                  alt="Auction Item"
                  className="mx-auto aspect-[4/3] overflow-hidden rounded-xl object-cover object-center transition-all group-hover:scale-105"
                  width="400"
                  height="300"
                />
                <div className="space-y-1">
                  <h3 className="text-lg font-bold">Antique Porcelain Vase</h3>
                  <p className="text-muted-foreground">
                    Current Bid: <span className="font-semibold">$1,800</span>
                  </p>
                </div>
              </div>
              <div className="group grid gap-2">
                <img
                  src="/placeholder.svg"
                  alt="Auction Item"
                  className="mx-auto aspect-[4/3] overflow-hidden rounded-xl object-cover object-center transition-all group-hover:scale-105"
                  width="400"
                  height="300"
                />
                <div className="space-y-1">
                  <h3 className="text-lg font-bold">
                    Vintage Leather Suitcase
                  </h3>
                  <p className="text-muted-foreground">
                    Current Bid: <span className="font-semibold">$325</span>
                  </p>
                </div>
              </div>
              <div className="group grid gap-2">
                <img
                  src="/placeholder.svg"
                  alt="Auction Item"
                  className="mx-auto aspect-[4/3] overflow-hidden rounded-xl object-cover object-center transition-all group-hover:scale-105"
                  width="400"
                  height="300"
                />
                <div className="space-y-1">
                  <h3 className="text-lg font-bold">Antique Pocket Watch</h3>
                  <p className="text-muted-foreground">
                    Current Bid: <span className="font-semibold">$1,250</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; 2024 Auction House. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Privacy Policy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

function CalendarIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}
