const db = require("../models")
const moment = require("moment-timezone")
const Egg = db.egg
const Cage = db.cage
const Put = db.put
const Whipping = db.whipping
const Count = db.count
const Cub = db.cub
const Death = db.death
const Abnormal = db.abnormal
const Stay = db.stay
const Sum = db.sum
const User = db.user
const Op = db.Sequelize.Op
const sequelize = db.Sequelize



/**
 * @swagger
 * /bi/egg/eggTrend:
 *   get:
 *     tags:
 *       - BI操作趋势
 *     summary: 获取产蛋操作的趋势
 *     description: 根据site_id获取egg表的数据记录
 *     parameters:
 *       - name: site_id
 *         in: query
 *         description: 鸽仓ID
 *         required: true
 *         schema:
 *           type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: 成功返回产蛋列表
 *         schema:
 *           type: object
 *           properties:
 *             eggs:
 *               type: array
 *       500:
 *         description: 获取数据失败
 */
exports.getEggTrend = async (req, res) => {
    try {
        const { site_id } = req.query;

        const eggs = await Egg.findAll({
            attributes: [
                'site_id',
                [sequelize.fn('date', sequelize.col('egg_time')), 'date'],
                [sequelize.fn('count', '*'), 'count']
            ],
            where: {
                site_id
            },
            group: ['site_id', 'date'],
            order: [
                [sequelize.literal('date ASC')]
            ]
        });

        let sum = 0;
        // 格式化数据，包括site_id和每天的数据条数
        const eggsTrend = eggs.map(egg => ({
            site_id: egg.site_id,
            date: egg.get('date'),
            count: egg.get('count'),
            sum: sum = (sum + egg.get('count'))
        })).slice(-7);


        //修改排序规则
        //eggsTrend.sort((a, b) => new Date(b.date) - new Date(a.date));


        res.status(200).json({
            eggsTrend
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: '获取产蛋表列表失败'
        })
    }
};



/**
 * @swagger
 * /bi/stay/stayTrend:
 *   get:
 *     tags:
 *       - BI操作趋势
 *     summary: 获取留窝操作的趋势
 *     description: 根据site_id获取stay表的数据记录
 *     parameters:
 *       - name: site_id
 *         in: query
 *         description: 鸽仓ID
 *         required: true
 *         schema:
 *           type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: 成功返回留窝列表
 *         schema:
 *           type: object
 *           properties:
 *             stays:
 *               type: array
 *       500:
 *         description: 获取数据失败
 */

exports.getStayTrend = async (req, res) => {
    try {
        const { site_id } = req.query;

        const stays = await Stay.findAll({
            attributes: [
                'site_id',
                [sequelize.fn('date', sequelize.col('stay_time')), 'date'],
                [sequelize.fn('count', '*'), 'count']
            ],
            where: {
                site_id
            },
            group: ['site_id', 'date'],
            order: [
                [sequelize.literal('date ASC')]
            ]
        });

        let sum = 0;
        // 格式化数据，包括site_id和每天的数据条数
        const staysTrend = stays.map(stay => ({
            site_id: stay.site_id,
            date: stay.get('date'),
            count: stay.get('count'),
            sum: sum = (sum + stay.get('count'))
        })).slice(-7);

        //修改排序规则
        // staysTrend.sort((a, b) => new Date(b.date) - new Date(a.date));

        res.status(200).json({
            staysTrend
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: '获取调仔表列表失败'
        })
    }
};



// /**
//  * @swagger
//  * /bi/cub/cubTrend:
//  *   get:
//  *     tags:
//  *       - BI操作趋势
//  *     summary: 获取调仔操作的趋势
//  *     description: 根据site_id获取cub表的数据记录
//  *     parameters:
//  *       - name: site_id
//  *         in: query
//  *         description: 鸽仓ID
//  *         required: true
//  *         schema:
//  *           type: string
//  *     produces:
//  *       - application/json
//  *     responses:
//  *       200:
//  *         description: 成功返回调仔列表
//  *         schema:
//  *           type: object
//  *           properties:
//  *             cubs:
//  *               type: array
//  *               items:
//  *                 $ref: '#/definition/Cub'
//  *       500:
//  *         description: 获取数据失败
//  */
// exports.getCubTrend = async (req, res) => {
//     try {
//         const { site_id } = req.query;

