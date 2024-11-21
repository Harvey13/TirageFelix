import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import PresenceList from '../components/PresenceList';
import DrawTeams from '../components/DrawTeams';

export default function Home() {
  const [totalParticipants, setTotalParticipants] = useState(0);
  const [presentParticipants, setPresentParticipants] = useState<number[]>([]);
  const [showDrawTeams, setShowDrawTeams] = useState(false);

  useEffect(() => {
    const storedTotal = localStorage.getItem('totalParticipants');
    const storedPresent = localStorage.getItem('presentParticipants');
    if (storedTotal) setTotalParticipants(parseInt(storedTotal));
    if (storedPresent) setPresentParticipants(JSON.parse(storedPresent));
  }, []);

  useEffect(() => {
    localStorage.setItem('totalParticipants', totalParticipants.toString());
    localStorage.setItem('presentParticipants', JSON.stringify(presentParticipants));
  }, [totalParticipants, presentParticipants]);

  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Tirage Équipes Pétanque</title>
        <meta name="description" content="Application de tirage d'équipes de pétanque" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-3xl font-bold mb-6 text-center">Tirage Équipes Pétanque</h1>
        {!showDrawTeams ? (
          <PresenceList
            totalParticipants={totalParticipants}
            setTotalParticipants={setTotalParticipants}
            presentParticipants={presentParticipants}
            setPresentParticipants={setPresentParticipants}
            onDrawTeams={() => setShowDrawTeams(true)}
          />
        ) : (
          <DrawTeams
            presentParticipants={presentParticipants}
            onBack={() => setShowDrawTeams(false)}
          />
        )}
      </main>
    </div>
  );
}

