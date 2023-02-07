import { useState } from 'react';
import FeedbackOptions from 'components/FeedbackOptions/FeedbackOptions';
import Section from 'components/Section/Section';
import Statistics from 'components/Statistics/Statistics';
import Notification from 'components/Notification/Notification';

const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });
  const statePropNames = Object.keys(feedback);

  const onLeaveFeedback = feedback => {
    setFeedback(prevState => {
      const value = prevState[feedback];
      return {
        ...prevState,
        [feedback]: value + 1,
      };
    });
  };

  const countTotalFeedback = () => {
    let total = 0;
    for (const statePropName of statePropNames) {
      total += feedback[statePropName];
    }
    return total;
  };
  const countPositiveFeedbackPercentage = () => {
    const positiveFidback = Math.round(
      (feedback.good * 100) / countTotalFeedback()
    );
    return positiveFidback || '';
  };
  return (
    <>
      <Section title="Please leave the feedback">
        <FeedbackOptions
          options={statePropNames}
          onLeaveFeedback={onLeaveFeedback}
        />
      </Section>
      <Section title="Statistics">
        {countTotalFeedback() > 0 ? (
          <Statistics
            good={feedback.good}
            neutral={feedback.neutral}
            bad={feedback.bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          ></Statistics>
        ) : (
          <Notification message="There is no feedback"></Notification>
        )}
      </Section>
    </>
  );
};
export default App;
// export class App extends Component {
//   state = {
//     good: 0,
//     neutral: 0,
//     bad: 0,
//   };

//   statePropNames = Object.keys(this.state);

//   onLeaveFeedback = feedback => {
//     this.setState(prevState => ({
//       [feedback]: prevState[feedback] + 1,
//     }));
//   };

//   countTotalFeedback = () => {
//     let total = 0;
//     for (const statePropName of this.statePropNames) {
//       total += this.state[statePropName];
//     }
//     return total;
//   };
//   countPositiveFeedbackPercentage = () => {
//     const positiveFidback = Math.round(
//       (this.state.good * 100) / this.countTotalFeedback()
//     );
//     return positiveFidback || '';
//   };

//   render() {
//     return (
//       <>
//         <Section title="Please leave the feedback">
//           <FeedbackOptions
//             options={this.statePropNames}
//             onLeaveFeedback={this.onLeaveFeedback}
//           />
//         </Section>
//         <Section title="Statistics">
//           {this.countTotalFeedback() > 0 ? (
//             <Statistics
//               good={this.state.good}
//               neutral={this.state.neutral}
//               bad={this.state.bad}
//               total={this.countTotalFeedback()}
//               positivePercentage={this.countPositiveFeedbackPercentage()}
//             ></Statistics>
//           ) : (
//             <Notification message="There is no feedback"></Notification>
//           )}
//         </Section>
//       </>
//     );
//   }
// }
