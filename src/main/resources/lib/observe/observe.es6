import { listener } from '/lib/xp/event';

const logEvent = (event) => {
  log.info(JSON.stringify(event));
};

export function init() {
  log.info('Hello from transpiled ES6 server-side code.');
  try {
    listener({
      type: 'node.*',
      localOnly: false,
      callback: logEvent
    });

  } catch (e) {
    log.error(e);
  }
}
 