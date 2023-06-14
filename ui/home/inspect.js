// 商品情報の表示
function displayProductDetails(product) {
    const productNameElement = document.getElementById('product-name');
    const productCodeElement = document.getElementById('product-code');
    const quantityElement = document.getElementById('quantity');
    const categoryElement = document.getElementById('category');
    const locationElement = document.getElementById('location');
  
    productNameElement.textContent = product.name;
    productCodeElement.textContent = product.code;
    quantityElement.textContent = product.quantity;
    categoryElement.textContent = product.category;
    locationElement.textContent = product.location;
  }
  
  // 在庫数量の確認
  function checkStockQuantity(product, quantityToCheck) {
    const actualQuantity = product.quantity;
    const expectedQuantity = parseInt(quantityToCheck, 10);
  
    if (actualQuantity === expectedQuantity) {
      // 在庫数量一致の処理を実行
      console.log('在庫数量が一致しています');
    } else {
      // 在庫数量不一致の処理を実行
      console.log('在庫数量が一致しません');
    }
  }
  
  // 検品ステータスの設定
  function setInspectionStatus(status) {
    // 検品ステータスの設定処理を実行
    console.log('検品ステータスが設定されました:', status);
  }
  
  // 検品結果の保存
  async function saveInspectionResult(product, status) {
    try {
      const response = await fetch('/saveInspectionResult', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productId: product.id,
          status: status
        })
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('検品結果が保存されました:', data);
        // 保存成功時の処理を追加する
      } else {
        console.error('検品結果の保存エラー:', response.status);
        // エラーを追加
      }
    } catch (error) {
      console.error('検品結果の保存エラー:', error);
      // エラーを追加
    }
  }
  
  // 検品履歴の表示
  async function displayInspectionHistory() {
    try {
      const response = await fetch('/getInspectionHistory');
      if (response.ok) {
        const history = await response.json();
        // 検品履歴の表示処理を実行する
        console.log('検品履歴:', history);
      } else {
        console.error('検品履歴の取得エラー:', response.status);
        // エラーを追加
      }
    } catch (error) {
      console.error('検品履歴の取得エラー:', error);
      // エラーを追加
    }
  }