import React, { useState } from "react";
import { Send, X, Minus, Square } from "lucide-react";

export const ContactForm = () => {
	const [formData, setFormData] = useState({
		subject: "",
		message: "",
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const mailtoUrl = `mailto:pawaromkar1654@gmail.com?subject=${encodeURIComponent(
		formData.subject || "Project Inquiry"
	)}&body=${encodeURIComponent(formData.message)}`;

	return (
		<div className="border-2 border-black bg-[#eef7be] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-0.5 md:p-1 w-full">
			{/* WINDOW HEADER */}
			<div className="bg-black text-white px-2 py-0.5 md:py-1 text-[10px] md:text-xs font-mono flex justify-between items-center mb-2 select-none">
				<span className="flex items-center gap-2 truncate">
					MSG.exe
				</span>
				<div className="flex gap-1 shrink-0">
					<button className="hover:bg-gray-700">
						<Minus size={8} />
					</button>
					<button className="hover:bg-gray-700">
						<Square size={6} />
					</button>
					<button className="hover:bg-red-600">
						<X size={8} />
					</button>
				</div>
			</div>

			{/* CONTENT */}
			<div className="px-2 md:px-4 pb-2 md:pb-6 space-y-2 md:space-y-4">
				{/* TO FIELD */}
				<div className="flex items-center border-b border-black/20 pb-1">
					<span className="font-mono text-[10px] md:text-xs font-bold mr-2 w-8 md:w-16 shrink-0 text-black/60">
						TO:
					</span>
					<span className="font-mono text-[10px] md:text-sm text-blue-700 font-bold truncate">
						pawaromkar1654@gmail.com
					</span>
				</div>

				{/* SUBJECT INPUT */}
				<div className="flex items-center border-b border-black/20 pb-1">
					<span className="font-mono text-[10px] md:text-xs font-bold mr-2 w-12 md:w-16 shrink-0">
						SUB:
					</span>
					<input
						type="text"
						name="subject"
						value={formData.subject}
						onChange={handleChange}
						placeholder="Inquiry..."
						className="flex-1 bg-transparent font-mono text-xs md:text-sm outline-none placeholder:text-black/30 min-w-0 h-5"
					/>
				</div>

				{/* MESSAGE BODY */}
				<div className="relative mt-2">
					<textarea
						name="message"
						value={formData.message}
						onChange={handleChange}
						placeholder="Message..."
						rows={2} // Very small on mobile default
						className="w-full bg-white/50 border border-black p-2 font-mono text-xs md:text-sm 
                        focus:bg-white focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] 
                        outline-none transition-all resize-none placeholder:text-black/30 min-h-[60px] md:min-h-[100px]"
					/>
				</div>

				{/* SEND BUTTON */}
				<div className="flex items-center pb-1">
					<a
						href={mailtoUrl}
						className="group w-full bg-[#208db4] text-white font-black uppercase text-center py-1.5 md:py-3 
                                 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                                 hover:bg-[#1a7a9c] active:translate-y-[1px] active:shadow-none 
                                 transition-all flex items-center justify-center gap-2 cursor-pointer"
					>
						<span className="text-[10px] md:text-base">Send</span>
						<Send
							size={12}
							className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform md:w-4 md:h-4"
						/>
					</a>
				</div>
			</div>
		</div>
	);
};
