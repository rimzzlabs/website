import * as atom from '@/stores'

import { useAtom } from 'jotai'

const usePageSwitched = () => {
  const [amount, setAmount] = useAtom(atom.pageSwitched)

  const updateAmount = (newAmount: number) => setAmount(newAmount)

  return { amount, updateAmount }
}

export default usePageSwitched
