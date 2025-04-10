/* -------------------------------------------------------------------------- */
// Copyright (c) Nikola Vukićević 2025.
/* -------------------------------------------------------------------------- */
import * as dijkstra    from './dijkstra.js'
import * as fs from 'fs'
/* -------------------------------------------------------------------------- */
function pripremaPodataka(funkcijaZaObradu, obj) {
	let kombinacije = fs.readFileSync("./izrazi/izrazi3.txt", "utf-8")//.split("\n")
	kombinacije += fs.readFileSync("./izrazi/izrazi5.txt", "utf-8")
	kombinacije += fs.readFileSync("./izrazi/izrazi7.txt", "utf-8")
	kombinacije += fs.readFileSync("./izrazi/izrazi9.txt", "utf-8")
	// kombinacije += fs.readFileSync("./izrazi/izrazi11.txt", "utf-8")
	const linije = kombinacije.split("\n")

	for (let i = 0; i < linije.length; ++i) {
		let l = linije[i]
		if (l == "" || l.startsWith("##")) continue
		funkcijaZaObradu(l, obj)
	}
}
/* -------------------------------------------------------------------------- */
function demoIspis(obj, format) {
	// console.log(dijkstra.obj)
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
pripremaPodataka(dijkstra.procenaIzraza, dijkstra.obj)
demoIspis(dijkstra.obj, 1) // format: 1 - samo izrazi; 2 - izrazi + detalji
/* -------------------------------------------------------------------------- */
