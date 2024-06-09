import { useEffect, useState } from "react";
import { CChart } from "@coreui/react-chartjs";


function App() {
  const [homevalue, setHomeValue] = useState(1000);
  const [downPayment, setDownPayment] = useState(0);
  const [loanAmount, setLoanAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(2);
  const [tenure, setTenure] = useState(10);

  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    // Update the downPaymentValue : 20% of current homevalue
    const newDownPayment = Math.floor(homevalue * 0.2);
    setDownPayment(newDownPayment);
    setLoanAmount(homevalue - newDownPayment);
  }, [homevalue]);

  useEffect(() => {
    const interestPerMonth = interestRate / 100 / 12;
    const totalLoanMonths = tenure * 12;
    const EMI =
      (loanAmount *
        interestPerMonth *
        (1 + interestPerMonth) ** totalLoanMonths) /
      ((1 + interestPerMonth) ** totalLoanMonths - 1);

    setMonthlyPayment(EMI);
  }, [loanAmount, interestRate, tenure]);

  return (
    <>
    <h1 style={{padding: '1rem 4rem', background: 'blue', color:'white'}}>Bank of React</h1>
    <div style={{ display: "flex", justifyContent: "space-between", gap:'2rem', padding:'0 3rem'}}>
      <div style={{width:'45%'}}>
        <div>
          <p>Home Value</p>
          <p>${homevalue} </p>
          <input
            onChange={(e) => setHomeValue(parseInt(e.currentTarget.value))}
            type="range"
            min="1000"
            max="10000"
            value={homevalue}
            style={{width:'90%'}}
          />
        </div>
        <div>
          <p>Down Payment</p>
          <p>${homevalue - loanAmount} </p>
          <input
            onChange={(e) => {
              setDownPayment(parseInt(e.currentTarget.value));
              setLoanAmount(homevalue - parseInt(e.currentTarget.value));
            }}
            type="range"
            min="0"
            max={homevalue}
            value={downPayment}
            style={{width:'90%'}}
          />
        </div>
        <div>
          <p>Loan Amount</p>
          <p>${homevalue - downPayment} </p>
          <input
            onChange={(e) => {
              setLoanAmount(parseInt(e.currentTarget.value));
              setDownPayment(homevalue - parseInt(e.currentTarget.value));
            }}
            type="range"
            min="0"
            max={homevalue}
            value={loanAmount}
            style={{width:'90%'}}
          />
        </div>
        <div>
          <p>Interest Rate</p>
          <p>% {interestRate}</p>
          <input
            onChange={(e) => setInterestRate(parseInt(e.currentTarget.value))}
            type="range"
            min="2"
            max="18"
            style={{width:'90%'}}
          />
        </div>
      </div>
      <div style={{ width: "30%" }}>
        <h3>Monthly Payment: $ {monthlyPayment}</h3>
        <CChart
          type="pie"
          data={{
            labels: ["Principle", "Interest"],
            datasets: [
              {
                backgroundColor: ["#41B883", "#E46651"],
                data: [homevalue, monthlyPayment * tenure * 12 - loanAmount],
              },
            ],
          }}
          options={{
            plugins: {
              legend: {
                labels: {
                  color: "green",
                },
              },
            },
          }}
        />
      </div>
    </div>
    </>
  );
}

export default App;
