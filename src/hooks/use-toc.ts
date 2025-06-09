import { useEffect, useState } from 'react'

export function useToc(headings: Array<string>) {
	let [inView, setInView] = useState('')

	useEffect(() => {
		let obs = new IntersectionObserver(
			(entries) => {
				for (let entry of entries) {
					let isInView = entry.intersectionRatio > 0
					if (isInView) {
						setInView(entry.target.id)
					}
				}
			},
			{ rootMargin: '-5% 0px -46% 0px', threshold: 0.3 },
		)

		for (let heading of headings) {
			let el = document.getElementById(heading)
			if (el) obs.observe(el)
		}

		return () => {
			obs.disconnect()
		}
	}, [headings])

	return inView
}
