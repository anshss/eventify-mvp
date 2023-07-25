"use client";
import styles from "../styles/style";
import { useState, useEffect } from "react";
import Link from "next/link";

export const footerLinks = [
    {
        title: "Useful Links",
        links: [
            {
                name: "Host an Event",
                link: "/service/eligibility-verification",
            },
            {
                name: "Inventory",
                link: "/service/medical-coding",
            },
            {
                name: "Featured Events",
                link: "/service/phycisian-credentialing",
            },
            {
                name: "Privacy Policy",
                link: "/service/revenue-cycle-management",
            },
            {
                name: "FAQs",
                link: "/service/billing-Denial Management-A/R",
            },
        ],
    },
    {
        title: "Community",
        links: [
            {
                name: "About Eventify",
                link: "/aboutvistarcm",
            },
            {
                name: "Contact Us",
                link: "/about",
            },
            {
                name: "Docs",
                link: "/about/careers",
            },
            {
                name: "Blog",
                link: "/about/blogs",
            },
            {
                name: "Testimonials",
                link: "/about/testimonials",
            },
        ],
    },
    {
        title: "Get in touch",
        links: [
            {
                name: "Book a free trial",
                link: "https://docs.google.com/forms/d/e/1FAIpQLSdPPPSfMK7sKrTi2pAyr-zUbNLAIk1wvHeZJusZYNiWOKRbBA/viewform",
            },
            {
                name: "Contact",
                link: "/about",
            },
        ],
    },
];

export const socialMedia = [
    {
        id: "social-media-1",
        icon: "/instagram.svg",
        link: "https://www.instagram.com/",
    },
    {
        id: "social-media-2",
        icon: "/facebook.svg",
        link: " https://www.facebook.com/profile.php?id=100089118426054",
    },
    {
        id: "social-media-3",
        icon: "/twitter.svg",
        link: "https://www.twitter.com/",
    },
    {
        id: "social-media-4",
        icon: "/linkedin.svg",
        link: "https://www.linkedin.com/in/vistarcm-solutions-119a1925b/",
    },
];

// function backToTopButton(){
//   const [backToTopButton, setbackToTopButton] = useState(false);

//   useEffect(()=>{
//     window.addEventListener("scroll",()=>{
//       if(window.scrollY > 100){
//         setbackToTopButton(true)
//       }
//       else{
//         setbackToTopButton(false)
//       }
//     })
//   },[])

// }
// const scrollUp = () =>{
//   window.scrollTo({
//     top:0,
//     behavior: "smooth"
//   })
// }
const Footer = () => (
    <section className={`${styles.flexCenter} ${styles.paddingY} flex-col`}>
        <div className={`${styles.flexStart} md:flex-row flex-col mb-8 w-full`}>
            <div className="flex-[1] flex flex-col justify-start mr-10">
                <img
                    src="/logo.svg"
                    alt="hoobank"
                    className="w-[266px] h-[72.14px] object-contain"
                />
                <p className={`${styles.paragraph} mt-4 max-w-[312px]`}>
                    Seamless event ticketing platform{" "}
                </p>
            </div>

            <div className="flex-[1.5] w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10">
                {footerLinks.map((footerlink) => (
                    <div
                        key={footerlink.title}
                        className={`flex flex-col ss:my-0 my-4 min-w-[150px]`}
                    >
                        <h4 className="font-poppins font-medium text-[18px] leading-[27px] text-black">
                            {footerlink.title}
                        </h4>
                        <ul className="list-none mt-4">
                            {footerlink.links.map((link, index) => (
                                <Link
                                    key={link.name}
                                    href={link.link}
                                    className={`font-poppins font-normal text-[16px] leading-[24px] text-dimWhite hover:text-secondary cursor-pointer ${
                                        index !== footerlink.links.length - 1
                                            ? "mb-4"
                                            : "mb-0"
                                    }`}
                                >
                                    <li
                                        className="leading-9"
                                        onClick={scrollUp}
                                    >
                                        {link.name}
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default Footer;
