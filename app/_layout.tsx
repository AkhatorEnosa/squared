import SafeScreen from "@/components/SafeScreen";
import { Slot } from "expo-router";
import React from "react";

export default function RootLayout() {
  return (
    <SafeScreen>
      <Slot />
    </SafeScreen>
  )
}