//         const cubs = await Cub.findAll({
//             attributes: [
//                 'site_id',
//                 [sequelize.fn('date', sequelize.col('cub_time')), 'date'],
//                 [sequelize.fn('count', '*'), 'count']
//             ],
//             where: {
//                 site_id
//             },
//             group: ['site_id', 'date'],
//             order: [
//                 [sequelize.literal('date ASC')]
//             ]
//         });

//         let sum = 0;
//         // 格式化数据，包括site_id和每天的数据条数
//         const cubsTrend = cubs.map(cub => ({
//             site_id: cub.site_id,
//             date: cub.get('date'),
//             count: cub.get('count'),
//             sum: sum = (sum + cub.get('count'))
//         })).slice(-10);

//         //修改排序规则
//         // cubsTrend.sort((a, b) => new Date(b.date) - new Date(a.date));


//         res.status(200).json({
//             cubsTrend
//         });

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             error: '获取调仔表列表失败'
//         })
//     }
// };




/**
 * @swagger
 * /bi/put/putTrend:
 *   get:
 *     tags:
 *       - BI操作趋势
 *     summary: 获取放仔操作的趋势
 *     description: 根据site_id获取put表的数据记录
 *     parameters:
 *       - name: site_id
 *         in: query
 *         description: 鸽仓ID
 *         required: true
 *         schema:
 *           type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: 成功返回放仔列表
 *         schema:
 *           type: object
 *           properties:
 *             puts:
 *               type: array
 *       500:
 *         description: 获取数据失败
 */
exports.getPutTrend = async (req, res) => {
    try {
        const { site_id } = req.query;

        const puts = await Put.findAll({
            attributes: [
                'site_id',
                [sequelize.fn('date', sequelize.col('put_time')), 'date'],
                [sequelize.fn('count', '*'), 'count']
            ],
            where: {
                site_id
            },
            group: ['site_id', 'date'],
            order: [
                [sequelize.literal('date ASC')]
            ]
        });

        let sum = 0;
        // 格式化数据，包括site_id和每天的数据条数
        const putsTrend = puts.map(put => ({
            site_id: put.site_id,
            date: put.get('date'),
            count: put.get('count'),
            sum: sum = (sum + put.get('count'))
        })).slice(-7);

        //修改排序规则
        // putsTrend.sort((a, b) => new Date(b.date) - new Date(a.date));


        res.status(200).json({
            putsTrend
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: '获取放仔表列表失败'
        })
    }
};


/**
 * @swagger
 * /bi/whipping/whippingTrend:
 *   get:
 *     tags:
 *       - BI操作趋势
 *     summary: 获取抽蛋操作的趋势
 *     description: 根据site_id获取whipping表的数据记录
 *     parameters:
 *       - name: site_id
 *         in: query
 *         description: 鸽仓ID
 *         required: true
 *         schema:
 *           type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: 成功返回抽蛋列表
 *         schema:
 *           type: object
 *           properties:
 *             whippings:
 *               type: array
 *       500:
 *         description: 获取数据失败
 */
exports.getWhippingTrend = async (req, res) => {
    try {
        const { site_id } = req.query;

        const whippings = await Whipping.findAll({
            attributes: [
                'site_id',
                [sequelize.fn('date', sequelize.col('whipping_time')), 'date'],
                [sequelize.fn('count', '*'), 'count']
            ],
            where: {
                site_id
            },
            group: ['site_id', 'date'],
            order: [
                [sequelize.literal('date ASC')]
            ]
        });

        let sum = 0;
        // 格式化数据，包括site_id和每天的数据条数
        const whippingsTrend = whippings.map(egg => ({
            site_id: egg.site_id,
            date: egg.get('date'),
            count: egg.get('count'),
            sum: sum = (sum + egg.get('count'))
        })).slice(-7);

        //修改排序规则
        // whippingsTrend.sort((a, b) => new Date(b.date) - new Date(a.date));


        res.status(200).json({
            whippingsTrend
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: '获取抽蛋表列表失败'
        })
    }
};


