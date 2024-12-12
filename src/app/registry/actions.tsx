'use server'

export const registerCattle = async (cattle: Cattle) => {
	try {
		const response = await fetch('http://localhost:3000/cattle', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(cattle)
		})
		if (response.ok) {
			return await response.json()
		}
	}
	catch (error) {
		console.error(error)
	}

}
