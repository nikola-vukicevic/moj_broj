#!/bin/bash

direktorijum="izrazi"
datoteka="izrazi_"

mkdir -p $direktorijum

node generator 3 > "./$(echo $direktorijum)/$(echo $datoteka)3.txt"
node generator 5 > "./$(echo $direktorijum)/$(echo $datoteka)5.txt"
node generator 7 > "./$(echo $direktorijum)/$(echo $datoteka)7.txt"
node generator 9 > "./$(echo $direktorijum)/$(echo $datoteka)9.txt"
node generator 11 > "./$(echo $direktorijum)/$(echo $datoteka)11.txt"

