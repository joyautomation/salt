export type InputProps = {
	id: string
	name: string
	label: string
	type: HTMLInputElement['type']
	value: string
	validation: (value: string) => string | null
}
