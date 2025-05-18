CC      = g++
CCFLAGS = -O3
FLDEBUG = -O0 -g -Wall
# -Wno-unused-function

TARGET     = moj_broj_cpp
TARGET_DBG = main_debug
SRCS       = ./src/*.cpp

install:
	$(CC) $(CCFLAGS) $(SRCS) -o $(TARGET)

debug:
	$(CC) $(FLDEBUG) $(SRCS) -o $(TARGET_DBG)

test:
	$(CC) $(CCFLAGS) $(SRCS) -o $(TARGET) && ./$(TARGET) 8 6 6 5 15 100 838

clean:
	rm -rf *.o

uninstall:
	rm $(TARGET)

