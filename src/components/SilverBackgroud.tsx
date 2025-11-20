interface SilverMatteBackgroundProps {
	children: React.ReactNode;
	className?: string;
	noiseOpacity?: number;
}

export const SilverMatteBackground: React.FC<SilverMatteBackgroundProps> = ({
	children,
	className = "",
	noiseOpacity = 0.8,
}) => {
	const colorBlue = "bg-[#2A4B67]";
	const colorGreen = "bg-[#509254]";

	return (
		<div
			className={`relative w-full min-h-screen bg-[#E8E8E8] isolate overflow-x-hidden ${className} `}
		>
			<div
				className="fixed inset-0 z-[-1] opacity-10 pointer-events-none"
				style={{
					backgroundImage:
						"linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
					backgroundSize: "50px 50px",
				}}
			></div>
			<div className="fixed inset-0 overflow-hidden pointer-events-none">
				{/* top left blob */}
				<div
					className={`absolute top-[-10%] left-[-10%] w-[30vw] h-[30vw] rounded-full mix-blend-multiply filter blur-[80px] opacity-80 animate-blob-1 ${colorBlue}`}
				></div>

				{/* top right blob */}
				<div
					className={`absolute bottom-[10%] right-[-10%] w-[40vw] h-[40vw] rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-blob-2 ${colorGreen}`}
				></div>
				<div
					className={`absolute bottom-[-15%] left-[30%] w-[20vw] h-[20vw] rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-blob-3 ${colorGreen}`}
				></div>
				<div
					className={`absolute  top-[5%] right-[35%]  w-[30vw] h-[30vw] rounded-full mix-blend-multiply filter blur-[80px] opacity-80 animate-blob-2 ${colorBlue}`}
				></div>
			</div>
			<div
				className="fixed inset-0 pointer-events-none z-0 mix-blend-overlay"
				style={{ opacity: noiseOpacity }}
			>
				<svg className="w-full h-full">
					<filter id="noiseFilter">
						<feTurbulence
							type="fractalNoise"
							baseFrequency="0.8"
							numOctaves="4"
							stitchTiles="stitch"
						/>
					</filter>
					<rect
						width="100%"
						height="100%"
						filter="url(#noiseFilter)"
					/>
				</svg>
				<div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-size-[100%_4px,6px_100%] pointer-events-none"></div>
			</div>
			<div className="relative z-10 w-full h-full">{children}</div>
			<style>{`
        @keyframes blob-move-1 { 0% { transform: translate(0,0) scale(1); } 33% { transform: translate(30px,-50px) scale(1.1); } 66% { transform: translate(-20px,20px) scale(0.9); } 100% { transform: translate(0,0) scale(1); } }
        @keyframes blob-move-2 { 0% { transform: translate(0,0) scale(1); } 33% { transform: translate(-30px,50px) scale(1.1); } 66% { transform: translate(20px,-20px) scale(0.9); } 100% { transform: translate(0,0) scale(1); } }
        @keyframes blob-move-3 { 0% { transform: translate(0,0) scale(1); } 50% { transform: translate(-40px,20px) scale(1.2); } 100% { transform: translate(0,0) scale(1); } }
        .animate-blob-1 { animation: blob-move-1 15s infinite ease-in-out; }
        .animate-blob-2 { animation: blob-move-2 18s infinite ease-in-out reverse; }
        .animate-blob-3 { animation: blob-move-3 20s infinite ease-in-out; }
        .typing-effect { border-right: 2px solid white; white-space: nowrap; overflow: hidden; animation: typing 3.5s steps(40, end), blink-caret .75s step-end infinite; }
        @keyframes typing { from { width: 0 } to { width: 100% } }
        @keyframes blink-caret { from, to { border-color: transparent } 50% { border-color: orange; } }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
		</div>
	);
};
