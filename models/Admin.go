package models

import (
	"strings"
	"github.com/astaxie/beego/logs"
)

type Admin struct {
	Base
	Name      string
	LoginName string
	Password  string
	Enable    bool
	Role      Role
	RoleId    int64
}

func (a *Admin)HasMenu(menu string) bool {
	return a.Role.HasMenu(menu)
}

func (Admin)TableName() string {
	return "sys_admin"
}

type Role struct {
	Base
	Name  string
	Menus []Menu `gorm:"many2many:sys_role_menu"`
}

func (a *Role)HasMenu(menu string) bool {
	if a.Menus == nil {
		return false
	}
	var hasMenu = false
	for _, m := range a.Menus {
		hasMenu = m.hasMenu(menu)
	}
	return hasMenu
}

func (Role)TableName() string {
	return "sys_role"
}

type Menu struct {
	Base
	ParentId  int64
	ParentIds string
	Name      string
	Sort      int
	Handler   string
	Icon      string
	IsShow    bool
	Menus     []Menu `gorm:"ForeignKey:ParentId"`
}

func (this *Menu)hasMenu(menu string) bool {
	logs.Debug("菜单权限验证" + this.Handler + ":" + menu)
	if strings.EqualFold(this.Handler, menu) {
		logs.Debug("菜单权限验证通过" + this.Handler + ":" + menu)
		return true
	}
	var hasMenu = false
	for _, m := range this.Menus {
		hasMenu = m.hasMenu(menu)
	}
	return hasMenu
}

func (Menu)TableName() string {
	return "sys_menu"
}