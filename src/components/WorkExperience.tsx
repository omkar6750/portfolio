import { AlertTriangle } from "lucide-react";
import { Card } from "./Card";

export const WorkExperience404: React.FC = () => {
	return (
		<div className="max-w-7xl mx-auto px-4 md:px-8  font-mono min-h-[400px] flex items-center justify-center">
			<Card
				title="Experience_Log"
				color="bg-[#E0E0E0]"
				className="w-full h-full flex flex-col items-center justify-center border-dashed border-4 border-black/20"
			>
				<div className="text-center max-w-lg relative z-50">
					<div
						className="text-6xl md:text-9xl font-black text-black/10 mb-4 select-none glitch-text"
						data-text="404"
					>
						404
					</div>
					<h3 className="text-2xl font-bold uppercase mb-4 flex items-center justify-center gap-2">
						<AlertTriangle className="text-black" /> Work Experience
						Not Found
					</h3>
					<div className="bg-white text-black p-6 text-left text-xs md:text-sm font-mono rounded shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-2 border-black relative overflow-hidden">
						<p className="mb-2 border-b border-black/10 pb-2 font-bold text-gray-400">
							// SYSTEM_LOG_DUMP
						</p>
						<p className="mb-1 font-bold">
							{">"} SEARCHING FOR 'JOB_HISTORY'...
						</p>
						<p className="mb-1 text-red-600 font-bold">
							{">"} ERROR: ARRAY_IS_EMPTY
						</p>
						<p className="mb-1 text-blue-700 font-bold">
							{">"} DETECTED: HIGH_POTENTIAL_CANDIDATE
						</p>
						{/* <p className="mb-1 text-gray-600 italic">
							{">"} STATUS: FRESH REPOSITORY, UNTAINTED BY LEGACY
							CODE
						</p> */}
						<p className="mt-4 border-t border-black/10 pt-2">
							{">"} SUGGESTION:{" "}
							<span className="animate-blink bg-black text-white px-2 py-0.5 font-bold">
								HIRE_IMMEDIATELY.EXE
							</span>
						</p>
					</div>
				</div>
			</Card>
			<style>{`
         .animate-blink { animation: blink 1s step-end infinite; }
         @keyframes blink { 50% { opacity: 0; } }
         .glitch-text { position: relative; }
         .glitch-text::before, .glitch-text::after {
           content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #E0E0E0;
         }
         .glitch-text::before { left: 2px; text-shadow: -1px 0 red; clip: rect(24px, 550px, 90px, 0); animation: glitch-anim-2 3s infinite linear alternate-reverse; }
         .glitch-text::after { left: -2px; text-shadow: -1px 0 blue; clip: rect(85px, 550px, 140px, 0); animation: glitch-anim 2.5s infinite linear alternate-reverse; }
         @keyframes glitch-anim { 
           0% { clip: rect(12px, 9999px, 22px, 0); }
           20% { clip: rect(82px, 9999px, 95px, 0); }
           40% { clip: rect(3px, 9999px, 67px, 0); }
           60% { clip: rect(54px, 9999px, 100px, 0); }
           80% { clip: rect(21px, 9999px, 11px, 0); }
           100% { clip: rect(91px, 9999px, 43px, 0); }
         }
         @keyframes glitch-anim-2 { 
           0% { clip: rect(65px, 9999px, 100px, 0); }
           20% { clip: rect(3px, 9999px, 33px, 0); }
           40% { clip: rect(95px, 9999px, 12px, 0); }
           60% { clip: rect(22px, 9999px, 81px, 0); }
           80% { clip: rect(43px, 9999px, 54px, 0); }
           100% { clip: rect(11px, 9999px, 6px, 0); }
         }
       `}</style>
		</div>
	);
};
