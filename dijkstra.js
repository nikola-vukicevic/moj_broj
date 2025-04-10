/* -------------------------------------------------------------------------- */
// Copyright (c) Nikola Vukićević 2025.
/* -------------------------------------------------------------------------- */
import { daLiJeOperand } from './util.js'
/* -------------------------------------------------------------------------- */
export const obj = {
	a: 6,
	b: 2,
	c: 9,
	d: 3,
	e: 10,
	f: 75,
	zadatiBroj: 713,
	// a: 3,
	// b: 3,
	// c: 4,
	// d: 5,
	// e: 15,
	// f: 50,
	// zadatiBroj: 969,
	najblizi:     1000000,
	razdaljina:   1000000000,
	listaResenja: [ ]
}
/* -------------------------------------------------------------------------- */
function formatiranjeInfiksnogOperanda(op, redniBroj, znak, znakPrioritet, poslednji) {
	if (op.prioritet == 0) return `${op.zapis}`

	if (op.prioritet < znakPrioritet) return `(${op.zapis})`

	if (op.prioritet > znakPrioritet) return `${op.zapis}`
	
	if (redniBroj == 2 && (znak == '-' || znak == '/')) return `(${op.zapis})` 

	return `${op.zapis}`
}
/* -------------------------------------------------------------------------- */
function spajanjeInfiks(stek, znak, poslednji) {
	let op2    = stek.pop()
	let op1    = stek.pop()
	let znakPr = (znak == "*" || znak == "/")? 2 : 1
	let op1Str = formatiranjeInfiksnogOperanda(op1, 1, znak, znakPr, poslednji)
	let op2Str = formatiranjeInfiksnogOperanda(op2, 2, znak, znakPr, poslednji)

	stek.push({
		prioritet: znakPr,
		zapis:     `${op1Str} ${znak} ${op2Str}`
	})
}
/* -------------------------------------------------------------------------- */
function pretvaranjeUInfiksniZapis(rpn, obj) {
	const stek = [ ]

	for (let i = 0; i < rpn.length; ++i) {
		const znak = rpn[i]
		if (daLiJeOperand(znak)) {
			stek.push({
				prioritet: 0,
				zapis:     `${obj[znak]}`
			})
		}
		else {
			const poslednji = i == rpn.length - 1
			spajanjeInfiks(stek, znak, poslednji)
		}
	}

	return stek[0].zapis
}
/* -------------------------------------------------------------------------- */
function racunanjeRanaTerminacija(op1, op2, znak) {
	if (op1 == 0) return true
	if (op2 == 0) return true

	if (znak == '*' && op1 == 1) return true
	if (znak == '*' && op2 == 1) return true
	if (znak == '/' && op1 == 1) return true
	if (znak == '/' && op2 == 1) return true

	return false
}
/* -------------------------------------------------------------------------- */
function sprecavanjeDecimalnih(znak, rez) {
	if (znak !== '/') return false
	if (Math.trunc(rez) !== rez) return true
	return false
}
/* -------------------------------------------------------------------------- */
function racunanje(z, stek, obj) {
	const op2 = stek.pop()
	const op1 = stek.pop()

	if (racunanjeRanaTerminacija(op1, op2, z)) return false

	let rez = -1000

	switch(z) {
		case '+': rez = op1 + op2; break;
		case '-': rez = op1 - op2; break;
		case '*': rez = op1 * op2; break;
		case '/': rez = op1 / op2; break;
		default: break;
	}

	if (sprecavanjeDecimalnih(z, rez)) return false

	stek.push(rez)

	return true
}
/* -------------------------------------------------------------------------- */
function ubacivanjeIzrazaUListu(lista, izraz, obj) {
	lista.push([
		Math.ceil(izraz.length / 2),
		pretvaranjeUInfiksniZapis(izraz, obj),
		izraz
	])
}
/* -------------------------------------------------------------------------- */
function popunjavanjeListe(rez, izraz, obj) {
	let razdaljina_pom = Math.abs(obj.zadatiBroj - rez)

	if (razdaljina_pom == obj.razdaljina) {
		ubacivanjeIzrazaUListu(obj.listaResenja, izraz, obj)
		return true
	}

	if (razdaljina_pom < obj.razdaljina) {
		obj.razdaljina   = razdaljina_pom
		obj.najblizi     = rez
		obj.listaResenja = [ ]
		ubacivanjeIzrazaUListu(obj.listaResenja, izraz, obj)
		return true
	}
}
/* -------------------------------------------------------------------------- */
export function procenaIzraza(s, obj) {
	const stek = [ ]

	for (let i = 0; i < s.length; ++i) {
		const znak = s[i]

		if (daLiJeOperand(znak)) {
			stek.push(obj[znak])
		}
		else {
			const rez = racunanje(znak, stek, obj)
			if (rez == false) return false
		}
	}

	return popunjavanjeListe(stek[0], s, obj)
}
/* -------------------------------------------------------------------------- */

