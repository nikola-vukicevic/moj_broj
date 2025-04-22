#!/bin/bash
# ------------------------------------------------------------------------------
formatiranje_ispisa() {
	ulaz=$1
	rez=$2
	ocekivani=$3

	echo $ulaz

	if [ $rez = $ocekivani ]; then
		echo $rez
		echo "OK"
	else
		echo $rez
		echo $ocekivani
		echo ">> GREŠKA!"
	fi
}
# ------------------------------------------------------------------------------
ulaz="af*bc+e--"
ocekivani="af*e+b-c-"
rez=$(node stablo_2 $ulaz -test)

formatiranje_ispisa $ulaz $rez $ocekivani
echo "-------------------------"
# ------------------------------------------------------------------------------
ulaz="fgad*bc+e-++-"
ocekivani="ef+ad*-b-c-g-"
rez=$(node stablo_2 $ulaz -test)

formatiranje_ispisa $ulaz $rez $ocekivani
echo "-------------------------"
# ------------------------------------------------------------------------------
# DISKUTABILNI IZ EXCEL-a
# ------------------------------------------------------------------------------
ulaz="ab-ef--gh-cd---ij-op--mn-kl----"
ocekivani="ac+f+h+j+l+m+o+b-d-e-g-i-k-n-p-"
rez=$(node stablo_2 $ulaz -test)

formatiranje_ispisa $ulaz $rez $ocekivani
echo "-------------------------"
# ------------------------------------------------------------------------------
ulaz="ab-ef--gh-cd+--ij-op--mn-kl+---"
ocekivani="ac+d+f+h+j+m+o+b-e-g-i-k-l-n-p-"
rez=$(node stablo_2 $ulaz -test)

formatiranje_ispisa $ulaz $rez $ocekivani
echo "-------------------------"
# ------------------------------------------------------------------------------
ulaz="ab-ef--gh-cd-+-ij-op--mn-kl-+--"
ocekivani="ad+f+h+j+k+m+o+b-c-e-g-i-l-n-p-"
rez=$(node stablo_2 $ulaz -test)

formatiranje_ispisa $ulaz $rez $ocekivani
echo "-------------------------"
# ------------------------------------------------------------------------------
ulaz="ab-ef+-gh-cd+--ij-op+-mn-kl+---"
ocekivani="ac+d+h+j+m+o+p+b-e-f-g-i-k-l-n-"
rez=$(node stablo_2 $ulaz -test)

formatiranje_ispisa $ulaz $rez $ocekivani
echo "-------------------------"
# ------------------------------------------------------------------------------
ulaz="ab-ef-+gh-cd-+-ij-op-+mn-kl-+--"
ocekivani="ad+e+h+j+k+m+p+b-c-f-g-i-l-n-o-"
rez=$(node stablo_2 $ulaz -test)

formatiranje_ispisa $ulaz $rez $ocekivani
echo "-------------------------"
# ------------------------------------------------------------------------------
ulaz="ab-ef--gh-cd---"
ocekivani="ac+f+h+b-d-e-g-"
rez=$(node stablo_2 $ulaz -test)

formatiranje_ispisa $ulaz $rez $ocekivani
echo "-------------------------"
# ------------------------------------------------------------------------------
ulaz="ab-ef--gh-cd+--"
ocekivani="ac+d+f+h+b-e-g-"
rez=$(node stablo_2 $ulaz -test)

formatiranje_ispisa $ulaz $rez $ocekivani
echo "-------------------------"
# ------------------------------------------------------------------------------
ulaz="ab-ef--gh-cd-+-"
ocekivani="ad+f+h+b-c-e-g-"
rez=$(node stablo_2 $ulaz -test)

formatiranje_ispisa $ulaz $rez $ocekivani
echo "-------------------------"
# ------------------------------------------------------------------------------
ulaz="ab-ef+-gh-cd+--"
ocekivani="ac+d+h+b-e-f-g-"
rez=$(node stablo_2 $ulaz -test)

formatiranje_ispisa $ulaz $rez $ocekivani
echo "-------------------------"
# ------------------------------------------------------------------------------
ulaz="ab-ef-+gh-cd-+-"
ocekivani="ad+e+h+b-c-f-g-"
rez=$(node stablo_2 $ulaz -test)

formatiranje_ispisa $ulaz $rez $ocekivani
# ------------------------------------------------------------------------------

