import React from "react";
import { useNavigate } from "react-router-dom";
import supabase from '../../supabaseClient';
import { Button } from "./button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import { Input } from "./input";
import { Label } from "./label";

export function LoginForm({ className = "", ...props }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    // Sign in with Supabase Auth
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      setError("Invalid email or password");
      return;
    }
    // Get user email
    const userEmail = signInData?.user?.email;
    if (!userEmail) {
      setError("Login failed: No user email found.");
      return;
    }
    // Check role from profiles table
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('email', userEmail)
      .single();
    if (profileError || !profileData) {
      setError("You do not have admin access.");
      return;
    }
    if (profileData.role === 'admin') {
      setError("");
      navigate('/admindashboard');
    } else {
      setError("You do not have admin access.");
    }
  };


  return (
    <Card className={"w-[350px] " + className} {...props}>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="text-2xl text-orange-700">Login</CardTitle>
          <CardDescription className="text-orange-700">Enter your credentials below to login.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
        </CardContent>
        <CardFooter>
          <Button className="w-full !bg-orange-500 !text-white hover:!bg-orange-600" type="submit">Login</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
