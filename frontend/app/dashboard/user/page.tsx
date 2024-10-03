import { redirect } from "next/navigation";

import { getCurrentUserFromServer } from "@/lib/user/actions";

import { DashboardField } from "@/components/dashboard/fields/DashboardField";
import { DashboardFieldWithButton } from "@/components/dashboard/fields/DashboardFieldWithButton";
import { SignOutButton } from "@/components/buttons/SignOutButton";
import { TUser } from "@/types/user.types";

export default async function AccountPage() {
  const response = await getCurrentUserFromServer();
  const user: TUser = await response?.json();

  function printRoleName() {
    if (user?.isAdmin) return "Admin";
    else if (user?.isAuthor) return "Author";
    else return "User";
  }

  return (
    <div className="account-page">
      <h1>My account</h1>

      <div style={{ marginTop: "1rem" }}>
        <DashboardField
          label="Name"
          description="Your full name."
          value={`${user?.firstName} ${user?.lastName}`}
          type="name"
        />
        <DashboardField
          label="Email"
          description="The email address associated with your account."
          value={user?.email}
        />

        <DashboardField
          label="Role"
          description="Your role on the website."
          value={printRoleName()}
        />
        <DashboardFieldWithButton
          label="Logout"
          description="Sign out of your account."
          button={<SignOutButton />}
        />
      </div>
    </div>
  );
}
