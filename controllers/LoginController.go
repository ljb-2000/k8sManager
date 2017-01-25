package controllers

import (
	"github.com/astaxie/beego/logs"
	"github.com/astaxie/beego"
	"github.com/tonychenl/k8sManager/common"
	"github.com/tonychenl/k8sManager/service/adminService"
)

type LoginController struct {
	BaseController
}

func (this *LoginController)Tologin() {
	this.TplName = "login.html"
}

func (this *LoginController)Logout() {
	this.DelSession(common.SESSION_LOGIN_USER)
	this.Redirect(beego.URLFor("LoginController.Tologin"), 302)
	return
}

func (this *LoginController)Login() {
	var loginName, password string;
	loginName = this.GetString("LoginName")
	password = this.GetString("Password")
	logs.Info("login by %s", loginName, password)
	admin, err := adminService.Login(loginName, password)
	if admin != nil {
		this.SetSession(common.SESSION_LOGIN_USER, admin)
		this.Redirect(beego.URLFor("MainController.Index"), 302)
	} else {
		this.Data["error"] = true
		this.Data["msg"] = err.Error()
		this.TplName = "login.html"
	}

}
