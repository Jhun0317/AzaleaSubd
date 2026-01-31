export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <QueryProvider>
          {children} {/* No sidebar here! */}
        </QueryProvider>
      </body>
    </html>
  );
}
