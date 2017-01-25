package dao

import (
	"github.com/tonychenl/k8sManager/models"
	"github.com/jinzhu/gorm"
	"github.com/astaxie/beego/logs"
	"github.com/tonychenl/k8sManager/common"
)

func QueryAdmins(name string, page *common.Page) (*common.Page, error) {
	admins := []models.Admin{}
	var count int
	err := db.Limit(page.PageSize).Offset(page.GetStart()).Preload("Role").Where("delete_time is null").Find(&admins).Error
	db.Model(&models.Admin{}).Where("delete_time is null").Count(&count)
	return common.NewPage(count, page.PageNo, page.PageSize, admins), err
}

/**
登录，并查出用户所有菜单及按钮权限
 */
func LoginAdmin(loginName, pwd string) (*models.Admin, error) {
	admin := &models.Admin{}
	err := db.Preload("Role").Preload("Role.Menus", func(db *gorm.DB) *gorm.DB {
		return db.Where("parent_id is null and is_show = 1").Order("sort")
	}).Preload("Role.Menus.Menus", func(db *gorm.DB) *gorm.DB {
		return db.Where("is_show = 1").Order("sort")
	}).Preload("Role.Menus.Menus.Menus", func(db *gorm.DB) *gorm.DB {
		return db.Order("sort")
	}).Where("login_name=? and password = ? and enable = 1", loginName, pwd).First(admin).Error
	role := admin.Role
	logs.Debug(role.Name + "------------------角色")
	for _, m := range role.Menus {
		logs.Debug(m.Name + ":" + m.Handler + "++++++++++++++++++++一级菜单")
		cm := m.Menus
		for _, m2 := range cm {
			logs.Debug(m2.Name + ":" + m2.Handler + "00000000000000000000二级菜单")
			for _, m3 := range m2.Menus {
				logs.Debug(m3.Name + ":" + m3.Handler)
			}
		}
	}
	return admin, err
}

func CreateAdmin(admin *models.Admin) (*models.Admin, error) {
	err := db.Create(admin).Error
	return admin, err
}
