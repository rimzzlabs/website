import { Sparkles } from 'lucide-react'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '../ui/alert-dialog'
import { Button } from '../ui/button'
import { HiringForm } from './hiring-form'
import { useState } from 'react'

export function HiringFormButton() {
	let [open, setOpen] = useState(false)

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<Button className='relative w-36 h-9 lg:h-10 overflow-hidden'>
					<span className='absolute z-[1] rounded-sm justify-center bg-primary inset-0.5 text-primary-foreground inline-flex items-center gap-2'>
						Open to work <Sparkles />
					</span>
					<span className='animate-[spin_5s_ease-out_infinite] absolute rounded-lg left-0.5 inset-y-0.5 right-0 bg-gradient-to-r from-orange-500 to-violet-500' />
				</Button>
			</AlertDialogTrigger>

			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Send me an email</AlertDialogTitle>
					<AlertDialogDescription>
						I&apos;m currently open to work! You can send me an email and I&apos;ll get back to you
						as soon as possible.
					</AlertDialogDescription>
				</AlertDialogHeader>

				<HiringForm onClose={() => setOpen(false)}>
					{(isPending) => (
						<AlertDialogFooter>
							<Button disabled={isPending}>Submit</Button>

							<AlertDialogCancel asChild>
								<Button variant='outline' disabled={isPending} type='button'>
									Close
								</Button>
							</AlertDialogCancel>
						</AlertDialogFooter>
					)}
				</HiringForm>
			</AlertDialogContent>
		</AlertDialog>
	)
}
