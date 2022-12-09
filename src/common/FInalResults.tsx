import { QuestionnaireAnswers, TestScore } from "../types_interfaces/types";
import useHasMounted from "../utils/hasMounted";

const FinalResults: React.FC<any> = (props: [QuestionnaireAnswers, TestScore, TestScore]) => {
  const final_bhi_score = props[1];
  const final_selfdet_score = props[2];
  console.log("final_scores: ", final_bhi_score, final_selfdet_score);

  return (!useHasMounted ? <></> :
    <div className="final-results">
      Thank you for taking the test!
      <ul>
        {final_bhi_score.score}
      </ul>
    </div>
  )
}

export default FinalResults;