
function extractCleanPhoneNumber(phoneStr) {
  if (!phoneStr) return '';
  let digits = String(phoneStr).replace(/\D/g, '');
  if (!digits) return '';
  if (digits.length === 10) {
    return '91' + digits;
  }
  if (digits.length === 11 && digits.startsWith('0')) {
    return '91' + digits.substring(1);
  }
  if (digits.length === 12 && digits.startsWith('91')) {
    return digits;
  }
  if (digits.length > 10 && !digits.startsWith('91')) {
    return digits;
  }
  return digits;
}


function handleJobTypeInput(val) {
  setCustomPresetActive();
  calculate();
}

function clearJobType() {
  const input = document.getElementById('jobType');
  if (input) {
    input.value = '';
    input.focus();
  }
  setCustomPresetActive();
  calculate();
}

// Complete Printing Cost Calculator Web Application Engine





// Preserving the Exact Mathematical Algorithm with 100% Precision





// Full Bidirectional Sync for Dropdowns, Divisor Chips & Inputs











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











// Main Calculation Engine (Strictly preserves user's exact mathematical equations)





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











  // 3. Leaf / Foil (Lamination style formula): (Length * Width / Divide By) = Paise -> Rupees + Block





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











  // Margin & Final Sale Price





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





      leafCostEl.textContent = `${leafPaise.toFixed(2)}p (${money(totalLeafPerSheet)})`;





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





  syncActiveChips();





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











// -------------------------------------------------------------





// Bidirectional Handlers for Dropdowns & Chips





// -------------------------------------------------------------











// Dropdown Change: When user selects Lamination type from dropdown





function handleLamTypeChange() {





  const lamType = document.getElementById('lamType').value;





  const divideEl = document.getElementById('divide');











  if (lamType === 'Gloss') {





    divideEl.value = 2.5;





  } else if (lamType === 'Matt') {





    divideEl.value = 2.2;





  } else if (lamType === 'Velvet') {





    divideEl.value = 1.8;





  } else if (lamType === 'Thermal') {





    divideEl.value = 2.0;





  }











  calculate();





}











// Dropdown Change: When user selects Leaf/Foil type from dropdown





function handleLeafTypeChange() {





  const leafType = document.getElementById('leafType').value;





  const leafDivideEl = document.getElementById('leafDivide');











  if (leafType === 'Gold Foil' || leafType === 'Silver Foil' || leafType === 'Copper Foil' || leafType === 'Red Foil') {





    leafDivideEl.value = 2.5;





  } else if (leafType === 'Rose Gold') {





    leafDivideEl.value = 2.2;





  } else if (leafType === 'Holographic') {





    leafDivideEl.value = 2.0;





  }











  calculate();





}











// Chip Click: When user clicks Lamination chip below





function setLaminationDivider(val, name) {





  document.getElementById('divide').value = val;





  if (name) {





    document.getElementById('lamType').value = name;





  }





  calculate();





}











// Chip Click: When user clicks Leaf chip below





function setLeafDivider(val, name) {





  document.getElementById('leafDivide').value = val;





  if (name) {





    document.getElementById('leafType').value = name;





  }





  calculate();





}











// Quick Sheet Size Selector





function setSheetSize(sl, sw) {





  document.getElementById('sl').value = sl;





  document.getElementById('sw').value = sw;





  calculate();





}











// Quick Batch Pill





function setBatchQty(qty) {





  document.getElementById('batchQty').value = qty;





  calculate();





}











// Dynamic Chip Highlighting (Keeps UI fully in sync with current state)





