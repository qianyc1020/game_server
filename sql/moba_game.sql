/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50168
Source Host           : localhost:3306
Source Database       : moba_game

Target Server Type    : MYSQL
Target Server Version : 50168
File Encoding         : 65001

Date: 2019-11-03 00:36:55
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for login_bonues
-- ----------------------------
DROP TABLE IF EXISTS `login_bonues`;
CREATE TABLE `login_bonues` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户唯一id',
  `uid` int(11) NOT NULL DEFAULT '0' COMMENT '用户uid',
  `bonues` int(11) NOT NULL DEFAULT '0' COMMENT '奖励数目',
  `bonues_time` int(11) NOT NULL DEFAULT '0' COMMENT '发放奖励时间',
  `days` int(11) NOT NULL DEFAULT '0' COMMENT '连续登陆天数',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '状态',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of login_bonues
-- ----------------------------
INSERT INTO `login_bonues` VALUES ('14', '31', '500', '1543594512', '5', '0');
INSERT INTO `login_bonues` VALUES ('15', '52', '100', '1540702082', '1', '0');
INSERT INTO `login_bonues` VALUES ('16', '42', '400', '1543510907', '4', '0');
INSERT INTO `login_bonues` VALUES ('17', '43', '300', '1543509481', '3', '0');
INSERT INTO `login_bonues` VALUES ('18', '57', '300', '1543509389', '3', '0');
INSERT INTO `login_bonues` VALUES ('19', '45', '100', '1543509767', '1', '0');
INSERT INTO `login_bonues` VALUES ('20', '46', '100', '1543511460', '1', '0');
INSERT INTO `login_bonues` VALUES ('21', '47', '0', '1540223637', '0', '1');
INSERT INTO `login_bonues` VALUES ('22', '48', '0', '1540223651', '0', '1');
INSERT INTO `login_bonues` VALUES ('23', '49', '100', '1540702053', '1', '0');
INSERT INTO `login_bonues` VALUES ('24', '58', '0', '1540229097', '0', '1');
INSERT INTO `login_bonues` VALUES ('25', '59', '0', '1540309687', '0', '1');
INSERT INTO `login_bonues` VALUES ('26', '60', '0', '1540314812', '0', '1');
INSERT INTO `login_bonues` VALUES ('27', '61', '0', '1540711862', '0', '1');
INSERT INTO `login_bonues` VALUES ('28', '62', '200', '1542298041', '2', '0');
INSERT INTO `login_bonues` VALUES ('29', '63', '0', '1540713951', '0', '1');
INSERT INTO `login_bonues` VALUES ('30', '64', '100', '1540742578', '1', '0');
INSERT INTO `login_bonues` VALUES ('31', '66', '200', '1543579286', '2', '0');
INSERT INTO `login_bonues` VALUES ('32', '67', '0', '1543419613', '0', '1');
INSERT INTO `login_bonues` VALUES ('33', '44', '200', '1543511151', '2', '0');
INSERT INTO `login_bonues` VALUES ('34', '68', '0', '1543590543', '0', '1');
INSERT INTO `login_bonues` VALUES ('35', '72', '100', '1562943510', '1', '0');
INSERT INTO `login_bonues` VALUES ('36', '70', '200', '1567702983', '2', '0');
INSERT INTO `login_bonues` VALUES ('37', '73', '0', '1543594342', '0', '1');
INSERT INTO `login_bonues` VALUES ('38', '71', '200', '1567702974', '2', '0');
INSERT INTO `login_bonues` VALUES ('39', '74', '200', '1567355113', '2', '0');
INSERT INTO `login_bonues` VALUES ('40', '75', '100', '1567355138', '1', '0');
INSERT INTO `login_bonues` VALUES ('41', '76', '200', '1566057693', '2', '0');
INSERT INTO `login_bonues` VALUES ('42', '77', '0', '1543640566', '0', '1');
INSERT INTO `login_bonues` VALUES ('43', '78', '0', '1544977315', '0', '1');
INSERT INTO `login_bonues` VALUES ('44', '79', '0', '1545148198', '0', '1');
INSERT INTO `login_bonues` VALUES ('45', '80', '200', '1567699504', '2', '0');
INSERT INTO `login_bonues` VALUES ('46', '81', '200', '1557504027', '2', '0');
INSERT INTO `login_bonues` VALUES ('47', '82', '0', '1556122131', '0', '1');
INSERT INTO `login_bonues` VALUES ('48', '83', '100', '1565496583', '1', '0');
INSERT INTO `login_bonues` VALUES ('49', '84', '100', '1566028715', '1', '0');
INSERT INTO `login_bonues` VALUES ('50', '85', '200', '1567699905', '2', '0');
INSERT INTO `login_bonues` VALUES ('51', '86', '100', '1556213579', '1', '0');
INSERT INTO `login_bonues` VALUES ('52', '87', '100', '1556295539', '1', '0');
INSERT INTO `login_bonues` VALUES ('53', '88', '100', '1566031805', '1', '0');
INSERT INTO `login_bonues` VALUES ('54', '89', '0', '1562485666', '0', '1');
INSERT INTO `login_bonues` VALUES ('55', '90', '100', '1567357578', '1', '0');
INSERT INTO `login_bonues` VALUES ('56', '94', '0', '1566062213', '0', '1');

