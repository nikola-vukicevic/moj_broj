/* -------------------------------------------------------------------------- */
// Copyright (c) Nikola Vukićević 2025.
/* -------------------------------------------------------------------------- */
import * as dijkstra from './dijkstra.js'
import * as fs from 'fs'
/* -------------------------------------------------------------------------- */
function pripremaPodataka(funkcijaZaObradu, obj) {
	// let kombinacije = fs.readFileSync("./kombinacije.txt", "utf-8")//.split("\n")
	let kombinacije = fs.readFileSync("./izrazi/izrazi3.txt", "utf-8")//.split("\n")
	kombinacije += fs.readFileSync("./izrazi/izrazi5.txt", "utf-8")
	kombinacije += fs.readFileSync("./izrazi/izrazi7.txt", "utf-8")
	kombinacije += fs.readFileSync("./izrazi/izrazi9.txt", "utf-8")
	if (obj.prosirenaLista) {
		kombinacije += fs.readFileSync("./izrazi/izrazi11.txt", "utf-8")
	}
	const linije = kombinacije.split("\n")

	for (let i = 0; i < linije.length; ++i) {
		let l = linije[i]
		if (l == "" || l.startsWith("##")) continue
		funkcijaZaObradu(l, obj)
	}
}
/* -------------------------------------------------------------------------- */
function demoIspis(obj, header, format) {
	// console.log(dijkstra.obj)
	if (header) {
		console.log(`-------------------------`)
		console.log(`Traženi broj: ${obj.zadatiBroj}`)
		console.log(`Ponuđeni brojevi: ${obj.a} ${obj.b} ${obj.c} ${obj.d} ${obj.e} ${obj.f}`)
		if (obj.najblizi == obj.zadatiBroj) {
			console.log(`Traženi broj je pronađen.`)
		}
		else {
			console.log(`Traženi broj NIJE PRONAĐEN.`)
			console.log(`Najbliži pronađeni broj je ${obj.najblizi}`)
		}
		console.log(`-------------------------`)
		console.log(`LISTA REŠENJA:`)
		console.log(`-------------------------`)
	}

	if (!header && format == 1) console.log(obj.zadatiBroj)

	obj.listaResenja.forEach(e => {
		if (format == 1) {
			console.log(e[1])
		}
		else {
			console.log(e)
		}
	})
}
/* -------------------------------------------------------------------------- */
function ucitavanjeIzKonzole(obj) {
	if (process.argv[2] == undefined) return

	let brojevi = []

	for (let i = 2; i <= 8; ++i) {
		if (process.argv[i] == undefined) return
		brojevi.push(process.argv[i])
	}
	obj.a = parseInt(brojevi[0]); obj.b = parseInt(brojevi[1]);
	obj.c = parseInt(brojevi[2]); obj.d = parseInt(brojevi[3]);
	obj.e = parseInt(brojevi[4]); obj.f = parseInt(brojevi[5]);
	obj.zadatiBroj = parseInt(brojevi[6])
	obj.prosirenaLista = process.argv[9] == "-e" || false
}
/* -------------------------------------------------------------------------- */
ucitavanjeIzKonzole(dijkstra.Obj)
pripremaPodataka(dijkstra.procenaIzraza, dijkstra.Obj)
demoIspis(dijkstra.Obj, 1, 1) // 1. Objekat koji sadrži ulazne podatke i rešenja
                              // 2. Header, da-ne
                              // 3. Format: 1 - samo izrazi; 2 - izrazi + detalji
/* -------------------------------------------------------------------------- */
