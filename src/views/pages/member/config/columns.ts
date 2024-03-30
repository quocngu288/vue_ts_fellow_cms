import { TableColumnsType } from 'ant-design-vue'

export const COLUMNS: TableColumnsType = [
  {
    title: 'MEMBER.LIST.REGIST_NUMBER',
    dataIndex: 'regist_number',
    key: 'regist_number'
  },
  {
    title: 'MEMBER.LIST.AGENCY_NAME',
    dataIndex: 'agency_name',
    key: 'agency_name'
  },
  {
    title: 'MEMBER.LIST.PHONE',
    dataIndex: 'phone',
    key: 'phone'
  },
  {
    title: 'MEMBER.LIST.MAIL',
    dataIndex: 'mail',
    key: 'mail'
  },
  {
    title: 'MEMBER.LIST.INDUSTRY_TYPE',
    dataIndex: 'industry_type',
    key: 'industry_type'
  },
  {
    align: 'center',
    key: 'action',
    width: 100
  }
]
