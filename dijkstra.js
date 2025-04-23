/* -------------------------------------------------------------------------- */
// Copyright (c) Nikola Vukićević 2025.
/* -------------------------------------------------------------------------- */
import { daLiJeOperand } from './util.js'
/* -------------------------------------------------------------------------- */
export const Obj = {
	a: 6,
	b: 2,
	c: 9,
	d: 3,
	e: 10,
	f: 75,
	zadatiBroj: 713,
	najblizi:       1000000,
	razdaljina:     1000000000,
	prosirenaLista: false,
	listaResenja:   [ ],
	mapaInfiksni:   new Map()
}
/* -------------------------------------------------------------------------- */
function formatiranjeInfiksnogOperanda(op, redniBroj, znak, znakPrioritet) {
	if (op.prioritet == 0) return `${op.zapis}`

	if (op.prioritet < znakPrioritet) return `(${op.zapis})`

	if (op.prioritet > znakPrioritet) return `${op.zapis}`
	
	if (redniBroj == 2 && (znak == '-' || znak == '/')) return `(${op.zapis})` 

	return `${op.zapis}`
}
/* -------------------------------------------------------------------------- */
function spajanjeInfiks(stek, znak) {
	let op2    = stek.pop()
	let op1    = stek.pop()
	let znakPr = (znak == "*" || znak == "/")? 2 : 1
	let op1Str = formatiranjeInfiksnogOperanda(op1, 1, znak, znakPr)
	let op2Str = formatiranjeInfiksnogOperanda(op2, 2, znak, znakPr)

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
			spajanjeInfiks(stek, znak)
		}
	}

	return stek[0].zapis
}
/* -------------------------------------------------------------------------- */
function racunanjeRanaTerminacija(op1, op2, znak) {
	// if (op1 == 0) return true
	// if (op2 == 0) return true

	if (znak == '*' && op1 == 1) return true
	if (znak == '*' && op2 == 1) return true
	if (znak == '/' && op1 == 1) return true
	if (znak == '/' && op2 == 1) return true

	return false
}
/* -------------------------------------------------------------------------- */
function sprecavanjeDecimalnihINule(znak, rez) {
	if (rez == 0)                return true
	if (Math.trunc(rez) !== rez) return true
	// if (znak !== '/')            return false
	return false
}
/* -------------------------------------------------------------------------- */
function racunanje(z, stek, obj) {
	const op2 = stek.pop()
	const op1 = stek.pop()

	if (racunanjeRanaTerminacija(op1, op2, z)) return false

	let rez = 0

	switch(z) {
		case '+': rez = op1 + op2; break;
		case '-': rez = op1 - op2; break;
		case '*': rez = op1 * op2; break;
		case '/': rez = op1 / op2; break;
		default: break;
	}

	if (sprecavanjeDecimalnihINule(z, rez)) return false

	stek.push(rez)

	return true
}
/* -------------------------------------------------------------------------- */
function proveraDuplikataInfiksni(izraz, obj) {
	if (obj.mapaInfiksni.get(izraz)) return true

	obj.mapaInfiksni.set(izraz, true)
	
	return false
}
/* -------------------------------------------------------------------------- */
function ubacivanjeIzrazaUListu(lista, postfiksniIzraz, obj, uklanjanjeInfiksnihDuplikata) {
	let infiksniIzraz = pretvaranjeUInfiksniZapis(postfiksniIzraz, obj)

	if (uklanjanjeInfiksnihDuplikata && proveraDuplikataInfiksni(infiksniIzraz, obj)) return

	lista.push([
		Math.ceil(postfiksniIzraz.length / 2),
		infiksniIzraz,
		// pretvaranjeUInfiksniZapis(izraz, obj),
		postfiksniIzraz
	])
}
/* -------------------------------------------------------------------------- */
function popunjavanjeListe(rez, izraz, obj, uklanjanjeInfiksnihDuplikata) {
	let razdaljina_pom = Math.abs(obj.zadatiBroj - rez)

	if (razdaljina_pom == obj.razdaljina) {
		ubacivanjeIzrazaUListu(obj.listaResenja, izraz, obj, uklanjanjeInfiksnihDuplikata)
	}

	if (razdaljina_pom < obj.razdaljina) {
		obj.razdaljina   = razdaljina_pom
		obj.najblizi     = rez
		obj.listaResenja = [ ]
		ubacivanjeIzrazaUListu(obj.listaResenja, izraz, obj, uklanjanjeInfiksnihDuplikata)
	}
}
/* -------------------------------------------------------------------------- */
export function procenaIzraza(s, obj, uklanjanjeInfiksnihDuplikata) {
	const stek = [ ]

	for (let i = 0; i < s.length; ++i) {
		const znak = s[i]

		if (daLiJeOperand(znak)) {
			stek.push(obj[znak])
		}
		else {
			const rez = racunanje(znak, stek, obj)
			if (rez == false) return // false
		}
	}

	popunjavanjeListe(stek[0], s, obj, uklanjanjeInfiksnihDuplikata)
}
/* -------------------------------------------------------------------------- */

