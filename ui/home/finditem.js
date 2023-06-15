// 検索を実行する関数
function search() {
  const keyword = document.getElementById('keyword').value;
  // 検索キーワードを使用して検索結果を取得する処理を実装する

  // ダミーの検索結果を表示する
  const searchResults = [
    { name: '商品1' },
    { name: '商品2' },
    { name: '商品3' }
  ];
  displaySearchResults(searchResults);
}

// 検索結果を表示する関数
function displaySearchResults(results) {
  // 検索結果を表示する処理
  const searchResultsElement = document.getElementById('searchResults');
  searchResultsElement.innerHTML = '';

  results.forEach((result) => {
    const itemElement = document.createElement('div');
    itemElement.textContent = result.name; // 商品名などの表示項目を設定
    searchResultsElement.appendChild(itemElement);
  });
}

// 検索を実行する関数
function search() {
  const keyword = document.getElementById('keyword').value;
  const displayOptions = getDisplayOptions(); // 選択された表示項目の取得
  searchProducts(keyword, displayOptions); // 検索関数の呼び出し
}

// 選択された表示項目の取得
function getDisplayOptions() {
  const displayOptions = {};

  // 原価の表示
  displayOptions.cost = document.getElementById('displayCost').checked;

  // 原価率の表示
  displayOptions.costRatio = document.getElementById('displayCostRatio').checked;

  // 収支の表示
  displayOptions.profit = document.getElementById('displayProfit').checked;

  // 発注履歴の表示
  displayOptions.orderHistory = document.getElementById('displayOrderHistory').checked;

  // 廃棄数の表示
  displayOptions.disposalQuantity = document.getElementById('displayDisposalQuantity').checked;

  // 廃棄額の表示
  displayOptions.disposalAmount = document.getElementById('displayDisposalAmount').checked;

  // ロス率の表示
  displayOptions.lossRatio = document.getElementById('displayLossRatio').checked;

  // 補填数の表示
  displayOptions.replenishmentQuantity = document.getElementById('displayReplenishmentQuantity').checked;

  // 補填額の表示
  displayOptions.replenishmentAmount = document.getElementById('displayReplenishmentAmount').checked;

  // 消費数の表示
  displayOptions.consumptionQuantity = document.getElementById('displayConsumptionQuantity').checked;

  // 売上の表示
  displayOptions.sales = document.getElementById('displaySales').checked;

  return displayOptions;
}