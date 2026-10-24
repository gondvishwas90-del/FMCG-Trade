/**
 * Animation constants and configurations for contact page components
 */

/**
 * Custom easing curve for smooth animations
 */
export const customEasing = [0.22, 1, 0.36, 1] as const;

/**
 * Content variants for accordion animations
 */
export const contentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.2, delay: 0.1 }
    }
};
