import Image from "next/image";
import Link from "next/link";

export default function Footer() {
	return (
		<div className="footer-box box-border w-full md:max-w-[1270px] mx-auto flex flex-col justify-start items-center bg-black overflow-visible content-center gap-4 md:gap-8 absolute pl-4 md:pl-[60px] pr-4 md:pr-10 pt-4 md:pt-[60px] pb-2 md:pb-[30px] rounded-[0px_0px_0px_0px] border-b-0 border-x-0 border-[rgba(0,0,0,0.05)] border-solid border-t mt-[10px] md:mt-[10px]">
			<div className="horizontal-empty shrink-0 w-full h-2.5 md:h-6 flex flex-row justify-start items-start max-w-[1100px] overflow-visible relative content-start flex-wrap gap-2 md:gap-4 p-0 rounded-[0px_0px_0px_0px]"></div>
			<div className="copyright box-border shrink-0 w-full h-16 md:h-auto flex flex-row justify-between items-center max-w-[1100px] overflow-visible relative content-center flex-wrap md:flex-nowrap pt-4 md:pt-0 px-0 rounded-[0px_0px_0px_0px] border-b-0 border-x-0 border-[rgba(255,255,255,0.2)] border-solid border-t">
				<div className="gourmenta shrink-0 w-auto h-auto whitespace-pre overflow-visible relative font-medium not-italic text-[color:var(--token-ba0f8505-1870-43c0-8d4e-7d4bc5406462,#999999)] text-sm md:text-base tracking-normal leading-normal text-center md:text-left">
					<p>© 2023 Gourmenta.ai</p>
				</div>
				<div className="icons shrink-0 w-auto h-auto flex flex-row justify-center md:justify-start items-center overflow-visible relative content-center flex-wrap md:flex-nowrap gap-4 md:gap-8 p-0 rounded-[0px_0px_0px_0px]">
					<a
						href="https://www.instagram.com/muzzyaqow/"
						target="_blank"
						rel="noopener noreferrer"
						className="cursor-pointer">
						<Image
							src="/instagram.svg"
							width={20}
							height={20}
							alt="instagram"
							className="hover:opacity-80"
						/>
					</a>
					<a
						href="https://twitter.com/muzzyaqow"
						target="_blank"
						rel="noopener noreferrer"
						className="cursor-pointer">
						<Image
							src="/twitter.svg"
							width={20}
							height={20}
							alt="twitter"
							className="hover:opacity-80"
						/>
					</a>
				</div>
			</div>
		</div>
	);
}
