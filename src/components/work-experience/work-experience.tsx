import { Timeline } from "../ui/timeline";
import { WORK_EXPERIENCE_ITEMS } from "./work-experience-items";

export function WorkExperience() {
  return <Timeline data={WORK_EXPERIENCE_ITEMS} />;
}
