/* -------------------------------------------------------------------------- */
#include<bits/stdc++.h>
#include"./dijkstra_klase.h"
#include"./util.h"
/* -------------------------------------------------------------------------- */
#define OCEKIVANI_BROJ_ARGUMENATA 7
/* -------------------------------------------------------------------------- */
bool racunanjeRanaTerminacija(double op1, double op2, char znak) {
	if (znak == '*') {
		if (op1 == 1) return true;
		if (op2 == 1) return true;
	}

	if (znak == '/') {
		if (op1 == 1) return true;
		if (op2 == 1) return true;
	}

	return false;
}
/* -------------------------------------------------------------------------- */
bool sprecavanjeDecimalnihINule(double rez) {
	if (rez == 0) {
		return true;
	}

	if (std::trunc(rez) != rez) {
		return true;
	}

	return false;
}
/* -------------------------------------------------------------------------- */
std::string formatiranjeInfiksnogOperanda(CvorPom op, int redniBrojOperanda, char znak, int znakPrioritet) {
	if (op.prioritet == 0) return op.zapis;

	if (op.prioritet < znakPrioritet) return "(" + op.zapis + ")";

	if (op.prioritet > znakPrioritet) return op.zapis;

	if (redniBrojOperanda == 2 && (znak == '-' || znak == '/')) return "(" + op.zapis + ")";

	return op.zapis;
}
/* -------------------------------------------------------------------------- */
void spajanjeInfiks(std::stack<CvorPom> &stek, char znak) {
	CvorPom op2 = stek.top();
	stek.pop();
	CvorPom op1 = stek.top();
	stek.pop();

	int znakPr = (znak == '*' || znak == '/')? 2 : 1;
	std::string op1Str = formatiranjeInfiksnogOperanda(op1, 1, znak, znakPr);
	std::string op2Str = formatiranjeInfiksnogOperanda(op2, 2, znak, znakPr);
	stek.push(CvorPom(znakPr, op1Str + " " + znak + " " + op2Str, ""));
}
/* -------------------------------------------------------------------------- */
std::string pretvaranjeUInfiksniZapis(std::string rpn, DijkstraObj obj) {
	std::stack<CvorPom> stek;

	for (int i = 0; i < rpn.length(); ++i) {
		char znak = rpn[i];
		if (daLiJeOperand(znak)) {
			stek.push(CvorPom(0, std::to_string(obj[znak]), ""));
		} else {
			spajanjeInfiks(stek, znak);
		}
	}

	return stek.top().zapis;
}
/* -------------------------------------------------------------------------- */
bool proveraDuplikataInfiksni(std::string izraz, DijkstraObj &obj) {
	auto p = obj.mapaInfiksni.find(izraz);
	// auto p = obj.mapaInfiksni[izraz];

	if (p != obj.mapaInfiksni.end()) return true;
	// if (p) return true;

	// obj.mapaInfiksni[izraz] = true;
	obj.mapaInfiksni.insert({izraz, true});

	return false;
}
/* -------------------------------------------------------------------------- */
void ubacivanjeIzrazaUListu(std::vector<ResenjeElement> &lista, std::string postfiksniIzraz, DijkstraObj &obj, bool uklanjanjeDuplikata) {
	std::string infiksniIzraz = pretvaranjeUInfiksniZapis(postfiksniIzraz, obj);

	if (uklanjanjeDuplikata && proveraDuplikataInfiksni(infiksniIzraz, obj)) return;

	lista.push_back(ResenjeElement(postfiksniIzraz.length() / 2 + 1, infiksniIzraz, postfiksniIzraz));
}
/* -------------------------------------------------------------------------- */
void popunjavanjeListe(int rez, std::string izraz, DijkstraObj &obj, bool uklanjanjeInfiksnihDuplikata) {
	int razdaljinaPom = std::abs(obj.zadatiBroj - rez);

	if (razdaljinaPom == obj.razdaljina) {
		ubacivanjeIzrazaUListu(obj.listaResenja, izraz, obj, uklanjanjeInfiksnihDuplikata);
		return;
	}

	if (razdaljinaPom < obj.razdaljina) {
		obj.razdaljina = razdaljinaPom;
		obj.najblizi   = rez;
		obj.listaResenja.clear();
		if (obj.razdaljina == 0) obj.pronadjen = true;
		ubacivanjeIzrazaUListu(obj.listaResenja, izraz, obj, uklanjanjeInfiksnihDuplikata);
	}
}
/* -------------------------------------------------------------------------- */
bool racunanje(char znak, std::stack<double> &stek) {
	double op2 = stek.top(); stek.pop();
	double op1 = stek.top(); stek.pop();

	if (racunanjeRanaTerminacija(op1, op2, znak)) return false;

	double rez = 0;

	// TODO - Enum!
	switch (znak) {
		case '+': rez = op1 + op2; break;
		case '-': rez = op1 - op2; break;
		case '*': rez = op1 * op2; break;
		case '/': rez = op1 / op2; break;
		default: break;
	}

	if (sprecavanjeDecimalnihINule(rez)) return false;

	stek.push(rez);

	return true;
}
/* -------------------------------------------------------------------------- */
void procenaIzraza(std::string izraz, DijkstraObj &obj, bool uklanjanjeInfiksnihDuplikata) {
	std::stack<double> stek;

	for (int i = 0; i < izraz.length(); ++i) {
		char znak = izraz[i];

		if (daLiJeOperand(znak)) {
			stek.push(obj[znak]);
		} else {
			// TODO - proveriti zašto je bio double
			bool rez = racunanje(znak, stek);
			// if (rez == -1) return;
			if (!rez) return;
		}
	}

	popunjavanjeListe((int)stek.top(), izraz, obj, uklanjanjeInfiksnihDuplikata);
}
/* -------------------------------------------------------------------------- */
int main(int argc, char *argv[]) {
	DijkstraObj podaci = DijkstraObj();
	int  nArgs = OCEKIVANI_BROJ_ARGUMENATA;
	bool debug = false;
	bool uklanjanjeInfiksnihDuplikata = true;

	if (!ucitavanjeIzKonzole(podaci, argc, argv, debug)) {
		std::cout << "Ulazni podaci iz konzole NISU učitani.\n";
		std::cout << "Prekida se izvršavanje.\n";
		exit(1);
	}

	pripremaPodataka(podaci, debug, uklanjanjeInfiksnihDuplikata);
	// pripremaPodataka_demo(podaci);
	demoIspis(podaci, true, 2);  // 1. Objekat koji sadrži ulazne
	                             //    podatke i rešenja
	                             // 2. Header, da-ne
	                             // 3. Format: 1 - samo izrazi;
	                             //            2 - izrazi + detalji
	return 0;
}
/* -------------------------------------------------------------------------- */

