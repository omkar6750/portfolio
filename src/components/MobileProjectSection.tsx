import React, { useEffect, useMemo } from "react";
import { Award, Globe, User } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { HorizontalProjectCard } from "./HorizontalProjectCard";
import type { FlattenedProject, ProjectsData } from "../types";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

interface MobileProjectSectionProps {
	projectsMap: ProjectsData;
	activeTab: string;
	setActiveTab: (tab: string) => void;
}

export const MobileProjectSection: React.FC<MobileProjectSectionProps> = ({
	projectsMap,
	activeTab,
	setActiveTab,
}) => {
	// Flatten projects
	const allProjects = useMemo(() => {
		const flat: FlattenedProject[] = [];
		Object.keys(projectsMap).forEach((key) => {
			projectsMap[key].forEach((project, idx) => {
				flat.push({
					...project,
					category: key,
					id: `mobile-project-${key}-${idx}`,
				});
			});
		});
		return flat;
	}, [projectsMap]);

	// Scroll to category logic
	const handleTabClick = (category: string) => {
		setActiveTab(category);
		const targetId = `category-start-${category}`;
		const targetElement = document.getElementById(targetId);

		if (targetElement) {
			gsap.to(window, {
				scrollTo: { y: targetElement, offsetY: 100 }, // Offset for the sticky header height
				duration: 1,
				ease: "power3.inOut",
			});
		}
	};

	// ScrollSpy Logic: Update active tab based on scroll position
	useEffect(() => {
		const categories = ["personal", "freelance", "academic"];
		const triggers: ScrollTrigger[] = [];

		// Create a scroll trigger for each category zone
		categories.forEach((cat) => {
			const element = document.getElementById(`category-start-${cat}`);
			if (!element) return;

			const st = ScrollTrigger.create({
				trigger: element,
				start: "top center", // When top of category hits center of screen
				end: "bottom center",
				onEnter: () => setActiveTab(cat),
				onEnterBack: () => setActiveTab(cat),
			});
			triggers.push(st);
		});

		return () => {
			triggers.forEach((t) => t.kill());
		};
	}, [allProjects, setActiveTab]);

	return (
		<section className="w-full min-h-screen relative pb-24 bg-transparent">
			{/* === CLASSIC STICKY HEADER === */}
			{/* sticky: enables sticky positioning
                top-0: sticks to the top of the viewport
                z-50: ensures it stays above the project cards
            */}
			<div className="sticky top-0 left-0 w-full bg-black/30 border-b border-white/20 p-3 z-50 backdrop-blur-md shadow-lg transition-all duration-300">
				<div className="flex gap-2 overflow-x-auto no-scrollbar justify-start pl-2">
					{[
						{ id: "personal", label: "Personal", icon: User },
						{ id: "freelance", label: "Freelance", icon: Globe },
						{ id: "academic", label: "Research", icon: Award },
					].map((tab) => (
						<button
							key={tab.id}
							onClick={() => handleTabClick(tab.id)}
							className={`flex shrink-0 items-center gap-2 px-3 py-2 font-mono text-[10px] font-bold uppercase border border-black transition-all ${
								activeTab === tab.id
									? "bg-black text-white shadow-[2px_2px_0px_0px_rgba(255,255,255,0.5)]"
									: "bg-white/90 text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] hover:bg-white"
							}`}
						>
							<tab.icon size={12} />
							{tab.label}
						</button>
					))}
				</div>
			</div>

			{/* === VERTICAL LIST === */}
			<div className="flex flex-col gap-16 px-4 pt-8">
				{allProjects.map((project, idx) => {
					const isCategoryStart =
						idx === 0 ||
						allProjects[idx - 1].category !== project.category;

					return (
						<React.Fragment key={project.id}>
							{/* Category Separator (Scroll Target) */}
							{isCategoryStart && (
								<div
									id={`category-start-${project.category}`}
									className="w-full border-t-2 border-dashed border-black/30 pt-12 mt-4 flex flex-col items-center scroll-mt-32"
								>
									<span className="bg-black text-white px-4 py-1 font-mono text-xs font-bold uppercase tracking-widest -mt-15 rotate-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
										{project.category} ZONE
									</span>
								</div>
							)}

							{/* Card Container */}
							<div className="flex justify-center w-full">
								<HorizontalProjectCard
									project={project}
									index={idx}
									id={project.id}
								/>
							</div>
						</React.Fragment>
					);
				})}
			</div>

			{/* End of list decoration */}
			<div className="mt-20 flex justify-center opacity-50">
				<div className="flex flex-col items-center gap-2">
					<div className="w-1 h-12 bg-black/20"></div>
					<span className="font-mono text-[10px] font-bold uppercase">
						End of Projects
					</span>
				</div>
			</div>
		</section>
	);
};
