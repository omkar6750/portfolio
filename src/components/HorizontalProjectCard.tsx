import { ChevronRight } from "lucide-react";
import type { FlattenedProject } from "../types";

export const categoryColors = {
	freelance: "bg-[#7FC46A]",
	personal: "bg-[#4F8FF7]",
	academic: "bg-[#A78BFA]",
};

export const HorizontalProjectCard: React.FC<{
	project: FlattenedProject;
	index: number;
	id: string;
}> = ({ project, id }) => {
	const bgColor =
		categoryColors[project.category as keyof typeof categoryColors] ||
		"bg-white";

	return (
		<div
			id={id}
			className={`shrink-0 w-[85vw] md:w-[35vw] h-[60vh] md:h-[500px] 
      border-2 border-black p-5 
      shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] 
      hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]
      transition-all flex flex-col relative snap-center group ${bgColor}`}
		>
			{/* IMAGE BANNER */}
			<div className="relative w-full h-1/2 border-b-2 border-black overflow-hidden mb-4">
				<img
					src={project.image}
					alt={project.name}
					className="w-full h-full object-cover opacity-90 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
				/>
				<div className="absolute inset-0 bg-black/10 mix-blend-multiply"></div>
			</div>

			{/* TITLE */}
			<h3 className="text-3xl font-black uppercase leading-[0.9] mb-3 text-white">
				{project.name}
			</h3>

			{/* DESCRIPTION */}
			<p className="text-sm font-mono text-black/70 mb-5 line-clamp-4 text-black">
				{project.description}
			</p>

			{/* TECH STACK */}
			<div className="flex flex-wrap gap-2 mb-4">
				{project.stack.map((tech) => (
					<span
						key={tech}
						className="px-2 py-1 bg-white border border-black text-[10px] font-bold uppercase magnetic"
					>
						{tech}
					</span>
				))}
			</div>

			{/* FOOTER */}
			<div className="mt-auto flex justify-between items-center pt-4 border-t-2 border-dashed border-black/40">
				<span className="font-mono text-xs font-bold bg-black text-white px-2 py-0.5">
					{project.year}
				</span>

				<a
					href="#"
					className="text-xs font-bold uppercase flex items-center gap-1 hover:underline magnetic group-hover:text-white"
				>
					View Case{" "}
					<ChevronRight
						size={14}
						className="transition-transform group-hover:translate-x-1"
					/>
				</a>
			</div>
		</div>
	);
};
