/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50168
Source Host           : localhost:3306
Source Database       : moba_game

Target Server Type    : MYSQL
Target Server Version : 50168
File Encoding         : 65001

Date: 2019-11-17 00:13:46
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
-- Table structure for sys_msg
-- ----------------------------
DROP TABLE IF EXISTS `sys_msg`;
CREATE TABLE `sys_msg` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID，自动增长',
  `msg` varchar(255) DEFAULT '' COMMENT '公告文字',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

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
