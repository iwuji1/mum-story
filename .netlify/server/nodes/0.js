

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.17470c32.js","_app/immutable/chunks/scheduler.9ab7ea7f.js","_app/immutable/chunks/index.94a3444e.js"];
export const stylesheets = [];
export const fonts = [];
