// src/app/page.tsx
import Link from 'next/link'


// Assuming you have some logic to determine if user is authenticated
const userAuthenticated = false;

export default function Page() {
  return (
   <Link href="/login">
    Login
   </Link>
  );
}
