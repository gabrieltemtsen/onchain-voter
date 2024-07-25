import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useReadContract } from 'wagmi';
import { ONCHAIN_VOTER_ABI, ONCHAIN_VOTER_ADDRESS } from '../utils/contract';
import { optimism } from 'viem/chains';
import { createPublicClient, http } from 'viem';
import ProposalsList from '../components/ProposalList';

const Home = () => {
  const [proposals, setProposals] = useState<any[]>([]);
  const router = useRouter();

  const client = createPublicClient({
    chain: optimism,
    transport: http(),
  });
console.log(proposals)
  const { data: totalProposals }: any = useReadContract({
    address: ONCHAIN_VOTER_ADDRESS,
    abi: ONCHAIN_VOTER_ABI,
    functionName: 'getTotalProposals',
  });

  useEffect(() => {
    const fetchProposals = async () => {
      if (totalProposals) {
        const proposalsArray = [];
        for (let i = 0; i < Number(totalProposals); i++) {
          const proposal: any = await client.readContract({
            address: ONCHAIN_VOTER_ADDRESS,
            abi: ONCHAIN_VOTER_ABI,
            functionName: 'getProposal',
            args: [i],
          });
          const _proposal = {
            name: proposal[0],
            voteCount: Number(proposal[1]),
          };
          proposalsArray.push(_proposal);
        }
        setProposals(proposalsArray);
      }
    };
    fetchProposals();
  }, [totalProposals]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <ProposalsList />
      <h1 className="text-4xl font-bold mb-8">Proposals</h1>
      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {proposals.map((proposal, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => router.push(`/proposal/${index}`)}
          >
            <h2 className="text-2xl text-black font-bold mb-2">{proposal.name}</h2>
            <p>Votes: {proposal.voteCount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
