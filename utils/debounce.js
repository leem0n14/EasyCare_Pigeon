export function debounce(fn, delay) {
	let timer = null;
	return function () {
		const _this = this;
		const args = arguments;
		if (timer) {
			clearTimeout(timer);
			console.log('清楚了定时器', timer);
		}
		timer = setTimeout(() => {
			fn.apply(_this, args);
		}, delay);
		console.log('创建了定时器', timer);
	};
}
