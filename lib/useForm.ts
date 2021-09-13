import { IInputForm } from './../public/models';
import { useState, useEffect } from 'react';

export default function useForm(initial: IInputForm = {}) {
  const [inputs, setInputs] = useState(initial)
  const initialValues = Object.values(initial).join('')

	useEffect(() => {
    setInputs(initial)
	}, [initialValues])

	function handleChange(e: any) {
			let { name, value, type, files } = e.target

			if (type === 'number') {
				value = Number(value)
			}

			if (type === 'file') {
				[value] = files
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