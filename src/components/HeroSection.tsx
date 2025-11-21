import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { MapPin } from "lucide-react";
import React from "react";

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
	});

	return (
		<section className="min-h-screen flex flex-col justify-center relative mb-12 pt-20 overflow-hidden">
			{/* Main Grid Layout */}
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end w-full px-4 md:px-8">
				{/* Left Column: Name and Title */}
				{/* Changed md:col-span-7 to lg:col-span-7 to give more room on tablets */}
				<div className="lg:col-span-7 relative z-10 mix-blend-hard-light text-left">
					<div className="flex items-center gap-4 mb-4">
						<div className="h-0.5 w-10 bg-black"></div>
						<span
							id="greeting"
							className="font-mono text-xl md:text-3xl tracking-[0.3em] uppercase"
						>
							Hi I'm
						</span>
					</div>

					{/* MAJOR FIXES HERE:
             1. Removed VW units. Used strict Tailwind sizes (5xl -> 9xl).
             2. flex-col to force stacking.
             3. whitespace-nowrap to prevent letters breaking.
             4. scale-y-125 maintained but handled with origin-left.
          */}
					<div
						id="title"
						className="flex flex-col font-black tracking-tighter text-black select-none origin-left transform scale-y-125"
					>
						{/* Line 1 */}
						<div className="hero-line whitespace-nowrap overflow-hidden leading-[0.9] text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
							OMKAR
						</div>
						{/* Line 2 */}
						<div className="hero-line whitespace-nowrap overflow-hidden leading-[0.9] text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
							PAWAR
						</div>
					</div>

					<p
						id="tag"
						className="font-mono text-xs md:text-sm tracking-widest mt-12 md:mt-16 bg-black text-white inline-block px-4 py-2 magnetic relative z-50"
					>
						FULL STACK DEVELOPER
					</p>
				</div>

				{/* Right Column: Professional Summary */}
				<div className="lg:col-span-5 relative z-10 flex flex-col justify-end pb-4 mt-8 lg:mt-0">
					<div className="border-l-4 border-black pl-6 py-2">
						<p className="font-bold uppercase text-xs mb-4 tracking-widest text-black">
							// PROFESSIONAL_OVERVIEW
						</p>
						<p
							id="subtitle"
							className="font-mono text-sm md:text-base leading-relaxed text-left max-w-full lg:max-w-[420px]"
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
							<br className="hidden md:block" />I blend visual
							creativity with engineering precision to build
							clean, motion-rich interfaces. My background in
							systems and circuits gives me a unique perspective
							on how software interacts with hardware.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};
