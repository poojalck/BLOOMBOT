import { useNavigate } from "react-router";
import { CompanionMessage } from "./CompanionMessage";

export function BeforeModule1() {
  const navigate = useNavigate();

  const messages = [
    "Hey! 👋 I'm BloomBot, your learning buddy!",
    "Forget boring textbooks. You're gonna learn by scrolling... just like Instagram reels! 📱",
    "One concept at a time. Short. Visual. Actually fun.",
    "Stuck? Just ask me! No pressure, no stress. 💪",
  ];

  return (
    <CompanionMessage
      messages={messages}
      cta="Let's goooo! 🚀"
      onContinue={() => navigate("/learn")}
    />
  );
}