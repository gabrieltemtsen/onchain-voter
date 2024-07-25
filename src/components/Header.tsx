import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-red-500 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold">Onchain Voter</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/">
                <span className="hover:underline">Home</span>
              </Link>
            </li>
            <li>
              <Link href="/dashboard">
                <span className="hover:underline">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link href="/create">
                <span className="hover:underline">Create Proposal</span>
              </Link>
            </li>
            <li>
              <ConnectButton/>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
