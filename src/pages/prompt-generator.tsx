import React, { useState } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './prompt-generator.module.css';

interface CompanyData {
  companyName: string;
  country: string;
  industry: string;
  currentStockPrice: string;
  aaaBondRate: string;
  // Financial Strength Metrics
  currentRatio: string;
  quickRatio: string;
  debtToEquity: string;
  interestCoverage: string;
  // Profitability Metrics
  roe: string;
  roa: string;
  roic: string;
  grossMargin: string;
  operatingMargin: string;
  netMargin: string;
  // Growth Metrics
  revenueGrowth5yr: string;
  epsGrowth5yr: string;
  // Valuation Metrics
  peRatio: string;
  pbRatio: string;
  psRatio: string;
  pfcfRatio: string;
  pegRatio: string;
  evEbitda: string;
  // Cash Flow Metrics
  freeCashFlowMargin: string;
  operatingCashFlow: string;
  // Additional Quality Metrics
  dividendYield: string;
  payoutRatio: string;
  bookValuePerShare: string;
  tangibleBookValue: string;
}

const initialData: CompanyData = {
  companyName: '',
  country: '',
  industry: '',
  currentStockPrice: '',
  aaaBondRate: '',
  currentRatio: '',
  quickRatio: '',
  debtToEquity: '',
  interestCoverage: '',
  roe: '',
  roa: '',
  roic: '',
  grossMargin: '',
  operatingMargin: '',
  netMargin: '',
  revenueGrowth5yr: '',
  epsGrowth5yr: '',
  peRatio: '',
  pbRatio: '',
  psRatio: '',
  pfcfRatio: '',
  pegRatio: '',
  evEbitda: '',
  freeCashFlowMargin: '',
  operatingCashFlow: '',
  dividendYield: '',
  payoutRatio: '',
  bookValuePerShare: '',
  tangibleBookValue: ''
};

