import SideNav from "../components/navigation/sidenav";
import "@/styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased">
        {/* Make layout full height and keep side-nav fixed; only the right column scrolls */}
        <div className="flex h-screen bg-white overflow-hidden">
          <div className="flex-none w-full md:w-48 h-full">
            {/* sticky ensures nav stays visible while right column scrolls */}
            <div className="h-full md:sticky md:top-0">
              <SideNav />
            </div>
          </div>
          <div className="flex-1 overflow-auto p-6">{children}</div>
        </div>
      </body>
    </html>
  );
}
