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
		client: {"start":"_app/immutable/entry/start.39c21e64.js","app":"_app/immutable/entry/app.6cd6a9ac.js","imports":["_app/immutable/entry/start.39c21e64.js","_app/immutable/chunks/scheduler.26d6cb72.js","_app/immutable/chunks/singletons.1a739292.js","_app/immutable/entry/app.6cd6a9ac.js","_app/immutable/chunks/scheduler.26d6cb72.js","_app/immutable/chunks/index.1639bad7.js"],"stylesheets":[],"fonts":[]},
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