export default function PromptGenerator(): React.JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const [formData, setFormData] = useState<CompanyData>(initialData);
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('form');

  const handleInputChange = (field: keyof CompanyData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generatePrompt = () => {
    const prompt = `I want to analyze ${formData.companyName} (${formData.country}) as a potential long-term investment opportunity. Please provide a comprehensive analysis from the perspectives of legendary investors like Warren Buffett, Benjamin Graham, Peter Lynch, Philip Fisher, and Charlie Munger.

## Company Information
- **Company**: ${formData.companyName}
- **Country**: ${formData.country}
- **Industry**: ${formData.industry || 'Not specified'}
- **Current Stock Price**: ${formData.currentStockPrice ? `$${formData.currentStockPrice}` : 'Not provided'}
- **AAA Government Bond Rate (Risk-free Rate)**: ${formData.aaaBondRate ? `${formData.aaaBondRate}%` : 'Not provided'}

## Key Financial Metrics Provided
### Financial Strength & Liquidity
- Current Ratio: ${formData.currentRatio || 'Not provided'}
- Quick Ratio: ${formData.quickRatio || 'Not provided'}
- Debt-to-Equity: ${formData.debtToEquity || 'Not provided'}
- Interest Coverage Ratio: ${formData.interestCoverage || 'Not provided'}

### Profitability & Returns
- Return on Equity (ROE): ${formData.roe || 'Not provided'}%
- Return on Assets (ROA): ${formData.roa || 'Not provided'}%
- Return on Invested Capital (ROIC): ${formData.roic || 'Not provided'}%
- Gross Profit Margin: ${formData.grossMargin || 'Not provided'}%
- Operating Margin: ${formData.operatingMargin || 'Not provided'}%
- Net Profit Margin: ${formData.netMargin || 'Not provided'}%

### Growth Metrics
- 5-Year Revenue CAGR: ${formData.revenueGrowth5yr || 'Not provided'}%
- 5-Year EPS CAGR: ${formData.epsGrowth5yr || 'Not provided'}%

### Valuation Ratios
- Price-to-Earnings (P/E): ${formData.peRatio || 'Not provided'}
- Price-to-Book (P/B): ${formData.pbRatio || 'Not provided'}
- Price-to-Sales (P/S): ${formData.psRatio || 'Not provided'}
- Price-to-Free Cash Flow (P/FCF): ${formData.pfcfRatio || 'Not provided'}
- PEG Ratio: ${formData.pegRatio || 'Not provided'}
- EV/EBITDA: ${formData.evEbitda || 'Not provided'}

### Cash Flow & Dividend Metrics
- Free Cash Flow Margin: ${formData.freeCashFlowMargin || 'Not provided'}%
- Operating Cash Flow: ${formData.operatingCashFlow || 'Not provided'}
- Dividend Yield: ${formData.dividendYield || 'Not provided'}%
- Dividend Payout Ratio: ${formData.payoutRatio || 'Not provided'}%

### Asset Quality
- Book Value per Share: ${formData.bookValuePerShare || 'Not provided'}
- Tangible Book Value: ${formData.tangibleBookValue || 'Not provided'}

## Analysis Framework
Please analyze this company through the lens of these legendary investors and provide insights on:

### 1. Warren Buffett's Perspective
- **Business Quality**: Does this company have a sustainable competitive advantage (economic moat)?
- **Management Quality**: How would Buffett assess management's capital allocation and shareholder orientation?
- **Predictability**: Is this business predictable with consistent earnings power?
- **Intrinsic Value**: Based on the metrics, what might Buffett consider as a fair intrinsic value range?
- **Long-term Prospects**: Can this company compound wealth over 10-20 years?

### 2. Benjamin Graham's Analysis
- **Margin of Safety**: Based on the P/E, P/B ratios and asset values, is there adequate margin of safety?
- **Financial Strength**: Using Graham's criteria (current ratio, debt levels, earnings stability), how financially strong is this company?
- **Net Current Asset Value**: If applicable, analyze the company's liquidation value and asset backing
- **Earnings Stability**: Has the company shown consistent profitability over business cycles?
- **Graham Number**: Calculate if this meets Graham's quantitative criteria for value investing

### 3. Peter Lynch's Growth Assessment
- **Growth at Reasonable Price (GARP)**: Is the PEG ratio attractive for the growth being delivered?
- **Industry Position**: What's the company's competitive position in its industry?
- **Earnings Growth Quality**: Is the earnings growth sustainable and driven by business fundamentals?
- **Story and Catalysts**: What's the investment thesis and potential catalysts for future growth?

### 4. Philip Fisher's Growth Analysis
- **Sales Growth Potential**: Does this company have products or services that can drive significant sales growth for years to come?
- **R&D Effectiveness**: Is the company investing in research and development that will lead to profitable new products or improved processes?
- **Management Excellence**: Does management show determination to develop new products, maintain profit margins, and act in shareholders' best interests?
- **Competitive Position**: Does the company have superior sales organization, cost controls, and industry-specific advantages?
- **Long-term Outlook**: What is the long-term profit outlook, and does management communicate honestly with investors?

### 5. Charlie Munger's Qualitative Analysis
- **Business Model**: How does this business make money and is it a good business?
- **Competitive Advantages**: What moats protect this business from competition?
- **Industry Dynamics**: Is this an attractive industry with rational competitive behavior?
- **Management Rationality**: Based on available information, how would Munger assess management quality?

### 6. Red Flags and Risk Assessment
Please identify any potential red flags based on the provided metrics:
- Financial leverage concerns
- Declining profitability trends
- Valuation concerns
- Industry-specific risks
- Any metrics that are concerning relative to industry benchmarks

### 7. Investment Recommendation
Based on the analysis above, please provide:
- **Overall Assessment**: Buy, Hold, or Avoid recommendation with reasoning
- **Fair Value Estimate**: Rough intrinsic value range using multiple methods
- **Key Risks**: Major risks that could impair the investment thesis
- **Monitoring Metrics**: Key metrics to watch for changes in investment thesis
- **Position Sizing**: Appropriate portfolio weight given risk/reward profile

### 8. Legendary Investor Quotes Application
Please conclude with relevant quotes from these investors that apply to this specific analysis, explaining how their wisdom relates to this investment opportunity.

Please be thorough in your analysis and explain your reasoning for each assessment. If any critical information is missing for a complete analysis, please specify what additional data would be helpful for a more definitive recommendation.`;

    setGeneratedPrompt(prompt);
    setActiveTab('prompt');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      alert('Prompt copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
      alert('Failed to copy to clipboard. Please select and copy manually.');
    }
  };

  const clearForm = () => {
    setFormData(initialData);
    setGeneratedPrompt('');
    setActiveTab('form');
  };

  return (
    <Layout
      title="Investment Analysis Prompt Generator"
      description="Generate comprehensive prompts for analyzing companies using legendary investor frameworks">
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>📊 Investment Analysis Prompt Generator</h1>
          <p className={styles.description}>
            Generate comprehensive analysis prompts that apply the investment philosophies of legendary investors 
            like Warren Buffett, Benjamin Graham, Peter Lynch, Philip Fisher, and Charlie Munger to evaluate any company.
          </p>
        </div>

        <div className={styles.tabs}>
          <button 
            className={`${styles.tab} ${activeTab === 'form' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('form')}
          >
            📝 Company Data
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'prompt' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('prompt')}
          >
            🚀 Generated Prompt
          </button>
        </div>

        {activeTab === 'form' && (
          <div className={styles.formContainer}>
            <div className={styles.section}>
              <h3>🏢 Basic Information</h3>
              <div className={styles.inputGroup}>
                <label>Company Name *</label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  placeholder="e.g., Apple Inc., Microsoft Corporation"
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Country *</label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  placeholder="e.g., United States, Singapore, Germany"
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Industry</label>
                <input
                  type="text"
                  value={formData.industry}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                  placeholder="e.g., Technology, Healthcare, Consumer Staples"
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Current Stock Price ($)</label>
                <input
                  type="text"
                  value={formData.currentStockPrice}
                  onChange={(e) => handleInputChange('currentStockPrice', e.target.value)}
                  placeholder="e.g., 175.50"
                />
                <small>Current market price per share</small>
              </div>
              <div className={styles.inputGroup}>
                <label>AAA Government Bond Rate (%)</label>
                <input
                  type="text"
                  value={formData.aaaBondRate}
                  onChange={(e) => handleInputChange('aaaBondRate', e.target.value)}
                  placeholder="e.g., 4.25"
                />
                <small>Current AAA-rated government bond yield (risk-free rate)</small>
              </div>
            </div>

            <div className={styles.section}>
              <h3>💪 Financial Strength Metrics</h3>
              <div className={styles.metricsGrid}>
                <div className={styles.inputGroup}>
                  <label>Current Ratio</label>
                  <input
                    type="text"
                    value={formData.currentRatio}
                    onChange={(e) => handleInputChange('currentRatio', e.target.value)}
                    placeholder="e.g., 2.1"
                  />
                  <small>Current Assets ÷ Current Liabilities</small>
                </div>
                <div className={styles.inputGroup}>
                  <label>Quick Ratio</label>
                  <input
                    type="text"
                    value={formData.quickRatio}
                    onChange={(e) => handleInputChange('quickRatio', e.target.value)}
                    placeholder="e.g., 1.8"
                  />
                  <small>(Current Assets - Inventory) ÷ Current Liabilities</small>
                </div>
                <div className={styles.inputGroup}>
                  <label>Debt-to-Equity</label>
                  <input
                    type="text"
                    value={formData.debtToEquity}
                    onChange={(e) => handleInputChange('debtToEquity', e.target.value)}
                    placeholder="e.g., 0.3"
                  />
                  <small>Total Debt ÷ Shareholders' Equity</small>
                </div>
                <div className={styles.inputGroup}>
                  <label>Interest Coverage</label>
                  <input
                    type="text"
                    value={formData.interestCoverage}
                    onChange={(e) => handleInputChange('interestCoverage', e.target.value)}
                    placeholder="e.g., 15.2"
                  />
                  <small>EBIT ÷ Interest Expense</small>
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <h3>📈 Profitability Metrics</h3>
              <div className={styles.metricsGrid}>
                <div className={styles.inputGroup}>
                  <label>Return on Equity (ROE) %</label>
                  <input
                    type="text"
                    value={formData.roe}
                    onChange={(e) => handleInputChange('roe', e.target.value)}
                    placeholder="e.g., 25.5"
                  />
                  <small>Net Income ÷ Shareholders' Equity</small>
                </div>
                <div className={styles.inputGroup}>
                  <label>Return on Assets (ROA) %</label>
                  <input
                    type="text"
                    value={formData.roa}
                    onChange={(e) => handleInputChange('roa', e.target.value)}
                    placeholder="e.g., 12.3"
                  />
                  <small>Net Income ÷ Total Assets</small>
                </div>
                <div className={styles.inputGroup}>
                  <label>Return on Invested Capital (ROIC) %</label>
                  <input
                    type="text"
                    value={formData.roic}
                    onChange={(e) => handleInputChange('roic', e.target.value)}
                    placeholder="e.g., 18.7"
                  />
                  <small>NOPAT ÷ Invested Capital</small>
                </div>
                <div className={styles.inputGroup}>
                  <label>Gross Margin %</label>
                  <input
                    type="text"
                    value={formData.grossMargin}
                    onChange={(e) => handleInputChange('grossMargin', e.target.value)}
                    placeholder="e.g., 38.5"
                  />
                  <small>Gross Profit ÷ Revenue</small>
                </div>
                <div className={styles.inputGroup}>
                  <label>Operating Margin %</label>
                  <input
                    type="text"
                    value={formData.operatingMargin}
                    onChange={(e) => handleInputChange('operatingMargin', e.target.value)}
                    placeholder="e.g., 22.1"
                  />
                  <small>Operating Income ÷ Revenue</small>
                </div>
                <div className={styles.inputGroup}>
                  <label>Net Margin %</label>
                  <input
                    type="text"
                    value={formData.netMargin}
                    onChange={(e) => handleInputChange('netMargin', e.target.value)}
                    placeholder="e.g., 18.9"
                  />
                  <small>Net Income ÷ Revenue</small>
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <h3>🚀 Growth Metrics</h3>
              <div className={styles.metricsGrid}>
                <div className={styles.inputGroup}>
                  <label>5-Year Revenue CAGR %</label>
                  <input
                    type="text"
                    value={formData.revenueGrowth5yr}
                    onChange={(e) => handleInputChange('revenueGrowth5yr', e.target.value)}
                    placeholder="e.g., 12.5"
                  />
                  <small>Compound Annual Growth Rate</small>
                </div>
                <div className={styles.inputGroup}>
                  <label>5-Year EPS CAGR %</label>
                  <input
                    type="text"
                    value={formData.epsGrowth5yr}
                    onChange={(e) => handleInputChange('epsGrowth5yr', e.target.value)}
                    placeholder="e.g., 15.8"
                  />
                  <small>Earnings Per Share Growth</small>
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <h3>💰 Valuation Ratios</h3>
              <div className={styles.metricsGrid}>
                <div className={styles.inputGroup}>
                  <label>P/E Ratio</label>
                  <input
                    type="text"
                    value={formData.peRatio}
                    onChange={(e) => handleInputChange('peRatio', e.target.value)}
                    placeholder="e.g., 24.5"
                  />
                  <small>Price ÷ Earnings per Share</small>
                </div>
                <div className={styles.inputGroup}>
                  <label>P/B Ratio</label>
                  <input
                    type="text"
                    value={formData.pbRatio}
                    onChange={(e) => handleInputChange('pbRatio', e.target.value)}
                    placeholder="e.g., 8.2"
                  />
                  <small>Price ÷ Book Value per Share</small>
                </div>
                <div className={styles.inputGroup}>
                  <label>P/S Ratio</label>
                  <input
                    type="text"
                    value={formData.psRatio}
                    onChange={(e) => handleInputChange('psRatio', e.target.value)}
                    placeholder="e.g., 6.1"
                  />
                  <small>Market Cap ÷ Revenue</small>
                </div>
                <div className={styles.inputGroup}>
                  <label>P/FCF Ratio</label>
                  <input
                    type="text"
                    value={formData.pfcfRatio}
                    onChange={(e) => handleInputChange('pfcfRatio', e.target.value)}
                    placeholder="e.g., 18.5"
                  />
                  <small>Market Cap ÷ Free Cash Flow</small>
                </div>
                <div className={styles.inputGroup}>
                  <label>PEG Ratio</label>
                  <input
                    type="text"
                    value={formData.pegRatio}
                    onChange={(e) => handleInputChange('pegRatio', e.target.value)}
                    placeholder="e.g., 1.2"
                  />
                  <small>P/E Ratio ÷ Growth Rate</small>
                </div>
                <div className={styles.inputGroup}>
                  <label>EV/EBITDA</label>
                  <input
                    type="text"
                    value={formData.evEbitda}
                    onChange={(e) => handleInputChange('evEbitda', e.target.value)}
                    placeholder="e.g., 15.3"
                  />
                  <small>Enterprise Value ÷ EBITDA</small>
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <h3>💸 Cash Flow & Dividend Metrics</h3>
              <div className={styles.metricsGrid}>
                <div className={styles.inputGroup}>
                  <label>Free Cash Flow Margin %</label>
                  <input
                    type="text"
                    value={formData.freeCashFlowMargin}
                    onChange={(e) => handleInputChange('freeCashFlowMargin', e.target.value)}
                    placeholder="e.g., 15.2"
                  />
                  <small>Free Cash Flow ÷ Revenue</small>
                </div>
                <div className={styles.inputGroup}>
                  <label>Operating Cash Flow ($M)</label>
                  <input
                    type="text"
                    value={formData.operatingCashFlow}
                    onChange={(e) => handleInputChange('operatingCashFlow', e.target.value)}
                    placeholder="e.g., 25,000"
                  />
                  <small>Cash from Operations</small>
                </div>
                <div className={styles.inputGroup}>
                  <label>Dividend Yield %</label>
                  <input
                    type="text"
                    value={formData.dividendYield}
                    onChange={(e) => handleInputChange('dividendYield', e.target.value)}
                    placeholder="e.g., 2.5"
                  />
                  <small>Annual Dividend ÷ Stock Price</small>
                </div>
                <div className={styles.inputGroup}>
                  <label>Payout Ratio %</label>
                  <input
                    type="text"
                    value={formData.payoutRatio}
                    onChange={(e) => handleInputChange('payoutRatio', e.target.value)}
                    placeholder="e.g., 35"
                  />
                  <small>Dividends ÷ Net Income</small>
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <h3>🏦 Asset Quality</h3>
              <div className={styles.metricsGrid}>
                <div className={styles.inputGroup}>
                  <label>Book Value per Share ($)</label>
                  <input
                    type="text"
                    value={formData.bookValuePerShare}
                    onChange={(e) => handleInputChange('bookValuePerShare', e.target.value)}
                    placeholder="e.g., 18.75"
                  />
                  <small>Shareholders' Equity ÷ Shares Outstanding</small>
                </div>
                <div className={styles.inputGroup}>
                  <label>Tangible Book Value ($M)</label>
                  <input
                    type="text"
                    value={formData.tangibleBookValue}
                    onChange={(e) => handleInputChange('tangibleBookValue', e.target.value)}
                    placeholder="e.g., 45,000"
                  />
                  <small>Equity - Intangible Assets</small>
                </div>
              </div>
            </div>

            <div className={styles.buttonGroup}>
              <button 
                className={styles.generateButton} 
                onClick={generatePrompt}
                disabled={!formData.companyName || !formData.country}
              >
                🚀 Generate Analysis Prompt
              </button>
              <button className={styles.clearButton} onClick={clearForm}>
                🗑️ Clear Form
              </button>
            </div>
          </div>
        )}

        {activeTab === 'prompt' && (
          <div className={styles.promptContainer}>
            {generatedPrompt ? (
              <>
                <div className={styles.promptHeader}>
                  <h3>📋 Generated Investment Analysis Prompt</h3>
                  <button className={styles.copyButton} onClick={copyToClipboard}>
                    📋 Copy to Clipboard
                  </button>
                </div>
                <div className={styles.promptText}>
                  <pre>{generatedPrompt}</pre>
                </div>
                <div className={styles.promptFooter}>
                  <p className={styles.instructions}>
                    <strong>Instructions:</strong> Copy this prompt and paste it into ChatGPT, Claude, Gemini, or any other AI assistant. 
                    The AI will provide a comprehensive investment analysis using the frameworks of legendary investors.
                  </p>
                </div>
              </>
            ) : (
              <div className={styles.noPrompt}>
                <h3>📝 No Prompt Generated Yet</h3>
                <p>Fill in the company data form and click "Generate Analysis Prompt" to create your customized investment analysis prompt.</p>
                <button 
                  className={styles.backToFormButton} 
                  onClick={() => setActiveTab('form')}
                >
                  ← Back to Form
                </button>
              </div>
            )}
          </div>
        )}

        <div className={styles.legend}>
          <h3>🧠 About This Tool</h3>
          <p>
            This prompt generator creates comprehensive investment analysis requests that incorporate the wisdom and frameworks 
            of legendary investors. The generated prompts will ask AI assistants to evaluate companies through multiple lenses:
          </p>
          <ul>
            <li><strong>Warren Buffett:</strong> Focus on business quality, competitive moats, and long-term compounding</li>
            <li><strong>Benjamin Graham:</strong> Emphasis on margin of safety, asset values, and financial strength</li>
            <li><strong>Peter Lynch:</strong> Growth at reasonable price (GARP) and industry position analysis</li>
            <li><strong>Philip Fisher:</strong> Growth analysis through "scuttlebutt" research, R&D effectiveness, and management quality</li>
            <li><strong>Charlie Munger:</strong> Qualitative business analysis and rational decision-making</li>
          </ul>
          <p>
            <em>Note: Not all fields are required. Fill in what you have available - the AI can work with partial data and will note what additional information would be helpful.</em>
          </p>
        </div>
      </div>
    </Layout>
  );
}
