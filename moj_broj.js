/* -------------------------------------------------------------------------- */
// Copyright (c) Nikola Vukićević 2025.
/* -------------------------------------------------------------------------- */
import * as dijkstra    from './dijkstra.js'
// import * as generator from './generator.js'
import * as fs from 'fs'
/* -------------------------------------------------------------------------- */
let rez = 0
const g = 1
/* -------------------------------------------------------------------------- */
for (let i = 0; i < g; ++i) {
	// const linije = (await fs.promises.readfile("./kombinacije.txt", "utf-8")).split("\n")
	// let kombinacije = fs.readFileSync("./kombinacije.txt", "utf-8")//.split("\n")
	let kombinacije = fs.readFileSync("./izrazi/izrazi3.txt", "utf-8")//.split("\n")
	kombinacije += fs.readFileSync("./izrazi/izrazi5.txt", "utf-8")
	kombinacije += fs.readFileSync("./izrazi/izrazi7.txt", "utf-8")
	kombinacije += fs.readFileSync("./izrazi/izrazi9.txt", "utf-8")
	// kombinacije += fs.readFileSync("./izrazi/izrazi11.txt", "utf-8")
	const linije = kombinacije.split("\n")

	for (let i = 0; i < linije.length; ++i) {
	// linije.foreach(l => {
		let l = linije[i]
		if (l == "" || l.startsWith("##")) continue
		rez = dijkstra.procenaIzraza(l, dijkstra.obj)
	// })
	}
}
console.log(`-------------------------`)
console.log(`Traženi broj: ${dijkstra.obj.zadatiBroj}`)
console.log(`Ponuđeni brojevi: ${dijkstra.obj.a} ${dijkstra.obj.b} ${dijkstra.obj.c} ${dijkstra.obj.d} ${dijkstra.obj.e} ${dijkstra.obj.f}`)
if (dijkstra.obj.najblizi == dijkstra.obj.zadatiBroj) {
	console.log(`Traženi broj je pronađen.`)
}
else {
	console.log(`Traženi broj NIJE PRONAĐEN.`)
	console.log(`Najbliži pronađeni broj je ${dijkstra.obj.najblizi}`)
}
console.log(`-------------------------`)
console.log(`LISTA REŠENJA:`)
console.log(`-------------------------`)
dijkstra.obj.listaResenja.forEach(e => {
	console.log(e[1])
	// console.log(e)
})

// console.log(dijkstra.obj)
/* -------------------------------------------------------------------------- */
