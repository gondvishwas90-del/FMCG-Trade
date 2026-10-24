/**
 * Animation constants and configurations for about page components
 */

/**
 * Custom easing curve for smooth animations
 */
export const customEasing = [0.22, 1, 0.36, 1] as const;

/**
 * Spring animation configuration
 */
export const springConfig = {
    type: 'spring' as const,
    stiffness: 170,
    damping: 26
};

/**
 * Philosophy cards animation configuration
 */
export const cardAnimationConfig = {
    offset: 10,
    scaleStep: 0.06,
    dimStep: 0.15,
    borderRadius: 16,
    swipeThreshold: 50
};
