package main

import (
	_ "github.com/tonychenl/k8sManager/routers"
	_ "github.com/tonychenl/k8sManager/dao"
	"github.com/astaxie/beego"
)

func main() {
	beego.Run()
}

