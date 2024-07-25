import { useState } from 'react';
import { useRouter } from 'next/router';
import { useWriteContract } from 'wagmi';
import { ONCHAIN_VOTER_ABI, ONCHAIN_VOTER_ADDRESS } from '../utils/contract';
import Spinner from '../components/Spinner';

const CreateProposal = () => {
  const [proposalName, setProposalName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { writeContract: createProposalWrite } = useWriteContract();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!proposalName) {
      alert('Please enter a proposal name');
      return;
    }

    setIsLoading(true);
    try {
      const tx = await createProposalWrite({
        address: ONCHAIN_VOTER_ADDRESS,
        abi: ONCHAIN_VOTER_ABI,
        functionName: 'createProposal',
        args: [proposalName],
      }, {
        onSuccess: () => {
      alert('Proposal created successfully!');
      setProposalName('');  // Clear the input field
      router.push('/');  
        }
      });
     
      // Redirect to the homepage
    } catch (error) {
      console.error(error);
      alert('Failed to create proposal.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Create a Proposal</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <input
          type="text"
          placeholder="Proposal Name"
          value={proposalName}
          onChange={(e) => setProposalName(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none"
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default CreateProposal;
