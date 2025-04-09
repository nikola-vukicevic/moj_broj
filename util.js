/* -------------------------------------------------------------------------- */
// Copyright (c) Nikola Vukićević 2025.
/* -------------------------------------------------------------------------- */
export function daLiJeOperand(znak) {
	return znak >= 'a' && znak <= 'f'
}
/* -------------------------------------------------------------------------- */
function daLiJePostfix(izraz) {
	const stek = [ ]

	for (let i = 0; i < izraz.length; ++i) {
		const znak = izraz[i]

		if (znak == 0) {
			stek.push(znak)
		}
		else {
			if (stek.length >= 2) {
				stek.pop()
			}
			else {
				return false
			}
		}
	}

	return true
}
/* -------------------------------------------------------------------------- */
function demo() {
	const izrazi = [
		"0000111",
		"0001011",
		"0001101",
		"0010011",
		"0010101",
		"0011001",
	]

	const greske = [ ]

	izrazi.forEach(izraz => {
		if (daLiJePostfix(izraz)) {
			console.log(`"${izraz}" , `)
		}
		else {
			greske.push(izraz)
			console.log(`/* ${izraz} */`)
		}
	})

	console.log(greske.length)
	// greske.forEach(e => {
	// 	console.error(`Greška: ${e}`)
	// })
}
/* -------------------------------------------------------------------------- */

// demo()



