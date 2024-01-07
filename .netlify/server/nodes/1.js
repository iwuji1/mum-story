

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.3b436d09.js","_app/immutable/chunks/scheduler.9ab7ea7f.js","_app/immutable/chunks/index.94a3444e.js","_app/immutable/chunks/singletons.252cd96d.js"];
export const stylesheets = [];
export const fonts = [];
