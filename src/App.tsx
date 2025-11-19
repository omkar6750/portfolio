import React, { useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import {
	Code,
	Layers,
	Terminal,
	Cpu,
	Download,
	Smile,
	Save,
	Award,
	Barcode,
} from "lucide-react";
// import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import { Card } from "./components/Card";
import { SilverMatteBackground } from "./components/SilverBackgroud";
import { CustomCursor } from "./components/CustomCursor";
import { HorizontalScrollSection } from "./components/HorizontalScrollSection";
import { PROJECTS_DATA } from "./data/projects";
import { WorkExperience404 } from "./components/WorkExperience";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);

const Y2KStar: React.FC<{ className?: string; fill?: string }> = ({
	className,
	fill = "currentColor",
}) => (
	<svg viewBox="0 0 100 100" className={className} fill={fill}>
		<path d="M50 0 C50 0 60 40 100 50 C60 60 50 100 50 100 C50 100 40 60 0 50 C40 40 50 0 50 0 Z" />
	</svg>
);

export default function App() {
	const [activeTab, setActiveTab] = useState<string>("personal");

	const handleDownloadResume = () => {
		alert("Downloading CV for Omkar Pawar...");
	};

	return (
		<main>
			<SilverMatteBackground>
				<CustomCursor />
				<div className="max-w-7xl mx-auto px-4 md:px-8 pb-24 font-sans">
					{/* --- HERO SECTION --- */}
					<section className="min-h-screen flex flex-col justify-center relative mb-12 pt-20">
						{/* Floating Elements */}
						<Y2KStar className="absolute top-20 left-[10%] w-16 h-16 text-black animate-spin-slow opacity-80" />
						<div className="absolute top-1/3 right-[10%] border-2 border-black p-2 rotate-12 bg-yellow-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
							<Smile size={32} />
						</div>

						{/* Main Grid Layout */}
						<div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
							{/* Left Column: Name and Title */}
							<div className="md:col-span-7 relative z-10 mix-blend-hard-light text-left">
								<div className="flex items-center gap-4 mb-4">
									<div className="h-0.5 w-10 bg-black"></div>
									<span className="font-mono text-xs tracking-[0.3em] uppercase">
										Navi Mumbai, IN
									</span>
								</div>

								<h1 className="text-[15vw] md:text-[10vw] font-black tracking-tighter leading-[0.8] text-black select-none transform origin-left scale-y-125 inverse-hover">
									OMKAR
									<br />
									PAWAR
								</h1>

								<p className="font-mono text-xs md:text-sm tracking-widest mt-8 bg-black text-white inline-block px-4 py-2 magnetic relative z-50">
									FULL STACK DEVELOPER
								</p>
							</div>

							{/* Right Column: Professional Summary */}
							<div className="md:col-span-5 relative z-10 flex flex-col justify-end pb-4">
								<div className="border-l-4 border-black pl-6 py-2">
									<p className="font-bold uppercase text-xs mb-4 tracking-widest text-black">
										// PROFESSIONAL_OVERVIEW
									</p>
									<p className="font-mono text-sm md:text-base leading-relaxed text-justify">
										Full-stack & systems engineer skilled in{" "}
										<span className="font-bold">
											React, Next.js, Node.js, and Python
										</span>
										. Strong experience in building
										high-performance apps, real-time
										systems, and AI/ML pipelines. Led
										full-stack SaaS builds, deployed
										production-grade e-commerce systems, and
										developed a college-funded Autonomous
										UAV. I thrive in fast-paced startup
										environments and solving deeply
										technical problems.
									</p>
								</div>
							</div>
						</div>
					</section>

					<div className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-auto relative">
						<div className="md:col-span-7 flex flex-col gap-8">
							<Card
								title="Education"
								color="bg-[#FFC805]"
								tags={["BE EXTC", "2022-2026"]}
								className="text-black min-h-[300px]"
							>
								<div className="space-y-6 mt-4 font-mono">
									<div className="relative flex pl-6 border-l-4 border-black">
										<div className="">
											<h4 className="text-xl font-black uppercase tracking-tight">
												Atharva College of Engineering
											</h4>
											<p className="text-sm font-bold mt-1">
												BE Electronics &
												Telecommunication
											</p>
											<div className="flex justify-between text-xs font-bold mt-2 border-t border-black/20 pt-2">
												<span>Mumbai University</span>
												<span>2022 — 2026</span>
											</div>
										</div>
										{/* <DotLottieReact
											src="https://lottie.host/8a4b4785-8d75-4516-809b-46fc5728e567/96ugoCdlS7.lottie"
											loop
											autoplay
											height={100}
										/> */}
									</div>

									<div className="bg-white/50 p-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]">
										<h5 className="flex items-center gap-2 font-black uppercase text-sm mb-2">
											<Award size={16} /> Key Achievements
										</h5>
										<ul className="list-disc list-inside text-xs space-y-2 font-bold text-black/80">
											<li>
												Secured college funding for
												Autonomous UAV Project (Pitched
												to 10+ faculty).
											</li>
											<li>
												1st Prize: Sci-Com Product
												Development Competition.
											</li>
										</ul>
									</div>
								</div>
							</Card>
						</div>
						<div className="md:col-span-5 min-h-[400px]">
							<Card
								title="Arsenal"
								color="bg-[#FF7F3F]"
								icon={Terminal}
								tags={["Tech Stack"]}
								className="text-black"
							>
								<div className="space-y-6 mt-2">
									<div>
										<h5 className="font-black text-xs uppercase mb-2 flex items-center gap-1">
											<Code size={12} /> Languages
										</h5>
										<div className="flex flex-wrap gap-2">
											{[
												"JavaScript",
												"TypeScript",
												"Python",
												"C++",
											].map((t) => (
												<span
													key={t}
													className="px-2 py-1 bg-white border-2 border-black text-[10px] font-bold hover:bg-black hover:text-white transition-colors cursor-default magnetic relative z-50"
												>
													{t}
												</span>
											))}
										</div>
									</div>
									<div>
										<h5 className="font-black text-xs uppercase mb-2 flex items-center gap-1">
											<Layers size={12} /> Frameworks
										</h5>
										<div className="flex flex-wrap gap-2">
											{[
												"React",
												"Next.js",
												"Node.js",
												"Express",
												"Flask",
												"Django",
											].map((t) => (
												<span
													key={t}
													className="px-2 py-1 bg-white border-2 border-black text-[10px] font-bold hover:bg-black hover:text-white transition-colors cursor-default magnetic relative z-50"
												>
													{t}
												</span>
											))}
										</div>
									</div>
									<div>
										<h5 className="font-black text-xs uppercase mb-2 flex items-center gap-1">
											<Cpu size={12} /> System & Tools
										</h5>
										<div className="flex flex-wrap gap-2">
											{[
												"Docker",
												"Git",
												"TensorFlow",
												"WebRTC",
												"PostgreSQL",
												"MongoDB",
												"GSAP",
											].map((t) => (
												<span
													key={t}
													className="px-2 py-1 bg-white border-2 border-black text-[10px] font-bold hover:bg-black hover:text-white transition-colors cursor-default magnetic relative z-50"
												>
													{t}
												</span>
											))}
										</div>
									</div>
								</div>
							</Card>
						</div>
					</div>
				</div>

				<HorizontalScrollSection
					projectsMap={PROJECTS_DATA}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
				/>

				{/* New Work Experience Section */}
				<section className=" flex items-center h-screen ">
					<WorkExperience404 />
				</section>

				<div className="max-w-7xl mx-auto px-4 md:px-8 pb-24 font-sans">
					<div className="md:col-span-12 min-h-[500px] mt-8 mb-12">
						<Card
							title="Comm_Link"
							color="bg-[#a4cf4a]"
							tags={["Open to Work"]}
							className="h-full overflow-hidden "
						>
							<div
								className="absolute inset-0 opacity-10 pointer-events-none"
								style={{
									backgroundImage:
										"linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
									backgroundSize: "20px 20px",
								}}
							></div>
							<div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-full pt-4 relative z-10">
								<div className="md:col-span-7 flex flex-col gap-6">
									<div className="border-2 border-black bg-[#eef7be] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-1">
										<div className="bg-black text-white px-2 py-1 text-xs font-mono flex justify-between items-center mb-4">
											<span>COMPOSE_MESSAGE.exe</span>
										</div>
										<div className="px-4 pb-6 space-y-4">
											<div className="border-b-2 border-black pb-1">
												<span className="font-mono text-xs font-bold mr-4">
													TO:
												</span>
												<span className="font-mono text-sm text-blue-700">
													pawaromkar1654@gmail.com
												</span>
											</div>
											<a
												href="mailto:pawaromkar1654@gmail.com"
												className="block w-full bg-[#35c8b5] text-white font-black uppercase text-center py-3 hover:bg-blue-700 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5  active:shadow-none transition-all magnetic relative z-50"
											>
												Send Transmission
											</a>
										</div>
									</div>
									<div className="flex items-end gap-4">
										<div
											className="group flex-1 border-2 border-black bg-[#208db4] p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:-translate-y-1 transition-transform magnetic relative z-50"
											onClick={handleDownloadResume}
										>
											<div className="flex items-center gap-4">
												<Save
													size={48}
													className="text-white"
													strokeWidth={1.5}
												/>
												<div className="flex flex-col">
													<span className="font-black text-xl uppercase text-white leading-none">
														Omkar_CV.pdf
													</span>
													<span className="font-mono text-xs text-white/80">
														Updated 2024 // DOWNLOAD
													</span>
												</div>
												<Download className="ml-auto text-white group-hover:animate-bounce" />
											</div>
										</div>
									</div>
								</div>
								<div className="md:col-span-5 flex flex-col gap-6">
									<div className="relative border-2 border-black bg-[#eef7be] p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
										<div className="absolute -top-3 -right-3 bg-yellow-400 border-2 border-black px-2 font-bold text-xs rotate-12 z-20">
											VERIFIED
										</div>
										<div className="flex gap-4">
											<div className="w-24 h-32 border-2 border-black p-1 bg-gray-100 shrink-0">
												<img
													src="https://via.placeholder.com/150x200/2A4B67/FFFFFF?text=OP"
													alt="User"
													className="w-full h-full object-cover grayscale contrast-125"
												/>
											</div>
											<div className="flex flex-col justify-between w-full">
												<div>
													<h4 className="font-black text-xl uppercase leading-none mb-1">
														Omkar Pawar
													</h4>
													<p className="font-mono text-[10px] text-gray-500">
														Kharghar, Navi Mumbai
													</p>
													<p className="font-mono text-[10px] text-gray-500">
														+91 73040 58886
													</p>
												</div>
												<Barcode className="w-full h-8 opacity-80" />
											</div>
										</div>
									</div>
									<div className="flex gap-4 justify-end">
										<a
											href="https://github.com/omkar6750"
											target="_blank"
											rel="noreferrer"
											className="w-10 h-10 border-2 border-black bg-white flex items-center justify-center font-black hover:bg-black hover:text-white cursor-pointer transition-colors shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] magnetic relative z-50"
										>
											GH
										</a>
										<a
											href="https://linkedin.com/in/omkar-pawar-737571259"
											target="_blank"
											rel="noreferrer"
											className="w-10 h-10 border-2 border-black bg-white flex items-center justify-center font-black hover:bg-black hover:text-white cursor-pointer transition-colors shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] magnetic relative z-50"
										>
											LI
										</a>
									</div>
								</div>
							</div>
						</Card>
					</div>
				</div>
			</SilverMatteBackground>
		</main>
	);
}
