import React, { useState, useMemo } from 'react';
import Layout from '@theme/Layout';
import styles from './investment-calculator.module.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface InvestmentData {
  year: number;
  investingValue: number;
  notInvestingValue: number;
  totalContributions: number;
  investmentGains: number;
}

interface CalculatorInputs {
  initialAmount: number;
  annualContribution: number;
  cagr: number;
  timeHorizon: number;
}

export default function InvestmentCalculator(): React.ReactElement {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    initialAmount: 10000,
    annualContribution: 5000,
    cagr: 8,
    timeHorizon: 20
  });

  const [inputStrings, setInputStrings] = useState<Record<keyof CalculatorInputs, string>>({
    initialAmount: '10000',
    annualContribution: '5000',
    cagr: '8',
    timeHorizon: '20'
  });

  const investmentData = useMemo(() => {
    const data: InvestmentData[] = [];
    let investingValue = inputs.initialAmount;
    let notInvestingValue = inputs.initialAmount;
    let totalContributions = inputs.initialAmount;

    // Year 0
    data.push({
      year: 0,
      investingValue: investingValue,
      notInvestingValue: notInvestingValue,
      totalContributions: totalContributions,
      investmentGains: 0
    });

    for (let year = 1; year <= inputs.timeHorizon; year++) {
      // Add annual contribution
      investingValue += inputs.annualContribution;
      notInvestingValue += inputs.annualContribution;
      totalContributions += inputs.annualContribution;

      // Apply growth to investing scenario
      investingValue *= (1 + inputs.cagr / 100);

      const investmentGains = investingValue - totalContributions;

      data.push({
        year,
        investingValue,
        notInvestingValue,
        totalContributions,
        investmentGains
      });
    }

    return data;
  }, [inputs]);

  const finalData = investmentData[investmentData.length - 1];
  const totalGains = finalData?.investmentGains || 0;
  const finalInvestingValue = finalData?.investingValue || 0;
  const finalNotInvestingValue = finalData?.notInvestingValue || 0;

  const handleInputChange = (field: keyof CalculatorInputs, value: string) => {
    // Update the display string
    setInputStrings(prev => ({
      ...prev,
      [field]: value
    }));

    // Update the numeric value for calculations (default to 0 if empty or invalid)
    const numValue = value === '' ? 0 : (parseFloat(value) || 0);
    setInputs(prev => ({
      ...prev,
      [field]: numValue
    }));
  };

  const handleInputWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    // Prevent scrolling from changing the input value
    e.currentTarget.blur();
  };

  return (
    <Layout
      title="Investment Growth Calculator"
      description="Visualize the power of compound investing with interactive charts and tables"
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Investment Growth Calculator</h1>
          <p className={styles.subtitle}>
            See how your investments can grow over time with the power of compound returns.
            Compare the difference between investing and keeping money uninvested.
          </p>
        </header>

        <div className={styles.content}>
          {/* Input Controls */}
          <div className={styles.inputSection}>
            <h2>Investment Parameters</h2>
            <div className={styles.inputGrid}>
              <div className={styles.inputGroup}>
                <label>Initial Investment</label>
                <div className={styles.inputWrapper}>
                  <span className={styles.prefix}>$</span>
                  <input
                    type="number"
                    step="1000"
                    value={inputStrings.initialAmount}
                    onChange={(e) => handleInputChange('initialAmount', e.target.value)}
                    onWheel={handleInputWheel}
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>Annual Contribution</label>
                <div className={styles.inputWrapper}>
                  <span className={styles.prefix}>$</span>
                  <input
                    type="number"
                    step="1000"
                    value={inputStrings.annualContribution}
                    onChange={(e) => handleInputChange('annualContribution', e.target.value)}
                    onWheel={handleInputWheel}
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>Expected Annual Return (CAGR)</label>
                <div className={styles.inputWrapper}>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="50"
                    value={inputStrings.cagr}
                    onChange={(e) => handleInputChange('cagr', e.target.value)}
                    onWheel={handleInputWheel}
                    className={styles.input}
                  />
                  <span className={styles.suffix}>%</span>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>Time Horizon</label>
                <div className={styles.inputWrapper}>
                  <input
                    type="number"
                    step="1"
                    min="1"
                    max="50"
                    value={inputStrings.timeHorizon}
                    onChange={(e) => handleInputChange('timeHorizon', e.target.value)}
                    onWheel={handleInputWheel}
                    className={styles.input}
                  />
                  <span className={styles.suffix}>years</span>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className={styles.summarySection}>
            <div className={styles.summaryCard}>
              <h3>With Investing</h3>
              <div className={styles.summaryValue}>
                ${finalInvestingValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
              <div className={styles.summaryLabel}>Final Value</div>
            </div>

            <div className={styles.summaryCard}>
              <h3>Without Investing</h3>
              <div className={styles.summaryValue}>
                ${finalNotInvestingValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
              <div className={styles.summaryLabel}>Final Value</div>
            </div>

            <div className={styles.summaryCard}>
              <h3>Investment Gains</h3>
              <div className={styles.summaryValue}>
                ${totalGains.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
              <div className={styles.summaryLabel}>Extra Money Earned</div>
            </div>
          </div>

          {/* Chart */}
          <div className={styles.chartSection}>
            <h2>Growth Visualization</h2>
            <div className={styles.chartContainer}>
              <ResponsiveContainer width="100%" height={600}>
                <LineChart
                  data={investmentData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="year" 
                    stroke="#6b7280"
                    fontSize={12}
                    tickFormatter={(value) => `Year ${value}`}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    fontSize={12}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#f9fafb',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                    formatter={(value: number, name: string) => [
                      `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
                      name === 'investingValue' ? 'With Investing' :
                      name === 'notInvestingValue' ? 'Without Investing' :
                      name
                    ]}
                    labelFormatter={(label) => `Year ${label}`}
                  />
                  <Legend 
                    wrapperStyle={{ paddingTop: '20px' }}
                    formatter={(value) => 
                      value === 'investingValue' ? 'With Investing' :
                      value === 'notInvestingValue' ? 'Without Investing' :
                      value
                    }
                  />
                  <Line
                    type="monotone"
                    dataKey="investingValue"
                    stroke="#22c55e"
                    strokeWidth={3}
                    dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#22c55e', strokeWidth: 2 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="notInvestingValue"
                    stroke="#ef4444"
                    strokeWidth={3}
                    dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#ef4444', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Detailed Table */}
          <div className={styles.tableSection}>
            <h2>Year-by-Year Breakdown</h2>
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>With Investing</th>
                    <th>Without Investing</th>
                    <th>Investment Gains</th>
                  </tr>
                </thead>
                <tbody>
                  {investmentData.map((data) => (
                    <tr key={data.year}>
                      <td>{data.year}</td>
                      <td className={styles.positive}>
                        ${data.investingValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </td>
                      <td>
                        ${data.notInvestingValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </td>
                      <td className={styles.gains}>
                        ${data.investmentGains.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Educational Note */}
          <div className={styles.educationalNote}>
            <h3>Understanding the Results</h3>
            <ul>
              <li><strong>With Investing:</strong> Your money grows through compound returns at the specified CAGR</li>
              <li><strong>Without Investing:</strong> Your money remains the same (no growth, just accumulation)</li>
              <li><strong>Investment Gains:</strong> The extra money earned purely from investment growth</li>
              <li><strong>Time Horizon:</strong> Longer periods dramatically increase the benefit of compound growth</li>
            </ul>
            <p>
              <em>Note: This calculator assumes consistent annual returns, but real investments experience volatility. 
              Past performance doesn't guarantee future results. Consider this as an educational tool to understand 
              the potential power of long-term investing.</em>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
