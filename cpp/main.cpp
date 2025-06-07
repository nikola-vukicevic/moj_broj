/* -------------------------------------------------------------------------- */
#include <bits/stdc++.h>
#include "./dijkstra_klase.h"
#include "./util.h"
/* -------------------------------------------------------------------------- */
#define OCEKIVANI_BROJ_ARGUMENATA 7
/** ----------------------------------------------------------------------------
 * Radna funkcija preko koje se, u funkciji _racunanje_, odbacuju 'neperspektivne' 
 * podoperacije množenja ili deljenja jedinicom.
 */
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
/** ----------------------------------------------------------------------------
 * Radna funkcija preko koje se, u funkciji _racunanje_, odbacuju podoperacije
 * čiji je rezultat 0 ili decimalni broj.
 */
bool sprecavanjeDecimalnihINule(double rez) {
	if (rez == 0) {
		return true;
	}

	if (std::trunc(rez) != rez) {
		return true;
	}

	return false;
}
/** ----------------------------------------------------------------------------
 * Radna funkcija preko koje se u funkciji spajanjeInfiks definiše
 * zapis infiksnog operanda, tj. u najpraktičnijem smislu, određuje se 
 * da li će opearnd biti uokviren zagradama (ili neće).
 */
std::string formatiranjeInfiksnogOperanda(CvorPom op, int redniBrojOperanda, char znak, int znakPrioritet) {
	if (op.prioritet == 0) return op.zapis;

	if (op.prioritet < znakPrioritet) return "(" + op.zapis + ")";

	if (op.prioritet > znakPrioritet) return op.zapis;

	if (redniBrojOperanda == 2 && (znak == '-' || znak == '/')) return "(" + op.zapis + ")";

	return op.zapis;
}
/** ----------------------------------------------------------------------------
 * Radni deo funkcije za pretvaranje postfiksnog izraza u infiksni:
 * između dva operanda upisuje se znak operacije i pri tom se operandi 
 * uokviruju zagrama po potrebi.
 */
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
/** ----------------------------------------------------------------------------
 * Pretvaranje postfiksnog zapisa (u kome se pojavljuju identifikatori 
 * promenljivih), u infiksni izraz ( u kome su identifikatori zamenjeni 
 * odgovarajućim brojčanim vrednostima).
 */
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
/** ----------------------------------------------------------------------------
 * Preko pomoćne hash-mape, proverava se da li je 
 * izraz već ubačen u listu.
 */
bool proveraDuplikataInfiksni(std::string izraz, DijkstraObj &obj) {
	auto p = obj.mapaInfiksni.find(izraz);
	// auto p = obj.mapaInfiksni[izraz];

	if (p != obj.mapaInfiksni.end()) return true;
	// if (p) return true;

	// obj.mapaInfiksni[izraz] = true;
	obj.mapaInfiksni.insert({izraz, true});

	return false;
}
/** -----------------------------------------------------------------------------
 * Funkcija za neposredno ubacivanje izraza u listu 
 * uz odbacivanje izraza koji su već ubačeni.
 */
void ubacivanjeIzrazaUListu(std::vector<ResenjeElement> &lista, std::string postfiksniIzraz, DijkstraObj &obj, bool uklanjanjeDuplikata) {
	std::string infiksniIzraz = pretvaranjeUInfiksniZapis(postfiksniIzraz, obj);

	if (uklanjanjeDuplikata && proveraDuplikataInfiksni(infiksniIzraz, obj)) return;

	lista.push_back(ResenjeElement(postfiksniIzraz.length() / 2 + 1, infiksniIzraz, postfiksniIzraz));
}
/** ----------------------------------------------------------------------------
 * Popunjavanje liste obavlja se prema sledećim pravilima: 
 * ukoliko ispitivani izraz daje rezultat čija 'udaljenost' od 
 * traženog broja _odgovara_ najmanjoj do tada pronađenoj udaljenosti,
 * izraz se smešta u listu, dok, ukoliko se ispituje izraz čija je 
 * 'udaljenost' __manja__ od dotadašnje najmanje udaljenosti, dolazi
 * do pražnjenja liste (nakon čega se ispitivani izraz dodaje u listu).
 */
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
/** ----------------------------------------------------------------------------
  * Računanje vrednosti postfiksnog izraza, uz odbacivanje decimalnih
  * rezultata i izraza u kojima se pojavljuju 'neperspektivne' operacije
  * (sabiranje ili oduzimanje sa nulom, množenje ili deljenje nulom ili 
  * jedinicom i sl).
  */
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
/** --------------------------------------------------------------------------
 * Prolazak kroz listu unapred pripremljenih postfiksnih 
 * izraza, u potrazi za izrazima čijim rešavanjem se dolazi 
 * do 'traženog broja' (ukoliko program nije u stanju da
 * pronađe traženi broj, lista će biti popunjena izrazima
 * koji kao rezultat daju najpribližniju vrednost; 
 * primer: ukoliko je tražena vrednost 716, i pri tom nijedan
 * izraz ne daje kao rezultat vrednost 716, lista će sadržati 
 * izraze koji kao rezultat daju 715, 717 i sl).
 */
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
	ispis(podaci, true, 2);  // 1. Objekat koji sadrži ulazne
	                             //    podatke i rešenja
	                             // 2. Header, da-ne
	                             // 3. Format: 1 - samo izrazi;
	                             //            2 - izrazi + detalji
	return 0;
}
/* -------------------------------------------------------------------------- */

