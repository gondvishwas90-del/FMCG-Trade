/**
 * Type definitions for global regions and map connections
 */
export interface GlobalRegion {
    name: string;
    color: string;
    description: string;
}

export interface MapDot {
    start: { lat: number; lng: number };
    end: { lat: number; lng: number };
}
