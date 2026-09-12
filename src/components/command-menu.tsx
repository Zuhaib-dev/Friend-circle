"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Compass,
  FileText,
  Camera,
  Radio,
  Activity,
  Users,
  Backpack,
  Info,
  Quote,
  Moon,
  Shield,
  UserCheck,
  User,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

export function openCommandMenu() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("toggle-command-menu"));
  }
}

export default function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    setMounted(true);

    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    const handleCustomToggle = () => setOpen((prev) => !prev);

    document.addEventListener("keydown", down);
    window.addEventListener("toggle-command-menu", handleCustomToggle);

    return () => {
      document.removeEventListener("keydown", down);
      window.removeEventListener("toggle-command-menu", handleCustomToggle);
    };
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a route, tactical operation, or protocol..." />
      <CommandList>
        <CommandEmpty>No matching protocol or route found.</CommandEmpty>

        <CommandGroup heading="Field Operations & Routes">
          <CommandItem
            onSelect={() => runCommand(() => router.push("/tours"))}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Compass className="h-4 w-4 text-signal" />
            <span>Tours & Passes</span>
            <CommandShortcut>/tours</CommandShortcut>
          </CommandItem>

          <CommandItem
            onSelect={() => runCommand(() => router.push("/dispatches"))}
            className="flex items-center gap-2 cursor-pointer"
          >
            <FileText className="h-4 w-4 text-signal" />
            <span>Dispatches & Field Logs</span>
            <CommandShortcut>/dispatches</CommandShortcut>
          </CommandItem>

          <CommandItem
            onSelect={() => runCommand(() => router.push("/gallery"))}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Camera className="h-4 w-4 text-signal" />
            <span>Frames & Photography</span>
            <CommandShortcut>/gallery</CommandShortcut>
          </CommandItem>

          <CommandItem
            onSelect={() => runCommand(() => router.push("/surveillance"))}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Radio className="h-4 w-4 text-signal" />
            <span>Surveillance Feeds</span>
            <CommandShortcut>/surveillance</CommandShortcut>
          </CommandItem>

          <CommandItem
            onSelect={() => runCommand(() => router.push("/live-ops"))}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Activity className="h-4 w-4 text-signal" />
            <span>Live Ops Radar</span>
            <CommandShortcut>/live-ops</CommandShortcut>
          </CommandItem>

          <CommandItem
            onSelect={() => runCommand(() => router.push("/crew"))}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Users className="h-4 w-4 text-signal" />
            <span>Crew Directory</span>
            <CommandShortcut>/crew</CommandShortcut>
          </CommandItem>

          <CommandItem
            onSelect={() => runCommand(() => router.push("/loadout"))}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Backpack className="h-4 w-4 text-signal" />
            <span>Mission Loadout & Gear</span>
            <CommandShortcut>/loadout</CommandShortcut>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Field Manual & Mission">
          <CommandItem
            onSelect={() => runCommand(() => router.push("/about"))}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Info className="h-4 w-4 text-signal" />
            <span>About Friend Circle</span>
            <CommandShortcut>/about</CommandShortcut>
          </CommandItem>

          <CommandItem
            onSelect={() => runCommand(() => router.push("/testimonials"))}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Quote className="h-4 w-4 text-signal" />
            <span>Voices & Testimonials</span>
            <CommandShortcut>/testimonials</CommandShortcut>
          </CommandItem>

          <CommandItem
            onSelect={() => runCommand(() => router.push("/tazkiyah"))}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Moon className="h-4 w-4 text-signal" />
            <span>Tazkiyah & Reflections</span>
            <CommandShortcut>/tazkiyah</CommandShortcut>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Personnel & Systems">
          <CommandItem
            onSelect={() => runCommand(() => router.push("/apply-team"))}
            className="flex items-center gap-2 cursor-pointer"
          >
            <UserCheck className="h-4 w-4 text-signal" />
            <span>Enlist for Field Clearance</span>
            <CommandShortcut>/apply</CommandShortcut>
          </CommandItem>

          <CommandItem
            onSelect={() => runCommand(() => router.push("/profile"))}
            className="flex items-center gap-2 cursor-pointer"
          >
            <User className="h-4 w-4 text-signal" />
            <span>Operator Dossier</span>
            <CommandShortcut>/profile</CommandShortcut>
          </CommandItem>

          <CommandItem
            onSelect={() => runCommand(() => router.push("/admin"))}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Shield className="h-4 w-4 text-signal" />
            <span>HQ Command Console</span>
            <CommandShortcut>/admin</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
