const form = document.getElementById('profit-form');

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

function calculate() {
  const cleaners = Math.max(1, numberValue(fields.cleaners));
  const hours = numberValue(fields.hours);
  const laborRate = numberValue(fields.laborRate);
  const supplies = numberValue(fields.supplies);
  const travel = numberValue(fields.travel);
  const overhead = numberValue(fields.overhead);
  const other = numberValue(fields.other);
  const quote = numberValue(fields.quote);
  const targetMarginRaw = numberValue(fields.targetMargin);
  const targetMargin = Math.min(Math.max(targetMarginRaw, 1), 95);

  const laborCost = cleaners * hours * laborRate;
  const otherCosts = supplies + travel + overhead + other;
  const totalCost = laborCost + otherCosts;
  const profit = quote - totalCost;
  const margin = quote > 0 ? (profit / quote) * 100 : 0;
  const minimumQuote = totalCost / (1 - targetMargin / 100);

  output.profit.textContent = currency(profit);
  output.revenue.textContent = currency(quote);
  output.labor.textContent = currency(laborCost);
  output.otherCosts.textContent = currency(otherCosts);
  output.cost.textContent = currency(totalCost);
  output.margin.textContent = `${margin.toFixed(1)}%`;
  output.target.textContent = `${targetMargin.toFixed(0)}%`;
  output.minimum.textContent = currency(minimumQuote);

  output.status.className = 'status-pill';

  if (quote <= 0) {
    output.status.textContent = 'Enter a quote';
    output.status.classList.add('status-warning');
    output.guidance.textContent = 'Enter a proposed quote to compare it with your costs and target margin.';
  } else if (profit < 0) {
    output.status.textContent = 'Losing money';
    output.status.classList.add('status-bad');
    output.guidance.textContent = 'This quote is below your estimated job cost. At these inputs, the job would lose money.';
  } else if (margin + 0.001 < targetMargin) {
    output.status.textContent = 'Below target';
    output.status.classList.add('status-warning');
    output.guidance.textContent = `Your proposed quote is below your ${targetMargin.toFixed(0)}% target margin. Consider raising the price or reducing job costs.`;
  } else {
    output.status.textContent = 'Target reached';
    output.status.classList.add('status-good');
    output.guidance.textContent = `Your proposed quote meets or exceeds your ${targetMargin.toFixed(0)}% target gross margin based on the costs entered.`;
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  calculate();
});

Object.values(fields).forEach((field) => {
  field.addEventListener('input', calculate);
  field.addEventListener('change', calculate);
});

calculate();
