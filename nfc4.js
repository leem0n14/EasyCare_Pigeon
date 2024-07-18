const package_NdefRecord = 'android.nfc.NdefRecord';
const package_NdefMessage = 'android.nfc.NdefMessage';
const package_TECH_DISCOVERED = 'android.nfc.action.TECH_DISCOVERED';
const package_Intent = 'android.content.Intent';
const package_Activity = 'android.app.Activity';
const package_PendingIntent = 'android.app.PendingIntent';
const package_IntentFilter = 'android.content.IntentFilter';
const package_NfcAdapter = 'android.nfc.NfcAdapter';
const package_Ndef = 'android.nfc.tech.Ndef';
const package_NdefFormatable = 'android.nfc.tech.NdefFormatable';
const package_Parcelable = 'android.os.Parcelable';
const package_String = 'java.lang.String';

let NfcAdapter;
let NdefRecord;
let NdefMessage;
const techListsArray = [
	['android.nfc.tech.IsoDep'],
	['android.nfc.tech.NfcA'],
	['android.nfc.tech.NfcB'],
	['android.nfc.tech.NfcF'],
	['android.nfc.tech.Nfcf'],
	['android.nfc.tech.NfcV'],
	['android.nfc.tech.NdefFormatable'],
	['android.nfc.tech.MifareClassi'],
	['android.nfc.tech.MifareUltralight'],
];
let readyRead = true;
// let readyRead = false;

const nfc = {
	nfcGetId(obj) {
		const that = this;
		try {
			const main = plus.android.runtimeMainActivity();
			const Intent = plus.android.importClass('android.content.Intent');
			const Activity = plus.android.importClass('android.app.Activity');
			const PendingIntent = plus.android.importClass('android.app.PendingIntent');
			const IntentFilter = plus.android.importClass('android.content.IntentFilter');
			NfcAdapter = plus.android.importClass('android.nfc.NfcAdapter');
			const nfcAdapter = NfcAdapter.getDefaultAdapter(main);

			if (nfcAdapter == null) {
				uni.showToast({
					title: '设备不支持NFC！',
					icon: 'none',
				});
				return;
			}

			if (!nfcAdapter.isEnabled()) {
				uni.showToast({
					title: '请在系统设置中先启用NFC功能！',
					icon: 'none',
				});
				return;
			}
			readyRead = true;
			console.log('readyRead', readyRead);
			const intent = new Intent(main, main.getClass());
			intent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
			const pendingIntent = PendingIntent.getActivity(main, 0, intent, 0);
			const ndef = new IntentFilter('android.nfc.action.TECH_DISCOVERED');
			ndef.addDataType('*/*');
			const intentFiltersArray = [ndef];

			plus.globalEvent.addEventListener('newintent', () => {
				// console.log('newintent running');
				// 监听 NFC
				let timer;
				if (timer) { clearTimeout(timer); readyRead = false; }
				timer = setTimeout(function () {
					NdefRecord = plus.android.importClass('android.nfc.NdefRecord');
					NdefMessage = plus.android.importClass('android.nfc.NdefMessage');
					const main = plus.android.runtimeMainActivity();
					const intent = main.getIntent();
					const that = this;

					// console.log("action type:" + intent.getAction());

					// debugger
					if (package_TECH_DISCOVERED == intent.getAction()) {
						readyRead = true;
						if (readyRead) {
							// uni.showToast({
							// 	title: '请勿移开标签正在读取数据',
							// 	icon: 'none'
							// });
							const that = this;
							// NFC id
							const bytesId = intent.getByteArrayExtra(NfcAdapter.EXTRA_ID);
							// console.log('id=' + bytesId)
							const nfc_id = nfc.byteArrayToHexString(bytesId);
							// console.log('nfc_id:', nfc_id);
							// uni.showToast({
							//     title: nfc_id,
							// 	icon: 'success',
							//     duration: 2000
							// });
							// uni.showToast({
							//     title: '卡片读取成功',
							// 	icon: 'success',
							//     // duration: 2000
							// });
							obj.success(nfc_id);
							// readyRead = false;
						}
					}
				}, 500);
			});
			plus.globalEvent.addEventListener('pause', (e) => {
				// console.log('pause running');
				if (nfcAdapter) {
					// 关闭前台调度系统
					// 恢复默认状态
					nfcAdapter.disableForegroundDispatch(main);
				}
			});
			plus.globalEvent.addEventListener('resume', (e) => {
				// console.log('resume running');
				if (nfcAdapter) {
					// 开启前台调度系统
					nfcAdapter.enableForegroundDispatch(main, pendingIntent, intentFiltersArray, techListsArray);
				}
			});
			nfcAdapter.enableForegroundDispatch(main, pendingIntent, intentFiltersArray, techListsArray);

			// 监听事件，触发条件
			readyRead = true;
			// uni.showToast({
			// 	title: '请将NFC标签靠近！',
			// 	icon: 'none',
			// });
		} catch (e) {
			// console.error(e);
			obj.fail(e);
		} finally {
			if (obj.complete()) {
				obj.complete();
			}
		}
	},
	nfcclose() {
		if (nfcAdapter) {
			nfcAdapter.disableForegroundDispatch(this.data.main);
		}
		nfcAdapter = null;
		clearInterval(IntervalId);
	},
	byteArrayToHexString(inarray) {
		let i;
		let inn;
		let j;
		const hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
		let out = '';
		for (j = inarray.length - 1; j > -1; --j) {
			inn = inarray[j] & 0xff;
			i = (inn >>> 4) & 0x0f;
			out += hex[i];
			i = inn & 0x0f;
			out += hex[i];
		}
		return out;
	},
};


export default nfc;
