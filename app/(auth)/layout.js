export default function Layout({ children }) {
  return (
    <div className="flex items-center justify-evenly h-screen p-3 fixed w-full">
      <img className="hidden md:block" src="/welcome.webp" alt="Welcome" />
      <main className="">{children}</main>
    </div>
  );
}
