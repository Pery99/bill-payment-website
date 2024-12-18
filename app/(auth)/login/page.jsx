"use client";

import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { auth } from "@/lib/firebase";
import { useDispatch } from "react-redux";
import { login } from "@/app/features/auth/authSlice";

export default function Loginform() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      dispatch(login({ email: user.email, uid: user.uid }));
      setLoading(false);
      toast.success("Welcome back!");
      router.push("/"); // Redirect on successful login
    } catch (err) {
      setLoading(false);

      switch (err.code) {
        case "auth/user-not-found":
          toast.error("No user found with this email.");
          break;
        case "auth/wrong-password":
          toast.error("Incorrect password. Please try again.");
          break;
        case "auth/invalid-email":
          toast.error("Invalid email format.");
          break;
        default:
          toast.error("Something went wrong. Please try again later.");
          break;
      }
    }
  };

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Login
      </Typography>
      <form
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        onSubmit={handleLogin}
      >
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Email
          </Typography>
          <Input
            size="lg"
            placeholder="name@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Password
          </Typography>
          <Input
            type="password"
            size="lg"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
        <Typography color="gray" className="mt-3 text-start font-normal">
          forgot password?
        </Typography>
        <Button
          disabled={loading}
          type="submit"
          className="mt-6 disabled:cursor-not-allowed disabled:opacity-85"
          fullWidth
        >
          {loading ? "Loading..." : "Login"}
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Don't have an account? <Link href="/register">Register</Link>
        </Typography>
      </form>
    </Card>
  );
}
