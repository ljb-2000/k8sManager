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