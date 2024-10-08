'use client'
import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

export const Navbar = () =>{
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
    return (
        <nav className="bg-white px-4 py-4 md:px-24 md:py-6 relative z-30">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold">
              NASA Images
            </Link>
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                aria-label="Toggle menu"
                className="text-2xl"
              >
                <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
              </button>
            </div>
            <div className={`md:flex md:items-center md:space-x-8 ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
              <Link href="/about" className="block py-2 md:py-0">About NASA</Link>
              <Link href="/nasa?weeksBack=1" className="block py-2 md:py-0">Last Week&apos;s images</Link>
              <Link href="/nasa?weeksBack=4" className="block py-2 md:py-0">Last Month&apos;s images</Link>
              <Link href="/nasa?weeksBack=52" className="block py-2 md:py-0">Last Year&apos;s images</Link>
            </div>
          </div>
        </nav>
    )
}