package adminController

import "github.com/tonychenl/k8sManager/controllers"

type AdminController struct {
	controllers.BaseController
}

func (this *AdminController)List() {
	this.TplName = "admin/demo.html"
}