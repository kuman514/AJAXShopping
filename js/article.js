const domparser = new DOMParser()

class itemPreviewInfo {
  constructor (id, name, cost) {
    this.id = id
    this.name = name
    this.cost = cost
  }
  // Convert to an HTML item
  toHTML() {
    return "<div class=\"itempreview\" onclick=\"location.href='#*" + this.id + "'\">"
          + "<img src=\"previewimg/" + this.id + ".png\">"
          + "<div class=\"itemname\">" + this.name + "</div>"
          + "<div class=\"itemcost\">" + this.cost + "원</div>"
          + "</div>"
  }
}

function generateMainPage (items) {
  fetch('article/main.html').then(function (response) {
    if (response.ok) {
      response.text().then(function (text) {
        let page = domparser.parseFromString(text, 'text/html')
        let article = page.querySelector('body')
        let target = page.getElementById('main')
        let length = (items.length <= 4) ? items.length : 4
        let count = 0

        for (let i = 0; i < length; i++) {
          fetch('iteminfo/' + items[i] + '.txt').then(function (response2) {
            response2.text().then(function (text2) {
              let t = text2.split(',')
              target.innerHTML += new itemPreviewInfo(t[0], t[1], t[2]).toHTML()
              count++;

              if (count >= length) {
                console.log(article)
                document.getElementById('content').innerHTML = article.innerHTML
              }
            })
          })
        }
      })
    }
  })
}

function generateItemSelect () {
  if (document.getElementById('itemselect')) {
    // if #itemselect exists
  } else if(document.getElementById('leftmenucontent')) {
    // if #leftmenucontent exists
  } else {

  }
}

function generateItemDetail () {
  if (document.getElementById('itemdetail')) {
    // if #itemdetail exists
  } else if(document.getElementById('leftmenucontent')) {
    // if #leftmenucontent exists
  } else {

  }
}

function generateCart () {

}
