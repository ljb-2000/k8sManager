package adminController

import "github.com/tonychenl/k8sManager/controllers"

type RoleController struct {
	controllers.BaseController
}

func (this *RoleController)List() {
	this.TplName = "demo.html"
}