function syncActiveChips() {





  const sl = n('sl'), sw = n('sw');





  const gsm = n('gsm');





  const paperRate = n('paperRate');





  const lamType = document.getElementById('lamType')?.value;





  const divide = n('divide');





  const leafType = document.getElementById('leafType')?.value;





  const leafDivide = n('leafDivide');





  const leafBlock = n('leafBlock');





  const printing = n('printing');





  const plates = n('plates');





  const die = n('die');





  const dieCharges = n('dieCharges');





  const wastage = n('wastage');





  const profit = n('profit');





  const batchQty = n('batchQty');











  // Sheet Size chips





  document.querySelectorAll('[data-chip-type="size"]').forEach(btn => {





    const bSl = parseFloat(btn.getAttribute('data-sl'));





    const bSw = parseFloat(btn.getAttribute('data-sw'));





    btn.classList.toggle('active', (sl === bSl && sw === bSw) || (sl === bSw && sw === bSl));





  });











  // GSM chips





  document.querySelectorAll('[data-chip-type="gsm"]').forEach(btn => {





    btn.classList.toggle('active', gsm === parseFloat(btn.getAttribute('data-val')));





  });











  // Paper Rate chips





  document.querySelectorAll('[data-chip-type="paperRate"]').forEach(btn => {





    btn.classList.toggle('active', paperRate === parseFloat(btn.getAttribute('data-val')));





  });











  // Lamination Factor chips





  document.querySelectorAll('[data-chip-type="lamFactor"]').forEach(btn => {





    const bName = btn.getAttribute('data-name');





    const bVal = parseFloat(btn.getAttribute('data-val'));





    btn.classList.toggle('active', lamType === bName && Math.abs(divide - bVal) < 0.01);





  });











  // Leaf Factor chips





  document.querySelectorAll('[data-chip-type="leafFactor"]').forEach(btn => {





    const bName = btn.getAttribute('data-name');





    const bVal = parseFloat(btn.getAttribute('data-val'));





    btn.classList.toggle('active', leafType === bName && Math.abs(leafDivide - bVal) < 0.01);





  });











  // Leaf Block chips





  document.querySelectorAll('[data-chip-type="leafBlock"]').forEach(btn => {





    btn.classList.toggle('active', leafBlock === parseFloat(btn.getAttribute('data-val')));





  });











  // Printing chips





  document.querySelectorAll('[data-chip-type="printing"]').forEach(btn => {





    btn.classList.toggle('active', Math.abs(printing - parseFloat(btn.getAttribute('data-val'))) < 0.01);





  });











  // Plates chips





  document.querySelectorAll('[data-chip-type="plates"]').forEach(btn => {





    btn.classList.toggle('active', plates === parseFloat(btn.getAttribute('data-val')));





  });











  // Die Cutting chips





  document.querySelectorAll('[data-chip-type="die"]').forEach(btn => {





    btn.classList.toggle('active', Math.abs(die - parseFloat(btn.getAttribute('data-val'))) < 0.01);





  });











  // Die Charges chips





  document.querySelectorAll('[data-chip-type="dieCharges"]').forEach(btn => {





    btn.classList.toggle('active', dieCharges === parseFloat(btn.getAttribute('data-val')));





  });











  // Wastage chips





  document.querySelectorAll('[data-chip-type="wastage"]').forEach(btn => {





    btn.classList.toggle('active', wastage === parseFloat(btn.getAttribute('data-val')));





  });











  // Margin chips





  document.querySelectorAll('[data-chip-type="profit"]').forEach(btn => {





    btn.classList.toggle('active', profit === parseFloat(btn.getAttribute('data-val')));





  });











  // Batch pills





  document.querySelectorAll('.batch-pill').forEach(btn => {





    const bQty = parseFloat(btn.getAttribute('data-qty'));





    btn.classList.toggle('active', batchQty === bQty);





  });





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











function setCustomPresetActive() {
  document.querySelectorAll('.preset-chip').forEach(el => el.classList.remove('active'));
  const customChip = document.getElementById('preset-custom');
  if (customChip) customChip.classList.add('active');
}

function loadPreset(key) {
  if (key === 'custom') {
    setCustomPresetActive();
    calculate();
    showToast('✏️ Custom mode active: Type any value directly!');
    return;
  }
  const p = PRESETS[key];
  const jobTypeInput = document.getElementById('jobType');
  if (jobTypeInput && p) {
    const titles = { sweetBox: 'Sweet Box Packaging', visitingCard: 'Visiting Card Sheet', monocarton: 'Monocarton Box', bookCover: 'Book Cover', flyer: 'Flyer / Brochure' };
    jobTypeInput.value = titles[key] || 'Custom Job';
  }





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











  document.querySelectorAll('.preset-chip').forEach(el => el.classList.remove('active'));











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











// ============================================================

// A S PRINT GALLERY - OFFICIAL BILLING, INVOICE & HISTORY SYSTEM

// ============================================================



let currentQuoteMode = 'customer';



function getNextInvoiceNumber() {

  let seq = parseInt(localStorage.getItem('as_next_invoice_seq') || '77', 10);

  if (isNaN(seq) || seq <= 0) seq = 77;

  return String(seq).padStart(3, '0');

}



function incrementNextInvoiceNumber() {

  let seq = parseInt(localStorage.getItem('as_next_invoice_seq') || '77', 10);

  if (isNaN(seq) || seq <= 0) seq = 77;

  localStorage.setItem('as_next_invoice_seq', String(seq + 1));

}



function updateSavedCountBadge() {

  const history = getSavedInvoicesList();

  const badge = document.getElementById('savedCountBadge');

  if (badge) badge.textContent = history.length;

}



function getSavedInvoicesList() {

  try {

    return JSON.parse(localStorage.getItem('as_saved_invoices') || '[]');

  } catch(e) {

    return [];

  }

}



function setQuoteMode(mode) {

  currentQuoteMode = mode;

  const custBtn = document.getElementById('modeCustomerBtn');

  const internBtn = document.getElementById('modeInternalBtn');

  if (custBtn && internBtn) {

    if (mode === 'customer') {

      custBtn.classList.add('active');

      internBtn.classList.remove('active');

    } else {

      custBtn.classList.remove('active');

      internBtn.classList.add('active');

    }

  }

  renderQuotationPreview();

}



function openQuotationModal() {

  const modal = document.getElementById('quotationModal');

  if (modal) {

    // Populate default invoice number and date if empty

    const invInput = document.getElementById('invoiceNoInput');

    if (invInput && !invInput.value) {

      invInput.value = getNextInvoiceNumber();

    }

    const dateInput = document.getElementById('invoiceDateInput');

    if (dateInput && !dateInput.value) {

      dateInput.value = new Date().toLocaleDateString('en-IN', {

        day: '2-digit',

        month: 'short',

        year: 'numeric'

      });

    }



    updateSavedCountBadge();

    renderQuotationPreview();

    modal.classList.add('active');

  }

}



function closeQuotationModal() {

  const modal = document.getElementById('quotationModal');

  if (modal) modal.classList.remove('active');

}



function handleGstTypeChange() {

  const type = document.getElementById('quoteGstType')?.value || 'cgst_sgst';

  const percentInput = document.getElementById('quoteGstPercentInput');

  if (type === 'exempt') {

    if (percentInput) percentInput.value = '0';

  } else if (type === 'extra') {

    if (percentInput) percentInput.value = '18';

  } else {

    if (percentInput && (percentInput.value === '0' || !percentInput.value)) {

      percentInput.value = '18';

    }

  }

  renderQuotationPreview();

}



function handleUnitChange() {

  const unit = document.getElementById('billingUnitSelect')?.value || 'NOS';

  const sl = n('sl'), sw = n('sw'), gsm = n('gsm');

  const batchQty = n('batchQty') || 1000;

  

  const areaM2 = sl * sw * 0.00064516;

  const singleWeightKg = (areaM2 * gsm) / 1000;

  const totalWeightKg = singleWeightKg * batchQty;

  

  const qtyInput = document.getElementById('customBillingQty');

  const rateInput = document.getElementById('customBillingRate');



  if (unit === 'KGS') {

    if (qtyInput && totalWeightKg > 0) {

      qtyInput.value = totalWeightKg.toFixed(2);

    }

  }

  renderQuotationPreview();

}



function numberToIndianWords(num) {

  if (!num || isNaN(num) || num <= 0) return 'ZERO RUPEES ONLY';

  num = Math.round(num * 100) / 100;

  const a = ['', 'ONE ', 'TWO ', 'THREE ', 'FOUR ', 'FIVE ', 'SIX ', 'SEVEN ', 'EIGHT ', 'NINE ', 'TEN ', 'ELEVEN ', 'TWELVE ', 'THIRTEEN ', 'FOURTEEN ', 'FIFTEEN ', 'SIXTEEN ', 'SEVENTEEN ', 'EIGHTEEN ', 'NINETEEN '];

  const b = ['', '', 'TWENTY ', 'THIRTY ', 'FORTY ', 'FIFTY ', 'SIXTY ', 'SEVENTY ', 'EIGHTY ', 'NINETY '];



  function inWords(n) {

    let str = '';

    if (n >= 10000000) {

      str += inWords(Math.floor(n / 10000000)) + 'CRORE ';

      n %= 10000000;

    }

    if (n >= 100000) {

      str += inWords(Math.floor(n / 100000)) + 'LAKH ';

      n %= 100000;

    }

    if (n >= 1000) {

      str += inWords(Math.floor(n / 1000)) + 'THOUSAND ';

      n %= 1000;

    }

    if (n >= 100) {

      str += inWords(Math.floor(n / 100)) + 'HUNDRED ';

      n %= 100;

    }

    if (n > 0) {

      if (str !== '') str += 'AND ';

      if (n < 20) str += a[n];

      else str += b[Math.floor(n / 10)] + a[n % 10];

    }

    return str;

  }



  const integerPart = Math.floor(num);

  const decimalPart = Math.round((num - integerPart) * 100);



  let result = inWords(integerPart).trim() + ' RUPEES';

  if (decimalPart > 0) {

    result += ' AND ' + inWords(decimalPart).trim() + ' PAISA';

  }

  return (result + ' ONLY').toUpperCase();

}



function renderQuotationPreview() {
  const docTitle = document.getElementById('docTitleSelect')?.value || 'ESTIMATION / QUOTATION';
  const invoiceNo = document.getElementById('invoiceNoInput')?.value || getNextInvoiceNumber();
  const invoiceDate = document.getElementById('invoiceDateInput')?.value || new Date().toLocaleDateString('en-IN', {
    day: '2-digit', month: '2-digit', year: 'numeric'
  });

  const companyGstin = '09AWKPN5910E1ZG';
  const companyMobiles = '9911678386, 8851627221';
  const companyName = 'A S PRINT GALLERY';
  const companyMfd = 'Mfd. by : Hang Tag, Printed Label, Barcode Sticker, Packaging Box, Paper Bag, Corrugated Box';
  const companyAddress = 'Kh.no.2326/2, Shankar Garden, Ashok Vihar, Loni, Ghaziabad, (U.P) 201102';

  const clientName = document.getElementById('clientNameInput')?.value || 'M/S MOHIT KUMAR';
  const clientAddress = document.getElementById('clientAddressInput')?.value || 'KHEKRA, BAGHPAT, U.P.';
  const clientState = document.getElementById('clientStateInput')?.value || 'Uttar Pradesh (09)';
  const clientPhone = document.getElementById('clientPhoneInput')?.value || '7037442527';
  const clientGstin = document.getElementById('clientGstinInput')?.value || '';
  
  const transportMode = document.getElementById('transportModeInput')?.value || 'Direct Dispatch / By Hand';
  const vehicleNo = document.getElementById('vehicleNoInput')?.value || '-';

  const jobTitle = document.getElementById('jobTitleInput')?.value || 'PRINTED PACKAGING BOX';
  const hsn = document.getElementById('hsnInput')?.value || '4819';
  const billingUnit = document.getElementById('billingUnitSelect')?.value || 'NOS';
  const customDesc = document.getElementById('customItemDescInput')?.value?.trim() || '';

  const sl = n('sl'), sw = n('sw'), gsm = n('gsm'), pr = n('paperRate');
  const ll = n('ll'), lw = n('lw'), d = n('divide');
  const lamType = document.getElementById('lamType')?.value || 'None';

  const leafL = n('leafL'), leafW = n('leafW'), leafDivide = n('leafDivide');
  const leafType = document.getElementById('leafType')?.value || 'None';
  const leafBlock = n('leafBlock');

  const calcBatchQty = n('batchQty') || 1000;

  // Paper Weight & Cost
  const areaM2 = sl * sw * 0.00064516;
  const weightKg = (areaM2 * gsm) / 1000;
  const paperCost = weightKg * pr;
  const totalWeightAllSheets = weightKg * calcBatchQty;

  // Lamination
  let lamPaise = (d && lamType !== 'None') ? (ll * lw / d) : 0;
  const lamCost = lamPaise / 100;

  // Leaf Foil
  let leafPaise = (leafDivide && leafType !== 'None') ? (leafL * leafW / leafDivide) : 0;
  const leafCost = leafPaise / 100;
  const leafBlockPerSheet = calcBatchQty > 0 ? (leafBlock / calcBatchQty) : 0;
  const totalLeafPerSheet = leafCost + leafBlockPerSheet;

  // Printing & Plates
  const printing = n('printing');
  const plates = n('plates');
  const plateCostPerSheet = calcBatchQty > 0 ? (plates / calcBatchQty) : 0;
  const totalPrintingPerSheet = printing + plateCostPerSheet;

  // Die & Die Charges
  const die = n('die');
  const dieCharges = n('dieCharges');
  const dieCostPerSheet = calcBatchQty > 0 ? (dieCharges / calcBatchQty) : 0;
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
  const calcFinalPricePerSheet = cost + profitAmount;

  // Manual Billing Qty & Rate overrides
  let billQty = parseFloat(document.getElementById('customBillingQty')?.value);
  if (isNaN(billQty) || billQty <= 0) {
    billQty = (billingUnit === 'KGS' && totalWeightAllSheets > 0) ? parseFloat(totalWeightAllSheets.toFixed(2)) : calcBatchQty;
  }

  let billRate = parseFloat(document.getElementById('customBillingRate')?.value);
  if (isNaN(billRate) || billRate <= 0) {
    if (billingUnit === 'KGS') {
      billRate = (totalWeightAllSheets > 0) ? (calcFinalPricePerSheet * calcBatchQty / totalWeightAllSheets) : calcFinalPricePerSheet;
    } else {
      billRate = calcFinalPricePerSheet;
    }
  }

  const taxableTotal = billQty * billRate;

  // GST Calculations
  const gstType = document.getElementById('quoteGstType')?.value || 'cgst_sgst';
  const gstRatePercent = parseFloat(document.getElementById('quoteGstPercentInput')?.value) || 0;
  const reverseCharge = document.getElementById('reverseChargeSelect')?.value || 'No';

  let cgstRate = 0, cgstAmt = 0;
  let sgstRate = 0, sgstAmt = 0;
  let igstRate = 0, igstAmt = 0;

  if (gstType === 'cgst_sgst' && gstRatePercent > 0) {
    const half = gstRatePercent / 2;
    cgstRate = half;
    cgstAmt = (taxableTotal * half) / 100;
    sgstRate = half;
    sgstAmt = (taxableTotal * half) / 100;
  } else if (gstType === 'igst' && gstRatePercent > 0) {
    igstRate = gstRatePercent;
    igstAmt = (taxableTotal * gstRatePercent) / 100;
  }

  const totalTaxAmount = cgstAmt + sgstAmt + igstAmt;
  const grandTotal = Math.round(taxableTotal + totalTaxAmount);
  const wordsText = numberToIndianWords(grandTotal);
  const taxWordsText = totalTaxAmount > 0 ? numberToIndianWords(Math.round(totalTaxAmount)) : 'Zero Rupees Only';

  const previewEl = document.getElementById('quotationPreview');
  if (!previewEl) return;

  // Construct auto-specs if custom description is empty
  let displayDesc = customDesc;
  if (!displayDesc) {
    const specs = [];
    if (sl && sw) specs.push(`Material: ${sl}" × ${sw}" | ${gsm} GSM Board`);
    specs.push(`Printing: Multi-Color High-Definition Offset`);
    if (lamType && lamType !== 'None') specs.push(`Lamination: ${lamType}`);
    if (leafType && leafType !== 'None') specs.push(`Foil: ${leafType} Leaf`);
    if (die > 0 || dieCharges > 0) specs.push(`Die-Cutting & Creasing`);
    if (pasting > 0) specs.push(`Fabrication`);
    if (uv > 0) specs.push(`UV Coating`);
    if (embossed > 0) specs.push(`Embossing`);
    displayDesc = specs.join(' | ');
  }

  let emptyRowsHtml = '';
  for (let i = 0; i < 9; i++) {
    emptyRowsHtml += `
      <tr style="height:32px;">
        <td style="text-align:center; color:#cbd5e1; font-weight:bold;">${i + 2}</td>
        <td></td><td></td><td></td><td></td><td></td>
      </tr>
    `;
  }

  previewEl.innerHTML = `
    <div class="billbook-container" id="printableQuotation">
      
      <!-- Top Section: Header, Branding, Receiver -->
      <div class="bill-top-section">
        <!-- Top Bar: GSTIN | TITLE | MOBILES -->
        <div class="bill-top-bar">
          <div>GSTIN. ${companyGstin}</div>
          <div class="bill-doc-title">${docTitle}</div>
          <div style="text-align:right; font-size:11px; font-weight:bold;">M.: ${companyMobiles}</div>
        </div>

        <!-- Main Header: Brand & Address -->
        <div class="bill-header-center">
          <div class="bill-brand-name">
            <img src="assets/images/logo.png" alt="Logo" class="bill-brand-logo" onerror="this.style.display='none'">
            <span>${companyName}</span>
          </div>
          <div class="bill-mfd-tag">${companyMfd}</div>
          <div class="bill-address-tag">${companyAddress}</div>
        </div>

        <!-- Invoice No & Date Bar -->
        <div class="bill-meta-bar">
          <div><b>Quotation / Doc No. :</b> <span style="font-size:14px; font-weight:900; margin-left:4px;">${invoiceNo}</span></div>
          <div style="text-align:right;"><b>Date :</b> <span style="margin-left:4px;">${invoiceDate}</span></div>
        </div>

        <!-- Receiver & Transport Grid -->
        <div class="bill-parties-grid">
          <div class="bill-party-box">
            <div class="bill-party-title">DETAILS OF RECEIVER (QUOTED TO)</div>
            <div class="bill-field-row">
              <span class="bill-field-lbl">Name :</span>
              <span class="bill-field-val" style="font-weight:bold; font-size:12.5px;">${clientName}</span>
            </div>
            <div class="bill-field-row">
              <span class="bill-field-lbl">Address :</span>
              <span class="bill-field-val">${clientAddress}</span>
            </div>
            <div class="bill-field-row">
              <span class="bill-field-lbl">State :</span>
              <span class="bill-field-val">${clientState}</span>
            </div>
            <div class="bill-field-row">
              <span class="bill-field-lbl">GSTIN / Phone :</span>
              <span class="bill-field-val" style="font-weight:bold;">${[clientGstin, (clientPhone ? ('Mob: ' + clientPhone) : '')].filter(Boolean).join(' | ') || '-'}</span>
            </div>
          </div>

          <div class="bill-party-box right">
            <div class="bill-field-row">
              <span class="bill-field-lbl">Transportation Mode :</span>
              <span class="bill-field-val">${transportMode}</span>
            </div>
            <div class="bill-field-row">
              <span class="bill-field-lbl">Vehicle Number :</span>
              <span class="bill-field-val">${vehicleNo || '-'}</span>
            </div>
            <div class="bill-field-row">
              <span class="bill-field-lbl">Date Of Supply :</span>
              <span class="bill-field-val">${invoiceDate}</span>
            </div>
            <div class="bill-field-row">
              <span class="bill-field-lbl">Place Of Supply :</span>
              <span class="bill-field-val">${clientState}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Middle Fill Section: Table & Financial Breakdown -->
      <div class="bill-middle-fill">
        <!-- Goods / Item Table -->
        <table class="bill-items-table">
          <thead>
            <tr>
              <th style="width:38px;">S.No.</th>
              <th style="text-align:left;">DESCRIPTION OF GOODS</th>
              <th style="width:80px;">HSN CODE</th>
              <th style="width:95px;">QTY.</th>
              <th style="width:80px; text-align:right;">RATE</th>
              <th style="width:105px; text-align:right;">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="text-align:center; font-weight:bold; width:38px;">1</td>
              <td>
                <div class="bill-item-main-title">${jobTitle}</div>
                <div class="bill-item-sub-desc">${displayDesc}</div>
              </td>
              <td style="text-align:center; font-weight:bold; width:80px;">${hsn || '-'}</td>
              <td style="text-align:center; font-weight:bold; width:95px;">${billQty.toLocaleString('en-IN')} ${billingUnit}</td>
              <td style="text-align:right; width:80px;">${billRate.toFixed(2)}</td>
              <td style="text-align:right; font-weight:bold; width:105px;">${taxableTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            </tr>
            ${emptyRowsHtml}

            <!-- Compact 2-Line Summary & Tax Section -->
            <tr class="bill-summary-row" style="background:#fafafa;">
              <td colspan="4" style="border-right:1.5px solid #000; font-size:10.5px; padding:3px 6px;">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:4px;">
                  <span><b>Reverse Charge:</b> Yes [ ${reverseCharge === 'Yes' ? '✓' : ' '} ] &nbsp; No [ ${reverseCharge === 'No' ? '✓' : ' '} ]</span>
                  <span style="font-weight:bold; color:#0f172a;">
                    ${cgstAmt > 0 ? `CGST (${cgstRate}%): ₹${cgstAmt.toFixed(2)} &nbsp;|&nbsp; SGST (${sgstRate}%): ₹${sgstAmt.toFixed(2)} &nbsp;|&nbsp; Total Tax: ₹${totalTaxAmount.toFixed(2)}` : (igstAmt > 0 ? `IGST (${igstRate}%): ₹${igstAmt.toFixed(2)}` : 'GST: Nil / Exempt')}
                  </span>
                </div>
              </td>
              <td style="text-align:right; font-weight:bold; font-size:10.5px; padding:3px 6px;">Total Before Tax</td>
              <td style="text-align:right; font-weight:bold; font-size:11px; padding:3px 6px;">${taxableTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            </tr>

            <!-- Final Grand Total Row -->
            <tr class="bill-total-final-row">
              <td colspan="4" style="border-right:1.5px solid #000; font-weight:bold; font-size:10.5px; padding:4px 6px;">
                GST on Reverse Charge: ₹0.00
              </td>
              <td style="text-align:right; font-size:11.5px; font-weight:900; padding:4px 6px; white-space:nowrap;">Total Amount After Tax</td>
              <td style="text-align:right; font-size:12.5px; font-weight:900; padding:4px 6px;">₹${grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            </tr>
          </tbody>
        </table>

        <!-- Amount In Words Box -->
        <div class="bill-words-section">
          <div style="margin-bottom:3px;">
            <b>Total Amount in Words :</b> <span style="text-transform:capitalize; font-weight:bold; margin-left:4px;">${wordsText}</span>
          </div>
          <div>
            <b>Tax Amount in Words :</b> <span style="text-transform:capitalize; margin-left:4px;">${taxWordsText}</span>
          </div>
        </div>
      </div>

      <!-- Bottom Section: Terms, Bank Details & Signature -->
      <div class="bill-footer-section">
        <div class="bill-terms-box">
          <div style="font-weight:bold; text-decoration:underline; margin-bottom:3px;">Terms &amp; Conditions:</div>
          <div>1. Goods once sold will not be taken back.</div>
          <div>2. Interest @ 18% p.a. will be charged after due date.</div>
          <div>3. All disputes subject to Ghaziabad Jurisdiction only.</div>
        </div>

        <div class="bill-bank-box">
          <div style="font-weight:bold; text-decoration:underline; margin-bottom:3px;">Bank Details:</div>
          <div>Bank : <b>HDFC BANK</b></div>
          <div>A/c No. : <b>50200098986238</b></div>
          <div>IFSC : <b>HDFC0004729</b></div>
          <div>Branch : <b>LONI GHAZIABAD</b></div>
        </div>

        <div class="bill-sign-box">
          <div style="font-weight:bold; font-size:11px;">For ${companyName}</div>
          <div style="font-size:10px; margin-top:28px;">Authorised Signatory</div>
        </div>
      </div>

    </div>
  `;
}

function saveCurrentInvoice() {

  const docTitle = document.getElementById('docTitleSelect')?.value || 'TAX INVOICE';

  const invoiceNo = document.getElementById('invoiceNoInput')?.value || getNextInvoiceNumber();

  const invoiceDate = document.getElementById('invoiceDateInput')?.value || new Date().toLocaleDateString('en-IN');

  const clientName = document.getElementById('clientNameInput')?.value || 'Valued Client';

  const jobTitle = document.getElementById('jobTitleInput')?.value || 'Job Work';

  const billingUnit = document.getElementById('billingUnitSelect')?.value || 'NOS';

  const customQty = document.getElementById('customBillingQty')?.value || '1000';

  const customRate = document.getElementById('customBillingRate')?.value || '0';



  const history = getSavedInvoicesList();

  

  const record = {

    id: Date.now(),

    invoiceNo: invoiceNo,

    docTitle: docTitle,

    invoiceDate: invoiceDate,

    clientName: clientName,

    clientAddress: document.getElementById('clientAddressInput')?.value || '',

    clientState: document.getElementById('clientStateInput')?.value || '',

    clientGstin: document.getElementById('clientGstinInput')?.value || '',

    transportMode: document.getElementById('transportModeInput')?.value || '',

    vehicleNo: document.getElementById('vehicleNoInput')?.value || '',

    jobTitle: jobTitle,

    hsn: document.getElementById('hsnInput')?.value || '4819',

    billingUnit: billingUnit,

    customQty: customQty,

    customRate: customRate,

    customDesc: document.getElementById('customItemDescInput')?.value || '',

    gstType: document.getElementById('quoteGstType')?.value || 'cgst_sgst',

    gstRate: document.getElementById('quoteGstPercentInput')?.value || '18',

    reverseCharge: document.getElementById('reverseChargeSelect')?.value || 'No'

  };



  // Check if invoice with same number already exists, update or add

  const existingIdx = history.findIndex(item => item.invoiceNo === invoiceNo);

  if (existingIdx >= 0) {

    history[existingIdx] = record;

  } else {

    history.unshift(record);

  }



  localStorage.setItem('as_saved_invoices', JSON.stringify(history));

  incrementNextInvoiceNumber();

  

  // Set next number in input for convenience

  const invInput = document.getElementById('invoiceNoInput');

  if (invInput) invInput.value = getNextInvoiceNumber();



  updateSavedCountBadge();

  showToast(`Bill #${invoiceNo} saved successfully!`);

}



function openHistoryModal() {

  const modal = document.getElementById('invoiceHistoryModal');

  if (modal) {

    renderHistoryTable();

    modal.classList.add('active');

  }

}



function closeHistoryModal() {

  const modal = document.getElementById('invoiceHistoryModal');

  if (modal) modal.classList.remove('active');

}



function renderHistoryTable(filterText = '') {

  const container = document.getElementById('historyTableContainer');

  if (!container) return;



  const history = getSavedInvoicesList();

  const filtered = filterText ? history.filter(item => {

    const q = filterText.toLowerCase();

    return (item.invoiceNo && item.invoiceNo.toLowerCase().includes(q)) ||

           (item.clientName && item.clientName.toLowerCase().includes(q)) ||

           (item.jobTitle && item.jobTitle.toLowerCase().includes(q)) ||

           (item.docTitle && item.docTitle.toLowerCase().includes(q));

  }) : history;



  if (filtered.length === 0) {

    container.innerHTML = `

      <div style="padding:2rem; text-align:center; color:var(--text-muted);">

        <div style="font-size:2rem; margin-bottom:8px;">📭</div>

        <div>No saved invoices found. Click <b>"Save Invoice"</b> to store bills!</div>

      </div>

    `;

    return;

  }



  container.innerHTML = `

    <table class="history-table">

      <thead>

        <tr>

          <th>Bill No.</th>

          <th>Date</th>

          <th>Type</th>

          <th>Customer (Billed To)</th>

          <th>Item / Job</th>

          <th style="text-align:center;">Actions</th>

        </tr>

      </thead>

      <tbody>

        ${filtered.map(item => `

          <tr>

            <td><b>#${item.invoiceNo}</b></td>

            <td>${item.invoiceDate}</td>

            <td><span style="font-size:10px; background:#eef2ff; color:#4338ca; padding:2px 6px; border-radius:4px; font-weight:bold;">${item.docTitle}</span></td>

            <td><b>${item.clientName}</b></td>

            <td>${item.jobTitle}</td>

            <td style="text-align:center;">

              <button class="btn-pill" style="padding:4px 8px; font-size:11px; margin-right:4px;" onclick="loadSavedInvoice(${item.id})">📂 Open</button>

              <button class="btn-pill btn-danger" style="padding:4px 8px; font-size:11px; background:#ef4444; color:#fff;" onclick="deleteSavedInvoice(${item.id})">✕</button>

            </td>

          </tr>

        `).join('')}

      </tbody>

    </table>

  `;

}



function filterHistoryTable() {

  const query = document.getElementById('historySearchInput')?.value || '';

  renderHistoryTable(query);

}



function loadSavedInvoice(id) {

  const history = getSavedInvoicesList();

  const record = history.find(item => item.id === id);

  if (!record) return;



  if (record.docTitle) document.getElementById('docTitleSelect').value = record.docTitle;

  if (record.invoiceNo) document.getElementById('invoiceNoInput').value = record.invoiceNo;

  if (record.invoiceDate) document.getElementById('invoiceDateInput').value = record.invoiceDate;

  if (record.clientName) document.getElementById('clientNameInput').value = record.clientName;

  if (record.clientAddress) document.getElementById('clientAddressInput').value = record.clientAddress;

  if (record.clientState) document.getElementById('clientStateInput').value = record.clientState;

  if (record.clientGstin) document.getElementById('clientGstinInput').value = record.clientGstin;

  if (record.transportMode) document.getElementById('transportModeInput').value = record.transportMode;

  if (record.vehicleNo) document.getElementById('vehicleNoInput').value = record.vehicleNo;

  if (record.jobTitle) document.getElementById('jobTitleInput').value = record.jobTitle;

  if (record.hsn) document.getElementById('hsnInput').value = record.hsn;

  if (record.billingUnit) document.getElementById('billingUnitSelect').value = record.billingUnit;

  if (record.customQty) document.getElementById('customBillingQty').value = record.customQty;

  if (record.customRate) document.getElementById('customBillingRate').value = record.customRate;

  if (record.customDesc !== undefined) document.getElementById('customItemDescInput').value = record.customDesc;

  if (record.gstType) document.getElementById('quoteGstType').value = record.gstType;

  if (record.gstRate) document.getElementById('quoteGstPercentInput').value = record.gstRate;

  if (record.reverseCharge) document.getElementById('reverseChargeSelect').value = record.reverseCharge;



  closeHistoryModal();

  renderQuotationPreview();

  showToast(`Loaded Bill #${record.invoiceNo} for ${record.clientName}`);

}



function deleteSavedInvoice(id) {

  if (!confirm('Are you sure you want to delete this invoice record?')) return;

  let history = getSavedInvoicesList();

  history = history.filter(item => item.id !== id);

  localStorage.setItem('as_saved_invoices', JSON.stringify(history));

  renderHistoryTable();

  updateSavedCountBadge();

  showToast('Invoice deleted from history');

}



function clearAllHistory() {

  if (!confirm('Delete all saved invoices history?')) return;

  localStorage.removeItem('as_saved_invoices');

  renderHistoryTable();

  updateSavedCountBadge();

  showToast('All invoice history cleared');

}



function copyQuoteToClipboard() {

  const docTitle = document.getElementById('docTitleSelect')?.value || 'TAX INVOICE';

  const invoiceNo = document.getElementById('invoiceNoInput')?.value || '077';

  const clientName = document.getElementById('clientNameInput')?.value || 'Client';

  const jobTitle = document.getElementById('jobTitleInput')?.value || 'LIFAFA';

  const billingUnit = document.getElementById('billingUnitSelect')?.value || 'NOS';

  const billQty = document.getElementById('customBillingQty')?.value || '1000';

  const billRate = document.getElementById('customBillingRate')?.value || '0';



  const text = `🧾 *${docTitle} #${invoiceNo}*\n` +

    `🏢 *A S PRINT GALLERY*\n` +

    `📍 Ghaziabad, U.P. | 📞 9911678386, 8851627221\n` +

    `--------------------------------\n` +

    `👤 *Billed To:* ${clientName}\n` +

    `📦 *Item / Goods:* ${jobTitle}\n` +

    `🔢 *Quantity:* ${billQty} ${billingUnit}\n` +

    `🏷️ *Rate:* ₹${billRate} / ${billingUnit}\n` +

    `--------------------------------\n` +

    `*GSTIN:* 09AWKPN5910E1ZG\n` +

    `*Bank:* HDFC A/C: 50200098986238 | IFSC: HDFC0004729\n` +

    `Thank you for your business!`;



  navigator.clipboard.writeText(text).then(() => {

    showToast('Bill details copied to clipboard!');

  }).catch(() => {

    showToast('Failed to copy');

  });

}



function shareWhatsApp() {

  const docTitle = document.getElementById('docTitleSelect')?.value || 'TAX INVOICE';

  const invoiceNo = document.getElementById('invoiceNoInput')?.value || '077';

  const clientName = document.getElementById('clientNameInput')?.value || 'Client';

  const jobTitle = document.getElementById('jobTitleInput')?.value || 'LIFAFA';

  const billingUnit = document.getElementById('billingUnitSelect')?.value || 'NOS';

  const billQty = document.getElementById('customBillingQty')?.value || '1000';

  const billRate = document.getElementById('customBillingRate')?.value || '0';



  const msg = `🧾 *${docTitle} #${invoiceNo}*\n` +

    `🏢 *A S PRINT GALLERY*\n` +

    `📍 Ghaziabad, U.P. | 📞 9911678386, 8851627221\n` +

    `--------------------------------\n` +

    `👤 *Billed To:* ${clientName}\n` +

    `📦 *Item / Goods:* ${jobTitle}\n` +

    `🔢 *Quantity:* ${billQty} ${billingUnit}\n` +

    `🏷️ *Rate:* ₹${billRate} / ${billingUnit}\n` +

    `--------------------------------\n` +

    `*GSTIN:* 09AWKPN5910E1ZG\n` +

    `*Bank:* HDFC A/C: 50200098986238 | IFSC: HDFC0004729\n` +

    `Thank you for your business!`;



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











  // Listen to all inputs and selects





  const allInputs = document.querySelectorAll('input, select');





  allInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      setCustomPresetActive();
      calculate();
    });
    input.addEventListener('change', (e) => {
      setCustomPresetActive();
      calculate();
    });
    if (input.tagName === 'INPUT') {
      input.addEventListener('focus', function() {
        this.select();
      });
    }
  });











  // Dedicated Dropdown change listeners for instant factor update





  const lamTypeSelect = document.getElementById('lamType');





  if (lamTypeSelect) {





    lamTypeSelect.addEventListener('change', handleLamTypeChange);





  }











  const leafTypeSelect = document.getElementById('leafType');





  if (leafTypeSelect) {





    leafTypeSelect.addEventListener('change', handleLeafTypeChange);





  }











  calculate();





});







