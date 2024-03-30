import { TableColumnsType } from 'ant-design-vue'

export const COLUMNS: TableColumnsType = [
  {
    title: 'INDUSTRY_TYPE.NO',
    dataIndex: 'index_number',
    key: 'index_number',
    width: 100
  },
  {
    title: 'INDUSTRY_TYPE.NAME',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '',
    dataIndex: 'action',
    key: 'action',
    width: 50
  }
]
