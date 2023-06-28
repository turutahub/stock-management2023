// チェックボックスの状態を取得する関数
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

  // 日付期間の入力値を取得する関数
  function getDateRange() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    return { startDate, endDate };
  }

  // 検索ボタンがクリックされたときの処理
  function search() {
    const keyword = document.getElementById('keyword').value;
    const displayOptions = getDisplayOptions(); // 選択された表示項目の取得
    const dateRange = getDateRange(); // 日付期間の取得
    searchProducts(keyword, displayOptions, dateRange); // 検索関数の呼び出し
  }

  // APIへの検索リクエストを送信する関数
  function searchProducts(keyword, displayOptions, dateRange) {
    const url = `/search?keyword=${keyword}&displayOptions=${JSON.stringify(displayOptions)}`;
    // 日付期間をクエリパラメータとして追加
    const startDate = encodeURIComponent(dateRange.startDate);
    const endDate = encodeURIComponent(dateRange.endDate);
    const dateRangeParam = `&startDate=${startDate}&endDate=${endDate}`;
    fetch(url + dateRangeParam)
      .then((response) => response.json())
      .then((data) => {
        displaySearchResults(data); // 検索結果の表示処理
      })
      .catch((error) => {
        console.error('検索エラー:', error);
        // エラー処理
      });
  }

  // 検索結果を表示する関数
  function displaySearchResults(results) {
    const searchResultsElement = document.getElementById('searchResults');
    searchResultsElement.innerHTML = '';

    results.forEach((result) => {
      const itemElement = document.createElement('div');
      // 検索結果の表示内容を設定
      itemElement.textContent = result.name;
      searchResultsElement.appendChild(itemElement);
    });
  }