/**
 * @swagger
 * /bi/today/count:
 *   get:
 *     tags:
 *       - BI今日数量接口
 *     summary: 获取今日产蛋,抽蛋,留窝,放仔的鸽笼数量
 *     description: 从数据库相应的表获取今日产蛋,抽蛋,留窝,放仔的鸽笼数量
 *     parameters:
 *       - name: site_id
 *         in: query
 *         description: 鸽仓ID
 *         required: true
 *         schema:
 *           type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: 成功返回今日产蛋,抽蛋,留窝,放仔的鸽笼数量
 *         schema:
 *           type: object
 *           properties:
 *             TodayEggCount:
 *               type: integer
 *               description: 今日产蛋的鸽笼数量
 *             TodayWhippingCount:
 *               type: integer
 *               description: 今日抽蛋的鸽笼数量
 *             TodayStayCount:
 *               type: integer
 *               description: 今日留窝的鸽笼数量
 *             TodayPutCount:
 *               type: integer
 *               description: 今日放仔的鸽笼数量
 *       500:
 *         description: 获取失败
 */
exports.getTodayCount = async (req, res) => {
    try {
        const { site_id } = req.query;
        const today = new Date();
        today.setHours(8, 0, 0, 0); // 设置时间为当天的零点,因为是UTF-8所以要设置成8.00才会变成0点

        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1); // 设置时间为第二天的零点
        const TodayEggCount = await Egg.count({
            where: {
                egg_time: {
                    [Op.between]: [today, tomorrow],
                },
                site_id
            },
        })
        const TodayWhippingCount = await Whipping.count({
            where: {
                whipping_time: {
                    [Op.between]: [today, tomorrow],
                },
                site_id
            },
        })
        const TodayStayCount = await Stay.count({
            where: {
                stay_time: {
                    [Op.between]: [today, tomorrow],
                },
                site_id
            },
        })
        const TodayPutCount = await Put.count({
            where: {
                put_time: {
                    [Op.between]: [today, tomorrow],
                },
                site_id
            },
        })
        const TodayCubCount = await Cub.count({
            where: {
                cub_time: {
                    [Op.between]: [today, tomorrow],
                },
                site_id
            },
        })
        res.status(200).json({
            TodayEggCount: TodayEggCount,
            TodayWhippingCount: TodayWhippingCount,
            TodayStayCount: TodayStayCount,
            TodayPutCount: TodayPutCount,
            TodayCubCount: TodayCubCount
        });
    } catch (error) {
        res.status(500).json({
            error: '获取数据数量失败'
        });
    }
};


/**
 * @swagger
 * /bi/time/data:
 *   get:
 *     tags:
 *       - 实时接口
 *     summary: 获取实时关键数值
 *     description: 从数据库相应的表获取实时的抽蛋，留窝，放仔，调仔操作；
 *     parameters:
 *       - name: site_id
 *         in: query
 *         description: 鸽仓ID
 *         required: true
 *         schema:
 *           type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: 成功返回实时的抽蛋，留窝，放仔，调仔操作
 *         schema:
 *           type: object
 *       500:
 *         description: 获取失败
 */
exports.getTimeData = async (req, res) => {
    try {
        const now = moment.tz('Asia/Shanghai').toDate();
        now.setHours(now.getHours() + 8);
        now.setMinutes(now.getMinutes() - 1);

        let latestData = {}
        const { site_id } = req.query;
        const latestEggs = await Egg.findOne({
            where: {
                site_id,
                egg_time: {
                    [Op.gte]: now
                }
            },
            order: [['egg_time', 'ASC']]
        });
        const latestPuts = await Put.findOne({
            where: {
                site_id,
                put_time: {
                    [Op.gte]: now
                }
            },
            order: [['put_time', 'ASC']]
        });
        const latestCubs = await Cub.findOne({
            where: {
                site_id,
                cub_time: {
                    [Op.gte]: now
                }
            },
            order: [['cub_time', 'ASC']]
        });

        if (latestEggs != null) {
            if (latestEggs.statu === 1) {
                latestData.latestEggs = {
                    site_id: latestEggs.site_id,
                    house_id: latestEggs.house_id,
                    cage_id: latestEggs.cage_id,
                    status: "抽蛋",
                    number: 0,
                    time: latestEggs.egg_time
                };
            }
            if (latestEggs.statu === 2) {
                latestData.latestEggs = {
                    site_id: latestEggs.site_id,
                    house_id: latestEggs.house_id,
                    cage_id: latestEggs.cage_id,
                    status: "留窝",
                    number: 0,
                    time: latestEggs.egg_time
                };
            }
        }

        if (latestPuts != null) {
            latestData.latestPuts = {
                site_id: latestPuts.site_id,
                house_id: latestPuts.house_id,
                cage_id: latestPuts.cage_id,
                status: "放仔",
                number: latestPuts.put_number,
                time: latestPuts.put_time
            };
        }

        if (latestCubs != null) {
            latestData.latestCubs = {
                site_id: latestCubs.site_id,
                house_id: latestCubs.house_id,
                cage_id: latestCubs.cage_id,
                status: "调仔",
                number: latestCubs.cub_number,
                time: latestCubs.cub_time
            };
        }

        var flag = 1;
        if (Object.keys(latestData).length === 0) {
            flag = 0;
        }

        res.status(200).json({
            latestData: latestData,
            flag: flag
        })

    } catch (error) {
        res.status(500).json({
            error: "获取实时数据失败"
        })
    }
};

