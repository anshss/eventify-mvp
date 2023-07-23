"use client";
import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from "./providers";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="bg-background">
                <Providers>
                    <>
                        {children}
                    </> 
                </Providers>
            </body>
        </html>
    );
}
