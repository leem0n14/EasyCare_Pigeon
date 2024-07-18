import request from '@/utils/request';
// import { client } from '@/utils/tools';

// 登录接口
export const reqLogin = (data) => {
	return request.get('/app/user/login', { params: data });
};
// 发送鸽舍号
export const reqSendHid = (data) => {
	return request.post('/app/house/houseId', data);
};

// 产蛋
export const reqLayeggs = (data) => {
	return request.post('/app/egg/save', data);
};

// 双击留窝
export const reqLiuwo = (data) => {
	return request.post('/app/stay/save', data);
};

// 查蛋时间
export const reqGetDate = (data) => {
	return request.get('/app/egg/current', { params: data });
};

// 抽蛋
export const reqWhipEggs = (data) => {
	return request.post('/app/whipping/save', data);
};

// 放仔
export const reqPutEggs = (data) => {
	return request.post('/app/put/save', data);
};
// 调仔
export const reqFeedBirds = (data) => {
	return request.put('/app/cub/save', data);
};

// 调仔的查看鸽笼信息
export const reqCubInfo = () => {
	return request.get('/app/cub/info');
};

// 弃孵
export const reqAbandon = (data) => {
	return request.post('/app/abandon/save', data);
};

// 死亡
export const reqDeath = (data) => {
	return request.post('/app/death/save', data);
};

// 获取破蛋异常信息
export const reqGetPdWarn = (data) => {
	return request.post('/app/cage/badEggTimes', { data });
};

// 获取产蛋异常信息
export const reqGetCdWarn = (data) => {
	return request.post('/app/cage/oneEggTimes', { data });
};

// 连续弃孵两次提示异常
export const reqQifuWarn = (data) => {
	return request.post('/app/cage/abandonTimes', data);
};

// 获取多个鸽笼状态
export const reqGetStatu = (data) => {
	return request.get('/app/cage/statu', { params: data });
};


// 异常状态保存
export const reqAbnormal = (data) => {
	return request.post('/app/abnormal/save', data);
};

// 获取异常状态
export const reqGetExp = (data) => {
	return request.get('/app/abnormal/info', { params: data });
};

// 异常处理
export const reqExpection = (data) => {
	return request.put('/app/abnormal/statu', data);
};

// 获取调仔的默认值
export const reqGetWhipping = (data) => {
	return request.get('/app/cage/number', { params: data || {} });
};

// 抽蛋提示
export const reqWhipTips = (data) => {
	return request.get('/app/egg/houseIdAndCageId', { params: data });
};

// 放仔提示
export const reqPutTips = (data) => {
	return request.get('/app/stay/nextHouseId', { params: data });
};

// 获取houseId
export const reqGetHouseId = (houseId) => {
	return request.get('/app/house/getHouseId', { params: houseId });
};

// 删除预抽蛋错误信息
export const reqDelInfo = (data) => {
	return request.post('/app/egg/delEgg', data);
};

// 删除留窝错误信息
export const reqDelStay = (data) => {
	return request.post('/app/stay/delstay', data);
};

// 抽蛋留窝数据比例
export const reqEggAndWhipPR = (data) => {
	return request.get('/app/eggAndWhipping/eggAndWhippingSum', { params: data });
};

// 每个鸽笼对应带仔数
export const reqStayNum = (data) => {
	return request.get('/app/cage/number', { params: data });
};

// 传输预警数据
// export const reqPostWarnList = (data) => {
// 	return request.get('/app/warnEgg/save', { params: data });
// };

export const reqPostWarnList = (data) => {
	return request.post('/app/warnEgg/save', data );
};

// app端口获取产蛋预警列表
export const reqWarnList = (data) => {
	return request.get('/app/warnEgg/list', { params: data });
};

//pc端口获取产蛋预警列表
export const reqPCWarnList = (data) => {
	return request.get('/app/warnEgg/save', { params: data });
};

// 删除预警
export const reqDelWarn = (data) => {
	return request.get('/app/warnEgg/delete', { params: data });
};

// 获取当天产蛋数据
export const reqGetLay = (data) => {
	return request.get('/app/egg/eggCount', { params: data });
};

// 获取当天放仔数据
export const reqGetStay = (data) => {
	return request.get('/app/put/putCount', { params: data });
};

// 获取当天抽蛋留窝数
export const reqWhipStay = (data) => {
	return request.get('/app/eggAndWhipping/eggAndWhippingSum', { params: data });
};

// 获取当天异常列表
export const reqAbnormalList = (data) => {
	return request.get('/app/abnormal/typeProportion', { params: data });
};

// 获取特定鸽笼详情
export const reqHistoryList = (data) => {
	return request.get('/app/egg/historyList', { params: data });
};

// export const reqHistoryList = (data) => {
// 	return request.get('/app/cage/nfcSelect', { params: data });
// };

// 删除某条历史操作
export const reqDelHis = (data) => {
	return request.post('/app/egg/deleteHistory', data);
};

// 编辑某条历史数据
export const reqEditHis = (data) => {
	return request.put('/app/egg/updateHistory', data);
};

// 删除单个鸽笼的历史数据
export const reqDelCageHis = (data) => {
	return request.post('/app/egg/delete', data);
};

// 获取放仔名单
export const reqGetPUTlist = (data) => {
	return request.get('/app/put/list', {params: data});
}

// 淘汰异常记录
export const reqRecordOut = (data) => {
	return request.post('/app/out/save',data);
}

// 获取状态和异常
export const reqGetStatuAbnormal = (data) => {
	return request.get('/app/cage/statuAndAbnormal', {params: data } );
};

// 获取各鸽舍里所有鸽笼的数据
export const reqCageDetail = (data) => {
	return request.get('/app/cage/cageDetail',{params:data})  //传入siteid和houseid
}