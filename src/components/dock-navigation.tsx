import { cn } from '@/lib/utils'
import { NAVIGATIONS } from './navigations'
import { Dock, DockIcon } from './ui/dock'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'
import { buttonVariants } from './ui/button'
import { Separator } from './ui/separator'
import { DockNavigationTheme } from './dock-navigation-theme'
import { DockNavigationOpenToWork } from './dock-navigation-open-to-work'

let homeNav = NAVIGATIONS.find((nav) => nav.pathname === '/')

export function DockNavigation() {
	return (
		<div className='pointer-events-none fixed inset-x-0 bottom-14 z-30 mx-auto flex origin-bottom h-full max-h-14'>
			<div className='fixed bottom-0 inset-x-0 h-16 bg-background to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-background' />
			<Dock className='z-50 pointer-events-auto relative mx-auto flex min-h-full h-full items-center px-1 bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] '>
				{homeNav && (
					<DockIcon>
						<Tooltip>
							<TooltipTrigger asChild>
								<a
									title={homeNav.label}
									href={homeNav.pathname}
									className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'size-12')}
								>
									<homeNav.icon className='size-4' />
								</a>
							</TooltipTrigger>
							<TooltipContent>
								<p>{homeNav.label}</p>
							</TooltipContent>
						</Tooltip>
					</DockIcon>
				)}

				<Separator orientation='vertical' className='h-full' />

				{NAVIGATIONS.filter((nav) => nav.pathname !== '/').map((item) => (
					<DockIcon key={item.pathname}>
						<Tooltip>
							<TooltipTrigger asChild>
								<a
									title={item.label}
									href={item.pathname}
									className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'size-12')}
								>
									<item.icon className='size-4' />
								</a>
							</TooltipTrigger>
							<TooltipContent>
								<p>{item.label}</p>
							</TooltipContent>
						</Tooltip>
					</DockIcon>
				))}
				<Separator orientation='vertical' className='h-full' />
				<DockNavigationOpenToWork />

				<DockIcon>
					<Tooltip>
						<TooltipTrigger asChild>
							{/* biome-ignore lint/a11y/useSemanticElements: <explanation> */}
							<div role='button' tabIndex={-1}>
								<DockNavigationTheme />
							</div>
						</TooltipTrigger>
						<TooltipContent>
							<p>Theme</p>
						</TooltipContent>
					</Tooltip>
				</DockIcon>
			</Dock>
		</div>
	)
}
