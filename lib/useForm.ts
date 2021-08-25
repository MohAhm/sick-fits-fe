import { IInputForm } from './../public/models';
import { ChangeEvent, useState } from 'react';

export default function useForm(initial: IInputForm = {}) {
  const [inputs, setInputs] = useState(initial)

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
			let { name, value, type } = e.target

			if (type === 'number') {
				value = Number(value)
			}

			if (type === 'file') {
				value[0] = e.target.files
			}

			setInputs({
					...inputs,
					[name]: value
			})
	}

	function resetForm() {
		setInputs(initial)
	}

	function clearForm() {
		const blankState = Object.fromEntries(
			Object.entries(inputs).map(([key, value]) => [key, ''])
		)
		setInputs(blankState)
	}

	return {
		inputs,
		resetForm,
		clearForm,
		handleChange
	}
}