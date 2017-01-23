package routers

import (
	"github.com/tonychenl/k8sManager/controllers"
	"github.com/astaxie/beego"
)

func init() {
	beego.Router("/", &controllers.MainController{}, "get:Index")
}
