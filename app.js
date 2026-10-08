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

  const docTitle = document.getElementById('docTitleSelect')?.value || 'TAX INVOICE';

  const copyType = document.getElementById('copyTypeSelect')?.value || 'Original For Buyer';

  const invoiceNo = document.getElementById('invoiceNoInput')?.value || getNextInvoiceNumber();

  const invoiceDate = document.getElementById('invoiceDateInput')?.value || new Date().toLocaleDateString('en-IN', {

    day: '2-digit', month: 'short', year: 'numeric'

  });



  const companyGstin = '09AWKPN5910E1ZG';

  const companyMobiles = '9911678386, 8851627221';

  const companyName = 'A S PRINT GALLERY';

  const companyMfd = 'Mfd. by : Hang Tag, Printed Label, Barcode Sticker, Packaging Box, Heat Transfer Sticker';

  const companyAddress = 'Kh.no.2326/2, Shankar Garden,Ashok Vihar,Loni,Ghaziabad,(U.P) 201102';



  const clientName = document.getElementById('clientNameInput')?.value || 'M/S MOHIT KUMAR';

  const clientAddress = document.getElementById('clientAddressInput')?.value || 'KHEKRA, BAGHPAT, U.P.';

  const clientState = document.getElementById('clientStateInput')?.value || 'Uttar Pradesh (09)';

  const clientGstin = document.getElementById('clientGstinInput')?.value || 'GSTIN: XXXXXXX | Ph: 7037442527';

  

  const transportMode = document.getElementById('transportModeInput')?.value || 'Direct Dispatch / By Hand';

  const vehicleNo = document.getElementById('vehicleNoInput')?.value || '-';



  const jobTitle = document.getElementById('jobTitleInput')?.value || 'LIFAFA';

  const hsn = document.getElementById('hsnInput')?.value || '4819';

  const billingUnit = document.getElementById('billingUnitSelect')?.value || 'NOS';

  const customDesc = document.getElementById('customItemDescInput')?.value?.trim() || '';



  const sl = n('sl'), sw = n('sw'), gsm = n('gsm'), pr = n('paperRate');

  const ll = n('ll'), lw = n('lw'), d = n('divide');

  const lamType = document.getElementById('lamType').value;



  const leafL = n('leafL'), leafW = n('leafW'), leafDivide = n('leafDivide');

  const leafType = document.getElementById('leafType').value;

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

  const grandTotal = taxableTotal + totalTaxAmount;



  const previewEl = document.getElementById('quotationPreview');

  if (!previewEl) return;



  if (currentQuoteMode === 'customer') {

    // -------------------------------------------------------------

    // AUTHENTIC PHYSICAL BILL BOOK LAYOUT OF A S PRINT GALLERY

    // -------------------------------------------------------------

    

    // Construct auto-specs if custom description is empty

    let displayDesc = customDesc;

    if (!displayDesc) {

      const specs = [];

      if (sl && sw) specs.push(`Material: ${sl}" × ${sw}" | ${gsm} GSM Board`);

      specs.push(`Printing: Multi-Color High-Definition Offset Printing`);

      if (lamType !== 'None') specs.push(`Lamination: ${lamType} Lamination`);

      if (leafType !== 'None') specs.push(`Foil: ${leafType} Foil / Leaf Stamping`);

      if (die > 0 || dieCharges > 0) specs.push(`Die-Cutting & Creasing`);

      if (pasting > 0) specs.push(`Pasting & Box Fabrication`);

      if (uv > 0) specs.push(`UV Coating`);

      if (embossed > 0) specs.push(`Embossing Texture`);

      if (other > 0) specs.push(`Finishing`);

      displayDesc = specs.join(' | ');

    }



    previewEl.innerHTML = `

      <div class="billbook-container" id="printableInvoice">

        

        <!-- Top Bar: GSTIN | TITLE | MOBILES | COPIES -->

        <div class="bill-top-bar">

          <div>GSTIN. ${companyGstin}</div>

          <div class="bill-doc-title">${docTitle}</div>

          <div style="text-align:right;">M.: ${companyMobiles}</div>

          <div class="bill-copies-box">

            <div>${copyType === 'Original For Buyer' ? '[✓]' : '[ ]'} Original For Buyer</div>

            <div>${copyType === 'Duplicate For Supplier' ? '[✓]' : '[ ]'} Duplicate For Supplier</div>

            <div>${copyType === 'Triplicate For Supplier' ? '[✓]' : '[ ]'} Triplicate For Supplier</div>

          </div>

        </div>



        <!-- Main Header: Brand & Address -->

        <div class="bill-header-center">

          <div class="bill-brand-name">

            <img src="logo.png" alt="Logo" class="bill-brand-logo">

            <span>${companyName}</span>

          </div>

          <div class="bill-mfd-tag">${companyMfd}</div>

          <div class="bill-address-tag">${companyAddress}</div>

        </div>



        <!-- Invoice No & Date Bar -->

        <div class="bill-meta-bar">

          <div><b>Invoice No. :</b> <span style="font-size:14px; font-weight:900;">${invoiceNo}</span></div>

          <div style="text-align:right;"><b>Invoice Dated :</b> <span>${invoiceDate}</span></div>

        </div>



        <!-- Receiver & Transport Grid -->

        <div class="bill-parties-grid">

          <div class="bill-party-box">

            <div class="bill-party-title">DETAILS OF RECEIVER (BILLED TO)</div>

            <div class="bill-field-row">

              <span class="bill-field-lbl">Name :</span>

              <span class="bill-field-val" style="font-weight:bold; font-size:12px;">${clientName}</span>

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

              <span class="bill-field-lbl">GSTIN/Unique ID :</span>

              <span class="bill-field-val" style="font-weight:bold;">${clientGstin}</span>

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



        <!-- Goods / Item Table -->

        <table class="bill-items-table">

          <thead>

            <tr>

              <th style="width:38px;">S No.</th>

              <th style="text-align:left;">DESCRIPTION OF GOODS</th>

              <th style="width:80px;">HSN CODE</th>

              <th style="width:90px;">QTY.</th>

              <th style="width:90px; text-align:right;">RATE</th>

              <th style="width:115px; text-align:right;">Amount (₹)</th>

            </tr>

          </thead>

          <tbody>

            <tr>

              <td style="text-align:center; font-weight:bold;">1</td>

              <td>

                <div class="bill-item-main-title">${jobTitle}</div>

                <div class="bill-item-sub-desc">${displayDesc}</div>

              </td>

              <td style="text-align:center; font-weight:bold;">${hsn}</td>

              <td style="text-align:center; font-weight:bold;">${billQty.toLocaleString('en-IN')} ${billingUnit}</td>

              <td style="text-align:right;">${billRate.toFixed(2)}</td>

              <td style="text-align:right; font-weight:bold;">${taxableTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>

            </tr>



            <!-- Total Amount Before Tax -->

            <tr class="bill-summary-row">

              <td colspan="4" style="border-right:1.5px solid #000; font-weight:bold;">

                Amount Of Tax Subject To Reverse Charge: &nbsp; Yes [ ${reverseCharge === 'Yes' ? '✓' : ' '} ] &nbsp; No [ ${reverseCharge === 'No' ? '✓' : ' '} ]

              </td>

              <td style="text-align:right; font-weight:bold; background:#fafafa;">Total Amount Before Tax</td>

              <td style="text-align:right; font-weight:bold; background:#fafafa;">${taxableTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>

            </tr>



            <!-- CGST / SGST / IGST Rows -->

            ${cgstAmt > 0 ? `

            <tr class="bill-summary-row">

              <td colspan="4" style="border-right:1.5px solid #000;"></td>

              <td style="text-align:right; font-weight:bold;">CGST ${cgstRate.toFixed(2)} %</td>

              <td style="text-align:right;">${cgstAmt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>

            </tr>

            <tr class="bill-summary-row">

              <td colspan="4" style="border-right:1.5px solid #000;"></td>

              <td style="text-align:right; font-weight:bold;">SGST ${sgstRate.toFixed(2)} %</td>

              <td style="text-align:right;">${sgstAmt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>

            </tr>

            ` : ''}



            ${igstAmt > 0 ? `

            <tr class="bill-summary-row">

              <td colspan="4" style="border-right:1.5px solid #000;"></td>

              <td style="text-align:right; font-weight:bold;">IGST ${igstRate.toFixed(2)} %</td>

              <td style="text-align:right;">${igstAmt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>

            </tr>

            ` : ''}



            <tr class="bill-summary-row">

              <td colspan="4" style="border-right:1.5px solid #000;"></td>

              <td style="text-align:right; font-weight:bold;">Total Tax Amount</td>

              <td style="text-align:right; font-weight:bold;">${totalTaxAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>

            </tr>



            <!-- GST Total Amount After Tax -->

            <tr class="bill-total-final-row">

              <td colspan="4" style="border-right:1.5px solid #000; text-align:right; font-weight:bold; padding-right:10px;">Total Quantity: ${billQty.toLocaleString('en-IN')} ${billingUnit}</td>

              <td style="text-align:right; font-weight:900;">GST Total Amount After Tax</td>

              <td style="text-align:right; font-weight:900; font-size:14px;">₹ ${grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>

            </tr>

          </tbody>

        </table>



        <!-- Amount In Words Section -->

        <div class="bill-words-section">

          <div><b>Amount In Words :</b> &nbsp; <span style="font-weight:900;">${numberToIndianWords(grandTotal)}</span></div>

          <div style="margin-top:2px;"><b>Total Tax Amount in words :</b> &nbsp; <span>${numberToIndianWords(totalTaxAmount)}</span></div>

        </div>



        <!-- Footer: Terms | Bank Details | Signatory -->

        <div class="bill-footer-section">

          <div class="bill-terms-box">

            <div><b>TERMS & CONDITIONS</b></div>

            <div style="margin-top:2px;">1. Goods once sold will not be taken back.</div>

            <div>2. 50% Advance with Purchase Order.</div>

            <div>3. All disputes are subject to Ghaziabad Jurisdiction only.</div>

          </div>



          <div class="bill-bank-box">

            <div><b>Bank Details.:</b></div>

            <div>Bank Name : <b>HDFC</b></div>

            <div>BANK A/C : <b>50200098986238</b></div>

            <div>RTGS/NEFT/IFSC : <b>HDFC0004729</b></div>

          </div>



          <div class="bill-sign-box">

            <div style="font-weight:bold;">For: ${companyName}</div>

            <div style="border-top:1px solid #000; padding-top:3px; font-weight:bold; font-size:10.5px; margin-top:30px;">

              Authorized Signature

            </div>

          </div>

        </div>



      </div>

    `;

  } else {

    // -------------------------------------------------------------

    // INTERNAL COSTING & JOB SHEET: Full technical breakdown

    // -------------------------------------------------------------

    previewEl.innerHTML = `

      <div class="quotation-sheet" id="printableInvoice">

        <div class="quote-header">

          <div>

            <div class="quote-title">🏭 INTERNAL JOB CARD & PRODUCTION COSTING</div>

            <div style="font-size:0.85rem; color:#e11d48; font-weight:700; margin-top:4px;">⚠️ Confidential Internal Cost Breakdown (For Press/Factory Use Only)</div>

          </div>

          <div style="text-align:right;">

            <div style="font-weight:700; color:#0f172a;">Job Sheet #${invoiceNo}</div>

            <div style="font-size:0.85rem; color:#64748b;">Date: ${invoiceDate}</div>

          </div>

        </div>



        <div class="quote-meta-grid">

          <div>

            <div style="font-weight:700; color:#334155; margin-bottom:4px;">CLIENT / JOB:</div>

            <div style="font-size:1.05rem; font-weight:700; color:#0f172a;">${clientName}</div>

            <div style="color:#64748b;">Title: <b>${jobTitle}</b></div>

          </div>

          <div>

            <div style="font-weight:700; color:#334155; margin-bottom:4px;">PRODUCTION SPECS:</div>

            <div>Sheet Size: <b>${sl}" × ${sw}"</b> (${gsm} GSM) | Wt: <b>${(weightKg * 1000).toFixed(1)}g / sheet</b></div>

            <div>Total Batch Wt: <b>${totalWeightAllSheets.toFixed(2)} Kgs</b></div>

            <div>Lamination: <b>${lamType}</b> ${lamType !== 'None' ? `(${ll}" × ${lw}")` : ''}</div>

            ${leafType !== 'None' ? `<div>Leaf / Foil: <b>${leafType}</b> (${leafL}" × ${leafW}")</div>` : ''}

            <div>Batch Run: <b>${calcBatchQty.toLocaleString('en-IN')} Sheets</b></div>

          </div>

        </div>



        <div class="quote-table-wrapper">

        <table class="quote-table">

          <thead>

            <tr>

              <th>Item / Process</th>

              <th>Technical Cost Basis</th>

              <th style="text-align:right;">Cost / Sheet</th>

              <th style="text-align:right;">Total (${calcBatchQty.toLocaleString('en-IN')} Qty)</th>

            </tr>

          </thead>

          <tbody>

            <tr>

              <td><b>Paper Substrate</b></td>

              <td>${sl}" × ${sw}" | ${gsm} GSM @ ₹${pr}/Kg (${(weightKg * 1000).toFixed(1)}g)</td>

              <td style="text-align:right;">${money(paperCost)}</td>

              <td style="text-align:right;">${money(paperCost * calcBatchQty)}</td>

            </tr>

            ${lamType !== 'None' ? `

            <tr>

              <td><b>${lamType} Lamination</b></td>

              <td>${ll}" × ${lw}" ÷ ${d} = ${lamPaise.toFixed(2)}p</td>

              <td style="text-align:right;">${money(lamCost)}</td>

              <td style="text-align:right;">${money(lamCost * calcBatchQty)}</td>

            </tr>

            ` : ''}

            ${leafType !== 'None' ? `

            <tr>

              <td><b>${leafType} Stamping</b></td>

              <td>${leafL}" × ${leafW}" ÷ ${leafDivide} = ${leafPaise.toFixed(2)}p ${leafBlock > 0 ? `+ Block ₹${leafBlock}` : ''}</td>

              <td style="text-align:right;">${money(totalLeafPerSheet)}</td>

              <td style="text-align:right;">${money(totalLeafPerSheet * calcBatchQty)}</td>

            </tr>

            ` : ''}

            ${(printing > 0 || plates > 0) ? `

            <tr>

              <td><b>Printing & Plates</b></td>

              <td>Imp: ${money(printing)} ${plates > 0 ? `| Plate Charges: ₹${plates}` : ''}</td>

              <td style="text-align:right;">${money(totalPrintingPerSheet)}</td>

              <td style="text-align:right;">${money(totalPrintingPerSheet * calcBatchQty)}</td>

            </tr>

            ` : ''}

            ${(die > 0 || dieCharges > 0) ? `

            <tr>

              <td><b>Die Cutting & Die</b></td>

              <td>Punch: ${money(die)} ${dieCharges > 0 ? `| Die Charges: ₹${dieCharges}` : ''}</td>

              <td style="text-align:right;">${money(totalDiePerSheet)}</td>

              <td style="text-align:right;">${money(totalDiePerSheet * calcBatchQty)}</td>

            </tr>

            ` : ''}

            ${pasting > 0 ? `

            <tr>

              <td><b>Pasting / Fabrication</b></td>

              <td>Assembly & Glue</td>

              <td style="text-align:right;">${money(pasting)}</td>

              <td style="text-align:right;">${money(pasting * calcBatchQty)}</td>

            </tr>

            ` : ''}

            ${uv > 0 ? `

            <tr>

              <td><b>Spot / Full UV Coating</b></td>

              <td>UV Enhancement</td>

              <td style="text-align:right;">${money(uv)}</td>

              <td style="text-align:right;">${money(uv * calcBatchQty)}</td>

            </tr>

            ` : ''}

            ${embossed > 0 ? `

            <tr>

              <td><b>Embossing / Debossing</b></td>

              <td>Texture Relief Work</td>

              <td style="text-align:right;">${money(embossed)}</td>

              <td style="text-align:right;">${money(embossed * calcBatchQty)}</td>

            </tr>

            ` : ''}

            ${other > 0 ? `

            <tr>

              <td><b>Other Job Work</b></td>

              <td>Auxiliary Finishing</td>

              <td style="text-align:right;">${money(other)}</td>

              <td style="text-align:right;">${money(other * calcBatchQty)}</td>

            </tr>

            ` : ''}

            ${wastage > 0 ? `

            <tr>

              <td><b>Wastage & Setup Allowance</b></td>

              <td>${wastage}% allowance on direct costs</td>

              <td style="text-align:right;">${money(wastageCost)}</td>

              <td style="text-align:right;">${money(wastageCost * calcBatchQty)}</td>

            </tr>

            ` : ''}

            <tr class="total-row">

              <td colspan="2"><b>Net Production Cost (Factory Cost)</b></td>

              <td style="text-align:right;"><b>${money(cost)}</b></td>

              <td style="text-align:right;"><b>${money(cost * calcBatchQty)}</b></td>

            </tr>

            <tr class="sale-row">

              <td colspan="2"><b>SELLING QUOTATION PRICE (Inc. ${profit}% Profit Margin)</b></td>

              <td style="text-align:right;"><b>${money(calcFinalPricePerSheet)}</b></td>

              <td style="text-align:right;"><b>${money(calcFinalPricePerSheet * calcBatchQty)}</b></td>

            </tr>

          </tbody>

        </table>

        </div>

      </div>

    `;

  }

}



// Save Invoice to History

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





    input.addEventListener('input', calculate);





    input.addEventListener('change', calculate);





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

let invoiceCustomItems = [
  {
    desc: 'Mono Carton Packaging Box (Printed & Laminated)',
    hsn: '4819',
    qty: 5000,
    unit: 'NOS',
    rate: 4.50
  }
];

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

function resetCustomInvoiceForm() {
  const invInput = document.getElementById('custInvoiceNo');
  if (invInput) invInput.value = getNextInvoiceNumber();

  const dateInput = document.getElementById('custInvoiceDate');
  if (dateInput) {
    dateInput.value = new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  const buyerInput = document.getElementById('custBuyerName');
  if (buyerInput) buyerInput.value = '';

  const buyerAddr = document.getElementById('custBuyerAddress');
  if (buyerAddr) buyerAddr.value = '';

  const buyerGst = document.getElementById('custBuyerGst');
  if (buyerGst) buyerGst.value = '';

  const buyerPhone = document.getElementById('custBuyerPhone');
  if (buyerPhone) buyerPhone.value = '';

  const discountInput = document.getElementById('custDiscount');
  if (discountInput) discountInput.value = '0';

  const advanceInput = document.getElementById('custAdvance');
  if (advanceInput) advanceInput.value = '0';

  invoiceCustomItems = [
    { desc: 'Printing & Packaging Item', hsn: '4819', qty: 1000, unit: 'NOS', rate: 5.00 }
  ];

  renderInvoiceItemsEditor();
  updateCustomInvoiceLive();
}

// ⚡ ONE-CLICK TRANSFER FROM CALCULATOR TO INVOICE STUDIO
function sendCalculationToInvoiceStudio() {
  // Ensure calculation is performed
  calculateCosts();

  // Gather calculation info
  const jobQty = Math.max(1, parseFloat(document.getElementById('jobQty')?.value || '1000'));
  
  // Detect item description from inputs
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

  let desc = `${jobType.toUpperCase()} - ${gsm} GSM ${paperType}`;
  if (finishes.length > 0) {
    desc += ` (${finishes.join(' + ')})`;
  }

  // Final selling rate per unit calculated
  let unitRate = 0;
  if (currentResults && currentResults.sellingPricePerUnit) {
    unitRate = parseFloat(currentResults.sellingPricePerUnit.toFixed(2));
  } else if (currentResults && currentResults.totalCost && jobQty > 0) {
    unitRate = parseFloat((currentResults.totalCost / jobQty).toFixed(2));
  }

  if (unitRate <= 0) unitRate = 5.00;

  // Set the single calculation item
  invoiceCustomItems = [
    {
      desc: desc,
      hsn: '4819',
      qty: jobQty,
      unit: 'NOS',
      rate: unitRate
    }
  ];

  openCustomInvoiceModal(true);

  // Show a quick friendly notification
  showToast('✅ Calculator job sent to Invoice Studio!');
}

function importCalculationIntoInvoice() {
  sendCalculationToInvoiceStudio();
}

function openCustomInvoiceModal(fromCalc = false) {
  const modal = document.getElementById('customInvoiceModal');
  if (!modal) return;

  // Set default invoice number if empty
  const invInput = document.getElementById('custInvoiceNo');
  if (invInput && (!invInput.value || invInput.value === '077')) {
    invInput.value = getNextInvoiceNumber();
  }

  const dateInput = document.getElementById('custInvoiceDate');
  if (dateInput && !dateInput.value) {
    dateInput.value = new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  if (!fromCalc && (!invoiceCustomItems || invoiceCustomItems.length === 0)) {
    invoiceCustomItems = [
      { desc: 'Packaging Box / Printed Goods', hsn: '4819', qty: 1000, unit: 'NOS', rate: 10.00 }
    ];
  }

  renderInvoiceItemsEditor();
  updateCustomInvoiceLive();
  updateSavedCountBadges();

  modal.classList.add('active');
}

function closeCustomInvoiceModal() {
  const modal = document.getElementById('customInvoiceModal');
  if (modal) modal.classList.remove('active');
}

function renderInvoiceItemsEditor() {
  const container = document.getElementById('invoiceItemsEditorContainer');
  if (!container) return;

  container.innerHTML = '';

  invoiceCustomItems.forEach((item, index) => {
    const row = document.createElement('div');
    row.className = 'invoice-item-editor-row';
    row.style.cssText = 'background:var(--bg); border:1px solid var(--border); border-radius:8px; padding:8px; display:flex; flex-direction:column; gap:6px;';

    row.innerHTML = `
      <div style="display:flex; align-items:center; justify-content:space-between; gap:6px;">
        <span style="font-size:11px; font-weight:700; color:var(--primary);">#${index + 1} Item Details</span>
        ${invoiceCustomItems.length > 1 ? `
          <button type="button" class="btn-icon" style="color:#ef4444; width:24px; height:24px; font-size:12px; background:rgba(239,68,68,0.1); border-radius:4px;" onclick="removeInvoiceItemRow(${index})" title="Remove item">✕</button>
        ` : ''}
      </div>
      <div style="display:grid; grid-template-columns:1fr 90px; gap:6px;">
        <div>
          <label style="font-size:10px; color:var(--text-secondary);">Item Title / Description *</label>
          <input type="text" class="form-control" style="font-size:11px; padding:4px 6px;" value="${item.desc || ''}" placeholder="e.g. LIFAFA / BOX / TAGS" oninput="handleItemFieldChange(${index}, 'desc', this.value)">
        </div>
        <div>
          <label style="font-size:10px; color:var(--text-secondary);">HSN Code</label>
          <input type="text" class="form-control" style="font-size:11px; padding:4px 6px;" value="${item.hsn || '4819'}" placeholder="4819" oninput="handleItemFieldChange(${index}, 'hsn', this.value)">
        </div>
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr 1.2fr; gap:6px;">
        <div>
          <label style="font-size:10px; color:var(--text-secondary);">Qty *</label>
          <input type="number" class="form-control" style="font-size:11px; padding:4px 6px;" min="0.01" step="any" value="${item.qty || 1}" oninput="handleItemFieldChange(${index}, 'qty', this.value)">
        </div>
        <div>
          <label style="font-size:10px; color:var(--text-secondary);">Unit</label>
          <select class="form-control" style="font-size:11px; padding:4px 6px;" onchange="handleItemFieldChange(${index}, 'unit', this.value)">
            <option value="NOS" ${item.unit === 'NOS' ? 'selected' : ''}>NOS</option>
            <option value="PCS" ${item.unit === 'PCS' ? 'selected' : ''}>PCS</option>
            <option value="KGS" ${item.unit === 'KGS' ? 'selected' : ''}>KGS (Weight)</option>
            <option value="SHEETS" ${item.unit === 'SHEETS' ? 'selected' : ''}>SHEETS</option>
            <option value="BOXES" ${item.unit === 'BOXES' ? 'selected' : ''}>BOXES</option>
            <option value="SETS" ${item.unit === 'SETS' ? 'selected' : ''}>SETS</option>
            <option value="ROLLS" ${item.unit === 'ROLLS' ? 'selected' : ''}>ROLLS</option>
          </select>
        </div>
        <div>
          <label style="font-size:10px; color:var(--text-secondary);">Rate (₹) / Unit *</label>
          <input type="number" class="form-control" style="font-size:11px; padding:4px 6px; font-weight:700;" min="0" step="any" value="${item.rate || 0}" oninput="handleItemFieldChange(${index}, 'rate', this.value)">
        </div>
      </div>
    `;
    container.appendChild(row);
  });
}

function handleItemFieldChange(index, field, value) {
  if (!invoiceCustomItems[index]) return;
  if (field === 'qty' || field === 'rate') {
    invoiceCustomItems[index][field] = parseFloat(value) || 0;
  } else {
    invoiceCustomItems[index][field] = value;
  }
  updateCustomInvoiceLive();
}

function addInvoiceItemRow() {
  invoiceCustomItems.push({
    desc: 'New Item',
    hsn: '4819',
    qty: 1000,
    unit: 'NOS',
    rate: 1.00
  });
  renderInvoiceItemsEditor();
  updateCustomInvoiceLive();
}

function removeInvoiceItemRow(index) {
  if (invoiceCustomItems.length > 1) {
    invoiceCustomItems.splice(index, 1);
    renderInvoiceItemsEditor();
    updateCustomInvoiceLive();
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
  let res = 'Indian Rupees ' + whole;
  if (paise > 0) {
    res += ' and ' + inWords(paise) + ' Paise';
  }
  return res + ' Only';
}

function updateCustomInvoiceLive() {
  const renderArea = document.getElementById('customBillRenderArea');
  if (!renderArea) return;

  const docType = document.getElementById('custDocType')?.value || 'TAX INVOICE';
  const badge = document.getElementById('docTypeHeaderBadge');
  if (badge) badge.textContent = docType;

  const invoiceNo = document.getElementById('custInvoiceNo')?.value || getNextInvoiceNumber();
  const invoiceDate = document.getElementById('custInvoiceDate')?.value || new Date().toLocaleDateString('en-IN');
  const dueDate = document.getElementById('custDueDate')?.value || '';

  const buyerName = document.getElementById('custBuyerName')?.value || 'M/s. _________________________________';
  const buyerAddr = document.getElementById('custBuyerAddress')?.value || '';
  const buyerGst = document.getElementById('custBuyerGst')?.value || '';
  const buyerPhone = document.getElementById('custBuyerPhone')?.value || '';

  const gstType = document.getElementById('custGstType')?.value || 'cgst_sgst';
  const gstPercent = parseFloat(document.getElementById('custGstPercent')?.value || '18') || 0;
  const discount = parseFloat(document.getElementById('custDiscount')?.value || '0') || 0;
  const advance = parseFloat(document.getElementById('custAdvance')?.value || '0') || 0;
  const termsNote = document.getElementById('custTermsNote')?.value || 'Goods once sold will not be taken back. Subject to Ghaziabad Jurisdiction.';

  // Calculate items subtotal
  let subtotal = 0;
  let totalQtySum = 0;
  const itemRowsHtml = invoiceCustomItems.map((item, idx) => {
    const qty = parseFloat(item.qty) || 0;
    const rate = parseFloat(item.rate) || 0;
    const amount = qty * rate;
    subtotal += amount;
    totalQtySum += qty;

    return `
      <tr>
        <td style="text-align:center; padding:6px 4px; border:1px solid #1e293b; font-size:11px;">${idx + 1}</td>
        <td style="padding:6px 8px; border:1px solid #1e293b; font-size:12px; font-weight:600; text-align:left;">
          ${item.desc || 'Packaging Item'}
        </td>
        <td style="text-align:center; padding:6px 4px; border:1px solid #1e293b; font-size:11px;">${item.hsn || '4819'}</td>
        <td style="text-align:right; padding:6px 6px; border:1px solid #1e293b; font-size:11px; font-weight:700;">${qty.toLocaleString('en-IN')}</td>
        <td style="text-align:center; padding:6px 4px; border:1px solid #1e293b; font-size:11px;">${item.unit || 'NOS'}</td>
        <td style="text-align:right; padding:6px 6px; border:1px solid #1e293b; font-size:11px; font-weight:600;">₹${rate.toFixed(2)}</td>
        <td style="text-align:right; padding:6px 8px; border:1px solid #1e293b; font-size:12px; font-weight:700;">₹${amount.toFixed(2)}</td>
      </tr>
    `;
  }).join('');

  // Pad empty rows for classic bill book look if fewer than 4 items
  let emptyRowsHtml = '';
  const emptyNeeded = Math.max(0, 4 - invoiceCustomItems.length);
  for (let i = 0; i < emptyNeeded; i++) {
    emptyRowsHtml += `
      <tr style="height:28px;">
        <td style="border:1px solid #1e293b;"></td>
        <td style="border:1px solid #1e293b;"></td>
        <td style="border:1px solid #1e293b;"></td>
        <td style="border:1px solid #1e293b;"></td>
        <td style="border:1px solid #1e293b;"></td>
        <td style="border:1px solid #1e293b;"></td>
        <td style="border:1px solid #1e293b;"></td>
      </tr>
    `;
  }

  // Financial Calculations
  const taxableValue = Math.max(0, subtotal - discount);
  let cgstAmount = 0;
  let sgstAmount = 0;
  let igstAmount = 0;
  let totalGst = 0;

  if (gstType === 'cgst_sgst') {
    const halfRate = gstPercent / 2;
    cgstAmount = (taxableValue * halfRate) / 100;
    sgstAmount = (taxableValue * halfRate) / 100;
    totalGst = cgstAmount + sgstAmount;
  } else if (gstType === 'igst') {
    igstAmount = (taxableValue * gstPercent) / 100;
    totalGst = igstAmount;
  } else if (gstType === 'custom') {
    totalGst = (taxableValue * gstPercent) / 100;
    cgstAmount = totalGst / 2;
    sgstAmount = totalGst / 2;
  } else {
    // exempt / 0
    totalGst = 0;
  }

  const grandTotal = Math.round(taxableValue + totalGst);
  const balanceDue = Math.max(0, grandTotal - advance);
  const wordsText = numberToIndianWords(grandTotal);

  // Render Full A4 Bill Book HTML matching authentic physical bill book
  renderArea.innerHTML = `
    <div class="billbook-sheet" style="font-family:'Inter', Arial, sans-serif; color:#0f172a; border:2px solid #0f172a; padding:16px; background:#fff; box-sizing:border-box; width:100%; max-width:800px; margin:0 auto;">
      
      <!-- Top Bar: GSTIN & Mobiles -->
      <div style="display:flex; justify-content:space-between; align-items:flex-start; font-size:11px; font-weight:700; border-bottom:1.5px solid #0f172a; padding-bottom:4px; margin-bottom:8px;">
        <div>GSTIN: <span style="font-family:monospace; font-size:12px; color:#1e3a8a;">09AWKPN5910E1ZG</span></div>
        <div style="text-align:right;">Mob: <span style="font-family:monospace;">9911678386, 8851627221</span></div>
      </div>

      <!-- Main Header / Logo / Company Name -->
      <div style="text-align:center; margin-bottom:8px;">
        <div style="display:flex; align-items:center; justify-content:center; gap:12px;">
          <img src="logo.png" alt="Logo" style="width:52px; height:52px; object-fit:contain;" onerror="this.style.display='none'">
          <div>
            <h1 style="margin:0; font-size:26px; font-weight:900; letter-spacing:1px; color:#0f172a; text-transform:uppercase;">A S PRINT GALLERY</h1>
            <p style="margin:2px 0 0 0; font-size:10px; font-weight:700; color:#334155; text-transform:uppercase;">
              Mfd. by : Hang Tag, Printed Label, Barcode Sticker, Packaging Box, Heat Transfer Sticker
            </p>
          </div>
        </div>
        <p style="margin:4px 0 0 0; font-size:10px; color:#475569;">
          Kh.no.2326/2, Shankar Garden, Ashok Vihar, Loni, Ghaziabad, (U.P) 201102 &bull; Email: asprintgallery742@gmail.com
        </p>
      </div>

      <!-- Document Title Bar -->
      <div style="background:#0f172a; color:#fff; text-align:center; padding:4px; font-size:13px; font-weight:800; letter-spacing:1.5px; border-radius:3px; margin-bottom:8px; text-transform:uppercase;">
        ${docType}
      </div>

      <!-- Customer & Invoice Meta Grid -->
      <div style="display:grid; grid-template-columns:1.3fr 1fr; border:1px solid #0f172a; margin-bottom:8px; font-size:11px;">
        <div style="padding:6px 8px; border-right:1px solid #0f172a;">
          <div style="font-weight:700; color:#475569; font-size:10px; text-transform:uppercase; margin-bottom:2px;">Billed To / Buyer (M/s):</div>
          <div style="font-size:13px; font-weight:800; color:#0f172a;">${buyerName}</div>
          ${buyerAddr ? `<div style="font-size:11px; margin-top:2px;">${buyerAddr}</div>` : ''}
          ${buyerGst ? `<div style="font-size:11px; font-weight:700; margin-top:2px;">GSTIN: <span style="font-family:monospace;">${buyerGst.toUpperCase()}</span></div>` : ''}
          ${buyerPhone ? `<div style="font-size:11px; margin-top:1px;">Contact: ${buyerPhone}</div>` : ''}
        </div>
        <div style="padding:6px 8px; display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <div style="display:flex; justify-content:space-between; margin-bottom:3px;">
              <span style="font-weight:700;">Invoice / Bill No:</span>
              <span style="font-weight:900; font-family:monospace; font-size:12px; color:#1e3a8a;">#${invoiceNo}</span>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:3px;">
              <span style="font-weight:700;">Date:</span>
              <span style="font-weight:700;">${invoiceDate}</span>
            </div>
            ${dueDate ? `
              <div style="display:flex; justify-content:space-between;">
                <span style="font-weight:700;">Due / Delivery:</span>
                <span>${dueDate}</span>
              </div>
            ` : ''}
          </div>
          <div style="font-size:9px; color:#64748b; text-align:right;">State: Uttar Pradesh (09)</div>
        </div>
      </div>

      <!-- Items Table -->
      <table style="width:100%; border-collapse:collapse; border:1px solid #0f172a; margin-bottom:8px;">
        <thead>
          <tr style="background:#f1f5f9; border-bottom:1.5px solid #0f172a;">
            <th style="width:35px; padding:6px 4px; border:1px solid #0f172a; font-size:10px; font-weight:800; text-align:center;">S.N.</th>
            <th style="padding:6px 8px; border:1px solid #0f172a; font-size:10px; font-weight:800; text-align:left;">Description of Goods</th>
            <th style="width:65px; padding:6px 4px; border:1px solid #0f172a; font-size:10px; font-weight:800; text-align:center;">HSN/SAC</th>
            <th style="width:65px; padding:6px 4px; border:1px solid #0f172a; font-size:10px; font-weight:800; text-align:right;">Qty</th>
            <th style="width:50px; padding:6px 4px; border:1px solid #0f172a; font-size:10px; font-weight:800; text-align:center;">Unit</th>
            <th style="width:75px; padding:6px 4px; border:1px solid #0f172a; font-size:10px; font-weight:800; text-align:right;">Rate (₹)</th>
            <th style="width:85px; padding:6px 6px; border:1px solid #0f172a; font-size:10px; font-weight:800; text-align:right;">Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          ${itemRowsHtml}
          ${emptyRowsHtml}
        </tbody>
      </table>

      <!-- Amount in Words & Totals Box -->
      <div style="display:grid; grid-template-columns:1.3fr 1fr; border:1px solid #0f172a; margin-bottom:8px; font-size:11px;">
        
        <!-- Left: Words & Bank Details & Terms -->
        <div style="padding:6px 8px; border-right:1px solid #0f172a; display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <div style="font-size:10px; font-weight:700; color:#475569;">Amount in Words:</div>
            <div style="font-size:11px; font-weight:800; color:#0f172a; margin-top:2px;">${wordsText}</div>
          </div>

          <div style="margin-top:8px; padding-top:6px; border-top:1px dashed #94a3b8; font-size:10px;">
            <div style="font-weight:800; color:#0f172a; margin-bottom:2px;">Bank Details:</div>
            <div>Bank: <strong>HDFC Bank</strong></div>
            <div>A/C No: <strong style="font-family:monospace; font-size:11px;">50200098986238</strong></div>
            <div>IFSC: <strong style="font-family:monospace;">HDFC0004729</strong></div>
          </div>

          <div style="margin-top:6px; font-size:9px; color:#64748b;">
            <strong>Terms:</strong> ${termsNote}
          </div>
        </div>

        <!-- Right: Totals Breakdown -->
        <div style="padding:6px 8px; font-size:11px;">
          <div style="display:flex; justify-content:space-between; margin-bottom:3px;">
            <span>Sub Total:</span>
            <span style="font-weight:700;">₹${subtotal.toFixed(2)}</span>
          </div>

          ${discount > 0 ? `
            <div style="display:flex; justify-content:space-between; margin-bottom:3px; color:#dc2626;">
              <span>Discount:</span>
              <span style="font-weight:700;">- ₹${discount.toFixed(2)}</span>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:3px;">
              <span>Taxable Value:</span>
              <span style="font-weight:700;">₹${taxableValue.toFixed(2)}</span>
            </div>
          ` : ''}

          ${gstType === 'cgst_sgst' ? `
            <div style="display:flex; justify-content:space-between; margin-bottom:3px;">
              <span>CGST (${(gstPercent/2).toFixed(1)}%):</span>
              <span>₹${cgstAmount.toFixed(2)}</span>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:3px;">
              <span>SGST (${(gstPercent/2).toFixed(1)}%):</span>
              <span>₹${sgstAmount.toFixed(2)}</span>
            </div>
          ` : ''}

          ${gstType === 'igst' ? `
            <div style="display:flex; justify-content:space-between; margin-bottom:3px;">
              <span>IGST (${gstPercent}%):</span>
              <span>₹${igstAmount.toFixed(2)}</span>
            </div>
          ` : ''}

          ${gstType === 'custom' ? `
            <div style="display:flex; justify-content:space-between; margin-bottom:3px;">
              <span>GST (${gstPercent}%):</span>
              <span>₹${totalGst.toFixed(2)}</span>
            </div>
          ` : ''}

          <div style="display:flex; justify-content:space-between; padding-top:4px; margin-top:4px; border-top:1.5px solid #0f172a; font-size:13px; font-weight:900; color:#0f172a;">
            <span>Grand Total:</span>
            <span>₹${grandTotal.toLocaleString('en-IN')}</span>
          </div>

          ${advance > 0 ? `
            <div style="display:flex; justify-content:space-between; margin-top:3px; font-size:11px; color:#059669;">
              <span>Advance Paid:</span>
              <span style="font-weight:700;">₹${advance.toFixed(2)}</span>
            </div>
            <div style="display:flex; justify-content:space-between; margin-top:3px; font-size:12px; font-weight:800; color:#dc2626;">
              <span>Balance Due:</span>
              <span>₹${balanceDue.toLocaleString('en-IN')}</span>
            </div>
          ` : ''}
        </div>
      </div>

      <!-- Signatures Footer -->
      <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-top:14px; padding-top:8px;">
        <div style="text-align:center; width:180px;">
          <div style="border-top:1px solid #0f172a; margin-top:30px; padding-top:4px; font-size:10px; font-weight:700;">
            Customer / Receiver Signature
          </div>
        </div>

        <div style="text-align:center; width:220px;">
          <div style="font-size:11px; font-weight:800; margin-bottom:30px; text-transform:uppercase;">
            For A S PRINT GALLERY
          </div>
          <div style="border-top:1px solid #0f172a; padding-top:4px; font-size:10px; font-weight:700;">
            Authorized Signatory
          </div>
        </div>
      </div>

    </div>
  `;
}

// SAVE BILL TO RECORDS
function saveCustomBillInvoice() {
  const invoiceNo = document.getElementById('custInvoiceNo')?.value || getNextInvoiceNumber();
  const buyerName = document.getElementById('custBuyerName')?.value || 'Client';
  const invoiceDate = document.getElementById('custInvoiceDate')?.value || new Date().toLocaleDateString('en-IN');
  const docType = document.getElementById('custDocType')?.value || 'TAX INVOICE';
  
  let subtotal = 0;
  invoiceCustomItems.forEach(it => {
    subtotal += (parseFloat(it.qty) || 0) * (parseFloat(it.rate) || 0);
  });
  const discount = parseFloat(document.getElementById('custDiscount')?.value || '0') || 0;
  const taxable = Math.max(0, subtotal - discount);
  const gstPercent = parseFloat(document.getElementById('custGstPercent')?.value || '18') || 0;
  const gstType = document.getElementById('custGstType')?.value || 'cgst_sgst';
  const totalGst = gstType === 'exempt' ? 0 : (taxable * gstPercent) / 100;
  const grandTotal = Math.round(taxable + totalGst);

  const billObj = {
    id: 'bill_' + Date.now(),
    invoiceNo: invoiceNo,
    docType: docType,
    buyerName: buyerName,
    buyerAddress: document.getElementById('custBuyerAddress')?.value || '',
    buyerGst: document.getElementById('custBuyerGst')?.value || '',
    buyerPhone: document.getElementById('custBuyerPhone')?.value || '',
    date: invoiceDate,
    dueDate: document.getElementById('custDueDate')?.value || '',
    items: JSON.parse(JSON.stringify(invoiceCustomItems)),
    gstType: gstType,
    gstPercent: gstPercent,
    discount: discount,
    advance: parseFloat(document.getElementById('custAdvance')?.value || '0') || 0,
    termsNote: document.getElementById('custTermsNote')?.value || '',
    grandTotal: grandTotal,
    savedAt: new Date().toISOString()
  };

  const list = getSavedInvoicesList();
  list.unshift(billObj);
  localStorage.setItem('as_saved_invoices_v3', JSON.stringify(list));

  incrementNextInvoiceNumber();
  updateSavedCountBadges();

  showToast(`✅ Bill #${invoiceNo} for ${buyerName} saved to Records!`);
}

function printCustomInvoice() {
  window.print();
}

function copyCustomBillText() {
  const invoiceNo = document.getElementById('custInvoiceNo')?.value || '';
  const buyerName = document.getElementById('custBuyerName')?.value || '';
  const docType = document.getElementById('custDocType')?.value || 'TAX INVOICE';
  const renderArea = document.getElementById('customBillRenderArea');
  
  if (!renderArea) return;

  let text = `*A S PRINT GALLERY*
`;
  text += `GSTIN: 09AWKPN5910E1ZG | Mob: 9911678386, 8851627221
`;
  text += `-----------------------------------------
`;
  text += `*${docType}* #${invoiceNo}
`;
  text += `Date: ${document.getElementById('custInvoiceDate')?.value || ''}
`;
  text += `Buyer: *${buyerName}*
`;
  text += `-----------------------------------------
`;
  text += `*Items:*
`;
  
  let sub = 0;
  invoiceCustomItems.forEach((it, i) => {
    const amt = (parseFloat(it.qty) || 0) * (parseFloat(it.rate) || 0);
    sub += amt;
    text += `${i+1}. ${it.desc} - ${it.qty} ${it.unit} @ ₹${it.rate} = ₹${amt.toFixed(2)}
`;
  });

  const disc = parseFloat(document.getElementById('custDiscount')?.value || '0') || 0;
  const gst = parseFloat(document.getElementById('custGstPercent')?.value || '18') || 0;
  const taxable = sub - disc;
  const gstAmt = (taxable * gst) / 100;
  const tot = Math.round(taxable + gstAmt);

  text += `-----------------------------------------
`;
  text += `Sub Total: ₹${sub.toFixed(2)}
`;
  if (disc > 0) text += `Discount: -₹${disc.toFixed(2)}
`;
  text += `GST (${gst}%): ₹${gstAmt.toFixed(2)}
`;
  text += `*GRAND TOTAL: ₹${tot.toLocaleString('en-IN')}*
`;
  text += `-----------------------------------------
`;
  text += `Bank: HDFC Bank | A/C: 50200098986238 | IFSC: HDFC0004729
`;
  text += `Kh.no.2326/2, Shankar Garden, Ashok Vihar, Loni, Ghaziabad, (U.P) 201102
`;

  navigator.clipboard.writeText(text).then(() => {
    showToast('📋 Bill text copied to clipboard!');
  });
}

function shareCustomBillWhatsApp() {
  const invoiceNo = document.getElementById('custInvoiceNo')?.value || '';
  const buyerName = document.getElementById('custBuyerName')?.value || '';
  const docType = document.getElementById('custDocType')?.value || 'TAX INVOICE';
  
  let text = `*A S PRINT GALLERY*
`;
  text += `GSTIN: 09AWKPN5910E1ZG | Phone: 9911678386, 8851627221
`;
  text += `*${docType}* #${invoiceNo}
`;
  text += `Buyer: *${buyerName}*

`;
  
  let sub = 0;
  invoiceCustomItems.forEach((it, i) => {
    const amt = (parseFloat(it.qty) || 0) * (parseFloat(it.rate) || 0);
    sub += amt;
    text += `▪ *${it.desc}*
   Qty: ${it.qty} ${it.unit} @ ₹${it.rate} = ₹${amt.toFixed(2)}
`;
  });

  const disc = parseFloat(document.getElementById('custDiscount')?.value || '0') || 0;
  const gst = parseFloat(document.getElementById('custGstPercent')?.value || '18') || 0;
  const taxable = sub - disc;
  const gstAmt = (taxable * gst) / 100;
  const tot = Math.round(taxable + gstAmt);

  text += `
*Grand Total: ₹${tot.toLocaleString('en-IN')}*
`;
  text += `Bank: HDFC Bank A/C: 50200098986238 (IFSC: HDFC0004729)
`;
  text += `Thank you for your business!`;

  const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
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

// Ensure saved count badges update on page load
document.addEventListener('DOMContentLoaded', () => {
  updateSavedCountBadges();
});
