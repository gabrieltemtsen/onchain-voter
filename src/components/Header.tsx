import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-gradient-to-r from-red-600 to-red-400 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold">
          <Link href="/">Onchain Voter</Link>
        </h1>
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle menu">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
        <nav className={`md:flex space-x-4 ${isOpen ? 'block' : 'hidden'} md:block`}>
          <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 items-center">
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
            <li className="md:ml-4">
              <ConnectButton.Custom>
                {({ openConnectModal }) => (
                  <button
                    onClick={openConnectModal}
                    className="bg-white text-red-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 focus:outline-none"
                  >
                    Connect Wallet
                  </button>
                )}
              </ConnectButton.Custom>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
