import { useNavigate } from "react-router";
import { CompanionMessage } from "./CompanionMessage";

export function TransitionToApply() {
  const navigate = useNavigate();

  const messages = [
    "Nice! You watched the concepts. 🎉",
    "But watching is easy... let's see if you can actually USE what you learned! 💪",
    "Swipe right if it applies. Left if it doesn't. Down for hints.",
    "No typing. No stress. Just swipe! 👆",
  ];

  return (
    <CompanionMessage
      messages={messages}
      cta="Let's swipe! 🔥"
      onContinue={() => navigate("/apply")}
    />
  );
}