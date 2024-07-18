export function statuAbnormal(abnormalStr){
	if(abnormalStr === 'single') return '单蛋';
	else if(abnormalStr === 'spermatozonia') return '光蛋';
	else if(abnormalStr === 'breakage') return '破损';
	else if(abnormalStr === 'abandon') return '弃仔';
	else if(abnormalStr === 'discard') return '弃孵';
	else if(abnormalStr.substring(0,abnormalStr.length - 1) === 'death_old') return ` 种鸽死亡${abnormalStr.substring(abnormalStr.length-1,abnormalStr.length)}`;
	else if(abnormalStr.substring(0,abnormalStr.length - 1) === 'death_young') return ` 雏鸽死亡${abnormalStr.substring(abnormalStr.length-1,abnormalStr.length)}`;
}