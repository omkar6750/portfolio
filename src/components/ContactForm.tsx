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

	// Construct the mailto URL dynamically
	const mailtoUrl = `mailto:pawaromkar1654@gmail.com?subject=${encodeURIComponent(
		formData.subject || "Project Inquiry"
	)}&body=${encodeURIComponent(formData.message)}`;

	return (
		<div className="border-2 border-black bg-[#eef7be] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-1">
			{/* WINDOW HEADER */}
			<div className="bg-black text-white px-2 py-1 text-xs font-mono flex justify-between items-center mb-4 select-none">
				<span className="flex items-center gap-2">
					COMPOSE_MESSAGE.exe
				</span>
				<div className="flex gap-1">
					<button className="hover:bg-gray-700 p-0.5">
						<Minus size={10} />
					</button>
					<button className="hover:bg-gray-700 p-0.5">
						<Square size={8} />
					</button>
					<button className="hover:bg-red-600 p-0.5">
						<X size={10} />
					</button>
				</div>
			</div>

			{/* CONTENT (Changed from <form> to <div> to prevent reload) */}
			<div className="px-4 pb-6 space-y-4">
				{/* TO FIELD */}
				<div className="flex items-center border-b-2 border-black/20 pb-2">
					<span className="font-mono text-xs font-bold mr-4 w-16">
						TO:
					</span>
					<span className="font-mono text-sm text-blue-700 font-bold">
						pawaromkar1654@gmail.com
					</span>
				</div>

				{/* SUBJECT INPUT */}
				<div className="flex items-center border-b-2 border-black/20 pb-2">
					<span className="font-mono text-xs font-bold mr-4 w-16">
						SUBJECT:
					</span>
					<input
						type="text"
						name="subject"
						value={formData.subject}
						onChange={handleChange}
						placeholder="Project Inquiry..."
						className="flex-1 bg-transparent font-mono text-sm outline-none placeholder:text-black/30"
					/>
				</div>

				{/* MESSAGE BODY */}
				<div className="relative mt-4">
					<textarea
						name="message"
						value={formData.message}
						onChange={handleChange}
						placeholder="Write your transmission here..."
						rows={3}
						className="w-full bg-white/50 border-2 border-black p-3 font-mono text-sm 
                       focus:bg-white focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                       outline-none transition-all resize-none placeholder:text-black/30"
					/>
				</div>

				{/* SEND BUTTON (Changed to <a> tag) */}
				<div className="flex items-center ">
					<a
						href={mailtoUrl}
						className="group w-full bg-[#208db4] text-white font-black uppercase text-center py-3 
										 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
										 hover:bg-[#1a7a9c] hover:translate-x-[2px] hover:translate-y-[2px] 
										 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] 
										 active:translate-x-[4px] active:translate-y-[4px] active:shadow-none 
										 transition-all flex items-center justify-center gap-2 cursor-pointer"
					>
						Send Transmission{" "}
						<Send
							size={16}
							className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform"
						/>
					</a>
				</div>
			</div>
		</div>
	);
};
