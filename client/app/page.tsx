import Header from "@/components/header";
import Welcome from "@/components/welcome";
import WhyUs from "@/components/why_us";
import Try from "@/components/try";
import Catch from "@/components/catch";
import Footer from "@/components/footer";

export default function Home() {
	return (
		<div>
			<Header></Header>
			<Welcome></Welcome>
			<WhyUs></WhyUs>
			<Try></Try>
			<Catch></Catch>
			<Footer></Footer>
		</div>
	);
}
