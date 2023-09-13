import { ModuleOptions } from './types'

const defaultThrowErrorValue = { throwError: true }

export const defaultSecurityConfig = (serverlUrl: string): ModuleOptions => ({
  headers: {
    crossOriginResourcePolicy: 'same-origin',
    crossOriginOpenerPolicy: 'same-origin',
    crossOriginEmbedderPolicy: 'require-corp',
    contentSecurityPolicy: {
      'base-uri': ["'self'"],
      'font-src': ["'self'", 'https:', 'data:'],
      'form-action': ["'self'"],
      'frame-ancestors': ["'self'"],
      'img-src': ["'self'", 'data:'],
      'object-src': ["'none'"],
      'script-src-attr': ["'none'"],
      'style-src': ["'self'", 'https:', "'unsafe-inline'"],
      'upgrade-insecure-requests': true
    },
    originAgentCluster: '?1',
    referrerPolicy: 'no-referrer',
    strictTransportSecurity: {
      maxAge: 15552000,
      includeSubdomains: true
    },
    xContentTypeOptions: 'nosniff',
    xDNSPrefetchControl: 'off',
    xDownloadOptions: 'noopen',
    xFrameOptions: 'SAMEORIGIN',
    xPermittedCrossDomainPolicies: 'none',
    xXSSProtection: '0',
    permissionsPolicy: {
      camera: ['()'],
      'display-capture': ['()'],
      fullscreen: ['()'],
      geolocation: ['()'],
      microphone: ['()']
    }
  },
  requestSizeLimiter: {
    maxRequestSizeInBytes: 2000000,
    maxUploadFileRequestInBytes: 8000000,
    ...defaultThrowErrorValue
  },
  rateLimiter: {
    // Twitter search rate limiting
    tokensPerInterval: 150,
    interval: 'hour',
    fireImmediately: true,
    ...defaultThrowErrorValue
  },
  xssValidator: {
    ...defaultThrowErrorValue
  },
  corsHandler: {
    // Options by CORS middleware for Express https://github.com/expressjs/cors#configuration-options
    origin: serverlUrl,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    preflight: {
      statusCode: 204
    },
    ...defaultThrowErrorValue
  },
  allowedMethodsRestricter: '*',
  hidePoweredBy: true,
  basicAuth: false,
  enabled: true,
  csrf: false,
  nonce: false,
  // https://github.com/Talljack/unplugin-remove/blob/main/src/types.ts
  removeLoggers: {
    external: [],
    consoleType: ['log', 'debug'],
    include: [/\.[jt]sx?$/, /\.vue\??/],
    exclude: [/node_modules/, /\.git/]
  }
})
