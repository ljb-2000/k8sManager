package models


type Admin struct {
	Base
	Name       string
	LoginName  string
	Password   string
	Enable     bool
}

func (Admin)TableName() string {
	return "sys_admin"
}

type Role struct {
	Base
	Name string
}

func (Role)TableName() string {
	return "sys_role"
}

type Menu struct {
	ParentId  int64
	ParentIds string
	Name      string
	Sort      int
	Handler   string
	Icon      string
	IsShow    bool
}

func (Menu)TableName() string {
	return "sys_menu"
}