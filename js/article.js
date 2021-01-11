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

function generateMenuList (items, target) {
  items.forEach(item => {
    fetch('iteminfo/' + item + '.txt').then(function (response) {
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
  generateMenuList(items, '#main')
}

function pickUpMainMenuItems () {
  // Originally it's supposed to pick up random 4 items
  return [1, 2, 3, 4]
}

function generateMainMenu () {
  document.querySelector('#content').innerHTML = "<div id=\"main\"></div>" + "<div id=\"showall\">아이템 전체 보기</div>"
  generateMainMenuList(pickUpMainMenuItems())
}
