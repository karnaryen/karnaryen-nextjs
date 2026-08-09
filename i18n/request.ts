import { getRequestConfig } from 'next-intl/server';

import { formats } from '@/i18n/config';
import { getUserLocale } from '@/i18n/locale';
import type en from '@/messages/en.json';

export default getRequestConfig(async () => {
  const locale = await getUserLocale();
  const messages = (await import(`../messages/${locale}.json`)) as { default: typeof en };

  return {
    locale,
    messages: messages.default,
    // Content dates are day-precision, so pin the zone: without it the
    // server's own zone decides, and a date can render a day off.
    timeZone: 'UTC',
    formats,
  };
});
