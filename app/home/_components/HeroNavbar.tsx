"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { useLogout } from "@/app/hooks/useLogout";
import { useUser } from "@/app/hooks/useUser";
import { useAuthStore } from "@/lib/store/authStore";

const links = [
  { href: "/", label: "Home" },
  { href: "/corridors", label: "Corridors" },
  // TODO: point to the API docs once they're published
  { href: "https://docs.importa.biz/", label: "API" },
  { href: "/blog", label: "Blog" },
];

const HeroNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { logout } = useLogout();
  const { user, isLoading } = useUser();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const loggedIn = isAuthenticated && !!user;

  const navLinks = loggedIn
    ? [...links, { href: "/dashboard", label: "Dashboard" }]
    : links;

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : href.startsWith("/") && pathname.startsWith(href);

  const linkClass = (href: string) =>
    `transition-colors duration-200 hover:text-[#5F26A6] ${
      isActive(href) ? "font-bold text-[#5F26A6]" : "font-medium text-[#3C3947]"
    }`;

  return (
    <nav className="fixed inset-x-0 top-3 z-50 px-4 font-satoshi sm:px-6 lg:top-4">
      <div className="mx-auto max-w-[1152px] rounded-full bg-white shadow-[0_8px_30px_rgba(95,38,166,0.08),0_1px_2px_rgba(22,19,25,0.04)] ring-1 ring-[#5F26A6]/5">
        <div className="flex h-[56px] items-center justify-between pl-5 pr-2 md:h-[64px] md:pl-6 md:pr-[9px]">
          <Link href="/" className="shrink-0">
            <Image
              src="/image/logo2.png"
              alt="Importapay"
              width={640}
              height={130}
              priority
              className="h-[26px] w-auto md:h-[30px]"
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-6 text-[15px] leading-[24px] md:flex lg:gap-[31px]">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={linkClass(link.href)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-5 md:flex lg:gap-[22px]">
            {loggedIn ? (
              <button
                onClick={logout}
                disabled={isLoading}
                className="flex h-[46px] cursor-pointer items-center rounded-full bg-[#5F26A6] px-6 text-[15px] font-bold text-white transition-colors hover:bg-[#4E1C8C] disabled:opacity-60"
              >
                {isLoading ? "Logging out..." : "Logout"}
              </button>
            ) : (
              <>
                <Link
                  href="https://merchant.importa.biz"
                  className="flex h-[46px] items-center gap-2 rounded-full bg-[#5F26A6] px-6 text-[15px] font-bold text-white transition-colors hover:bg-[#4E1C8C]"
                >
                  Get started
                  <ArrowRight size={18} strokeWidth={2.25} />
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5F26A6]/10 text-[#5F26A6] md:hidden"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="mx-auto mt-2 max-w-[1152px] rounded-[24px] bg-white p-4 shadow-[0_8px_30px_rgba(95,38,166,0.12)] ring-1 ring-[#5F26A6]/5 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={`block rounded-xl px-3 py-3 text-[16px] ${linkClass(
                link.href,
              )}`}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-3 flex flex-col gap-3">
            {loggedIn ? (
              <button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                disabled={isLoading}
                className="h-[48px] w-full rounded-full bg-[#5F26A6] text-[16px] font-bold text-white disabled:opacity-60"
              >
                {isLoading ? "Logging out..." : "Logout"}
              </button>
            ) : (
              <>
                <Link
                  href="https://merchant.importa.biz"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex h-[48px] items-center justify-center gap-2 rounded-full bg-[#5F26A6] text-[16px] font-bold text-white"
                >
                  Get started
                  <ArrowRight size={18} />
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default HeroNavbar;
