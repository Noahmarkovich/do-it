export default function AppFooter() {
  return (
    <div className="py-0 my-0 px-5 md:px-[10%] lg:px-[20%] xl:px-[30%] mt-auto flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className="text-gray-500">© 2025 DoIt App</p>
        <p className="text-gray-500">Made With 💜</p>
      </div>
      <div className="w-full h-[80px]">
        <img
          src="/photos/DOITAPP.png"
          alt="DoItApp"
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
