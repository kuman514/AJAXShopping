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
  const domparser = new DOMParser()
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

function generateItemSelect (items) {
  const domparser = new DOMParser()
  if (document.getElementById('leftmenucontent')) {
    // if #leftmenucontent exists
    console.log('#leftmenucontent already exists')

    // erase #itemdetail or #itemselect first
    if (document.getElementById('itemdetail')) {
      document.getElementById('itemdetail').remove()
      console.log('#itemdetail removed')
    } else if (document.getElementById('itemselect')) {
      document.getElementById('itemselect').remove()
      console.log('#itemselect removed')
    }

    // then load #itemselect frame
    fetch('article/itemselect.html').then(function (response2) {
      response2.text().then(function (text2) {
        let page2 = domparser.parseFromString(text2, 'text/html')
        let target2 = page2.getElementById('itemselect')
        let count = 0

        // then load item preview
        for (let i = 0; i < items.length; i++) {
          fetch('iteminfo/' + items[i] + '.txt').then(function (response3) {
            response3.text().then(function (text3) {
              let t = text3.split(',')
              target2.innerHTML += new itemPreviewInfo(t[0], t[1], t[2]).toHTML()
              count++;

              // if all items are loaded, merge
              if (count >= items.length) {
                document.getElementById('leftmenucontent').innerHTML += page2.querySelector('body').innerHTML
              }
            })
          })
        }
      })
    })
  } else {
    // load #leftmenucontent first
    fetch('article/leftmenu.html').then(function (response) {
      response.text().then(function (text) {
        let page = domparser.parseFromString(text, 'text/html')
        let target = page.getElementById('leftmenucontent')

        // then load #itemselect frame
        fetch('article/itemselect.html').then(function (response2) {
          response2.text().then(function (text2) {
            let page2 = domparser.parseFromString(text2, 'text/html')
            let target2 = page2.getElementById('itemselect')
            let count = 0

            // then load item preview
            for (let i = 0; i < items.length; i++) {
              fetch('iteminfo/' + items[i] + '.txt').then(function (response3) {
                response3.text().then(function (text3) {
                  let t = text3.split(',')
                  target2.innerHTML += new itemPreviewInfo(t[0], t[1], t[2]).toHTML()
                  count++;

                  // if all items are loaded, merge
                  if (count >= items.length) {
                    target.innerHTML += page2.querySelector('body').innerHTML
                    document.getElementById('content').innerHTML = page.querySelector('body').innerHTML
                  }
                })
              })
            }
          })
        })
      })
    })
  }
}

function generateItemDetail (itemId) {
  const domparser = new DOMParser()
  if (document.getElementById('itemdetail')) {
    // if #itemdetail exists
    // clear #itemdetail first
    // then load item detail
    // if item detail is loaded, merge
  } else if(document.getElementById('leftmenucontent')) {
    // if #leftmenucontent exists
    // erase #itemselect first
    // then load #itemdetail frame
    // then load item detail
    // if item detail is loaded, merge
  } else {
    // load #leftmenucontent first
    // then load #itemdetail frame
    // then load item detail
    // if item detail is loaded, merge
  }
}

function generateCart () {
  const domparser = new DOMParser()
}
