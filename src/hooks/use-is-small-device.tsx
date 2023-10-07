import { useSyncExternalStore } from 'react'

const HEIGHT_MQ = '(max-height: 700px)'
const WIDTH_MQ = '(max-width: 400px)'

function subscribe(handler: () => void) {
  window.matchMedia(HEIGHT_MQ).addEventListener('change', handler)
  window.matchMedia(WIDTH_MQ).addEventListener('change', handler)

  return () => {
    window.matchMedia(HEIGHT_MQ).removeEventListener('change', handler)
    window.matchMedia(WIDTH_MQ).removeEventListener('change', handler)
  }
}

function getSnapshot() {
  const height = window.matchMedia(HEIGHT_MQ).matches
  const width = window.matchMedia(HEIGHT_MQ).matches
  return height && width
}

export function useIsSmallDevice() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}