-- ----------------------------
-- Table structure for sys_msg
-- ----------------------------
DROP TABLE IF EXISTS `sys_msg`;
CREATE TABLE `sys_msg` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID，自动增长',
  `msg` varchar(255) DEFAULT '' COMMENT '公告文字',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_msg
-- ----------------------------
INSERT INTO `sys_msg` VALUES ('1', '这是游戏公告啊！');
INSERT INTO `sys_msg` VALUES ('2', '欢迎来到本游戏！');
INSERT INTO `sys_msg` VALUES ('3', '健康游戏，禁止赌博！');
INSERT INTO `sys_msg` VALUES ('4', '公告！');

-- ----------------------------
-- Table structure for ugame
-- ----------------------------
DROP TABLE IF EXISTS `ugame`;
CREATE TABLE `ugame` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '记录唯一的id号',
  `uid` int(11) NOT NULL DEFAULT '0' COMMENT '用户唯一的id号',
  `uchip` int(11) NOT NULL DEFAULT '0' COMMENT '用户的金币数目',
  `uchip2` int(11) NOT NULL DEFAULT '0' COMMENT '用户的其他货币或等价物，你自己可以设计',
  `uchip3` int(11) NOT NULL DEFAULT '0' COMMENT '用户的其他货币或等价物，你自己可以设计',
  `uvip` int(11) NOT NULL DEFAULT '0' COMMENT '用户在本游戏中的等级',
  `uvip_endtime` int(11) NOT NULL DEFAULT '0' COMMENT 'vip结束时间',
  `udata1` int(11) NOT NULL DEFAULT '0' COMMENT '用户在游戏中的道具1',
  `udata2` int(11) NOT NULL DEFAULT '0' COMMENT '用户在游戏中的道具2',
  `udata3` int(11) NOT NULL DEFAULT '0' COMMENT '用户在游戏中的道具3',
  `uexp` int(11) NOT NULL DEFAULT '0' COMMENT '用户的经验值',
  `ustatus` int(11) NOT NULL DEFAULT '0' COMMENT '0正常，其他为不正常',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COMMENT='moba游戏数据表, 存放用户的游戏数据';

-- ----------------------------
-- Records of ugame
-- ----------------------------
INSERT INTO `ugame` VALUES ('1', '31', '8200', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `ugame` VALUES ('2', '52', '2000', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `ugame` VALUES ('3', '42', '2000', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `ugame` VALUES ('4', '43', '2000', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `ugame` VALUES ('5', '57', '2000', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `ugame` VALUES ('6', '45', '2000', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `ugame` VALUES ('7', '46', '2000', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `ugame` VALUES ('8', '47', '2000', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `ugame` VALUES ('9', '48', '2000', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `ugame` VALUES ('10', '49', '2000', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `ugame` VALUES ('11', '58', '2000', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `ugame` VALUES ('12', '59', '2000', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `ugame` VALUES ('13', '60', '2000', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `ugame` VALUES ('14', '61', '2000', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `ugame` VALUES ('15', '62', '2000', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `ugame` VALUES ('16', '63', '2000', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `ugame` VALUES ('17', '64', '2000', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `ugame` VALUES ('18', '66', '2000', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `ugame` VALUES ('19', '67', '2000', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `ugame` VALUES ('20', '44', '2000', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `ugame` VALUES ('21', '68', '2000', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `ugame` VALUES ('22', '72', '2000', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `ugame` VALUES ('23', '70', '2000', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `ugame` VALUES ('24', '73', '2000', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `ugame` VALUES ('25', '71', '2000', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `ugame` VALUES ('26', '74', '2000', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `ugame` VALUES ('27', '75', '2000', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `ugame` VALUES ('28', '76', '2000', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `ugame` VALUES ('29', '77', '2000', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `ugame` VALUES ('30', '78', '2000', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `ugame` VALUES ('31', '79', '2000', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `ugame` VALUES ('32', '80', '2000', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `ugame` VALUES ('33', '81', '2000', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `ugame` VALUES ('34', '82', '2000', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `ugame` VALUES ('35', '83', '2000', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `ugame` VALUES ('36', '84', '2000', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `ugame` VALUES ('37', '85', '2000', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `ugame` VALUES ('38', '86', '2000', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `ugame` VALUES ('39', '87', '2000', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `ugame` VALUES ('40', '88', '2000', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `ugame` VALUES ('41', '89', '2000', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `ugame` VALUES ('42', '90', '2000', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `ugame` VALUES ('43', '94', '2000', '0', '0', '0', '0', '0', '0', '0', '0', '0');
