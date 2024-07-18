/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 80100
Source Host           : localhost:3306
Source Database       : test_pigeon2

Target Server Type    : MYSQL
Target Server Version : 80100
File Encoding         : 65001

Date: 2023-12-06 09:54:16
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for abnormal
-- ----------------------------
DROP TABLE IF EXISTS `abnormal`;
CREATE TABLE `abnormal` (
  `id` int NOT NULL AUTO_INCREMENT,
  `site_id` int DEFAULT NULL,
  `house_id` int DEFAULT NULL,
  `cage_id` int DEFAULT NULL,
  `refer` varchar(255) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `statu` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=300 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of abnormal
-- ----------------------------
INSERT INTO `abnormal` VALUES ('1', '1', '2', '2', '死亡 种鸽1 雏鸽1', '2023-11-26 14:26:04', '1');
INSERT INTO `abnormal` VALUES ('2', '1', '2', '4', '弃孵', '2023-11-26 14:26:04', '1');
INSERT INTO `abnormal` VALUES ('3', '1', '2', '5', '破损', '2023-11-26 14:26:05', '1');
INSERT INTO `abnormal` VALUES ('4', '1', '2', '6', '单蛋', '2023-11-26 14:26:05', '1');
INSERT INTO `abnormal` VALUES ('5', '1', '2', '1', '弃养', '2023-11-26 14:26:03', '1');
INSERT INTO `abnormal` VALUES ('6', '1', '5', '1', '单蛋', '2023-11-28 12:32:27', '1');
INSERT INTO `abnormal` VALUES ('7', '1', '5', '6', '单蛋', '2023-11-28 12:32:28', '1');
INSERT INTO `abnormal` VALUES ('8', '1', '5', '6', '弃孵', '2023-11-28 12:32:28', '1');
INSERT INTO `abnormal` VALUES ('9', '1', '6', '1', '单蛋', '2023-11-28 12:52:55', '1');
INSERT INTO `abnormal` VALUES ('10', '1', '6', '6', '单蛋', '2023-11-28 12:52:54', '1');
INSERT INTO `abnormal` VALUES ('11', '1', '6', '2', '弃孵', '2023-11-28 12:52:54', '1');
INSERT INTO `abnormal` VALUES ('12', '1', '7', '2', '单蛋', '2023-11-28 12:52:49', '1');
INSERT INTO `abnormal` VALUES ('13', '1', '7', '6', '单蛋', '2023-11-28 12:52:48', '1');
INSERT INTO `abnormal` VALUES ('14', '1', '8', '1', '单蛋', '2023-11-28 12:52:40', '1');
INSERT INTO `abnormal` VALUES ('15', '1', '8', '4', '破损', '2023-11-28 12:52:41', '1');
INSERT INTO `abnormal` VALUES ('16', '1', '8', '6', '弃养', '2023-11-28 12:52:39', '1');
INSERT INTO `abnormal` VALUES ('17', '1', '9', '1', '单蛋', '2023-11-28 12:55:19', '1');
INSERT INTO `abnormal` VALUES ('18', '1', '10', '1', '单蛋', '2023-11-28 12:58:43', '1');
INSERT INTO `abnormal` VALUES ('19', '1', '10', '4', '破损', '2023-11-28 12:58:44', '1');
INSERT INTO `abnormal` VALUES ('20', '1', '10', '6', '弃养', '2023-11-28 12:58:48', '1');
INSERT INTO `abnormal` VALUES ('21', '1', '10', '4', '单蛋', '2023-11-28 12:58:44', '1');
INSERT INTO `abnormal` VALUES ('22', '1', '2', '6', '单蛋', '2023-11-28 13:05:01', '1');
INSERT INTO `abnormal` VALUES ('23', '1', '2', '6', '弃养', '2023-11-28 13:05:01', '1');
INSERT INTO `abnormal` VALUES ('24', '1', '2', '5', '破损', '2023-11-28 13:05:02', '1');
INSERT INTO `abnormal` VALUES ('25', '1', '1', '1', '单蛋', '2023-11-28 13:08:24', '1');
INSERT INTO `abnormal` VALUES ('26', '1', '1', '6', '单蛋', '2023-11-28 13:08:24', '1');
INSERT INTO `abnormal` VALUES ('27', '1', '3', '5', '单蛋', '2023-11-28 13:10:42', '1');
INSERT INTO `abnormal` VALUES ('28', '1', '3', '6', '单蛋', '2023-11-28 13:10:43', '1');
INSERT INTO `abnormal` VALUES ('29', '1', '3', '5', '破损', '2023-11-28 13:10:42', '1');
INSERT INTO `abnormal` VALUES ('30', '1', '3', '2', '弃孵', '2023-11-28 13:10:42', '1');
INSERT INTO `abnormal` VALUES ('31', '1', '11', '3', '弃孵', '2023-11-28 13:17:33', '1');
INSERT INTO `abnormal` VALUES ('32', '1', '11', '6', '弃养', '2023-11-28 13:17:34', '1');
INSERT INTO `abnormal` VALUES ('33', '1', '11', '6', '死亡 种鸽1 雏鸽2', '2023-11-28 13:17:34', '1');
INSERT INTO `abnormal` VALUES ('34', '1', '5', '2', '单蛋', '2023-11-29 12:33:51', '1');
INSERT INTO `abnormal` VALUES ('35', '1', '5', '1', '破损', '2023-11-29 12:33:52', '1');
INSERT INTO `abnormal` VALUES ('36', '1', '5', '5', '破损', '2023-11-29 12:33:52', '1');
INSERT INTO `abnormal` VALUES ('37', '1', '6', '1', '弃孵', '2023-11-29 12:38:23', '1');
INSERT INTO `abnormal` VALUES ('38', '1', '7', '5', '弃养', '2023-11-29 12:40:47', '1');
INSERT INTO `abnormal` VALUES ('39', '1', '8', '5', '单蛋', '2023-11-29 12:42:11', '1');
INSERT INTO `abnormal` VALUES ('40', '1', '9', '6', '单蛋', '2023-11-29 12:43:30', '1');
INSERT INTO `abnormal` VALUES ('41', '1', '2', '3', '单蛋', '2023-11-29 12:49:02', '1');
INSERT INTO `abnormal` VALUES ('42', '1', '2', '1', '弃孵', '2023-11-29 12:49:01', '1');
INSERT INTO `abnormal` VALUES ('43', '1', '11', '5', '单蛋', '2023-11-29 12:55:10', '1');
INSERT INTO `abnormal` VALUES ('44', '1', '10', '2', '弃孵', '2023-11-30 07:28:31', '1');
INSERT INTO `abnormal` VALUES ('45', '1', '5', '1', '单蛋', '2023-11-30 04:04:13', '1');
INSERT INTO `abnormal` VALUES ('46', '1', '5', '2', '单蛋', '2023-11-30 18:22:50', '1');
INSERT INTO `abnormal` VALUES ('47', '1', '6', '2', '单蛋', '2023-11-30 18:23:23', '1');
INSERT INTO `abnormal` VALUES ('48', '1', '7', '1', '单蛋', '2023-11-30 18:23:34', '1');
INSERT INTO `abnormal` VALUES ('49', '1', '8', '4', '单蛋', '2023-11-30 18:23:45', '1');
INSERT INTO `abnormal` VALUES ('50', '1', '8', '3', '单蛋', '2023-11-30 18:23:48', '1');
INSERT INTO `abnormal` VALUES ('51', '1', '9', '2', '单蛋', '2023-11-30 18:24:03', '1');
INSERT INTO `abnormal` VALUES ('52', '1', '9', '5', '单蛋', '2023-11-30 18:24:03', '1');
INSERT INTO `abnormal` VALUES ('53', '1', '10', '3', '单蛋', '2023-11-30 18:24:12', '1');
INSERT INTO `abnormal` VALUES ('54', '1', '2', '4', '单蛋', '2023-11-30 18:24:18', '1');
INSERT INTO `abnormal` VALUES ('55', '1', '2', '3', '单蛋', '2023-11-30 18:24:20', '1');
INSERT INTO `abnormal` VALUES ('56', '1', '1', '1', '单蛋', '2023-11-30 18:24:25', '1');
INSERT INTO `abnormal` VALUES ('57', '1', '3', '2', '单蛋', '2023-11-30 18:24:34', '1');
INSERT INTO `abnormal` VALUES ('58', '1', '11', '4', '单蛋', '2023-11-30 18:24:43', '1');
INSERT INTO `abnormal` VALUES ('59', '1', '1', '2', '死亡 种鸽2 雏鸽0', '2023-12-01 12:22:35', '0');
INSERT INTO `abnormal` VALUES ('60', '1', '5', '1', '死亡 种鸽1 雏鸽0', '2023-12-01 12:22:49', '0');
INSERT INTO `abnormal` VALUES ('61', '1', '5', '5', '死亡 种鸽1 雏鸽0', '2023-12-01 12:22:53', '0');
INSERT INTO `abnormal` VALUES ('62', '1', '6', '4', '死亡 种鸽1 雏鸽0', '2023-12-01 12:23:11', '0');
INSERT INTO `abnormal` VALUES ('63', '1', '6', '3', '死亡 种鸽2 雏鸽0', '2023-12-01 12:23:14', '0');
INSERT INTO `abnormal` VALUES ('64', '1', '5', '2', '破损', '2023-12-01 13:00:19', '1');
INSERT INTO `abnormal` VALUES ('65', '1', '5', '5', '破损', '2023-12-01 13:00:21', '1');
INSERT INTO `abnormal` VALUES ('66', '1', '5', '1', '弃仔', '2023-12-01 13:06:46', '1');
INSERT INTO `abnormal` VALUES ('67', '1', '2', '1', '死亡 种鸽1 雏鸽0', '2023-12-01 05:22:20', '1');
INSERT INTO `abnormal` VALUES ('68', '1', '5', '2', '死亡 种鸽2', '2023-12-01 08:02:14', '1');
INSERT INTO `abnormal` VALUES ('69', '1', '5', '1', '死亡 种鸽1', '2023-12-01 08:02:53', '1');
INSERT INTO `abnormal` VALUES ('70', '1', '5', '4', '死亡 种鸽1', '2023-12-01 08:03:34', '1');
INSERT INTO `abnormal` VALUES ('71', '1', '5', '3', '死亡 种鸽1', '2023-12-01 08:04:00', '1');
INSERT INTO `abnormal` VALUES ('72', '1', '5', '5', '死亡 种鸽1', '2023-12-01 08:04:26', '1');
INSERT INTO `abnormal` VALUES ('73', '1', '5', '6', '死亡 种鸽1', '2023-12-01 08:04:51', '1');
INSERT INTO `abnormal` VALUES ('74', '1', '5', '2', '死亡 种鸽1', '2023-12-01 08:05:16', '1');
INSERT INTO `abnormal` VALUES ('75', '1', '6', '2', '单蛋', '2023-12-01 16:08:01', '1');
INSERT INTO `abnormal` VALUES ('76', '1', '6', '2', '单蛋', '2023-12-01 16:08:04', '1');
INSERT INTO `abnormal` VALUES ('77', '1', '6', '3', '单蛋', '2023-12-01 16:08:11', '1');
INSERT INTO `abnormal` VALUES ('78', '1', '6', '3', '单蛋', '2023-12-01 16:08:13', '1');
INSERT INTO `abnormal` VALUES ('79', '1', '6', '2', '光蛋', '2023-12-01 16:08:27', '1');
INSERT INTO `abnormal` VALUES ('80', '1', '6', '3', '光蛋', '2023-12-01 16:08:28', '1');
INSERT INTO `abnormal` VALUES ('81', '1', '6', '2', '光蛋', '2023-12-01 16:08:29', '1');
INSERT INTO `abnormal` VALUES ('82', '1', '6', '2', '弃仔', '2023-12-01 16:08:31', '1');
INSERT INTO `abnormal` VALUES ('83', '1', '6', '2', '弃仔', '2023-12-01 16:08:32', '1');
INSERT INTO `abnormal` VALUES ('84', '1', '6', '2', '弃孵', '2023-12-01 16:08:33', '1');
INSERT INTO `abnormal` VALUES ('85', '1', '6', '2', '弃孵', '2023-12-01 16:08:34', '1');
INSERT INTO `abnormal` VALUES ('86', '1', '6', '2', '破损', '2023-12-01 16:08:36', '1');
INSERT INTO `abnormal` VALUES ('87', '1', '6', '2', '破损', '2023-12-01 16:08:36', '1');
INSERT INTO `abnormal` VALUES ('88', '1', '6', '2', '死亡 种鸽1', '2023-12-01 08:43:55', '1');
INSERT INTO `abnormal` VALUES ('89', '1', '6', '2', '死亡 种鸽1', '2023-12-01 08:43:55', '1');
INSERT INTO `abnormal` VALUES ('90', '1', '6', '2', '单蛋', '2023-12-01 16:08:51', '1');
INSERT INTO `abnormal` VALUES ('91', '1', '6', '3', '单蛋', '2023-12-01 16:08:51', '1');
INSERT INTO `abnormal` VALUES ('92', '1', '6', '3', '单蛋', '2023-12-01 16:08:52', '1');
INSERT INTO `abnormal` VALUES ('93', '1', '6', '3', '弃仔', '2023-12-01 16:16:30', '1');
INSERT INTO `abnormal` VALUES ('94', '1', '6', '6', '弃仔', '2023-12-01 16:16:36', '1');
INSERT INTO `abnormal` VALUES ('95', '1', '6', '3', '破损', '2023-12-01 16:36:58', '1');
INSERT INTO `abnormal` VALUES ('96', '1', '6', '6', '光蛋', '2023-12-01 16:40:30', '1');
INSERT INTO `abnormal` VALUES ('97', '1', '6', '2', '弃孵', '2023-12-01 16:40:46', '1');
INSERT INTO `abnormal` VALUES ('98', '1', '6', '1', '死亡 种鸽1', '2023-12-01 08:44:25', '1');
INSERT INTO `abnormal` VALUES ('99', '1', '6', '2', '死亡 种鸽1', '2023-12-01 08:44:51', '1');
INSERT INTO `abnormal` VALUES ('100', '1', '6', '3', '死亡 种鸽1', '2023-12-01 08:45:19', '1');
INSERT INTO `abnormal` VALUES ('101', '1', '6', '4', '死亡 种鸽1', '2023-12-01 08:45:48', '1');
INSERT INTO `abnormal` VALUES ('102', '1', '6', '3', '弃仔', '2023-12-01 16:46:35', '1');
INSERT INTO `abnormal` VALUES ('103', '1', '7', '1', '弃仔', '2023-12-01 16:48:15', '1');
INSERT INTO `abnormal` VALUES ('104', '1', '7', '1', '弃仔', '2023-12-01 16:49:14', '1');
INSERT INTO `abnormal` VALUES ('105', '1', '7', '5', '死亡 种鸽1', '2023-12-01 08:54:07', '1');
INSERT INTO `abnormal` VALUES ('106', '1', '7', '6', '死亡 种鸽1', '2023-12-01 08:54:36', '1');
INSERT INTO `abnormal` VALUES ('107', '1', '10', '4', '死亡 种鸽2', '2023-12-01 09:17:49', '1');
INSERT INTO `abnormal` VALUES ('108', '1', '10', '1', '死亡 种鸽1', '2023-12-01 09:17:48', '1');
INSERT INTO `abnormal` VALUES ('109', '1', '10', '5', '死亡 种鸽1', '2023-12-01 09:17:50', '1');
INSERT INTO `abnormal` VALUES ('110', '1', '10', '1', '破损', '2023-12-01 17:14:31', '1');
INSERT INTO `abnormal` VALUES ('111', '1', '10', '1', '死亡 种鸽1', '2023-12-01 09:17:48', '1');
INSERT INTO `abnormal` VALUES ('112', '1', '10', '2', '死亡 种鸽2', '2023-12-01 09:17:50', '1');
INSERT INTO `abnormal` VALUES ('113', '1', '10', '1', '弃孵', '2023-12-01 17:16:43', '1');
INSERT INTO `abnormal` VALUES ('114', '1', '10', '3', '死亡 种鸽1', '2023-12-01 09:17:52', '1');
INSERT INTO `abnormal` VALUES ('115', '1', '10', '6', '死亡 种鸽1', '2023-12-01 09:25:30', '1');
INSERT INTO `abnormal` VALUES ('116', '1', '11', '1', '死亡 种鸽1', '2023-12-01 09:31:44', '1');
INSERT INTO `abnormal` VALUES ('117', '1', '11', '1', '死亡 种鸽2', '2023-12-01 09:32:37', '1');
INSERT INTO `abnormal` VALUES ('118', '1', '11', '2', '死亡 种鸽2', '2023-12-01 09:33:18', '1');
INSERT INTO `abnormal` VALUES ('119', '1', '11', '3', '死亡 种鸽2', '2023-12-01 09:34:00', '1');
INSERT INTO `abnormal` VALUES ('120', '1', '11', '4', '死亡 种鸽1', '2023-12-01 09:34:32', '1');
INSERT INTO `abnormal` VALUES ('121', '1', '11', '5', '死亡 种鸽1', '2023-12-01 09:35:06', '1');
INSERT INTO `abnormal` VALUES ('122', '1', '11', '6', '死亡 种鸽1', '2023-12-01 09:35:39', '1');
INSERT INTO `abnormal` VALUES ('123', '1', '34', '6', '单蛋', '2023-12-01 20:17:20', '1');
INSERT INTO `abnormal` VALUES ('124', '1', '34', '3', '弃孵', '2023-12-01 20:20:14', '1');
INSERT INTO `abnormal` VALUES ('125', '1', '34', '3', '弃孵', '2023-12-01 20:20:15', '1');
INSERT INTO `abnormal` VALUES ('126', '1', '34', '4', '死亡 种鸽2', '2023-12-01 12:21:09', '1');
INSERT INTO `abnormal` VALUES ('127', '1', '24', '1', '单蛋', '2023-12-01 20:40:20', '1');
INSERT INTO `abnormal` VALUES ('128', '1', '24', '5', '弃孵', '2023-12-01 20:43:51', '1');
INSERT INTO `abnormal` VALUES ('129', '1', '24', '3', '弃仔', '2023-12-01 20:51:57', '1');
INSERT INTO `abnormal` VALUES ('130', '1', '25', '3', '单蛋', '2023-12-01 21:00:47', '1');
INSERT INTO `abnormal` VALUES ('131', '1', '25', '2', '弃孵', '2023-12-01 21:06:25', '1');
INSERT INTO `abnormal` VALUES ('132', '1', '25', '6', '死亡 种鸽1', '2023-12-01 13:09:47', '1');
INSERT INTO `abnormal` VALUES ('133', '1', '4', '1', '破损', '2023-12-01 21:14:51', '1');
INSERT INTO `abnormal` VALUES ('134', '1', '4', '1', '死亡 种鸽1', '2023-12-01 13:15:01', '1');
INSERT INTO `abnormal` VALUES ('135', '1', '4', '1', '死亡 种鸽1', '2023-12-01 13:22:59', '1');
INSERT INTO `abnormal` VALUES ('136', '1', '26', '5', '单蛋', '2023-12-01 21:20:16', '1');
INSERT INTO `abnormal` VALUES ('137', '1', '26', '1', '弃孵', '2023-12-01 21:20:31', '1');
INSERT INTO `abnormal` VALUES ('138', '1', '26', '5', '弃仔', '2023-12-01 21:23:57', '1');
INSERT INTO `abnormal` VALUES ('139', '1', '25', '2', '弃仔', '2023-12-01 21:29:54', '1');
INSERT INTO `abnormal` VALUES ('140', '1', '14', '2', '单蛋', '2023-12-01 21:30:12', '1');
INSERT INTO `abnormal` VALUES ('141', '1', '14', '2', '死亡 种鸽1', '2023-12-01 13:33:19', '1');
INSERT INTO `abnormal` VALUES ('142', '1', '15', '4', '弃孵', '2023-12-01 21:38:58', '1');
INSERT INTO `abnormal` VALUES ('143', '1', '15', '4', '破损', '2023-12-01 21:42:22', '1');
INSERT INTO `abnormal` VALUES ('144', '1', '15', '5', '单蛋', '2023-12-01 21:42:25', '1');
INSERT INTO `abnormal` VALUES ('145', '1', '15', '5', '弃孵', '2023-12-01 21:42:27', '1');
INSERT INTO `abnormal` VALUES ('146', '1', '15', '2', '破损', '2023-12-01 21:44:28', '1');
INSERT INTO `abnormal` VALUES ('147', '1', '15', '1', '单蛋', '2023-12-01 21:47:16', '1');
INSERT INTO `abnormal` VALUES ('148', '1', '15', '5', '光蛋', '2023-12-01 21:47:18', '1');
INSERT INTO `abnormal` VALUES ('149', '1', '15', '4', '弃仔', '2023-12-01 21:47:19', '1');
INSERT INTO `abnormal` VALUES ('150', '1', '15', '4', '弃孵', '2023-12-01 21:47:20', '1');
INSERT INTO `abnormal` VALUES ('151', '1', '15', '2', '死亡 种鸽2', '2023-12-01 13:47:36', '1');
INSERT INTO `abnormal` VALUES ('152', '1', '15', '4', '破损', '2023-12-01 21:51:01', '1');
INSERT INTO `abnormal` VALUES ('153', '1', '15', '5', '死亡 种鸽1', '2023-12-02 03:25:30', '1');
INSERT INTO `abnormal` VALUES ('154', '1', '15', '1', '死亡 种鸽1', '2023-12-02 03:25:29', '1');
INSERT INTO `abnormal` VALUES ('155', '1', '24', '2', '破损', '2023-12-02 08:09:57', '1');
INSERT INTO `abnormal` VALUES ('156', '1', '24', '4', '单蛋', '2023-12-02 08:10:45', '1');
INSERT INTO `abnormal` VALUES ('157', '1', '24', '1', '弃孵', '2023-12-02 08:13:47', '1');
INSERT INTO `abnormal` VALUES ('158', '1', '24', '1', '弃仔', '2023-12-02 08:18:56', '1');
INSERT INTO `abnormal` VALUES ('159', '1', '24', '6', '弃仔', '2023-12-02 08:19:14', '1');
INSERT INTO `abnormal` VALUES ('160', '1', '25', '6', '单蛋', '2023-12-02 08:26:47', '1');
INSERT INTO `abnormal` VALUES ('161', '1', '25', '3', '弃孵', '2023-12-02 08:27:27', '1');
INSERT INTO `abnormal` VALUES ('162', '1', '25', '1', '死亡 种鸽1', '2023-12-02 00:30:35', '1');
INSERT INTO `abnormal` VALUES ('163', '1', '25', '3', '弃仔', '2023-12-02 08:31:02', '1');
INSERT INTO `abnormal` VALUES ('164', '1', '25', '2', '死亡 种鸽1', '2023-12-02 00:32:46', '1');
INSERT INTO `abnormal` VALUES ('165', '1', '25', '4', '单蛋', '2023-12-02 08:33:47', '1');
INSERT INTO `abnormal` VALUES ('166', '1', '25', '4', '弃仔', '2023-12-02 08:34:45', '1');
INSERT INTO `abnormal` VALUES ('167', '1', '26', '6', '死亡 种鸽1', '2023-12-02 00:36:44', '1');
INSERT INTO `abnormal` VALUES ('168', '1', '26', '3', '单蛋', '2023-12-02 08:38:07', '1');
INSERT INTO `abnormal` VALUES ('169', '1', '26', '1', '弃孵', '2023-12-02 08:41:56', '1');
INSERT INTO `abnormal` VALUES ('170', '1', '26', '3', '死亡 种鸽1', '2023-12-02 00:42:55', '1');
INSERT INTO `abnormal` VALUES ('171', '1', '28', '3', '单蛋', '2023-12-02 08:46:19', '1');
INSERT INTO `abnormal` VALUES ('172', '1', '28', '2', '弃仔', '2023-12-02 08:49:00', '1');
INSERT INTO `abnormal` VALUES ('173', '1', '28', '4', '弃孵', '2023-12-02 08:49:47', '1');
INSERT INTO `abnormal` VALUES ('174', '1', '28', '4', '弃仔', '2023-12-02 08:50:28', '1');
INSERT INTO `abnormal` VALUES ('175', '1', '28', '6', '死亡 种鸽1', '2023-12-02 00:51:22', '1');
INSERT INTO `abnormal` VALUES ('176', '1', '28', '4', '破损', '2023-12-02 08:54:28', '1');
INSERT INTO `abnormal` VALUES ('177', '1', '28', '3', '单蛋', '2023-12-02 08:55:43', '1');
INSERT INTO `abnormal` VALUES ('178', '1', '28', '5', '死亡 种鸽1', '2023-12-02 00:57:02', '1');
INSERT INTO `abnormal` VALUES ('179', '1', '29', '3', '弃孵', '2023-12-02 09:00:19', '1');
INSERT INTO `abnormal` VALUES ('180', '1', '29', '5', '破损', '2023-12-02 09:01:02', '1');
INSERT INTO `abnormal` VALUES ('181', '1', '29', '6', '单蛋', '2023-12-02 09:01:49', '1');
INSERT INTO `abnormal` VALUES ('182', '1', '29', '2', '单蛋', '2023-12-02 09:02:33', '1');
INSERT INTO `abnormal` VALUES ('183', '1', '29', '6', '弃仔', '2023-12-02 09:05:27', '1');
INSERT INTO `abnormal` VALUES ('184', '1', '29', '4', '弃仔', '2023-12-02 09:06:30', '1');
INSERT INTO `abnormal` VALUES ('185', '1', '29', '4', '破损', '2023-12-02 09:06:53', '1');
INSERT INTO `abnormal` VALUES ('186', '1', '29', '1', '单蛋', '2023-12-02 09:09:17', '1');
INSERT INTO `abnormal` VALUES ('187', '1', '29', '6', '破损', '2023-12-02 09:10:32', '1');
INSERT INTO `abnormal` VALUES ('188', '1', '29', '5', '弃仔', '2023-12-02 09:11:31', '1');
INSERT INTO `abnormal` VALUES ('189', '1', '29', '2', '死亡 种鸽1', '2023-12-02 01:12:47', '1');
INSERT INTO `abnormal` VALUES ('190', '1', '29', '6', '破损', '2023-12-02 09:13:33', '1');
INSERT INTO `abnormal` VALUES ('191', '1', '29', '6', '死亡 种鸽1', '2023-12-02 01:13:48', '1');
INSERT INTO `abnormal` VALUES ('192', '1', '31', '1', '破损', '2023-12-02 09:15:26', '1');
INSERT INTO `abnormal` VALUES ('193', '1', '31', '6', '破损', '2023-12-02 09:15:43', '1');
INSERT INTO `abnormal` VALUES ('194', '1', '31', '3', '单蛋', '2023-12-02 09:16:32', '1');
INSERT INTO `abnormal` VALUES ('195', '1', '31', '1', '死亡 种鸽1', '2023-12-02 01:20:29', '1');
INSERT INTO `abnormal` VALUES ('196', '1', '31', '5', '死亡 种鸽1', '2023-12-02 01:20:43', '1');
INSERT INTO `abnormal` VALUES ('197', '1', '31', '2', '单蛋', '2023-12-02 09:21:42', '1');
INSERT INTO `abnormal` VALUES ('198', '1', '31', '3', '破损', '2023-12-02 09:21:58', '1');
INSERT INTO `abnormal` VALUES ('199', '1', '31', '4', '弃孵', '2023-12-02 09:22:47', '1');
INSERT INTO `abnormal` VALUES ('200', '1', '31', '6', '死亡 种鸽2', '2023-12-02 01:25:26', '1');
INSERT INTO `abnormal` VALUES ('201', '1', '31', '4', '弃仔', '2023-12-02 09:26:44', '1');
INSERT INTO `abnormal` VALUES ('202', '1', '31', '5', '死亡 种鸽1', '2023-12-02 01:27:30', '1');
INSERT INTO `abnormal` VALUES ('203', '1', '32', '1', '单蛋', '2023-12-02 09:29:03', '1');
INSERT INTO `abnormal` VALUES ('204', '1', '32', '3', '单蛋', '2023-12-02 09:29:23', '1');
INSERT INTO `abnormal` VALUES ('205', '1', '32', '2', '死亡 种鸽1', '2023-12-02 01:33:38', '1');
INSERT INTO `abnormal` VALUES ('206', '1', '32', '4', '弃孵', '2023-12-02 09:31:38', '1');
INSERT INTO `abnormal` VALUES ('207', '1', '32', '5', '破损', '2023-12-02 09:32:02', '1');
INSERT INTO `abnormal` VALUES ('208', '1', '32', '5', '死亡 种鸽1', '2023-12-02 01:33:57', '1');
INSERT INTO `abnormal` VALUES ('209', '1', '32', '4', '弃仔', '2023-12-02 09:33:04', '1');
INSERT INTO `abnormal` VALUES ('210', '1', '32', '1', '破损', '2023-12-02 09:34:13', '1');
INSERT INTO `abnormal` VALUES ('211', '1', '32', '2', '破损', '2023-12-02 09:34:25', '1');
INSERT INTO `abnormal` VALUES ('212', '1', '32', '6', '单蛋', '2023-12-02 09:35:19', '1');
INSERT INTO `abnormal` VALUES ('213', '1', '32', '5', '弃仔', '2023-12-02 09:36:47', '1');
INSERT INTO `abnormal` VALUES ('214', '1', '32', '4', '死亡 种鸽1', '2023-12-02 01:37:50', '1');
INSERT INTO `abnormal` VALUES ('215', '1', '32', '2', '弃仔', '2023-12-02 09:38:30', '1');
INSERT INTO `abnormal` VALUES ('216', '1', '33', '1', '单蛋', '2023-12-02 09:40:16', '1');
INSERT INTO `abnormal` VALUES ('217', '1', '33', '3', '单蛋', '2023-12-02 09:40:53', '1');
INSERT INTO `abnormal` VALUES ('218', '1', '33', '5', '破损', '2023-12-02 09:41:33', '1');
INSERT INTO `abnormal` VALUES ('219', '1', '33', '2', '弃孵', '2023-12-02 09:42:51', '1');
INSERT INTO `abnormal` VALUES ('220', '1', '33', '2', '弃孵', '2023-12-02 09:42:55', '1');
INSERT INTO `abnormal` VALUES ('221', '1', '33', '3', '弃仔', '2023-12-02 09:43:26', '1');
INSERT INTO `abnormal` VALUES ('222', '1', '33', '3', '死亡 种鸽2', '2023-12-02 01:45:17', '1');
INSERT INTO `abnormal` VALUES ('223', '1', '33', '4', '弃孵', '2023-12-02 09:44:02', '1');
INSERT INTO `abnormal` VALUES ('224', '1', '33', '6', '死亡 种鸽1', '2023-12-02 01:45:24', '1');
INSERT INTO `abnormal` VALUES ('225', '1', '33', '2', '弃仔', '2023-12-02 09:46:51', '1');
INSERT INTO `abnormal` VALUES ('226', '1', '33', '3', '破损', '2023-12-02 09:47:09', '1');
INSERT INTO `abnormal` VALUES ('227', '1', '33', '2', '破损', '2023-12-02 09:48:45', '1');
INSERT INTO `abnormal` VALUES ('228', '1', '33', '1', '死亡 种鸽1', '2023-12-02 01:51:04', '1');
INSERT INTO `abnormal` VALUES ('229', '1', '33', '2', '弃仔', '2023-12-02 09:51:31', '1');
INSERT INTO `abnormal` VALUES ('230', '1', '33', '6', '弃仔', '2023-12-02 09:52:33', '1');
INSERT INTO `abnormal` VALUES ('231', '1', '34', '2', '破损', '2023-12-02 09:53:24', '1');
INSERT INTO `abnormal` VALUES ('232', '1', '34', '1', '弃孵', '2023-12-02 09:58:29', '1');
INSERT INTO `abnormal` VALUES ('233', '1', '34', '1', '弃仔', '2023-12-02 09:59:19', '1');
INSERT INTO `abnormal` VALUES ('234', '1', '34', '2', '死亡 种鸽1', '2023-12-02 02:02:28', '1');
INSERT INTO `abnormal` VALUES ('235', '1', '34', '4', '弃孵', '2023-12-02 10:00:30', '1');
INSERT INTO `abnormal` VALUES ('236', '1', '34', '4', '弃孵', '2023-12-02 10:00:37', '1');
INSERT INTO `abnormal` VALUES ('237', '1', '34', '4', '单蛋', '2023-12-02 10:01:28', '1');
INSERT INTO `abnormal` VALUES ('238', '1', '34', '4', '单蛋', '2023-12-02 10:01:33', '1');
INSERT INTO `abnormal` VALUES ('239', '1', '34', '4', '死亡 种鸽1', '2023-12-02 02:02:33', '1');
INSERT INTO `abnormal` VALUES ('240', '1', '35', '3', '单蛋', '2023-12-02 10:04:56', '1');
INSERT INTO `abnormal` VALUES ('241', '1', '35', '4', '破损', '2023-12-02 10:05:29', '1');
INSERT INTO `abnormal` VALUES ('242', '1', '35', '6', '单蛋', '2023-12-02 10:05:57', '1');
INSERT INTO `abnormal` VALUES ('243', '1', '35', '1', '弃孵', '2023-12-02 10:06:23', '1');
INSERT INTO `abnormal` VALUES ('244', '1', '35', '5', '弃孵', '2023-12-02 10:07:04', '1');
INSERT INTO `abnormal` VALUES ('245', '1', '35', '5', '死亡 种鸽1', '2023-12-02 02:07:52', '1');
INSERT INTO `abnormal` VALUES ('246', '1', '35', '6', '死亡 种鸽2', '2023-12-02 02:07:56', '1');
INSERT INTO `abnormal` VALUES ('247', '1', '35', '1', '弃仔', '2023-12-02 10:08:30', '1');
INSERT INTO `abnormal` VALUES ('248', '1', '35', '2', '死亡 种鸽1', '2023-12-02 02:09:13', '1');
INSERT INTO `abnormal` VALUES ('249', '1', '35', '1', '单蛋', '2023-12-02 10:09:41', '1');
INSERT INTO `abnormal` VALUES ('250', '1', '35', '1', '单蛋', '2023-12-02 10:09:47', '1');
INSERT INTO `abnormal` VALUES ('251', '1', '35', '2', '破损', '2023-12-02 10:09:57', '1');
INSERT INTO `abnormal` VALUES ('252', '1', '35', '5', '弃仔', '2023-12-02 10:14:23', '1');
INSERT INTO `abnormal` VALUES ('253', '1', '35', '6', '死亡 种鸽1', '2023-12-02 02:15:02', '1');
INSERT INTO `abnormal` VALUES ('254', '1', '17', '2', '单蛋', '2023-12-02 11:19:41', '1');
INSERT INTO `abnormal` VALUES ('255', '1', '18', '4', '单蛋', '2023-12-02 11:19:51', '1');
INSERT INTO `abnormal` VALUES ('256', '1', '22', '2', '单蛋', '2023-12-02 11:23:12', '1');
INSERT INTO `abnormal` VALUES ('257', '1', '22', '3', '单蛋', '2023-12-02 11:23:12', '1');
INSERT INTO `abnormal` VALUES ('258', '1', '21', '5', '单蛋', '2023-12-05 18:34:23', '1');
INSERT INTO `abnormal` VALUES ('259', '1', '21', '3', '单蛋', '2023-12-05 18:34:23', '1');
INSERT INTO `abnormal` VALUES ('260', '1', '23', '1', '单蛋', '2023-12-05 18:36:03', '1');
INSERT INTO `abnormal` VALUES ('261', '1', '23', '4', '单蛋', '2023-12-05 18:36:04', '1');
INSERT INTO `abnormal` VALUES ('262', '1', '23', '5', '破损', '2023-12-05 18:36:20', '1');
INSERT INTO `abnormal` VALUES ('263', '1', '23', '2', '破损', '2023-12-05 18:36:25', '1');
INSERT INTO `abnormal` VALUES ('264', '1', '6', '1', '破损', '2023-12-05 20:52:21', '1');
INSERT INTO `abnormal` VALUES ('265', '1', '6', '2', '破损', '2023-12-05 20:52:22', '1');
INSERT INTO `abnormal` VALUES ('266', '1', '6', '3', '破损', '2023-12-05 20:52:23', '1');
INSERT INTO `abnormal` VALUES ('267', '1', '6', '4', '破损', '2023-12-05 20:52:23', '1');
INSERT INTO `abnormal` VALUES ('268', '1', '6', '5', '破损', '2023-12-05 20:52:23', '1');
INSERT INTO `abnormal` VALUES ('269', '1', '6', '6', '破损', '2023-12-05 20:52:24', '1');
INSERT INTO `abnormal` VALUES ('270', '1', '6', '1', '单蛋', '2023-12-05 20:52:25', '1');
INSERT INTO `abnormal` VALUES ('271', '1', '6', '2', '单蛋', '2023-12-05 20:52:26', '1');
INSERT INTO `abnormal` VALUES ('272', '1', '6', '3', '单蛋', '2023-12-05 20:52:26', '1');
INSERT INTO `abnormal` VALUES ('273', '1', '6', '4', '单蛋', '2023-12-05 20:52:27', '1');
INSERT INTO `abnormal` VALUES ('274', '1', '6', '5', '单蛋', '2023-12-05 20:52:27', '1');
INSERT INTO `abnormal` VALUES ('275', '1', '6', '6', '单蛋', '2023-12-05 20:52:28', '1');
INSERT INTO `abnormal` VALUES ('276', '1', '6', '1', '光蛋', '2023-12-05 20:52:29', '1');
INSERT INTO `abnormal` VALUES ('277', '1', '6', '2', '光蛋', '2023-12-05 20:52:29', '1');
INSERT INTO `abnormal` VALUES ('278', '1', '6', '3', '光蛋', '2023-12-05 20:52:30', '1');
INSERT INTO `abnormal` VALUES ('279', '1', '6', '4', '光蛋', '2023-12-05 20:52:30', '1');
INSERT INTO `abnormal` VALUES ('280', '1', '6', '5', '光蛋', '2023-12-05 20:52:31', '1');
INSERT INTO `abnormal` VALUES ('281', '1', '6', '6', '光蛋', '2023-12-05 20:52:31', '1');
INSERT INTO `abnormal` VALUES ('282', '1', '6', '1', '弃仔', '2023-12-05 20:52:32', '1');
INSERT INTO `abnormal` VALUES ('283', '1', '6', '2', '弃仔', '2023-12-05 20:52:33', '1');
INSERT INTO `abnormal` VALUES ('284', '1', '6', '3', '弃仔', '2023-12-05 20:52:33', '1');
INSERT INTO `abnormal` VALUES ('285', '1', '6', '4', '弃仔', '2023-12-05 20:52:33', '1');
INSERT INTO `abnormal` VALUES ('286', '1', '6', '5', '弃仔', '2023-12-05 20:52:34', '1');
INSERT INTO `abnormal` VALUES ('287', '1', '6', '6', '弃仔', '2023-12-05 20:52:34', '1');
INSERT INTO `abnormal` VALUES ('288', '1', '6', '1', '弃孵', '2023-12-05 20:52:35', '1');
INSERT INTO `abnormal` VALUES ('289', '1', '6', '2', '弃孵', '2023-12-05 20:52:36', '1');
INSERT INTO `abnormal` VALUES ('290', '1', '6', '3', '弃孵', '2023-12-05 20:52:36', '1');
INSERT INTO `abnormal` VALUES ('291', '1', '6', '4', '弃孵', '2023-12-05 20:52:37', '1');
INSERT INTO `abnormal` VALUES ('292', '1', '6', '5', '弃孵', '2023-12-05 20:52:37', '1');
INSERT INTO `abnormal` VALUES ('293', '1', '6', '6', '弃孵', '2023-12-05 20:52:37', '1');
INSERT INTO `abnormal` VALUES ('294', '1', '6', '1', '死亡 种鸽1', '2023-12-05 12:54:12', '1');
INSERT INTO `abnormal` VALUES ('295', '1', '6', '2', '死亡 种鸽1', '2023-12-05 12:54:33', '1');
INSERT INTO `abnormal` VALUES ('296', '1', '6', '3', '死亡 种鸽1', '2023-12-05 12:54:34', '1');
INSERT INTO `abnormal` VALUES ('297', '1', '6', '4', '死亡 种鸽1', '2023-12-05 12:54:33', '1');
INSERT INTO `abnormal` VALUES ('298', '1', '6', '5', '死亡 种鸽1', '2023-12-05 12:54:34', '1');
INSERT INTO `abnormal` VALUES ('299', '1', '6', '6', '死亡 种鸽1', '2023-12-05 12:54:35', '1');

-- ----------------------------
-- Table structure for cage
-- ----------------------------
DROP TABLE IF EXISTS `cage`;
CREATE TABLE `cage` (
  `id` int NOT NULL AUTO_INCREMENT,
  `site_id` int DEFAULT NULL,
  `house_id` int DEFAULT NULL,
  `cage_id` int DEFAULT NULL,
  `number` int DEFAULT '2',
  `statu` varchar(255) DEFAULT '初始状态',
  `cub_number` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of cage
-- ----------------------------
INSERT INTO `cage` VALUES ('1', '1', '1', '1', '2', '留窝', '0');
INSERT INTO `cage` VALUES ('2', '1', '1', '2', '2', '带仔中', '4');
INSERT INTO `cage` VALUES ('3', '1', '1', '3', '2', '预抽蛋', '0');
INSERT INTO `cage` VALUES ('4', '1', '1', '4', '2', '留窝', '4');
INSERT INTO `cage` VALUES ('5', '1', '1', '5', '2', '留窝', '0');
INSERT INTO `cage` VALUES ('6', '1', '1', '6', '2', '预抽蛋', '3');
INSERT INTO `cage` VALUES ('7', '1', '2', '1', '2', '带仔中', '4');
INSERT INTO `cage` VALUES ('8', '1', '2', '2', '2', '预抽蛋', '3');
INSERT INTO `cage` VALUES ('9', '1', '2', '3', '2', '预抽蛋', '0');
INSERT INTO `cage` VALUES ('10', '1', '2', '4', '2', '预抽蛋', '1');
INSERT INTO `cage` VALUES ('11', '1', '2', '5', '2', '抽蛋', '4');
INSERT INTO `cage` VALUES ('12', '1', '2', '6', '2', '带仔中', '4');
INSERT INTO `cage` VALUES ('13', '1', '3', '1', '2', '带仔中', '1');
INSERT INTO `cage` VALUES ('14', '1', '3', '2', '2', '预抽蛋', '3');
INSERT INTO `cage` VALUES ('15', '1', '3', '3', '2', '初始状态', '0');
INSERT INTO `cage` VALUES ('16', '1', '3', '4', '2', '预抽蛋', '0');
INSERT INTO `cage` VALUES ('17', '1', '3', '5', '2', '预抽蛋', '0');
INSERT INTO `cage` VALUES ('18', '1', '3', '6', '2', '抽蛋', '4');
INSERT INTO `cage` VALUES ('19', '1', '4', '1', '2', '预抽蛋', '0');
INSERT INTO `cage` VALUES ('20', '1', '4', '2', '2', '初始状态', '0');
INSERT INTO `cage` VALUES ('21', '1', '4', '3', '2', '初始状态', '0');
INSERT INTO `cage` VALUES ('22', '1', '4', '4', '2', '初始状态', '0');
INSERT INTO `cage` VALUES ('23', '1', '4', '5', '2', '初始状态', '0');
INSERT INTO `cage` VALUES ('24', '1', '4', '6', '2', '初始状态', '0');
INSERT INTO `cage` VALUES ('25', '1', '5', '1', '1', '预抽蛋', '0');
INSERT INTO `cage` VALUES ('26', '1', '5', '2', '2', '预抽蛋', '3');
INSERT INTO `cage` VALUES ('27', '1', '5', '3', '2', '抽蛋', '0');
INSERT INTO `cage` VALUES ('28', '1', '5', '4', '2', '初始状态', '0');
INSERT INTO `cage` VALUES ('29', '1', '5', '5', '1', '预抽蛋', '0');
INSERT INTO `cage` VALUES ('30', '1', '5', '6', '2', '抽蛋', '4');
INSERT INTO `cage` VALUES ('31', '1', '6', '1', '2', '带仔中', '4');
INSERT INTO `cage` VALUES ('32', '1', '6', '2', '2', '预抽蛋', '3');
INSERT INTO `cage` VALUES ('33', '1', '6', '3', '2', '带仔中', '4');
INSERT INTO `cage` VALUES ('34', '1', '6', '4', '1', '预抽蛋', '0');
INSERT INTO `cage` VALUES ('35', '1', '6', '5', '2', '留窝', '4');
INSERT INTO `cage` VALUES ('36', '1', '6', '6', '2', '预抽蛋', '0');
INSERT INTO `cage` VALUES ('37', '1', '7', '1', '2', '预抽蛋', '3');
INSERT INTO `cage` VALUES ('38', '1', '7', '2', '2', '抽蛋', '0');
INSERT INTO `cage` VALUES ('39', '1', '7', '3', '2', '预抽蛋', '0');
INSERT INTO `cage` VALUES ('40', '1', '7', '4', '2', '抽蛋', '0');
INSERT INTO `cage` VALUES ('41', '1', '7', '5', '2', '预抽蛋', '4');
INSERT INTO `cage` VALUES ('42', '1', '7', '6', '2', '带仔中', '4');
INSERT INTO `cage` VALUES ('43', '1', '8', '1', '2', '抽蛋', '3');
INSERT INTO `cage` VALUES ('44', '1', '8', '2', '2', '预抽蛋', '0');
INSERT INTO `cage` VALUES ('45', '1', '8', '3', '2', '预抽蛋', '0');
INSERT INTO `cage` VALUES ('46', '1', '8', '4', '2', '预抽蛋', '0');
INSERT INTO `cage` VALUES ('47', '1', '8', '5', '2', '带仔中', '4');
INSERT INTO `cage` VALUES ('48', '1', '8', '6', '2', '带仔中', '3');
INSERT INTO `cage` VALUES ('49', '1', '9', '1', '2', '抽蛋', '0');
INSERT INTO `cage` VALUES ('50', '1', '9', '2', '2', '预抽蛋', '4');
INSERT INTO `cage` VALUES ('51', '1', '9', '3', '2', '预抽蛋', '0');
INSERT INTO `cage` VALUES ('52', '1', '9', '4', '2', '预抽蛋', '4');
INSERT INTO `cage` VALUES ('53', '1', '9', '5', '2', '预抽蛋', '0');
INSERT INTO `cage` VALUES ('54', '1', '9', '6', '2', '抽蛋', '4');
INSERT INTO `cage` VALUES ('55', '1', '10', '1', '2', '留窝', '0');
INSERT INTO `cage` VALUES ('56', '1', '10', '2', '2', '留窝', '0');
INSERT INTO `cage` VALUES ('57', '1', '10', '3', '2', '预抽蛋', '3');
INSERT INTO `cage` VALUES ('58', '1', '10', '4', '2', '留窝', '4');
INSERT INTO `cage` VALUES ('59', '1', '10', '5', '2', '预抽蛋', '2');
INSERT INTO `cage` VALUES ('60', '1', '10', '6', '2', '预抽蛋', '4');
INSERT INTO `cage` VALUES ('61', '1', '11', '1', '2', '带仔中', '4');
INSERT INTO `cage` VALUES ('62', '1', '11', '2', '2', '预抽蛋', '0');
INSERT INTO `cage` VALUES ('63', '1', '11', '3', '2', '预抽蛋', '4');
INSERT INTO `cage` VALUES ('64', '1', '11', '4', '2', '预抽蛋', '0');
INSERT INTO `cage` VALUES ('65', '1', '11', '5', '2', '预抽蛋', '0');
INSERT INTO `cage` VALUES ('66', '1', '11', '6', '2', '带仔中', '2');
INSERT INTO `cage` VALUES ('67', '1', '12', '1', '2', '初始状态', '0');
INSERT INTO `cage` VALUES ('68', '1', '12', '2', '2', '初始状态', '0');
INSERT INTO `cage` VALUES ('69', '1', '12', '3', '2', '初始状态', '0');
INSERT INTO `cage` VALUES ('70', '1', '12', '4', '2', '初始状态', '0');
INSERT INTO `cage` VALUES ('71', '1', '12', '5', '2', '初始状态', '0');
INSERT INTO `cage` VALUES ('72', '1', '12', '6', '2', '初始状态', '0');

-- ----------------------------
-- Table structure for count
-- ----------------------------
DROP TABLE IF EXISTS `count`;
CREATE TABLE `count` (
  `id` int NOT NULL AUTO_INCREMENT,
  `site_id` int DEFAULT NULL,
  `death_sum` int DEFAULT NULL,
  `day_death` int DEFAULT '0',
  `time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of count
-- ----------------------------
INSERT INTO `count` VALUES ('1', '1', '2', '2', '2023-11-26 22:25:46');
INSERT INTO `count` VALUES ('2', '1', '7', '5', '2023-11-28 20:57:18');
INSERT INTO `count` VALUES ('3', '1', '9', '2', '2023-11-29 20:51:46');
INSERT INTO `count` VALUES ('4', '1', '16', '7', '2023-12-01 12:22:35');
INSERT INTO `count` VALUES ('5', '1', '20', '4', '2023-12-02 08:59:58');
INSERT INTO `count` VALUES ('6', '1', '23', '3', '2023-12-03 09:00:12');
INSERT INTO `count` VALUES ('7', '1', '25', '2', '2023-12-04 09:11:26');
INSERT INTO `count` VALUES ('8', '1', '31', '6', '2023-12-05 09:00:54');

-- ----------------------------
-- Table structure for cub
-- ----------------------------
DROP TABLE IF EXISTS `cub`;
CREATE TABLE `cub` (
  `id` int NOT NULL AUTO_INCREMENT,
  `site_id` int DEFAULT NULL,
  `house_id` int DEFAULT NULL,
  `cage_id` int DEFAULT NULL,
  `cub_number` int DEFAULT NULL,
  `cub_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of cub
-- ----------------------------
INSERT INTO `cub` VALUES ('1', '1', '2', '5', '4', '2023-11-26 22:25:19');
INSERT INTO `cub` VALUES ('2', '1', '2', '2', '4', '2023-11-26 22:25:28');
INSERT INTO `cub` VALUES ('3', '1', '5', '4', '0', '2023-11-28 20:32:07');

-- ----------------------------
-- Table structure for death
-- ----------------------------
DROP TABLE IF EXISTS `death`;
CREATE TABLE `death` (
  `id` int NOT NULL AUTO_INCREMENT,
  `site_id` int DEFAULT NULL,
  `house_id` int DEFAULT NULL,
  `cage_id` int DEFAULT NULL,
  `old_number` int DEFAULT NULL,
  `young_number` int DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of death
-- ----------------------------
INSERT INTO `death` VALUES ('1', '1', '2', '2', '1', '1', '2023-11-26 22:25:46');
INSERT INTO `death` VALUES ('2', '1', '10', '5', '0', '2', '2023-11-28 20:57:18');
INSERT INTO `death` VALUES ('3', '1', '11', '6', '1', '2', '2023-11-28 21:15:45');
INSERT INTO `death` VALUES ('4', '1', '3', '1', '0', '1', '2023-11-29 20:51:46');
INSERT INTO `death` VALUES ('5', '1', '3', '1', '0', '1', '2023-11-29 20:52:12');
INSERT INTO `death` VALUES ('6', '1', '1', '2', '2', '0', '2023-12-01 12:22:35');
INSERT INTO `death` VALUES ('7', '1', '5', '1', '1', '0', '2023-12-01 12:22:49');
INSERT INTO `death` VALUES ('8', '1', '5', '5', '1', '0', '2023-12-01 12:22:53');
INSERT INTO `death` VALUES ('9', '1', '6', '4', '1', '0', '2023-12-01 12:23:11');
INSERT INTO `death` VALUES ('10', '1', '6', '3', '2', '0', '2023-12-01 12:23:14');

-- ----------------------------
-- Table structure for egg
-- ----------------------------
DROP TABLE IF EXISTS `egg`;
CREATE TABLE `egg` (
  `id` int NOT NULL AUTO_INCREMENT,
  `site_id` int DEFAULT NULL,
  `house_id` int DEFAULT NULL,
  `cage_id` int DEFAULT NULL,
  `egg_time` datetime DEFAULT NULL,
  `statu` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=144 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of egg
-- ----------------------------
INSERT INTO `egg` VALUES ('1', '1', '1', '2', '2023-11-26 22:19:10', '1');
INSERT INTO `egg` VALUES ('2', '1', '1', '6', '2023-11-26 22:19:13', '1');
INSERT INTO `egg` VALUES ('3', '1', '2', '5', '2023-11-26 22:20:03', '1');
INSERT INTO `egg` VALUES ('4', '1', '2', '3', '2023-11-26 22:20:03', '1');
INSERT INTO `egg` VALUES ('5', '1', '2', '4', '2023-11-26 22:20:04', '1');
INSERT INTO `egg` VALUES ('6', '1', '2', '1', '2023-11-26 22:20:18', '1');
INSERT INTO `egg` VALUES ('7', '1', '3', '2', '2023-11-26 22:22:07', '1');
INSERT INTO `egg` VALUES ('8', '1', '3', '5', '2023-11-26 22:22:07', '1');
INSERT INTO `egg` VALUES ('9', '1', '3', '6', '2023-11-26 22:22:08', '1');
INSERT INTO `egg` VALUES ('10', '1', '5', '1', '2023-11-28 20:26:42', '1');
INSERT INTO `egg` VALUES ('11', '1', '5', '4', '2023-11-28 20:26:58', '1');
INSERT INTO `egg` VALUES ('12', '1', '5', '2', '2023-11-28 20:27:04', '1');
INSERT INTO `egg` VALUES ('13', '1', '5', '6', '2023-11-28 20:27:09', '1');
INSERT INTO `egg` VALUES ('14', '1', '6', '1', '2023-11-28 20:28:07', '1');
INSERT INTO `egg` VALUES ('15', '1', '6', '4', '2023-11-28 20:35:47', '1');
INSERT INTO `egg` VALUES ('16', '1', '6', '2', '2023-11-28 20:35:49', '1');
INSERT INTO `egg` VALUES ('17', '1', '6', '5', '2023-11-28 20:35:50', '1');
INSERT INTO `egg` VALUES ('18', '1', '6', '3', '2023-11-28 20:35:50', '1');
INSERT INTO `egg` VALUES ('19', '1', '6', '6', '2023-11-28 20:35:51', '1');
INSERT INTO `egg` VALUES ('20', '1', '7', '4', '2023-11-28 20:47:03', '1');
INSERT INTO `egg` VALUES ('21', '1', '7', '2', '2023-11-28 20:47:05', '1');
INSERT INTO `egg` VALUES ('22', '1', '8', '1', '2023-11-28 20:51:14', '2');
INSERT INTO `egg` VALUES ('23', '1', '8', '4', '2023-11-28 20:51:16', '1');
INSERT INTO `egg` VALUES ('24', '1', '8', '6', '2023-11-28 20:51:18', '0');
INSERT INTO `egg` VALUES ('25', '1', '9', '1', '2023-11-28 20:53:46', '1');
INSERT INTO `egg` VALUES ('26', '1', '9', '2', '2023-11-28 20:53:47', '1');
INSERT INTO `egg` VALUES ('27', '1', '9', '6', '2023-11-28 20:53:51', '1');
INSERT INTO `egg` VALUES ('28', '1', '10', '4', '2023-11-28 20:56:11', '1');
INSERT INTO `egg` VALUES ('29', '1', '10', '5', '2023-11-28 20:56:11', '1');
INSERT INTO `egg` VALUES ('30', '1', '10', '6', '2023-11-28 20:56:11', '1');
INSERT INTO `egg` VALUES ('31', '1', '10', '1', '2023-11-28 20:58:15', '1');
INSERT INTO `egg` VALUES ('32', '1', '2', '5', '2023-11-28 20:59:35', '1');
INSERT INTO `egg` VALUES ('33', '1', '2', '6', '2023-11-28 21:04:07', '1');
INSERT INTO `egg` VALUES ('34', '1', '1', '1', '2023-11-28 21:07:55', '1');
INSERT INTO `egg` VALUES ('35', '1', '1', '6', '2023-11-28 21:07:58', '1');
INSERT INTO `egg` VALUES ('36', '1', '11', '3', '2023-11-28 21:13:56', '1');
INSERT INTO `egg` VALUES ('37', '1', '11', '6', '2023-11-28 21:13:57', '1');
INSERT INTO `egg` VALUES ('38', '1', '5', '1', '2023-11-29 20:05:58', '1');
INSERT INTO `egg` VALUES ('39', '1', '5', '2', '2023-11-29 20:28:46', '1');
INSERT INTO `egg` VALUES ('40', '1', '5', '5', '2023-11-29 20:32:22', '1');
INSERT INTO `egg` VALUES ('41', '1', '5', '6', '2023-11-29 20:32:22', '1');
INSERT INTO `egg` VALUES ('42', '1', '6', '1', '2023-11-29 20:36:52', '1');
INSERT INTO `egg` VALUES ('43', '1', '7', '1', '2023-11-29 20:39:00', '1');
INSERT INTO `egg` VALUES ('44', '1', '7', '5', '2023-11-29 20:39:02', '1');
INSERT INTO `egg` VALUES ('45', '1', '8', '5', '2023-11-29 20:41:25', '1');
INSERT INTO `egg` VALUES ('46', '1', '8', '3', '2023-11-29 20:41:26', '1');
INSERT INTO `egg` VALUES ('47', '1', '9', '6', '2023-11-29 20:42:39', '1');
INSERT INTO `egg` VALUES ('48', '1', '9', '4', '2023-11-29 20:42:41', '1');
INSERT INTO `egg` VALUES ('49', '1', '10', '4', '2023-11-29 20:47:18', '1');
INSERT INTO `egg` VALUES ('50', '1', '2', '1', '2023-11-29 20:48:19', '1');
INSERT INTO `egg` VALUES ('51', '1', '2', '3', '2023-11-29 20:48:20', '1');
INSERT INTO `egg` VALUES ('52', '1', '1', '4', '2023-11-29 20:49:48', '1');
INSERT INTO `egg` VALUES ('53', '1', '1', '3', '2023-11-29 20:49:49', '1');
INSERT INTO `egg` VALUES ('54', '1', '3', '1', '2023-11-29 20:50:50', '1');
INSERT INTO `egg` VALUES ('55', '1', '3', '6', '2023-11-29 20:50:51', '1');
INSERT INTO `egg` VALUES ('56', '1', '11', '1', '2023-11-29 20:54:47', '1');
INSERT INTO `egg` VALUES ('57', '1', '11', '5', '2023-11-29 20:54:47', '1');
INSERT INTO `egg` VALUES ('58', '1', '10', '2', '2023-11-30 07:27:42', '1');
INSERT INTO `egg` VALUES ('59', '1', '5', '3', '2023-11-30 12:04:46', '1');
INSERT INTO `egg` VALUES ('60', '1', '10', '3', '2023-11-30 12:10:28', '1');
INSERT INTO `egg` VALUES ('61', '1', '5', '1', '2023-11-30 12:44:43', '0');
INSERT INTO `egg` VALUES ('62', '1', '5', '2', '2023-11-30 12:45:18', '0');
INSERT INTO `egg` VALUES ('63', '1', '5', '5', '2023-11-30 12:45:32', '0');
INSERT INTO `egg` VALUES ('64', '1', '6', '4', '2023-11-30 12:45:49', '0');
INSERT INTO `egg` VALUES ('65', '1', '6', '2', '2023-11-30 12:46:03', '0');
INSERT INTO `egg` VALUES ('66', '1', '6', '6', '2023-11-30 12:46:15', '0');
INSERT INTO `egg` VALUES ('67', '1', '7', '1', '2023-11-30 12:46:34', '0');
INSERT INTO `egg` VALUES ('68', '1', '7', '5', '2023-11-30 12:46:50', '0');
INSERT INTO `egg` VALUES ('69', '1', '7', '3', '2023-11-30 12:47:36', '0');
INSERT INTO `egg` VALUES ('70', '1', '8', '4', '2023-11-30 12:47:53', '0');
INSERT INTO `egg` VALUES ('71', '1', '8', '2', '2023-11-30 12:48:01', '0');
INSERT INTO `egg` VALUES ('72', '1', '8', '3', '2023-11-30 12:48:17', '0');
INSERT INTO `egg` VALUES ('73', '1', '9', '4', '2023-11-30 12:48:52', '0');
INSERT INTO `egg` VALUES ('74', '1', '9', '2', '2023-11-30 12:48:56', '0');
INSERT INTO `egg` VALUES ('75', '1', '9', '5', '2023-11-30 12:49:03', '0');
INSERT INTO `egg` VALUES ('76', '1', '9', '3', '2023-11-30 12:49:10', '0');
INSERT INTO `egg` VALUES ('77', '1', '10', '1', '2023-11-30 12:49:21', '2');
INSERT INTO `egg` VALUES ('78', '1', '10', '5', '2023-11-30 12:55:26', '0');
INSERT INTO `egg` VALUES ('79', '1', '10', '3', '2023-11-30 12:55:31', '0');
INSERT INTO `egg` VALUES ('80', '1', '2', '4', '2023-11-30 12:55:50', '0');
INSERT INTO `egg` VALUES ('81', '1', '2', '2', '2023-11-30 12:57:10', '0');
INSERT INTO `egg` VALUES ('82', '1', '2', '3', '2023-11-30 12:57:16', '0');
INSERT INTO `egg` VALUES ('83', '1', '1', '1', '2023-11-30 12:57:27', '2');
INSERT INTO `egg` VALUES ('84', '1', '1', '2', '2023-12-02 22:19:10', '1');
INSERT INTO `egg` VALUES ('85', '1', '1', '6', '2023-11-30 12:58:41', '0');
INSERT INTO `egg` VALUES ('86', '1', '3', '4', '2023-11-30 12:58:54', '0');
INSERT INTO `egg` VALUES ('87', '1', '3', '2', '2023-11-30 12:59:03', '0');
INSERT INTO `egg` VALUES ('88', '1', '3', '5', '2023-11-30 12:59:09', '0');
INSERT INTO `egg` VALUES ('89', '1', '11', '4', '2023-11-30 12:59:25', '0');
INSERT INTO `egg` VALUES ('90', '1', '11', '2', '2023-11-30 12:59:33', '0');
INSERT INTO `egg` VALUES ('91', '1', '11', '5', '2023-11-30 12:59:38', '0');
INSERT INTO `egg` VALUES ('92', '1', '11', '3', '2023-11-30 12:59:43', '0');
INSERT INTO `egg` VALUES ('93', '1', '10', '4', '2023-12-01 12:21:46', '2');
INSERT INTO `egg` VALUES ('94', '1', '10', '2', '2023-12-01 12:21:48', '2');
INSERT INTO `egg` VALUES ('95', '1', '10', '1', '2023-12-01 12:21:50', '2');
INSERT INTO `egg` VALUES ('96', '1', '10', '1', '2023-12-01 12:21:50', '2');
INSERT INTO `egg` VALUES ('97', '1', '10', '1', '2023-12-01 12:21:51', '2');
INSERT INTO `egg` VALUES ('98', '1', '10', '1', '2023-12-01 12:21:51', '2');
INSERT INTO `egg` VALUES ('99', '1', '10', '1', '2023-12-01 12:21:51', '2');
INSERT INTO `egg` VALUES ('100', '1', '10', '1', '2023-12-01 12:21:52', '2');
INSERT INTO `egg` VALUES ('101', '1', '10', '6', '2023-12-01 12:21:57', '0');
INSERT INTO `egg` VALUES ('102', '1', '10', '2', '2023-12-01 12:21:59', '2');
INSERT INTO `egg` VALUES ('103', '1', '10', '4', '2023-12-01 12:22:01', '2');
INSERT INTO `egg` VALUES ('104', '1', '10', '4', '2023-12-01 12:22:02', '2');
INSERT INTO `egg` VALUES ('105', '1', '10', '4', '2023-12-01 12:22:02', '2');
INSERT INTO `egg` VALUES ('106', '1', '6', '5', '2023-12-01 12:23:56', '2');
INSERT INTO `egg` VALUES ('107', '1', '6', '3', '2023-12-01 12:24:04', '2');
INSERT INTO `egg` VALUES ('108', '1', '1', '5', '2023-12-01 12:24:14', '2');
INSERT INTO `egg` VALUES ('109', '1', '1', '5', '2023-12-01 12:24:15', '2');
INSERT INTO `egg` VALUES ('110', '1', '1', '5', '2023-12-01 12:24:16', '2');
INSERT INTO `egg` VALUES ('111', '1', '1', '5', '2023-12-01 12:24:16', '2');
INSERT INTO `egg` VALUES ('112', '1', '1', '5', '2023-12-01 12:24:16', '2');
INSERT INTO `egg` VALUES ('113', '1', '1', '5', '2023-12-01 12:24:16', '2');
INSERT INTO `egg` VALUES ('114', '1', '1', '5', '2023-12-01 12:24:17', '2');
INSERT INTO `egg` VALUES ('115', '1', '1', '5', '2023-12-01 12:24:17', '2');
INSERT INTO `egg` VALUES ('116', '1', '1', '5', '2023-12-01 12:24:17', '2');
INSERT INTO `egg` VALUES ('117', '1', '1', '5', '2023-12-01 12:24:18', '2');
INSERT INTO `egg` VALUES ('118', '1', '1', '5', '2023-12-01 12:24:18', '2');
INSERT INTO `egg` VALUES ('119', '1', '1', '5', '2023-12-01 12:24:18', '2');
INSERT INTO `egg` VALUES ('120', '1', '1', '5', '2023-12-01 12:24:18', '2');
INSERT INTO `egg` VALUES ('121', '1', '1', '3', '2023-12-01 12:24:19', '2');
INSERT INTO `egg` VALUES ('122', '1', '1', '3', '2023-12-01 12:24:19', '2');
INSERT INTO `egg` VALUES ('123', '1', '1', '3', '2023-12-01 12:24:19', '2');
INSERT INTO `egg` VALUES ('124', '1', '1', '3', '2023-12-01 12:24:22', '0');
INSERT INTO `egg` VALUES ('125', '1', '1', '5', '2023-12-01 12:24:24', '2');
INSERT INTO `egg` VALUES ('126', '1', '1', '4', '2023-12-01 12:24:31', '2');
INSERT INTO `egg` VALUES ('127', '1', '1', '1', '2023-12-01 12:30:48', '2');
INSERT INTO `egg` VALUES ('139', '1', '1', '1', '2023-12-01 12:31:03', '2');
INSERT INTO `egg` VALUES ('140', '1', '1', '1', '2023-12-01 12:32:04', '0');
INSERT INTO `egg` VALUES ('141', '1', '4', '1', '2023-12-01 12:35:17', '0');
INSERT INTO `egg` VALUES ('142', '1', '1', '2', '2023-12-04 22:19:10', '2');
INSERT INTO `egg` VALUES ('143', '1', '1', '2', '2023-12-04 22:19:10', '2');

-- ----------------------------
-- Table structure for house
-- ----------------------------
DROP TABLE IF EXISTS `house`;
CREATE TABLE `house` (
  `nfc_id` varchar(255) NOT NULL,
  `house_id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`house_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of house
-- ----------------------------
INSERT INTO `house` VALUES ('D3F8DC6E', '1');
INSERT INTO `house` VALUES ('D3EA3CCE', '2');
INSERT INTO `house` VALUES ('D3FA6FAE', '3');
INSERT INTO `house` VALUES ('78CF83D5', '4');
INSERT INTO `house` VALUES ('D3F3CE8E', '5');
INSERT INTO `house` VALUES ('D3FC2A3E', '6');
INSERT INTO `house` VALUES ('D3F3499E', '7');
INSERT INTO `house` VALUES ('D3ED361E', '8');
INSERT INTO `house` VALUES ('78A831D5', '9');
INSERT INTO `house` VALUES ('D3F0AA8E', '10');
INSERT INTO `house` VALUES ('D3F064AE', '11');
INSERT INTO `house` VALUES ('1869F44F', '12');

-- ----------------------------
-- Table structure for put
-- ----------------------------
DROP TABLE IF EXISTS `put`;
CREATE TABLE `put` (
  `id` int NOT NULL AUTO_INCREMENT,
  `site_id` int DEFAULT NULL,
  `house_id` int DEFAULT NULL,
  `cage_id` int DEFAULT NULL,
  `put_number` int DEFAULT NULL,
  `put_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of put
-- ----------------------------
INSERT INTO `put` VALUES ('1', '1', '1', '6', '3', '2023-11-26 22:19:40');
INSERT INTO `put` VALUES ('2', '1', '2', '1', '3', '2023-11-26 22:21:11');
INSERT INTO `put` VALUES ('3', '1', '2', '4', '1', '2023-11-26 22:21:12');
INSERT INTO `put` VALUES ('4', '1', '2', '5', '4', '2023-11-26 22:21:14');
INSERT INTO `put` VALUES ('5', '1', '5', '4', '3', '2023-11-28 20:30:47');
INSERT INTO `put` VALUES ('6', '1', '5', '6', '4', '2023-11-28 20:31:16');
INSERT INTO `put` VALUES ('7', '1', '6', '5', '4', '2023-11-28 20:44:18');
INSERT INTO `put` VALUES ('8', '1', '7', '6', '4', '2023-11-28 20:48:09');
INSERT INTO `put` VALUES ('9', '1', '8', '1', '3', '2023-11-28 20:52:10');
INSERT INTO `put` VALUES ('10', '1', '8', '6', '3', '2023-11-28 20:52:11');
INSERT INTO `put` VALUES ('11', '1', '9', '6', '4', '2023-11-28 20:55:06');
INSERT INTO `put` VALUES ('12', '1', '9', '2', '4', '2023-11-28 20:55:07');
INSERT INTO `put` VALUES ('13', '1', '10', '5', '4', '2023-11-28 20:57:08');
INSERT INTO `put` VALUES ('14', '1', '10', '6', '4', '2023-11-28 20:57:08');
INSERT INTO `put` VALUES ('15', '1', '2', '6', '4', '2023-11-28 21:04:35');
INSERT INTO `put` VALUES ('16', '1', '3', '6', '4', '2023-11-28 21:10:04');
INSERT INTO `put` VALUES ('17', '1', '3', '2', '3', '2023-11-28 21:10:15');
INSERT INTO `put` VALUES ('18', '1', '11', '6', '4', '2023-11-28 21:15:25');
INSERT INTO `put` VALUES ('19', '1', '11', '3', '4', '2023-11-28 21:15:28');
INSERT INTO `put` VALUES ('20', '1', '5', '2', '3', '2023-11-29 20:33:20');
INSERT INTO `put` VALUES ('21', '1', '5', '2', '3', '2023-11-29 20:33:38');
INSERT INTO `put` VALUES ('22', '1', '6', '2', '3', '2023-11-29 20:38:02');
INSERT INTO `put` VALUES ('23', '1', '6', '1', '4', '2023-11-29 20:38:07');
INSERT INTO `put` VALUES ('24', '1', '7', '1', '3', '2023-11-29 20:39:39');
INSERT INTO `put` VALUES ('25', '1', '7', '5', '4', '2023-11-29 20:40:26');
INSERT INTO `put` VALUES ('26', '1', '8', '5', '4', '2023-11-29 20:42:05');
INSERT INTO `put` VALUES ('27', '1', '9', '4', '4', '2023-11-29 20:43:25');
INSERT INTO `put` VALUES ('28', '1', '10', '4', '4', '2023-11-29 20:47:43');
INSERT INTO `put` VALUES ('29', '1', '2', '1', '4', '2023-11-29 20:48:43');
INSERT INTO `put` VALUES ('30', '1', '1', '4', '4', '2023-11-29 20:50:15');
INSERT INTO `put` VALUES ('31', '1', '3', '1', '3', '2023-11-29 20:51:37');
INSERT INTO `put` VALUES ('32', '1', '11', '1', '4', '2023-11-29 20:55:03');
INSERT INTO `put` VALUES ('33', '1', '10', '3', '3', '2023-11-30 12:18:11');

-- ----------------------------
-- Table structure for stay
-- ----------------------------
DROP TABLE IF EXISTS `stay`;
CREATE TABLE `stay` (
  `id` int NOT NULL AUTO_INCREMENT,
  `site_id` int DEFAULT NULL,
  `house_id` int DEFAULT NULL,
  `cage_id` int DEFAULT NULL,
  `stay_time` datetime DEFAULT NULL,
  `statu` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of stay
-- ----------------------------
INSERT INTO `stay` VALUES ('1', '1', '1', '6', '2023-11-26 22:19:13', '1');
INSERT INTO `stay` VALUES ('2', '1', '2', '4', '2023-11-26 22:20:04', '1');
INSERT INTO `stay` VALUES ('3', '1', '2', '5', '2023-11-26 22:20:03', '1');
INSERT INTO `stay` VALUES ('4', '1', '2', '1', '2023-11-26 22:20:18', '1');
INSERT INTO `stay` VALUES ('5', '1', '5', '4', '2023-11-28 20:26:58', '1');
INSERT INTO `stay` VALUES ('6', '1', '5', '6', '2023-11-28 20:27:09', '1');
INSERT INTO `stay` VALUES ('7', '1', '6', '2', '2023-11-28 20:35:49', '1');
INSERT INTO `stay` VALUES ('8', '1', '6', '5', '2023-11-28 20:35:50', '1');
INSERT INTO `stay` VALUES ('9', '1', '9', '2', '2023-11-28 20:53:47', '1');
INSERT INTO `stay` VALUES ('10', '1', '9', '6', '2023-11-28 20:53:51', '1');
INSERT INTO `stay` VALUES ('11', '1', '10', '5', '2023-11-28 20:56:11', '1');
INSERT INTO `stay` VALUES ('12', '1', '10', '6', '2023-11-28 20:56:11', '1');
INSERT INTO `stay` VALUES ('13', '1', '2', '6', '2023-11-28 21:04:07', '1');
INSERT INTO `stay` VALUES ('14', '1', '3', '2', '2023-11-26 22:22:07', '1');
INSERT INTO `stay` VALUES ('15', '1', '3', '6', '2023-11-26 22:22:08', '1');
INSERT INTO `stay` VALUES ('16', '1', '11', '3', '2023-11-28 21:13:56', '1');
INSERT INTO `stay` VALUES ('17', '1', '11', '6', '2023-11-28 21:13:57', '1');
INSERT INTO `stay` VALUES ('18', '1', '5', '2', '2023-11-29 20:28:46', '1');
INSERT INTO `stay` VALUES ('19', '1', '6', '1', '2023-11-29 20:36:52', '1');
INSERT INTO `stay` VALUES ('20', '1', '7', '5', '2023-11-29 20:39:02', '1');
INSERT INTO `stay` VALUES ('21', '1', '7', '1', '2023-11-29 20:39:00', '1');
INSERT INTO `stay` VALUES ('22', '1', '8', '5', '2023-11-29 20:41:25', '1');
INSERT INTO `stay` VALUES ('23', '1', '9', '4', '2023-11-29 20:42:41', '1');
INSERT INTO `stay` VALUES ('24', '1', '10', '4', '2023-11-29 20:47:18', '1');
INSERT INTO `stay` VALUES ('25', '1', '2', '1', '2023-11-29 20:48:19', '1');
INSERT INTO `stay` VALUES ('26', '1', '1', '4', '2023-11-29 20:49:48', '1');
INSERT INTO `stay` VALUES ('27', '1', '3', '1', '2023-11-29 20:50:50', '1');
INSERT INTO `stay` VALUES ('28', '1', '11', '1', '2023-11-29 20:54:47', '1');
INSERT INTO `stay` VALUES ('29', '1', '10', '2', '2023-11-30 07:27:42', '0');
INSERT INTO `stay` VALUES ('30', '1', '10', '3', '2023-11-30 12:10:28', '1');
INSERT INTO `stay` VALUES ('31', '1', '10', '4', '2023-12-01 12:21:46', '0');
INSERT INTO `stay` VALUES ('32', '1', '10', '2', '2023-12-01 12:21:48', '0');
INSERT INTO `stay` VALUES ('33', '1', '10', '1', '2023-12-01 12:21:49', '0');
INSERT INTO `stay` VALUES ('34', '1', '10', '1', '2023-12-01 12:21:50', '0');
INSERT INTO `stay` VALUES ('35', '1', '10', '1', '2023-12-01 12:21:50', '0');
INSERT INTO `stay` VALUES ('36', '1', '10', '1', '2023-12-01 12:21:51', '0');
INSERT INTO `stay` VALUES ('37', '1', '10', '1', '2023-12-01 12:21:51', '0');
INSERT INTO `stay` VALUES ('38', '1', '10', '1', '2023-12-01 12:21:51', '0');
INSERT INTO `stay` VALUES ('39', '1', '10', '2', '2023-12-01 12:21:59', '0');
INSERT INTO `stay` VALUES ('40', '1', '10', '4', '2023-12-01 12:22:01', '0');
INSERT INTO `stay` VALUES ('41', '1', '10', '4', '2023-12-01 12:22:02', '0');
INSERT INTO `stay` VALUES ('42', '1', '10', '4', '2023-12-01 12:22:02', '0');
INSERT INTO `stay` VALUES ('43', '1', '10', '1', '2023-12-01 12:22:03', '0');
INSERT INTO `stay` VALUES ('44', '1', '6', '5', '2023-12-01 12:23:56', '0');
INSERT INTO `stay` VALUES ('45', '1', '6', '3', '2023-12-01 12:24:04', '0');
INSERT INTO `stay` VALUES ('46', '1', '1', '5', '2023-12-01 12:24:14', '0');
INSERT INTO `stay` VALUES ('47', '1', '1', '5', '2023-12-01 12:24:15', '0');
INSERT INTO `stay` VALUES ('48', '1', '1', '5', '2023-12-01 12:24:16', '0');
INSERT INTO `stay` VALUES ('49', '1', '1', '5', '2023-12-01 12:24:16', '0');
INSERT INTO `stay` VALUES ('50', '1', '1', '5', '2023-12-01 12:24:16', '0');
INSERT INTO `stay` VALUES ('51', '1', '1', '5', '2023-12-01 12:24:16', '0');
INSERT INTO `stay` VALUES ('52', '1', '1', '5', '2023-12-01 12:24:17', '0');
INSERT INTO `stay` VALUES ('53', '1', '1', '5', '2023-12-01 12:24:17', '0');
INSERT INTO `stay` VALUES ('54', '1', '1', '5', '2023-12-01 12:24:17', '0');
INSERT INTO `stay` VALUES ('55', '1', '1', '5', '2023-12-01 12:24:18', '0');
INSERT INTO `stay` VALUES ('56', '1', '1', '5', '2023-12-01 12:24:18', '0');
INSERT INTO `stay` VALUES ('57', '1', '1', '5', '2023-12-01 12:24:18', '0');
INSERT INTO `stay` VALUES ('58', '1', '1', '5', '2023-12-01 12:24:18', '0');
INSERT INTO `stay` VALUES ('59', '1', '1', '3', '2023-12-01 12:24:19', '0');
INSERT INTO `stay` VALUES ('60', '1', '1', '3', '2023-12-01 12:24:19', '0');
INSERT INTO `stay` VALUES ('61', '1', '1', '3', '2023-12-01 12:24:19', '0');
INSERT INTO `stay` VALUES ('62', '1', '1', '5', '2023-12-01 12:24:24', '0');
INSERT INTO `stay` VALUES ('63', '1', '1', '4', '2023-12-01 12:24:31', '0');
INSERT INTO `stay` VALUES ('64', '1', '1', '1', '2023-12-01 12:30:47', '0');
INSERT INTO `stay` VALUES ('65', '1', '1', '1', '2023-12-01 12:30:48', '0');
INSERT INTO `stay` VALUES ('66', '1', '1', '1', '2023-12-01 12:30:49', '0');
INSERT INTO `stay` VALUES ('67', '1', '1', '1', '2023-12-01 12:30:49', '0');
INSERT INTO `stay` VALUES ('68', '1', '1', '1', '2023-12-01 12:30:49', '0');
INSERT INTO `stay` VALUES ('69', '1', '1', '1', '2023-12-01 12:30:49', '0');
INSERT INTO `stay` VALUES ('70', '1', '1', '1', '2023-12-01 12:30:49', '0');
INSERT INTO `stay` VALUES ('71', '1', '1', '1', '2023-12-01 12:30:55', '0');
INSERT INTO `stay` VALUES ('72', '1', '1', '1', '2023-12-01 12:30:55', '0');
INSERT INTO `stay` VALUES ('73', '1', '1', '1', '2023-12-01 12:30:55', '0');
INSERT INTO `stay` VALUES ('74', '1', '1', '1', '2023-12-01 12:30:55', '0');
INSERT INTO `stay` VALUES ('75', '1', '1', '1', '2023-12-01 12:30:55', '0');
INSERT INTO `stay` VALUES ('76', '1', '1', '1', '2023-12-01 12:30:55', '0');

-- ----------------------------
-- Table structure for sum
-- ----------------------------
DROP TABLE IF EXISTS `sum`;
CREATE TABLE `sum` (
  `id` int NOT NULL AUTO_INCREMENT,
  `site_id` int DEFAULT NULL,
  `cub_death_sum` int DEFAULT NULL,
  `mature_sum` int DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of sum
-- ----------------------------
INSERT INTO `sum` VALUES ('1', '1', '10', '300', '2023-11-27 10:21:30');
INSERT INTO `sum` VALUES ('2', '1', '14', null, '2023-11-28 10:22:16');
INSERT INTO `sum` VALUES ('3', '1', '10', null, '2023-11-29 10:22:40');
INSERT INTO `sum` VALUES ('4', '1', '14', null, '2023-11-30 10:22:48');
INSERT INTO `sum` VALUES ('5', '1', '34', '305', '2023-12-01 10:23:11');
INSERT INTO `sum` VALUES ('6', null, null, null, '2023-12-01 10:23:11');
INSERT INTO `sum` VALUES ('9', '1', '0', '0', '2023-12-02 10:23:11');

-- ----------------------------
-- Table structure for whipping
-- ----------------------------
DROP TABLE IF EXISTS `whipping`;
CREATE TABLE `whipping` (
  `id` int NOT NULL AUTO_INCREMENT,
  `site_id` int DEFAULT NULL,
  `house_id` int DEFAULT NULL,
  `cage_id` int DEFAULT NULL,
  `whipping_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of whipping
-- ----------------------------
INSERT INTO `whipping` VALUES ('1', '1', '1', '2', '2023-11-26 22:19:18');
INSERT INTO `whipping` VALUES ('2', '1', '2', '3', '2023-11-26 22:20:08');
INSERT INTO `whipping` VALUES ('3', '1', '5', '1', '2023-11-28 20:28:16');
INSERT INTO `whipping` VALUES ('4', '1', '5', '2', '2023-11-28 20:28:16');
INSERT INTO `whipping` VALUES ('5', '1', '6', '6', '2023-11-28 20:37:17');
INSERT INTO `whipping` VALUES ('6', '1', '6', '3', '2023-11-28 20:37:17');
INSERT INTO `whipping` VALUES ('7', '1', '6', '4', '2023-11-28 20:37:17');
INSERT INTO `whipping` VALUES ('8', '1', '6', '1', '2023-11-28 20:37:17');
INSERT INTO `whipping` VALUES ('9', '1', '8', '4', '2023-11-28 20:51:31');
INSERT INTO `whipping` VALUES ('10', '1', '9', '1', '2023-11-28 20:54:02');
INSERT INTO `whipping` VALUES ('11', '1', '10', '4', '2023-11-28 20:56:25');
INSERT INTO `whipping` VALUES ('12', '1', '10', '1', '2023-11-28 20:58:28');
INSERT INTO `whipping` VALUES ('13', '1', '2', '5', '2023-11-28 21:04:16');
INSERT INTO `whipping` VALUES ('14', '1', '1', '1', '2023-11-28 21:08:09');
INSERT INTO `whipping` VALUES ('15', '1', '1', '6', '2023-11-28 21:08:09');
INSERT INTO `whipping` VALUES ('16', '1', '3', '5', '2023-11-28 21:09:16');
INSERT INTO `whipping` VALUES ('17', '1', '7', '4', '2023-11-29 20:23:50');
INSERT INTO `whipping` VALUES ('18', '1', '7', '2', '2023-11-29 20:23:50');
INSERT INTO `whipping` VALUES ('19', '1', '5', '1', '2023-11-29 20:32:38');
INSERT INTO `whipping` VALUES ('20', '1', '5', '5', '2023-11-29 20:32:38');
INSERT INTO `whipping` VALUES ('21', '1', '5', '6', '2023-11-29 20:32:38');
INSERT INTO `whipping` VALUES ('22', '1', '8', '3', '2023-11-29 20:41:31');
INSERT INTO `whipping` VALUES ('23', '1', '9', '6', '2023-11-29 20:42:51');
INSERT INTO `whipping` VALUES ('24', '1', '2', '3', '2023-11-29 20:48:23');
INSERT INTO `whipping` VALUES ('25', '1', '1', '3', '2023-11-29 20:49:53');
INSERT INTO `whipping` VALUES ('26', '1', '3', '6', '2023-11-29 20:51:02');
INSERT INTO `whipping` VALUES ('27', '1', '11', '5', '2023-11-29 20:54:56');
INSERT INTO `whipping` VALUES ('28', '1', '5', '3', '2023-11-30 12:04:54');
INSERT INTO `whipping` VALUES ('29', '1', '1', '1', '2023-12-01 12:31:13');
INSERT INTO `whipping` VALUES ('30', '1', '8', '1', '2023-12-01 12:41:35');
INSERT INTO `whipping` VALUES ('31', '1', '4', '1', '2023-12-01 12:44:31');
