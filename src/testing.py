def wrapRoundArr(size):
	arr = []
	count = 0
	for x in range(size):
		arr.append([0]*size)
	arr[1][1] = 1
	arr[0][0] = 1
	arr[0][1] = 1
	arr[0][2] = 1
	arr[1][0] = 1
	arr[1][2] = 1
	arr[2][0] = 1
	arr[2][1] = 1
	arr[2][2] = 1
	arr[3][1] = 1
	arr[3][2] = 1
	arr[3][0] = 1

	x = 0
	y = 1
	
	# for x in range(x0, x1):
	# 	print(arr[x][y])
	printBoard(arr)

	if arr[(x-1)%size][(y-1)%size] == 1:
		count += 1
	if arr[(x+1)%size][(y+1)%size] == 1:
		count += 1
	if arr[(x-1)%size][(y+1)%size] == 1:
		count += 1
	if arr[(x+1)%size][(y-1)%size] == 1:
		count += 1
	if arr[(x-1)%size][(y)%size] == 1:
		count += 1
	if arr[(x+1)%size][(y)%size] == 1:
		count += 1
	if arr[(x)%size][(y-1)%size] == 1:
		count += 1
	if arr[(x)%size][(y+1)%size] == 1:
		count += 1
	print(count)



def printBoard(board):
	print("------------")
	for row in board:
		print(row, end="\n")
	print("------------")

wrapRoundArr(4)