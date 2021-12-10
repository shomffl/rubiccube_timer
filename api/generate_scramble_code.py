from random import randint as rd


rotation_code = [[["U","U'","U2"],["D","D'","D2"]],[["R","R'","R2"],["L","L'","L2"]],[["B","B'","B2"],["F","F'","F2"]]]
cube_code = []
random_code1 = []
random_code2 = []

# スクランブルコードを作成する
def generate_scramble_code():
    while True:
        code_num = len(cube_code)

        # コードの数が25個になったら処理を終了する
        if code_num == 25:
            break
        else:
            # 追加するコードを選択する
            r1 = rd(0,2)
            r2 = rd(0,1)
            r3 = rd(0,2)
            code = rotation_code[r1][r2][r3]

            # スクランブルコードが1つも追加されていないときは、特に条件なく追加する
            if code_num == 0:
                cube_code.append(code)
                random_code1.append(r1)
                random_code2.append(r2)

            # 既にスクランブルコードが1つ追加されていたときは、1つ前のコードと同グループ以外のコードなら追加する
            elif code_num == 1:
                if random_code1[-1] == r1 and random_code2[-1] == r2:
                    pass
                else:
                    cube_code.append(code)
                    random_code1.append(r1)
                    random_code2.append(r2)

            # コードが2つ以上追加されていたときは、1つ前のコードまたは2つ前のコードと同グループ以外のコードなら追加する
            else:
                if random_code1[-1] == r1 and random_code2[-1] == r2:
                    pass
                elif random_code1[-1] == r1 and random_code1[-2] == r1:
                    pass
                else:
                    cube_code.append(code)
                    random_code1.append(r1)
                    random_code2.append(r2)

    return cube_code
