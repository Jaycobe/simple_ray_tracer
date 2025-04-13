run: main.exe
	./main.exe > image.ppm

main.exe:
	g++ main.cpp -o main.exe
		