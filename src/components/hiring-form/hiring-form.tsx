import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form'
import { withSonnerPromise } from '@/lib/async'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import Turnstile from 'react-turnstile'
import { sendHiringEmail } from '@/lib/emaijs'

let hiringSchema = z.object({
	fullName: z.string().min(1, 'Full name is required').max(100, 'Full name is too long'),
	company: z.string().optional(),
	email: z.string().min(1, 'Email is required').email('Invalid email'),
	message: z.string().min(1, 'Message is required').max(2000, 'Message is too long'),
	captchaVerified: z
		.boolean()
		.refine((value) => value, { message: 'Please verify you are not a robot' }),
})

export type HiringSchema = z.infer<typeof hiringSchema>
type HiringFormProps = {
	children: (isPending: boolean) => React.ReactNode
	onClose: () => void
}

export function HiringForm(props: HiringFormProps) {
	let form = useForm<HiringSchema>({
		mode: 'onChange',
		defaultValues: { company: '', email: '', fullName: '', message: '', captchaVerified: false },
		resolver: zodResolver(hiringSchema),
	})

	let onSubmit = form.handleSubmit(
		withSonnerPromise(
			async (values) => {
				let status = await sendHiringEmail(values)
				if (status !== 200) throw new Error('Failed to send email')
				form.reset()
				props.onClose()
			},
			{
				loading: 'Sending email',
				success: 'Email sent successfully',
				error: 'Failed to send email',
			},
		),
	)

	return (
		<Form {...form}>
			<form onSubmit={onSubmit} className='grid gap-5'>
				<FormField
					name='fullName'
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel asterisk>Full name</FormLabel>
							<FormControl>
								<Input placeholder='John Doe' autoComplete='name' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					name='company'
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Company name</FormLabel>
							<FormControl>
								<Input placeholder='e.g. Acme Inc' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					name='email'
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email address</FormLabel>
							<FormControl>
								<Input placeholder='john.doe@me.com' {...field} />
							</FormControl>
							<FormDescription>It&apos;s only used to get back to you.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					name='message'
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Message</FormLabel>
							<FormControl>
								<Textarea
									className='h-36 resize-none'
									placeholder='Hello Rizki, I would like to talk with you about...'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					name='captchaVerified'
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<Turnstile
								sitekey='0x4AAAAAABdxcUSg5qX0n-wm'
								onSuccess={() => field.onChange(true)}
								onError={() => field.onChange(false)}
								appearance='execute'
							/>
							<FormMessage />
						</FormItem>
					)}
				/>

				{props.children(form.formState.isSubmitting)}
			</form>
		</Form>
	)
}
