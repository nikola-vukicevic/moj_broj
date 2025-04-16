# moj_broj
Node JS verzija popularne igre (još jedan WIP 'pet project').

Kandidati i traženi broj se učitavaju iz konzole u formatu: `node moj_broj [kandidati][traženi_broj]`

Primer: `node moj_broj 2 7 4 9 10 100 941`

Program pretražuje listu postfiksnih izraza koji su zapisani u datoteke (pri čemu modul 'generator', preko koga se generišu 'izrazi kandidati', koristi funkciju za pronalaženje i uklanjanje duplikata).

Početni broj kombinacija iznosi oko 1.3 miliona (bez uklanjanja duplikata, postoji oko 55 miliona izraza), i pri tom se tokem procesa račuanja 'terminišu' pokušaji koji sadrže podizraze sa 'neperspektivnim' operacijama (sabiranje i oduzimanje sa nulom, množenje i deljenje nulom ili jedinicom i sl).

Deluje da postoji mesta za unapređenje, ali, brzina izvršavanja je već zadovoljavajuća (oko 0.5s u najgorem slučaju, na skromnoj računarskoj konfiguraciji koja je stara blizu 10 godina).
