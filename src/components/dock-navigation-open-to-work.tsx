import { Fragment, useState } from 'react'
import { Button } from './ui/button'
import { BriefcaseBusiness } from 'lucide-react'
import { HiringFormButtonLess } from './hiring-form/hiring-form-button-less'
import { DockIcon } from './ui/dock'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'
import info from '@/configs/info.json'

export function DockNavigationOpenToWork() {
	let [open, setOpen] = useState(false)

	if (!info.isAvailableForWork) return null

	return (
		<DockIcon>
			<Tooltip>
				<TooltipTrigger asChild>
					{/* biome-ignore lint/a11y/useSemanticElements: <explanation> */}
					<div role='button' tabIndex={-1}>
						<Button onClick={() => setOpen(true)} variant='ghost' size='icon-lg'>
							<BriefcaseBusiness />
							<span className='sr-only'>Open to Work</span>
						</Button>
					</div>
				</TooltipTrigger>
				<TooltipContent>
					<p>Open To Work</p>
				</TooltipContent>
			</Tooltip>
			<HiringFormButtonLess open={open} onOpenChange={setOpen} />
		</DockIcon>
	)
}
