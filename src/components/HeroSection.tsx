import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { Code, MapPin } from "lucide-react";

export const HeroSection = () => {
	useGSAP(() => {
		// Updated selector to target the split text safely
		const heroSplit = new SplitText(".hero-line", {
			type: "chars",
		});

		const paragraphSplit = new SplitText("#subtitle", {
			type: "lines",
		});
		const greetingSplit = new SplitText("#greeting", {
			type: "chars",
		});
		const professionalOveriewSplit = new SplitText("#overview", {
			type: "chars",
		});

		// Add gradient class to chars
		heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

		gsap.from(heroSplit.chars, {
			yPercent: 100,
			duration: 1.8,
			ease: "expo.out",
			stagger: 0.06,
			opacity: 0,
		});

		gsap.from(paragraphSplit.lines, {
			opacity: 0,
			yPercent: 100,
			duration: 1.8,
			ease: "expo.out",
			stagger: 0.06,
			delay: 0.5,
		});

		gsap.from("#tag", {
			opacity: 0,
			y: 20,
			ease: "power1.inOut",
			delay: 0.6,
		});

		gsap.from(greetingSplit.chars, {
			opacity: 0,
			duration: 0.01,
			stagger: 0.1,
			ease: "none",
			delay: 0.2,
		});
		gsap.from(professionalOveriewSplit.chars, {
			opacity: 0,
			duration: 0.01,
			stagger: 0.05,
			ease: "none",
			delay: 0.2,
		});
	});

	return (
		<section className="min-h-screen flex flex-col justify-center relative mb-12 pt-20 overflow-hidden">
			{/* Main Grid Layout */}
			<div className="grid grid-cols-1 lg:grid-cols-12 items-end lg:items-center w-full px-4 md:px-8  ">
				{/* Left Column: Name and Title */}
				{/* Changed md:col-span-7 to lg:col-span-7 to give more room on tablets */}
				<div className="lg:col-span-7 relative z-10 mix-blend-hard-light text-left ">
					<div className="flex items-center gap-4 mb-4 ">
						<div className="h-0.5 w-10 bg-black"></div>
						<span
							id="greeting"
							className="font-mono text-xl md:text-3xl lg:text-4xl tracking-[0.3em] uppercase"
						>
							Hi I'm
						</span>
					</div>

					<h1
						id="title"
						aria-label="Omkar Pawar"
						// Added leading-[0.8] here to keep lines tight
						className="flex flex-col font-black leading-[0.8] tracking-tighter text-black select-none origin-left transform scale-y-125"
					>
						<div
							aria-hidden="true"
							// CHANGE 1: Used arbitrary values [11rem] and [13rem] for massive text
							className="hero-line whitespace-nowrap overflow-hidden text-6xl md:text-8xl lg:text-9xl xl:text-[11rem]"
						>
							OMKAR
						</div>
						<div
							aria-hidden="true"
							// CHANGE 2: Matching size for second line
							className="hero-line whitespace-nowrap overflow-hidden text-6xl md:text-8xl lg:text-9xl xl:text-[11rem]"
						>
							PAWAR
						</div>
					</h1>
					<p
						id="tag"
						className=" font-mono  text-xs md:text-sm xl:text-xl mt-12 md:mt-10 bg-black text-white inline-flex gap-2 items-center px-4 py-2 magnetic relative z-50"
					>
						<Code size={16} /> FULL STACK DEVELOPER
					</p>
				</div>

				{/* Right Column: Professional Summary */}
				<div className="lg:col-span-5 relative z-10 flex flex-col  justify-end pb-4 mt-8 lg:mt-0">
					<div className="border-l-4 border-black pl-6 py-2">
						<p
							id="overview"
							// CHANGE 3: Added lg:text-lg for larger screens
							className="font-bold uppercase text-sm lg:text-lg xl:text-xl mb-4 tracking-widest text-black"
						>
							// PROFESSIONAL_OVERVIEW
						</p>
						<p
							id="subtitle"
							// CHANGE 4: Increased body text slightly on large screens (lg:text-lg)
							className="font-mono text-sm md:text-base lg:text-lg xl:text-xl leading-relaxed text-left max-w-full "
						>
							<span className="font-bold block mb-4">
								21 Y/O
								<span className="flex items-center gap-2 mt-1">
									<MapPin size={16} /> Navi Mumbai, MH, India
								</span>
							</span>
							I&apos;m a full-stack developer focused on{" "}
							<span className="font-bold">
								React, Next.js, and end-to-end product design.
							</span>
							<br className="hidden md:block" />I build fast,
							scalable, and visually polished products—combining
							clean UI, smooth interactions, and reliable backend
							systems. Always experimenting, always learning, and
							always focused on shipping high-quality digital
							experiences.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};
