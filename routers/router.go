package routers

import (
	"github.com/tonychenl/k8sManager/controllers"
	"github.com/tonychenl/k8sManager/controllers/adminController"
	"github.com/astaxie/beego"
)

func init() {
	beego.Router("/", &controllers.MainController{}, "get:Index")
	beego.AutoRouter(&controllers.LoginController{})
	beego.AutoRouter(&adminController.RoleController{})
}
