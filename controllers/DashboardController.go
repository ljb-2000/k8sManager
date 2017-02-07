package controllers



type DashboardController struct {
	BaseController
}

func (c *DashboardController) Index() {
	c.TplName = "index.html"
}