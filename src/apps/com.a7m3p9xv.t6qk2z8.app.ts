import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'com.a7m3p9xv.t6qk2z8.app',
  name: 'JMComic3',
  groups: [
    {
      key: 1,
      name: '开屏广告',
      activityIds: ['com.JMComic3.app.MainActivity'],
      rules: [
        '@Button <3 View < View < View < WebView < WebView < ViewGroup < [id="android:id/content"]',
        '@Button <2 View < View < View < View < WebView < WebView < ViewGroup < [id="android:id/content"]',
      ],
    },
  ],
});
