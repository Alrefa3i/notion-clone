"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { formSchema } from "@/lib/types";
import { login } from "../action";
import { useSearchParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import clsx from "clsx";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MailCheck } from "lucide-react";

export default function ProfileForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [submitError, setSubmitError] = useState("");
  const [confirmation, setConfirmation] = useState(false);

  const codeExchangeError = useMemo(() => {
    if (!searchParams) return "";
    return searchParams.get("error_description");
  }, [searchParams]);

  const confirmationAndErrorStyles = useMemo(
    () =>
      clsx("bg-primary", {
        "bg-red-500/10": codeExchangeError,
        "border-red-500/50": codeExchangeError,
        "text-red-700": codeExchangeError,
      }),
    [codeExchangeError]
  );
  const clearForm = () => {
    form.reset();
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const isloading = form.formState.isSubmitting;
  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (
    values: z.infer<typeof formSchema>
  ) => {
    login(values);
    clearForm();
  };
  return (
    <div className="flex justify-center items-center h-screen dark:bg-gradient-to-t bg-gradient-to-b from-primary-foreground   dark:to-50% ">
      <Card className="w-[400px] rounded-2xl shadow-sm relative">
        <div className=" block w-full blur-[120px] rounded-full h-32 absolute bg-purple-500/50 -z-10 top-0" />
        <CardHeader className="space-y-2 ">
          <CardTitle className="text-2xl text-center">Welcome back!</CardTitle>
          <CardDescription>Login to your account</CardDescription>
          <div className="flex flex-col gap-4 mt-4">
            <Button variant={"default"}>
              <i className="bx bxl-google"></i> Login with Google
            </Button>
            <Button variant={"default"}>
              <i className="bx bxl-github"></i> Login with Github
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                variant={"default"}
                className="w-full cursor-pointer"
                type="submit"
              >
                Submit
              </Button>
              {submitError && <FormMessage>{submitError}</FormMessage>}

              {(confirmation || codeExchangeError) && (
                <>
                  <Alert className={confirmationAndErrorStyles}>
                    {!codeExchangeError && <MailCheck className="h-4 w-4" />}
                    <AlertTitle>
                      {codeExchangeError ? "Invalid Link" : "Check your email."}
                    </AlertTitle>
                    <AlertDescription>
                      {codeExchangeError ||
                        "An email confirmation has been sent."}
                    </AlertDescription>
                  </Alert>
                </>
              )}
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex gap-4 flex-col items-start ">
          <Link href="/auth/forgot-password" className="text-sm">
            Forgot Password?
          </Link>
          <Link href="/register" className="text-sm">
            Don&apos;t have an account? Sign Up
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
