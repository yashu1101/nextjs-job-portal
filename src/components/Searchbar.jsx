"use client";

import { Search } from "lucide-react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useState } from "react";

export default function Searchbar({
  RedirectOnFocus,
  padding,
  border,
  searchBG,
  placeholder,
}) {
  const [value, setValue] = useState("");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    if (value.trim()) {
      params.set("search", value.trim());
    } else {
      params.delete("search");
    }

    const query = params.toString();

    router.push(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleOnSubmit}>
        <div
          className={`w-full flex justify-between overflow-hidden border border-gray-300 rounded-[10px] bg-white`}
        >
          <input
            onFocus={() => {
              if (RedirectOnFocus) {
                router.push("/jobs");
              }
            }}
            onChange={(e) => setValue(e.target.value)}
            value={value}
            type="search"
            name="search"
            id="search"
            placeholder={placeholder}
            className={`w-full ${padding}`}
          />

          <div
            className={`flex items-center justify-center ${searchBG} sm:p-3.5 p-2.5`}
          >
            <button type="submit">
              <Search />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}