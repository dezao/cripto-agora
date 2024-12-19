// src/components/Navbar.tsx
"use client";

import React from "react";
import { Coins, Search, Info } from "lucide-react";
import Link from "next/link";

const Navbar = ({ onSearchToggle, onModalToggle }) => {
    return (
      <nav className="flex items-center justify-between p-4 mx-16">
        <div className="text-2xl font-bold">
          {/* <Link href="/">
            <span className="text-lg">
              <Coins className="text-gray-200 h-10 w-10" />
            </span>
          </Link> */}
        </div>
        <div className="flex items-center">
          <button
            className="flex items-center justify-between border border-gray-300 rounded-lg shadow-md mb-6 p-2 bg-zinc-800 hover:bg-zinc-700 focus-within:ring-2 focus-within:ring-blue-500 cursor-pointer mr-2"
            onClick={onSearchToggle}
          >
            <Search className="h-6 w-6 text-gray-200" />
          </button>
          <button
            className="flex items-center justify-between border border-gray-300 rounded-lg shadow-md mb-6 p-2 bg-zinc-800 hover:bg-zinc-700 focus-within:ring-2 focus-within:ring-blue-500 cursor-pointer"
            onClick={onModalToggle}
          >
            <Info className="text-lg" />
          </button>
        </div>
      </nav>
    );
  };

  export default Navbar;