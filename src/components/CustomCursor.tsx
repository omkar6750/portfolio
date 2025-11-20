import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState, useEffect } from "react";

export const CustomCursor: React.FC = () => {
	const cursorRef = useRef<HTMLDivElement>(null);
	const activeMagnet = useRef<HTMLElement | null>(null);
	const magnetText = useRef<HTMLElement | null>(null);
	const [isDesktop, setIsDesktop] = useState(true);

	// 1. Device Check
	useEffect(() => {
		const checkDevice = () => {
			const isLargeScreen = window.innerWidth >= 768;
			const hasMouse = window.matchMedia("(pointer: fine)").matches;
			setIsDesktop(isLargeScreen && hasMouse);
		};
		checkDevice();
		window.addEventListener("resize", checkDevice);
		return () => window.removeEventListener("resize", checkDevice);
	}, []);

	// GSAP Setters
	const xTo = useRef<gsap.QuickToFunc | null>(null);
	const yTo = useRef<gsap.QuickToFunc | null>(null);
	const widthTo = useRef<gsap.QuickToFunc | null>(null);
	const heightTo = useRef<gsap.QuickToFunc | null>(null);
	const radiusTo = useRef<gsap.QuickToFunc | null>(null); // We need this to match shape

	// Setter for the Element itself (to move it)
	const magnetX = useRef<((value: number) => void) | null>(null);
	const magnetY = useRef<((value: number) => void) | null>(null);

	// Cache for the active element's position
	const magnetRect = useRef<DOMRect | null>(null);

	useGSAP(() => {
		if (!isDesktop || !cursorRef.current) {
			document.body.style.cursor = "auto";
			return;
		}

		document.body.style.cursor = "none";

		// Setup QuickTos
		xTo.current = gsap.quickTo(cursorRef.current, "x", {
			duration: 0.1,
			ease: "power3.out",
		});
		yTo.current = gsap.quickTo(cursorRef.current, "y", {
			duration: 0.1,
			ease: "power3.out",
		});
		widthTo.current = gsap.quickTo(cursorRef.current, "width", {
			duration: 0.4,
			ease: "power3.out",
		});
		heightTo.current = gsap.quickTo(cursorRef.current, "height", {
			duration: 0.4,
			ease: "power3.out",
		});
		radiusTo.current = gsap.quickTo(cursorRef.current, "borderRadius", {
			duration: 0.4,
			ease: "power3.out",
		});

		let last = 0;
		const frameInterval = 1000 / 120;

		const onPointerMove = (e: PointerEvent) => {
			const now = performance.now();
			if (now - last < frameInterval) return;
			last = now;

			const { clientX, clientY } = e;

			// 1. NORMAL CURSOR (Not hovering)
			if (!activeMagnet.current || !magnetRect.current) {
				xTo.current?.(clientX);
				yTo.current?.(clientY);
				return;
			}

			// 2. MAGNETIC CURSOR (Hovering)
			const rect = magnetRect.current;
			const centerX = rect.left + rect.width / 2;
			const centerY = rect.top + rect.height / 2;

			// Calculate distance from center
			const distx = clientX - centerX;
			const disty = clientY - centerY;

			// Physics: dampening factor (0.2)
			// This calculates how much the BUTTON should move
			const moveX = distx * 0.2;
			const moveY = disty * 0.2;

			// A. Move the Button
			magnetX.current?.(moveX);
			magnetY.current?.(moveY);

			// B. Move the Cursor
			// CRITICAL CHANGE: The cursor moves to the Center + the Button's movement.
			// We do NOT add extra drift to the cursor. It stays locked to the button.
			xTo.current?.(centerX + moveX);
			yTo.current?.(centerY + moveY);

			// C. Text Parallax (Text moves slightly more than button for depth)
			if (magnetText.current) {
				gsap.to(magnetText.current, {
					x: moveX * 0.5, // Text moves relative to button
					y: moveY * 0.5,
					duration: 0.1,
					overwrite: true,
				});
			}
		};

		const onPointerOver = (e: PointerEvent) => {
			const target = (e.target as HTMLElement).closest(
				".magnetic"
			) as HTMLElement;
			if (!target) return;

			activeMagnet.current = target;
			magnetRect.current = target.getBoundingClientRect();
			magnetText.current = target.querySelector(
				"span, p, div"
			) as HTMLElement;

			// Get computed style to match border radius perfectly
			const computedStyle = window.getComputedStyle(target);
			const targetRadius = parseFloat(computedStyle.borderRadius);

			// Init setters for the target element
			magnetX.current = gsap.quickSetter(target, "x", "px") as (
				value: number
			) => void;
			magnetY.current = gsap.quickSetter(target, "y", "px") as (
				value: number
			) => void;

			// Animate Cursor to MATCH Element EXACTLY
			const r = magnetRect.current;
			widthTo.current?.(r.width); // Exact width
			heightTo.current?.(r.height); // Exact height
			radiusTo.current?.(targetRadius); // Exact shape
		};

		const onPointerOut = (e: PointerEvent) => {
			const target = (e.target as HTMLElement).closest(
				".magnetic"
			) as HTMLElement;
			if (!target || target !== activeMagnet.current) return;

			// Reset Target Element
			gsap.to(target, {
				x: 0,
				y: 0,
				duration: 0.4,
				ease: "power3.out",
				clearProps: "transform",
			});

			// Reset Text
			if (magnetText.current) {
				gsap.to(magnetText.current, {
					x: 0,
					y: 0,
					duration: 0.4,
					ease: "power3.out",
				});
			}

			activeMagnet.current = null;
			magnetText.current = null;

			// Reset Cursor to Dot
			widthTo.current?.(16);
			heightTo.current?.(16);
			radiusTo.current?.(50); // Back to circle
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
	}, [isDesktop]);

	if (!isDesktop) return null;

	return (
		<div
			ref={cursorRef}
			className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 bg-red-600 mix-blend-difference"
			style={{
				width: 16,
				height: 16,
				borderRadius: "50%",
				willChange: "transform, width, height, border-radius",
			}}
		/>
	);
};
