import { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

interface Proposal {
  _id: string;
  name: string;
  transactionHash: string;
  contractAddress: string;
  savedBy: number;
  blockNumber: number;
  timestamp: number;
  logIndex: number;
  signature: string;
  args: Array<{
    key: string;
    value: any;
  }>;
}

const ProposalsList = () => {
  const [proposals, setProposals] = useState<Proposal[]>([]);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await axios.get('/api/indexedData');
        setProposals(response.data);
      } catch (error) {
        console.error('Error fetching proposals:', error);
      }
    };

    fetchProposals();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Proposals Timeline</h2>
      <div className="relative">
        <div className="border-l-4 border-blue-500 absolute h-full top-0 left-1/2 transform -translate-x-1/2"></div>
        <div className="space-y-8">
          {proposals.map((proposal, index) => {
            const proposalId = proposal.args.find(arg => arg.key === 'proposalId')?.value._hex;
            const proposalName = proposal.args.find(arg => arg.key === 'name')?.value;
            const formattedDate = format(new Date(proposal.timestamp * 1000), 'PPpp');

            return (
              <div key={proposal._id} className="relative pl-5 pr-7">
                <div className="absolute  top-0 left-1/2 transform -translate-x-1/2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                  {index + 1}
                </div>
                <div className="ml-8">
                  <h3 className="text-xl font-semibold">{proposalName}</h3>
                  <p className="text-gray-600">Proposal ID: {parseInt(proposalId, 16)}</p>
                  <p className="text-gray-600">Created on: {formattedDate}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProposalsList;
