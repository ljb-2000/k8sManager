package adminService

import (
	"errors"
	"github.com/tonychenl/k8sManager/dao"
	"github.com/tonychenl/k8sManager/common"
	"github.com/tonychenl/k8sManager/models"
	"github.com/astaxie/beego/logs"
)

func Login(loginName, password string) (*models.Admin, error) {
	admin, err := dao.LoginAdmin(loginName, common.Md5(password))
	if err != nil {
		logs.Info("登录失败:用户名密码错误")
		return nil, errors.New("用户名密码错误")
	} else {
		return admin, nil
	}
}