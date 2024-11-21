import React, { useState } from 'react';

interface DrawTeamsProps {
  presentParticipants: number[];
  onBack: () => void;
}

const DrawTeams: React.FC<DrawTeamsProps> = ({ presentParticipants, onBack }) => {
  const [teams, setTeams] = useState<number[][]>([]);

  const drawTeams = () => {
    const shuffled = [...presentParticipants].sort(() => Math.random() - 0.5);
    const mod4 = shuffled.length % 4;
    const mod6 = shuffled.length % 6;
    let newTeams: number[][] = [];

    if (mod4 === 0) {
      // All teams are doubles
      for (let i = 0; i < shuffled.length; i += 2) {
        newTeams.push(shuffled.slice(i, i + 2));
      }
    } else if (mod4 === 1) {
      // Maximum doubles, one triple or all triples
      if (mod6 === 0) {
        // All triples
        for (let i = 0; i < shuffled.length; i += 3) {
          newTeams.push(shuffled.slice(i, i + 3));
        }
      } else {
        // Maximum doubles, one triple
        for (let i = 0; i < shuffled.length - 3; i += 2) {
          newTeams.push(shuffled.slice(i, i + 2));
        }
        newTeams.push(shuffled.slice(-3));
      }
    } else if (mod4 === 2) {
      // Maximum doubles, one triple or all triples
      if (shuffled.length % 3 === 0) {
        // All triples
        for (let i = 0; i < shuffled.length; i += 3) {
          newTeams.push(shuffled.slice(i, i + 3));
        }
      } else {
        // Maximum doubles, one triple
        for (let i = 0; i < shuffled.length - 3; i += 2) {
          newTeams.push(shuffled.slice(i, i + 2));
        }
        newTeams.push(shuffled.slice(-3));
      }
    } else if (mod4 === 3) {
      // Maximum doubles, minimize uneven teams
      const tripleCount = Math.floor(shuffled.length / 3);
      const doubleCount = Math.floor((shuffled.length - tripleCount * 3) / 2);

      for (let i = 0; i < tripleCount * 3; i += 3) {
        newTeams.push(shuffled.slice(i, i + 3));
      }
      for (let i = tripleCount * 3; i < shuffled.length; i += 2) {
        newTeams.push(shuffled.slice(i, i + 2));
      }
    }

    setTeams(newTeams);
  };

  return (
    <div className="space-y-6">
      <p className="text-xl">Nombre de participants présents : {presentParticipants.length}</p>
      <button onClick={drawTeams} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full">
        Effectuer le tirage
      </button>
      <div className="grid grid-cols-2 gap-4">
        {teams.map((team, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded">
            <h3 className="font-bold mb-2">Équipe {index + 1}</h3>
            <div className="flex space-x-2">
              {team.map(player => (
                <div
                  key={player}
                  className="w-8 h-8 bg-red-500 text-yellow-300 rounded-full flex items-center justify-center font-bold"
                >
                  {player}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button onClick={onBack} className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 w-full">
        Retour
      </button>
    </div>
  );
};

export default DrawTeams;

