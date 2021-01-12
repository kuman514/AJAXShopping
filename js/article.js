class itemPreviewInfo {
  constructor (id, name, cost) {
    this.id = id
    this.name = name
    this.cost = cost
  }
  // Convert to an HTML item
  convertToHTML() {
    return "<div class=\"itempreview\" onclick=\"location.href='#*" + this.id + "'\">"
          + "<img src=\"previewimg/" + this.id + ".png\">"
          + "<div class=\"itemname\">" + this.name + "</div>"
          + "<div class=\"itemcost\">" + this.cost + "원</div>"
          + "</div>"
  }
}

function generateContent (content) {
  fetch('article/' + content + '.html').then(function (response) {
    response.text().then(function (text) {
      document.querySelector('#content').innerHTML = text
    })
  })
}

function generateItemList (items, target) {
  items.forEach(item => {
    fetch('iteminfo/' + item).then(function (response) {
      response.text().then(function (text) {
        let info = text.split(',')
        let append = new itemPreviewInfo(info[0], info[1], info[2]).convertToHTML()
        console.log(append)
        document.querySelector(target).innerHTML += append
      })
    })
  })
}

function generateMainMenuList (items) {
  generateItemList(items, '#main')
}

function pickUpMainMenuItems () {
  // Originally it's supposed to pick up random 4 items
  return ['1.txt', '2.txt', '3.txt', '4.txt']
}

function generateMainMenu () {
  generateContent('main')
  generateMainMenuList(pickUpMainMenuItems())
}

function generateItemSelect (items) {
  generateContent('leftmenu_itemselect')
  generateItemList(items, '#itemselect')
}
