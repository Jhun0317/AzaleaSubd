// app/(dashboard)/client/layout.tsx
export default function ClientLayout({ children }: { children: React.ReactNode }) {
  // REMOVE the <Sidebar /> from here! 
  // It should only return the children so it doesn't double-up.
  return <>{children}</>;
}