/**
 * @swagger
 * /bi/time/whippingTrend:
 *   get:
 *     tags:
 *       - BI实时趋势
 *     summary: 获取抽蛋操作的实时趋势
 *     description: 根据site_id获取egg表的数据记录
 *     parameters:
 *       - name: site_id
 *         in: query
 *         description: 鸽仓ID
 *         required: true
 *         schema:
 *           type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: 成功返回抽蛋列表
 *         schema:
 *           type: object
 *           properties:
 *             whippingTrend:
 *               type: array
 *       500:
 *         description: 获取数据失败
 */
exports.getTimeWhippingTrend = async (req, res) => {
    try {
        const halfHourAgo = moment.tz('Asia/Shanghai').toDate();
        halfHourAgo.setHours(halfHourAgo.getHours() + 8);
        halfHourAgo.setMinutes(halfHourAgo.getMinutes() - 30);

        const now = moment.tz('Asia/Shanghai').toDate();
        now.setHours(now.getHours() + 8);

        const { site_id } = req.query;

        const eggs = await Egg.findAll({
            attributes: [
                'site_id',
                [sequelize.fn('date_format', sequelize.col('egg_time'), '%Y-%m-%d %H:%i'), 'date'],
                [sequelize.fn('count', '*'), 'count']
            ],
            where: {
                site_id,
                egg_time: {
                    [Op.gte]: halfHourAgo // 获取半小时前及之后的数据
                },
                statu: 1
            },
            group: ['site_id', 'date'],
            order: [
                [sequelize.literal('date ASC')]
            ]
        });

        let sum = 0;

        // 格式化数据，包括site_id、日期、分钟和每分钟的数据条数
        const whippingTrend = eggs.map(egg => {
            const currentDate = egg.get('date');
            const count = egg.get('count');

            sum = count + sum;
            return {
                site_id: egg.site_id,
                date: currentDate,
                count: sum,
            };
        });

        res.status(200).json({
            whippingTrend: whippingTrend
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: '获取实时抽蛋列表失败'
        })
    }
};


/**
 * @swagger
 * /bi/time/stayTrend:
 *   get:
 *     tags:
 *       - BI实时趋势
 *     summary: 获取留窝操作的实时趋势
 *     description: 根据site_id获取egg表的数据记录
 *     parameters:
 *       - name: site_id
 *         in: query
 *         description: 鸽仓ID
 *         required: true
 *         schema:
 *           type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: 成功返回留窝列表
 *         schema:
 *           type: object
 *           properties:
 *             staysTrend:
 *               type: array
 *       500:
 *         description: 获取数据失败
 */
exports.getTimeStayTrend = async (req, res) => {
    try {
        const halfHourAgo = moment.tz('Asia/Shanghai').toDate();
        halfHourAgo.setHours(halfHourAgo.getHours() + 8);
        halfHourAgo.setMinutes(halfHourAgo.getMinutes() - 30);

        const now = moment.tz('Asia/Shanghai').toDate();
        now.setHours(now.getHours() + 8);

        const { site_id } = req.query;

        const stays = await Egg.findAll({
            attributes: [
                'site_id',
                [sequelize.fn('date_format', sequelize.col('egg_time'), '%Y-%m-%d %H:%i'), 'date'],
                [sequelize.fn('count', '*'), 'count']
            ],
            where: {
                site_id,
                egg_time: {
                    [Op.gte]: halfHourAgo // 获取半小时前及之后的数据
                },
                statu: 2
            },
            group: ['site_id', 'date'],
            order: [
                [sequelize.literal('date ASC')]
            ]
        });

        let sum = 0;

        // 格式化数据，包括site_id、日期、分钟和每分钟的数据条数
        const staysTrend = stays.map(egg => {
            const currentDate = egg.get('date');
            const count = egg.get('count');
            sum = count + sum;

            return {
                site_id: egg.site_id,
                date: currentDate,
                count: sum
            };
        });

        res.status(200).json({
            staysTrend: staysTrend
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: '获取实时留窝列表失败'
        })
    }
};

