const weight = {
  rock: { weakTo: "paper", strongTo: "scissors" },
  paper: { weakTo: "scissors", strongTo: "rock" },
  scissors: { weakTo: "rock", strongTo: "paper" },
};

export function determineWinner(
  a: "rock" | "paper" | "scissors",
  b: "rock" | "paper" | "scissors"
) {
  if (a === b) {
    return undefined;
  } else if (weight[a].strongTo === b) {
    return "a";
  } else {
    return "b";
  }
}
