'use client';
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import CheckMarkGif from "@/components/GifComponents/CheckMarkGif/CheckMarkGif";

export default function Home() {
  // This is a client component that uses the Next.js router to navigate.
  const router = useRouter();
  // This is the main entry point for the application.
  // It is a client component that renders the main content of the page.
  // You can add your main content here or import other components to render.

  useEffect(() => {
    // This effect runs once when the component mounts.
    // login page
    router.push("/landing-page");

  }, []);
  return (
    <div>
      <CheckMarkGif />
    </div>
  );
}
