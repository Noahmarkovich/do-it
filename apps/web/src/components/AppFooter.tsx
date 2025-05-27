export default function AppFooter() {
  return (
    <div className="h-[10vh] py-0 m-auto px-5 md:px-[10%] lg:px-[20%] xl:px-[30%]">
      <div className="flex items-center justify-between h-1/4">
        <p className="text-gray-500">© 2025 DoIt App</p>
        <p className="text-gray-500">Made With 💜</p>
      </div>
      <div className="w-full bg-contain bg-bottom md:bg-top md:bg-cover bg-no-repeat h-3/4 bg-[url('/photos/DOITAPP.png')]"></div>
    </div>
  );
}
