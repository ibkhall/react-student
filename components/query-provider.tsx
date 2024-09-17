'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { PropsWithChildren } from "react"

export const QueryProvider: React.FC<PropsWithChildren> = ({children}) => {
    const queryClient = new QueryClient()

    return <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
}