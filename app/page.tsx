import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to Delegations</h1>
        <p className="text-lg mb-8">
          Manage your delegations and reports efficiently with our tool.
        </p>
        <Link href="/dashboard">
          <div className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors focus:outline-none">
            Go to Dashboard
          </div>
        </Link>
      </div>
      <div className="mt-16">
        <Image
          src="/next.svg"
          alt="Delegations Logo"
          width={180}
          height={37}
          priority
        />
      </div>
    </main>
  );
}
