export default function RootLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="bg-gray-800 text-white px-6 py-2 text-sm">
        <a href="/">Manage B2B</a>
      </div>
      <main className="grow p-6">{children}</main>
    </div>
  );    
}
