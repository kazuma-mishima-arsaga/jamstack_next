---
title: 'JamStack blog'
date: '2022-07-13'
description: 'ジャムおじさんじゃないです。JamStackブログです。'
---

# カレーパンマン

カレー

## ジャムおじさん

ジャム

```js[class="line-numbers"]
import Layout from '../components/layout';
import '../styles/globals.css';
import '../styles/prism.css';
import SEO from '../next-seo.config';
import { DefaultSeo } from 'next-seo';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
```