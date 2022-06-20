import { useState } from 'react'

const useTags = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const setNewTag = (tag: string) => {
    return setSelectedTags((prevState) =>
      prevState.includes(tag) ? prevState.filter((p) => !p.includes(tag)) : [...prevState, tag]
    )
  }

  return {
    selectedTags,
    setNewTag
  }
}

export default useTags
