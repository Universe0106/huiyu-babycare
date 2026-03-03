import React, { ReactNode } from 'react'
import { View } from '@tarojs/components'

interface AppProps {
  children?: ReactNode
}

function App({ children }: AppProps) {
  return (
    <View className="app">
      {children}
    </View>
  )
}

export default App
