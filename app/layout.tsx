import SideNav from "../components/navigation/sidenav";
import '@/styles/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
        <body className="antialiased">
            <div className="flex h-screen flex-wrap md:flex-wrap md:overflow-hidden bg-white">
                <div className="w-full flex-none md:w-48">
                    <SideNav />
                </div>
                <div className="w-full flex-1 p-6">
                    {children}
                </div>
            </div>
        </body>
    </html>
  );
}