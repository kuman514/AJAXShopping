class itemPreviewInfo {
  constructor (id, name, cost) {
    this.id = id
    this.name = name
    this.cost = cost
  }
  // Convert to an HTML item
  toHTML() {
    return "<div class=\"itempreview\" onclick=\"location.href='#*" + this.id + "';"
          + "generateItemDetail(" + this.id + ")\">"
          + "<img src=\"previewimg/" + this.id + ".png\">"
          + "<div class=\"itemname\">" + this.name + "</div>"
          + "<div class=\"itemcost\">" + this.cost + "원</div>"
          + "</div>"
  }
  // convert to a cart HTML item
  toCartHTML() {
    return "<div class=\"cartitem\" onclick=\"location.href='#*" + this.id + "';"
          + "generateItemDetail(" + this.id + ")\">"
          + "<div><img src=\"previewimg/" + this.id + ".png\"></div>"
          + "<div>" + this.name + "<br>" + this.cost + "</div>"
          + "</div>"
  }
  get fee() {
    return this.cost
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

                  // if all items are fully loaded, merge
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

    // then load #itemdetail frame
    fetch('article/itemdetail.html').then(function (response2) {
      response2.text().then(function (text2) {
        let page2 = domparser.parseFromString(text2, 'text/html')

        // then load item detail
        fetch('iteminfo/' + itemId + '.txt').then(function (response3) {
          response3.text().then(function (text3) {
            let t = text3.split(',')

            page2.getElementById('preview').innerHTML = "<img src=\"previewimg/" + itemId + ".png\">"
            page2.getElementById('itemId').innerHTML = "상품번호: " + t[0]
            page2.getElementById('type').innerHTML = "종류: " + t[3]
            page2.getElementById('name').innerHTML = "상품명: " + t[1]
            page2.getElementById('cost').innerHTML = "가격: " + t[2] + "원"
            page2.getElementById('itemdetail').innerHTML += "<img id=\"detailimg\" src=\"detailimg/" + itemId + ".png\">"

            // if item detail is fully loaded, merge
            document.getElementById('leftmenucontent').innerHTML += page2.querySelector('body').innerHTML
          })
        })
      })
    })
  } else {
    // load #leftmenucontent first
    fetch('article/leftmenu.html').then(function (response) {
      response.text().then(function (text) {
        let page = domparser.parseFromString(text, 'text/html')
        let target = page.getElementById('leftmenucontent')

        // then load #itemdetail frame
        fetch('article/itemdetail.html').then(function (response2) {
          response2.text().then(function (text2) {
            let page2 = domparser.parseFromString(text2, 'text/html')

            // then load item detail
            fetch('iteminfo/' + itemId + '.txt').then(function (response3) {
              response3.text().then(function (text3) {
                let t = text3.split(',')

                page2.getElementById('preview').innerHTML = "<img src=\"previewimg/" + itemId + ".png\">"
                page2.getElementById('itemId').innerHTML = "상품번호: " + t[0]
                page2.getElementById('type').innerHTML = "종류: " + t[3]
                page2.getElementById('name').innerHTML = "상품명: " + t[1]
                page2.getElementById('cost').innerHTML = "가격: " + t[2] + "원"
                page2.getElementById('itemdetail').innerHTML += "<img id=\"detailimg\" src=\"detailimg/" + itemId + ".png\">"

                // if item detail is fully loaded, merge
                target.innerHTML += page2.querySelector('body').innerHTML
                document.getElementById('content').innerHTML = page.querySelector('body').innerHTML
              })
            })
          })
        })
      })
    })
  }
}

function generateCart () {
  const domparser = new DOMParser()
  fetch('article/cartcontent.html').then(function (response) {
    response.text().then(function (text) {
      let page = domparser.parseFromString(text, 'text/html')
      let count = 0
      let total = 0

      // modify this code below
      for (let i = 0; i < inCart.length; i++) {
        fetch('iteminfo/' + inCart[i] + '.txt').then(function (response2) {
          response2.text().then(function (text2) {
            let t = text2.split(',')
            let item = new itemPreviewInfo(t[0], t[1], t[2])

            page.getElementById('incartlist').innerHTML += item.toCartHTML()
            count++;
            total += item.fee

            if (count >= inCart.length) {
              page.getElementById('totalcost').innerHTML = "총합: " + total + "원"
              document.getElementById('content').innerHTML = page.querySelector('body').innerHTML
            }
          })
        })
      }
    })
  })
}
