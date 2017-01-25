package adminService

import (
	"github.com/tonychenl/k8sManager/common"
	"github.com/tonychenl/k8sManager/dao"
)

func QueryAdmins(name string, page *common.Page) (*common.Page, error) {
	return dao.QueryAdmins("", common.NewPageRequest(1, 20))
}