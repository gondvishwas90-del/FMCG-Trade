import type { GlobalRegion, MapDot } from '../types/global-region.types';

/**
 * Global regions data
 */
export const globalRegions: GlobalRegion[] = [
    {
        name: "Europe (EU & UK)",
        color: "#10b981",
        description: "Strategic partnerships across major European hubs."
    },
    {
        name: "Middle East & GCC",
        color: "#3b82f6",
        description: "Key distribution channels in Dubai, Saudi Arabia, and Qatar."
    },
    {
        name: "Asia-Pacific",
        color: "#8b5cf6",
        description: "Growing networks in Singapore and Hong Kong markets."
    },
    {
        name: "Emerging Markets",
        color: "#f59e0b",
        description: "Select opportunities in Africa and Latin America."
    }
];

/**
 * World map connection dots data
 */
export const mapConnections: MapDot[] = [
    {
        start: { lat: 51.5074, lng: -0.1278 }, // London
        end: { lat: 25.2048, lng: 55.2708 }, // Dubai
    },
    {
        start: { lat: 25.2048, lng: 55.2708 }, // Dubai
        end: { lat: 1.3521, lng: 103.8198 }, // Singapore
    },
    {
        start: { lat: 51.5074, lng: -0.1278 }, // London
        end: { lat: 40.7128, lng: -74.0060 }, // New York
    },
    {
        start: { lat: 1.3521, lng: 103.8198 }, // Singapore
        end: { lat: -33.8688, lng: 151.2093 }, // Sydney
    },
    {
        start: { lat: 25.2048, lng: 55.2708 }, // Dubai
        end: { lat: -26.2041, lng: 28.0473 }, // Johannesburg
    },
];
