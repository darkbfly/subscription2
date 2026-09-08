import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'com.tencent.wework',
  name: '企业微信',
  groups: [
    {
      key: 1,
      name: '加班餐扫码消费',
      rules: [
        {
          matches: '@TextView[text="扫码消费"]',
          actionDelay: 5000,
        },
      ],
    },
  ],
});
