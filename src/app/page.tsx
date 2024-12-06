"use client";

import CardMelds from "./components/card-melds";
import MeldBuilder from "./components/meld-builder";
import OpponentInfo from "./components/opponent-info";
import PlayerInfo from "./components/player-info";

export default function Home() {
  return (
    <div className="flex h-screen w-full">
      {/* Larger section (2/3) */}
      <div className="w-2/3 bg-accent">
        {/* Content for the larger section */}
      </div>

      {/* Smaller section (1/3) */}
      <div className="w-1/3 bg-[#0a0a09] overflow-hidden">
        <div className="flex flex-col h-full">
          <div className="h-fit">
            <OpponentInfo />
            <CardMelds
              onMeldsChange={(newMelds) =>
                console.log("Melds updated:", newMelds)
              }
              className="flex justify-center h-fit w-full space-x-4 p-4 opacity-85"
            />
            <OpponentInfo name="Momolfo" />
            <CardMelds
              onMeldsChange={(newMelds) =>
                console.log("Melds updated:", newMelds)
              }
              className="flex justify-center h-fit w-full space-x-4 p-4 opacity-85"
            />
            <OpponentInfo name="cm1411" />
            <CardMelds
              onMeldsChange={(newMelds) =>
                console.log("Melds updated:", newMelds)
              }
              className="flex justify-center h-fit w-full space-x-4 p-4 opacity-85"
            />
          </div>
          <div className="">
            <PlayerInfo />
            <CardMelds
              onMeldsChange={(newMelds) =>
                console.log("Melds updated:", newMelds)
              }
              className="flex justify-center h-fit w-full space-x-4 p-6"
            />
            <MeldBuilder id="builder" cardIds={[]} />
          </div>
        </div>
      </div>
    </div>
  );
}
