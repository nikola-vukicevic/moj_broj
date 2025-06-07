/* -------------------------------------------------------------------------- */
#include "./dijkstra_klase.h"
/* -------------------------------------------------------------------------- */
ResenjeElement::ResenjeElement(int brElemenata, std::string infix, std::string postfix) {
	this->brElemenata = brElemenata;
	this->infix       = infix;
	this->postfix     = postfix;
}
/* -------------------------------------------------------------------------- */
CvorPom::CvorPom(int prioritet, std::string zapis, std::string najnizi) {
	this->prioritet = prioritet;
	this->zapis     = zapis;
	this->najnizi   = najnizi;     
}
/* -------------------------------------------------------------------------- */
DijkstraObj::DijkstraObj() {
	this->a              = 0;
	this->b              = 0;
	this->c              = 0;     
	this->a              = 0;
	this->b              = 0;
	this->c              = 0;     
	this->zadatiBroj     = 0;
	this->najblizi       = 1'000'000;
	this->razdaljina     = 1'000'000'000;
	this->pronadjen      = false;
	this->prosirenaLista = false;     
}
/** ----------------------------------------------------------------------------
 * Očitavanja vrednosti nekog od zadatih brojeva, 
 * shodno zadatom identifikatoru.
 */
int DijkstraObj::pronalazenjeVrednosti(char c) {
	switch (c) {
		case 'a': return this->a; break;
		case 'b': return this->b; break;
		case 'c': return this->c; break;
		case 'd': return this->d; break;
		case 'e': return this->e; break;
		case 'f': return this->f; break;
		default: return -1; break;
	}
}
/** ----------------------------------------------------------------------------
 * Pomoćni operator za pronalaženje nekog od zadatih brojeva.
 */
int DijkstraObj::operator [] (char c) {
	return pronalazenjeVrednosti(c);
}
/* -------------------------------------------------------------------------- */
std::string DijkstraObj::ispisDebug() {
	std::string s = "";
	s += "-------------\n";
	s += "Dijkstra obj:\n";
	s += "-------------\n";
	s += "a = " + std::to_string(this->a) + "\n";
	s += "b = " + std::to_string(this->b) + "\n";
	s += "c = " + std::to_string(this->c) + "\n";
	s += "d = " + std::to_string(this->d) + "\n";
	s += "e = " + std::to_string(this->e) + "\n";
	s += "f = " + std::to_string(this->f) + "\n";
	s += "zadati = " + std::to_string(this->zadatiBroj) + "\n";
	s += "najbliži = " + std::to_string(this->najblizi) + "\n";
	s += "pronađen: "; s+= (this->pronadjen)? "DA" : "NE";
	s += "\n";

	return s;
}
/** ----------------------------------------------------------------------------
 * Radna funkcija za ispis pronađenih rešenja 
 * (koristi se unutar funkcije _ispis_).
 */
std::string DijkstraObj::ispisListe(int format) {
	std::string s = "";

	if (format > 1) {
		s += "--------------\n";
		s += "LISTA REŠENJA:\n";
		s += "--------------\n";
	}

	for (ResenjeElement resenje: this->listaResenja) {
		s += (format > 1)? std::to_string(resenje.brElemenata) + ", " : "";
		s += resenje.infix;
		s += (format > 1)? ", " + resenje.postfix + "\n" : "\n";
	}

	return s;
}
/* -------------------------------------------------------------------------- */

