package dao

import (
	"github.com/tonychenl/k8sManager/models"
	"github.com/astaxie/beego/logs"
)

func LoginAdmin(loginName, pwd string) (*models.Admin) {
	admin := new(models.Admin)
	has, _ := engine.Where("login_name=? and password = ? and enable = 1", loginName, pwd).Get(admin)
	if has {
		return admin
	} else {
		return nil
	}
}

func CreateAdmin(admin *models.Admin) *models.Admin {
	var err error
	_, err = engine.Insert(admin)
	if err != nil {
		logs.Error("create admin error :", err)
	}
	return admin
}
