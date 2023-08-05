import "./globals.css";
import type { Metadata } from "next";
import { League_Gothic } from "next/font/google";
import { Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";

const text_font = League_Gothic({
	subsets: ["latin"],
	variable: "--font-league-gothic",
	weight: "400",
});

const content_font = Manrope({
	subsets: ["latin"],
	variable: "--font-manrope",
	weight: "200",
});

export const metadata: Metadata = {
	title: "Gourmenta.ai",
	description: "Gourmet feasts, minty bliss!",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			className={`${text_font.variable} ${content_font.variable}`}>
			<Head>
				<meta
					http-equiv="Content-Security-Policy"
					content="upgrade-insecure-requests"></meta>
			</Head>
			<body>{children}</body>
			<Analytics></Analytics>
		</html>
	);
}
