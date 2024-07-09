import { useAppStore } from "@/app/store";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { SideNav } from "@/layout/side-nav";
import { SiteHeader } from "@/layout/site-header";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function MainLayout() {
  const user = useAppStore((state) => state.user);
  const location = useLocation();

  const resizableLayout = useAppStore((state) => state.resizableLayout);
  const setResizableLayout = useAppStore((state) => state.setResizableLayout);
  const isSideNavCollapsed = useAppStore((state) => state.isSideNavCollapsed);
  const setIsSideNavCollapsed = useAppStore(
    (state) => state.setIsSideNavCollapsed,
  );

  if (user && (user.admin_status === "1" || user?.admin_status === 1)) {
    return (
      <div>
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-screen w-full"
          // autoSaveId="persistence"
          onLayout={(sizes: number[]) => setResizableLayout(sizes)}
        >
          <ResizablePanel
            defaultSize={resizableLayout ? resizableLayout[0] : 17}
            collapsible={true}
            collapsedSize={4}
            minSize={17}
            maxSize={20}
            onCollapse={() => setIsSideNavCollapsed(true)}
            onExpand={() => setIsSideNavCollapsed(false)}
          >
            <SideNav
              isSideNavCollapsed={
                isSideNavCollapsed ? isSideNavCollapsed : false
              }
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel
            defaultSize={resizableLayout ? resizableLayout[1] : 83}
          >
            <SiteHeader />
            <main className="w-full px-3 pb-6 pt-2">
              <Outlet />
            </main>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    );
  }
  return <Navigate to="/auth/login" state={{ from: location }} replace />;
}
