<template>
  <div id="about">
    <h1>本サイト閲覧上の注意</h1>

    <h2>免責事項</h2>
    <p>
      本サイトにおける情報・資料の掲載には注意を払っておりますが、掲載された情報の内容の正確性については一切保証しません。<br />
      また、本サイトで得た情報・資料を利用、使用、ダウンロードするなどの行為に関連して生じたあらゆる損害等についても、理由の如何に関わらず、筆者は一切責任を負いません。<br />
      また、本サイトで提供する情報には、第三者が提供している情報が含まれていますが、これらは便宜のために提供しているものであり、筆者はその内容の正確性については一切責任を負いかねますのでご了承ください。
    </p>

    <h2>Googleアナリティクスについて</h2>
    <p>
      当サイトでは、アクセス解析のためGoogle社のサービスである「Googleアナリティクス」を利用しています。
      Googleアナリティクスは、Cookieを利用してトラフィックデータを匿名で収集しています。
      収集されたデータはGoogle社により、同社のプライバシーポリシーに基づいて管理されます。
    </p>
    <p>
      詳細は、以下のGoogleアナリティクスの利用規約およびプライバシーポリシーをご覧ください。
    </p>
    <ul>
      <li>
        <a
          href="https://marketingplatform.google.com/about/analytics/terms/jp/"
          target="_blank"
        >
          Google アナリティクス利用規約
        </a>
      </li>
      <li>
        <a href="https://policies.google.com/privacy?hl=ja" target="_blank">
          Google プライバシーポリシー
        </a>
      </li>
    </ul>
    <p>
      Googleアナリティクスによる情報収集を無効化したい場合は、ブラウザでCookieを無効にする、またはブラウザの拡張機能/アドオンを利用することで、Google
      アナリティクスを無効にし、情報の収集を停止させられます。
      例えば、Google社が提供する「Googleアナリティクス オプトアウト
      アドオン」からオプトアウトの設定をすることで、Googleアナリティクスによる情報収集を無効化できます。
    </p>
    <p>
      「Googleアナリティクスオプトアウトアドオン」の詳細については、以下のページをご覧ください。
    </p>
    <ul>
      <li>
        <a
          href="https://tools.google.com/dlpage/gaoptout?hl=ja"
          target="_blank"
        >
          Google アナリティクス オプトアウト アドオン
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'nuxt-composition-api'

export default defineComponent({
  head() {
    return {
      title: 'About',
    }
  },
  setup() {},
})
</script>

<style lang="scss" scoped>
#about {
  p,
  h2,
  h3,
  ul {
    margin-bottom: 10px;
  }
}
</style>
