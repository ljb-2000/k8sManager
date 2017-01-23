package main

import (
	_ "github.com/tonychenl/k8sManager/routers"
	"github.com/astaxie/beego"
)

func main() {
	beego.Run()
}

