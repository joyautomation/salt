export type InputProps = {
	id: string
	name: string
	label?: string
	type: HTMLInputElement['type']
	step?: HTMLInputElement['step']
	value: HTMLInputElement['value']
	validations: [(value: string, inputs: FormInputs) => boolean, string][]
	options?: { value: string; label: string }[]
}

export type FormInputs = InputProps[][]
export type FormInputsPartial = (Pick<InputProps, 'name'> & Partial<InputProps>)[][]

export type FormGroup = {
	heading?: string
	rows: InputProps[][]
}
