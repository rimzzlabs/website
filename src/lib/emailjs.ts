import type { HiringSchema } from '@/components/hiring-form/hiring-form'
import { send, init } from '@emailjs/browser'
import { formatDate } from './date'
import { PUBLIC_EMAILJS_KEY } from 'astro:env/client'

init({ publicKey: PUBLIC_EMAILJS_KEY })
export async function sendHiringEmail(values: HiringSchema) {
	let res = await send('service_3zw6ll4', 'hiring-template', {
		name: values.fullName,
		email: values.email,
		company: values.company || '-',
		message: values.message,
		time: formatDate(new Date()),
	})

	return res.status
}
