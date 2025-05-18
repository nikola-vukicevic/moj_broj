/* -------------------------------------------------------------------------- */
#include"util.h"
/* -------------------------------------------------------------------------- */
bool daLiJeOperand(char znak) {
	return znak >= 'a' && znak <= 'f';
}
/* -------------------------------------------------------------------------- */
std::string dumpMap(std::map<std::string, bool> mapa) {
	std::string s = "";

	for (auto par: mapa) {
		s += par.first + "\n";
	}

	return s;
}
/* -------------------------------------------------------------------------- */
void popunjavanjeDijkstraObjekta(std::vector<int> lista, DijkstraObj &podaci) {
	podaci.a = lista[0];
	podaci.b = lista[1];
	podaci.c = lista[2];
	podaci.d = lista[3];
	podaci.e = lista[4];
	podaci.f = lista[5];
	podaci.zadatiBroj = lista[6];
}
/* -------------------------------------------------------------------------- */
void ucitavanjeDebug(DijkstraObj &podaci) {
	podaci.a = 2;
	podaci.b = 7;
	podaci.c = 4;
	podaci.d = 9;
	podaci.e = 10;
	podaci.f = 100;
	podaci.zadatiBroj = 941;
}
/* -------------------------------------------------------------------------- */
bool ucitavanjeIzKonzole(DijkstraObj &podaci, int argc, char *argv[], bool debug) {
	if (debug) {
		ucitavanjeDebug(podaci);
		return true;
	}

	if (argc != 8) return false;

	std::vector<int> lista;

	for (int i = 1; i <= 7; i++) {
		int p = 0;

		try {
			p = std::stoi(argv[i]);
			if (!p) throw 1;
		}
		catch (...) {
			return false;
		}

		lista.push_back(p);
	}

	popunjavanjeDijkstraObjekta(lista, podaci);

	return true;
}
/* -------------------------------------------------------------------------- */
void pripremaPodataka_demo(DijkstraObj &podaci) {
	std::string izraz = "ab+c+f+ed-*";
	procenaIzraza(izraz, podaci, true);
}
/* -------------------------------------------------------------------------- */
void ucitavanjeKombinacija(std::vector<std::string> &kombinacije, std::string nazivDatoteke) {
	std::ifstream datoteka;

	datoteka.open(nazivDatoteke);

	std::string s;

	while (getline(datoteka, s)) {
		kombinacije.push_back(s);
	}

	datoteka.close();
}
/* -------------------------------------------------------------------------- */
// TODO - dodati callback(?), kao u Node.js verziji
void pripremaPodataka(DijkstraObj &obj, bool debug, bool uklanjanjeInfiksnihDuplikata) {
	std::vector<std::string> kombinacije;

	if (debug) {
		ucitavanjeKombinacija(kombinacije, "./kombinacije.txt");
	} else {
		ucitavanjeKombinacija(kombinacije, "./izrazi/izrazi_3.txt");
		ucitavanjeKombinacija(kombinacije, "./izrazi/izrazi_5.txt");
		ucitavanjeKombinacija(kombinacije, "./izrazi/izrazi_7.txt");
		ucitavanjeKombinacija(kombinacije, "./izrazi/izrazi_9.txt");
		ucitavanjeKombinacija(kombinacije, "./izrazi/izrazi_11.txt");
	}

	for (std::string izraz: kombinacije) {
		// U obzir se NE uzimaju prazni redovi i
		// redovi koji počinju sa "##" (komentar)
		bool uslov = izraz != "" && izraz.rfind("##", 0) == -1;

		if (uslov) {
			procenaIzraza(izraz, obj, uklanjanjeInfiksnihDuplikata);
		}
	}
}
/* -------------------------------------------------------------------------- */
void demoIspis(DijkstraObj &obj, bool header, int format) {
	if (header) {
		std::cout << obj.ispisDebug();
	}

	std::cout << obj.ispisListe(format);
}
/* -------------------------------------------------------------------------- */

