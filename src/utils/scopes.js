import { Scope } from "@/generated/prisma/client";
export const scopes = [
  { scope: Scope.CALENDAR, value: "https://www.googleapis.com/auth/calendar" },
  {
    scope: Scope.EMAIL,
    value: "https://www.googleapis.com/auth/userinfo.email",
  },
  {
    scope: Scope.PROFILE,
    value: "https://www.googleapis.com/auth/userinfo.profile",
  },
  {
    scope: Scope.OPENID,
    value: "openid",
  },
];
