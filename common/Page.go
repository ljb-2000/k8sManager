package common

type Page struct {
	PageNo     int
	PageSize   int
	TotalPage  int
	TotalCount int
	List       interface{}
}

func (this *Page) GetStart() int {
	if this.PageNo == 1 {
		return 0
	} else {
		return (this.PageNo - 1) * this.PageSize - 1;
	}
}

func NewPageRequest(pageNo, pageSize int) *Page {
	return &Page{PageNo: pageNo, PageSize: pageSize}
}

func NewPage(count int, pageNo int, pageSize int, list interface{}) *Page {
	tp := count / pageSize
	if count % pageSize > 0 {
		tp = count / pageSize + 1
	}
	return &Page{PageNo: pageNo, PageSize: pageSize, TotalPage: tp, TotalCount: count, List: list}
}