"use client";

import Link from "next/link";

export default function AdminComponentLoggedOut() {
  const googleSigninUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth?scope=EMAIL,PROFILE,OPENID&redirect_url=${process.env.NEXT_PUBLIC_BASE_URL}/admin/schedule`;
  return (
    <div className="min-h-screen bg-bone-900 pt-32">
      <div className="flex flex-col items-center justify-center py-10 bg-bone w-1/4 mx-auto rounded-lg shadow-lg px-10">
        <h3 className="text-xl font-bold mb-6">Welcome, Admin!</h3>
        <p className="text-bone-200 mb-6 text-sm">
          There's a lot of negative space here but this is what someone will see
          if they're not authorized to access the admin dashboard
        </p>
        <Link
          href={googleSigninUrl}
          className="px-10 py-3 bg-bone-200 text-white rounded-lg shadow-lg cursor-pointer hover:bg-bone-100 transition duration-200"
        >
          Login with Google
        </Link>
      </div>
    </div>
  );
}
