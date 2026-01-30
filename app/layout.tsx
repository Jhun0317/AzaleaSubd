import QueryProvider from "./providers/QueryProvider";

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
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
