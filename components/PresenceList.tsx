import React, { useState } from 'react';

interface PresenceListProps {
  totalParticipants: number;
  setTotalParticipants: (total: number) => void;
  presentParticipants: number[];
  setPresentParticipants: (present: number[]) => void;
  onDrawTeams: () => void;
}

const PresenceList: React.FC<PresenceListProps> = ({
  totalParticipants,
  setTotalParticipants,
  presentParticipants,
  setPresentParticipants,
  onDrawTeams,
}) => {
  const [inputTotal, setInputTotal] = useState('');

  const handleSetTotal = () => {
    const newTotal = parseInt(inputTotal);
    if (!isNaN(newTotal) && newTotal > 0) {
      setTotalParticipants(newTotal);
      setPresentParticipants(Array.from({ length: newTotal }, (_, i) => i + 1));
    }
  };

  const togglePresence = (participantNumber: number) => {
    if (presentParticipants.includes(participantNumber)) {
      setPresentParticipants(presentParticipants.filter(num => num !== participantNumber));
    } else {
      setPresentParticipants([...presentParticipants, participantNumber]);
    }
  };

  const resetPresence = () => {
    setPresentParticipants([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex space-x-2">
        <input
          type="number"
          value={inputTotal}
          onChange={(e) => setInputTotal(e.target.value)}
          placeholder="Nombre de participants"
          className="flex-grow p-2 border rounded"
        />
        <button onClick={handleSetTotal} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Valider
        </button>
      </div>
      <p className="text-xl">Nombre de participants : {totalParticipants}</p>
      <button onClick={resetPresence} className="bg-red-500 text-white p-2 rounded hover:bg-red-600 w-full">
        Remise à zéro
      </button>
      <div className="grid grid-cols-5 gap-4">
        {Array.from({ length: totalParticipants }, (_, i) => i + 1).map(num => (
          <button
            key={num}
            onClick={() => togglePresence(num)}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
              presentParticipants.includes(num) ? 'bg-red-500 text-yellow-300' : 'bg-gray-300 text-black'
            }`}
          >
            {num}
          </button>
        ))}
      </div>
      <button onClick={onDrawTeams} className="bg-green-500 text-white p-2 rounded hover:bg-green-600 w-full">
        Effectuer le tirage
      </button>
    </div>
  );
};

export default PresenceList;

