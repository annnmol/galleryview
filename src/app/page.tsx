"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function Home() {
  const showToast = () => {
    toast.success("Toast notification works!", {
      description: "This is a Sonner toast notification.",
    });
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Gallery View</h1>
          <p className="text-muted-foreground">Shadcn UI components demo</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Button Component</CardTitle>
              <CardDescription>
                Different variants of the button component
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <CardTitle>Toast Component</CardTitle>
              <CardDescription>
                Click the button to show a Sonner toast notification
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={showToast} className="w-full">
                Show Toast Notification
              </Button>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <CardTitle>Card Component</CardTitle>
              <CardDescription>
                This is a card component with header, content, and footer
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Cards can contain various types of content and actions. They are
                perfect for displaying information in a structured way.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Card Action
              </Button>
            </CardFooter>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <CardTitle>Features</CardTitle>
              <CardDescription>
                What you get with this setup
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>✅ Shadcn UI components</li>
                <li>✅ Button component</li>
                <li>✅ Card component</li>
                <li>✅ Sonner toast notifications</li>
                <li>✅ Theme provider setup</li>
                <li>✅ Tailwind CSS integration</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
