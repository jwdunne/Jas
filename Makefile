OUT=jas.js
SRC=src/jas.js

all: ./${OUT}

./${OUT}: | ./
	@@echo "Building Jas..."
	@@cat sizzle/sizzle.js ${SRC} > ${OUT}
