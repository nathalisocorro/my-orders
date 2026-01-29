"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Key, KeyRound, User, User2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";

export default function Login() {
  const ref = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !credentials.email ||
      credentials.email === "" ||
      !credentials.password ||
      credentials.password === ""
    )
      return;

      try{
        const response = await fetch('/api/auth/login', {
        method: 'POST',
        credentials: "include",
        body: JSON.stringify(credentials),
      })
        if (response.status === 401){
          toast.error("Invalid credentials")
        }
      }
      catch(error){
        toast.error(error as string)
      }

    router.push("/");
  };

  console.log(credentials);

  return (
    <div className="grid min-h-screen place-items-center bg-linear-to-r from-[#22C1C3] to-[#FDBB2D]">
      <Card className="h-120 w-[90vw] sm:w-125">
        <CardHeader className="text-4xl mt-3 text-[#268889] mb-8 font-extrabold flex flex-col items-center justify-center">
          Login
          <CardDescription className="font-bold">
            Log in and find what u need
          </CardDescription>
        </CardHeader>
        <form ref={ref} onSubmit={handleSubmit}>
          <CardContent className="sm:px-10 grid gap-5">
            <div>
              <Label
                htmlFor="email"
                className="text-gray-800 font-sm font-bold"
              >
                Email
              </Label>
              <div className="relative w-full">
                <User2
                  className="absolute top-2 left-2 opacity-55"
                  size={"20"}
                />
                <Input
                  required
                  onChange={handleChange}
                  id="email"
                  className="px-8"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div>
              <Label
                htmlFor="password"
                className="text-gray-800 font-sm font-bold"
              >
                Password
              </Label>
              <div className="relative w-full">
                <KeyRound
                  className="absolute top-2 left-2 opacity-55"
                  size={"20"}
                />
                <Input
                  required
                  onChange={handleChange}
                  id="password"
                  className="px-8"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="grid gap-10 mt-4 mb-3">
            <Link href={"/forgot-password"}>
              <div className="text-[#268889] text-sm underline flex justify-center">
                Forgot ur password?
              </div>
            </Link>
            <div className="flex w-full justify-center gap-4 flex-col sm:flex-row">
              <Button
                size={"lg"}
                type="submit"
                className="bg-[#3eb2b4] hover:bg-[#FDBB2D]"
              >
                Log in
              </Button>
              <Link href="/registry" className="mb-3 sm:mb-0">
                <Button
                  size={"lg"}
                  className="bg-[#3eb2b4] hover:bg-[#FDBB2D] w-full"
                >
                  Sign up
                </Button>
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
