import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "react-router-dom";
import useTheme from "./hooks/use-theme";
import router from "./routes";

const queryClient = new QueryClient();

export default function App() {
  useTheme();
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} position="bottom" />
      <Toaster />
    </QueryClientProvider>
  );
}
