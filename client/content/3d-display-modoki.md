---
title: ブラウザで動く多視点ディスプレイみたいなものを作ってみたかった話
description: 2020年アドカレ記事。空間再現ディスプレイみたいな多視点ディスプレイを作ろうと思って色々とやってみてる話です。
categories: [JavaScript, TypeScript, three.js, 作ったもの]
createdAt: 2020-12-16T13:24:00.397Z
---

この記事は[IPFactory Advent Calender 2020](https://qiita.com/advent-calendar/2020/ipfactory)の16日目の記事です。

## はじめに

最近Twitterで多視点ディスプレイを作っている人を見かけました。  
また、製品としてもSONYの空間再現ディスプレイやLooking Glassなども発売されています。

n番煎じで自明な技術ではあるが、興味あるしどんな感じに見えるか気になったのでとりあえず作ってみましたという話です。

## demo動画

実際に見てもらった方がわかりやすいので、先にDEMO動画を貼っておきます。

<iframe src="https://www.youtube.com/embed/YJpoo4YPXYo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 概要

運動視差を利用し、立体感があるように見えるディスプレイです。  
見る位置によって対象の像が動くことで立体感を感じることができます。運動視差で画像検索したらわかりやすいと思います。

Twitterで見かけたのはViveのトラッカーを使ってましたが、家にはそんなものは無いのでWebカメラで顔認識して位置座標を取ります。  
また、Webアプリとして実装するのでブラウザ上で動作するものになります。(多分Unityとかで作った方が簡単だと思う)(知らんけど)(Webアプリとして作るのは趣味)(というかUnityわからんしまともに扱えるのがJSなのでこうなったとも言える)

## 実装の詳細

実装の流れを書いていきます。かなり省略している部分があります。

### 3Dモデルの表示

各3Dオブジェクトの表示には`three.js`を使用しています。  
また、VRMファイルを扱うのに`@pixiv/three-vrm`

```typescript
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xeeeeee)
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const gridHelper = new THREE.GridHelper(10, 20)
scene.add(gridHelper)
gridHelper.visible = true

// 光源
const light = new THREE.DirectionalLight(0xffffff)
light.position.set(1, 1, 1).normalize()
scene.add(light)

// VRMファイルの読み込み
const loader = new GLTFLoader()
loader.load(
  '/models/AliciaSolid.vrm',
  (gltf) => {
    VRM.from(gltf).then((vrm) => {
      vrm.scene.rotation.y = 180 * Math.PI / 180
      scene.add(vrm.scene)

      console.log(vrm)
    }).catch(e => {
      console.error(e)
    })
  },
  (progress) => console.log('Loading model...', 100.0 * (progress.loaded / progress.total), '%'),
  (error) => console.error(error)
)
```

### Webカメラを使って顔認識

`mediaDevices.getUserMedia`でWebカメラを使い、顔認識には[`clmtrackr`](https://github.com/auduno/clmtrackr)を使用しています。`getCurrentPosition()`で現在の顔位置の座標が取れます。

```typescript
navigator.mediaDevices.getUserMedia({
  video: {
    width: 480,
    height: 270
  },
  audio: false
}).then((stream) => {
  video.srcObject = stream
}).catch(e => {
  console.error(e)
})

tracker.init()
tracker.start(video)
```

### 顔の座標に合わせてカメラを動かす

顔の座標を元にthreeのカメラ位置を動かします。  
計算は割と適当にやってしまってるので直したい。

```typescript
const position = getFacePosition()
if (position != null) {
  rotx = (480 / 2 - position[0]) / 12
  roty = (270 / 2 - position[1]) / 5
}
const radian = rotx * Math.PI / 180
const y = roty * Math.PI / 180
// カメラ位置
camera.position.x = 1.5 * Math.sin(radian)
camera.position.z = 1.5 * Math.cos(radian)
camera.position.y = y + 1.2
camera.lookAt(new THREE.Vector3(0, 1.2, 0))
```

ここまできたらこんな感じに顔位置に合わせてカメラが動きます。

<iframe src="https://www.youtube.com/embed/YJpoo4YPXYo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 終わりの感想というかまとめというか

- カメラ位置の計算とか適当にやってるので多分ずれてる
- でもわりとそれっぽく見えてるかも。楽しい。
- Webカメラの範囲的に動ける範囲が限られてる。もっといろんな視点から舐めまわしたい
- ちょくちょくトラッキング外れる
