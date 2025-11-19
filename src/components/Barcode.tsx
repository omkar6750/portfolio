import { useMemo } from "react";

const pseudoRandom = (seed: string): number => {
	let value = 0;
	for (let i = 0; i < seed.length; i++) {
		value += seed.charCodeAt(i);
	}
	return (Math.sin(value) + 1) / 2;
};
export const Barcode: React.FC<{ className?: string; seed?: string }> = ({
	className,
	seed = "default",
}) => {
	const bars = useMemo(() => {
		return [...Array(15)].map((_, i) => {
			const rand = pseudoRandom(seed + i);
			return {
				width: rand > 0.5 ? "w-1" : "w-2",
				key: i,
			};
		});
	}, [seed]);

	return (
		<div className={`flex items-stretch h-8 gap-0.5 ${className}`}>
			{bars.map((bar) => (
				<div
					key={bar.key}
					className={`bg-black ${bar.width} h-full`}
				></div>
			))}
		</div>
	);
};
