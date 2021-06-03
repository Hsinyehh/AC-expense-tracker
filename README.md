# AC-expense-tracker

## Heroku部署
* 網站: https://stormy-taiga-94819.herokuapp.com/
* 測試帳號: user1@example.com
* 測試密碼: 12345678

## 網站功能描述
* 記帳本 
  * 在首頁瀏覽所有支出的清單及總金額
  * 新增、編輯、刪除一筆支出
  * 在首頁可以根據支出「類別」及「月分」篩選支出；總金額的計算只會包括被篩選出來的支出總和
  * 使用者認證功能 (註冊及登入)
  * Facebook使用者認證功能

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
 `npm run seed`

* 啟動完成請至 http://localhost:3000/ 

## 網站示意
* 主頁
![GITHUB](https://img.onl/GiqXgo)

* 新增支出
![GITHUB](https://img.onl/9BtEIW)

* 登入
![GITHUB](https://img.onl/nGuK3T)

* 註冊
![GITHUB](https://img.onl/Dwa4wk)
