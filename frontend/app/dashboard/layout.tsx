"use server";
import { redirect } from "next/navigation";

import "./DashboardLayout.scss";

import { getCurrentUserFromServer } from "@/lib/user/actions";
import { TUser } from "@/types/user.types";

import { DashboardNavigation } from "@/components/dashboard/navigation/DashboardNavigation";
import { LoadingScreen } from "@/components/ui/loading/screen/LoadingScreen";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = async ({ children }: Props) => {
  const response = await getCurrentUserFromServer();
  const userFromJson: TUser = await response?.json();

  console.log("From layout:", userFromJson);

  if (!response) return <LoadingScreen />;

  if (!response.ok) {
    redirect("/login");
  }

  if (response.ok) {
    return (
      <div className="dashboard-page">
        <DashboardNavigation user={userFromJson} />
        <div className="dashboard-content">{children}</div>
      </div>
    );
  }
};

export default DashboardLayout;
