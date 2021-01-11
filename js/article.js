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

function generateMainMenuList (items) {
  items.forEach(item => {
    fetch('iteminfo/' + item + '.txt').then(function (response) {
      response.text().then(function (text) {
        let info = text.split(',')
        let append = new itemPreviewInfo(info[0], info[1], info[2]).convertToHTML()
        console.log(append)
        document.querySelector('#main').innerHTML += append
      })
    })
  })
}
