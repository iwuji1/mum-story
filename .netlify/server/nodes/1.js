

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.e4ac1f88.js","_app/immutable/chunks/scheduler.1f6706a1.js","_app/immutable/chunks/index.a70b2643.js","_app/immutable/chunks/singletons.e6707028.js"];
export const stylesheets = [];
export const fonts = [];
