package common

import (
	m "crypto/md5"
	"encoding/hex"
)

func Md5(str string) string {
	md5Ctx := m.New()
	md5Ctx.Write([]byte(str))
	cipherStr := md5Ctx.Sum(nil)
	return hex.EncodeToString(cipherStr)
}