// =========================================================================
// A S PRINT GALLERY - DEDICATED CUSTOM GST BILL & INVOICE STUDIO
// =========================================================================

let invoiceRowCounter = 0;

function getNextInvoiceNumber() {
  let seq = parseInt(localStorage.getItem('as_next_invoice_seq') || '71', 10);
  if (isNaN(seq) || seq <= 0) seq = 71;
  return String(seq).padStart(3, '0');
}

function incrementNextInvoiceNumber() {
  let seq = parseInt(localStorage.getItem('as_next_invoice_seq') || '71', 10);
  if (isNaN(seq) || seq <= 0) seq = 71;
  localStorage.setItem('as_next_invoice_seq', String(seq + 1));
}

function updateSavedCountBadges() {
  try {
    const history = getSavedInvoicesList();
    const count = history.length;
    ['savedCountBadgeNav', 'savedCountBadge2', 'savedCountBadge'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = count;
    });
  } catch (e) {
    console.error(e);
  }
}

function getSavedInvoicesList() {
  try {
    const raw = localStorage.getItem('as_saved_invoices_v3');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

// Indian Currency to Words Conversion
function numberToIndianWords(num) {
  if (isNaN(num) || num === 0) return 'Zero Rupees Only';
  const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  function inWords(n) {
    if ((n = n.toString()).length > 9) return 'Overflow';
    let n_array = ('000000000' + n).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n_array) return '';
    let str = '';
    str += (Number(n_array[1]) !== 0) ? (a[Number(n_array[1])] || b[n_array[1][0]] + ' ' + a[n_array[1][1]]) + 'Crore ' : '';
    str += (Number(n_array[2]) !== 0) ? (a[Number(n_array[2])] || b[n_array[2][0]] + ' ' + a[n_array[2][1]]) + 'Lakh ' : '';
    str += (Number(n_array[3]) !== 0) ? (a[Number(n_array[3])] || b[n_array[3][0]] + ' ' + a[n_array[3][1]]) + 'Thousand ' : '';
    str += (Number(n_array[4]) !== 0) ? (a[Number(n_array[4])] || b[n_array[4][0]] + ' ' + a[n_array[4][1]]) + 'Hundred ' : '';
    str += (Number(n_array[5]) !== 0) ? ((str !== '') ? 'and ' : '') + (a[Number(n_array[5])] || b[n_array[5][0]] + ' ' + a[n_array[5][1]]) : '';
    return str.trim();
  }

  const parts = Number(num).toFixed(2).split('.');
  const whole = inWords(parseInt(parts[0], 10));
  const paise = parseInt(parts[1], 10);
  let res = 'Rupees ' + whole;
  if (paise > 0) {
    res += ' and ' + inWords(paise) + ' Paise';
  }
  return res + ' Only';
}

function handleCustGstTypeChange() {
  const gstType = document.getElementById('custGstType')?.value || 'cgst_sgst';
  const rateInput = document.getElementById('custGstRateInput');
  if (rateInput) {
    if (gstType === 'exempt') {
      rateInput.value = '0';
    } else if (rateInput.value === '0' || !rateInput.value) {
      rateInput.value = '18';
    }
  }
  renderCustomInvoicePreview();
}

function addInvoiceItemRow(data = null) {
  const container = document.getElementById('invoiceItemsBuilder');
  if (!container) return;

  invoiceRowCounter++;
  const rowId = 'itemRow_' + invoiceRowCounter;
  const currentCount = container.querySelectorAll('.invoice-item-row').length + 1;

  const row = document.createElement('div');
  row.className = 'invoice-item-row';
  row.id = rowId;
  row.style.cssText = 'background:var(--bg); border:1px solid var(--border); border-radius:8px; padding:14px; display:flex; flex-direction:column; gap:10px; position:relative; box-shadow:0 2px 5px rgba(0,0,0,0.03);';

  const titleVal = data?.title !== undefined ? data.title : ('PRODUCT ' + currentCount);
  const descVal = data?.desc !== undefined ? data.desc : '';
  const hsnVal = data?.hsn !== undefined ? data.hsn : '58079090';
  const qtyVal = data?.qty !== undefined ? data.qty : 1000;
  const unitVal = data?.unit !== undefined ? data.unit : 'NOS';
  const rateVal = data?.rate !== undefined ? data.rate : 1.00;

  row.innerHTML = `
    <!-- Row Header: S.No & Delete -->
    <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border); padding-bottom:8px;">
      <span class="row-sno-badge" style="font-size:12px; font-weight:800; color:var(--primary); display:flex; align-items:center; gap:6px;">
        <span style="background:var(--primary); color:#fff; width:22px; height:22px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; font-size:11px;">${currentCount}</span>
        Product Details (प्रोडक्ट विवरण)
      </span>
      <button type="button" class="btn-pill btn-danger" style="background:#fee2e2; color:#dc2626; border:1px solid #fca5a5; padding:3px 10px; font-size:11px; font-weight:700;" onclick="removeInvoiceItemRow('${rowId}')" title="Delete this Product">
        ✕ Remove Product
      </button>
    </div>

    <!-- Row Main Fields: Title, HSN, Qty, Unit, Rate, Amount -->
    <div class="invoice-item-fields-grid">
      <div>
        <label style="font-size:11px; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:4px;">Product / Item Title *</label>
        <input type="text" class="item-title-input" placeholder="e.g. HANG TAG / BOX / LABEL" value="${titleVal}" oninput="renderCustomInvoicePreview()" style="font-weight:700; padding:8px 10px; font-size:13px; width:100%; border:1px solid var(--border); border-radius:6px;">
      </div>
      <div>
        <label style="font-size:11px; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:4px;">HSN Code</label>
        <input type="text" class="item-hsn-input" placeholder="58079090" value="${hsnVal}" oninput="renderCustomInvoicePreview()" style="padding:8px 10px; font-size:12px; width:100%; border:1px solid var(--border); border-radius:6px;">
      </div>
      <div>
        <label style="font-size:11px; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:4px;">Qty (मात्रा) *</label>
        <input type="number" step="any" class="item-qty-input" placeholder="1000" value="${qtyVal}" oninput="renderCustomInvoicePreview()" style="padding:8px 10px; font-size:13px; font-weight:700; width:100%; border:1px solid var(--border); border-radius:6px;">
      </div>
      <div>
        <label style="font-size:11px; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:4px;">Unit (इकाई)</label>
        <select class="item-unit-select" onchange="renderCustomInvoicePreview()" style="padding:8px 10px; font-size:12px; width:100%; border:1px solid var(--border); border-radius:6px; background:var(--bg-card);">
          <option value="NOS" ${unitVal === 'NOS' ? 'selected' : ''}>NOS</option>
          <option value="PCS" ${unitVal === 'PCS' ? 'selected' : ''}>PCS</option>
          <option value="SHEETS" ${unitVal === 'SHEETS' ? 'selected' : ''}>SHEETS</option>
          <option value="KGS" ${unitVal === 'KGS' ? 'selected' : ''}>KGS (किलो)</option>
          <option value="BOXES" ${unitVal === 'BOXES' ? 'selected' : ''}>BOXES</option>
          <option value="SETS" ${unitVal === 'SETS' ? 'selected' : ''}>SETS</option>
          <option value="ROLLS" ${unitVal === 'ROLLS' ? 'selected' : ''}>ROLLS</option>
          <option value="MTR" ${unitVal === 'MTR' ? 'selected' : ''}>MTR</option>
        </select>
      </div>
      <div>
        <label style="font-size:11px; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:4px;">Rate (₹) / Unit *</label>
        <input type="number" step="any" class="item-rate-input" placeholder="1.00" value="${rateVal}" oninput="renderCustomInvoicePreview()" style="padding:8px 10px; font-size:13px; font-weight:700; width:100%; border:1px solid var(--border); border-radius:6px;">
      </div>
      <div>
        <label style="font-size:11px; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:4px;">Amount (₹)</label>
        <div class="item-amount-display" style="padding:8px 10px; font-size:13px; font-weight:800; background:var(--bg-card-sub); border:1px solid var(--border); border-radius:6px; color:#1e3a8a; text-align:right;">
          ₹${((parseFloat(qtyVal) || 0) * (parseFloat(rateVal) || 0)).toFixed(2)}
        </div>
      </div>
    </div>

    <!-- Row Description / Size Breakdown Field (Spacious Multi-Line Textarea) -->
    <div>
      <label style="font-size:11px; font-weight:700; color:var(--text-secondary); display:flex; justify-content:space-between; margin-bottom:4px;">
        <span>Description / Size Breakdown (विवरण / साइज़ लिस्ट व विवरण) :</span>
        <span style="font-weight:400; font-size:10px; color:var(--text-muted);">Multiline Breakdown Support (enter sizes/details line by line)</span>
      </label>
      <textarea class="item-desc-input" rows="2" placeholder="e.g.\n32B - 12235\n34B - 10400\n36B - 8480" oninput="renderCustomInvoicePreview()" style="width:100%; font-size:12px; font-family:inherit; padding:8px 10px; border:1px solid var(--border); border-radius:6px; resize:vertical;">${descVal}</textarea>
    </div>
  `;

  container.appendChild(row);
  renumberInvoiceRows();
  renderCustomInvoicePreview();
}

function removeInvoiceItemRow(rowId) {
  const container = document.getElementById('invoiceItemsBuilder');
  if (!container) return;

  const row = document.getElementById(rowId);
  if (row) {
    if (container.children.length > 1) {
      row.remove();
      renumberInvoiceRows();
    } else {
      showToast('⚠️ At least one product item is required.');
    }
  }
  renderCustomInvoicePreview();
}

function renumberInvoiceRows() {
  const container = document.getElementById('invoiceItemsBuilder');
  if (!container) return;
  const rows = container.querySelectorAll('.invoice-item-row');
  rows.forEach((r, idx) => {
    const badge = r.querySelector('.row-sno-badge');
    if (badge) {
      badge.innerHTML = `<span style="background:var(--primary); color:#fff; width:22px; height:22px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; font-size:11px;">${idx + 1}</span> Product #${idx + 1} Details`;
    }
  });
}

function getInvoiceCustomItemsData() {
  const container = document.getElementById('invoiceItemsBuilder');
  const items = [];
  if (container) {
    const rows = container.querySelectorAll('.invoice-item-row');
    rows.forEach(r => {
      const title = r.querySelector('.item-title-input')?.value?.trim() || '';
      const desc = r.querySelector('.item-desc-input')?.value?.trim() || '';
      const hsn = r.querySelector('.item-hsn-input')?.value?.trim() || '58079090';
      const qty = parseFloat(r.querySelector('.item-qty-input')?.value) || 0;
      const unit = r.querySelector('.item-unit-select')?.value || 'NOS';
      const rate = parseFloat(r.querySelector('.item-rate-input')?.value) || 0;
      const amt = qty * rate;

      const amtDisp = r.querySelector('.item-amount-display');
      if (amtDisp) amtDisp.textContent = '₹' + amt.toFixed(2);

      items.push({ title: title || (desc ? '' : 'Product'), desc, hsn, qty, unit, rate, amount: amt });
    });
  }

  // Fallback if empty
  if (items.length === 0) {
    items.push({
      title: 'PRINTED PACKAGING',
      desc: '32B - 12235\n34B - 10400\n36B - 8480',
      hsn: '58079090',
      qty: 63500,
      unit: 'NOS',
      rate: 0.26,
      amount: 16510
    });
  }
  return items;
}

function renderCustomInvoicePreview() {
  const previewEl = document.getElementById('customInvoicePreview');
  if (!previewEl) return;

  const docTitle = document.getElementById('custDocTitle')?.value || 'TAX INVOICE';
  const invoiceNo = document.getElementById('custInvoiceNo')?.value || getNextInvoiceNumber();
  const invoiceDate = document.getElementById('custInvoiceDate')?.value || new Date().toLocaleDateString('en-IN', {
    day: '2-digit', month: '2-digit', year: 'numeric'
  });

  const receiverName = document.getElementById('custReceiverName')?.value || 'M/S MOHIT KUMAR';
  const receiverPhone = document.getElementById('custReceiverPhone')?.value || '';
  const receiverAddress = document.getElementById('custReceiverAddress')?.value || '';
  const receiverState = document.getElementById('custReceiverState')?.value || 'Uttar Pradesh (09)';
  const receiverGstin = document.getElementById('custReceiverGstin')?.value || '';
  const transportMode = document.getElementById('custTransportMode')?.value || '';
  const vehicleNo = document.getElementById('custVehicleNo')?.value || '';

  const gstType = document.getElementById('custGstType')?.value || 'cgst_sgst';
  const gstRate = parseFloat(document.getElementById('custGstRateInput')?.value) || 0;
  const reverseCharge = document.getElementById('custReverseCharge')?.value || 'No';
  const discount = parseFloat(document.getElementById('custDiscount')?.value) || 0;
  const transportCharges = parseFloat(document.getElementById('custTransportCharges')?.value) || 0;

  const items = getInvoiceCustomItemsData();

  let subtotal = 0;
  items.forEach(it => { subtotal += it.amount; });
  const taxableTotal = Math.max(0, subtotal - discount + transportCharges);

  let cgstRate = 0, cgstAmt = 0;
  let sgstRate = 0, sgstAmt = 0;
  let igstRate = 0, igstAmt = 0;

  if (gstType === 'cgst_sgst' && gstRate > 0) {
    const half = gstRate / 2;
    cgstRate = half;
    cgstAmt = (taxableTotal * half) / 100;
    sgstRate = half;
    sgstAmt = (taxableTotal * half) / 100;
  } else if (gstType === 'igst' && gstRate > 0) {
    igstRate = gstRate;
    igstAmt = (taxableTotal * gstRate) / 100;
  } else if (gstType === 'extra' && gstRate > 0) {
    const half = gstRate / 2;
    cgstRate = half;
    cgstAmt = (taxableTotal * half) / 100;
    sgstRate = half;
    sgstAmt = (taxableTotal * half) / 100;
  }

  const totalGst = cgstAmt + sgstAmt + igstAmt;
  const grandTotal = Math.round(taxableTotal + totalGst);
  const wordsText = numberToIndianWords(grandTotal);
  const taxWordsText = totalGst > 0 ? numberToIndianWords(Math.round(totalGst)) : 'Zero Rupees Only';

  const itemRowsHtml = items.map((it, idx) => {
    let descHtml = '';
    if (it.title && it.desc) {
      descHtml = `<div class="bill-item-main-title">${it.title}</div><div class="bill-item-sub-desc">${it.desc}</div>`;
    } else if (it.title) {
      descHtml = `<div class="bill-item-main-title">${it.title}</div>`;
    } else {
      descHtml = `<div class="bill-item-sub-desc" style="font-weight:600;">${it.desc}</div>`;
    }

    return `
      <tr>
        <td style="text-align:center; font-weight:bold; width:38px;">${idx + 1}</td>
        <td>
          ${descHtml}
        </td>
        <td style="text-align:center; font-weight:bold; width:80px;">${it.hsn || '-'}</td>
        <td style="text-align:center; font-weight:bold; width:95px;">${it.qty > 0 ? (it.qty.toLocaleString('en-IN') + ' ' + (it.unit || '')) : '-'}</td>
        <td style="text-align:right; width:80px;">${it.rate > 0 ? it.rate.toFixed(2) : '-'}</td>
        <td style="text-align:right; font-weight:bold; width:105px;">${it.amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
      </tr>
    `;
  }).join('');

  // Proportional empty rows to gracefully fill full A4 height
  let emptyRowsHtml = '';
  const emptyNeeded = Math.max(0, 10 - items.length);
  for (let i = 0; i < emptyNeeded; i++) {
    emptyRowsHtml += `
      <tr style="height:32px;">
        <td style="text-align:center; color:#cbd5e1; font-weight:bold;">${items.length + i + 1}</td>
        <td></td><td></td><td></td><td></td><td></td>
      </tr>
    `;
  }

  previewEl.innerHTML = `
    <div class="billbook-container" id="printableInvoice">
      
      <!-- Top Section: Header, Branding, Receiver -->
      <div class="bill-top-section">
        <!-- Top Bar: GSTIN | TITLE | MOBILES -->
        <div class="bill-top-bar">
          <div>GSTIN. 09AWKPN5910E1ZG</div>
          <div class="bill-doc-title">${docTitle}</div>
          <div style="text-align:right; font-size:11px; font-weight:bold;">M.: 9911678386, 8851627221</div>
        </div>

        <!-- Main Header: Brand & Address -->
        <div class="bill-header-center">
          <div class="bill-brand-name">
            <img src="assets/images/logo.png" alt="Logo" class="bill-brand-logo" onerror="this.style.display='none'">
            <span>A S PRINT GALLERY</span>
          </div>
          <div class="bill-mfd-tag">Mfd. by : Hang Tag, Printed Label, Barcode Sticker, Packaging Box, Paper Bag, Corrugated Box</div>
          <div class="bill-address-tag">Kh.no.2326/2, Shankar Garden, Ashok Vihar, Loni, Ghaziabad, (U.P) 201102</div>
        </div>

        <!-- Invoice No & Date Bar -->
        <div class="bill-meta-bar">
          <div><b>Invoice No. :</b> <span style="font-size:14px; font-weight:900; margin-left:4px;">${invoiceNo}</span></div>
          <div style="text-align:right;"><b>Invoice Dated :</b> <span style="margin-left:4px;">${invoiceDate}</span></div>
        </div>

        <!-- Receiver & Transport Grid -->
        <div class="bill-parties-grid">
          <div class="bill-party-box">
            <div class="bill-party-title">DETAILS OF RECEIVER (BILLED TO)</div>
            <div class="bill-field-row">
              <span class="bill-field-lbl">Name :</span>
              <span class="bill-field-val" style="font-weight:bold; font-size:12.5px;">${receiverName}</span>
            </div>
            <div class="bill-field-row">
              <span class="bill-field-lbl">Address :</span>
              <span class="bill-field-val">${receiverAddress}</span>
            </div>
            <div class="bill-field-row">
              <span class="bill-field-lbl">State :</span>
              <span class="bill-field-val">${receiverState}</span>
            </div>
            <div class="bill-field-row">
              <span class="bill-field-lbl">GSTIN / Phone :</span>
              <span class="bill-field-val" style="font-weight:bold;">${[receiverGstin, (receiverPhone ? ('Mob: ' + receiverPhone) : '')].filter(Boolean).join(' | ') || '-'}</span>
            </div>
          </div>

          <div class="bill-party-box right">
            <div class="bill-field-row">
              <span class="bill-field-lbl">Transportation Mode :</span>
              <span class="bill-field-val">${transportMode}</span>
            </div>
            <div class="bill-field-row">
              <span class="bill-field-lbl">Vehicle Number :</span>
              <span class="bill-field-val">${vehicleNo || '-'}</span>
            </div>
            <div class="bill-field-row">
              <span class="bill-field-lbl">Date Of Supply :</span>
              <span class="bill-field-val">${invoiceDate}</span>
            </div>
            <div class="bill-field-row">
              <span class="bill-field-lbl">Place Of Supply :</span>
              <span class="bill-field-val">${receiverState}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Middle Fill Section: Table & Financial Breakdown -->
      <div class="bill-middle-fill">
        <!-- Goods / Item Table -->
        <table class="bill-items-table">
          <thead>
            <tr>
              <th style="width:38px;">S.No.</th>
              <th style="text-align:left;">DESCRIPTION OF GOODS</th>
              <th style="width:80px;">HSN CODE</th>
              <th style="width:95px;">QTY.</th>
              <th style="width:80px; text-align:right;">RATE</th>
              <th style="width:105px; text-align:right;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${itemRowsHtml}
            ${emptyRowsHtml}

            <!-- Compact 2-Line Summary & Tax Section -->
            <tr class="bill-summary-row" style="background:#fafafa;">
              <td colspan="4" style="border-right:1.5px solid #000; font-size:10.5px; padding:3px 6px;">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:4px;">
                  <span><b>Reverse Charge:</b> Yes [ ${reverseCharge === 'Yes' ? '✓' : ' '} ] &nbsp; No [ ${reverseCharge === 'No' ? '✓' : ' '} ]</span>
                  <span style="font-weight:bold; color:#0f172a;">
                    ${cgstAmt > 0 ? `CGST (${cgstRate}%): ₹${cgstAmt.toFixed(2)} &nbsp;|&nbsp; SGST (${sgstRate}%): ₹${sgstAmt.toFixed(2)} &nbsp;|&nbsp; Total Tax: ₹${totalGst.toFixed(2)}` : (igstAmt > 0 ? `IGST (${igstRate}%): ₹${igstAmt.toFixed(2)}` : 'GST: Nil / Exempt')}
                  </span>
                </div>
              </td>
              <td style="text-align:right; font-weight:bold; font-size:10.5px; padding:3px 6px;">Total Before Tax</td>
              <td style="text-align:right; font-weight:bold; font-size:11px; padding:3px 6px;">${taxableTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            </tr>

            ${(transportCharges > 0 || discount > 0) ? `
            <tr class="bill-summary-row" style="background:#fff;">
              <td colspan="4" style="border-right:1.5px solid #000; font-size:10.5px; padding:2px 6px;">
                ${transportCharges > 0 ? `🚚 <b>Transport / Freight:</b> ₹${transportCharges.toFixed(2)}` : ''}
                ${(transportCharges > 0 && discount > 0) ? ' &nbsp;|&nbsp; ' : ''}
                ${discount > 0 ? `🏷️ <b>Discount:</b> -₹${discount.toFixed(2)}` : ''}
              </td>
              <td style="text-align:right; font-weight:bold; font-size:10px; padding:2px 6px;">Tax Amount</td>
              <td style="text-align:right; font-weight:bold; font-size:10.5px; padding:2px 6px;">₹${totalGst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            </tr>
            ` : ''}

            <!-- Final Grand Total Row -->
            <tr class="bill-total-final-row">
              <td colspan="4" style="border-right:1.5px solid #000; font-weight:bold; font-size:10.5px; padding:4px 6px;">
                GST on Reverse Charge: ₹0.00
              </td>
              <td style="text-align:right; font-size:11.5px; font-weight:900; padding:4px 6px; white-space:nowrap;">Total Amount After Tax</td>
              <td style="text-align:right; font-size:12.5px; font-weight:900; padding:4px 6px;">₹${grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            </tr>
          </tbody>
        </table>

        <!-- Amount In Words Box -->
        <div class="bill-words-section">
          <div style="margin-bottom:3px;">
            <b>Total Amount in Words :</b> <span style="text-transform:capitalize; font-weight:bold; margin-left:4px;">${wordsText}</span>
          </div>
          <div>
            <b>Tax Amount in Words :</b> <span style="text-transform:capitalize; margin-left:4px;">${taxWordsText}</span>
          </div>
        </div>
      </div>

      <!-- Bottom Section: Terms, Bank Details & Signature -->
      <div class="bill-footer-section">
        <div class="bill-terms-box">
          <div style="font-weight:bold; text-decoration:underline; margin-bottom:3px;">Terms &amp; Conditions:</div>
          <div>1. Goods once sold will not be taken back.</div>
          <div>2. Interest @ 18% p.a. will be charged after due date.</div>
          <div>3. All disputes subject to Ghaziabad Jurisdiction only.</div>
        </div>

        <div class="bill-bank-box">
          <div style="font-weight:bold; text-decoration:underline; margin-bottom:3px;">Bank Details:</div>
          <div>Bank : <b>HDFC BANK</b></div>
          <div>A/c No. : <b>50200098986238</b></div>
          <div>IFSC : <b>HDFC0004729</b></div>
          <div>Branch : <b>LONI GHAZIABAD</b></div>
        </div>

        <div class="bill-sign-box">
          <div style="font-weight:bold; font-size:11px;">For A S PRINT GALLERY</div>
          <div style="font-size:10px; margin-top:28px;">Authorised Signatory</div>
        </div>
      </div>

    </div>
  `;
}

function openCustomInvoiceModal(fromCalc = false) {
  const modal = document.getElementById('customInvoiceModal');
  if (!modal) return;

  const invInput = document.getElementById('custInvoiceNo');
  if (invInput && (!invInput.value || invInput.value === '071' || invInput.value === '077')) {
    invInput.value = getNextInvoiceNumber();
  }

  const dateInput = document.getElementById('custInvoiceDate');
  if (dateInput && !dateInput.value) {
    dateInput.value = new Date().toLocaleDateString('en-IN', {
      day: '2-digit', month: '2-digit', year: 'numeric'
    });
  }

  const container = document.getElementById('invoiceItemsBuilder');
  if (container) {
    if (fromCalc) {
      calculateCosts();
      const jobQty = Math.max(1, parseFloat(document.getElementById('jobQty')?.value || '1000'));
      const jobType = document.getElementById('jobType')?.value || 'Packaging Box';
      const paperType = document.getElementById('paperType')?.value || 'Board';
      const gsm = document.getElementById('gsm')?.value || '250';
      const lam = document.getElementById('laminationType')?.value || 'none';
      const uv = document.getElementById('spotUv')?.value || 'none';
      const foil = document.getElementById('foiling')?.value || 'none';

      let finishes = [];
      if (lam && lam !== 'none') finishes.push(lam.toUpperCase() + ' Lam');
      if (uv && uv !== 'none') finishes.push('Spot UV');
      if (foil && foil !== 'none') finishes.push('Foiling');

      let desc = `Material: ${gsm} GSM ${paperType}`;
      if (finishes.length > 0) desc += ` | ${finishes.join(' + ')}`;

      let unitRate = 1.00;
      if (currentResults && currentResults.sellingPricePerUnit) {
        unitRate = parseFloat(currentResults.sellingPricePerUnit.toFixed(2));
      } else if (currentResults && currentResults.totalCost && jobQty > 0) {
        unitRate = parseFloat((currentResults.totalCost / jobQty).toFixed(2));
      }

      container.innerHTML = '';
      addInvoiceItemRow({
        title: jobType.toUpperCase(),
        desc: desc,
        hsn: '58079090',
        qty: jobQty,
        unit: 'NOS',
        rate: unitRate
      });
    } else if (container.children.length === 0) {
      container.innerHTML = '';
      addInvoiceItemRow({
        title: 'PRINTED PACKAGING',
        desc: '32B - 12235\n34B - 10400\n36B - 8480\n40B - 3315',
        hsn: '58079090',
        qty: 63500,
        unit: 'NOS',
        rate: 0.26
      });
    }
  }

  renderCustomInvoicePreview();
  updateSavedCountBadges();
  modal.classList.add('active');
}

function closeCustomInvoiceModal() {
  const modal = document.getElementById('customInvoiceModal');
  if (modal) modal.classList.remove('active');
}

function printCustomInvoice() {
  renderCustomInvoicePreview();
  window.print();
}

function printQuotation() {
  if (typeof renderQuotationPreview === 'function') {
    renderQuotationPreview();
  }
  window.print();
}

function saveCustomBillInvoice() {
  const invoiceNo = document.getElementById('custInvoiceNo')?.value || getNextInvoiceNumber();
  const receiverName = document.getElementById('custReceiverName')?.value || 'Client';
  const invoiceDate = document.getElementById('custInvoiceDate')?.value || new Date().toLocaleDateString('en-IN');
  const docTitle = document.getElementById('custDocTitle')?.value || 'TAX INVOICE';
  
  const items = getInvoiceCustomItemsData();
  let subtotal = 0;
  items.forEach(it => { subtotal += it.amount; });

  const gstType = document.getElementById('custGstType')?.value || 'cgst_sgst';
  const gstRate = parseFloat(document.getElementById('custGstRateInput')?.value) || 0;
  const totalGst = gstType === 'exempt' ? 0 : (subtotal * gstRate) / 100;
  const grandTotal = Math.round(subtotal + totalGst);

  const billObj = {
    id: 'bill_' + Date.now(),
    invoiceNo: invoiceNo,
    docType: docTitle,
    docTitle: docTitle,
    clientName: receiverName,
    buyerName: receiverName,
    receiverAddress: document.getElementById('custReceiverAddress')?.value || '',
    receiverPhone: document.getElementById('custReceiverPhone')?.value || '',
    receiverGstin: document.getElementById('custReceiverGstin')?.value || '',
    receiverState: document.getElementById('custReceiverState')?.value || '',
    date: invoiceDate,
    items: items,
    jobTitle: items[0]?.title || 'Packaging Item',
    gstType: gstType,
    gstPercent: gstRate,
    grandTotal: grandTotal,
    savedAt: new Date().toISOString()
  };

  const list = getSavedInvoicesList();
  list.unshift(billObj);
  localStorage.setItem('as_saved_invoices_v3', JSON.stringify(list));

  incrementNextInvoiceNumber();
  updateSavedCountBadges();
  showToast(`✅ Bill #${invoiceNo} for ${receiverName} saved to Records!`);
}

function copyCustomBillText() {
  const invoiceNo = document.getElementById('custInvoiceNo')?.value || '';
  const receiverName = document.getElementById('custReceiverName')?.value || '';
  const docTitle = document.getElementById('custDocTitle')?.value || 'TAX INVOICE';
  const items = getInvoiceCustomItemsData();

  let text = `*A S PRINT GALLERY*\n`;
  text += `GSTIN: 09AWKPN5910E1ZG | Mob: 9911678386, 8851627221\n`;
  text += `-----------------------------------------\n`;
  text += `*${docTitle}* #${invoiceNo}\n`;
  text += `Date: ${document.getElementById('custInvoiceDate')?.value || ''}\n`;
  text += `Billed To: *${receiverName}*\n`;
  text += `-----------------------------------------\n`;
  text += `*Items / Products:*\n`;
  
  let sub = 0;
  items.forEach((it, i) => {
    sub += it.amount;
    text += `${i+1}. *${it.title}* (${it.qty} ${it.unit} @ ₹${it.rate}) = ₹${it.amount.toFixed(2)}\n`;
    if (it.desc) {
      text += `   ${it.desc.replace(/\n/g, '\n   ')}\n`;
    }
  });

  const gstType = document.getElementById('custGstType')?.value || 'cgst_sgst';
  const gstRate = parseFloat(document.getElementById('custGstRateInput')?.value) || 0;
  const gstAmt = gstType === 'exempt' ? 0 : (sub * gstRate) / 100;
  const tot = Math.round(sub + gstAmt);

  text += `-----------------------------------------\n`;
  text += `Sub Total: ₹${sub.toFixed(2)}\n`;
  if (gstAmt > 0) text += `GST (${gstRate}%): ₹${gstAmt.toFixed(2)}\n`;
  text += `*GRAND TOTAL: ₹${tot.toLocaleString('en-IN')}*\n`;
  text += `-----------------------------------------\n`;
  text += `Bank: HDFC Bank | A/C: 50200098986238 | IFSC: HDFC0004729\n`;
  text += `Kh.no.2326/2, Shankar Garden, Ashok Vihar, Loni, Ghaziabad, (U.P) 201102\n`;

  navigator.clipboard.writeText(text).then(() => {
    showToast('📋 Bill text copied to clipboard!');
  });
}

function shareCustomBillWhatsApp() {
  const invoiceNo = document.getElementById('custInvoiceNo')?.value || '';
  const receiverName = document.getElementById('custReceiverName')?.value || '';
  const receiverPhone = document.getElementById('custReceiverPhone')?.value || '';
  const docTitle = document.getElementById('custDocTitle')?.value || 'TAX INVOICE';
  const items = getInvoiceCustomItemsData();
  const gstType = document.getElementById('custGstType')?.value || 'cgst_sgst';
  const gstRate = parseFloat(document.getElementById('custGstRateInput')?.value) || 0;
  const transportCharges = parseFloat(document.getElementById('custTransportCharges')?.value) || 0;
  const discount = parseFloat(document.getElementById('custDiscount')?.value) || 0;

  let sub = 0;
  items.forEach((it) => { sub += it.amount; });
  const taxable = Math.max(0, sub - discount + transportCharges);
  const gstAmt = gstType === 'exempt' ? 0 : (taxable * gstRate) / 100;
  const tot = Math.round(taxable + gstAmt);

  // Generate shareable link
  const billPayload = {
    invoiceNo: invoiceNo,
    docTitle: docTitle,
    date: document.getElementById('custInvoiceDate')?.value || '',
    clientName: receiverName,
    receiverAddress: document.getElementById('custReceiverAddress')?.value || '',
    receiverState: document.getElementById('custReceiverState')?.value || '',
    receiverPhone: receiverPhone,
    receiverGstin: document.getElementById('custReceiverGstin')?.value || '',
    transportMode: document.getElementById('custTransportMode')?.value || '',
    vehicleNo: document.getElementById('custVehicleNo')?.value || '',
    gstType: gstType,
    gstPercent: gstRate,
    transportCharges: transportCharges,
    discount: discount,
    items: items
  };

  let shareableUrl = window.location.origin + window.location.pathname;
  try {
    const b64 = btoa(unescape(encodeURIComponent(JSON.stringify(billPayload))));
    shareableUrl += '?billData=' + encodeURIComponent(b64);
  } catch(e) {}

  let text = `*A S PRINT GALLERY*\n`;
  text += `GSTIN: 09AWKPN5910E1ZG | Phone: 9911678386, 8851627221\n`;
  text += `*${docTitle}* #${invoiceNo}\n`;
  text += `Billed To: *${receiverName}*\n`;
  if (receiverPhone) {
    text += `Customer Mob: *${receiverPhone}*\n`;
  }
  text += `-----------------------------------------\n`;
  
  items.forEach((it, i) => {
    text += `▪ *${it.title}*\n   Qty: ${it.qty} ${it.unit} @ ₹${it.rate} = ₹${it.amount.toFixed(2)}\n`;
    if (it.desc) {
      text += `   ${it.desc.replace(/\n/g, '\n   ')}\n`;
    }
  });

  text += `-----------------------------------------\n`;
  text += `Items Subtotal: ₹${sub.toFixed(2)}\n`;
  if (transportCharges > 0) text += `🚚 Transport / Cartage: ₹${transportCharges.toFixed(2)}\n`;
  if (discount > 0) text += `🏷️ Discount: -₹${discount.toFixed(2)}\n`;
  if (gstAmt > 0) text += `GST (${gstRate}%): ₹${gstAmt.toFixed(2)}\n`;
  text += `*Grand Total: ₹${tot.toLocaleString('en-IN')}*\n`;
  text += `-----------------------------------------\n`;
  text += `📄 *View / Download Official A4 PDF Bill:*\n${shareableUrl}\n`;
  text += `-----------------------------------------\n`;
  text += `Bank: HDFC Bank A/C: 50200098986238 (IFSC: HDFC0004729)\n`;
  text += `Kh.no.2326/2, Shankar Garden, Ashok Vihar, Loni, Ghaziabad, (U.P) 201102\n`;
  text += `Thank you for your business!`;

  let cleanPhone = extractCleanPhoneNumber(receiverPhone);
  if (!cleanPhone) {
    const gstinVal = document.getElementById('custReceiverGstin')?.value || '';
    const phoneMatch = gstinVal.match(/(\d{10})/);
    if (phoneMatch) {
      cleanPhone = extractCleanPhoneNumber(phoneMatch[1]);
    }
  }

  // 1. Auto download high-res A4 PDF file directly to computer/phone
  const filename = `AS_Print_Gallery_Bill_${invoiceNo}_${receiverName.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
  const el = document.getElementById('printableInvoice');
  if (el && typeof html2pdf !== 'undefined') {
    const opt = {
      margin: [4, 6, 4, 6],
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(el).save();
  }

  // 2. Open Direct WhatsApp Chat with Bill details & Clickable Online PDF Link
  const url = cleanPhone 
    ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`
    : `https://wa.me/?text=${encodeURIComponent(text)}`;
  
  if (cleanPhone) {
    showToast(`🚀 WhatsApp chat opened for +${cleanPhone}! PDF downloaded to your device.`);
  } else {
    showToast(`💬 WhatsApp chat opened & PDF downloaded!`);
  }

  window.open(url, '_blank');
}

function showToast(msg) {
  let toast = document.getElementById('appGlobalToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'appGlobalToast';
    toast.style.cssText = 'position:fixed; bottom:24px; right:24px; background:#0f172a; color:#fff; padding:12px 20px; border-radius:10px; font-size:13px; font-weight:600; box-shadow:0 10px 25px rgba(0,0,0,0.3); z-index:99999; display:flex; align-items:center; gap:8px; transition:all 0.3s ease;';
    document.body.appendChild(toast);
  }
  toast.innerHTML = msg;
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
  }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
  updateSavedCountBadges();
  checkAndLoadSharedBillFromURL();
  const builder = document.getElementById('invoiceItemsBuilder');
  if (builder && builder.children.length === 0) {
    addInvoiceItemRow({
      title: 'PRINTED PACKAGING',
      desc: '32B - 12235\n34B - 10400\n36B - 8480\n40B - 3315',
      hsn: '58079090',
      qty: 63500,
      unit: 'NOS',
      rate: 0.26
    });
  }
  renderCustomInvoicePreview();
});


