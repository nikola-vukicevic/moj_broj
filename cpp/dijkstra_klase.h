/* -------------------------------------------------------------------------- */
#ifndef DIJKSTRA_KLASE
#define DIJKSTRA_KLASE
/* -------------------------------------------------------------------------- */
#include<bits/stdc++.h>
/* -------------------------------------------------------------------------- */
bool racunanje(char znak, std::stack<double> &stek);
//
// main.cpp:
bool racunanjeRanaTerminacija(double op1, double op2, char znak);
//
bool sprecavanjeDecimalnihINule(double rez);
/** ----------------------------------------------------------------------------
 * Klasa koja definiše pojedinačni element konačne liste rešenja. ###
 * Primer: [[ 3, "4 + 5 * 20", "abc*+" ]] ###
 * @parameter brElemenata Broj infiksnih operanada u izrazu (3)
 * @parameter infix Infiksni oblik izraza ("4 + 5 * 20")
 * @parameter postfix Postfiksni oblik izraza ("abc*+")
 */
class ResenjeElement {
public:
	int brElemenata;
	std::string infix, postfix;

	ResenjeElement(int brElemenata, std::string infix, std::string postfix);
};
/* -------------------------------------------------------------------------- */
/// Pomoćni čvorovi koji se koriste u fazi računanja
class CvorPom {
public:
	int prioritet;
	std::string zapis, najnizi;

	CvorPom(int prioritet, std::string zapis, std::string najnizi);
};
/** ----------------------------------------------------------------------------
 * Klasa preko koje se definiše 'glavni' objekat u programu 
 * (kao i reference na glavni objekat, u funkcijama koje 
 * pristupaju glavnom objektu). Glavni objekat pamti: zadate 
 * brojeve, traženi broj i ostale najbitnije informacije
 */
class DijkstraObj {
public:
	int a, b, c, d, e, f, zadatiBroj, najblizi;
	double razdaljina;
	bool pronadjen, prosirenaLista;
	std::vector<ResenjeElement> listaResenja;
	std::map<std::string, bool> mapaInfiksni;

	DijkstraObj();

	int pronalazenjeVrednosti(char c);

	int operator[](char c);

	std::string ispisDebug();

	std::string ispisListe(int format);
};
/* -------------------------------------------------------------------------- */
#endif
/* -------------------------------------------------------------------------- */

