'use client'

import { type PropsWithChildren } from 'react'
import { TanstackQueryProvider, ThemeProvider } from './index'

export function MainProvider({ children }: PropsWithChildren<unknown>) {
	return (
		<TanstackQueryProvider>
			<ThemeProvider
				attribute='class'
				defaultTheme='light'
				disableTransitionOnChange
				storageKey='auth-theme'
			>
				{children}
			</ThemeProvider>
		</TanstackQueryProvider>
	)
}
