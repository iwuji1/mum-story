

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.981db43a.js","_app/immutable/chunks/scheduler.26d6cb72.js","_app/immutable/chunks/index.1639bad7.js"];
export const stylesheets = ["_app/immutable/assets/2.e5a7c72b.css"];
export const fonts = [];
