import { create } from 'zustand'
import { initialItems } from '../lib/constants'
import { persist } from 'zustand/middleware'

export const useItemsStore = create(
  persist(
    (set) => ({
      items: initialItems,
      addItem: (itemText) => {
        set((state) => ({
          items: [
            ...state.items,
            { id: Date.now(), name: itemText, packed: false },
          ],
        }))
      },
      deleteItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }))
      },
      toggleItem: (id) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, packed: !item.packed } : item
          ),
        }))
      },
      removeAllItems: () => {
        set(() => ({ items: [] }))
      },
      resetToInitial: () => {
        set(() => ({ items: initialItems }))
      },
      markAllAsComplete: () => {
        set((state) => ({
          items: state.items.map((item) => ({ ...item, packed: true })),
        }))
      },
      markAllAsIncomplete: () => {
        set((state) => ({
          items: state.items.map((item) => ({ ...item, packed: false })),
        }))
      },
    }),
    {
      name: 'items',
    }
  )
)
