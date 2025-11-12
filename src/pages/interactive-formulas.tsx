import React, { useState } from 'react';
import Layout from '@theme/Layout';
import styles from './interactive-formulas.module.css';
import katex from 'katex';

// KaTeX component for rendering mathematical formulas
interface KaTeXProps {
  formula: string;
  displayMode?: boolean;
}

const KaTeX: React.FC<KaTeXProps> = ({ formula, displayMode = false }) => {
  const html = katex.renderToString(formula, {
    displayMode,
    throwOnError: false,
    trust: true,
  });

  return <span dangerouslySetInnerHTML={{ __html: html }} />;
};

interface FormulaCalculatorProps {
  title: string;
  description: string;
  formula: string;
  inputs: Array<{
    label: string;
    key: string;
    placeholder: string;
    suffix?: string;
  }>;
  calculate: (inputs: Record<string, number>) => number | string;
  resultLabel: string;
  resultSuffix?: string;
  interpretation?: (result: number) => string;
}

const FormulaCalculator: React.FC<FormulaCalculatorProps> = ({
  title,
  description,
  formula,
  inputs,
  calculate,
  resultLabel,
  resultSuffix = '',
  interpretation
}) => {
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [result, setResult] = useState<number | string | null>(null);

  // Determine color class based on interpretation and title
  const getInterpretationColorClass = (interpretationText: string, title: string): string => {
    if (typeof interpretationText !== 'string') return 'interpretationNeutral';
    
    const text = interpretationText.toLowerCase();
    
    // Specific neutral cases
    if (text.includes('compare this') || text.includes('intrinsic value') || text.includes('invalid:')) {
      return 'interpretationNeutral';
    }
    
    // Good indicators (green)
    if (text.includes('excellent') || text.includes('good') || text.includes('undervalued') || 
        text.includes('bargain') || text.includes('strong') || text.includes('adequate margin') ||
        text.includes('very large margin') || text.includes('reasonable') || text.includes('fairly valued')) {
      return 'interpretationGood';
    }
    
    // Danger indicators (red)
    if (text.includes('poor') || text.includes('avoid') || text.includes('risky') || 
        text.includes('very expensive') || text.includes('overvalued') || text.includes('inefficient') ||
        text.includes('liquidity problems') || text.includes('dangerously') || text.includes('negative')) {
      return 'interpretationDanger';
    }
    
    // Caution indicators (yellow)
    if (text.includes('average') || text.includes('moderate') || text.includes('expensive') || 
        text.includes('caution') || text.includes('acceptable') || text.includes('minimal') ||
        text.includes('higher debt') || text.includes('some protection')) {
      return 'interpretationCaution';
    }
    
    return 'interpretationNeutral';
  };

  const handleInputChange = (key: string, value: string) => {
    const newInputValues = { ...inputValues, [key]: value };
    setInputValues(newInputValues);

    // Calculate result if all inputs are provided
    const numericInputs: Record<string, number> = {};
    let allInputsValid = true;

    for (const input of inputs) {
      const val = parseFloat(newInputValues[input.key] || '');
      if (isNaN(val)) {
        allInputsValid = false;
        break;
      }
      numericInputs[input.key] = val;
    }

    if (allInputsValid) {
      setResult(calculate(numericInputs));
    } else {
      setResult(null);
    }
  };

  return (
    <div className={styles.formulaCard}>
      <h3>{title}</h3>
      <p className={styles.description}>{description}</p>
      
      <div className={styles.formula}>
        <strong>Formula:</strong> <KaTeX formula={formula} />
      </div>

      <div className={styles.inputs}>
        {inputs.map((input) => (
          <div key={input.key} className={styles.inputGroup}>
            <label>{input.label}:</label>
            <div className={styles.inputWrapper}>
              {input.suffix === '$' && <span className={styles.prefix}>{input.suffix}</span>}
              <input
                type="number"
                step="any"
                placeholder={input.placeholder}
                value={inputValues[input.key] || ''}
                onChange={(e) => handleInputChange(input.key, e.target.value)}
                className={input.suffix === '$' ? styles.inputWithPrefix : ''}
              />
              {input.suffix && input.suffix !== '$' && <span className={styles.suffix}>{input.suffix}</span>}
            </div>
          </div>
        ))}
      </div>

      {result !== null && (
        <>
          {interpretation && typeof result === 'number' ? (
            <div className={styles[getInterpretationColorClass(interpretation(result), title)]}>
              <strong>{resultLabel}: {resultSuffix === '$' ? `$${result.toFixed(2)}` : `${result.toFixed(2)}${resultSuffix}`}</strong>
              <div className={styles.interpretation}>
                <em>{interpretation(result)}</em>
              </div>
            </div>
          ) : (
            <div className={styles.result}>
              <strong>{resultLabel}: {typeof result === 'number' ? (resultSuffix === '$' ? `$${result.toFixed(2)}` : `${result.toFixed(2)}${resultSuffix}`) : `${result}${resultSuffix}`}</strong>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default function InteractiveFormulas(): React.ReactElement {
  const formulas: FormulaCalculatorProps[] = [
    {
      title: "Return on Equity (ROE)",
      description: "Warren Buffett's favorite metric for measuring management effectiveness. Shows how well a company uses shareholder money to generate profits. Buffett looks for companies with ROE consistently above 15%.",
      formula: "ROE = \\frac{\\text{Net Income}}{\\text{Shareholders' Equity}} \\times 100\\%",
      inputs: [
        { label: "Net Income", key: "netIncome", placeholder: "50000000", suffix: "$" },
        { label: "Shareholders' Equity", key: "equity", placeholder: "250000000", suffix: "$" }
      ],
      calculate: (inputs) => (inputs.netIncome / inputs.equity) * 100,
      resultLabel: "ROE",
      resultSuffix: "%",
      interpretation: (result) => {
        if (result >= 20) return "Excellent - Warren Buffett quality";
        if (result >= 15) return "Good - Meets Buffett's minimum standard";
        if (result >= 10) return "Average - Below Buffett's preference";
        return "Poor - Avoid according to Buffett's criteria";
      }
    },
    {
      title: "Debt-to-Equity Ratio",
      description: "Buffett prefers companies with low debt levels as they're less risky and have more financial flexibility. He typically avoids companies with high debt-to-equity ratios.",
      formula: "\\text{Debt-to-Equity} = \\frac{\\text{Total Debt}}{\\text{Shareholders' Equity}}",
      inputs: [
        { label: "Total Debt", key: "debt", placeholder: "100000000", suffix: "$" },
        { label: "Shareholders' Equity", key: "equity", placeholder: "400000000", suffix: "$" }
      ],
      calculate: (inputs) => inputs.debt / inputs.equity,
      resultLabel: "Debt-to-Equity Ratio",
      interpretation: (result) => {
        if (result <= 0.3) return "Excellent - Very conservative debt level";
        if (result <= 0.5) return "Good - Reasonable debt level";
        if (result <= 1.0) return "Moderate - Higher debt but manageable";
        return "High - Potentially risky debt level";
      }
    },
    {
      title: "Price-to-Earnings (P/E) Ratio",
      description: "Shows how much investors pay for each dollar of earnings. Buffett uses this to assess if a stock is reasonably priced relative to its earnings power.",
      formula: "\\text{P/E} = \\frac{\\text{Stock Price}}{\\text{Earnings per Share}}",
      inputs: [
        { label: "Stock Price", key: "price", placeholder: "50", suffix: "$" },
        { label: "Earnings per Share", key: "eps", placeholder: "2.50", suffix: "$" }
      ],
      calculate: (inputs) => inputs.price / inputs.eps,
      resultLabel: "P/E Ratio",
      resultSuffix: "×",
      interpretation: (result) => {
        if (result <= 15) return "Potentially undervalued - Good value opportunity";
        if (result <= 25) return "Fairly valued - Reasonable for quality companies";
        if (result <= 35) return "Expensive - Only justified by high growth";
        return "Very expensive - Proceed with caution";
      }
    },
    {
      title: "Price-to-Book (P/B) Ratio",
      description: "Compares stock price to book value per share. Buffett uses this especially for asset-heavy businesses like banks and insurance companies to assess value.",
      formula: "\\text{P/B} = \\frac{\\text{Stock Price}}{\\text{Book Value per Share}}",
      inputs: [
        { label: "Stock Price", key: "price", placeholder: "50", suffix: "$" },
        { label: "Book Value per Share", key: "bookValue", placeholder: "25", suffix: "$" }
      ],
      calculate: (inputs) => inputs.price / inputs.bookValue,
      resultLabel: "P/B Ratio",
      resultSuffix: "×",
      interpretation: (result) => {
        if (result <= 1.0) return "Trading below book value - Potential bargain";
        if (result <= 2.0) return "Reasonable - Justified if ROE is high";
        if (result <= 3.0) return "Expensive - Requires very high ROE";
        return "Very expensive - Only for exceptional businesses";
      }
    },
    {
      title: "Current Ratio",
      description: "Measures a company's ability to pay short-term debts. Buffett likes companies with strong liquidity that can weather financial storms without external financing.",
      formula: "\\text{Current Ratio} = \\frac{\\text{Current Assets}}{\\text{Current Liabilities}}",
      inputs: [
        { label: "Current Assets", key: "currentAssets", placeholder: "150000000", suffix: "$" },
        { label: "Current Liabilities", key: "currentLiabilities", placeholder: "75000000", suffix: "$" }
      ],
      calculate: (inputs) => inputs.currentAssets / inputs.currentLiabilities,
      resultLabel: "Current Ratio",
      resultSuffix: "×",
      interpretation: (result) => {
        if (result >= 2.0) return "Excellent - Very strong liquidity position";
        if (result >= 1.5) return "Good - Adequate liquidity";
        if (result >= 1.0) return "Acceptable - Can meet obligations";
        return "Poor - Potential liquidity problems";
      }
    },
    {
      title: "Benjamin Graham's Growth Formula",
      description: "Graham's complete formula for calculating intrinsic value based on current earnings, expected growth, and interest rates. The formula adjusts for current market conditions through the interest rate component (Y), typically using AAA corporate bond yields.",
      formula: "\\text{Intrinsic Value} = \\text{EPS} \\times (8.5 + 2g) \\times \\frac{4.4}{Y}",
      inputs: [
        { label: "Earnings per Share", key: "eps", placeholder: "3.00", suffix: "$" },
        { label: "Expected Growth Rate", key: "growth", placeholder: "12", suffix: "%" },
        { label: "Current Interest Rate (AAA Bond Yield)", key: "interestRate", placeholder: "4.4", suffix: "%" }
      ],
      calculate: (inputs) => inputs.eps * (8.5 + 2 * inputs.growth) * (4.4 / inputs.interestRate),
      resultLabel: "Intrinsic Value",
      resultSuffix: "$",
      interpretation: (result) => {
        return "Compare this intrinsic value to the current stock price to assess if the stock is undervalued. Lower interest rates increase intrinsic value, higher rates decrease it.";
      }
    },
    {
      title: "Benjamin Graham Growth Projection",
      description: "Reverse-engineers the expected growth rate implied by a stock's current P/E ratio using Graham's formula. This helps determine what growth rate the market is pricing into the stock at current interest rates.",
      formula: "g = \\frac{\\text{P/E} \\times \\frac{Y}{4.4} - 8.5}{2}",
      inputs: [
        { label: "P/E Ratio", key: "peRatio", placeholder: "15", suffix: "×" },
        { label: "Current Interest Rate (AAA Bond Yield)", key: "interestRate", placeholder: "4.4", suffix: "%" }
      ],
      calculate: (inputs) => {
        if (inputs.peRatio <= 0 || inputs.interestRate <= 0) {
          return "Invalid: P/E ratio and interest rate must be positive";
        }
        return ((inputs.peRatio * (inputs.interestRate / 4.4) - 8.5) / 2);
      },
      resultLabel: "Expected Growth Rate",
      resultSuffix: "%",
      interpretation: (result) => {
        if (typeof result === 'number') {
          if (result < 0) return "Negative growth implied - Stock may be overvalued or market expects declining earnings";
          if (result <= 5) return "Low growth expected - Suitable for mature, stable companies";
          if (result <= 10) return "Moderate growth expected - Typical for established companies";
          if (result <= 15) return "Good growth expected - Above-average growth priced in";
          if (result <= 20) return "High growth expected - Premium valuation for strong growers";
          return "Very high growth expected - Market pricing in exceptional growth, verify if sustainable";
        }
        return "";
      }
    },
    {
      title: "Dividend Discount Model (DDM)",
      description: "Values a stock based on future dividend payments. Buffett often uses this for dividend-paying stocks, especially when evaluating income-generating investments.",
      formula: "\\text{Intrinsic Value} = \\frac{\\text{Next Year's Dividend}}{\\text{Required Return} - \\text{Growth Rate}}",
      inputs: [
        { label: "Next Year's Dividend", key: "dividend", placeholder: "2.10", suffix: "$" },
        { label: "Required Return", key: "requiredReturn", placeholder: "10", suffix: "%" },
        { label: "Dividend Growth Rate", key: "growthRate", placeholder: "5", suffix: "%" }
      ],
      calculate: (inputs) => {
        const r = inputs.requiredReturn / 100;
        const g = inputs.growthRate / 100;
        if (r <= g) return "Invalid: Required return must be greater than growth rate";
        return inputs.dividend / (r - g);
      },
      resultLabel: "Intrinsic Value",
      resultSuffix: "$",
      interpretation: (result) => {
        if (typeof result === 'number') {
          return "Compare this value to current stock price. Buy if trading below this value with margin of safety.";
        }
        return "";
      }
    },
    {
      title: "Free Cash Flow Yield",
      description: "Shows how much free cash flow you get per dollar invested. Buffett prefers companies that generate substantial free cash flow relative to their market value.",
      formula: "\\text{FCF Yield} = \\frac{\\text{Free Cash Flow}}{\\text{Market Capitalization}} \\times 100\\%",
      inputs: [
        { label: "Free Cash Flow", key: "fcf", placeholder: "500000000", suffix: "$" },
        { label: "Market Capitalization", key: "marketCap", placeholder: "5000000000", suffix: "$" }
      ],
      calculate: (inputs) => (inputs.fcf / inputs.marketCap) * 100,
      resultLabel: "Free Cash Flow Yield",
      resultSuffix: "%",
      interpretation: (result) => {
        if (result >= 10) return "Excellent - High cash generation relative to value";
        if (result >= 6) return "Good - Solid cash flow yield";
        if (result >= 3) return "Average - Moderate cash generation";
        return "Low - Limited cash flow relative to valuation";
      }
    },
    {
      title: "Return on Invested Capital (ROIC)",
      description: "Measures how efficiently a company uses all invested capital to generate profits. Buffett looks for companies with consistently high ROIC as a sign of competitive advantages.",
      formula: "ROIC = \\frac{\\text{Net Operating Profit After Tax}}{\\text{Invested Capital}} \\times 100\\%",
      inputs: [
        { label: "Net Operating Profit After Tax", key: "nopat", placeholder: "75000000", suffix: "$" },
        { label: "Invested Capital", key: "investedCapital", placeholder: "500000000", suffix: "$" }
      ],
      calculate: (inputs) => (inputs.nopat / inputs.investedCapital) * 100,
      resultLabel: "ROIC",
      resultSuffix: "%",
      interpretation: (result) => {
        if (result >= 20) return "Excellent - Strong competitive advantages likely";
        if (result >= 15) return "Good - Above-average capital efficiency";
        if (result >= 10) return "Average - Adequate returns on capital";
        return "Poor - Inefficient use of capital";
      }
    },
    {
      title: "Margin of Safety",
      description: "The difference between intrinsic value and market price. Buffett's key risk management tool - he only buys when he can get a significant discount to intrinsic value.",
      formula: "\\text{Margin of Safety} = \\frac{\\text{Intrinsic Value} - \\text{Market Price}}{\\text{Intrinsic Value}} \\times 100\\%",
      inputs: [
        { label: "Intrinsic Value", key: "intrinsicValue", placeholder: "60", suffix: "$" },
        { label: "Current Market Price", key: "marketPrice", placeholder: "45", suffix: "$" }
      ],
      calculate: (inputs) => ((inputs.intrinsicValue - inputs.marketPrice) / inputs.intrinsicValue) * 100,
      resultLabel: "Margin of Safety",
      resultSuffix: "%",
      interpretation: (result) => {
        if (result >= 50) return "Excellent - Very large margin of safety";
        if (result >= 33) return "Good - Adequate margin of safety (Graham's minimum)";
        if (result >= 20) return "Moderate - Some protection against errors";
        if (result >= 0) return "Minimal - Little protection against valuation errors";
        return "Negative - Stock is overvalued relative to intrinsic value";
      }
    },
    {
      title: "Discounted Cash Flow (DCF) Model",
      description: "The gold standard for valuation used by professional investors and Buffett himself. Projects future free cash flows and discounts them to present value using the company's cost of capital (WACC).",
      formula: "\\text{DCF Value} = \\sum_{t=1}^{n} \\frac{FCF_t}{(1+r)^t} + \\frac{TV_n}{(1+r)^n} \\text{ where } TV = \\frac{FCF_{n+1}}{r-g}",
      inputs: [
        { label: "Current Free Cash Flow", key: "currentFCF", placeholder: "1000000000", suffix: "$" },
        { label: "Growth Rate (Years 1-5)", key: "growthRate", placeholder: "8", suffix: "%" },
        { label: "Terminal Growth Rate", key: "terminalGrowth", placeholder: "3", suffix: "%" },
        { label: "Discount Rate (WACC)", key: "discountRate", placeholder: "10", suffix: "%" },
        { label: "Number of Shares", key: "sharesOutstanding", placeholder: "100000000", suffix: "" }
      ],
      calculate: (inputs) => {
        const fcf = inputs.currentFCF;
        const g = inputs.growthRate / 100;
        const tg = inputs.terminalGrowth / 100;
        const r = inputs.discountRate / 100;
        const shares = inputs.sharesOutstanding;
        
        if (r <= tg) return "Invalid: Discount rate must be greater than terminal growth rate";
        if (r <= 0 || g < 0) return "Invalid: Rates must be positive, growth can be zero";
        
        let presentValue = 0;
        let projectedFCF = fcf;
        
        // Calculate present value of projected cash flows (5 years)
        for (let year = 1; year <= 5; year++) {
          projectedFCF = projectedFCF * (1 + g);
          presentValue += projectedFCF / Math.pow(1 + r, year);
        }
        
        // Calculate terminal value
        const terminalFCF = projectedFCF * (1 + tg);
        const terminalValue = terminalFCF / (r - tg);
        const presentTerminalValue = terminalValue / Math.pow(1 + r, 5);
        
        // Total enterprise value
        const totalValue = presentValue + presentTerminalValue;
        
        // Value per share
        return totalValue / shares;
      },
      resultLabel: "Intrinsic Value per Share",
      resultSuffix: "$",
      interpretation: (result) => {
        if (typeof result === 'number') {
          return "This is the calculated intrinsic value per share. Compare to current stock price - buy if trading significantly below this value. DCF is highly sensitive to growth and discount rate assumptions.";
        }
        return "";
      }
    },
    {
      title: "Compound Annual Growth Rate (CAGR)",
      description: "Calculates the mean annual growth rate of an investment over a specified time period. CAGR smooths out volatility to show the rate at which an investment would have grown if it had grown steadily every year.",
      formula: "CAGR = \\left(\\frac{\\text{Ending Value}}{\\text{Beginning Value}}\\right)^{\\frac{1}{\\text{Number of Years}}} - 1",
      inputs: [
        { label: "Beginning Value", key: "beginningValue", placeholder: "10000", suffix: "$" },
        { label: "Ending Value", key: "endingValue", placeholder: "25000", suffix: "$" },
        { label: "Number of Years", key: "years", placeholder: "5", suffix: "" }
      ],
      calculate: (inputs) => {
        if (inputs.beginningValue <= 0 || inputs.endingValue <= 0 || inputs.years <= 0) {
          return "Invalid: All values must be positive";
        }
        return (Math.pow(inputs.endingValue / inputs.beginningValue, 1 / inputs.years) - 1) * 100;
      },
      resultLabel: "CAGR",
      resultSuffix: "%",
      interpretation: (result) => {
        if (typeof result === 'number') {
          if (result >= 15) return "Excellent - Outstanding long-term growth rate";
          if (result >= 10) return "Good - Strong long-term performance, beats most indices";
          if (result >= 7) return "Average - Matches typical stock market returns";
          if (result >= 3) return "Moderate - Beats inflation but limited real growth";
          if (result >= 0) return "Poor - Minimal growth over the period";
          return "Negative - Investment lost value over the period";
        }
        return "";
      }
    },
    {
      title: "Future Value Calculator (Using CAGR)",
      description: "Projects how much your investment will be worth in the future based on a compound annual growth rate. This helps you understand the power of compound growth over time.",
      formula: "\\text{Future Value} = \\text{Present Value} \\times (1 + CAGR)^{\\text{Number of Years}}",
      inputs: [
        { label: "Present Value", key: "presentValue", placeholder: "10000", suffix: "$" },
        { label: "Expected CAGR", key: "cagr", placeholder: "10", suffix: "%" },
        { label: "Number of Years", key: "years", placeholder: "10", suffix: "" }
      ],
      calculate: (inputs) => {
        if (inputs.presentValue <= 0 || inputs.years <= 0) {
          return "Invalid: Present value and years must be positive";
        }
        if (inputs.cagr <= -100) {
          return "Invalid: CAGR cannot be -100% or lower";
        }
        const growthMultiplier = 1 + (inputs.cagr / 100);
        return inputs.presentValue * Math.pow(growthMultiplier, inputs.years);
      },
      resultLabel: "Future Value",
      resultSuffix: "$",
      interpretation: (result) => {
        if (typeof result === 'number') {
          return `Your investment could grow significantly over time. Remember that higher growth rates are harder to sustain long-term, and actual results may vary due to market volatility.`;
        }
        return "";
      }
    }
  ];

  return (
    <Layout
      title="Interactive Investment Formulas"
      description="Interactive calculators for the most important investment formulas used by Warren Buffett and value investors"
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Interactive Investment Formulas</h1>
          <p className={styles.subtitle}>
            Master the key formulas that Warren Buffett and value investors use to analyze companies. 
            Enter your numbers and see instant calculations with interpretations.
          </p>
        </header>

        <div className={styles.formulaGrid}>
          {formulas.map((formula, index) => (
            <FormulaCalculator key={index} {...formula} />
          ))}
        </div>

        <div className={styles.disclaimer}>
          <h3>Important Disclaimer</h3>
          <p>
            These calculators are for educational purposes only and should not be considered as investment advice. 
            All investment decisions should be based on thorough research and consideration of your individual 
            financial situation. Past performance does not guarantee future results, and all investments carry risk 
            of loss. Consider consulting with a qualified financial advisor before making investment decisions.
          </p>
        </div>
      </div>
    </Layout>
  );
}
