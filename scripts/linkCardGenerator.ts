/* eslint-disable no-console */
const https = require('https')
const jsdom = require('jsdom')
const { JSDOM } = jsdom

const url = process.argv[2]

const req = https.request(url, (res: any) => {
  let html = ''
  res.on('data', (chunk: any) => {
    html += chunk
  })
  res.on('end', () => {
    const ogpObj: any = {}
    const dom = new JSDOM(html)

    const headEls = dom.window.document.head.children
    for (let i = 0; i < headEls.length; i++) {
      const prop = headEls[i].getAttribute('property')

      if (!prop) continue
      ogpObj[prop.split(':')[1]] = headEls[i].getAttribute('content')
    }
    console.log(ogpObj)
    console.log('↓----------------')
    console.log(
      `<link-card title="${ogpObj.title}" text="${ogpObj.description}" link-url="${ogpObj.url}" img-src="${ogpObj.image}"></link-card>`
    )
  })
})
req.end()
