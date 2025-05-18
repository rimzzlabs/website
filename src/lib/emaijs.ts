import type { HiringSchema } from '@/components/hiring-form/hiring-form'
import { send, init } from '@emailjs/browser'
import { formatDate } from './date'

init({ publicKey: 'EDQ0Jka7g4t2n_Qd2' })
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
