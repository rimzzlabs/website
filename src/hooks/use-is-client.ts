import { useEffect, useState } from 'react'

export function useIsClient() {
	let [isClient, setIsClient] = useState(false)

	useEffect(() => {
		setIsClient(true)
	}, [])

	return isClient
}
