#!/bin/bash
for n in $(seq 1 ${1})
do
	touch ${n}.js
done