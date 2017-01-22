package controllers

import (
	"github.com/astaxie/beego"
	"strings"
)

var openPerm = map[string]string{
	"MainController": "xxx",
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

	//判断是否是不需要登录验证
	if this.isOpenPerm() {
		return //不需要验证登录
	}
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