// PDF Generator Helper
async function generateA4PDFBlob(elementId, filename) {
  const element = document.getElementById(elementId);
  if (!element) return null;

  if (typeof html2pdf === 'undefined') {
    window.print();
    return null;
  }

  const opt = {
    margin: [4, 6, 4, 6],
    filename: filename || 'Invoice.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, logging: false },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  try {
    return await html2pdf().set(opt).from(element).outputPdf('blob');
  } catch (e) {
    console.warn('PDF blob generation fallback:', e);
    return null;
  }
}

function downloadCustomBillPDF() {
  const invoiceNo = document.getElementById('custInvoiceNo')?.value || '071';
  const receiverName = (document.getElementById('custReceiverName')?.value || 'Client').replace(/[^a-zA-Z0-9]/g, '_');
  const filename = `AS_Print_Gallery_Invoice_${invoiceNo}_${receiverName}.pdf`;
  
  const element = document.getElementById('printableInvoice');
  if (!element) return;

  if (typeof html2pdf !== 'undefined') {
    showToast('⏳ Generating High-Definition A4 PDF...');
    const opt = {
      margin: [4, 6, 4, 6],
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save().then(() => {
      showToast(`✅ PDF downloaded: ${filename}`);
    });
  } else {
    window.print();
  }
}

function downloadQuotationPDF() {
  const invoiceNo = document.getElementById('invoiceNoInput')?.value || '077';
  const clientName = (document.getElementById('clientNameInput')?.value || 'Client').replace(/[^a-zA-Z0-9]/g, '_');
  const filename = `AS_Print_Gallery_Quote_${invoiceNo}_${clientName}.pdf`;
  
  const element = document.getElementById('printableQuotation');
  if (!element) return;

  if (typeof html2pdf !== 'undefined') {
    showToast('⏳ Generating Quotation PDF...');
    const opt = {
      margin: [4, 6, 4, 6],
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save().then(() => {
      showToast(`✅ PDF downloaded: ${filename}`);
    });
  } else {
    window.print();
  }
}


// Shareable Bill URL Handler (Allows customers to view/download A4 PDF bill directly from WhatsApp link)
function checkAndLoadSharedBillFromURL() {
  try {
    const params = new URLSearchParams(window.location.search);
    const billDataParam = params.get('billData');
    if (!billDataParam) return;

    const jsonStr = decodeURIComponent(escape(atob(billDataParam)));
    const data = JSON.parse(jsonStr);

    if (data && data.invoiceNo) {
      // Pre-fill fields
      if (document.getElementById('custInvoiceNo')) document.getElementById('custInvoiceNo').value = data.invoiceNo || '';
      if (document.getElementById('custDocTitle')) document.getElementById('custDocTitle').value = data.docTitle || 'TAX INVOICE';
      if (document.getElementById('custInvoiceDate')) document.getElementById('custInvoiceDate').value = data.date || '';
      if (document.getElementById('custReceiverName')) document.getElementById('custReceiverName').value = data.clientName || '';
      if (document.getElementById('custReceiverAddress')) document.getElementById('custReceiverAddress').value = data.receiverAddress || '';
      if (document.getElementById('custReceiverState')) document.getElementById('custReceiverState').value = data.receiverState || '';
      if (document.getElementById('custReceiverPhone')) document.getElementById('custReceiverPhone').value = data.receiverPhone || '';
      if (document.getElementById('custReceiverGstin')) document.getElementById('custReceiverGstin').value = data.receiverGstin || '';
      if (document.getElementById('custTransportMode')) document.getElementById('custTransportMode').value = data.transportMode || '';
      if (document.getElementById('custVehicleNo')) document.getElementById('custVehicleNo').value = data.vehicleNo || '';
      if (document.getElementById('custGstType')) document.getElementById('custGstType').value = data.gstType || 'cgst_sgst';
      if (document.getElementById('custGstRateInput')) document.getElementById('custGstRateInput').value = data.gstPercent || 18;
      if (document.getElementById('custTransportCharges')) document.getElementById('custTransportCharges').value = data.transportCharges || 0;
      if (document.getElementById('custDiscount')) document.getElementById('custDiscount').value = data.discount || 0;

      const container = document.getElementById('invoiceItemsBuilder');
      if (container && data.items && data.items.length > 0) {
        container.innerHTML = '';
        data.items.forEach(it => {
          addInvoiceItemRow(it);
        });
      }

      openCustomInvoiceModal(false);
      renderCustomInvoicePreview();
      showToast(`📄 Displaying Bill #${data.invoiceNo} for ${data.clientName}`);
    }
  } catch (err) {
    console.warn('Could not parse shared bill URL:', err);
  }
}
