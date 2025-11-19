import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";

export const CustomCursor: React.FC = () => {
	const cursorRef = useRef<HTMLDivElement>(null);
	const [isHovering, setIsHovering] = useState(false);
	const activeMagnet = useRef<HTMLElement | null>(null);

	// quickTo
	const xTo = useRef<gsap.QuickToFunc | null>(null);
	const yTo = useRef<gsap.QuickToFunc | null>(null);
	const widthTo = useRef<gsap.QuickToFunc | null>(null);
	const heightTo = useRef<gsap.QuickToFunc | null>(null);

	// magnetic quickSetters
	const magnetX = useRef<any>(null);
	const magnetY = useRef<any>(null);

	// cached rect
	const magnetRect = useRef<DOMRect | null>(null);

	useGSAP(() => {
		if (!cursorRef.current) return;

		document.body.style.cursor = "none";

		// quickTo for cursor
		xTo.current = gsap.quickTo(cursorRef.current, "x", { duration: 0.06 });
		yTo.current = gsap.quickTo(cursorRef.current, "y", { duration: 0.06 });
		widthTo.current = gsap.quickTo(cursorRef.current, "width", {
			duration: 0.2,
		});
		heightTo.current = gsap.quickTo(cursorRef.current, "height", {
			duration: 0.2,
		});

		// throttle
		let last = 0;
		const frameInterval = 1000 / 100; // ~100fps

		const onPointerMove = (e: PointerEvent) => {
			const now = performance.now();
			if (now - last < frameInterval) return;
			last = now;

			const { clientX, clientY } = e;

			if (!activeMagnet.current) {
				xTo.current?.(clientX);
				yTo.current?.(clientY);
				return;
			}

			const rect = magnetRect.current!;
			const cX = rect.left + rect.width / 2;
			const cY = rect.top + rect.height / 2;

			magnetX.current?.((clientX - cX) * 0.25);
			magnetY.current?.((clientY - cY) * 0.25);
		};

		const onPointerOver = (e: PointerEvent) => {
			const target = (e.target as HTMLElement).closest(
				".magnetic"
			) as HTMLElement;
			if (!target) return;

			activeMagnet.current = target;
			setIsHovering(true);

			magnetRect.current = target.getBoundingClientRect();

			// quickSetters
			magnetX.current = gsap.quickSetter(target, "x", "px");
			magnetY.current = gsap.quickSetter(target, "y", "px");

			const r = magnetRect.current!;
			xTo.current?.(r.left + r.width / 2);
			yTo.current?.(r.top + r.height / 2);
			widthTo.current?.(r.width + 20);
			heightTo.current?.(r.height + 20);
		};

		const onPointerOut = (e: PointerEvent) => {
			const target = (e.target as HTMLElement).closest(
				".magnetic"
			) as HTMLElement;
			if (!target || target !== activeMagnet.current) return;

			activeMagnet.current = null;
			setIsHovering(false);

			widthTo.current?.(16);
			heightTo.current?.(16);

			gsap.to(target, { x: 0, y: 0, duration: 0.2 });
		};

		window.addEventListener("pointermove", onPointerMove);
		window.addEventListener("pointerover", onPointerOver);
		window.addEventListener("pointerout", onPointerOut);

		return () => {
			window.removeEventListener("pointermove", onPointerMove);
			window.removeEventListener("pointerover", onPointerOver);
			window.removeEventListener("pointerout", onPointerOut);
			document.body.style.cursor = "auto";
		};
	}, []);

	return (
		<div
			ref={cursorRef}
			className={`fixed top-0 left-0 pointer-events-none z-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600
        ${isHovering ? "opacity-30" : "opacity-100"}`}
			style={{
				width: 16,
				height: 16,
				willChange: "transform, width, height",
			}}
		/>
	);
};
