const moment = require("moment-timezone");
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const { log } = require("console");

// 修改函数签名，不再需要req和res参数
async function backupDatabase() {
    try {
        // 数据库信息
        const dbName = process.env.DB_NAME;
        const dbUser = process.env.DB_USER;
        const dbPass = process.env.DB_PASS;
        const backupDir = path.resolve(__dirname, '../../sql');

        // 备份数据库
        const date = moment().tz('Asia/Shanghai').format('YYYYMMDD_HHmmss');
        const backupPath = path.join(backupDir, `${dbName}_${date}.sql`);
        const dumpCommand = `mysqldump -u ${dbUser} --password=${dbPass} ${dbName} > "${backupPath}"`;

        exec(dumpCommand, (error, stdout, stderr) => {
            if (error) {
                console.error('备份操作出错:', error);
                return;
            }

            console.log(`数据库备份成功: ${backupPath}`);

            // 删除7天前的备份文件
            const now = Date.now();
            // console.log(now)
            fs.readdir(backupDir, (err, files) => {
                if (err) {
                    console.error('读取备份目录失败:', err);
                    return;
                }

                files.forEach(file => {
                    const filePath = path.join(backupDir, file);
                    fs.stat(filePath, (err, stats) => {
                        if (err) {
                            console.error('获取文件状态失败:', err);
                            return;
                        }

                        const sevenDaysAgo = now - (10 * 24 * 60 * 60 * 1000);
                        if (stats.mtime.getTime() < sevenDaysAgo) {
                            fs.unlink(filePath, err => {
                                if (err) {
                                    console.error('删除文件失败:', err);
                                    return;
                                }
                                console.log(`已删除文件: ${filePath}`);
                            });
                        }
                    });
                });
            });
        });
    } catch (error) {
        console.error('备份操作出错:', error);
    }
}

module.exports = backupDatabase;
