export default function RootLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow p-4 text-xl font-bold">
        Organizaton Management
      </header>
      <main className="flex-grow p-6">{children}</main>
    </div>
  );    
}
