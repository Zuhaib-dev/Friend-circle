"use client";

import dynamic from "next/dynamic";
import * as React from "react";

const CommandMenuDialog = dynamic(() => import("./command-menu-dialog"), {
  ssr: false,
});

export default function CommandMenu() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.key === "k" || event.key === "K") && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((previous) => !previous);
      }
    };

    const handleCustomToggle = () => setOpen((previous) => !previous);

    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("toggle-command-menu", handleCustomToggle);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("toggle-command-menu", handleCustomToggle);
    };
  }, []);

  return open ? <CommandMenuDialog open={open} onOpenChange={setOpen} /> : null;
}
