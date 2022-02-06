def osztok_Szama(number):
	copy_Number = number
	num = 0
	while copy_Number > 0:
		if number % copy_Number == 0:
			num += 1
			print(copy_Number)
		copy_Number -= 1

	return num

print(osztok_Szama(int(input())))