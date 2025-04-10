/* -------------------------------------------------------------------------- */
// Copyright (c) Nikola Vukićević 2025.
/* -------------------------------------------------------------------------- */
import { daLiJeOperand } from './util.js'
/* -------------------------------------------------------------------------- */
const patterns = {
	znakovi:   [ 'a' , 'b' , 'c' , 'd' , 'e' , 'f' ],
	operacije: [ '+' , '-' , '*' , '/' ],

	pat3: {
		sirinaZnakovi:   2,
		sirinaOperacije: 1,
		patterns: [
			"001"
		]
	},

	pat5: {	
		sirinaZnakovi:   3,
		sirinaOperacije: 2,
		patterns: [
			"00011",
			"00101"
		]
	},

	pat7: {
		sirinaZnakovi:   4,
		sirinaOperacije: 3,
		patterns : [
			"0000111",
			"0001011",
			"0001101",
			"0010011",
			"0010101",
			// "0011001",
		],
	},

	pat9: {
		sirinaZnakovi:   5,
		sirinaOperacije: 4,
		patterns : [
			"000001111" ,
			"000010111" ,
			"000011011" ,
			"000011101" ,
			"000100111" ,
			"000101011" ,
			"000101101" ,
			"000110011" ,
			"000110101" ,
			/* 000111001 */
			"001000111" ,
			"001001011" ,
			"001001101" ,
			"001010011" ,
			"001010101" ,
			/* 001011001 */
			/* 001100011 */
			/* 001100101 */
			/* 001101001 */
			/* 001110001 */
		]
	},

	pat11: {
		sirinaZnakovi:   6,
		sirinaOperacije: 5,
		patterns : [
			"00000011111" , 
			"00000101111" , 
			"00000110111" , 
			"00000111011" , 
			"00000111101" , 
			"00001001111" , 
			"00001010111" , 
			"00001011011" , 
			"00001011101" , 
			"00001100111" , 
			"00001101011" , 
			"00001101101" , 
			"00001110011" , 
			"00001110101" , 
			/* 00001111001 */
			"00010001111" , 
			"00010010111" , 
			"00010011011" , 
			"00010011101" , 
			"00010100111" , 
			"00010101011" , 
			"00010101101" , 
			"00010110011" , 
			"00010110101" , 
			/* 00010111001 */
			"00011000111" , 
			"00011001011" , 
			"00011001101" , 
			"00011010011" , 
			"00011010101" , 
			/* 00011011001 */
			/* 00011100011 */
			/* 00011100101 */
			/* 00011101001 */
			/* 00011110001 */
			"00100001111" , 
			"00100010111" , 
			"00100011011" , 
			"00100011101" , 
			"00100100111" , 
			"00100101011" , 
			"00100101101" , 
			"00100110011" , 
			"00100110101" , 
			/* 00100111001 */
			"00101000111" , 
			"00101001011" , 
			"00101001101" , 
			"00101010011" , 
			"00101010101" , 
			/* 00101011001 */
			/* 00101100011 */
			/* 00101100101 */
			/* 00101101001 */
			/* 00101110001 */
			/* 00110000111 */
			/* 00110001011 */
			/* 00110001101 */
			/* 00110010011 */
			/* 00110010101 */
			/* 00110011001 */
			/* 00110100011 */
			/* 00110100101 */
			/* 00110101001 */
			/* 00110110001 */
			/* 00111000011 */
			/* 00111000101 */
			/* 00111001001 */
			/* 00111010001 */
			/* 00111100001 */
		]
	},
}
/* -------------------------------------------------------------------------- */
// KVAZIHASH za funkcije:
/* -------------------------------------------------------------------------- */
function obradaMinusKroz(stek, op1, op2, znak, rez) {
	rez.najnizi = op1.najnizi // (op1.najnizi < op2.najnizi)? op1.najnizi : op2.najnizi
	rez.zapis   = `${op1.zapis}${op2.zapis}${znak}`
	stek.push(rez)
}
/* -------------------------------------------------------------------------- */
function prevrtanjeOperanada(stek, znak) {
	let op2 = stek.pop()
	let op1 = stek.pop()
	let rez = {
		najnizi: 'x',
		zapis:   ""
	}

	if (znak == '-' || znak == '/') {
		obradaMinusKroz(stek, op1, op2, znak, rez)
		return
	}

	if (op1.najnizi < op2.najnizi) {
		rez.najnizi = op1.najnizi
		rez.zapis   = `${op1.zapis}${op2.zapis}${znak}`
	}
	else {
		rez.najnizi = op2.najnizi
		rez.zapis   = `${op2.zapis}${op1.zapis}${znak}`
	}

	stek.push(rez)
}
/* -------------------------------------------------------------------------- */
export function svodjenjeIzraza(izraz) {
	const stek = [ ]

	for (let i = 0; i < izraz.length; ++i) {
		let znak = izraz[i]
		if (daLiJeOperand(znak)) {
			stek.push({
				najnizi: znak,
				zapis:   znak
			})
		}
		else {
			prevrtanjeOperanada(stek, znak)
		}
	}

	return stek[0].zapis
}
/* -------------------------------------------------------------------------- */
// END OF KVAZIHASH
/* -------------------------------------------------------------------------- */
function daLiJePermutacija(s) {
	const pom = {
		a: 0, b: 0, c: 0, d: 0, e: 0, f: 0
	}

	for (let i = 0; i < s.length; ++i) {
		const znak = s[i]
		pom[znak]++
		if (pom[znak] > 1) return false
	}

	return true
}
/* -------------------------------------------------------------------------- */
function kreiranjeKombinacija(niz, brMesta, permutacije) {
	let brojac = 1
	let temp   = [ ...niz ]
	let lista  = [ ]

	while (brojac < brMesta) {
		for (let i = 0; i < niz.length; ++i) {
			for (let j = 0; j < temp.length; ++j) {
				let novi  = `${niz[i]}${temp[j]}`
				let uslov = (permutacije) ? daLiJePermutacija(novi) : true
				if (uslov) lista.push(novi)
			}
		}

		temp  = lista
		lista = [ ]
		brojac++
	}

	return temp
}
/* -------------------------------------------------------------------------- */
function utiskivanjePatterna(pat, zn, op) {
	let out    = ""
	let ind_zn = 0
	let ind_op = 0
	
	for (let i = 0; i < pat.length; ++i){
		// out += (p[i] = '0')? zn[ind_zn] : op[ind_op]
		if (pat[i] == '0') {
			out += zn[ind_zn]
			ind_zn++
		}
		else {
			out += op[ind_op]
			ind_op++
		}
	}

	return out
}
/* -------------------------------------------------------------------------- */
function proveraMape(mapa, izraz) {
	let p = svodjenjeIzraza(izraz)

	if (mapa.get(p)) return false

	mapa.set(p, true)

	return true
}
/* -------------------------------------------------------------------------- */
function kreiranjeIzraza(obj, num, hashOptimizacija) {
	let pattern   = `pat${num}`
	let znakovi   = kreiranjeKombinacija(obj.znakovi, obj[pattern].sirinaZnakovi, true)
	let operacije = kreiranjeKombinacija(obj.operacije, obj[pattern].sirinaOperacije, false) 
	const lista   = [ ]
	const mapa    = new Map()

	for (let i = 0; i < znakovi.length; ++i) {
		for (let j = 0; j < operacije.length; ++j) {
			for (let k = 0; k < obj[pattern].patterns.length; ++k) {
				// const s = `${znakovi[i]}${operacije[j]}`
				const p = utiskivanjePatterna(obj[pattern].patterns[k], znakovi[i], operacije[j])
				const odobren = (hashOptimizacija)? proveraMape(mapa, p) : true
				if (odobren) lista.push(p)
			}
		}
	}

	return lista
}
/* -------------------------------------------------------------------------- */
function ispisKombinacija(lista) {
	lista.forEach(e => {
		console.log(e)
	})
}
/* -------------------------------------------------------------------------- */
// Zapis u datoteku se obavlja preko shell-a (redirekcija).
function kreiranjeSadrzajaZaDatoteku(brOperatora, hashOptimizacija, demo) {
	// let lista1 = [ 'a' , 'b' , 'c' , 'd', 'e' , 'f' ]
	// let perm   = kreiranjeKombinacija(lista1, 3, false)
	let lista = kreiranjeIzraza(patterns, brOperatora, hashOptimizacija)

	if (demo) {
		console.log(`broj kombinacija: ${lista.length} (optimizacija: ${hashOptimizacija})`)
	}
	else {
		ispisKombinacija(lista)
	}
}
/* -------------------------------------------------------------------------- */
function demo() {
	let t1 = performance.now()

	console.log(`4 operanda - 3 operatora`)
	kreiranjeSadrzajaZaDatoteku(7, true, true)
	// kreiranjeSadrzajaZaDatoteku(7, false, true)
	let t2 = performance.now()
	let t3 = t2 - t1
	console.log(`vreme: ${(t3/1000).toFixed(2)}s`)
	t1 = performance.now()

	console.log(`------------------------`)

	console.log(`5 operanada - 4 operatora`)
	kreiranjeSadrzajaZaDatoteku(9, true, true)
	// kreiranjeSadrzajaZaDatoteku(9, false, true)
	t2 = performance.now()
	t3 = t2 - t1
	console.log(`vreme: ${(t3/1000).toFixed(2)}s`)
	t1 = performance.now()

	console.log(`------------------------`)

	console.log(`6 operanada - 5 operatora`)
	kreiranjeSadrzajaZaDatoteku(11, true, true)
	// kreiranjeSadrzajaZaDatoteku(11, false, true)
	t2 = performance.now()
	t3 = t2 - t1
	console.log(`vreme: ${(t3/1000).toFixed(2)}s`)
	t1 = performance.now()
}
/* -------------------------------------------------------------------------- */

// demo()

let s = "fbce*ad*-*+" 
let p = svodjenjeIzraza(s)
console.log(s)
console.log(p)

// kreiranjeSadrzajaZaDatoteku(11, true, false) // optimizacije - true; demo - false



