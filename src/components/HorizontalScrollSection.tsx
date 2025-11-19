import React, {
	useCallback,
	useEffect,
	useLayoutEffect,
	useMemo,
	useRef,
} from "react";
import { HorizontalProjectCard } from "./HorizontalProjectCard";
import { useGSAP } from "@gsap/react";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import type { FlattenedProject, ProjectsData } from "../types";
import { Award, Globe, User } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
interface CardPosition {
	id: string;
	category: string;
	left: number;
	width: number;
}

interface HorizontalScrollSectionProps {
	projectsMap: ProjectsData;
	activeTab: string;
	setActiveTab: (tab: string) => void;
}

export const HorizontalScrollSection: React.FC<
	HorizontalScrollSectionProps
> = ({ projectsMap, activeTab, setActiveTab }) => {
	const sectionRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	const activeTabRef = useRef(activeTab);
	const isAutoScrolling = useRef(false);
	const cardPositionsRef = useRef<CardPosition[]>([]); // Store pre-computed positions

	useEffect(() => {
		activeTabRef.current = activeTab;
	}, [activeTab]);

	// Flatten all projects
	const allProjects = useMemo(() => {
		const flat: FlattenedProject[] = [];
		Object.keys(projectsMap).forEach((key) => {
			projectsMap[key].forEach((project, idx) => {
				flat.push({
					...project,
					category: key,
					id: `project-${key}-${idx}`,
				});
			});
		});
		return flat;
	}, [projectsMap]);

	// Pre-compute card positions on layout/resize
	const computePositions = useCallback(() => {
		if (!sectionRef.current) return;
		const cards =
			sectionRef.current.querySelectorAll<HTMLElement>(
				'[id^="project-"]'
			);
		const positions: CardPosition[] = [];
		cards.forEach((card) => {
			const category = card.id.split("-")[1];
			positions.push({
				id: card.id,
				category,
				left: card.offsetLeft,
				width: card.offsetWidth,
			});
		});
		cardPositionsRef.current = positions;
	}, [allProjects]);

	useLayoutEffect(() => {
		computePositions();
		window.addEventListener("resize", computePositions);
		return () => window.removeEventListener("resize", computePositions);
	}, [computePositions]);

	// Precise tab navigation using Pre-computed positions
	const handleTabClick = (category: string) => {
		if (!triggerRef.current || !sectionRef.current) return;

		setActiveTab(category);
		isAutoScrolling.current = true;

		// Find first card of category in pre-computed list
		const targetCard = cardPositionsRef.current.find(
			(p) => p.category === category
		);

		if (targetCard) {
			const st = ScrollTrigger.getById("projectScroller");
			if (st) {
				// Calculate progress
				// totalScrollDistance (horizontal) = scrollWidth - viewportWidth
				const scrollWidth =
					sectionRef.current.scrollWidth - window.innerWidth;

				// Clamp progress between 0 and 1
				const progress = Math.max(
					0,
					Math.min(1, targetCard.left / scrollWidth)
				);

				const totalVerticalScroll = (st.end as number) - st.start;
				const targetScroll = st.start + totalVerticalScroll * progress;

				gsap.to(window, {
					scrollTo: targetScroll,
					duration: 1.5,
					ease: "power3.inOut",
					onComplete: () => {
						setTimeout(() => {
							isAutoScrolling.current = false;
						}, 100);
					},
				});
			}
		} else {
			isAutoScrolling.current = false;
		}
	};

	useGSAP(
		() => {
			if (!sectionRef.current || !triggerRef.current) return;

			const scrollWidth = sectionRef.current.scrollWidth;
			const viewportWidth = window.innerWidth;
			const xMove = -(scrollWidth - viewportWidth + 100);

			gsap.to(sectionRef.current, {
				x: xMove,
				ease: "none",
				scrollTrigger: {
					id: "projectScroller",
					trigger: triggerRef.current,
					start: "top top",
					end: "+=4000",
					scrub: 1,
					pin: true,
					invalidateOnRefresh: true,
					anticipatePin: 1,
					onUpdate: (self) => {
						if (isAutoScrolling.current) return;

						// --- Optimized Scroll Detection Logic ---
						const progress = self.progress;
						const totalHorizontalScroll =
							scrollWidth - viewportWidth;
						const currentX = progress * totalHorizontalScroll;

						const centerViewX = currentX + viewportWidth * 0.5;

						let activeCat = "personal";
						const positions = cardPositionsRef.current;

						for (let i = 0; i < positions.length; i++) {
							const card = positions[i];

							if (
								centerViewX >= card.left &&
								centerViewX <= card.left + card.width + 100
							) {
								// +100 for gap
								activeCat = card.category;
								break;
							}
						}

						if (activeCat !== activeTabRef.current) {
							setActiveTab(activeCat);
						}
					},
				},
			});
		},
		{ scope: triggerRef, dependencies: [allProjects] }
	);

	return (
		<section
			ref={triggerRef}
			className="overflow-hidden h-screen flex flex-col  border-y-4 border-black relative"
		>
			<div className="absolute top-0 left-0 w-full bg-black/20 border-b border-black p-4 z-20 flex justify-between items-center backdrop-blur-sm">
				<div className="flex gap-4 overflow-x-auto no-scrollbar pl-12 md:pl-24">
					{[
						{ id: "personal", label: "Personal", icon: User },
						{ id: "freelance", label: "Freelance", icon: Globe },
						{ id: "academic", label: "Research", icon: Award },
					].map((tab) => (
						<button
							key={tab.id}
							onClick={() => handleTabClick(tab.id)}
							className={`flex items-center gap-2 px-4 py-1 font-mono text-xs font-bold uppercase border border-black transition-all magnetic relative z-50 ${
								activeTab === tab.id
									? "bg-black text-white"
									: "bg-white text-black hover:bg-gray-200"
							}`}
						>
							<tab.icon size={12} />
							{tab.label}
						</button>
					))}
				</div>
			</div>

			<div className="absolute top-1/2 w-full h-px bg-red-500/30 z-0 pointer-events-none"></div>

			<div
				className="h-full flex items-center pl-8 md:pl-24 w-full overflow-hidden"
				ref={containerRef}
			>
				<div
					ref={sectionRef}
					className="flex items-center w-max pr-24 gap-3"
				>
					{allProjects.map((project, idx) => (
						<React.Fragment key={idx}>
							{(idx === 0 ||
								allProjects[idx - 1].category !==
									project.category) && (
								<div className="shrink-0 w-[5vw] md:w-[2vw] h-[60vh] border-l-2 border-dashed border-black/50 flex flex-col justify-center items-center mr-8">
									<div className="rotate-90 font-mono text-xs font-bold tracking-widest text-gray-800 whitespace-nowrap">
										// {project.category.toUpperCase()} ZONE
									</div>
								</div>
							)}
							<HorizontalProjectCard
								project={project}
								index={idx}
								id={project.id}
							/>
						</React.Fragment>
					))}
					<div className="shrink-0 w-[20vw] h-[50vh] flex items-center justify-center opacity-30">
						<div className="text-4xl font-black transform -rotate-90">
							END_OF_TAPE
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
