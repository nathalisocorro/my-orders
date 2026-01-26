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
import { Code, KeyRound, Mail, User2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function ForgotPassword() {
  const ref = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const refCode = useRef<HTMLFormElement>(null);
  const [credentials, setCredentials] = useState({
    code: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !credentials.code ||
      credentials.code === "" ||
      !credentials.confirm_password ||
      credentials.confirm_password === "" ||
      !credentials.password ||
      credentials.password === "" ||
      credentials.password !== credentials.confirm_password
    )
      return;

    router.push("/login");
  };

  const handleSendCode = () => {
    console.log("The code has been sent");
  };

  return (
    <div className="grid min-h-screen place-items-center bg-linear-to-r from-[#22C1C3] to-[#FDBB2D]">
      <Card className="max-h-[95vh] w-[90vw] sm:w-125">
        <CardHeader className="text-4xl mt-3 text-[#268889] mb-8 font-extrabold flex flex-col items-center justify-center">
          Forgot ur password
          <CardDescription className="font-bold">
            Let us help u change ur password
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-5 mb-5 sm:px-10 ">
          <form onSubmit={handleSendCode}>
            <div>
              <Label
                htmlFor="email"
                className="text-gray-800 font-sm font-bold"
              >
                Email
              </Label>
              <div className="relative w-full">
                <Mail
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
            <div className="flex justify-center mt-3">
              <Button
                size={"lg"}
                type="submit"
                className="bg-[#3eb2b4] hover:bg-[#FDBB2D] w-full"
              >
                Send Code
              </Button>
            </div>
          </form>
        </CardContent>
        <form ref={ref} onSubmit={handleSubmit}>
          <CardContent className="sm:px-10 grid gap-5">
            <div>
              <Label htmlFor="code" className="text-gray-800 font-sm font-bold">
                Code
              </Label>
              <div className="relative w-full">
                <Code
                  className="absolute top-2 left-2 opacity-55"
                  size={"20"}
                />
                <Input
                  required
                  onChange={handleChange}
                  id="code"
                  className="px-8"
                  name="code"
                  placeholder="Enter here the code"
                />
              </div>
            </div>
            <div>
              <Label
                htmlFor="password"
                className="text-gray-800 font-sm font-bold"
              >
                New password
              </Label>
              <div className="relative w-full">
                <User2
                  className="absolute top-2 left-2 opacity-55"
                  size={"20"}
                />
                <Input
                  required
                  onChange={handleChange}
                  id="password"
                  type="password"
                  className="px-8"
                  name="password"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            <div>
              <Label
                htmlFor="confirm_password"
                className="text-gray-800 font-sm font-bold"
              >
                Confirm Password
              </Label>
              <div className="relative w-full">
                <KeyRound
                  className="absolute top-2 left-2 opacity-55"
                  size={"20"}
                />
                <Input
                  required
                  onChange={handleChange}
                  id="confirm_password"
                  className="px-8"
                  type="password"
                  name="confirm_password"
                  placeholder="Repeat your password"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="grid gap-10 mt-10 mb-3">
            <CardDescription className="ml-5">
              *Insert the same password, otherwise the form won't be sent
            </CardDescription>
            <Button
              size={"lg"}
              type="submit"
              className="bg-[#3eb2b4] hover:bg-[#FDBB2D]"
            >
              Save
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
