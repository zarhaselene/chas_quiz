import {useContext} from "react";
import QuizContext from "./context/QuizContext";

export default function Leaderboard() {
  const {leaderboard} = useContext(QuizContext);
  return (
    <div className="">
      <h1>Leaderboard</h1>
      <ul>
        {leaderboard.map((entry, index) => (
          <li key={index}>
            <span>{entry.name}</span>
            <span> {entry.score} </span>
            <span>time: {entry.currentDate} </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
