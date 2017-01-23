package models

import (
	"time"
)

type Admin struct {
	Id         int64      `xorm:"pk autoincr"` //主键
	CreateTime time.Time  `xorm:"created"`
	UpdateTime time.Time  `xorm:"updated"`
	Name       string
	LoginName  string
	Password   string
	Enable     bool
}
