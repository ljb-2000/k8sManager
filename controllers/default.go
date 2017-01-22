package controllers

import (
)

type MainController struct {
	BaseController
}

func (c *MainController) Index() {
	c.TplName = "index.html"
}
