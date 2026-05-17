/**
 * Custom GSAP Hook with Automatic Cleanup
 * 
 * This hook wraps @gsap/react's useGSAP to provide automatic cleanup
 * when components unmount, preventing memory leaks and animation glitches
 * during navigation.
 */

import { useGSAP as useGSAPReact } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, type MutableRefObject } from 'react';

// Register plugins globally
gsap.registerPlugin(ScrollTrigger);

/**
 * Enhanced useGSAP hook with automatic cleanup
 * 
 * @example
 * ```tsx
 * const { contextSafe } = useGSAP(() => {
 *   gsap.to('.box', { x: 100 });
 * }, { scope: containerRef });
 * ```
 */
export function useGSAP(
  callback: () => void | (() => void),
  dependencies?: any[]
) {
  return useGSAPReact(callback, { dependencies });
}

/**
 * Hook for scoped GSAP animations
 * Limits animations to a specific container
 * 
 * @example
 * ```tsx
 * const containerRef = useRef<HTMLDivElement>(null);
 * 
 * useGSAPScoped(containerRef, () => {
 *   gsap.to('.card', { y: 100 }); // Only affects .card inside container
 * });
 * ```
 */
export function useGSAPScoped<T extends HTMLElement>(
  scope: MutableRefObject<T | null>,
  callback: () => void | (() => void),
  dependencies?: any[]
) {
  return useGSAPReact(callback, { scope, dependencies });
}

/**
 * Hook for creating context-safe event handlers
 * Ensures animations triggered by events are properly cleaned up
 * 
 * @example
 * ```tsx
 * const onClickSafe = useGSAPContextSafe(() => {
 *   gsap.to('.box', { rotation: 360 });
 * });
 * 
 * <button onClick={onClickSafe}>Animate</button>
 * ```
 */
export function useGSAPContextSafe() {
  const { contextSafe } = useGSAPReact(() => {});
  return contextSafe;
}

/**
 * Hook for animations that need manual control
 * Returns refs and a context-safe function creator
 * 
 * @example
 * ```tsx
 * const { containerRef, contextSafe } = useGSAPWithRefs<HTMLDivElement>();
 * 
 * const animate = contextSafe(() => {
 *   gsap.to(containerRef.current, { x: 100 });
 * });
 * ```
 */
export function useGSAPWithRefs<T extends HTMLElement>() {
  const containerRef = useRef<T>(null);
  const { contextSafe } = useGSAPReact(() => {}, { scope: containerRef });

  return {
    containerRef,
    contextSafe,
  };
}

export default useGSAP;
