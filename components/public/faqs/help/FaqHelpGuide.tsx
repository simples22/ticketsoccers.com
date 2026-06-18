import FaqHelpSteps from "./FaqHelpSteps";
import FaqHelpCards from "./FaqHelpCards";

export default function FaqHelpGuide() {
  return (
    <section className="tslnFaqHelp">
      <div className="tslnFaqHelpInner">
        <FaqHelpSteps />
        <FaqHelpCards />
      </div>
    </section>
  );
}