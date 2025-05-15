import { Loader, MonitorIcon, Moon, MoonStarIcon, SunIcon } from 'lucide-react'
import { Button } from '../ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { useIsClient } from '@/hooks/use-is-client'
import { useSystemTheme, useTheme } from '@/hooks/use-theme'
import { match, P } from 'ts-pattern'

let availableThemes = [
	{ label: 'Light', value: 'light', icon: SunIcon },
	{ label: 'Dark', value: 'dark', icon: MoonStarIcon },
	{ label: 'System', value: 'system', icon: MonitorIcon },
]

export function NavbarTheme() {
	let isClient = useIsClient()
	let theme = useTheme()
	let systemTheme = useSystemTheme()

	let onChangeTheme = (theme: string) => {
		return () => {
			let currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
			if (theme === currentTheme) return

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

	let icon = match([isClient, theme, systemTheme])
		.with([P._, P._, P.when((systemTheme) => systemTheme === theme)], () => (
			<MonitorIcon className='size-4' />
		))
		.with([P._, 'dark', P._], () => <Moon className='size-4' />)
		.with([P._, 'light', P._], () => <SunIcon className='size-4' />)
		.otherwise(() => <Loader className='animate-spin size-4' />)

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button size='icon' variant='ghost'>
					{icon}

					<span className='sr-only'>Change theme</span>
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align='end'>
				{availableThemes.map((theme) => (
					<DropdownMenuItem key={theme.value} onClick={onChangeTheme(theme.value)}>
						<theme.icon size='1em' /> {theme.label}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
