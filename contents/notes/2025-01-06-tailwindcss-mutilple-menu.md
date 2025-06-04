---
title: "tailwindcss 多级菜单"
createdAt: 2025-01-06
description: "tailwindcss 多级菜单"
comment: true
---

```jsx
import { MenuUnfoldOutlined, RightOutlined } from '@ant-design/icons'
import { useMemo, useState } from 'react'
import { GoodsMenu } from '~/types'
import { cn } from '~/utils/cn'

/**
 * @param param0
 * @returns
 */
export const MultiDropDown = ({
  menus,
  onChange,
}: {
  menus: GoodsMenu[]
  onChange(value: string): void
}) => {
  //TODO: 需要处理选中的之后文字展示的问题
  const [menuId, setMenuId] = useState('')
  const subMenuRender = useMemo(() => {
    const subMenu = menus.find((item) => item.id === menuId)
    if (!subMenu) {
      return []
    }
    return subMenu.children?.map((child) => {
      return (
        <li key={child.id}>
          <span className="text-xl font-bold">{child.name}</span>
          <ul className="ml-5 mt-2 flex flex-wrap text-sm">
            {child.children?.map((child) => {
              return (
                <li
                  key={child.id}
                  className="cursor-pointer hover:text-primary"
                  onClick={() => {
                    onChange(child.id ?? '')
                  }}
                >
                  {child.name}
                </li>
              )
            })}
          </ul>
        </li>
      )
    })
  }, [menuId, menus, onChange])

  return (
    <div className="group/first relative flex flex-col ">
      <div
        className={cn(
          'flex h-9 w-60 items-center justify-between rounded-md bg-primary px-4 text-gray-100',
          'cursor-pointer'
        )}
      >
        <span>商品分类</span>
        <MenuUnfoldOutlined />
      </div>
      <div className="group/second absolute w-[740px]">
        <ul
          className={cn(
            'invisible',
            ' absolute top-9 z-10 h-0 w-60 space-y-2 ',
            'overflow-y-scroll rounded bg-slate-400 pt-1 transition-all',
            'group-hover/first:visible group-hover/first:h-96'
          )}
        >
          {menus?.map((item) => {
            return (
              <li
                className="relative flex h-10 cursor-pointer items-center justify-between
              px-4 text-white hover:bg-primary"
                key={item.id}
                onMouseOver={() => {
                  setMenuId(item.id || '')
                }}
              >
                <span className="truncate">{item.name}</span>
                <RightOutlined />
              </li>
            )
          })}
        </ul>
        <ul
          className={cn(
            'invisible absolute left-60 top-9 z-10 h-96 overflow-auto',
            'w-[500px] space-y-3 rounded bg-slate-100 px-8 py-4 text-slate-900',
            'group-hover/second:visible'
          )}
        >
          {subMenuRender}
        </ul>
      </div>
    </div>
  )
}

```
