import { createBrowserRouter } from "react-router";
import { Welcome } from "./components/Welcome";
import { LanguageSelection } from "./components/LanguageSelection";
import { LearningMap } from "./components/LearningMap";
import { BeforeModule1 } from "./components/BeforeModule1";
import { LearnReels } from "./components/LearnReels";
import { TransitionToApply } from "./components/TransitionToApply";
import { ApplySwipe } from "./components/ApplySwipe";
import { ModuleComplete } from "./components/ModuleComplete";
import { Module2Intro } from "./components/Module2Intro";
import { Module2Correct } from "./components/Module2Correct";
import { Module2CorrectAI } from "./components/Module2CorrectAI";
import { Module3Intro } from "./components/Module3Intro";
import { Module3Teach } from "./components/Module3Teach";
import { Module3Transition } from "./components/Module3Transition";
import { Module4Intro } from "./components/Module4Intro";
import { Module4Challenge } from "./components/Module4Challenge";
import { Module4Create } from "./components/Module4Create";
import { FinalComplete } from "./components/FinalComplete";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Welcome,
  },
  {
    path: "/language",
    Component: LanguageSelection,
  },
  {
    path: "/map",
    Component: LearningMap,
  },
  {
    path: "/before-module-1",
    Component: BeforeModule1,
  },
  {
    path: "/learn",
    Component: LearnReels,
  },
  {
    path: "/transition",
    Component: TransitionToApply,
  },
  {
    path: "/apply",
    Component: ApplySwipe,
  },
  {
    path: "/complete",
    Component: ModuleComplete,
  },
  {
    path: "/module-2-intro",
    Component: Module2Intro,
  },
  {
    path: "/module-2-correct",
    Component: Module2Correct,
  },
  {
    path: "/module-2-correct-old",
    Component: Module2CorrectAI,
  },
  {
    path: "/module-3-intro",
    Component: Module3Intro,
  },
  {
    path: "/module-3-teach",
    Component: Module3Teach,
  },
  {
    path: "/module-3-transition",
    Component: Module3Transition,
  },
  {
    path: "/module3-transition",
    Component: Module3Transition,
  },
  {
    path: "/module-4-intro",
    Component: Module4Intro,
  },
  {
    path: "/module-4-challenge",
    Component: Module4Challenge,
  },
  {
    path: "/module-4-create",
    Component: Module4Create,
  },
  {
    path: "/final-complete",
    Component: FinalComplete,
  },
]);