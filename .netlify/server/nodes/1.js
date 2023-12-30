

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.1d4dd600.js","_app/immutable/chunks/scheduler.26d6cb72.js","_app/immutable/chunks/index.1639bad7.js","_app/immutable/chunks/singletons.1a739292.js"];
export const stylesheets = [];
export const fonts = [];