/**
 * @swagger
 * /bi/time/putTrend:
 *   get:
 *     tags:
 *       - BI实时趋势
 *     summary: 获取放仔操作的实时趋势
 *     description: 根据site_id获取egg表的数据记录
 *     parameters:
 *       - name: site_id
 *         in: query
 *         description: 鸽仓ID
 *         required: true
 *         schema:
 *           type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: 成功返回放仔列表
 *         schema:
 *           type: object
 *           properties:
 *             putsTrend:
 *               type: array
 *       500:
 *         description: 获取数据失败
 */
exports.getTimePutTrend = async (req, res) => {
    try {
        const halfHourAgo = moment.tz('Asia/Shanghai').toDate();
        halfHourAgo.setHours(halfHourAgo.getHours() + 8);
        halfHourAgo.setMinutes(halfHourAgo.getMinutes() - 30);

        const now = moment.tz('Asia/Shanghai').toDate();
        now.setHours(now.getHours() + 8);

        const { site_id } = req.query;

        const puts = await Put.findAll({
            attributes: [
                'site_id',
                [sequelize.fn('date_format', sequelize.col('put_time'), '%Y-%m-%d %H:%i'), 'date'],
                [sequelize.fn('count', '*'), 'count']
            ],
            where: {
                site_id,
                put_time: {
                    [Op.gte]: halfHourAgo // 获取半小时前及之后的数据
                }
            },
            group: ['site_id', 'date'],
            order: [
                [sequelize.literal('date ASC')],
            ]
        });

        let sum = 0
        // 格式化数据，包括site_id、日期、分钟和每分钟的数据条数
        const putsTrend = puts.map(put => {
            const currentDate = put.get('date');
            const count = put.get('count');

            sum = sum + count;
            return {
                site_id: put.site_id,
                date: currentDate,
                count: sum
            };
        });

        res.status(200).json({
            putsTrend: putsTrend
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: '获取实时放仔列表失败'
        })
    }
};

/**
 * @swagger
 * /bi/time/cubTrend:
 *   get:
 *     tags:
 *       - BI实时趋势
 *     summary: 获取调仔操作的实时趋势
 *     description: 根据site_id获取cub表的数据记录
 *     parameters:
 *       - name: site_id
 *         in: query
 *         description: 鸽仓ID
 *         required: true
 *         schema:
 *           type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: 成功返回放仔列表
 *         schema:
 *           type: object
 *           properties:
 *             cubsTrend:
 *               type: array
 *       500:
 *         description: 获取数据失败
 */
exports.getTimeCubTrend = async (req, res) => {
    try {
        const halfHourAgo = moment.tz('Asia/Shanghai').toDate();
        halfHourAgo.setHours(halfHourAgo.getHours() + 8);
        halfHourAgo.setMinutes(halfHourAgo.getMinutes() - 30);

        const now = moment.tz('Asia/Shanghai').toDate();
        now.setHours(now.getHours() + 8);

        const { site_id } = req.query;

        const cubs = await Cub.findAll({
            attributes: [
                'site_id',
                [sequelize.fn('date_format', sequelize.col('cub_time'), '%Y-%m-%d %H:%i'), 'date'],
                [sequelize.fn('count', '*'), 'count']
            ],
            where: {
                site_id,
                cub_time: {
                    [Op.gte]: halfHourAgo // 获取半小时前及之后的数据
                }
            },
            group: ['site_id', 'date'],
            order: [
                [sequelize.literal('date ASC')],
            ]
        });

        let sum = 0;
        // 格式化数据，包括site_id、日期、分钟和每分钟的数据条数
        const cubsTrend = cubs.map(cub => {
            const currentDate = cub.get('date');
            const count = cub.get('count');

            sum = sum + count;
            return {
                site_id: cub.site_id,
                date: currentDate,
                count: sum
            };
        });

        res.status(200).json({
            cubsTrend: cubsTrend
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: '获取实时调仔列表失败'
        })
    }
};



exports.test = async (req, res) => {
    try {

        const { site_id } = req.query;

        await Cage.update({
            statu: '初始状态',
            cub_number: 0
        }, {
            where: {
                site_id
            }
        });
        // 删除成功后的操作
        res.status(200).json({
            message: '成功删除'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: '删除失败'
        })
    }
};