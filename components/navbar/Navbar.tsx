"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Menu, X, ChevronDown, Apple, Smartphone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLogout } from "@/app/hooks/useLogout";
import { useUser } from "@/app/hooks/useUser";
import { useAuthStore } from "@/lib/store/authStore";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDownloadDropdownOpen, setIsDownloadDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { logout } = useLogout();
  const { user, isLoading } = useUser();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isDashboard = pathname.startsWith("/dashboard");

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/image/logo2.png"
                alt="logo"
                height={50}
                width={140}
                className="w-[140px] h-[30px]"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-4">
                <span className="text-white">
                  <Link
                    href="/dashboard"
                    className="text-white transition-colors duration-200"
                  >
                    Dashboard
                  </Link>
                </span>
                <span className="text-white">
                  <Link
                    href="/blog"
                    className="text-white transition-colors duration-200"
                  >
                    Blog
                  </Link>
                </span>
                <Button
                  onClick={logout}
                  variant="secondary"
                  className="bg-red-600 text-white hover:bg-red-700 backdrop-blur-sm cursor-pointer"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging out..." : "Logout"}
                </Button>
              </div>
            ) : (
              <>
                <Link
                  href="/"
                  className="text-black hover:text-[#6A0DAD] transition-colors duration-200"
                >
                  Home
                </Link>
                <Link
                  href="/blog"
                  className="text-black hover:text-[#6A0DAD] transition-colors duration-200"
                >
                  Blog
                </Link>
                {isDashboard ? (
                  <>
                    <Button
                      onClick={logout}
                      variant="secondary"
                      className="bg-red-600 text-white hover:bg-red-700 backdrop-blur-sm cursor-pointer"
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <div className="relative">
                    <Button
                      variant="secondary"
                      className="bg-[#6A0DAD] text-white hover:text-[#6A0DAD] hover:bg-white/30 backdrop-blur-sm cursor-pointer flex items-center gap-1"
                      onClick={() =>
                        setIsDownloadDropdownOpen(!isDownloadDropdownOpen)
                      }
                    >
                      Download app
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          isDownloadDropdownOpen ? "transform rotate-180" : ""
                        }`}
                      />
                    </Button>
                    {isDownloadDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                        <div
                          className="py-1"
                          role="menu"
                          aria-orientation="vertical"
                        >
                          <a
                            href="https://apps.apple.com/app/id6752268757"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:text-[#6A0DAD] hover:bg-gray-100"
                            role="menuitem"
                          >
                            <Apple className="w-4 h-4 mr-2 text-gray-500" />
                            Download for iOS
                          </a>
                          <a
                            href="https://play.google.com/store/apps/details?id=com.importapay"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:text-[#6A0DAD] hover:bg-gray-100"
                            role="menuitem"
                          >
                            <Smartphone className="w-4 h-4 mr-2 text-gray-500" />
                            Download for Android
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-[#6A0DAD] hover:text-[#6A0DAD] transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden backdrop-blur-md bg-[#6A0DAD]/10 border-t border-white/20">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {isAuthenticated && user ? (
              <>
                <div className="space-y-2">
                  <Button className="w-full bg-red-600 text-white hover:bg-red-700 backdrop-blur-sm">
                    <Link
                      href="/blog"
                      className="text-white transition-colors duration-200"
                    >
                      Blog
                    </Link>
                  </Button>
                  <Button className="w-full bg-red-600 text-white hover:bg-red-700 backdrop-blur-sm">
                    <Link
                      href="/dashboard"
                      className="text-white transition-colors duration-200"
                    >
                      Dashboard
                    </Link>
                  </Button>
                  <Button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    variant="secondary"
                    className="w-full bg-red-600 text-white hover:bg-red-700 backdrop-blur-sm"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging out..." : "Logout"}
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/"
                  className="block px-3 py-2 text-white hover:text-white transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/blog"
                  className="block px-3 py-2 text-white hover:text-white transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blog
                </Link>
                <div className="space-y-3 px-3 pt-2">
                  {isDashboard ? (
                    <>
                      <span className="text-white">
                        <Link
                          href="/blog"
                          className="text-white transition-colors duration-200"
                        >
                          Blog
                        </Link>
                      </span>
                      <span className="text-white">
                        <Link
                          href="/dashboard"
                          className="text-white transition-colors duration-200"
                        >
                          Dashboard
                        </Link>
                      </span>
                      <Button
                        onClick={() => {
                          logout();
                          setIsMenuOpen(false);
                        }}
                        variant="secondary"
                        className="w-full bg-red-600 text-white hover:bg-red-700 backdrop-blur-sm"
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <a
                        href="https://apps.apple.com/app/id6752268757"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full bg-[#6A0DAD] text-white hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-md transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Apple className="w-4 h-4" />
                        Download for iOS
                      </a>
                      <a
                        href="https://play.google.com/store/apps/details?id=com.importapay"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full bg-[#6A0DAD] text-white hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-md transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Smartphone className="w-4 h-4" />
                        Download for Android
                      </a>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
