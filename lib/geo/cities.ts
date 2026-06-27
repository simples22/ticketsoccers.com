export type GeoPoint = { lat: number; lon: number };
export type City = GeoPoint & { label: string; aliases?: string[] };

// Major US metros (MLS / NCAA / NFL). Extend freely.
export const CITIES: City[] = [
  { label: "Tampa, FL", lat: 27.9506, lon: -82.4572, aliases: ["tampa","brandon","st pete","st petersburg"] },
  { label: "Miami, FL", lat: 25.7617, lon: -80.1918, aliases: ["miami","fort lauderdale"] },
  { label: "Orlando, FL", lat: 28.5383, lon: -81.3792, aliases: ["orlando"] },
  { label: "Jacksonville, FL", lat: 30.3322, lon: -81.6557, aliases: ["jacksonville"] },
  { label: "Atlanta, GA", lat: 33.749, lon: -84.388, aliases: ["atlanta"] },
  { label: "Charlotte, NC", lat: 35.2271, lon: -80.8431, aliases: ["charlotte"] },
  { label: "Nashville, TN", lat: 36.1627, lon: -86.7816, aliases: ["nashville"] },
  { label: "New Orleans, LA", lat: 29.9511, lon: -90.0715, aliases: ["new orleans"] },
  { label: "Dallas, TX", lat: 32.7767, lon: -96.797, aliases: ["dallas","fort worth"] },
  { label: "Houston, TX", lat: 29.7604, lon: -95.3698, aliases: ["houston"] },
  { label: "Austin, TX", lat: 30.2672, lon: -97.7431, aliases: ["austin"] },
  { label: "New York, NY", lat: 40.7128, lon: -74.006, aliases: ["new york","nyc","brooklyn"] },
  { label: "Los Angeles, CA", lat: 34.0522, lon: -118.2437, aliases: ["los angeles","la"] },
  { label: "San Francisco, CA", lat: 37.7749, lon: -122.4194, aliases: ["san francisco","bay area"] },
  { label: "Chicago, IL", lat: 41.8781, lon: -87.6298, aliases: ["chicago"] },
  { label: "Seattle, WA", lat: 47.6062, lon: -122.3321, aliases: ["seattle"] },
  { label: "Boston, MA", lat: 42.3601, lon: -71.0589, aliases: ["boston"] },
  { label: "Philadelphia, PA", lat: 39.9526, lon: -75.1652, aliases: ["philadelphia","philly"] },
  { label: "Washington, DC", lat: 38.9072, lon: -77.0369, aliases: ["washington","dc"] },
  { label: "Denver, CO", lat: 39.7392, lon: -104.9903, aliases: ["denver"] },
  { label: "Phoenix, AZ", lat: 33.4484, lon: -112.074, aliases: ["phoenix"] },
  { label: "Kansas City, MO", lat: 39.0997, lon: -94.5786, aliases: ["kansas city"] },
  { label: "Columbus, OH", lat: 39.9612, lon: -82.9988, aliases: ["columbus"] },
];

export function findCity(input: string): City | null {
  const q = input.trim().toLowerCase();
  if (!q) return null;
  for (const c of CITIES) {
    if (c.label.toLowerCase().includes(q)) return c;
    if (c.aliases?.some((a) => a.includes(q) || q.includes(a))) return c;
  }
  return null;
}