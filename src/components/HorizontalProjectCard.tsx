import React, { useState, useMemo } from "react";
import {
	ChevronRight,
	ChevronLeft,
	ArrowUpRight,
	Github,
	Layers,
	Radio,
	Hammer,
	Construction,
	ImageOff,
} from "lucide-react";
import type { FlattenedProject } from "../types";

export const categoryColors = {
	personal: "bg-[#4F8FF7]/60",
	freelance: "bg-[#7FC46A]/60",
	academic: "bg-[#A78BFA]/60",
};

// Helper to check if a URL is a video
const isVideo = (url: string) => /\.(mp4|webm|ogg)$/i.test(url);

export const HorizontalProjectCard: React.FC<{
	project: FlattenedProject;
	index: number;
	id: string;
}> = ({ project, id }) => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [isHovered, setIsHovered] = useState(false);

	const bgColor =
		categoryColors[project.category as keyof typeof categoryColors] ||
		"bg-white";

	const isWIP = project.status === "wip";

	// Construct the Slides Array
	const slides = useMemo(() => {
		const items = [];

		// Check if main image exists and is not empty string
		if (project.image && project.image.trim() !== "") {
			items.push({ type: "main", url: project.image });
		}

		// Check gallery
		if (project.gallery) {
			project.gallery.forEach((url) => {
				if (url && url.trim() !== "") {
					items.push({ type: "gallery", url });
				}
			});
		}

		// Check architecture
		if (
			project.architectureImage &&
			project.architectureImage.trim() !== ""
		) {
			items.push({ type: "arch", url: project.architectureImage });
		}

		return items;
	}, [project]);

	const handleNext = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (slides.length > 0) {
			setCurrentSlide((prev) => (prev + 1) % slides.length);
		}
	};

	const handlePrev = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (slides.length > 0) {
			setCurrentSlide((prev) =>
				prev === 0 ? slides.length - 1 : prev - 1,
			);
		}
	};

	// Safe access to active media
	const activeMedia = slides.length > 0 ? slides[currentSlide] : null;

	return (
		<article
			id={id}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className={`shrink-0 w-[85vw] md:w-[30vw] h-[60vh] md:h-[500px] 
      border-2 border-black p-5 
      shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] 
      hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]
      transition-all flex flex-col relative snap-center group ${bgColor}`}
		>
			{/* === WIP WARNING TAPE === */}
			{isWIP && (
				<div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 bg-yellow-400 border-2 border-black px-4 py-1 flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-2">
					<Construction size={14} />
					<span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
						Work In Progress
					</span>
					<Construction size={14} />
				</div>
			)}

			{/* === MEDIA SECTION === */}
			<div className="relative w-full h-1/2 border-b-2 border-black overflow-hidden mb-4 bg-gray-100 group-inner">
				{slides.length === 0 ? (
					/* --- NO IMAGE PLACEHOLDER --- */
					<div className="w-full h-full flex flex-col items-center justify-center bg-[#e5e5e5] select-none">
						<div className="border-2 border-black p-4 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
							<ImageOff
								size={32}
								className="text-black/40 mb-2 mx-auto"
							/>
							<span className="font-mono text-xs font-bold text-black/60 block text-center">
								NO VISUAL DATA
							</span>
						</div>
						{/* Subtle background pattern */}
						<div
							className="absolute inset-0 opacity-10 pointer-events-none"
							style={{
								backgroundImage:
									"repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 10px)",
							}}
						/>
					</div>
				) : (
					/* --- CAROUSEL CONTENT --- */
					<>
						{/* LIVE INDICATOR */}
						{project.status === "live" && project.liveUrl && (
							<div className="absolute top-3 right-3 z-20 flex items-center gap-2 bg-black text-white px-2 py-1 border border-white shadow-sm">
								<span className="relative flex h-2 w-2">
									<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
									<span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
								</span>
								<span className="text-[10px] font-black uppercase tracking-widest">
									LIVE
								</span>
							</div>
						)}

						{/* ARCHITECTURE LABEL */}
						{activeMedia?.type === "arch" && (
							<div className="absolute top-3 left-3 z-20 bg-yellow-400 text-black border-2 border-black px-2 py-1 text-[10px] font-bold uppercase flex items-center gap-1">
								<Layers size={10} /> Architecture
							</div>
						)}

						{/* MEDIA DISPLAY */}
						{activeMedia && isVideo(activeMedia.url) ? (
							<video
								src={activeMedia.url}
								autoPlay
								muted
								loop
								playsInline
								itemProp="video"
								className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
							/>
						) : (
							<img
								src={activeMedia?.url}
								alt={`${project.name} user interface - slide ${
									currentSlide + 1
								}`}
								itemProp="image screenshot"
								className={`w-full h-full object-cover transition-all duration-700 
                ${
					activeMedia?.type === "arch"
						? "object-contain p-4 bg-white"
						: "object-cover"
				} 
                ${
					isHovered ? "grayscale-0 scale-105" : "grayscale opacity-90"
				}`}
							/>
						)}

						<div className="absolute inset-0 bg-black/10 mix-blend-multiply pointer-events-none"></div>

						{/* CONTROLS (Only if multiple slides) */}
						{slides.length > 1 && (
							<div className="absolute bottom-0 right-0 flex border-t-2 border-l-2 border-black bg-white z-30">
								<button
									onClick={handlePrev}
									className="p-2 hover:bg-black hover:text-white border-r border-black transition-colors"
								>
									<ChevronLeft size={16} />
								</button>
								<button
									onClick={handleNext}
									className="p-2 hover:bg-black hover:text-white transition-colors"
								>
									<ChevronRight size={16} />
								</button>
							</div>
						)}
					</>
				)}
			</div>

			{/* === TITLE & REPO === */}
			<div className="flex justify-between items-start mb-2">
				<h3
					itemProp="name"
					className="text-3xl font-black uppercase leading-[0.9] text-white stroke-black"
				>
					{project.name}
				</h3>

				{project.repoUrl && (
					<a
						href={project.repoUrl}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={`View source code for ${project.name} on GitHub`}
						className="flex shrink-0 bg-white text-black border-2 border-black p-1.5 
                       hover:bg-black hover:text-white transition-colors magnetic group/repo"
						title="View Repository"
					>
						<Github size={16} className="mr-1" />
						<ArrowUpRight
							size={16}
							className="transition-transform duration-300 group-hover/repo:rotate-45"
						/>
					</a>
				)}
			</div>

			{/* DESCRIPTION */}
			<p
				itemProp="description"
				className="text-lg font-mono text-black mb-4 line-clamp-3 font-medium"
			>
				{project.description}
			</p>

			{/* TECH STACK */}
			<ul className="flex flex-wrap gap-2 mb-auto">
				{project.stack.map((tech) => (
					<li
						key={tech}
						className="px-2 py-1 bg-white border border-black text-[11px] font-bold uppercase magnetic hover:bg-black hover:text-white transition-colors cursor-default"
					>
						{tech}
					</li>
				))}
			</ul>

			{/* === FOOTER LOGIC === */}
			{isWIP ? (
				<div className="mt-4 flex justify-between items-center pt-4 border-t-2 border-dashed border-black/40 w-full">
					<span className="text-xs font-bold uppercase flex items-center gap-1 group-hover:text-white cursor-default opacity-60">
						<Hammer size={10} /> Construction
					</span>
				</div>
			) : (
				<div className="mt-4 flex justify-between items-center pt-4 border-t-2 border-dashed border-black/40 w-full">
					<span className="font-mono text-xs font-bold bg-black text-white px-2 py-0.5">
						{project.year}
					</span>

					{project.status === "live" && project.liveUrl ? (
						<a
							href={project.liveUrl}
							target="_blank"
							itemProp="url"
							rel="noreferrer"
							className="text-sm font-bold uppercase flex items-center gap-1 hover:underline magnetic group-hover:text-white"
						>
							View Site
							<Radio
								size={14}
								className="transition-transform group-hover:scale-110"
							/>
						</a>
					) : (
						<span className="text-sm font-bold uppercase flex items-center gap-1 group-hover:text-white cursor-default opacity-60">
							Case Study Only
						</span>
					)}
				</div>
			)}
		</article>
	);
};
