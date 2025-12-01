import { supabase } from "@/supabaseClient";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { HiLightningBolt } from "react-icons/hi";
import { FaStar } from "react-icons/fa";
import { useUser } from "@/utils/UserProvider";

const Leaderboard = () => {
  const { userProfile } = useUser();
  const [leaderList, setLeaderList] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  useEffect(() => {
    const handleFetchLeaderboard = async () => {
      try {
        const { data, error } = await supabase.from("leaderboard").select("*");
        console.log(
          data.findIndex((item) => item.username === "Nii Lantei Lamptey")
        );
        if (error) {
          console.error(error);
          return;
        }
        setLeaderList(data);
      } catch (error) {
        console.log("Error in Leader Board: ", error.message);
      } finally {
        setIsFetching(false);
      }
    };

    handleFetchLeaderboard();
  }, []);

  if (isFetching) {
    return <Loading />;
  }

  return (
    <div className=" px-4 relative bg-sidebar col-span-1 lg:row-span-2 lg:col-span-1 rounded-xl pt-15">
      <div className="text-foreground/50 absolute top-4 left-8 flex justify-center gap-2">
        <p>Leaderboard - Top 20 students nationwide</p>
        <FaStar size={13} />
      </div>
      <div className="absolute top-3 right-3 bg-primary/20 text-primary rounded-xl px-3 py-2">
        You: #
        {leaderList.findIndex(
          (item) => item.username === userProfile.username
        ) + 1}
      </div>
      <ul className="w-full max-h-[65vh] h-full overflow-y-scroll">
        {leaderList.slice(0, 20).map((leader, index) => (
          <li
            className="w-full flex justify-between px-3 py-2 mb-2 rounded-r-full relative"
            key={index}
          >
            <div
              className="absolute left-0 w-1 h-full top-0 bg-primary/90"
              style={{ opacity: `${100 - index * 5}%` }}
            />
            <div className="flex items-center gap-4">
              <p className="text-muted-foreground/40">{index + 1}</p>
              <div className="">
                <p className="text-sm">{leader.username}</p>
                <p className="text-xs text-foreground/50 capitalize">
                  {leader.region}
                </p>
              </div>
              {index <= 2 ? <FaStar size={10} className="text-primary" /> : ""}
            </div>
            <div className="flex items-center gap-1">
              <HiLightningBolt size={14} />
              {leader.current_streak}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
