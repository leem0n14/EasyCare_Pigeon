const Cookie = {
	set(Tokenkey, value) {
		uni.setStorageSync(Tokenkey, value);
	},
	get(Tokenkey) {
		if (uni.getStorageSync(Tokenkey)!==false) { return uni.getStorageSync(Tokenkey); } else { return false; }
	},
	remove(Tokenkey) {
		uni.removeStorageSync(Tokenkey);
	},
};
export default Cookie;
 