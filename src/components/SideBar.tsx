function SideBar() {
  return (
    <div className="flex flex-col text-center w-[30vw] bg-zinc-900 text-white">
      <h1 className="bg-[#E50914] px-3 py-3">PathFinder</h1>

      <div className="flex flex-col items-center mt-5">
        <h2>1. Upload File</h2>
        <div className="w-[90%] mt-3">
          <input
            className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding py-[0.32rem] px-3 text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100"
            type="file"
          />
        </div>
      </div>
    </div>
  );
}

export default SideBar;
