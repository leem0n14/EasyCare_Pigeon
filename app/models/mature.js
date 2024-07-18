/* module.exports = (sequelize, Sequelize) => {
    const Mature = sequelize.define("mature", {
        site_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'site_id'
        },
        house_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'house_id'
        },
        cage_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'cage_id'
        },
        egg_time: { //产蛋时间
            type: Sequelize.DATE,
            allowNull: true,
            field: 'egg_time'
        },
        put_time: {
            type: Sequelize.DATE, //放仔时间
            allowNull: true,
            field: 'put_time'
        },
        mature_time: { // 出栏日期
            type: Sequelize.DATE, //日期类型
            allowNull: true,
            field: 'mature_time'
        },
        hatch_days: { //孵化周期天数 （放仔时间-产蛋时间）
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'hatch_days'
        },
        mature_days: { //出栏周期天数 （出栏时间-产蛋时间）
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'mature_days'
        }
    }, {
        freezeTableName: true, //不使用sequelize给模型自定义的表名（自定义表名的命名规则：模型名后加s）
        timestamps: false //若为true，在获取数据时，会自动添加两列数据（createTime、updateTime）
    })

    return Mature
} */