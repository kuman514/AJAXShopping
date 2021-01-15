var currentItems = {
  'all': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  'wear': [1, 2, 3, 4],
  'food': [5, 6, 7, 8],
  'computer': [9, 10, 11, 12, 13]
}

var inCart = [1,2,3,4,5]

function putIntoCart (itemId) {
  inCart.push(itemId)
  alert('장바구니에 담았습니다')
  //generateCart()
}

function randomPick (amount) {
  let array = new Uint32Array(amount)
  window.crypto.getRandomValues(array)
  for (let i = 0; i < amount; i++) {
    array[i] = currentItems['all'][array[i] % currentItems['all'].length]
  }
  return array
}
