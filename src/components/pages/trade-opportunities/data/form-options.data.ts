import type { FormOption } from '../types/form-data.types';

/**
 * Form dropdown options for trade requirement section
 */

export const categoryOptions: FormOption[] = [
    { value: "Spirits", label: "Spirits" },
    { value: "Wine", label: "Wine" },
    { value: "Beer", label: "Beer" },
    { value: "FMCG", label: "FMCG" },
    { value: "Mixed", label: "Mixed Portfolio" }
];

export const volumeOptions: FormOption[] = [
    { value: "Low", label: "Low (Test Market)" },
    { value: "Medium", label: "Medium (Container Load)" },
    { value: "High", label: "High (Multi-Container)" }
];

export const timelineOptions: FormOption[] = [
    { value: "Immediate", label: "Immediate" },
    { value: "1–3 months", label: "1–3 months" },
    { value: "Flexible", label: "Flexible" }
];
