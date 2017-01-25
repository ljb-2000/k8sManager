package adminController

import (
	"github.com/tonychenl/k8sManager/controllers"
	"github.com/tonychenl/k8sManager/service/adminService"
	"github.com/tonychenl/k8sManager/common"
	"github.com/astaxie/beego/logs"
)

type AdminController struct {
	controllers.BaseController
}

func (this *AdminController)List() {
	if this.IsAjax() {
		page, err := adminService.QueryAdmins("", common.NewPageRequest(1, 20))
		if err == nil {
			logs.Debug(page)
		}
		this.Data["data"] = page
		this.ServeJSON()
	} else {
		this.TplName = "admin/admin_list.html"
	}
}