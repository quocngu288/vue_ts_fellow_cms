import { TableColumnsType } from 'ant-design-vue'

export const COLUMNS: TableColumnsType = [
  {
    title: 'ADMIN.LIST.FULL_NAME',
    dataIndex: 'full_name',
    key: 'full_name'
  },
  {
    title: 'ADMIN.LIST.FURIGANA',
    dataIndex: 'furigana_name',
    key: 'furigana_name'
  },
  {
    title: 'ADMIN.LIST.MAIL',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: 'ADMIN.LIST.CREATE_AT',
    dataIndex: 'created_at',
    key: 'created_at'
  },
  {
    title: 'ADMIN.LIST.UPDATE_AT',
    dataIndex: 'updated_at',
    key: 'updated_at'
  },
  {
    align: 'center',
    key: 'action',
    width: 100
  }
]
