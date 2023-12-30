

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.0e997cb6.js","_app/immutable/chunks/scheduler.26d6cb72.js","_app/immutable/chunks/index.1639bad7.js"];
export const stylesheets = [];
export const fonts = [];
