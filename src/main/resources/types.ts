declare const __non_webpack_require__: (path: string) => any;

declare const resolve: (path: string) => any;


declare const app: {
  name: string,
  version: string,
  config: { [key: string]: string }
}

declare const log: {
  info: (...args: any[]) => void,
  warning: (...args: any[]) => void,
  error: (...args: any[]) => void
}

declare const __: {
  newBean: (bean: string) => any,
  toNativeObject: (beanResult: any) => any
}
