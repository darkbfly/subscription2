import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'com.kuaishou.nebula',
  name: '快手极速版',
  groups: [
    {
      key: 1,
      name: '自动签到',
      activityIds: ['com.yxcorp.gifshow.HomeActivity'],
      rules: [
        {
          matches: '@Button[text="立即签到"]',
        },
      ],
    },
  ],
});
