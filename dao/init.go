package dao

import (
	_ "github.com/go-sql-driver/mysql"
	"github.com/go-xorm/xorm"
	"github.com/astaxie/beego/logs"
	"github.com/go-xorm/core"
)

var engine *xorm.Engine

func init() {
	var err error
	engine, err = xorm.NewEngine("mysql", "root@tcp(192.168.188.14:3306)/k8smanager?charset=utf8")
	if err != nil {
		logs.Error("Fail to create xorm system logger: %v\n", err)
	}
	engine.SetMaxIdleConns(50)
	engine.SetMaxOpenConns(200)
	engine.ShowSQL(true)
	engine.Logger().SetLevel(core.LOG_DEBUG)
}
