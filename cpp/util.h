/* -------------------------------------------------------------------------- */
#ifndef UTIL
#define UTIL
/* -------------------------------------------------------------------------- */
#include<bits/stdc++.h>
#include "dijkstra_klase.h"
/* -------------------------------------------------------------------------- */
bool daLiJeOperand(char znak);
//
std::string dumpMap(std::map<std::string, bool> mapa);
//
void popunjavanjeDijkstraObjekta(std::vector<int> lista, DijkstraObj &podaci);
//
bool ucitavanjeIzKonzole(DijkstraObj &podaci, int argc, char *argv[], bool debug);
//
void pripremaPodataka_demo(DijkstraObj &podaci);
//
void ucitavanjeKombinacija(std::vector<std::string> &kombinacije, std::string nazivDatoteke);
//
void pripremaPodataka(DijkstraObj &obj, bool debug, bool uklanjanjeInfiksnihDuplikata);
//
void ispis(DijkstraObj &obj, bool header, int format);
//
// main.cpp:
void procenaIzraza(std::string izraz, DijkstraObj &obj, bool uklanjanjeInfiksnihDuplikata);
/* -------------------------------------------------------------------------- */
#endif
/* -------------------------------------------------------------------------- */
