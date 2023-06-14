
// 発注処理を実行する関数
async function registerOrder(productName, quantity, price) {
  try {
    // データベースへの接続と発注情報の登録
    const response = await fetch('/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        productName: productName,
        quantity: quantity,
        price: price
      })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('発注が登録されました:', data);
      // 登録成功時の処理
    } else {
      console.error('発注登録エラー:', response.status);
      // エラーを追加
    }
  } catch (error) {
    console.error('発注登録エラー:', error);
    // エラーを追加
  }
}

// 発注情報をデータベースで更新する関数
async function updateOrder(orderId, updatedData) {
  try {
    // データベースで発注情報を更新
    const response = await fetch(`/api/orders/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
    });

    if (response.ok) {
      const data = await response.json();
      console.log('発注が更新されました:', data);
      // 更新成功時の処理
    } else {
      console.error('発注更新エラー:', response.status);
      // エラー
    }
  } catch (error) {
    console.error('発注更新エラー:', error);
    // エラーを追加
  }
}

// 発注情報をデータベースから削除する関数
async function deleteOrder(orderId) {
  try {
    // データベースから発注情報を削除
    const response = await fetch(`/api/orders/${orderId}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      console.log('発注が削除されました');
      // 削除成功時の処理
    } else {
      console.error('発注削除エラー:', response.status);
      // エラーを追加
    }
  } catch (error) {
    console.error('発注削除エラー:', error);
    // エラーを追加
  }
}