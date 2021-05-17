# AC-expense-tracker


## 網站功能描述
* 記帳本 
	* 在首頁一次瀏覽所有支出的清單
  * 在首頁看到所有支出清單的總金額
  * 新增一筆支出
  * 編輯支出的所有屬性 (一次只能編輯一筆)
  * 刪除任何一筆支出 (一次只能刪除一筆)
  * 在首頁可以根據支出「類別」篩選支出；總金額的計算只會包括被篩選出來的支出總和。

## 環境建置與需求 
* Node js 14.16.1 - 開發環境 
* Express 4.17.1 - 框架
* Express Handlebars 5.3.0 - 模板引擎 
* Mongoose 5.12.6 -  MongoDB ODM
* MongoDB 4.2.13 - 資料庫

## 安裝與執行步驟 (以下為終端機輸入語法)
* 下載檔案  
  `git clone https://github.com/Hsinyehh/AC-expense-tracker.git`
 
* 切換至該資料夾  
 `cd AC_expense-tracker`

* 安裝expres等上述環境建置  
 `npm install express`

* 執行程式  
 `npm run dev`

* 下載種子資料
 `node models/seeds/recordSeeder.js`

* 啟動完成請至 http://localhost:3000/ 
