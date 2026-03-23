import type { Actions } from '@sveltejs/kit'
import { setTheme } from '$lib/actions.js'

export const actions: Actions = {
	setTheme,
	click: async () => {
		return {
			message: 'Hello, world!',
			type: 'success'
		}
	},
	contact: async ({ request }) => {
		const data = await request.formData()
		const name = data.get('name')
		const email = data.get('email')
		const subject = data.get('subject')
		return {
			message: `Message received from ${name} (${email}) about ${subject}`,
			type: 'success'
		}
	}
}
