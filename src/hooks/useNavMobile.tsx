import { useState } from 'react'

const useNavMobile = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => setIsOpen((prev) => !prev)

  return {
    handleClick,
    isOpen
  }
}

export default useNavMobile
