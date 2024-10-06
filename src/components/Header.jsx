import { useItemsStore } from '../stores/itemsStore'
import Counter from './Counter'
import Logo from './Logo'

export default function Header() {

  const items = useItemsStore(store => store.items)

  return (
    <header>
      <Logo />
      <Counter
        numberOfItemsPacked={items.filter(item => item.packed).length}
        totalNumberOfItems={items.length}
      />
    </header>
  )
}
