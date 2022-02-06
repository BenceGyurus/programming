import sys


class init_This:
    def __init__(self):
        pass

    def init_List(self):
        self.array = []

    def init_Number(self):
        self.number = 0 

    def add_Chars_To_Array(self,number, data = ""):
        self.array = [data for i in range(0,number)]
        return self.array

def main():
    last_Size = 0
    size = 0
    for i in range(0, 100000):
        size = sys.getsizeof(init_This().add_Chars_To_Array(i, "a"*(size+(size-last_Size*8))))
        last_Size = size
        print(size, i)

if __name__ == "__main__":
    main()