"use client";

import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function calculateDayProgress() {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endOfDay = new Date(startOfDay);
  endOfDay.setDate(endOfDay.getDate() + 1);
  
  const totalDayMs = endOfDay.getTime() - startOfDay.getTime();
  const elapsedMs = now.getTime() - startOfDay.getTime();
  
  return (elapsedMs / totalDayMs) * 100;
}

function calculateYearProgress() {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const endOfYear = new Date(now.getFullYear() + 1, 0, 1);
  
  const totalYearMs = endOfYear.getTime() - startOfYear.getTime();
  const elapsedMs = now.getTime() - startOfYear.getTime();
  
  return (elapsedMs / totalYearMs) * 100;
}

export default function Home() {
  const [dayProgress, setDayProgress] = useState<number | null>(null);
  const [yearProgress, setYearProgress] = useState<number | null>(null);
  const [showYear, setShowYear] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Set initial values
    setDayProgress(calculateDayProgress());
    setYearProgress(calculateYearProgress());

    // Set up interval for updates
    const interval = setInterval(() => {
      setDayProgress(calculateDayProgress());
      setYearProgress(calculateYearProgress());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/80 to-muted/30 transition-colors">
      <div className="max-w-3xl mx-auto min-h-screen flex flex-col px-6 py-12 sm:px-8 sm:py-16">
        <header className="flex justify-between items-center mb-16 sm:mb-24">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-foreground/50 bg-clip-text text-transparent">
            Tide
          </h1>
          <div className="flex gap-3">
            <Toggle 
              pressed={showYear} 
              onPressedChange={setShowYear}
              className="font-medium data-[state=on]:bg-foreground data-[state=on]:text-background"
              aria-label="Toggle year view"
            >
              Year View
            </Toggle>
            <Button 
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="border-2 transition-colors hover:bg-muted"
              aria-label="Toggle theme"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </Button>
          </div>
        </header>

        <main className="flex-1 flex flex-col gap-16 sm:gap-24">
          <section className="space-y-6">
            <div className="flex justify-between items-baseline mb-8">
              <h2 className="text-2xl sm:text-3xl font-semibold text-foreground/70">Today</h2>
              <span className="text-3xl sm:text-4xl font-mono font-bold tracking-tight">
                {dayProgress?.toFixed(1) ?? "--.-%"}
                <span className="text-foreground/40">%</span>
              </span>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-800/30 via-zinc-700/30 to-stone-800/30 blur-xl opacity-50 transition-opacity group-hover:opacity-70" />
              <Progress 
                value={dayProgress ?? 0} 
                className={cn(
                  "h-10 sm:h-12 rounded-full bg-black/10 dark:bg-white/5",
                  "relative overflow-hidden transition-all duration-500",
                  "[&>div]:bg-gradient-to-r [&>div]:from-slate-700 [&>div]:via-zinc-600 [&>div]:to-stone-700",
                  "[&>div]:animate-shimmer [&>div]:bg-[length:200%_100%]",
                  "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent",
                  "after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-black/5 after:to-transparent dark:after:via-white/5"
                )}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent dark:from-white/5 rounded-full pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent dark:from-white/5 rounded-full pointer-events-none" />
            </div>
            <p className="text-base sm:text-lg text-center text-muted-foreground/80 font-medium">
              {dayProgress !== null 
                ? `${Math.floor((100 - dayProgress) / 100 * 24)} hours remain today`
                : "Calculating..."}
            </p>
          </section>

          {showYear && (
            <section className="space-y-6">
              <div className="flex justify-between items-baseline mb-8">
                <h2 className="text-2xl sm:text-3xl font-semibold text-foreground/70">This Year</h2>
                <span className="text-3xl sm:text-4xl font-mono font-bold tracking-tight">
                  {yearProgress?.toFixed(1) ?? "--.-%"}
                  <span className="text-foreground/40">%</span>
                </span>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800/30 via-neutral-700/30 to-zinc-800/30 blur-xl opacity-50 transition-opacity group-hover:opacity-70" />
                <Progress 
                  value={yearProgress ?? 0} 
                  className={cn(
                    "h-10 sm:h-12 rounded-full bg-black/10 dark:bg-white/5",
                    "relative overflow-hidden transition-all duration-500",
                    "[&>div]:bg-gradient-to-r [&>div]:from-gray-700 [&>div]:via-neutral-600 [&>div]:to-zinc-700",
                    "[&>div]:animate-shimmer [&>div]:bg-[length:200%_100%]",
                    "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent",
                    "after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-black/5 after:to-transparent dark:after:via-white/5"
                  )}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent dark:from-white/5 rounded-full pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent dark:from-white/5 rounded-full pointer-events-none" />
              </div>
              <p className="text-base sm:text-lg text-center text-muted-foreground/80 font-medium">
                {yearProgress !== null
                  ? `${Math.floor((100 - yearProgress) / 100 * 365)} days remain this year`
                  : "Calculating..."}
              </p>
            </section>
          )}
        </main>

        <footer className="mt-auto pt-16 text-center text-sm text-muted-foreground/50">
          A perspective timer
        </footer>
      </div>
    </div>
  );
}
