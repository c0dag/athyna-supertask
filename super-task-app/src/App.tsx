import { BrowserRouter, Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { JobListPage } from "@/pages/JobListPage"
import { JobDetailed } from "@/pages/JobDetailed"
import { AdminPage } from "@/pages/AdminPage"

const queryClient = new QueryClient()


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<JobListPage />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
