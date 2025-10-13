import type { Dispatch, SetStateAction } from 'react'

import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '../ui/alert-dialog'
import { Button } from '../ui/button'
import { HiringForm } from './hiring-form'

type HiringFormButtonLessProps = {
	open: boolean
	onOpenChange: Dispatch<SetStateAction<boolean>>
}

export function HiringFormButtonLess(props: HiringFormButtonLessProps) {
	return (
		<AlertDialog open={props.open} onOpenChange={props.onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Send me an email</AlertDialogTitle>
					<AlertDialogDescription>
						I&apos;m currently open to work! You can send me an email and I&apos;ll get back to you
						as soon as possible.
					</AlertDialogDescription>
				</AlertDialogHeader>

				<HiringForm onClose={() => props.onOpenChange(false)}>
					{(isPending) => (
						<AlertDialogFooter className='flex-col'>
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
