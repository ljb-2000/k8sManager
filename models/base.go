package models

import "time"

type Base struct {
	ID        int64      `gorm:"primary_key AUTO_INCREMENT"` //主键
	CreatedAt time.Time  `gorm:"column:create_time"`
	UpdatedAt time.Time  `gorm:"column:update_time"`
	DeletedAt *time.Time `gorm:"column:delete_time"`
}
