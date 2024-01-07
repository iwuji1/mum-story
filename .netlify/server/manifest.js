export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.099c4e8f.js","app":"_app/immutable/entry/app.8959fd1f.js","imports":["_app/immutable/entry/start.099c4e8f.js","_app/immutable/chunks/scheduler.9ab7ea7f.js","_app/immutable/chunks/singletons.252cd96d.js","_app/immutable/entry/app.8959fd1f.js","_app/immutable/chunks/scheduler.9ab7ea7f.js","_app/immutable/chunks/index.94a3444e.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
