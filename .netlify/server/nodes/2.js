

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.19fc823d.js","_app/immutable/chunks/scheduler.9ab7ea7f.js","_app/immutable/chunks/index.94a3444e.js"];
export const stylesheets = ["_app/immutable/assets/2.c3ebdaa5.css"];
export const fonts = [];
