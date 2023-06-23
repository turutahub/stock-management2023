// 経営情報の日付を取得して要素に反映する処理
function displayreportDate(date) {
    const reportDateElement = document.getElementById('reportDate');
    reportDateElement.textContent = date;
  }
  
  // 棚卸情報入力画面に遷移する処理
  function goToInventoryInput() {
    // その日の分が既に入力されているかをチェックする処理
  
    if (isInventoryInputted) {
      // 既に入力されている場合は警告文を表示する処理
      showWarningMessage('その日の棚卸情報は既に入力されています。');
    } else {
      // 棚卸情報入力画面に遷移する処理
      window.location.href = 'addreport.html'; // 遷移先のURLを指定
    }
  }
  
  async function displayDailyManagementInfo() {
    try {
      // 当日の経営情報を取得するためにデータベースにリクエストを送信
      const response = await fetch('/report'); // リクエスト先のURLを指定
      
      if (response.ok) {
        const data = await response.json(); // レスポンスデータをJSON形式で取得
        
        // レスポンスデータから経営情報の各値を取得
        const costRatio = data.costRatio;
        const lossRatio = data.lossRatio;
        const profit = data.profit;
        
        // 経営情報を表示する要素に値を設定
        const costRatioElement = document.getElementById('costRatio');
        costRatioElement.textContent = costRatio;
    
        const lossRatioElement = document.getElementById('lossRatio');
        lossRatioElement.textContent = lossRatio;
    
        const profitElement = document.getElementById('profit');
        profitElement.textContent = profit;
      } else {
        // エラーレスポンスの場合はエラーメッセージを表示
        console.error('Failed to retrieve daily management info.');
      }
    } catch (error) {
      // 通信エラーなどでリクエストに失敗した場合のエラーハンドリング
      console.error('An error occurred while fetching the daily management info:', error);
    }
  }
  
  // 食材毎の経営情報を表示する処理
  function displayIngredientreportInfo(ingredientInfo) {
    const ingredientreportInfoElement = document.getElementById('ingredientreportInfo');
    
    // 食材毎の情報をループして表示する処理
    ingredientInfo.forEach((ingredient) => {
      const ingredientElement = document.createElement('div');
      ingredientElement.textContent = `${ingredient.name}: 売上 - 原価 - 廃棄額 = ${ingredient.profit}`;
  
      ingredientreportInfoElement.appendChild(ingredientElement);
    });
  }
  
  // 縦スライダーの初期化と設定
  $('#slider').slider({
    orientation: 'vertical',
    // その他の設定オプション
  });

  async function getInformationTable() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    try {
      const response = await fetch(`http://localhost:8080/inventory/info/${formattedDate}`);
      const data = await response.json();
      const tableBody = document.getElementById("informationTable")

      tableBody.innerHTML = '';

      data.forEach(item => {
        const row = document.createElement('tr');
  
        const totalCell = document.createElement('td');
        const costCell = document.createElement('td');
        const costRateCell = document.createElement('td');
        const wasteAmtCell = document.createElement('td');
        const lossRateCell = document.createElement('td');
        const balanceCell = document.createElement('td');
        //const dayCell = document.createElement('td');
  

        totalCell.textContent = "総計"
        costCell.textContent = item.cost;
        costRateCell.textContent = item.costRate;
        wasteAmtCell.textContent = item.wasteAmt;
        lossRateCell.textContent = item.lossRate;
        balanceCell.textContent = item.balance;
        //dayCell = item.day;
  
        row.appendChild(totalCell);
        row.appendChild(costCell);
        row.appendChild(costRateCell);
        row.appendChild(wasteAmtCell);
        row.appendChild(lossRateCell);
        row.appendChild(balanceCell);
        //row.appendChild(dayCell);
  
        tableBody.appendChild(row);
      });
    } catch (error) {
      console.error('Error:', error);
    }
    
  }


  async function getInventoryTable() {
    try {
      const response = await fetch('http://localhost:8080/inventory');
      const data = await response.json();
      const tableBody = document.getElementById('inventoryTable');
  
      // テーブルの内容をクリア
      tableBody.innerHTML = '';
  
      data.forEach(item => {
        const row = document.createElement('tr');
  
        const foodNameCell = document.createElement('td');
        const consumedNumCell = document.createElement('td');
        const costCell = document.createElement('td');
        const wasteNumCell = document.createElement('td');
        const wasteAmtCell = document.createElement('td');
        const lossRateCell = document.createElement('td');
        const foodIdCell = document.createElement('td');
        //const dayCell = document.createElement('td');
  
        foodNameCell.textContent = item.foodName;
        consumedNumCell.textContent = item.consumedNum;
        costCell.textContent = item.cost;
        wasteNumCell.textContent = item.wasteNum;
        wasteAmtCell.textContent = item.wasteAmt;
        lossRateCell.textContent = item.lossRate;
        foodIdCell.textContent = item.foodId;
        foodIdCell.style.display = "none";
        foodIdCell.setAttribute("id", "foodID");
        //dayCell = item.day;
  
        row.appendChild(foodNameCell);
        row.appendChild(consumedNumCell);
        row.appendChild(costCell);
        row.appendChild(wasteNumCell);
        row.appendChild(wasteAmtCell);
        row.appendChild(lossRateCell);
        row.appendChild(foodIdCell);
        //row.appendChild(dayCell);
  
        tableBody.appendChild(row);
      });
    } catch (error) {
      console.error('Error:', error);
    }
  }