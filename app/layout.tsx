import "./globals.css"; 
import QueryProvider from "./providers/QueryProvider";
import Sidebar from "@/components/Sidebar"; // Adjust this path to where your Sidebar file actually is

export const metadata = {
  title: "Azalea Subdivision",
  description: "Azalea Subdivision Web App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <QueryProvider>
        
            <main className="flex-1">
              {children}
            </main>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
