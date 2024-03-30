<template>
  <div class="form-group">
    <VeeField
      :name="name"
      :label="label"
      :rules="rules"
      v-slot="{ errorMessage }">
      <a-form-item
        :label="label"
        :has-feedback="!!errorMessage"
        :help="errorMessage"
        :validate-status="errorMessage ? 'error' : undefined"
        :required="rules.includes('required')"
      >
        <!--Field-->
        <a-transfer
          class="tree-transfer"
          v-model:target-keys="targetKeys"
          :value="modelValue"
          :target-keys="targetKeys"
          :data-source="dataSource"
          :render="item => $t('PERMISSION.' + item.title)"
          :locale="{notFoundContent: $t('COMMON.EMPTY_TEXT')}"
          :list-style="{width: '100%', height: '400px'}"
          @change="onChange">
          <template #children="{ direction, selectedKeys, onItemSelect }">
            <a-tree
              v-if="direction === 'left'"
              block-node
              checkable
              check-strictly
              default-expand-all
              :checked-keys="[...selectedKeys, ...targetKeys]"
              :tree-data="treeDataLeft"
              @check="
                (_, props) => {
                  onChecked(props, [...selectedKeys, ...targetKeys], onItemSelect);
                }
              "
              @select="
                (_, props) => {
                  onChecked(props, [...selectedKeys, ...targetKeys], onItemSelect);
                }
              "
            />

            <a-tree
              v-if="direction === 'right'"
              block-node
              checkable
              check-strictly
              default-expand-all
              :checked-keys="[...selectedKeys]"
              :tree-data="treeDataRight"
              @check="
                (_, props) => {
                  onChecked(props, [...selectedKeys], onItemSelect);
                }
              "
              @select="
                (_, props) => {
                  onChecked(props, [...selectedKeys], onItemSelect);
                }
              "
            />
          </template>
        </a-transfer>
      </a-form-item>
    </VeeField>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { TransferProps, TreeProps } from 'ant-design-vue'

const props = defineProps({
  name: { type: String, required: true },
  label: { type: String, default: '' },
  rules: { type: [String, Object], default: '' },
  modelValue: { type: [Array, String], default: '' },
  list: { type: Array, default: () => [] }
})

const emit = defineEmits(['update:modelValue'])

const convertFlatArrToTree = (arr) => {
  const nested = arr.reduce((acc: any, part: any) => {
    let index = acc.findIndex((car: any) => car.category === part.category)
    const { id, name, ...car } = part

    if (index === -1) {
      acc.push({
        ...car,
        id,
        key: id.toString() + '-parent',
        title: part.category,
        children: []
      })

      index = acc.length - 1
    }

    acc[index].children.push({ key: id.toString(), id, title: name })

    return acc
  }, [])

  return nested
}

// Init tree data left
const tData: TransferProps['dataSource'] = convertFlatArrToTree(props.list)

const transferDataSource: TransferProps['dataSource'] = []

// Flatten tree data
const flatten = (list:TransferProps['dataSource'] = []) => {
  list.forEach(item => {
    transferDataSource.push(item)
    flatten(item.children)
  })
}

flatten(JSON.parse(JSON.stringify(tData)))

const isChecked = (selectedKeys: (string | number)[], eventKey: string | number) => {
  return selectedKeys.indexOf(eventKey) !== -1
}

const handleTreeData = (data: any, targetKeys: string[] = []) => {
  data.forEach(item => {
    item.disabled = targetKeys.includes(item.key as any)
    if (item.children) {
      handleTreeData(item.children, targetKeys)
    }
  })
  return data as TreeProps['treeData']
}

// const filter = (array, text) => {
//   const getNodes = (result, object) => {
//     if (text.includes(object.key)) {
//       result.push(object)
//       return result
//     }
//     if (Array.isArray(object.children)) {
//       const children = object.children.reduce(getNodes, [])
//       if (children.length) result.push({ ...object, children })
//     }
//     return result
//   }
//
//   return array.reduce(getNodes, []) as TreeProps['treeData']
// }

const targetKeys = ref<string[]>([])
const dataSource = ref(transferDataSource)

const treeDataLeft = computed(() => {
  return handleTreeData(tData, targetKeys.value)
})

const treeDataRight = computed(() => {
  const permissionList = [...props.list]
  const tDataRight = convertFlatArrToTree(permissionList.filter((item: any) => targetKeys.value.includes(item.id.toString())))
  return handleTreeData(tDataRight, [])
})

const onChecked = (
  e: any,
  checkedKeys: string[],
  onItemSelect: (n: any, c: boolean) => void
) => {
  const { eventKey } = e.node
  onItemSelect(eventKey, !isChecked(checkedKeys, eventKey))
  if (eventKey.includes('parent')) {
    onCheckedParent(eventKey, checkedKeys, onItemSelect)
  }
}

const onCheckedParent = (
  eventKey: string,
  checkedKeys: string[],
  onItemSelect: (n: any, c: boolean) => void
) => {
  const arr = treeDataLeft.value as any
  const test = arr.filter(item => item.key === eventKey)
  if (test.length) {
    const childItem = test[0].children.map(item => item.key)

    childItem.forEach(item => {
      onItemSelect(item, !isChecked(checkedKeys, item))
    })
  }
}

const onChange = (nextTargetKeys: string[]) => {
  emit('update:modelValue', nextTargetKeys)
}

</script>

<style lang="scss">
.ant-transfer-list {
  .ant-transfer-list-body {
    .ant-tree {
      max-height: 300px;
      overflow: auto;
    }
  }
}
</style>
