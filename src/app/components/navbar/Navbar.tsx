"use client";
import React from 'react';
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from 'next-auth/react';

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Send Parcel", href: "/sendParcel" },
  { name: "Tracking", href: "/tracking" },
  { name: "Coverage", href: "/coverage" },
  { name: "Manage", href: "/manageData" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { data } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

        {/* Left: Logo */}
        <Link href="/" className="text-xl font-bold text-primary">
          ParcelX
        </Link>

        {/* Middle: Navigation (Desktop) */}
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-600 hover:text-primary transition"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right: Auth buttons (Desktop) */}

        <div className="hidden md:flex gap-3">
          {
            data ? <Button className='cursor-pointer' onClick={() => signOut()}>LogOUt</Button> :

              <>
                <Button className="bg-emerald-500 hover:bg-teal-500" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/registration">Register</Link>
                </Button>
              </>
          }
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t bg-white">
          <nav className="flex flex-col gap-4 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-gray-600 hover:text-primary"
              >
                {link.name}
              </Link>
            ))}

            <div className="flex flex-col gap-2 pt-2">
              {
                data ? <Button onClick={() => signOut()}>LogOut</Button> :
                  <>
                    <Button className="w-full bg-emerald-500" asChild>
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button className="w-full" asChild>
                      <Link href="/registration">Register</Link>
                    </Button>
                  </>
              }
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;