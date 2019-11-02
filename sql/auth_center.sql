/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50168
Source Host           : localhost:3306
Source Database       : auth_center

Target Server Type    : MYSQL
Target Server Version : 50168
File Encoding         : 65001

Date: 2019-11-03 00:36:38
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for uinfo
-- ----------------------------
DROP TABLE IF EXISTS `uinfo`;
CREATE TABLE `uinfo` (
  `uid` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '玩家唯一的UID号,仅供服务端识别使用',
  `numberid` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '玩家numberid,识别第几号用户',
  `areaid` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '地区areaid,识别地区',
  `unick` varchar(32) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '""' COMMENT '玩家的昵称',
  `usex` int(8) NOT NULL DEFAULT '0' COMMENT '0:男, 1:女的',
  `uface` int(8) NOT NULL DEFAULT '0' COMMENT '系统默认图像，自定义图像后面再加上',
  `uname` varchar(32) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '""' COMMENT '玩家的账号名称',
  `upwd` varchar(32) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '""' COMMENT '玩家密码的MD5值',
  `uphone` varchar(16) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '""' COMMENT '玩家的电话',
  `uemail` varchar(64) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '""' COMMENT '玩家的email',
  `address` varchar(128) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '""' COMMENT '玩家的地址',
  `uvip` int(8) NOT NULL DEFAULT '0' COMMENT '玩家VIP的等级，这个是最普通的',
  `vip_endtime` int(32) NOT NULL DEFAULT '0' COMMENT '玩家VIP到期的时间撮',
  `is_guest` int(8) NOT NULL DEFAULT '0' COMMENT '标志改账号是否为游客账号',
  `guest_key` varchar(64) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '0' COMMENT '游客账号的唯一的key',
  `status` int(8) NOT NULL DEFAULT '0' COMMENT '0表示正常，其他根据需求定',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='存放我们的玩家信息';

-- ----------------------------
-- Records of uinfo
-- ----------------------------
INSERT INTO `uinfo` VALUES ('1', '1000001', '0', '肖炎', '0', '1', 'xiaoyan', '111111', '13066666666', '827773271@qq.com', '杭州下城凤栖花园', '0', '0', '0', '0', '0');
INSERT INTO `uinfo` VALUES ('2', '1000002', '0', 'huangshucheng', '1', '2', 'hccfun', '111111', '13067702010', '3333333@qq.com', '杭州下城凤栖花园', '0', '0', '0', '1', '0');
INSERT INTO `uinfo` VALUES ('3', '1000003', '0', '测试1111', '0', '3', 'test1111', '111111', '13033333333', '\"\"', '\"\"', '0', '0', '0', '2', '0');
INSERT INTO `uinfo` VALUES ('95', '1000004', '0', 'test2222', '1', '3', '\"\"', '\"\"', '\"\"', '\"\"', '\"\"', '0', '0', '1', 'testkey123456', '0');
INSERT INTO `uinfo` VALUES ('96', '1000005', '0', 'test3333', '1', '1', '13065525252', '123456789123456789123456', '\"\"', '\"\"', '\"\"', '0', '0', '0', '0', '0');
INSERT INTO `uinfo` VALUES ('97', '1000006', '0', 'test3333', '1', '1', '13065525252', '123456789123456789123456', '\"\"', '\"\"', '\"\"', '0', '0', '0', '0', '0');
INSERT INTO `uinfo` VALUES ('98', '1000007', '0', 'test3333', '1', '1', '13065525252', '123456789123456789123456', '\"\"', '\"\"', '\"\"', '0', '0', '0', '0', '0');
