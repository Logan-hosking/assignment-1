"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-b">
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-bold">
            Home
          </Link>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden border rounded px-3 py-2"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
          >
            ☰
          </button>

          <div className="hidden md:flex gap-6">
            <Link href="/wordle">Wordle</Link>
            <Link href="/wordsearch">Word Search</Link>
            <Link href="/about">About</Link>
            <Link href="/settings">Settings</Link>
          </div>
        </div>

        {open && (
          <div className="flex flex-col gap-3 mt-4 md:hidden">
            <Link href="/wordle" onClick={() => setOpen(false)}>
              Wordle
            </Link>

            <Link href="/wordsearch" onClick={() => setOpen(false)}>
              Word Search
            </Link>

            <Link href="/about" onClick={() => setOpen(false)}>
              About
            </Link>

            <Link href="/settings" onClick={() => setOpen(false)}>
              Settings
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}