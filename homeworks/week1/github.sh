#!/bin/bash
wget https://api.github.com/users/${1}

value=$(<${1})


sed -n '20p' ${1}| cut -d '"' -f 4
sed -n '23p' ${1}| cut -d '"' -f 4
sed -n '26p' ${1}| cut -d '"' -f 4
sed -n '22p' ${1}| cut -d '"' -f 4
