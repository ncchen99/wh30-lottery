import csv
import random

li = list()
# 開啟 CSV 檔案
with open('畢業活動抽獎名單 - Line抽獎名單.csv', newline='') as csvfile:
    # 讀取 CSV 檔案內容
    rows = csv.reader(csvfile)
    # 以迴圈輸出每一列
    for row in rows:
        li.append(row)

print(li)
with open('畢業活動抽獎名單 - Line抽獎名單 - N.csv', 'w+', newline='') as csvfile:
    # 建立 CSV 檔寫入器
    writer = csv.writer(csvfile)
    # 寫入一列資料
    for row in li[1:]:
        try:
            row[2] = li[random.randint(1, len(li))][2][0] + "◎◎"
            writer.writerow(row)
        except:
            continue
