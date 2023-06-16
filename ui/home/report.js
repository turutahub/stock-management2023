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