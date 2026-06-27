// 4 carousels. categoryIds = TEvo category_id(s). REPLACE the 0s with your real IDs
// from GET /v9/categories. The first carousel combines Soccer + MLS (two ids).
export type SportCarousel = { key: string; title: string; categoryIds: number[] };

export const sportsCarousels: SportCarousel[] = [
  { key: "soccer-mls", title: "Soccer & MLS",  categoryIds: [/* Soccer */ 0, /* MLS */ 0] },
  { key: "ncaa-fb",    title: "NCAA Football", categoryIds: [/* NCAA Football */ 0] },
  { key: "ncaa-bb",    title: "NCAA Baseball", categoryIds: [/* NCAA Baseball */ 0] },
  { key: "nfl",        title: "NFL",           categoryIds: [/* NFL */ 0] },
];