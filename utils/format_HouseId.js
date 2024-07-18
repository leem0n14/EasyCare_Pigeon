export function format(houseId, siteId) {
	let rowNum;
	switch (siteId) {
		case 1:
			rowNum = 138;
			break;
		case 2:
			rowNum = 141;
			break;
		case 3:
			rowNum = 141;
			break;
	}
	if (siteId === 2) {
		houseId -= 138 * 4;
	} else if (siteId === 3) {
		houseId = houseId - 141 * 4 - 138 * 4;
	}
	if (houseId > rowNum) {
		const hid_sec =
			houseId % rowNum === 0 ? (houseId % rowNum) + rowNum : houseId % rowNum;
		const hid_fir =
			parseInt(houseId % rowNum) === 0
			? parseInt(houseId / rowNum)
			: parseInt(houseId / rowNum) + 1;
		return `${siteId}-${hid_fir}-${hid_sec}`;
	} else {
		return `${siteId}-1-${houseId}`;
	}
}
