module.exports = (sequelize, Sequelize) => {
    const WarnEgg = sequelize.define("warn_egg", {
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
        egg_time: { // 产蛋和预抽蛋日期
            type: Sequelize.DATE, //日期类型
            allowNull: true,
            field: 'egg_time'
        },
        statu: { // 是否已经处理了该鸽蛋
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'statu'
        },
        diffInDays: { //最近一次产蛋距离现在的天数
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'diff_in_days'
        }
    }, {
        freezeTableName: true, //不使用sequelize给模型自定义的表名（自定义表名的命名规则：模型名后加s）
        timestamps: false //若为true，在获取数据时，会自动添加两列数据（createTime、updateTime）
    })
    return WarnEgg
}