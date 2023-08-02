import Image from "next/image";

export default function Catch() {
	return (
		<div
			className="catch-box box-border w-full md:max-w-[1270px] mx-auto px-4 md:px-10 py-8 md:py-20 flex flex-col items-center bg-black text-white"
			id="why-us-section">
			<div className="catch-text text-3xl md:text-5xl font-semibold leading-[1.2] text-center">
				<h2>What&apos;s the catch?</h2>
			</div>
			<div className="catch-content flex flex-col md:flex-row justify-center items-center gap-8 mt-8 md:mt-12">
				<div className="catch-pic flex-shrink-0 w-[299px] h-[116px] md:w-[400px] md:h-[155px] bg-gray-300 rounded-lg overflow-hidden">
					<Image
						src="/tim-mossholder-KZcWygxZ_J4-unsplash.jpg"
						layout="responsive"
						width={400}
						height={155}
						alt="catch"
						className="object-cover w-full h-full"
					/>
				</div>
				<div className="catch-content-text text-[#b2aeae] text-base md:text-xl leading-relaxed text-center md:text-left max-w-[600px]">
					<h3>
						&quot;I guess you have never tried using 2GIS with the power of
						ChatGPT. Guess what? Here we are to announce you that it is now
						possible!&quot;
					</h3>
				</div>
			</div>
		</div>
	);
}
