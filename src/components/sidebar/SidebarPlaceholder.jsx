export default function SidebarPlaceholder() {
  return (
    <div
      className={`flex flex-col items-center justify-center bg-black border-r border-[#80808040]  h-full items-center  p-3.5 overflow-hidden sidebar-lg sidebar-md   ${isSidebarOpen ? "toggle-sidebar" : ""} `}>
      {/* <Loader className="animate-spin"></Loader> */}
      <div className=" bg-black p-4 space-y-5">
        {/* Profile */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-neutral-800 animate-pulse" />

          <div className="space-y-2">
            <div className="h-3 w-24 rounded bg-neutral-800 animate-pulse" />
            <div className="h-2 w-16 rounded bg-neutral-900 animate-pulse" />
          </div>
        </div>

        {/* Menu */}
        <div className="space-y-3">
          <div className="h-10 w-full rounded-lg bg-neutral-900 animate-pulse" />
          <div className="h-10 w-full rounded-lg bg-neutral-900 animate-pulse" />
          <div className="h-10 w-full rounded-lg bg-neutral-900 animate-pulse" />
          <div className="h-10 w-full rounded-lg bg-neutral-900 animate-pulse" />
        </div>

        {/* Bottom */}
        <div className="h-10 w-full rounded-lg bg-neutral-800 animate-pulse" />
      </div>
    </div>
  );
}
