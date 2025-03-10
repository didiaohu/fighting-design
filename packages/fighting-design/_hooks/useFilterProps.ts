import { reactive } from 'vue'
import type {
  ordinaryFunctionInterface as a,
  useFilterPropsReturnInterface as b,
  needPropsType as c
} from '../_interface'

/**
 * 过滤 props 需要使用的 props
 *
 * hooks 提出者：https://github.com/OnlyShadows
 * hooks 开发者：https://github.com/Tyh2001
 *
 * 需要传入两个泛型参数
 * @type { F } 传入的 props 类型
 * @type { N } 需要的 props 类型 / 返回值类型
 * @param props 原始 props
 * @param need 需要的键集合
 * @returns 需要的 props
 */
export const useFilterProps = <F, N>(props: F, need: string[]): b => {
  const needProps: N | c = reactive({} as const)

  //  过滤 props
  const filterProps: a = (): void => {
    for (const key of need) {
      if (Object.hasOwn(props as unknown as object, key)) {
        needProps[key] = (props as unknown as c)[key]
      }
    }
  }

  //  获取结果
  const getProps = (): N => {
    filterProps()
    return needProps as N
  }

  return { getProps } as b
}
