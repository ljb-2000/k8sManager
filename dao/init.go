package dao

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"github.com/astaxie/beego/logs"
)

var db *gorm.DB

func init() {
	Db, err := gorm.Open("mysql", "root@tcp(192.168.188.14:3306)/k8smanager?charset=utf8&parseTime=True")

	if err != nil {
		logs.Error("Fail to create xorm system logger: %v\n", err)
	}
	logs.Info(Db)
	Db.LogMode(true)
	Db.DB().SetMaxIdleConns(10)
	Db.DB().SetMaxOpenConns(100)

	db = Db;
}
