const form = document.getElementById('profit-form');
const jobType = document.getElementById('jobType');

const fields = {
  cleaners: document.getElementById('cleaners'),
  hours: document.getElementById('hours'),
  laborRate: document.getElementById('laborRate'),
  supplies: document.getElementById('supplies'),
  travel: document.getElementById('travel'),
  overhead: document.getElementById('overhead'),
  other: document.getElementById('other'),
  quote: document.getElementById('quote'),
  targetMargin: document.getElementById('targetMargin')
};

const output = {
  status: document.getElementById('status'),
  profit: document.getElementById('profitValue'),
  revenue: document.getElementById('revenueValue'),
  labor: document.getElementById('laborValue'),
  otherCosts: document.getElementById('otherCostsValue'),
  cost: document.getElementById('costValue'),
  margin: document.getElementById('marginValue'),
  target: document.getElementById('targetLabel'),
  minimum: document.getElementById('minimumQuote'),
  guidance: document.getElementById('guidance')
};

const presets = {
  residential: { jobType: 'Residential', cleaners: 2, hours: 4, laborRate: 20, supplies: 15, travel: 12, overhead: 40, other: 10, quote: 300, targetMargin: 35 },
  commercial: { jobType: 'Commercial', cleaners: 4, hours: 4, laborRate: 22, supplies: 35, travel: 25, overhead: 70, other: 20, quote: 750, targetMargin: 28 }
};

function numberValue(element) {
  const value = Number.parseFloat(element.value);
  return Number.isFinite(value) && value >= 0 ? value : 0;
}

function currency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(value);
}

function getCalculation() {
  const cleaners = Math.max(1, numberValue(fields.cleaners));
  const hours = numberValue(fields.hours);
  const laborRate = numberValue(fields.laborRate);
  const supplies = numberValue(fields.supplies);
  const travel = numberValue(fields.travel);
  const overhead = numberValue(fields.overhead);
  const other = numberValue(fields.other);
  const quote = numberValue(fields.quote);
  const targetMargin = Math.min(Math.max(numberValue(fields.targetMargin), 1), 95);
  const laborCost = cleaners * hours * laborRate;
  const otherCosts = supplies + travel + overhead + other;
  const totalCost = laborCost + otherCosts;
  const profit = quote - totalCost;
  const margin = quote > 0 ? (profit / quote) * 100 : 0;
  const minimumQuote = totalCost / (1 - targetMargin / 100);

  return { cleaners, hours, laborRate, quote, targetMargin, laborCost, otherCosts, totalCost, profit, margin, minimumQuote };
}

function calculate() {
  const result = getCalculation();

  output.profit.textContent = currency(result.profit);
  output.revenue.textContent = currency(result.quote);
  output.labor.textContent = currency(result.laborCost);
  output.otherCosts.textContent = currency(result.otherCosts);
  output.cost.textContent = currency(result.totalCost);
  output.margin.textContent = `${result.margin.toFixed(1)}%`;
  output.target.textContent = `${result.targetMargin.toFixed(0)}%`;
  output.minimum.textContent = currency(result.minimumQuote);
  output.status.className = 'status-pill';

  if (result.quote <= 0) {
    output.status.textContent = 'Enter a quote';
    output.status.classList.add('status-warning');
    output.guidance.textContent = 'Enter a proposed quote to compare it with your true job cost and target margin.';
  } else if (result.profit < 0) {
    output.status.textContent = 'Losing money';
    output.status.classList.add('status-bad');
    output.guidance.textContent = 'This quote is below your estimated true job cost. At these inputs, the job would lose money.';
  } else if (result.margin + 0.001 < result.targetMargin) {
    output.status.textContent = 'Below target';
    output.status.classList.add('status-warning');
    output.guidance.textContent = `Your proposed quote is below your ${result.targetMargin.toFixed(0)}% target gross margin. Consider raising the price toward ${currency(result.minimumQuote)} or reducing job costs.`;
  } else {
    output.status.textContent = 'Target reached';
    output.status.classList.add('status-good');
    output.guidance.textContent = `Your proposed quote meets or exceeds your ${result.targetMargin.toFixed(0)}% target gross margin based on the costs entered.`;
  }
}

function applyPreset(preset) {
  jobType.value = preset.jobType;
  Object.keys(fields).forEach((key) => {
    fields[key].value = preset[key];
  });
  calculate();
}

async function copySummary() {
  const result = getCalculation();
  const summary = `ProfitQuote result\nJob type: ${jobType.value}\nTrue job cost: ${currency(result.totalCost)}\nProposed quote: ${currency(result.quote)}\nEstimated profit: ${currency(result.profit)}\nGross margin: ${result.margin.toFixed(1)}%\nTarget gross margin: ${result.targetMargin.toFixed(0)}%\nMinimum profitable quote: ${currency(result.minimumQuote)}`;
  const copyStatus = document.getElementById('copyStatus');

  try {
    await navigator.clipboard.writeText(summary);
    copyStatus.textContent = 'Copied to clipboard.';
  } catch (error) {
    const textarea = document.createElement('textarea');
    textarea.value = summary;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    copyStatus.textContent = 'Copied to clipboard.';
  }

  window.setTimeout(() => { copyStatus.textContent = ''; }, 2500);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  calculate();
});

Object.values(fields).forEach((field) => {
  field.addEventListener('input', calculate);
  field.addEventListener('change', calculate);
});

jobType.addEventListener('change', calculate);
document.getElementById('residentialExample').addEventListener('click', () => applyPreset(presets.residential));
document.getElementById('commercialExample').addEventListener('click', () => applyPreset(presets.commercial));
document.getElementById('resetCalculator').addEventListener('click', () => applyPreset(presets.residential));
document.getElementById('copySummary').addEventListener('click', copySummary);

calculate();
