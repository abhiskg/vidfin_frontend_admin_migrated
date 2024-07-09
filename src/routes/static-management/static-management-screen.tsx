import { useAppStore } from "@/app/store";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StaticManagementAbout } from "./components/static-management-about";
import { StaticManagementFaq } from "./components/static-management-faq";
import { StaticManagementInvestor } from "./components/static-management-investor";
import { StaticManagementPrivacy } from "./components/static-management-privacy";
import { StaticManagementTerms } from "./components/static-management-terms";

export default function StaticManagementScreen() {
  const user = useAppStore((state) => state.user);
  return (
    <div className="mt-1">
      <Breadcrumbs
        segments={[
          {
            title: "Dashboard",
            href: "/",
          },
          {
            title: "Static Management",
            href: `/static-management`,
          },
        ]}
      />
      <Tabs defaultValue="privacy" className="mt-5 ">
        <TabsList className="">
          <TabsTrigger
            value="privacy"
            disabled={
              user?.roleDetails.permissions.static_content_management
                ?.privacy_policy === 0
            }
          >
            Privacy Policy
          </TabsTrigger>
          <TabsTrigger
            value="terms"
            disabled={
              user?.roleDetails.permissions.static_content_management
                ?.terms_and_condition === 0
            }
          >
            Terms & Conditions
          </TabsTrigger>
          <TabsTrigger
            value="about"
            disabled={
              user?.roleDetails.permissions.static_content_management?.view ===
              0
            }
          >
            About Us
          </TabsTrigger>
          <TabsTrigger
            value="faq"
            disabled={
              user?.roleDetails.permissions.static_content_management?.faq === 0
            }
          >
            FAQ
          </TabsTrigger>
          <TabsTrigger
            value="investor"
            disabled={
              user?.roleDetails.permissions.static_content_management?.faq === 0
            }
          >
            Investor Complaints
          </TabsTrigger>
        </TabsList>
        <TabsContent value="privacy">
          <StaticManagementPrivacy />
        </TabsContent>
        <TabsContent value="terms">
          <StaticManagementTerms />
        </TabsContent>
        <TabsContent value="about">
          <StaticManagementAbout />
        </TabsContent>
        <TabsContent value="faq">
          <StaticManagementFaq />
        </TabsContent>
        <TabsContent value="investor">
          <StaticManagementInvestor />
        </TabsContent>
      </Tabs>
    </div>
  );
}
