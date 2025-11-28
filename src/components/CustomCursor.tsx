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

	// Magnet element setters
	const magnetX = useRef<((value: number) => void) | null>(null);
	const magnetY = useRef<((value: number) => void) | null>(null);
	const magnetRect = useRef<DOMRect | null>(null);

	useGSAP(() => {
		if (!isDesktop || !cursorRef.current) {
			document.body.style.cursor = "auto";
			return;
		}

		document.body.style.cursor = "none";

		// 2. Initial Setup: Center the anchor point using GSAP instead of CSS
		// This ensures resizing doesn't throw off the center
		gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50 });

		// 3. Setup QuickTos (Only for Position)
		xTo.current = gsap.quickTo(cursorRef.current, "x", {
			duration: 0.1,
			ease: "power3.out",
		});
		yTo.current = gsap.quickTo(cursorRef.current, "y", {
			duration: 0.1,
			ease: "power3.out",
		});

		let last = 0;
		const frameInterval = 1000 / 120;

		const onPointerMove = (e: PointerEvent) => {
			const now = performance.now();
			if (now - last < frameInterval) return;
			last = now;

			const { clientX, clientY } = e;

			// NORMAL CURSOR
			if (!activeMagnet.current || !magnetRect.current) {
				xTo.current?.(clientX);
				yTo.current?.(clientY);
				return;
			}

			// MAGNETIC CURSOR
			const rect = magnetRect.current;
			const centerX = rect.left + rect.width / 2;
			const centerY = rect.top + rect.height / 2;

			const distx = clientX - centerX;
			const disty = clientY - centerY;

			const moveX = distx * 0.2;
			const moveY = disty * 0.2;

			magnetX.current?.(moveX);
			magnetY.current?.(moveY);

			xTo.current?.(centerX + moveX);
			yTo.current?.(centerY + moveY);

			if (magnetText.current) {
				gsap.to(magnetText.current, {
					x: moveX * 0.5,
					y: moveY * 0.5,
					duration: 0.1,
					overwrite: "auto",
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

			const computedStyle = window.getComputedStyle(target);
			const targetRadius = parseFloat(computedStyle.borderRadius);

			magnetX.current = gsap.quickSetter(target, "x", "px") as (
				value: number
			) => void;
			magnetY.current = gsap.quickSetter(target, "y", "px") as (
				value: number
			) => void;

			const r = magnetRect.current;

			// --- FIX IS HERE: Remove overwrite: true ---
			// We use standard .to() for shape, but we do NOT kill the x/y quickTo
			gsap.to(cursorRef.current, {
				width: r.width,
				height: r.height,
				borderRadius: targetRadius,
				duration: 0.4,
				ease: "power3.out",
			});
		};

		const onPointerOut = (e: PointerEvent) => {
			const target = (e.target as HTMLElement).closest(
				".magnetic"
			) as HTMLElement;
			if (!target || target !== activeMagnet.current) return;

			// Reset Target
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

			// --- FIX IS HERE: Remove overwrite: true ---
			gsap.to(cursorRef.current, {
				width: 16,
				height: 16,
				borderRadius: "50%",
				duration: 0.4,
				ease: "power3.out",
			});
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
			// Removed -translate-x-1/2 -translate-y-1/2 because we set xPercent/yPercent in GSAP
			className="fixed top-0 left-0 pointer-events-none z-[9999] bg-red-600 mix-blend-difference"
			style={{
				width: 16,
				height: 16,
				borderRadius: "50%",
				willChange: "transform, width, height, border-radius",
			}}
		/>
	);
};
