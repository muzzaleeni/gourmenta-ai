import Image from "next/image";

export default function WhyUs() {
	return (
		<div
			className="whyus-box box-border w-full md:max-w-[1270px] mx-auto px-5 md:p-[100px] py-10 md:py-20 flex flex-col items-center bg-black text-white"
			id="how-it-works-section">
			<div className="first-why w-full flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20">
				<div className="design-pic w-full md:w-[450px] h-[350px] md:h-[450px] relative rounded-[40px] overflow-hidden">
					<Image
						src="/conscious-design-3D43SBDDkAc-unsplash.jpg"
						layout="fill"
						objectFit="cover"
						objectPosition="center"
						alt="cooking"
						className="rounded-[40px]"
					/>
				</div>
				<div className="content w-full md:w-[500px] flex flex-col justify-center gap-5">
					<div className="header-text text-xl md:text-2xl font-semibold leading-tight">
						<h2>Effortlessly Explore Scrumptious Selections</h2>
					</div>
					<div className="header-body text-base md:text-lg font-medium leading-relaxed">
						<h3>
							Gourmenta&apos;s AI algorithms analyze your preferences to
							handpick delectable dining options that match your taste. No more
							guesswork!
						</h3>
					</div>
				</div>
			</div>
			<div className="second-why w-full flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20 mt-10 md:mt-20">
				<div className="content w-full md:w-[500px] flex flex-col justify-center gap-5">
					<div className="header-text text-xl md:text-2xl font-semibold leading-tight">
						<h2>Personalized Picks, Happy Belly</h2>
					</div>
					<div className="header-body text-base md:text-lg font-medium leading-relaxed">
						<h3>
							Unleash your inner foodie! Gourmenta learns your palate and
							refines its suggestions - ensuring a delightful dining experience
							every time.
						</h3>
					</div>
				</div>
				<div className="design-pic w-full md:w-[450px] h-[350px] md:h-[450px] relative rounded-[40px] overflow-hidden">
					<Image
						src="/max-komthongvijit-_RwtD1MrUrw-unsplash.jpg"
						layout="fill"
						objectFit="cover"
						objectPosition="center"
						alt="cooking"
						className="rounded-[40px]"
					/>
				</div>
			</div>
		</div>
	);
}
