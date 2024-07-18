module.exports = (sequelize, Sequelize) => {
    const Sum = sequelize.define("sum", {
        site_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'site_id'
        },
        cub_death_sum: { //雏鸽死亡总数
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'cub_death_sum'
        },
        mature_sum: { //出栏总数 
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'mature_sum'
        },
        time: {
            type: Sequelize.DATE,
            allowNull: true,
            field: 'time'
        }
    }, {
        freezeTableName: true, //不使用sequelize给模型自定义的表名（自定义表名的命名规则：模型名后加s）
        timestamps: false //若为true，在获取数据时，会自动添加两列数据（createTime、updateTime）
    })

    return Sum
}