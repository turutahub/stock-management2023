// 商品をキーワードで検索する関数
async function searchProducts(keyword) {
    try {
      const response = await fetch('/search-products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          keyword: keyword
        })
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('検索結果:', data);
        // 検索結果を表示する処理
      } else {
        console.error('検索エラー:', response.status);
        // エラーを追加
      }
    } catch (error) {
      console.error('検索エラー:', error);
      // エラーを追加
    }
  }
  
  // 商品をカテゴリーでフィルタリングする関数
  async function filterProducts(category) {
    try {
      const response = await fetch('/filter-products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          category: category
        })
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('フィルタリング結果:', data);
        // フィルタリング結果を表示する処理
      } else {
        console.error('フィルタリングエラー:', response.status);
        // エラーを追加
      }
    } catch (error) {
      console.error('フィルタリングエラー:', error);
      // エラーを追加
    }
  }
  
  // 商品リストをソートする関数
  async function sortProducts(sortBy) {
    try {
      const response = await fetch('/sort-products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sortBy: sortBy
        })
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('ソート結果:', data);
        // ソート結果を表示する処理
      } else {
        console.error('ソートエラー:', response.status);
        // エラーを追加
      }
    } catch (error) {
      console.error('ソートエラー:', error);
      // エラーを追加
    }
  }
  
  // 在庫状況を表示する関数
  async function showStockStatus() {
    try {
      const response = await fetch('/stock-status');
  
      if (response.ok) {
        const data = await response.json();
        console.log('在庫状況:', data);
        // 在庫状況を表示する処理
      } else {
        console.error('在庫状況の取得エラー:', response.status);
        // エラーを追加
      }
    } catch (error) {
      console.error('在庫状況の取得エラー:', error);
      // エラーを追加
    }
  }
  