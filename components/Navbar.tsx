"use client";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { Container } from "./Container";
import {HamburgerIcon} from './icons/hamburger'
import Link from "next/link";
import { Login } from "./Login";
import Image from "next/image";

export function Navbar() {

    const [hamburgerMenuIsOpen, setHamburgerMenuIsOpen] = useState(false);

    useEffect(() => {
      const html = document.querySelector("html");
      if (html) html.classList.toggle("overflow-hidden", hamburgerMenuIsOpen);
    }, [hamburgerMenuIsOpen]);
  
    useEffect(() => {
      const closeHamburgerNavigation = () => setHamburgerMenuIsOpen(false);
  
      window.addEventListener("orientationchange", closeHamburgerNavigation);
      window.addEventListener("resize", closeHamburgerNavigation);
  
      return () => {
        window.removeEventListener("orientationchange", closeHamburgerNavigation);
        window.removeEventListener("resize", closeHamburgerNavigation);
      };
    }, [setHamburgerMenuIsOpen]);
  

    return(
        // <div className="flex justify-between">
        //     <Link href="/"><h3>Eventify</h3></Link>
        //     <div className="flex justify-between w-[50%]">
        //     <Link href="/featured"><h3>Featured events</h3></Link>
        //     <Link href="/dashboard"><h3>Dashboard</h3></Link>
        //     {/* <Link href="/dashboard"><h3>Docs</h3></Link> */}
        //     <Login />
        //     </div>
        // </div>


        <header className="fixed top-0 left-0 z-10 w-full border-b border-transparent-white backdrop-blur-[12px] mt-6">
        <Container className="flex h-navigation-height">
          <Link className="flex items-center text-md" href="/">
            <Image src='/logo.svg' alt='/logo.svg' height={100} width={100} className="mr-4 mb-6"/>
          </Link>
  
          <div
            className={classNames(
              "transition-[visibility] md:visible ",
              hamburgerMenuIsOpen ? "visible" : "delay-500 invisible"
            )}
          >
            <nav
              className={classNames(
                "fixed top-navigation-height left-0 h-[calc(100vh_-_var(--navigation-height))] w-full overflow-auto bg-background transition-opacity duration-500 md:relative md:top-0 md:block md:h-auto md:w-auto md:translate-x-0 md:overflow-hidden md:bg-transparent md:opacity-100 md:transition-none",
                hamburgerMenuIsOpen
                  ? "translate-x-0 opacity-100"
                  : "translate-x-[-100vw] opacity-0"
              )}
            >
              <ul
                className={classNames(
                  "flex h-full flex-col text-white mt-2 mr-4 md:flex-row md:items-center [&_li]:ml-6 [&_li]:border-b [&_li]:border-[#858699]-dark md:[&_li]:border-none",
                  "ease-in [&_a:hover]:text-[#858699] [&_a]:flex [&_a]:h-navigation-height [&_a]:w-full [&_a]:translate-y-8 [&_a]:items-center [&_a]:text-lg [&_a]:transition-[color,transform] [&_a]:duration-300 md:[&_a]:translate-y-0 md:[&_a]:text-sm [&_a]:md:transition-colors",
                  hamburgerMenuIsOpen && "[&_a]:translate-y-0"
                )}
              >
                <li>
                  <Link href="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link href="/featured">Featured events</Link>
                </li>
                {/* <li className="md:hidden lg:block">
                  <Link href="#">Customers</Link>
                </li> */}
                <li className="md:hidden lg:block">
                  <Link href="/dashboard">Docs</Link>
                </li>
                <li className="md:hidden lg:block">
                  <Link href="#">Community</Link>
                </li>
                <li>
                  <Link href="#">FAQs</Link>
                </li>
                <li>
                  <Link href="#">Company</Link>
                </li>
              </ul>
            </nav>
          </div>
  
          <div className="ml-auto flex h-full items-center mb-6">
            {/* <Link className="mr-6 text-sm" href="#">
              Rewards
            </Link> */}
            <Login/>
          </div>
  
          <button
            className="ml-6 md:hidden"
            onClick={() => setHamburgerMenuIsOpen((open) => !open)}
          >
            <span className="sr-only">Toggle menu</span>
            <HamburgerIcon />
          </button>
        </Container>
      </header>
    )
}