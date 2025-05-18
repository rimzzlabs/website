import { useEffect, useState } from 'react'
import { match } from 'ts-pattern'

export function useTocProgress(inView: string) {
	let [properties, setProperties] = useState({ top: 0, height: 0 })

	useEffect(() => {
		if (inView) {
			let el = document.querySelector(`nav a[href="#${inView}"]`)
			if (!el) return

			let clientRect = el.getBoundingClientRect()

			// Get the sticky container
			let stickyContainer = document.querySelector('.sticky')
			if (!stickyContainer) return

			let stickyContainerRect = stickyContainer.getBoundingClientRect()
			let topOffset = stickyContainerRect.top

			// Calculate the top position relative to the sticky container
			let height = clientRect.height
			let top = match(height > 20)
				.with(true, () => clientRect.top - topOffset - height - 2)
				.with(false, () => clientRect.top - topOffset - height * 2.2)
				.exhaustive()
			setProperties({ height, top })
		} else {
			setProperties({ height: 0, top: 0 })
		}

		return () => {
			setProperties({ height: 0, top: 0 })
		}
	}, [inView])

	return [properties.top, properties.height] as const
}
