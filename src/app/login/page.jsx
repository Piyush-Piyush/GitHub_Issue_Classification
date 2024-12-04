'use client';

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router"; 
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GithubIcon } from "lucide-react";

export default function AuthPage() {
  const { data: session } = useSession();
  const [isClient, setIsClient] = useState(false); // Track client-side rendering
  // const router = useRouter(); // Initialize the router

  useEffect(() => {
    setIsClient(true); // Once component is mounted, set client flag to true
  }, []);

  useEffect(() => {
    if (session) {
      // Redirect to the dashboard (or any page you want) after login
      router.push('/dashboard'); // Replace with your target page
    }
  }, [session, router]); // Dependency on session

  if (!isClient) {
    // Ensure we are only trying to render this on the client-side
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            {session ? "Welcome back! Please login to your account." : "Create a new account to get started."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-4">
            <Button variant="outline" className="w-full" onClick={() => signIn('github')}>
              <GithubIcon className="mr-2 h-4 w-4" />
              Sign in with GitHub
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
