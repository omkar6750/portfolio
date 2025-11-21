const Y2KStar: React.FC<{ className?: string; fill?: string }> = ({
	className,
	fill = "currentColor",
}) => (
	<svg viewBox="0 0 100 100" className={className} fill={fill}>
		<path d="M50 0 C50 0 60 40 100 50 C60 60 50 100 50 100 C50 100 40 60 0 50 C40 40 50 0 50 0 Z" />
	</svg>
);

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { MapPin } from "lucide-react";
import React from "react";

export const HeroSection = () => {
	useGSAP(() => {
		const heroSplit = new SplitText("#title", {
			type: "chars, words",
		});

		const paragraphSplit = new SplitText("#subtitle", {
			type: "lines",
		});
		const greetingSplit = new SplitText("#greeting", {
			type: "chars",
		});
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
		<section className="min-h-screen flex flex-col justify-center relative mb-12 pt-20">
			{/* Floating Elements */}
			<Y2KStar className="absolute top-20 left-[10%] w-16 h-16 text-black animate-spin-slow opacity-80" />

			{/* Main Grid Layout */}
			<div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
				{/* Left Column: Name and Title */}
				<div className="md:col-span-7 relative z-10 mix-blend-hard-light text-left">
					<div className="flex items-center gap-4 mb-4">
						<div className="h-0.5 w-10 bg-black"></div>
						<span
							id="greeting"
							className="font-mono text-3xl tracking-[0.3em] uppercase"
						>
							Hi I'm
						</span>
					</div>

					<h1
						id="title"
						className=" text-[14vw] md:text-[10vw] font-black tracking-tighter leading-[0.8] text-black select-none transform origin-left scale-y-125 inverse-hover"
					>
						OMKAR
						<br />
						PAWAR
					</h1>

					<p
						id="tag"
						className="font-mono text-xs md:text-sm tracking-widest mt-8 bg-black text-white inline-block px-4 py-2 magnetic relative z-50"
					>
						FULL STACK DEVELOPER
					</p>
				</div>

				{/* Right Column: Professional Summary */}
				<div className="md:col-span-5 relative z-10 flex flex-col justify-end pb-4">
					<div className="border-l-4 border-black pl-6 py-2">
						<p className="font-bold uppercase text-xs mb-4 tracking-widest text-black">
							// PROFESSIONAL_OVERVIEW
						</p>
						<p
							id="subtitle"
							className="font-mono text-sm md:text-base leading-relaxed text-left max-w-[420px]"
						>
							<span className="font-bold block mb-4">
								21 Y/O
								<span className="flex items-center  gap-2">
									<MapPin size={16} /> Navi Mumbai, MH, India
								</span>
							</span>
							I&apos;m a full-stack developer focused on{" "}
							<span className="font-bold">
								React, Next.js, and end-to-end product design.
							</span>
							<br />I blend visual creativity with engineering
							precision to build clean, motion-rich interfaces. My
							background in systems and circuits gives me a unique
							perspective on how software interacts with hardware,
							driving me to build efficient and thoughtful
							solutions.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};
