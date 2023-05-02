// 开发环境下配置
const devConfig: {
  LS_CONFIG: {
    tokenSecret: string
    IV: string
    defaultExpires: number
  }
} = {
  LS_CONFIG: {
    tokenSecret: import.meta.env.VITE_LS_TOKEN_SECRET as string,
    IV: import.meta.env.VITE_LS_TOKEN_IV as string,
    defaultExpires: 1000,
  },
}

// 生产模式下配置
const proConfig = {
  ...devConfig,
}

export default import.meta.env.DEV ? devConfig : proConfig
