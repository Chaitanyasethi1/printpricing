// Complete Printing Cost Calculator Web Application Engine
// Preserving the Exact Mathematical Algorithm with Leaf (Lamination-Style), Plates Charges, and Die Charges

function n(id) {
  const el = document.getElementById(id);
  return el ? (parseFloat(el.value) || 0) : 0;
}

function setVal(id, val) {
  const el = document.getElementById(id);
  if (el) {
    el.value = val;
    calculate();
  }
}

function money(v) {
  if (isNaN(v)) v = 0;
  return '₹' + v.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

const PRESETS = {
  sweetBox: {
    name: 'Sweet Box Packaging',
    sl: 20, sw: 28, gsm: 350, pr: 85,
    lamType: 'Matt', ll: 20, lw: 28, divide: 2.2,
    leafType: 'Gold Foil', leafL: 4, leafW: 6, leafDivide: 2.5, leafBlock: 350,
    printing: 2.50, plates: 800,
    die: 0.80, dieCharges: 650,
    pasting: 1.20, uv: 0.60, embossed: 0.40, other: 0.25,
    wastage: 5, profit: 20, batchQty: 1000
  },
  visitingCard: {
    name: 'Visiting Card Sheet (12x18)',
    sl: 12, sw: 18, gsm: 350, pr: 90,
    lamType: 'Velvet', ll: 12, lw: 18, divide: 1.8,
    leafType: 'Gold Foil', leafL: 3.5, leafW: 2, leafDivide: 2.5, leafBlock: 250,
    printing: 1.80, plates: 400,
    die: 0.50, dieCharges: 350,
    pasting: 0, uv: 0.40, embossed: 0, other: 0,
    wastage: 3, profit: 25, batchQty: 500
  },
  monocarton: {
    name: 'Pharma / Cosmetic Monocarton',
    sl: 18, sw: 23, gsm: 300, pr: 82,
    lamType: 'Gloss', ll: 18, lw: 23, divide: 2.5,
    leafType: 'None', leafL: 0, leafW: 0, leafDivide: 2.5, leafBlock: 0,
    printing: 1.60, plates: 800,
    die: 0.70, dieCharges: 500,
    pasting: 0.90, uv: 0.50, embossed: 0.30, other: 0.15,
    wastage: 4, profit: 18, batchQty: 5000
  },
  bookCover: {
    name: 'Book / Notebook Cover',
    sl: 23, sw: 36, gsm: 250, pr: 78,
    lamType: 'Matt', ll: 23, lw: 36, divide: 2.2,
    leafType: 'Silver Foil', leafL: 5, leafW: 7, leafDivide: 2.5, leafBlock: 400,
    printing: 3.20, plates: 800,
    die: 0.40, dieCharges: 400,
    pasting: 0.50, uv: 0, embossed: 0, other: 0.20,
    wastage: 5, profit: 15, batchQty: 2500
  },
  flyer: {
    name: 'A4 Flyer / Brochure (18x23 Sheet)',
    sl: 18, sw: 23, gsm: 130, pr: 75,
    lamType: 'None', ll: 18, lw: 23, divide: 2.5,
    leafType: 'None', leafL: 0, leafW: 0, leafDivide: 2.5, leafBlock: 0,
    printing: 1.20, plates: 800,
    die: 0, dieCharges: 0,
    pasting: 0, uv: 0, embossed: 0, other: 0,
    wastage: 2, profit: 15, batchQty: 10000
  }
};

function calculate() {
  const batchQty = n('batchQty') || 1;

  // 1. Paper: square inches -> square meters -> weight -> cost
  const sl = n('sl');
  const sw = n('sw');
  const gsm = n('gsm');
  const pr = n('paperRate');

  const areaM2 = sl * sw * 0.00064516;
  const weightKg = (areaM2 * gsm) / 1000;
  const paperCost = weightKg * pr;
  const weightGrams = weightKg * 1000;

  // 2. Lamination: (Length * Width / Divide By) = Paise -> Rupees
  const ll = n('ll');
  const lw = n('lw');
  const d = n('divide');
  const lamType = document.getElementById('lamType') ? document.getElementById('lamType').value : 'None';

  let lamPaise = (d && lamType !== 'None') ? ((ll * lw) / d) : 0;
  const lamCost = lamPaise / 100;

  // 3. Leaf / Foil (Lamination ki tarah formula): (Length * Width / Divide By) = Paise -> Rupees + Block Charges
  const leafType = document.getElementById('leafType') ? document.getElementById('leafType').value : 'None';
  const leafL = n('leafL');
  const leafW = n('leafW');
  const leafDivide = n('leafDivide') || 2.5;
  const leafBlockCharges = n('leafBlock');

  let leafPaise = (leafDivide && leafType !== 'None') ? ((leafL * leafW) / leafDivide) : 0;
  const leafCostPerSheet = leafPaise / 100;
  const leafBlockCostPerSheet = batchQty > 0 ? (leafBlockCharges / batchQty) : 0;
  const totalLeafPerSheet = leafCostPerSheet + leafBlockCostPerSheet;

  // 4. Printing & Plates Charges
  const printing = n('printing');
  const plateCharges = n('plates');
  const plateCostPerSheet = batchQty > 0 ? (plateCharges / batchQty) : 0;
  const totalPrintingPerSheet = printing + plateCostPerSheet;

  // 5. Finishing / Job Work: Die Cutting & Die Charges, Pasting, UV, Embossed, Other
  const die = n('die');
  const dieCharges = n('dieCharges');
  const dieCostPerSheet = batchQty > 0 ? (dieCharges / batchQty) : 0;
  const totalDiePerSheet = die + dieCostPerSheet;

  const pasting = n('pasting');
  const uv = n('uv');
  const embossed = n('embossed');
  const other = n('other');

  // Direct Total Cost per Sheet
  const direct = paperCost + lamCost + totalLeafPerSheet + totalPrintingPerSheet + totalDiePerSheet + pasting + uv + embossed + other;

  // Wastage & Cost
  const wastage = n('wastage');
  const wastageCost = (direct * wastage) / 100;
  const cost = direct + wastageCost;

  // Profit & Final Sale Price
  const profit = n('profit');
  const profitAmount = (cost * profit) / 100;
  const finalPrice = cost + profitAmount;

  // Batch Totals
  const totalBatchCost = cost * batchQty;
  const totalBatchPrice = finalPrice * batchQty;
  const totalBatchProfit = profitAmount * batchQty;

  // Hero Section
  updateText('heroFinalPrice', money(finalPrice));
  updateText('heroUnitCost', money(cost));
  updateText('heroUnitProfit', money(profitAmount));
  updateText('heroWeight', weightGrams.toFixed(2) + ' g');

  // Itemized Breakdown Update
  updateText('weight', weightGrams.toFixed(2) + ' g');
  updateText('paperCost', money(paperCost));

  // Lamination
  const lamNameEl = document.getElementById('lamName');
  if (lamNameEl) {
    lamNameEl.textContent = (lamType === 'None') ? 'Lamination' : lamType + ' Lamination';
  }
  const lamCostEl = document.getElementById('lamCost');
  if (lamCostEl) {
    lamCostEl.textContent = (lamType === 'None') 
      ? '₹0.00' 
      : `${lamPaise.toFixed(2)}p (${money(lamCost)})`;
  }

  // Leaf / Foil
  const leafNameEl = document.getElementById('leafName');
  if (leafNameEl) {
    leafNameEl.textContent = (leafType === 'None') ? 'Leaf / Foil Stamping' : leafType + ' Stamping';
  }
  const leafCostEl = document.getElementById('leafCost');
  if (leafCostEl) {
    if (leafType === 'None') {
      leafCostEl.textContent = '₹0.00';
    } else {
      leafCostEl.textContent = `${lamPaise.toFixed(0) ? leafPaise.toFixed(2) + 'p' : ''} (${money(totalLeafPerSheet)})`;
    }
  }

  // Printing & Plates
  updateText('rPrinting', money(totalPrintingPerSheet));
  const rPrintingSub = document.getElementById('rPrintingSub');
  if (rPrintingSub) {
    rPrintingSub.textContent = plateCharges > 0 
      ? `Imp: ${money(printing)} + Plates: ${money(plateCostPerSheet)}/sh` 
      : 'Offset / Digital Impression';
  }

  // Die Cutting & Die Charges
  updateText('rDie', money(totalDiePerSheet));
  const rDieSub = document.getElementById('rDieSub');
  if (rDieSub) {
    rDieSub.textContent = dieCharges > 0 
      ? `Punch: ${money(die)} + Die: ${money(dieCostPerSheet)}/sh` 
      : 'Punching & Cutting';
  }

  updateText('rPasting', money(pasting));
  updateText('rUv', money(uv));
  updateText('rEmbossed', money(embossed));
  updateText('rOther', money(other));
  updateText('rWastage', money(wastageCost));
  updateText('total', money(cost));
  updateText('final', money(finalPrice));

  // Batch Multiplier Summary
  updateText('batchQuantityDisplay', batchQty.toLocaleString('en-IN') + ' Sheets');
  updateText('batchTotalCost', money(totalBatchCost));
  updateText('batchTotalPrice', money(totalBatchPrice));
  updateText('batchTotalProfit', money(totalBatchProfit));

  // Formula Note Updates
  const formulaEl = document.getElementById('formula');
  if (formulaEl) {
    formulaEl.innerHTML = (lamType === 'None')
      ? '<span>ℹ️</span> <b>Lamination:</b> None'
      : `<span>ℹ️</span> <b>Lamination:</b> ${ll}" × ${lw}" ÷ ${d} = <b>${lamPaise.toFixed(2)} Paise</b> (${money(lamCost)})`;
  }

  const leafFormulaEl = document.getElementById('leafFormula');
  if (leafFormulaEl) {
    leafFormulaEl.innerHTML = (leafType === 'None')
      ? '<span>ℹ️</span> <b>Leaf / Foil:</b> None'
      : `<span>ℹ️</span> <b>Leaf:</b> ${leafL}" × ${leafW}" ÷ ${leafDivide} = <b>${leafPaise.toFixed(2)} Paise</b> (${money(leafCostPerSheet)}) + Block ₹${leafBlockCharges}`;
  }

  updateSheetVisual(sl, sw, ll, lw, lamType, leafL, leafW, leafType);
}

function updateText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

// Visual Sheet Simulator with Lamination & Foil Overlay
function updateSheetVisual(sl, sw, ll, lw, lamType, leafL, leafW, leafType) {
  const sheetEl = document.getElementById('visualSheet');
  const lamEl = document.getElementById('visualLam');
  const leafEl = document.getElementById('visualLeaf');
  const dimWEl = document.getElementById('visualDimW');
  const dimHEl = document.getElementById('visualDimH');

  if (!sheetEl || !lamEl) return;

  const maxPixelW = 190;
  const maxPixelH = 120;
  const safeSl = Math.max(sl || 1, 1);
  const safeSw = Math.max(sw || 1, 1);

  const ratio = safeSl / safeSw;
  let renderW, renderH;

  if (ratio >= (maxPixelW / maxPixelH)) {
    renderW = maxPixelW;
    renderH = Math.max(maxPixelW / ratio, 30);
  } else {
    renderH = maxPixelH;
    renderW = Math.max(maxPixelH * ratio, 30);
  }

  sheetEl.style.width = `${renderW}px`;
  sheetEl.style.height = `${renderH}px`;

  if (dimWEl) dimWEl.textContent = `${safeSl}" L`;
  if (dimHEl) dimHEl.textContent = `${safeSw}" W`;

  // Lamination overlay
  if (lamType === 'None' || !ll || !lw) {
    lamEl.style.display = 'none';
  } else {
    lamEl.style.display = 'flex';
    const lamWPercent = Math.min((ll / safeSl) * 100, 100);
    const lamHPercent = Math.min((lw / safeSw) * 100, 100);
    lamEl.style.width = `${lamWPercent}%`;
    lamEl.style.height = `${lamHPercent}%`;
    lamEl.textContent = lamType;
  }

  // Leaf Foil overlay
  if (leafEl) {
    if (leafType === 'None' || !leafL || !leafW) {
      leafEl.style.display = 'none';
    } else {
      leafEl.style.display = 'flex';
      const foilWPercent = Math.min((leafL / safeSl) * 100, 100);
      const foilHPercent = Math.min((leafW / safeSw) * 100, 100);
      leafEl.style.width = `${foilWPercent}%`;
      leafEl.style.height = `${foilHPercent}%`;
      leafEl.textContent = '✨ ' + leafType.replace(' Foil', '');
    }
  }
}

function syncDimensions() {
  const sl = document.getElementById('sl').value;
  const sw = document.getElementById('sw').value;
  if (sl) document.getElementById('ll').value = sl;
  if (sw) document.getElementById('lw').value = sw;
  showToast('Sheet size copied to Lamination!');
  calculate();
}

function syncLeafDimensions() {
  const sl = document.getElementById('sl').value;
  const sw = document.getElementById('sw').value;
  if (sl) document.getElementById('leafL').value = sl;
  if (sw) document.getElementById('leafW').value = sw;
  showToast('Sheet size copied to Leaf / Foil!');
  calculate();
}

function loadPreset(key) {
  const p = PRESETS[key];
  if (!p) return;

  document.getElementById('sl').value = p.sl;
  document.getElementById('sw').value = p.sw;
  document.getElementById('gsm').value = p.gsm;
  document.getElementById('paperRate').value = p.pr;

  document.getElementById('lamType').value = p.lamType;
  document.getElementById('ll').value = p.ll;
  document.getElementById('lw').value = p.lw;
  document.getElementById('divide').value = p.divide;

  if (document.getElementById('leafType')) document.getElementById('leafType').value = p.leafType;
  if (document.getElementById('leafL')) document.getElementById('leafL').value = p.leafL;
  if (document.getElementById('leafW')) document.getElementById('leafW').value = p.leafW;
  if (document.getElementById('leafDivide')) document.getElementById('leafDivide').value = p.leafDivide;
  if (document.getElementById('leafBlock')) document.getElementById('leafBlock').value = p.leafBlock;

  document.getElementById('printing').value = p.printing;
  if (document.getElementById('plates')) document.getElementById('plates').value = p.plates;

  document.getElementById('die').value = p.die;
  if (document.getElementById('dieCharges')) document.getElementById('dieCharges').value = p.dieCharges;

  document.getElementById('pasting').value = p.pasting;
  document.getElementById('uv').value = p.uv;
  document.getElementById('embossed').value = p.embossed;
  document.getElementById('other').value = p.other;

  document.getElementById('wastage').value = p.wastage;
  document.getElementById('profit').value = p.profit;
  if (document.getElementById('batchQty')) {
    document.getElementById('batchQty').value = p.batchQty;
  }

  document.querySelectorAll('.preset-chip').forEach(el => el.classList.remove('active'));
  const activeChip = document.getElementById('preset-' + key);
  if (activeChip) activeChip.classList.add('active');

  showToast(`Loaded "${p.name}" preset`);
  calculate();
}

function setLaminationDivider(val, name) {
  document.getElementById('divide').value = val;
  if (name) {
    document.getElementById('lamType').value = name;
  }
  calculate();
}

function setLeafDivider(val, name) {
  document.getElementById('leafDivide').value = val;
  if (name) {
    document.getElementById('leafType').value = name;
  }
  calculate();
}

function setBatchQty(qty) {
  document.getElementById('batchQty').value = qty;
  document.querySelectorAll('.batch-pill').forEach(el => el.classList.remove('active'));
  const btn = document.getElementById('batch-' + qty);
  if (btn) btn.classList.add('active');
  calculate();
}

function resetCalculator() {
  document.getElementById('sl').value = 23;
  document.getElementById('sw').value = 18;
  document.getElementById('gsm').value = 250;
  document.getElementById('paperRate').value = 80;

  document.getElementById('lamType').value = 'None';
  document.getElementById('ll').value = 18;
  document.getElementById('lw').value = 23;
  document.getElementById('divide').value = 2.5;

  if (document.getElementById('leafType')) document.getElementById('leafType').value = 'None';
  if (document.getElementById('leafL')) document.getElementById('leafL').value = 0;
  if (document.getElementById('leafW')) document.getElementById('leafW').value = 0;
  if (document.getElementById('leafDivide')) document.getElementById('leafDivide').value = 2.5;
  if (document.getElementById('leafBlock')) document.getElementById('leafBlock').value = 0;

  document.getElementById('printing').value = 0;
  if (document.getElementById('plates')) document.getElementById('plates').value = 0;

  document.getElementById('die').value = 0;
  if (document.getElementById('dieCharges')) document.getElementById('dieCharges').value = 0;

  document.getElementById('pasting').value = 0;
  document.getElementById('uv').value = 0;
  document.getElementById('embossed').value = 0;
  document.getElementById('other').value = 0;

  document.getElementById('wastage').value = 0;
  document.getElementById('profit').value = 0;
  document.getElementById('batchQty').value = 1000;

  showToast('Reset to default values');
  calculate();
}

function showToast(msg) {
  let toast = document.getElementById('appToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'appToast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span>✨</span> ${msg}`;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

function openQuotationModal() {
  const modal = document.getElementById('quotationModal');
  if (!modal) return;

  const clientName = document.getElementById('clientNameInput')?.value || 'Valued Client';
  const jobTitle = document.getElementById('jobTitleInput')?.value || 'Custom Printing Job';
  const today = new Date().toLocaleDateString('en-IN', {
    year: 'numeric', month: 'short', day: 'numeric'
  });

  const quoteNumber = 'EST-' + Math.floor(100000 + Math.random() * 900000);

  const batchQty = n('batchQty') || 1000;

  const sl = n('sl'), sw = n('sw'), gsm = n('gsm'), pr = n('paperRate');
  const areaM2 = sl * sw * 0.00064516;
  const weightKg = (areaM2 * gsm) / 1000;
  const paperCost = weightKg * pr;

  const lamType = document.getElementById('lamType').value;
  const ll = n('ll'), lw = n('lw'), d = n('divide');
  const lamPaise = (d && lamType !== 'None') ? ((ll * lw) / d) : 0;
  const lamCost = lamPaise / 100;

  const leafType = document.getElementById('leafType').value;
  const leafL = n('leafL'), leafW = n('leafW'), leafDivide = n('leafDivide') || 2.5;
  const leafBlock = n('leafBlock');
  const leafPaise = (leafDivide && leafType !== 'None') ? ((leafL * leafW) / leafDivide) : 0;
  const leafCostPerSheet = leafPaise / 100;
  const leafBlockPerSheet = batchQty > 0 ? (leafBlock / batchQty) : 0;
  const totalLeafPerSheet = leafCostPerSheet + leafBlockPerSheet;

  const printing = n('printing');
  const plates = n('plates');
  const plateCostPerSheet = batchQty > 0 ? (plates / batchQty) : 0;
  const totalPrintingPerSheet = printing + plateCostPerSheet;

  const die = n('die');
  const dieCharges = n('dieCharges');
  const dieCostPerSheet = batchQty > 0 ? (dieCharges / batchQty) : 0;
  const totalDiePerSheet = die + dieCostPerSheet;

  const pasting = n('pasting');
  const uv = n('uv');
  const embossed = n('embossed');
  const other = n('other');

  const direct = paperCost + lamCost + totalLeafPerSheet + totalPrintingPerSheet + totalDiePerSheet + pasting + uv + embossed + other;
  const wastage = n('wastage');
  const wastageCost = direct * wastage / 100;
  const cost = direct + wastageCost;
  const profit = n('profit');
  const profitAmount = cost * profit / 100;
  const finalPrice = cost + profitAmount;

  const batchTotalPrice = finalPrice * batchQty;

  const previewEl = document.getElementById('quotationPreview');
  if (previewEl) {
    previewEl.innerHTML = `
      <div class="quotation-sheet" id="printableInvoice">
        <div class="quote-header">
          <div>
            <div class="quote-title">PRINTING ESTIMATION / QUOTATION</div>
            <div style="font-size:0.85rem; color:#64748b; margin-top:4px;">Professional Job Sheet & Cost Breakdown</div>
          </div>
          <div style="text-align:right;">
            <div style="font-weight:700; color:#0f172a;">Quote #${quoteNumber}</div>
            <div style="font-size:0.85rem; color:#64748b;">Date: ${today}</div>
          </div>
        </div>

        <div class="quote-meta-grid">
          <div>
            <div style="font-weight:700; color:#334155; margin-bottom:4px;">CLIENT DETAILS:</div>
            <div style="font-size:1.05rem; font-weight:700; color:#0f172a;">${clientName}</div>
            <div style="color:#64748b;">Job: <b>${jobTitle}</b></div>
          </div>
          <div>
            <div style="font-weight:700; color:#334155; margin-bottom:4px;">SPECIFICATIONS:</div>
            <div>Sheet Size: <b>${sl}" × ${sw}"</b> (${gsm} GSM)</div>
            <div>Lamination: <b>${lamType}</b> ${lamType !== 'None' ? `(${ll}" × ${lw}")` : ''}</div>
            ${leafType !== 'None' ? `<div>Leaf / Foil: <b>${leafType}</b> (${leafL}" × ${leafW}")</div>` : ''}
            <div>Job Quantity: <b>${batchQty.toLocaleString('en-IN')} Sheets</b></div>
          </div>
        </div>

        <table class="quote-table">
          <thead>
            <tr>
              <th>Item / Process</th>
              <th>Specification</th>
              <th style="text-align:right;">Cost / Sheet</th>
              <th style="text-align:right;">Total (${batchQty.toLocaleString('en-IN')} Qty)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><b>Paper Substrate</b></td>
              <td>${sl}" × ${sw}" | ${gsm} GSM @ ₹${pr}/Kg</td>
              <td style="text-align:right;">${money(paperCost)}</td>
              <td style="text-align:right;">${money(paperCost * batchQty)}</td>
            </tr>
            ${lamType !== 'None' ? `
            <tr>
              <td><b>${lamType} Lamination</b></td>
              <td>${ll}" × ${lw}" (Div: ${d}) = ${lamPaise.toFixed(2)}p</td>
              <td style="text-align:right;">${money(lamCost)}</td>
              <td style="text-align:right;">${money(lamCost * batchQty)}</td>
            </tr>
            ` : ''}
            ${leafType !== 'None' ? `
            <tr>
              <td><b>${leafType} Stamping</b></td>
              <td>${leafL}" × ${leafW}" (Div: ${leafDivide}) = ${leafPaise.toFixed(2)}p ${leafBlock > 0 ? `+ Block ₹${leafBlock}` : ''}</td>
              <td style="text-align:right;">${money(totalLeafPerSheet)}</td>
              <td style="text-align:right;">${money(totalLeafPerSheet * batchQty)}</td>
            </tr>
            ` : ''}
            ${(printing > 0 || plates > 0) ? `
            <tr>
              <td><b>Printing & Plates</b></td>
              <td>Imp: ${money(printing)} ${plates > 0 ? `| Plate Charges: ₹${plates}` : ''}</td>
              <td style="text-align:right;">${money(totalPrintingPerSheet)}</td>
              <td style="text-align:right;">${money(totalPrintingPerSheet * batchQty)}</td>
            </tr>
            ` : ''}
            ${(die > 0 || dieCharges > 0) ? `
            <tr>
              <td><b>Die Cutting & Die</b></td>
              <td>Punch: ${money(die)} ${dieCharges > 0 ? `| Die Charges: ₹${dieCharges}` : ''}</td>
              <td style="text-align:right;">${money(totalDiePerSheet)}</td>
              <td style="text-align:right;">${money(totalDiePerSheet * batchQty)}</td>
            </tr>
            ` : ''}
            ${pasting > 0 ? `
            <tr>
              <td><b>Pasting / Fabrication</b></td>
              <td>Assembly & Glue</td>
              <td style="text-align:right;">${money(pasting)}</td>
              <td style="text-align:right;">${money(pasting * batchQty)}</td>
            </tr>
            ` : ''}
            ${uv > 0 ? `
            <tr>
              <td><b>Spot / Full UV Coating</b></td>
              <td>UV Enhancement</td>
              <td style="text-align:right;">${money(uv)}</td>
              <td style="text-align:right;">${money(uv * batchQty)}</td>
            </tr>
            ` : ''}
            ${embossed > 0 ? `
            <tr>
              <td><b>Embossing / Debossing</b></td>
              <td>Texture Relief Work</td>
              <td style="text-align:right;">${money(embossed)}</td>
              <td style="text-align:right;">${money(embossed * batchQty)}</td>
            </tr>
            ` : ''}
            ${other > 0 ? `
            <tr>
              <td><b>Other Job Work</b></td>
              <td>Auxiliary Finishing</td>
              <td style="text-align:right;">${money(other)}</td>
              <td style="text-align:right;">${money(other * batchQty)}</td>
            </tr>
            ` : ''}
            ${wastage > 0 ? `
            <tr>
              <td><b>Wastage & Setup Allowance</b></td>
              <td>${wastage}% allowance</td>
              <td style="text-align:right;">${money(wastageCost)}</td>
              <td style="text-align:right;">${money(wastageCost * batchQty)}</td>
            </tr>
            ` : ''}
            <tr class="total-row">
              <td colspan="2">Net Production Cost</td>
              <td style="text-align:right;">${money(cost)}</td>
              <td style="text-align:right;">${money(cost * batchQty)}</td>
            </tr>
            <tr class="sale-row">
              <td colspan="2">FINAL QUOTATION PRICE (Inc. ${profit}% Margin)</td>
              <td style="text-align:right;">${money(finalPrice)}</td>
              <td style="text-align:right;">${money(batchTotalPrice)}</td>
            </tr>
          </tbody>
        </table>

        <div style="margin-top:1.5rem; font-size:0.75rem; color:#64748b; border-top:1px dashed #cbd5e1; padding-top:10px;">
          <div><b>Terms & Conditions:</b></div>
          <div>1. Quotation valid for 15 days from date of issue.</div>
          <div>2. 50% advance payment with purchase order, balance on delivery.</div>
          <div>3. GST and transportation extra as applicable.</div>
        </div>
      </div>
    `;
  }

  modal.classList.add('active');
}

function closeQuotationModal() {
  const modal = document.getElementById('quotationModal');
  if (modal) modal.classList.remove('active');
}

function printQuotation() {
  window.print();
}

function copyQuoteToClipboard() {
  const sl = n('sl'), sw = n('sw'), gsm = n('gsm'), pr = n('paperRate');
  const lamType = document.getElementById('lamType').value;
  const leafType = document.getElementById('leafType').value;
  const batchQty = n('batchQty') || 1000;
  const cost = document.getElementById('total').textContent;
  const finalPrice = document.getElementById('final').textContent;
  const batchTotal = document.getElementById('batchTotalPrice').textContent;

  const quoteText = `📄 *PRINTING QUOTATION*\n` +
    `--------------------------------\n` +
    `📐 Sheet: ${sl}" × ${sw}" | ${gsm} GSM (Rate: ₹${pr}/Kg)\n` +
    `✨ Lamination: ${lamType}\n` +
    (leafType !== 'None' ? `🌟 Leaf / Foil: ${leafType}\n` : '') +
    `📦 Quantity: ${batchQty.toLocaleString('en-IN')} Sheets\n` +
    `--------------------------------\n` +
    `💵 Cost / Sheet: ${cost}\n` +
    `🏷️ *Final Price / Sheet: ${finalPrice}*\n` +
    `💰 *Total Job Amount: ${batchTotal}*\n` +
    `--------------------------------\n` +
    `Generated via Complete Printing Cost Calculator Pro`;

  navigator.clipboard.writeText(quoteText).then(() => {
    showToast('Quotation text copied to clipboard!');
  }).catch(() => {
    showToast('Failed to copy');
  });
}

function shareWhatsApp() {
  const sl = n('sl'), sw = n('sw'), gsm = n('gsm');
  const lamType = document.getElementById('lamType').value;
  const leafType = document.getElementById('leafType').value;
  const batchQty = n('batchQty') || 1000;
  const finalPrice = document.getElementById('final').textContent;
  const batchTotal = document.getElementById('batchTotalPrice').textContent;

  const msg = `*Printing Cost Estimate*\n` +
    `Sheet: ${sl}x${sw} inch (${gsm} GSM)\n` +
    `Lamination: ${lamType}\n` +
    (leafType !== 'None' ? `Leaf / Foil: ${leafType}\n` : '') +
    `Quantity: ${batchQty} sheets\n` +
    `*Unit Rate:* ${finalPrice} / sheet\n` +
    `*Total Job Price:* ${batchTotal}`;

  const url = `https://wa.me/?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('calc_theme', newTheme);
  
  const icon = document.getElementById('themeIcon');
  if (icon) icon.textContent = newTheme === 'light' ? '🌙' : '☀️';
}

document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('calc_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  const icon = document.getElementById('themeIcon');
  if (icon) icon.textContent = savedTheme === 'light' ? '🌙' : '☀️';

  const allInputs = document.querySelectorAll('input, select');
  allInputs.forEach(input => {
    input.addEventListener('input', calculate);
    input.addEventListener('change', calculate);
  });

  calculate();
});
