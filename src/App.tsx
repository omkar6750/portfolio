import { useState } from "react";
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
	Save,
	Award,
	Barcode,
	Github,
	LinkedinIcon,
} from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import { Card } from "./components/Card";
import { SilverMatteBackground } from "./components/SilverBackgroud";
import { CustomCursor } from "./components/CustomCursor";
import { HorizontalScrollSection } from "./components/HorizontalScrollSection";
import { PROJECTS_DATA } from "./data/projects";
import { WorkExperience404 } from "./components/WorkExperience";
import { HeroSection } from "./components/HeroSection";
import { skills } from "./data/skills";
import { ContactForm } from "./components/ContactForm";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);

export default function App() {
	const [activeTab, setActiveTab] = useState<string>("personal");

	const handleDownloadResume = () => {
		// 1. Define the file URL (relative to the public folder)
		const pdfUrl = "/cv.pdf";

		// 2. Create a temporary link element
		const link = document.createElement("a");
		link.href = pdfUrl;

		// 3. Set the filename the user will see when saving
		link.download = "omkar_pawar_cv.pdf";

		// 4. Append to body, click, and remove
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return (
		<main>
			<SilverMatteBackground>
				<CustomCursor />
				<div className="max-w-7xl mx-auto px-4 md:px-8 pb-24 font-sans">
					{/* --- HERO SECTION --- */}

					<HeroSection />
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
										<DotLottieReact
											src="https://lottie.host/8a4b4785-8d75-4516-809b-46fc5728e567/96ugoCdlS7.lottie"
											loop
											autoplay
											height={100}
										/>
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
								title="Skills"
								color="bg-[#FF7F3F]"
								icon={Terminal}
								tags={["Tech Stack"]}
								className="text-black"
							>
								<div className="space-y-6 mt-2">
									<div className="flex items-center gap-7 ">
										<div>
											<h5 className="font-black text-xs uppercase mb-2 flex items-center gap-1">
												<Code size={12} /> Languages
											</h5>
											<div className="flex flex-wrap gap-2">
												{skills.languages.map((t) => (
													<span
														key={t}
														className="px-2 py-1 bg-white border-2 border-black text-[10px] font-bold hover:bg-red-500 hover:text-white transition-colors cursor-default magnetic relative z-50"
													>
														{t}
													</span>
												))}
											</div>
										</div>
										<div style={{ width: "100px" }}></div>
									</div>
									<div>
										<h5 className="font-black text-xs uppercase mb-2 flex items-center gap-1">
											<Layers size={12} /> Frameworks
										</h5>
										<div className="flex flex-wrap gap-2">
											{skills.frameworks.map((t) => (
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
											{skills.miscellaneous.map((t) => (
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

				<div className="max-w-7xl mx-auto px-4 md:px-8 pb-24 font-sans   h-screen">
					<div className="md:col-span-12 min-h-[500px] mt-8 mb-12 ">
						<Card
							title="Comm_Link"
							color="bg-[#a4cf4a]"
							tags={[
								"Open to Work in:",
								"mumbai",
								"pune",
								"banglore",
							]}
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
									<ContactForm />
									<div className="flex items-end gap-4">
										<div
											className="group flex-1 border-2 border-black bg-[#208db4] p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:-translate-y-1 transition-transform  relative z-50"
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
												<Download className="ml-auto text-white group-hover:animate-bounce " />
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
													src="/public/images/my-image2.jpg"
													alt="User"
													className="w-full h-full object-cover"
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
													<p className="font-mono text-[10px] text-gray-500">
														DOB: 25/11/2003
													</p>
												</div>
												<Barcode
													className="opacity-40"
													seed={"sdfsfbkewf"}
												/>
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
											<Github />
										</a>
										<a
											href="https://linkedin.com/in/omkar-pawar-737571259"
											target="_blank"
											rel="noreferrer"
											className="w-10 h-10 border-2 border-black bg-white flex items-center justify-center font-black hover:bg-black hover:text-white cursor-pointer transition-colors shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] magnetic relative z-50"
										>
											<LinkedinIcon />
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
