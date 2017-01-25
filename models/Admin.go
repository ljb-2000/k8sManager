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
	if a.Role.HasMenu(menu) {
		logs.Debug("菜单权限验证通过:%s", menu)
		return true
	}
	logs.Debug("权限验证失败:%s", menu)
	return false
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
	for _, m := range a.Menus {
		if m.hasMenu(menu) {
			return true
		}
	}
	return false
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
	if strings.EqualFold(this.Handler, menu) {
		return true
	}
	for _, m := range this.Menus {
		if m.hasMenu(menu) {
			return true
		}
	}
	return false
}

func (Menu)TableName() string {
	return "sys_menu"
}