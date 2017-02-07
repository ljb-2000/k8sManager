SET FOREIGN_KEY_CHECKS=0;

-- 角色表
CREATE TABLE sys_role
(
	id int(64) NOT NULL AUTO_INCREMENT COMMENT '编号',
	`create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL  COMMENT '更新时间',
  `delete_time` datetime DEFAULT NULL COMMENT '删除时间',
	name varchar(100) NOT NULL COMMENT '角色名称',
	enname varchar(255) COMMENT '英文名称',
	is_sys varchar(64) COMMENT '是否系统数据',
	useable varchar(64) COMMENT '是否可用',
	PRIMARY KEY (id)
) ENGINE = InnoDB COMMENT = '角色表' DEFAULT CHARACTER SET utf8;

-- ----------------------------
-- 初始化系统角色
-- ----------------------------
INSERT INTO `sys_role` (`id`, `name`, `enname`, `is_sys`, `useable`, `create_time`, `update_time`, `delete_time`) VALUES (1, '系统管理员', 'admin', '1', '1', '2016-7-10 07:08:14', '2016-7-10 07:08:18', '2016-7-10 07:08:18');


DROP TABLE IF EXISTS `sys_admin`;
CREATE TABLE `sys_admin` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `delete_time` datetime DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `login_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `enable` int(11) DEFAULT NULL,
  `role_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_admin
-- ----------------------------
-- 管理员密码 111111
INSERT INTO `sys_admin` VALUES ('1', '2017-01-23 15:09:06', '2017-01-23 15:09:06',NULL , '系统管理员', 'admin', '96e79218965eb72c92a549dd5a330112', '1',1);


-- 菜单表

CREATE TABLE sys_menu
(
	id int(64) NOT NULL AUTO_INCREMENT COMMENT '编号',
	create_time datetime DEFAULT NULL COMMENT '创建时间',
  update_time datetime DEFAULT NULL  COMMENT '更新时间',
  delete_time datetime DEFAULT NULL COMMENT '删除时间',
	parent_id bigint COMMENT '父级编号',
	parent_ids varchar(1024) COMMENT '所有父级编号',
	name varchar(100) NOT NULL COMMENT '名称',
	sort decimal(10,0) NOT NULL COMMENT '排序',
	handler varchar(256) COMMENT '控制器',
	icon varchar(100) COMMENT '图标',
	is_show boolean DEFAULT '1' NOT NULL COMMENT '是否在菜单中显示',
	PRIMARY KEY (id)
) ENGINE = InnoDB COMMENT = '菜单表' DEFAULT CHARACTER SET utf8;

-- 角色-菜单
CREATE TABLE sys_role_menu
(
	role_id int(64) NOT NULL COMMENT '角色编号',
	menu_id int(64) NOT NULL COMMENT '菜单编号',
	PRIMARY KEY (role_id, menu_id)
) ENGINE = InnoDB COMMENT = '角色-菜单' DEFAULT CHARACTER SET utf8;

/* Create Foreign Keys */
ALTER TABLE sys_role_menu
	ADD FOREIGN KEY (menu_id)
	REFERENCES sys_menu (id)
	ON UPDATE RESTRICT
	ON DELETE RESTRICT
;

ALTER TABLE sys_role_menu
	ADD FOREIGN KEY (role_id)
	REFERENCES sys_role (id)
	ON UPDATE RESTRICT
	ON DELETE RESTRICT
;

-- 表盘
INSERT INTO `sys_menu` (`id`, `parent_id`, `parent_ids`, `name`, `sort`, `handler`, `icon`, `is_show`) VALUES (1000000, NULL, '', '表盘', 1, 'DashboardController.Index', 'fa fa-dashboard', 1);

-- 系统管理  ----------start
INSERT INTO `sys_menu` (`id`, `parent_id`, `parent_ids`, `name`, `sort`, `handler`, `icon`, `is_show`) VALUES (1010000, NULL, '', '用户管理', 99, '', 'fa fa-user', 1);

-- 角色管理
INSERT INTO `sys_menu` (`id`, `parent_id`, `parent_ids`, `name`, `sort`, `handler`,  `icon`, `is_show`) VALUES (1010100, 1010000, ',1010000,', '角色管理', 2, 'RoleController.List', 'fa fa-circle-o',  1);
INSERT INTO `sys_menu` (`id`, `parent_id`, `parent_ids`, `name`, `sort`, `handler`,  `icon`, `is_show`) VALUES (1010101, 1010100, ',1010000,1010100,', '删除角色', 1, 'RoleController.Del', NULL,  0);
INSERT INTO `sys_menu` (`id`, `parent_id`, `parent_ids`, `name`, `sort`, `handler`,  `icon`, `is_show`) VALUES (1010102, 1010100, ',1010000,1010100,', '修改角色', 2, 'RoleController.Edit', NULL, 0);
INSERT INTO `sys_menu` (`id`, `parent_id`, `parent_ids`, `name`, `sort`, `handler`,  `icon`, `is_show`) VALUES (1010103, 1010100, ',1010000,1010100,', '新增角色', 3, 'RoleController.Mew', NULL,  0);
INSERT INTO `sys_menu` (`id`, `parent_id`, `parent_ids`, `name`, `sort`, `handler`,  `icon`, `is_show`) VALUES (1010104, 1010100, ',1010000,1010100,', '分配权限', 4, 'RoleController.Grant', NULL, 0);
-- 账号管理
INSERT INTO `sys_menu` (`id`, `parent_id`, `parent_ids`, `name`, `sort`, `handler`,  `icon`, `is_show`) VALUES (1010200, 1010000, ',1010000,', '账号管理', 1, 'AdminController.List', 'fa fa-circle-o',  1);
INSERT INTO `sys_menu` (`id`, `parent_id`, `parent_ids`, `name`, `sort`, `handler`,  `icon`, `is_show`) VALUES (1010201, 1010200, ',1010000,1010200,', '删除账号', 1, 'AdminController.Del', NULL, 0);
INSERT INTO `sys_menu` (`id`, `parent_id`, `parent_ids`, `name`, `sort`, `handler`,  `icon`, `is_show`) VALUES (1010202, 1010200, ',1010000,1010200,', '账号修改', 2, 'AdminController.Edit', NULL,  0);
INSERT INTO `sys_menu` (`id`, `parent_id`, `parent_ids`, `name`, `sort`, `handler`,  `icon`, `is_show`) VALUES (1010203, 1010200, ',1010000,1010200,', '账号新增', 3, 'AdminController.New', NULL,  0);
INSERT INTO `sys_menu` (`id`, `parent_id`, `parent_ids`, `name`, `sort`, `handler`,  `icon`, `is_show`) VALUES (1010204, 1010200, ',1010000,1010200,', '修改密码', 3, 'AdminController.ChangePwd', NULL,  0);

-- ----------------------------
-- 菜单角色关联表
-- ----------------------------
--表盘
INSERT INTO `sys_role_menu` (`role_id`, `menu_id`) VALUES (1, 1000000);
-- 系统管理 ---------------------start
INSERT INTO `sys_role_menu` (`role_id`, `menu_id`) VALUES (1, 1010000);
-- 角色管理
INSERT INTO `sys_role_menu` (`role_id`, `menu_id`) VALUES (1, 1010100);
INSERT INTO `sys_role_menu` (`role_id`, `menu_id`) VALUES (1, 1010101);
INSERT INTO `sys_role_menu` (`role_id`, `menu_id`) VALUES (1, 1010102);
INSERT INTO `sys_role_menu` (`role_id`, `menu_id`) VALUES (1, 1010103);
INSERT INTO `sys_role_menu` (`role_id`, `menu_id`) VALUES (1, 1010104);
-- 员工管理
INSERT INTO `sys_role_menu` (`role_id`, `menu_id`) VALUES (1, 1010200);
INSERT INTO `sys_role_menu` (`role_id`, `menu_id`) VALUES (1, 1010201);
INSERT INTO `sys_role_menu` (`role_id`, `menu_id`) VALUES (1, 1010202);
INSERT INTO `sys_role_menu` (`role_id`, `menu_id`) VALUES (1, 1010203);
INSERT INTO `sys_role_menu` (`role_id`, `menu_id`) VALUES (1, 1010204);
-- 系统管理 ---------------------end