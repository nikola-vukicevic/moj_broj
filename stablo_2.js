/* -------------------------------------------------------------------------- */
// Copyright (c) Nikola Vukićević 2025.
/* -------------------------------------------------------------------------- */
import { bfsIspisStabla,
         generisanjeStabla
       } from './stablo_pom.js'
// import * as util from 'util' // fancy ispis u konzoli
/* -------------------------------------------------------------------------- */
class cvorNebinarni {
	constructor(cvor) {
		this.tekst         = ""
		this.koren         = [ ]
		this.potomci       = [ ]
		this.znakOperacije = (cvor)? cvor.tekst : ""
		this.operacija     = -1
		this.kategorija    = (cvor)? cvor.kategorija : 0
                             // 1: sabiranje ili oduzimanje
                             // 2: množenje ili deljenje
		this.leviDesni     = (cvor)? cvor.leviDesni : -1
		this.najnizi       = ""
		this.postfix       = ""
	}

	azuriranjeZnakaOperacije() {
		if (this.operacija == 1) this.znakOperacije = "-"
		if (this.operacija == 2) this.znakOperacije = "+"
		if (this.operacija == 3) this.znakOperacije = "/"
		if (this.operacija == 4) this.znakOperacije = "*"
	}
}
/* -------------------------------------------------------------------------- */
// console.log(Stablo)
/* -------------------------------------------------------------------------- */
function _initStablo2(stablo) {
	const stablo2 = {
		koren: new cvorNebinarni(stablo.koren),
		naziv: "Stablo2"
	}

	stablo2.koren.operacija = 2 // 2 = sabiranje (neutralno) // 19

	popunjavanjeKorenogCvora(stablo.koren, stablo.koren.kategorija, stablo2.koren.koren)
	pronalazenjePotomaka(stablo2.koren.koren, stablo2.koren.potomci)

	return stablo2
}
/* -------------------------------------------------------------------------- */
// Pronalaženje "suseda" korenog čvora
/* ----------------------------------- */
// cvor (binarni čvor) - kategorija (+- ili */; preuzima se iz binarnog čvora) - susedi (svi 'susedi' koji čine koren nebinarnog čvora)
function popunjavanjeKorenogCvora(cvor, kategorija, susedi) {
	if (cvor == null)                  return
	if (cvor.kategorija != kategorija) return

	cvor.sused = true
	susedi.push(cvor)

	popunjavanjeKorenogCvora(cvor.levi,  kategorija, susedi)
	popunjavanjeKorenogCvora(cvor.desni, kategorija, susedi)
	
	const dummyPredak = kreiranjeDummyPretka(cvor)
	obrtanjeOperacija(cvor, dummyPredak)
}
/* -------------------------------------------------------------------------- */
function kreiranjeDummyPretka(cvor) {
	let opPom = (cvor.operacija < 3)? 2 : 4

	return {
		operacija : opPom,
		obrtanje  : false // TODO: vrv može da se ukloni
	}
}
/* -------------------------------------------------------------------------- */
function obrtanjeOperacijaRadni(cvor, prethodni) {
	// levi operand:
	if (cvor.leviDesni == 0) {
		if (prethodni.obrtanje) {
			return true
		}
		else {
			return false
		}
	}

	// desni operand:
	let operacija = (cvor.operacija      == 1 || cvor.operacija      == 3)? 1 : 2
	let predak    = (prethodni.operacija == 1 || prethodni.operacija == 3)? 1 : 2

	if (prethodni.obrtanje == false) {
		if (predak == 1) {
			return true
		}
		else {
			return false
		}
	}
	else {
		if (predak == operacija) {
			return false
		}
		else {
			return true
		}
	}
}
/* -------------------------------------------------------------------------- */
function obrtanjeOperacija(cvor, prethodni) {
	if (cvor == null) return

	cvor.obrtanje = obrtanjeOperacijaRadni(cvor, prethodni)

	obrtanjeOperacija(cvor.levi,  cvor)
	obrtanjeOperacija(cvor.desni, cvor)
}
/* -------------------------------------------------------------------------- */
function kreiranjeTeksta(cvor) {
	cvor.koren.forEach(sused => {
		cvor.tekst += sused.tekst
	})
}
/* -------------------------------------------------------------------------- */
function pronalazenjePotomaka(susedi, potomci) {
	susedi.forEach(sused => {
		if (sused.levi  != null && sused.levi.sused  == false) {
			dodavanjePotomka(sused.levi, sused, potomci)
		}
		if (sused.desni != null && sused.desni.sused == false) {
			dodavanjePotomka(sused.desni, sused, potomci)
		}
	})

	sortiranjePotomaka(potomci)
}
/* -------------------------------------------------------------------------- */
// operacija (predak) - leviDesni (cvor) - flip (predak)
function odredjivanjeOperacijeRadni(operacija, leviDesni, flip) {
	let kategorija = (operacija < 3)? 1 : 3 // lepše je 1 ili 2,
											// ali, ovako se samo dodaje
											// ili ne dodaje jedinica
											// na kraju ....
	let tip = (operacija == 1 || operacija == 3)? 1 : 2

	if (leviDesni == 0) { // levi operand
		// return (operacija < 3)? 2 : 4
		if (flip == true  && tip == 1) return kategorija
		if (flip == true  && tip == 2) return kategorija
		if (flip == false && tip == 1) return kategorija + 1
		if (flip == false && tip == 2) return kategorija + 1
	}
	else { // desni operand
		if (flip == true  && tip == 1) return kategorija + 1
		if (flip == true  && tip == 2) return kategorija
		if (flip == false && tip == 1) return kategorija
		if (flip == false && tip == 2) return kategorija + 1
	}
}
/* -------------------------------------------------------------------------- */
function odredjivanjeOperacije(noviCvor, leviDesni, predak) {
	noviCvor.operacija = odredjivanjeOperacijeRadni(predak.operacija, leviDesni, predak.obrtanje)
	noviCvor.azuriranjeZnakaOperacije()
}
/* -------------------------------------------------------------------------- */
function dodavanjePotomka(cvor, predak, potomci) {
	let noviCvor = new cvorNebinarni(cvor)
	odredjivanjeOperacije(noviCvor, cvor.leviDesni, predak)
	popunjavanjeKorenogCvora(cvor, cvor.kategorija, noviCvor.koren)
	kreiranjeTeksta(noviCvor)
	potomci.push(noviCvor)
}
/* -------------------------------------------------------------------------- */
function sortiranjePotomaka(potomci) {
	for (let i = 0; i < potomci.length - 1; ++i) {
		for (let j = i + 1; j < potomci.length; ++j) {
			if (potomci[i].operacija < potomci[j].operacija) {
				let p      = potomci[i]
				potomci[i] = potomci[j]
				potomci[j] = p
			}
		}
	}
}
/* -------------------------------------------------------------------------- */
function proveraUredjenosti(potomci) {
	let i = 0

	while (i < potomci.length - 1) {
		let nastavak1 = potomci[i].operacija == potomci[i + 1].operacija &&
			            potomci[i].najnizi < potomci[i + 1].najnizi
		let nastavak2 = potomci[i].operacija == potomci[i + 1].operacija + 1

		if (!nastavak1 && !nastavak2) {
			return false
		}

		++i
	}

	return true
}
/* -------------------------------------------------------------------------- */
function sortiranjePremaNajnizemRadni(potomci) {
	let i = 0

	while (i < potomci.length - 1) {
		let uslov = potomci[i].operacija == potomci[i + 1].operacija &&
		            potomci[i].najnizi > potomci[i + 1].najnizi

		if (uslov) {
			let p          = potomci[i]
			potomci[i]     = potomci[i + 1]
			potomci[i + 1] = p
		}

		++i
	}
}
/* -------------------------------------------------------------------------- */
function sortiranjePremaNajnizemRekurzija(cvor) {
	if (cvor.potomci.length > 0) {
		cvor.potomci.forEach(potomak => {
			sortiranjePremaNajnizemRekurzija(potomak)
		})
	}

	let uredjen = false

	while (uredjen == false) {
		sortiranjePremaNajnizemRadni(cvor.potomci)
		uredjen = proveraUredjenosti(cvor.potomci)
	}

	if (cvor.potomci.length > 0)
		cvor.najnizi = cvor.potomci[0].najnizi
}
/* -------------------------------------------------------------------------- */
function upisNajnizegStablo2(cvor) {
	if (cvor.potomci.length > 0) {
		cvor.potomci.forEach(potomak => {
			upisNajnizegStablo2(potomak)
		})
	}

	if (cvor.potomci.length > 0) {
		cvor.najnizi = cvor.potomci[0].najnizi
	}
	else {
		cvor.najnizi = cvor.koren[0].tekst
	}
}
/* -------------------------------------------------------------------------- */
function popunjavanjeStabla(cvor) {
	pronalazenjePotomaka(cvor.koren, cvor.potomci)

	if (cvor.potomci == null) return

	cvor.potomci.forEach(potomak => {
		popunjavanjeStabla(potomak)
	})
}
/* -------------------------------------------------------------------------- */
function generisanjePostfiksnogIzraza(koren) {
	koren.potomci.forEach(potomak => {
		generisanjePostfiksnogIzraza(potomak)
	})

	if (koren.potomci.length == 0) {
		koren.postfix = koren.koren[0].tekst
	}
	else {
		koren.postfix += `${koren.potomci[0].postfix}${koren.potomci[1].postfix}${koren.potomci[1].znakOperacije}`
	}

	let i = 2

	while (i < koren.potomci.length) {
		koren.postfix += `${koren.potomci[i].postfix}${koren.potomci[i].znakOperacije}`
		++i
	}
}
/* -------------------------------------------------------------------------- */
export function svodjenjeIzraza2(izraz) {
	const stablo1 = generisanjeStabla(izraz)
	// console.log(stablo1)
	const stablo2 = _initStablo2(stablo1)
	popunjavanjeStabla(stablo2.koren)
	upisNajnizegStablo2(stablo2.koren)
	sortiranjePremaNajnizemRekurzija(stablo2.koren)
	generisanjePostfiksnogIzraza(stablo2.koren)
	// console.log(stablo2.koren)
	return stablo2.koren.postfix
}
/* -------------------------------------------------------------------------- */
function demo() {
	// const postfix0 = "ab-ef--gh-cd---"
	const postfix0 = "bc-efd-*+ghkm*+n-*-"
	// const postfix0 = "abc+-"
	const postfix1 = (process.argv.length == 3)? process.argv[2] : postfix0
	// const postfix1 = /* (process.argv.length == 3)? process.argv[2] : */ postfix0
	const postfix2 = svodjenjeIzraza2(postfix1)
	console.log(postfix1)
	console.log(postfix2)
}
/* -------------------------------------------------------------------------- */
// demo()
/* -------------------------------------------------------------------------- */

