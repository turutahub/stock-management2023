// 商品登録処理を実行する関数
async function registerProduct(productName, productCode, quantity, price, category, location) {
  try {
    const response = await fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        productName: productName,
        productCode: productCode,
        quantity: quantity,
        price: price,
        category: category,
        location: location
      })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('商品が登録されました:', data);
      // 登録成功時の処理
    } else {
      console.error('商品登録エラー:', response.status);
      // エラーを追加する
    }
  } catch (error) {
    console.error('商品登録エラー:', error);
    // エラーを追加する
  }
}