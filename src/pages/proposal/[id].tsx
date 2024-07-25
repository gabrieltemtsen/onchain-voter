import { useRouter } from 'next/router';
import { useReadContract, useWriteContract } from 'wagmi';
import { ONCHAIN_VOTER_ABI, ONCHAIN_VOTER_ADDRESS } from '../../utils/contract';

const Proposal = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: proposal }: any = useReadContract({
    address: ONCHAIN_VOTER_ADDRESS,
    abi: ONCHAIN_VOTER_ABI,
    functionName: 'getProposal',
    args: [id],
  });

  const { writeContract: voteWrite } = useWriteContract();

  const handleVote = async () => {
    try {
       voteWrite({
        address: ONCHAIN_VOTER_ADDRESS,
        abi: ONCHAIN_VOTER_ABI,
        functionName: 'vote',
        args: [id],
      }, {
        onSuccess: () => {
          alert('Vote cast successfully!');
          router.push('/');  
        }, 
        onError: (error) => {
          console.error(error);
          alert('Failed to cast vote.');
        }
      });
    } catch (error) {
      console.error(error);
      alert('Failed to cast vote.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      {proposal && (
        <>
          <h1 className="text-4xl font-bold mb-4">{proposal[0]}</h1>
          <p className="text-xl mb-4">Votes: {Number(proposal[1])}</p>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none"
            onClick={handleVote}
          >
            Vote
          </button>
        </>
      )}
    </div>
  );
};

export default Proposal;
