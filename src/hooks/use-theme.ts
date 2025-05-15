import { useCallback, useSyncExternalStore } from 'react'

export function useTheme() {
	let subscribe = useCallback((onChange: () => void) => {
		let obs = new MutationObserver(onChange)
		obs.observe(document.documentElement, { attributeFilter: ['class'], attributes: true })

		return () => {
			obs.disconnect()
		}
	}, [])

	let getServerSnapShot = useCallback(() => {
		return null
	}, [])

	let getSnapshot = useCallback(() => {
		return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
	}, [])

	return useSyncExternalStore(subscribe, getSnapshot, getServerSnapShot)
}

export function useSystemTheme() {
	let subscribe = useCallback((onChange: () => void) => {
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', onChange)

		return () => {
			window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', onChange)
		}
	}, [])

	let getServerSnapShot = useCallback(() => {
		return null
	}, [])

	let getSnapshot = useCallback(() => {
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	}, [])

	return useSyncExternalStore(subscribe, getSnapshot, getServerSnapShot)
}
