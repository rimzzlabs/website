import { Loader, MonitorIcon, Moon, MoonStarIcon, SunIcon } from 'lucide-react'
import { Button, buttonVariants } from './ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { useIsClient } from '@/hooks/use-is-client'
import { match, P } from 'ts-pattern'
import { useState } from 'react'

let availableThemes = [
	{ label: 'Light', value: 'light', icon: SunIcon },
	{ label: 'Dark', value: 'dark', icon: MoonStarIcon },
	{ label: 'System', value: 'system', icon: MonitorIcon },
]

export function DockNavigationTheme() {
	let isClient = useIsClient()
	let [themeValue, setThemeValue] = useState(() => {
		if (import.meta.env.SSR === false) {
			return localStorage.getItem('app.selected.theme')
		}
		return null
	})

	let onChangeTheme = (theme: string) => {
		return () => {
			let currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
			setThemeValue(theme)
			localStorage.setItem('app.selected.theme', theme)

			let isSystemTheme = theme === 'system'
			if (isSystemTheme) {
				let systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
					? 'dark'
					: 'light'

				document.documentElement.classList.remove(currentTheme)
				document.documentElement.classList.add(systemTheme)
				return
			}
			document.documentElement.classList.remove(currentTheme)
			document.documentElement.classList.add(theme)
		}
	}

	let icon = match([isClient, themeValue])
		.with([P._, 'dark'], () => <Moon className='size-4' />)
		.with([P._, 'light'], () => <SunIcon className='size-4' />)
		.otherwise(() => <MonitorIcon className='size-4' />)

	if (!isClient) {
		return (
			<Button size='icon' variant='ghost' className='size-12'>
				<Loader className='animate-spin size-4' />

				<span className='sr-only'>Change theme</span>
			</Button>
		)
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className={buttonVariants({ variant: 'ghost', size: 'icon-lg' })}>
				{icon}

				<span className='sr-only'>Change theme</span>
			</DropdownMenuTrigger>

			<DropdownMenuContent className='z-[99999]' align='end' sideOffset={12} alignOffset={-12}>
				{availableThemes.map((theme) => (
					<DropdownMenuItem key={theme.value} onClick={onChangeTheme(theme.value)}>
						<theme.icon size='1em' /> {theme.label}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
