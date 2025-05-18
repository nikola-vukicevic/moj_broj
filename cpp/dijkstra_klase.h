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
/* -------------------------------------------------------------------------- */
class ResenjeElement {
public:
	int brElemenata;
	std::string infix, postfix;

	ResenjeElement(int brElemenata, std::string infix, std::string postfix);
};
/* -------------------------------------------------------------------------- */
class CvorPom {
public:
	int prioritet;
	std::string zapis, najnizi;

	CvorPom(int prioritet, std::string zapis, std::string najnizi);
};
/* -------------------------------------------------------------------------- */
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

