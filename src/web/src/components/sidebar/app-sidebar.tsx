import React, { useEffect, useState } from "react";
import { BookOpen, User, Map, Home } from "lucide-react";

import { NavMain } from "@/components/sidebar/nav-main";
import { NavUser } from "@/components/sidebar/nav-user";
import { IdentitySwitcher } from "@/components/sidebar/identity-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useAuth } from "@/features/auth/stores/auth.store";
import { NavigationService } from "@/services/navigation.service";

export type IdentityNavItem = {
  name: string;
  logo: React.FC<React.SVGProps<SVGSVGElement>>;
};

export type MainNavItem = {
  title: string;
  url: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  isActive?: boolean;
  items: {
    title: string;
    url: string;
  }[];
};

export type UserNavItem = {
  username: string;
  email: string;
  url: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

export type NavigationData = {
  identityNavItems: IdentityNavItem[];
  mainNavItems: MainNavItem[];
  userNavItem: UserNavItem;
};

// Fallback sample data if user data can't be loaded
const fallbackData = {
  identityNavItems: [
    {
      name: "Default",
      logo: User,
    },
  ],
  mainNavItems: [
    {
      title: "Dashboard",
      url: "#",
      icon: Home,
      isActive: true,
      items: [
        {
          title: "Goals",
          url: "#",
        },
        {
          title: "Habits",
          url: "#",
        },
      ],
    },
    {
      title: "Roadmaps",
      url: "#",
      icon: Map,
      items: [],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
      ],
    },
  ],
  userNavItem: {
    username: "User",
    email: "user@example.com",
    url: "#",
    icon: User,
  },
};

export const AppSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  const { user, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [navigationData, setNavigationData] =
    useState<NavigationData>(fallbackData);

  useEffect(() => {
    async function loadUserNavigation() {
      if (isAuthenticated && user) {
        setIsLoading(true);
        try {
          const response = await NavigationService.getUserNavigation(user.id);
          if (response.success && response.data) {
            const { profile, identities, goals } = response.data;

            const identityNavItems = identities.map((identity) => ({
              name: identity.name,
              logo: User,
            }));

            const mainNavItems = [
              {
                title: "Dashboard",
                url: "#",
                icon: Home,
                items: [
                  {
                    title: "Goals",
                    url: "/goals",
                  },
                  {
                    title: "Habits",
                    url: "#",
                  },
                ],
              },
              {
                title: "Roadmaps",
                url: "#",
                icon: Map,
                items: goals.map((goal) => ({
                  title: goal.title,
                  url: `/roadmap/${goal.id}`,
                })),
              },
            ];

            const userNavItem = {
              username: profile.username,
              email: user.email || "",
              url: "#",
              icon: User,
            };

            setNavigationData({
              identityNavItems,
              mainNavItems,
              userNavItem,
            });
          }
        } catch (error) {
          console.error("Failed to load user navigation:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    }

    loadUserNavigation();
  }, [isAuthenticated, user]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <IdentitySwitcher
          identities={navigationData.identityNavItems}
          isLoading={isLoading}
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navigationData.mainNavItems} isLoading={isLoading} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={navigationData.userNavItem} isLoading={isLoading} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
