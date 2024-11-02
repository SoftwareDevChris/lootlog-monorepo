"use client";
import { useQuery } from "@tanstack/react-query";

import { getCurrentUser } from "@/lib/user";

import { SignOutButton } from "@/components/buttons/SignOutButton";
import { Box, Container, Typography } from "@mui/material";
import { LoadingScreen } from "@/components/ui/loading/screen/LoadingScreen";

export default function AccountPage() {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  if (!user) return <LoadingScreen />;

  function printRoleName() {
    if (user?.isAdmin) return "Admin";
    else if (user?.isAuthor) return "Author";
    else return "User";
  }

  return (
    <Container className="flex flex-col gap-4">
      <Typography component="h1" variant="h6">
        My account
      </Typography>
      <Container className="flex flex-col justify-between gap-4 rounded-lg border border-neutral-700 bg-neutral-800 p-4 md:flex-row md:items-center">
        <Box>
          <Typography variant="h6" className="text-lg" color="textPrimary">
            Name
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Your full name
          </Typography>
        </Box>
        <Typography className="capitalize">{`${user?.firstName} ${user?.lastName}`}</Typography>
      </Container>

      <Container className="flex flex-col justify-between gap-4 rounded-lg border border-neutral-700 bg-neutral-800 p-4 md:flex-row md:items-center">
        <Box>
          <Typography variant="h6" className="text-lg" color="textPrimary">
            Email
          </Typography>
          <Typography variant="body2" color="textSecondary">
            The email address associated with your account
          </Typography>
        </Box>
        <Typography>{user?.email}</Typography>
      </Container>

      <Container className="flex flex-col justify-between gap-4 rounded-lg border border-neutral-700 bg-neutral-800 p-4 md:flex-row md:items-center">
        <Box>
          <Typography variant="h6" className="text-lg" color="textPrimary">
            Role
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Your role within the website
          </Typography>
        </Box>
        <Typography className="capitalize">{printRoleName()}</Typography>
      </Container>

      <Container className="flex flex-col justify-between gap-4 rounded-lg border border-neutral-700 bg-neutral-800 p-4 md:flex-row md:items-center">
        <Box>
          <Typography variant="h6" className="text-lg" color="textPrimary">
            Sign out
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {"You'll be redirected to the home page"}
          </Typography>
        </Box>
        <div className="md:max-w-[10rem]">
          <SignOutButton />
        </div>
      </Container>
    </Container>
  );
}
