/* -------------------------------------------------------------------------- */
// Copyright (c) Nikola Vukićević 2025.
/* -------------------------------------------------------------------------- */
function odredjivanjeTipaTokena(v) {
	if (v == '+') return 1
	if (v == '-') return 1
	if (v == '*') return 1
	if (v == '/') return 1
	return 0
}
/* -------------------------------------------------------------------------- */
function odredjivanjeKategorijeTokena(v) {
	if (v == '-') return 1
	if (v == '+') return 1
	if (v == '/') return 2
	if (v == '*') return 2
	return 0
}
/* -------------------------------------------------------------------------- */
function odredjivanjeTipaOperacije(v) {
	if (v == '-') return 1
	if (v == '+') return 2
	if (v == '/') return 3
	if (v == '*') return 4
	return 0
}
/* -------------------------------------------------------------------------- */
class Cvor {
	constructor(s) { // s: tekst('a', 'b', '+', '-' i sl)
		this.tekst      = s
		this.tip        = odredjivanjeTipaTokena(s)
		this.levi       = null
		this.desni      = null
		this.leviDesni  = -1 // da li je levi ili desni potomak
                             // 0: levi potomak, 1: desni potomak
		this.operacija  = odredjivanjeTipaOperacije(s)
		this.obrtanje   = false
		this.kategorija = odredjivanjeKategorijeTokena(s)
                          // 1: sabiranje ili oduzimanje
                          // 2: množenje ili deljenje
		this.sused      = false
		this.najnizi    = ""
	}
}
/* -------------------------------------------------------------------------- */
export function upisivanjeNajnizegStablo(cvor) {
	if (cvor.levi !== null && cvor.desni !== null) {
		upisivanjeNajnizegStablo(cvor.levi)
		upisivanjeNajnizegStablo(cvor.desni)

		if (cvor.tekst == "+" || cvor.tekst == "*") {
			cvor.najnizi = (cvor.levi.najnizi < cvor.desni.najnizi)? cvor.levi.najnizi : cvor.desni.najnizi
		}
		else {
			cvor.najnizi = cvor.levi.najnizi
		}
	}
	else {
		cvor.najnizi = cvor.tekst
	}
}
/* -------------------------------------------------------------------------- */
export function dodelaPrioritetaStablo(cvor, prioritet, prethodnaKategorija) {
	if (cvor == null) return

	cvor.prioritet = (cvor.kategorija != prethodnaKategorija)? prioritet + 1 : prioritet

	dodelaPrioritetaStablo(cvor.levi,  cvor.prioritet, cvor.kategorija)	
	dodelaPrioritetaStablo(cvor.desni, cvor.prioritet, cvor.kategorija)	
}
/* -------------------------------------------------------------------------- */
function ubacivanjeNaStek(token, stek ) {
	let cvor = new Cvor(token)
	stek.push(cvor)
}
/* -------------------------------------------------------------------------- */
function spajanjeCvorova(token, stek) {
	let koren = new Cvor(token)
	let op2   = stek.pop()
	let op1   = stek.pop()

	op1.leviDesni = 0
	op2.leviDesni = 1

	koren.levi  = op1
	koren.desni = op2
	
	stek.push(koren)
}
/* -------------------------------------------------------------------------- */
export function generisanjeStabla(s) {
	let stek = [ ]

	for (let i = 0; i < s.length; ++i) {
		let token = s[i]

		if (token >= 'a' && token <= 'z') {
			ubacivanjeNaStek(token, stek)
		}
		else {
			spajanjeCvorova(token, stek)
		}
	}

	if (stek.length !== 1) return null

	stek[0].leviDesni = 0 // koren je (figurativno) "levi" operand

	upisivanjeNajnizegStablo(stek[0])
	// bfsIspisStabla(stek[0])

	return {
		koren: stek[0]
	}
}
/* -------------------------------------------------------------------------- */
export function bfsIspisStabla(koren) {
	let red     = [ koren ]
	let sledeci = []
	let reseno  = false

	while (!reseno) {
		let s = ""

		while (red.length > 0) {
			const cvor = red[0]
			red.shift()
			s += `[${cvor.tekst}][${cvor.prioritet}][${cvor.najnizi}] (${(cvor.levi)? cvor.levi.tekst : ' ' }, ${(cvor.desni)? cvor.desni.tekst : ''})  `
			if (cvor.levi  !== null) sledeci.push(cvor.levi)
			if (cvor.desni !== null) sledeci.push(cvor.desni)
		}

		console.log(s.trim())
		console.log(`-------------------------`)

		let pom = red
		red     = sledeci
		sledeci = pom

		reseno = red.length == 0 && sledeci.length == 0
	}
}
/* -------------------------------------------------------------------------- */

