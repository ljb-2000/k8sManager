package dao

import (
	"github.com/tonychenl/k8sManager/models"
)

func LoginAdmin(loginName, pwd string) (*models.Admin, error) {
	admin := new(models.Admin)
	err := db.Where("login_name=? and password = ? and enable = 1", loginName, pwd).First(admin).Error
	return admin, err
}

func CreateAdmin(admin *models.Admin) (*models.Admin, error) {
	err := db.Create(admin).Error
	return admin, err
}
