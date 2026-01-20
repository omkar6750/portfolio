import { Card } from "./Card";

interface WorkExperienceItem {
	id: number;
	title: string;
	company: string;
	period: string;
	description: string;
	description2?: string;
	isRemote?: boolean;
	color: string;
	tags?: string[];
	expandable?: boolean;
	logo?: string;
}

const experiences: WorkExperienceItem[] = [
	{
		id: 0,
		title: "Software Developer Intern",
		company: "Inscripts",
		period: "Jan 2026 - Present",
		description:
			"Working on CometChat, a real-time communications platform (CPaaS) focusing on chat, voice, and video SDKs.",
		description2:
			"Optimising the developer experience on documentation to increase conversion.",
		isRemote: true,
		color: "bg-[#C5D3E8]",
		tags: ["React", "Next.js", "DX", "HTML", "CSS", "WebSockets"],
		expandable: true,
		logo: "/images/inscripts_logo.png",
	},
	{
		id: 1,
		title: "Full Stack Developer Intern",
		company: "IISppr - Safe Harbour",
		period: "Dec 2025 - present",
		description:
			"Developed internal UI components and backend features using Next.js, Prisma, and Postgres.",
		description2:
			"Implemented authentication with password reset flow and admin dashboards during pre-production phase.",
		isRemote: true,
		color: "bg-[#C5D3E8]",
		tags: [
			"React",
			"Node.js",
			"API Development",
			"Next.js",
			"Prisma",
			"PostgreSQL",
			"MongoDB",
		],
		expandable: true,
		logo: "/images/iisppr_logo.png",
	},
	// {
	// 	id: 2,
	// 	title: "Volunteer Full Stack Developer",
	// 	company: "Kalaam Foundation",
	// 	period: "Dec 2025 - present",
	// 	description:
	// 		"Building a modern donation-facing web platform aimed at improving visibility and donor engagement.",
	// 	description2: "Defining system architecture and UX flows.",
	// 	isRemote: true,
	// 	color: "bg-[#C5D3E8]",
	// 	expandable: true,
	// },
];

export const WorkExperience: React.FC = () => {
	return (
		<div className="max-w-[70vw] mx-auto   font-mono py-8">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
				{experiences.map((exp) => (
					<div key={exp.id} className="relative group">
						<Card
							title={exp.company}
							color={exp.color || "bg-[#FFEAA7]"} // default unified color
							className="h-full flex flex-col text-black"
							tags={[
								exp.title,
								...(exp.isRemote ? ["Remote"] : []),
							]}
							image={exp.logo}
						>
							<div className="flex-1 flex flex-col justify-between">
								{/* TOP: Company + Logo */}
								<div className="flex items-start justify-between mb-4">
									<div className="flex justify-between w-full items-center">
										<p className="text-black text-2xl font-bold opacity-95">
											{exp.title}
										</p>
										<p className="text-lg uppercase font-bold opacity-90 border-b border-black/30   font-mono">
											{exp.period}
										</p>
									</div>
								</div>

								{/* PERIOD */}

								{/* DESCRIPTION */}
								<div className="bg-white/50 p-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]">
									<p className="text-lg leading-relaxed font-medium mb-2">
										{exp.description}
									</p>
									{exp.description2 && (
										<p className="text-lg italic opacity-80 leading-relaxed mb-4">
											{exp.description2}
										</p>
									)}
								</div>

								{/* STACK */}
								{exp.tags && (
									<div className="m-4">
										<p className="text-[10px] uppercase font-bold mb-2 opacity-70">
											Tech Stack
										</p>
										<ul className="flex flex-wrap gap-2">
											{exp.tags.map((tag) => (
												<li
													key={tag}
													className="px-2 py-1 bg-white border-2 border-black  font-bold magnetic"
												>
													{tag}
												</li>
											))}
										</ul>
									</div>
								)}
							</div>
						</Card>
					</div>
				))}
			</div>
		</div>
	);
};
