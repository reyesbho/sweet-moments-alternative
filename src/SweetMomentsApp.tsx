import { RouterProvider } from "react-router"
import { appRouter } from "./app.router"
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { useAuthStore } from "./auth/store/auth.store";
import type { PropsWithChildren } from "react";
import { Toaster } from 'sonner'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient();

export const SweetMomentsApp = () => {
   const {checkAuthStatus} = useAuthStore();

  const CheckAuthProvider = ({children}: PropsWithChildren) => {
    const {isLoading} = useQuery({
      queryKey: ['auth'],
      queryFn: checkAuthStatus,
      retry: false,
      refetchInterval: 1000 * 60 * 60,
      refetchOnWindowFocus: true
    })

    if(isLoading){
      return <h1>Loading...</h1>
    }

    return children;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster></Toaster>
      <CheckAuthProvider>
        <RouterProvider router={appRouter}></RouterProvider>
      </CheckAuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
