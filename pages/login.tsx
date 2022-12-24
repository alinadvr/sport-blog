import { useState } from "react";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { isUserLogged } from "../lib/getUser";

import { Layout } from "../components/layout/Layout";
import { TextInput } from "../components/inputs/TextInput";
import { PrimaryButton } from "../components/buttons/PrimaryButton";

const Login: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleLogIn = async () => {
    setIsLoading(true);
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      setError("");
      await router.push("/");
    } else {
      setError("Invalid email or password");
      // toast.error(`Error: ${response.statusText}`);
    }
    setIsLoading(false);
  };

  return (
    <Layout title="Login" isLoggedIn={false} isBackToBlogButton={true}>
      <div className="central-container flex h-1/2 w-5/6 flex-col items-center justify-center gap-2 rounded-xl border-2 border-gray-200 bg-white sm:w-2/3 lg:w-1/2 xl:w-1/3">
        <h1 className="text-4xl">Welcome Back!</h1>
        <p className="text-gray-300">Log in to continue</p>
        <form className="mx-auto grid w-2/3 gap-1.5">
          <TextInput
            type="email"
            value={email}
            onChange={setEmail}
            styleType="login"
            placeholder="Email"
            error={error}
          />
          <TextInput
            type="password"
            value={password}
            onChange={setPassword}
            styleType="login"
            placeholder="Password"
            error={error}
          />
          {error && (
            <p className="text-center text-lg text-rose-600">{error}</p>
          )}
          <div className="flex items-center justify-between">
            <Link href="/signup">
              <a className="cursor-pointer text-left text-sm text-black hover:underline sm:text-base">
                Do not have an account?
              </a>
            </Link>
            <PrimaryButton
              type="button"
              title="Login"
              buttonType="submit"
              onClick={handleLogIn}
              disabled={!email || !password || isLoading}
              isLoading={isLoading}
            />
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;

export const getServerSideProps = isUserLogged;
