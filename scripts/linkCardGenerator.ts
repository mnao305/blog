/* eslint-disable no-console */
'use strict'
const https = require('https')
const fs = require('fs')
const crypto_ = require('crypto')
const jsdom = require('jsdom')
const sharp = require('sharp')
const request = require('request')
const { JSDOM } = jsdom
const shasum = crypto_.createHash('sha1')

const url = process.argv[2]

const req = https.request(url, (res: any) => {
  let html = ''
  res.on('data', (chunk: any) => {
    html += chunk
  })
  res.on('end', async () => {
    const ogpObj: any = {}
    const dom = new JSDOM(html)

    const headEls = dom.window.document.head.children
    for (let i = 0; i < headEls.length; i++) {
      const prop = headEls[i].getAttribute('property')

      if (!prop) continue
      ogpObj[prop.split(':')[1]] = headEls[i].getAttribute('content')
    }
    let fileName = ''
    if (ogpObj.image) {
      fileName = await downloadImage(ogpObj.image)
    }
    console.log(ogpObj)
    console.log('↓----------------')
    console.log(
      `<link-card title="${ogpObj.title}" text="${
        ogpObj.description
      }" link-url="${
        ogpObj.url
      }" img-src="${`client/static/link_img/${fileName}.png`}"></link-card>`
    )
  })
})
req.end()

async function downloadImage(fileUrl: string) {
  console.log(fileUrl)
  return await new Promise<string>((resolve) => {
    request({ method: 'GET', url: fileUrl, encoding: null }, async function (
      error: any,
      response: any,
      body: any
    ) {
      if (!error && response.statusCode === 200) {
        fs.writeFileSync('tmp.png', body, 'binary')

        shasum.update(fileUrl)
        const hash = shasum.digest('hex')
        console.log(hash)

        await resizeImage('tmp.png', hash)
        resolve(hash)
      }
    })
  })
}

async function resizeImage(filePath: string, outputName: string) {
  await new Promise<void>((resolve) => {
    sharp(filePath)
      .resize(null, 100)
      .resize(100, 100)
      .toFile(
        `client/static/link_img/${outputName}.png`,
        (err: any, info: any) => {
          if (err) {
            throw err
          }
          console.log(info)
          resolve()
        }
      )
  })
}
