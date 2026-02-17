import { writable } from 'svelte/store'
import { nanoid } from 'nanoid'

export interface NotificationInput {
	type: string
	message: string
}

export interface Notification {
	id: string
	type: string
	message: string
}

const initializer: Notification[] = []

export const notifications = $state({
	current: initializer
})

export function addNotification(notification: NotificationInput) {
	const id = nanoid()
	notifications.current = [
		...notifications.current,
		{
			id,
			...notification
		}
	]
	setTimeout(() => {
		notifications.current = notifications.current.filter((n) => n.id !== id)
	}, 5000)
	return id
}
