import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { Barcode } from "./Barcode";

interface CardProps {
	className?: string;
	children?: React.ReactNode;
	title?: string;
	icon?: LucideIcon;
	color?: string;
	tags?: string[];
}

export const Card: React.FC<CardProps> = ({
	className,
	children,
	title,
	icon: Icon,
	color = "bg-white",
	tags = [],
}) => (
	<div
		className={`relative group h-full border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 transition-all duration-200 ${color} ${className}`}
	>
		<div className="absolute top-0 left-0 w-4 h-4 border-t-[3px] border-l-[3px] border-black z-20"></div>
		<div className="absolute bottom-0 right-0 w-4 h-4 border-b-[3px] border-r-[3px] border-black z-20"></div>
		<div className="p-6 md:p-8 h-full flex flex-col relative z-10">
			<div className="flex justify-between items-start mb-6 border-b-2 border-black/10 pb-4">
				<div className="flex flex-col">
					{title && (
						<h3 className="text-3xl md:text-4xl font-black tracking-tighter text-black uppercase transform origin-left scale-x-110 w-full mb-2">
							{title}
						</h3>
					)}
					{tags.length > 0 && (
						<div className="flex gap-2 mt-1">
							{tags.map((tag, i) => (
								<span
									key={i}
									className="px-2 py-0.5 text-[10px] font-bold font-mono uppercase border border-black bg-white/50 rounded-full magnetic relative z-50"
								>
									{tag}
								</span>
							))}
						</div>
					)}
				</div>
				{Icon && (
					<div className="border-2 border-black p-1 rounded-full bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
						<Icon size={24} className="text-black" />
					</div>
				)}
			</div>
			<div className="grow relative">{children}</div>
			<div className="mt-4 flex justify-between items-end">
				<Barcode className="opacity-40" seed={title || "default"} />
				<div className="magnetic relative z-50">
					<ArrowUpRight
						size={32}
						className="text-black transition-transform duration-300 group-hover:rotate-45  relative z-50"
					/>
				</div>
			</div>
		</div>
	</div>
);
