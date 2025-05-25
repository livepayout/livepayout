"use client";

import qs from "query-string";
import { useState } from "react";
import { SearchIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Search = () => {
  const router = useRouter();
  const [value, setValue] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!value) return;

    const url = qs.stringifyUrl(
      {
        url: "/search",
        query: { term: value },
      },
      { skipEmptyString: true }
    );

    router.push(url);
  };

  const onClear = () => {
    setValue("");
    setOpen(false);
  };

  const [open, setOpen] = useState(false);
  return (
    <div className="w-full relative">
      <form
        onSubmit={onSubmit}
        className="relative hidden sm:flex ml-0 md:ml-8 md:w-3/5 items-center"
      >
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search"
          className="absolute top-0 w-full block sm:hidden rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
        />
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search"
          className="hidden sm:block rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
        />

        {value && (
          <X
            className="absolute top-2.5 right-14 h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition"
            onClick={onClear}
          />
        )}

        <Button
          type="submit"
          size="sm"
          variant="secondary"
          className="rounded-l-none mr-2 h-[40px]"
        >
          <SearchIcon className="h-5 w-5 text-muted-foreground" />
        </Button>
      </form>

      {/* For Mobile Nav */}
      <form
        onSubmit={onSubmit}
        className={`transition-all duration-400 ${
          open ? "translate-y-0" : "-translate-y-40"
        } sm:hidden fixed top-4 w-8/12 md:w-10/12 flex items-center z-40`}
      >
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search"
          className="flex-1 block rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
        />

        <X
          className="absolute top-2.5 right-14 h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition"
          onClick={onClear}
        />

        <Button
          type={`submit`}
          size="sm"
          variant="secondary"
          className="rounded-l-none mr-2 h-[40px]"
        >
          <SearchIcon className="h-6 w-6 text-muted-foreground" />
        </Button>
      </form>

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="ml-auto block w-max mt-0 sm:hidden h-[40px]"
      >
        <SearchIcon className="h-6 w-6 text-muted-foreground " />
      </button>
    </div>
  );
};
