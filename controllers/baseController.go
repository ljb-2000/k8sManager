package controllers

import (
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/logs"
	"strings"
)

var openPerm = map[string]string{
	"MainController": "*",
}

type BaseController struct {
	beego.Controller
	controllerName string // 控制器名
	actionName     string // 动作名
}

func (this *BaseController) Prepare() {
	//获取请求方法名称
	controllerName, actionName := this.GetControllerAndAction()
	this.controllerName = controllerName
	this.actionName = actionName
	path := this.controllerName + "." + this.actionName

	this.GetSession()

	//判断是否是不需要登录验证
	logs.Debug("判断是否是不需要登录验证 path :", path)
	if this.isOpenPerm() {
		logs.Info("不需要验证登录 path :", path)
		return //不需要验证登录
	}
	//登录校验
	logs.Debug("登录校验 path :", path)


	//操作权限校验
	logs.Debug("操作权限校验 path :", path)
}


/**
判断是否是不需要鉴权的公共操作
*/
func (this *BaseController) isOpenPerm() bool {

	if value, ok := openPerm[this.controllerName]; ok {
		if strings.EqualFold(value, "*") {
			return true
		}
		return strings.Contains(value, this.actionName)
	}
	return false
}
