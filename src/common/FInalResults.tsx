import { BHIQuestion, QuestionnaireAnswers, SelfDetQuestion, TestScore } from "../types_interfaces/types";
import useHasMounted from "../utils/hasMounted";
import "../styles.css";
import BoxPlot from "./BoxPlot";
import { calcDimScores } from "../utils/qre-hooks";

const FinalResults: React.FC<any> = (props: [QuestionnaireAnswers, TestScore[], TestScore[]]) => {
  const answers = props[0];
  const bhiScores = props[1];
  const selfDetScores = props[2];

  console.log("final_scores: ", bhiScores, selfDetScores);

  return (!useHasMounted ? <></> :
    <div className="final-results">
      Thank you for taking the test!
      {/* <!-- Load d3.js --> */}
      <script src="https://d3js.org/d3.v4.js"></script>

      {/* <!-- Create a div where the graph will take place --> */}
      <div id="my_dataviz"></div>

      {/* <!-- Plugin for color scale --> */}
      <script src="https://d3js.org/d3-scale-chromatic.v1.min.js"></script>

      <BoxPlot />
      <ul>
        {bhiScores[0].score}
      </ul>
    </div>
  )
}

export default FinalResults;