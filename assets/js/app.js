


let currentSubstrateTab = 'printed';

function selectSubstrateTab(tab) {
  currentSubstrateTab = tab || 'printed';
  const pPrinted = document.getElementById('panelPrintedSheet');
  const pCorr = document.getElementById('panelCorrSheet');
  const pKappa = document.getElementById('panelKappaSheet');

  const tPrinted = document.getElementById('tabPrintedSheet');
  const tCorr = document.getElementById('tabCorrSheet');
  const tKappa = document.getElementById('tabKappaSheet');

  if (tPrinted && pPrinted) {
    if (currentSubstrateTab === 'printed') {
      tPrinted.classList.add('active');
      tPrinted.classList.remove('corr', 'kappa');
      pPrinted.style.display = 'block';
    } else {
      tPrinted.classList.remove('active', 'corr', 'kappa');
      pPrinted.style.display = 'none';
    }
  }

  if (tCorr && pCorr) {
    if (currentSubstrateTab === 'corr') {
      tCorr.classList.add('active', 'corr');
      pCorr.style.display = 'block';
      const sl = document.getElementById('sl')?.value;
      const sw = document.getElementById('sw')?.value;
      const corrSl = document.getElementById('corrSl');
      const corrSw = document.getElementById('corrSw');
      if (corrSl && (!corrSl.value || corrSl.value === '0') && sl && sl !== '0') corrSl.value = sl;
      if (corrSw && (!corrSw.value || corrSw.value === '0') && sw && sw !== '0') corrSw.value = sw;
    } else {
      tCorr.classList.remove('active', 'corr');
      pCorr.style.display = 'none';
    }
  }

  if (tKappa && pKappa) {
    if (currentSubstrateTab === 'kappa') {
      tKappa.classList.add('active', 'kappa');
      pKappa.style.display = 'block';
      const sl = document.getElementById('sl')?.value;
      const sw = document.getElementById('sw')?.value;
      const kappaSl = document.getElementById('kappaSl');
      const kappaSw = document.getElementById('kappaSw');
      if (kappaSl && (!kappaSl.value || kappaSl.value === '0') && sl && sl !== '0') kappaSl.value = sl;
      if (kappaSw && (!kappaSw.value || kappaSw.value === '0') && sw && sw !== '0') kappaSw.value = sw;
    } else {
      tKappa.classList.remove('active', 'kappa');
      pKappa.style.display = 'none';
    }
  }

  if (typeof calculate === 'function') calculate();
}

function toggleSubstrateLayer(type) {
  selectSubstrateTab(type);
}


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
  const trimmed = (val || '').trim().toLowerCase();
  const presetKeys = ['sweetBox', 'visitingCard', 'monocarton', 'bookCover', 'flyer'];
  const titles = { sweetBox: 'sweet box', visitingCard: 'visiting card', monocarton: 'monocarton', bookCover: 'book cover', flyer: 'flyer' };
  let matchedKey = null;
  if (typeof PRESETS !== 'undefined') {
    for (const k of presetKeys) {
      const p = PRESETS[k];
      if (p && (p.name.toLowerCase() === trimmed || k.toLowerCase() === trimmed || (titles[k] && trimmed.includes(titles[k])))) {
        matchedKey = k;
        break;
      }
    }
  }
  document.querySelectorAll('.preset-chip').forEach(el => el.classList.remove('active'));
  if (matchedKey) {
    const chip = document.getElementById('preset-' + matchedKey);
    if (chip) chip.classList.add('active');
  } else {
    const customChip = document.getElementById('preset-custom');
    if (customChip) customChip.classList.add('active');
  }
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
  if (id === 'paperRate' || id === 'pr') {
    const el = document.getElementById('pr') || document.getElementById('paperRate');
    return el ? (parseFloat(el.value) || 0) : 0;
  }
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
  const batchQty = n('batchQty') || 1000;

  // 1. Substrates Calculation
  const sl = n('sl');
  const sw = n('sw');
  const gsm = n('gsm');
  const pr = n('pr') || n('paperRate');

  const areaM2 = sl * sw * 0.00064516;
  const weightKg = (areaM2 * gsm) / 1000;
  const printedPaperCost = weightKg * pr;
  const weightGrams = weightKg * 1000;

  // Corrugated Calculation
  const corrSl = (typeof n === 'function' ? n('corrSl') : 0) || sl;
  const corrSw = (typeof n === 'function' ? n('corrSw') : 0) || sw;
  const corrGsm = (typeof n === 'function' ? n('corrGsm') : 0);
  const corrPr = (typeof n === 'function' ? n('corrPr') : 0);
  const corrAreaM2 = corrSl * corrSw * 0.00064516;
  const corrWeightKg = (corrAreaM2 * corrGsm) / 1000;
  const corrCost = (corrAreaM2 * corrGsm / 1000) * corrPr;
  const corrWeightGrams = corrWeightKg * 1000;

  // Kappa Board Calculation (No GSM, direct sheet rate)
  const kappaSl = (typeof n === 'function' ? n('kappaSl') : 0) || sl;
  const kappaSw = (typeof n === 'function' ? n('kappaSw') : 0) || sw;
  const kappaPr = (typeof n === 'function' ? n('kappaPr') : 0);
  const kappaCost = kappaPr;

  let paperCost = 0;
  let substrateTitle = '📄 Printed Sheet';
  let activeHeroWeight = weightGrams;

  if (currentSubstrateTab === 'corr') {
    paperCost = corrCost > 0 ? corrCost : printedPaperCost;
    substrateTitle = '📦 Corrugated Sheet';
    activeHeroWeight = corrWeightGrams;
  } else if (currentSubstrateTab === 'kappa') {
    paperCost = kappaCost > 0 ? kappaCost : printedPaperCost;
    substrateTitle = '📑 Kappa Board';
    activeHeroWeight = 0;
  } else {
    paperCost = printedPaperCost;
    substrateTitle = '📄 Printed Sheet';
    activeHeroWeight = weightGrams;
  }

  // 2. Lamination
  const ll = n('ll');
  const lw = n('lw');
  const d = n('divide');
  const lamType = document.getElementById('lamType') ? document.getElementById('lamType').value : 'None';
  let lamPaise = (d && lamType !== 'None') ? ((ll * lw) / d) : 0;
  const lamCost = lamPaise / 100;

  // 3. Leaf / Foil
  const leafType = document.getElementById('leafType') ? document.getElementById('leafType').value : 'None';
  const leafL = n('leafL');
  const leafW = n('leafW');
  const leafDivide = n('leafDivide') || 2.5;
  const leafBlockCharges = n('leafBlock');
  let leafPaise = (leafDivide && leafType !== 'None') ? ((leafL * leafW) / leafDivide) : 0;
  const leafCost = leafPaise / 100;
  const leafBlockPerSheet = batchQty > 0 ? (leafBlockCharges / batchQty) : 0;
  const totalLeafPerSheet = leafCost + leafBlockPerSheet;

  // 4. Printing & Plates
  const printing = n('printing');
  const plateCharges = n('plates');
  const plateCostPerSheet = batchQty > 0 ? (plateCharges / batchQty) : 0;
  const totalPrintingPerSheet = printing + plateCostPerSheet;

  // 5. Die & Die Charges
  const die = n('die');
  const dieCharges = n('dieCharges');
  const dieCostPerSheet = batchQty > 0 ? (dieCharges / batchQty) : 0;
  const totalDiePerSheet = die + dieCostPerSheet;

  // 6. Finishing & Job Work
  const pasting = n('pasting');
  const uv = n('uv');
  const embossed = n('embossed');
  const other = n('other');

  // Direct Unit Cost
  const direct = paperCost + lamCost + totalLeafPerSheet + totalPrintingPerSheet + totalDiePerSheet + pasting + uv + embossed + other;

  // 7. Wastage & Total Unit Cost
  const wastage = n('wastage');
  const wastageCost = (direct * wastage) / 100;
  const cost = direct + wastageCost;

  // 8. Margin & Final Sale Price
  const profit = n('profit');
  const profitAmount = (cost * profit) / 100;
  const finalPrice = cost + profitAmount;

  // 8B. GST Tax Calculation
  const calcGstRate = typeof n === 'function' ? n('calcGstRate') : 0;
  const gstUnitAmount = (finalPrice * calcGstRate) / 100;
  const finalPriceWithGst = finalPrice + gstUnitAmount;

  // 9. Batch Totals
  const totalBatchCost = cost * batchQty;
  const totalBatchPrice = finalPrice * batchQty;
  const totalBatchProfit = profitAmount * batchQty;
  const totalBatchGst = (totalBatchPrice * calcGstRate) / 100;
  const totalBatchPriceWithGst = totalBatchPrice + totalBatchGst;

  // ================= UI UPDATES =================

  // Hero Section
  updateText('heroFinalPrice', money(finalPrice));
  updateText('heroUnitCost', money(cost));
  updateText('heroUnitProfit', money(profitAmount));
  updateText('heroBatchTotal', money(totalBatchPrice));
  updateText('heroBatchCost', money(totalBatchCost));
  updateText('heroBatchProfit', money(totalBatchProfit));
  updateText('batchTotalCost', money(totalBatchCost));
  updateText('batchTotalProfit', money(totalBatchProfit));

  updateText('calcGstAmount', calcGstRate > 0 ? `+${money(gstUnitAmount)} (${calcGstRate}%)` : '+₹0.00');
  updateText('calcFinalPriceWithGst', money(finalPriceWithGst));

  if (calcGstRate > 0) {
    updateText('heroFinalPrice', money(finalPriceWithGst));
    updateText('batchTotalPrice', money(totalBatchPriceWithGst));
    const bgstEl = document.getElementById('batchGstBreakdown');
    if (bgstEl) {
      bgstEl.style.display = 'inline';
      updateText('batchTotalGst', money(totalBatchGst));
    }
  } else {
    updateText('heroFinalPrice', money(finalPrice));
    updateText('batchTotalPrice', money(totalBatchPrice));
    const bgstEl = document.getElementById('batchGstBreakdown');
    if (bgstEl) bgstEl.style.display = 'none';
  }
  updateText('heroWeight', activeHeroWeight > 0 ? activeHeroWeight.toFixed(2) + ' g' : (currentSubstrateTab === 'kappa' ? 'Rigid Board' : '0 g'));

  if (typeof syncBatchPills === 'function') syncBatchPills(batchQty);

  // Itemized Breakdown: 3 Substrates
  updateText('printedSheetCost', money(printedPaperCost));
  const pMeta = document.getElementById('printedSheetMeta');
  if (pMeta) {
    pMeta.innerHTML = (sl && sw && gsm) ? 'Size: <b>' + sl + '×' + sw + '"</b> | <b>' + gsm + ' GSM</b> | Weight: <b id="weight">' + weightGrams.toFixed(2) + ' g</b>' : 'Weight: <b id="weight">' + weightGrams.toFixed(2) + ' g</b>';
  }

  updateText('corrSheetCost', money(corrCost));
  const cMeta = document.getElementById('corrSheetMeta');
  if (cMeta) {
    cMeta.innerHTML = (corrSl && corrSw && corrGsm) ? 'Size: <b>' + corrSl + '×' + corrSw + '"</b> | <b>' + corrGsm + ' GSM</b> | Weight: <b id="corrWeight">' + corrWeightGrams.toFixed(2) + ' g</b>' : 'Weight: <b id="corrWeight">' + corrWeightGrams.toFixed(2) + ' g</b>';
  }

  updateText('kappaSheetCost', money(kappaCost));
  const kMeta = document.getElementById('kappaSheetMeta');
  if (kMeta) {
    kMeta.innerHTML = (kappaSl && kappaSw) ? 'Size: <b>' + kappaSl + '×' + kappaSw + '"</b> | Sheet Rate: <b>₹' + kappaPr + '</b> (No GSM)' : 'Direct Sheet Rate: <b>₹' + kappaPr + '</b> (No GSM)';
  }

  // Highlight active selected substrate row
  const rowP = document.getElementById('rowPrintedSheetBreakdown');
  const rowC = document.getElementById('rowCorrSheetBreakdown');
  const rowK = document.getElementById('rowKappaSheetBreakdown');
  if (rowP) rowP.style.opacity = (currentSubstrateTab === 'printed' || printedPaperCost > 0) ? '1' : '0.6';
  if (rowC) rowC.style.opacity = (currentSubstrateTab === 'corr' || corrCost > 0) ? '1' : '0.6';
  if (rowK) rowK.style.opacity = (currentSubstrateTab === 'kappa' || kappaCost > 0) ? '1' : '0.6';

  updateText('paperCost', money(paperCost));
  updateText('weight', activeHeroWeight > 0 ? activeHeroWeight.toFixed(2) + ' g' : '0 g');

  // Lamination
  const lamNameEl = document.getElementById('lamName');
  if (lamNameEl) {
    lamNameEl.textContent = (lamType === 'None') ? 'Lamination' : lamType + ' Lamination';
  }
  const lamCostEl = document.getElementById('lamCost');
  if (lamCostEl) {
    lamCostEl.textContent = (lamType === 'None') ? '₹0.00' : `${lamPaise.toFixed(2)}p (${money(lamCost)})`;
  }

  // Leaf / Foil
  const leafNameEl = document.getElementById('leafName');
  if (leafNameEl) {
    leafNameEl.textContent = (leafType === 'None') ? 'Leaf / Foil Stamping' : leafType + ' Stamping';
  }
  const leafCostEl = document.getElementById('leafCost');
  if (leafCostEl) {
    leafCostEl.textContent = (leafType === 'None') ? '₹0.00' : `${leafPaise.toFixed(2)}p (${money(totalLeafPerSheet)})`;
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

  // Pasting, UV, Embossed, Other, Wastage
  updateText('rPasting', money(pasting));
  updateText('rUv', money(uv));
  updateText('rEmbossed', money(embossed));
  updateText('rOther', money(other));
  updateText('rWastage', money(wastageCost));

  // Totals
  updateText('total', money(cost));
  updateText('final', money(finalPrice));
  updateText('batchQuantityDisplay', batchQty.toLocaleString('en-IN') + ' Sheets');
  updateText('rBatchQty', batchQty.toLocaleString('en-IN'));

  // Visual simulation preview
  if (typeof updateSheetVisual === 'function') updateSheetVisual(sl, sw, ll, lw, lamType, leafL, leafW, leafType);

  // Sync Global State
  window.currentCalcBreakdown = {
    jobTitle: document.getElementById('jobType')?.value || 'Custom Packaging Box',
    batchQty: batchQty,
    substrateTitle: substrateTitle,
    paperCost: paperCost,
    printedPaperCost: printedPaperCost,
    corrCost: corrCost,
    kappaCost: kappaCost,
    lamCost: lamCost,
    totalLeafPerSheet: totalLeafPerSheet,
    totalPrintingPerSheet: totalPrintingPerSheet,
    totalDiePerSheet: totalDiePerSheet,
    pasting: pasting,
    uv: uv,
    embossed: embossed,
    other: other,
    direct: direct,
    wastageCost: wastageCost,
    cost: cost,
    profitAmount: profitAmount,
    finalPrice: finalPrice,
    sellingPricePerUnit: finalPrice
  };
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











// Quick GSM Chip Handler
function setGsm(val) {
  const el = document.getElementById('gsm');
  if (el) {
    el.value = val;
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }
  calculate();
  syncActiveChips();
}

// Quick Paper Rate Chip Handler
function setPaperRate(val) {
  const el = document.getElementById('pr');
  if (el) {
    el.value = val;
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }
  calculate();
  syncActiveChips();
}

// Quick Sheet Size Selector
function setSheetSize(sl, sw) {
  const slEl = document.getElementById('sl');
  const swEl = document.getElementById('sw');
  if (slEl) slEl.value = sl;
  if (swEl) swEl.value = sw;
  if (slEl) slEl.dispatchEvent(new Event('input', { bubbles: true }));
  if (swEl) swEl.dispatchEvent(new Event('input', { bubbles: true }));
  calculate();
  syncActiveChips();
}











// Quick Batch Pill





function syncBatchPills(qty) {
  const target = parseFloat(qty) || (document.getElementById('batchQty') ? parseFloat(document.getElementById('batchQty').value) : 1000);
  document.querySelectorAll('.batch-pill').forEach(btn => {
    const bVal = parseFloat(btn.getAttribute('data-qty'));
    btn.classList.toggle('active', Math.abs(bVal - target) < 0.1);
  });
}


function setCalcGst(rate) {
  const el = document.getElementById('calcGstRate');
  if (el) el.value = rate;
  document.querySelectorAll('[data-chip-type="calcGst"]').forEach(btn => {
    btn.classList.toggle('active', parseFloat(btn.getAttribute('data-val')) === parseFloat(rate));
  });
  calculate();
}

function setBatchQty(qty) {
  const el = document.getElementById('batchQty');
  if (el) el.value = qty;
  syncBatchPills(qty);
  calculate();
}











// Dynamic Chip Highlighting (Keeps UI fully in sync with current state)





function syncActiveChips() {





  const sl = n('sl'), sw = n('sw');





  const gsm = n('gsm');





  const paperRate = n('pr') || n('paperRate');





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
  if (!p) return;

  const jobTypeInput = document.getElementById('jobType');
  if (jobTypeInput) {
    const titles = { sweetBox: 'Sweet Box Packaging', visitingCard: 'Visiting Card Sheet', monocarton: 'Monocarton Box', bookCover: 'Book Cover', flyer: 'Flyer / Brochure' };
    jobTypeInput.value = titles[key] || p.name || 'Custom Job';
  }

  if (document.getElementById('sl')) document.getElementById('sl').value = p.sl;
  if (document.getElementById('sw')) document.getElementById('sw').value = p.sw;
  if (document.getElementById('gsm')) document.getElementById('gsm').value = p.gsm;
  if (document.getElementById('pr')) document.getElementById('pr').value = p.pr;
  if (document.getElementById('paperRate')) document.getElementById('paperRate').value = p.pr;

  if (document.getElementById('lamType')) document.getElementById('lamType').value = p.lamType;
  if (document.getElementById('ll')) document.getElementById('ll').value = p.ll;
  if (document.getElementById('lw')) document.getElementById('lw').value = p.lw;
  if (document.getElementById('divide')) document.getElementById('divide').value = p.divide;

  if (document.getElementById('leafType')) document.getElementById('leafType').value = p.leafType;
  if (document.getElementById('leafL')) document.getElementById('leafL').value = p.leafL;
  if (document.getElementById('leafW')) document.getElementById('leafW').value = p.leafW;
  if (document.getElementById('leafDivide')) document.getElementById('leafDivide').value = p.leafDivide;
  if (document.getElementById('leafBlock')) document.getElementById('leafBlock').value = p.leafBlock;

  if (document.getElementById('printing')) document.getElementById('printing').value = p.printing;
  if (document.getElementById('plates')) document.getElementById('plates').value = p.plates;
  if (document.getElementById('die')) document.getElementById('die').value = p.die;
  if (document.getElementById('dieCharges')) document.getElementById('dieCharges').value = p.dieCharges;
  if (document.getElementById('pasting')) document.getElementById('pasting').value = p.pasting;
  if (document.getElementById('uv')) document.getElementById('uv').value = p.uv;
  if (document.getElementById('embossed')) document.getElementById('embossed').value = p.embossed;
  if (document.getElementById('other')) document.getElementById('other').value = p.other;
  if (document.getElementById('wastage')) document.getElementById('wastage').value = p.wastage;
  if (document.getElementById('profit')) document.getElementById('profit').value = p.profit;
  if (document.getElementById('batchQty')) {
    document.getElementById('batchQty').value = p.batchQty;
  }

  document.querySelectorAll('.preset-chip').forEach(el => el.classList.remove('active'));
  const activeChip = document.getElementById('preset-' + key);
  if (activeChip) activeChip.classList.add('active');

  if (typeof syncBatchPills === 'function') syncBatchPills(p.batchQty);
  if (typeof syncActiveChips === 'function') syncActiveChips();

  showToast(`Loaded "${p.name}" preset`);
  calculate();
}











function resetCalculator() {
  if (document.getElementById('sl')) document.getElementById('sl').value = 0;
  if (document.getElementById('sw')) document.getElementById('sw').value = 0;
  if (document.getElementById('gsm')) document.getElementById('gsm').value = 0;
  if (document.getElementById('pr')) document.getElementById('pr').value = 0;
  if (document.getElementById('paperRate')) document.getElementById('paperRate').value = 0;

  if (document.getElementById('corrSl')) document.getElementById('corrSl').value = 0;
  if (document.getElementById('corrSw')) document.getElementById('corrSw').value = 0;
  if (document.getElementById('corrGsm')) document.getElementById('corrGsm').value = 0;
  if (document.getElementById('corrPr')) document.getElementById('corrPr').value = 0;

  if (document.getElementById('kappaSl')) document.getElementById('kappaSl').value = 0;
  if (document.getElementById('kappaSw')) document.getElementById('kappaSw').value = 0;
  if (document.getElementById('kappaPr')) document.getElementById('kappaPr').value = 0;

  if (document.getElementById('lamType')) document.getElementById('lamType').value = 'None';
  if (document.getElementById('ll')) document.getElementById('ll').value = 0;
  if (document.getElementById('lw')) document.getElementById('lw').value = 0;
  if (document.getElementById('divide')) document.getElementById('divide').value = 0;

  if (document.getElementById('leafType')) document.getElementById('leafType').value = 'None';
  if (document.getElementById('leafL')) document.getElementById('leafL').value = 0;
  if (document.getElementById('leafW')) document.getElementById('leafW').value = 0;
  if (document.getElementById('leafDivide')) document.getElementById('leafDivide').value = 0;
  if (document.getElementById('leafBlock')) document.getElementById('leafBlock').value = 0;

  if (document.getElementById('printing')) document.getElementById('printing').value = 0;
  if (document.getElementById('plates')) document.getElementById('plates').value = 0;
  if (document.getElementById('die')) document.getElementById('die').value = 0;
  if (document.getElementById('dieCharges')) document.getElementById('dieCharges').value = 0;
  if (document.getElementById('pasting')) document.getElementById('pasting').value = 0;
  if (document.getElementById('uv')) document.getElementById('uv').value = 0;
  if (document.getElementById('embossed')) document.getElementById('embossed').value = 0;
  if (document.getElementById('other')) document.getElementById('other').value = 0;
  if (document.getElementById('wastage')) document.getElementById('wastage').value = 0;
  if (document.getElementById('profit')) document.getElementById('profit').value = 0;

  isCorrugatedEnabled = false;
  isKappaEnabled = false;
  if (typeof selectSubstrateTab === 'function') selectSubstrateTab('printed');

  setCustomPresetActive();
  syncActiveChips();
  calculate();
  showToast('🔄 Calculator set to zero (0)!');
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

// AS PRINT GALLERY - OFFICIAL BILLING, INVOICE & HISTORY SYSTEM

// ============================================================




let currentQuoteMode = 'customer';

// Unified Sequential Numbering starting from '01'
function getNextInvoiceNumber() {
  let stored = localStorage.getItem('as_bill_seq_v5');
  if (!stored) {
    let old = parseInt(localStorage.getItem('as_next_invoice_seq') || '', 10);
    if (!isNaN(old) && old > 0 && old !== 71 && old !== 77) {
      stored = String(old);
    } else {
      const list = getSavedInvoicesList();
      if (list.length > 0) {
        let maxNum = 0;
        list.forEach(item => {
          let n = parseInt(String(item.invoiceNo || '').replace(/[^0-9]/g, ''), 10);
          if (!isNaN(n) && n > maxNum && n < 10000) maxNum = n;
        });
        stored = String(maxNum > 0 ? maxNum + 1 : 1);
      } else {
        stored = '1';
      }
    }
    localStorage.setItem('as_bill_seq_v5', stored);
  }
  let num = parseInt(stored, 10);
  if (isNaN(num) || num <= 0) num = 1;
  return String(num).padStart(2, '0');
}

function incrementNextInvoiceNumber() {
  let current = parseInt(getNextInvoiceNumber(), 10);
  let next = current + 1;
  localStorage.setItem('as_bill_seq_v5', String(next));
  localStorage.setItem('as_next_invoice_seq', String(next));

  const custInv = document.getElementById('custInvoiceNo');
  if (custInv) custInv.value = String(next).padStart(2, '0');

  const quoteInv = document.getElementById('invoiceNoInput');
  if (quoteInv) quoteInv.value = String(next).padStart(2, '0');

  const statSeq = document.getElementById('statNextSeq');
  if (statSeq) statSeq.textContent = '#' + String(next).padStart(2, '0');

  const nextBadge = document.getElementById('nextBillNumBadge');
  if (nextBadge) nextBadge.textContent = String(next).padStart(2, '0');

  return String(next).padStart(2, '0');
}

function toggleMobileDrawer() {
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('mobileDrawerOverlay');
  if (!drawer) return;
  const isActive = drawer.classList.contains('active');
  if (isActive) {
    closeMobileDrawer();
  } else {
    openMobileDrawer();
  }
}

function openMobileDrawer() {
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('mobileDrawerOverlay');
  if (drawer) drawer.classList.add('active');
  if (overlay) overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  updateSavedCountBadges();
}

function closeMobileDrawer() {
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('mobileDrawerOverlay');
  if (drawer) drawer.classList.remove('active');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';
}

function updateSavedCountBadges() {
  try {
    const history = getSavedInvoicesList();
    const count = history.length;
    ['savedCountBadgeNav', 'savedCountBadgeMobile', 'savedCountBadge2', 'savedCountBadge3', 'savedCountBadge'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = count;
    });

    const statTotal = document.getElementById('statTotalBills');
    if (statTotal) statTotal.textContent = count;

    let sum = 0;
    history.forEach(item => {
      let amt = parseFloat(item.grandTotal || item.totalAmount || item.customRate * item.customQty || 0);
      if (!isNaN(amt)) sum += amt;
    });
    const statAmt = document.getElementById('statTotalAmount');
    if (statAmt) statAmt.textContent = '₹' + Math.round(sum).toLocaleString('en-IN');

    const statSeq = document.getElementById('statNextSeq');
    if (statSeq) statSeq.textContent = '#' + getNextInvoiceNumber();

    const nextBadge = document.getElementById('nextBillNumBadge');
    if (nextBadge) nextBadge.textContent = getNextInvoiceNumber();
  } catch (e) {
    console.error(e);
  }
}

function updateSavedCountBadge() {
  updateSavedCountBadges();
}




function getSavedInvoicesList() {

  try {

    return JSON.parse(localStorage.getItem('as_saved_invoices') || '[]');

  } catch (e) {

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
    if (typeof calculate === 'function') calculate();

    const quoteInv = document.getElementById('quoteInvoiceNo');
    if (quoteInv && !quoteInv.value) {
      quoteInv.value = getNextInvoiceNumber();
    }

    const b = window.currentCalcBreakdown || {};
    const rateInput = document.getElementById('customBillingRate');
    if (rateInput && (!rateInput.value || parseFloat(rateInput.value) <= 0)) {
      if (b.finalPrice > 0) {
        rateInput.value = b.finalPrice.toFixed(2);
      } else {
        const heroPriceText = document.getElementById('heroFinalPrice')?.innerText || document.getElementById('final')?.innerText || '';
        const parsedHero = parseFloat(heroPriceText.replace(/[^0-9.]/g, ''));
        if (!isNaN(parsedHero) && parsedHero > 0) {
          rateInput.value = parsedHero.toFixed(2);
        } else {
          rateInput.value = '1.85';
        }
      }
    }
    const qtyInput = document.getElementById('customBillingQty');
    if (qtyInput && (!qtyInput.value || parseFloat(qtyInput.value) <= 0)) {
      if (b.batchQty > 0) {
        qtyInput.value = b.batchQty;
      } else {
        qtyInput.value = 1000;
      }
    }

    renderQuotationPreview();
    updateSavedCountBadges();
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
  const docTitle = document.getElementById('quoteDocTitle')?.value || document.getElementById('docTitleSelect')?.value || 'ESTIMATION / QUOTATION';
  const invoiceNo = document.getElementById('quoteInvoiceNo')?.value || document.getElementById('invoiceNoInput')?.value || getNextInvoiceNumber();
  const invoiceDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit', month: '2-digit', year: 'numeric'
  });

  const companyGstin = '09AWKPN5910E1ZG';
  const companyMobiles = '9911678386';
  const companyName = 'AS PRINT GALLERY';
  const companyMfd = 'Mfd. by : Hang Tag, Printed Label, Barcode Sticker, Packaging Box, Paper Bag, Corrugated Box';
  const companyAddress = 'Add: Kh.no.2326/2, Shankar Garden, Ashok Vihar, Loni, Ghaziabad, (U.P) 201102';

  const clientName = document.getElementById('quoteClientName')?.value || 'Valued Client';
  const clientAddress = document.getElementById('clientAddressInput')?.value || '';
  const clientState = document.getElementById('clientStateInput')?.value || 'Uttar Pradesh (09)';
  const clientPhone = document.getElementById('quoteClientPhone')?.value || document.getElementById('clientPhoneInput')?.value || '';
  const clientGstin = document.getElementById('clientGstinInput')?.value || '';

  const transportMode = document.getElementById('transportModeInput')?.value || 'Direct Dispatch / By Hand';
  const vehicleNo = document.getElementById('vehicleNoInput')?.value || '-';

  const jobTitle = document.getElementById('jobTitleInput')?.value || 'PRINTED PACKAGING BOX';
  const hsn = document.getElementById('hsnInput')?.value || '4819';
  const billingUnit = document.getElementById('billingUnitSelect')?.value || 'NOS';
  const customDesc = document.getElementById('customItemDescInput')?.value?.trim() || '';

  const sl = n('sl'), sw = n('sw'), gsm = n('gsm');
  const pr = n('pr') || n('paperRate');
  const ll = n('ll'), lw = n('lw'), d = n('divide');
  const lamType = document.getElementById('lamType')?.value || 'None';

  const leafL = n('leafL'), leafW = n('leafW'), leafDivide = n('leafDivide');
  const leafType = document.getElementById('leafType')?.value || 'None';
  const leafBlock = n('leafBlock');

  const b = window.currentCalcBreakdown || {};
  const calcBatchQty = b.batchQty || n('batchQty') || 1000;

  // Paper Weight & Cost
  const areaM2 = sl * sw * 0.00064516;
  const weightKg = (areaM2 * gsm) / 1000;
  const paperCost = (b.paperCost !== undefined) ? b.paperCost : (weightKg * pr);
  const totalWeightAllSheets = weightKg * calcBatchQty;

  // Lamination
  let lamPaise = (d && lamType !== 'None') ? (ll * lw / d) : 0;
  const lamCost = (b.lamCost !== undefined) ? b.lamCost : (lamPaise / 100);

  // Leaf Foil
  let leafPaise = (leafDivide && leafType !== 'None') ? (leafL * leafW / leafDivide) : 0;
  const leafCost = leafPaise / 100;
  const leafBlockPerSheet = calcBatchQty > 0 ? (leafBlock / calcBatchQty) : 0;
  const totalLeafPerSheet = (b.totalLeafPerSheet !== undefined) ? b.totalLeafPerSheet : (leafCost + leafBlockPerSheet);

  // Printing & Plates
  const printing = n('printing');
  const plates = n('plates');
  const plateCostPerSheet = calcBatchQty > 0 ? (plates / calcBatchQty) : 0;
  const totalPrintingPerSheet = (b.totalPrintingPerSheet !== undefined) ? b.totalPrintingPerSheet : (printing + plateCostPerSheet);

  // Die & Die Charges
  const die = n('die');
  const dieCharges = n('dieCharges');
  const dieCostPerSheet = calcBatchQty > 0 ? (dieCharges / calcBatchQty) : 0;
  const totalDiePerSheet = (b.totalDiePerSheet !== undefined) ? b.totalDiePerSheet : (die + dieCostPerSheet);

  const pasting = (b.pasting !== undefined) ? b.pasting : n('pasting');
  const uv = (b.uv !== undefined) ? b.uv : n('uv');
  const embossed = (b.embossed !== undefined) ? b.embossed : n('embossed');
  const other = (b.other !== undefined) ? b.other : n('other');

  const direct = paperCost + lamCost + totalLeafPerSheet + totalPrintingPerSheet + totalDiePerSheet + pasting + uv + embossed + other;
  const wastage = n('wastage');
  const wastageCost = direct * wastage / 100;
  const cost = direct + wastageCost;
  const profit = n('profit');
  const profitAmount = cost * profit / 100;
  let calcFinalPricePerSheet = (b.finalPrice && b.finalPrice > 0) ? b.finalPrice : (cost + profitAmount);
  if (!calcFinalPricePerSheet || calcFinalPricePerSheet <= 0) {
    const heroPriceText = document.getElementById('heroFinalPrice')?.innerText || document.getElementById('final')?.innerText || '';
    const parsedHero = parseFloat(heroPriceText.replace(/[^0-9.]/g, ''));
    if (!isNaN(parsedHero) && parsedHero > 0) {
      calcFinalPricePerSheet = parsedHero;
    } else {
      calcFinalPricePerSheet = 1.85;
    }
  }

  // Manual Billing Qty & Rate overrides
  let billQty = parseFloat(document.getElementById('customBillingQty')?.value);
  if (isNaN(billQty) || billQty <= 0) {
    billQty = (billingUnit === 'KGS' && totalWeightAllSheets > 0) ? parseFloat(totalWeightAllSheets.toFixed(2)) : calcBatchQty;
  }
  if (!billQty || billQty <= 0) billQty = 1000;

  let billRate = parseFloat(document.getElementById('customBillingRate')?.value);
  if (isNaN(billRate) || billRate <= 0) {
    if (billingUnit === 'KGS') {
      billRate = (totalWeightAllSheets > 0) ? (calcFinalPricePerSheet * calcBatchQty / totalWeightAllSheets) : calcFinalPricePerSheet;
    } else {
      billRate = calcFinalPricePerSheet;
    }
  }
  if (!billRate || billRate <= 0) {
    billRate = calcFinalPricePerSheet > 0 ? calcFinalPricePerSheet : 1.85;
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

  const itemRowsHtml = `
    <tr>
      <td style="text-align:center; font-weight:bold; border-right:1.5px solid #000; padding:6px 4px; width:38px;">1</td>
      <td style="text-align:left; border-right:1.5px solid #000; padding:6px 8px;">
        <div style="font-weight:900; font-size:12px; color:#000;">${jobTitle}</div>
        <div style="font-size:10.5px; color:#334155; margin-top:3px; line-height:1.35;">${displayDesc}</div>
      </td>
      <td style="text-align:center; font-weight:bold; border-right:1.5px solid #000; padding:6px 4px; width:78px;">${hsn}</td>
      <td style="text-align:center; font-weight:bold; border-right:1.5px solid #000; padding:6px 4px; width:85px;">${billQty.toLocaleString('en-IN')} ${billingUnit}</td>
      <td style="text-align:right; font-weight:bold; border-right:1.5px solid #000; padding:6px 6px; width:75px;">₹${billRate.toFixed(2)}</td>
      <td style="text-align:right; font-weight:bold; padding:6px 8px; width:105px;">₹${taxableTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
    </tr>
  `;

  let emptyRowsHtml = `
    <tr style="height:140px;">
      <td style="border-right:1.5px solid #000;"></td>
      <td style="border-right:1.5px solid #000;"></td>
      <td style="border-right:1.5px solid #000;"></td>
      <td style="border-right:1.5px solid #000;"></td>
      <td style="border-right:1.5px solid #000;"></td>
      <td style="border-right:1.5px solid #000;"></td>
    </tr>
  `;

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

        <!-- Main Header: Brand & Address with Top Left Logo -->
        <div class="bill-header-center">
          <div class="bill-brand-logo-box">
            <img src="assets/images/logo.png" alt="Logo" class="bill-brand-logo" onerror="this.style.display='none'">
          </div>
          <div class="bill-brand-center-text">
            <div class="bill-brand-name">AS PRINT GALLERY</div>
            <div class="bill-mfd-tag">${companyMfd}</div>
            <div class="bill-address-tag">${companyAddress}</div>
          </div>
          <div class="bill-brand-right-spacer"></div>
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
              <span class="bill-field-lbl">GSTIN/Unique ID :</span>
              <span class="bill-field-val" style="font-weight:bold;">${clientGstin || '-'}</span>
            </div>
            <div class="bill-field-row">
              <span class="bill-field-lbl">Mobile :</span>
              <span class="bill-field-val" style="font-weight:bold; color:#000;">${clientPhone || '-'}</span>
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
        <!-- Goods / Item Table with Exact Fixed Column Widths -->
        <table class="bill-items-table">
          <colgroup>
            <col style="width:38px;">
            <col style="width:auto;">
            <col style="width:78px;">
            <col style="width:85px;">
            <col style="width:75px;">
            <col style="width:105px;">
          </colgroup>
          <thead>
            <tr>
              <th style="width:38px; text-align:center;">S.No.</th>
              <th style="text-align:left; padding-left:8px;">DESCRIPTION OF GOODS</th>
              <th style="width:78px; text-align:center;">HSN CODE</th>
              <th style="width:85px; text-align:center;">QTY.</th>
              <th style="width:75px; text-align:right;">RATE</th>
              <th style="width:105px; text-align:right; padding-right:8px;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${itemRowsHtml}
            ${emptyRowsHtml}
            

            <!-- Summary Rows: Colspan 3 + Colspan 2 + Colspan 1 -->
            <tr class="bill-summary-row" style="background:#fafafa;">
              <td colspan="3" style="border-right:1.5px solid #000; font-size:10px; padding:4px 6px;">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:4px;">
                  <span><b>Reverse Charge:</b> Yes [ ${reverseCharge === 'Yes' ? '✓' : ' '} ] &nbsp; No [ ${reverseCharge === 'No' ? '✓' : ' '} ]</span>
                  <span style="font-weight:bold; color:#0f172a;">
                    ${cgstAmt > 0 ? `CGST (${cgstRate}%): ₹${cgstAmt.toFixed(2)} | SGST (${sgstRate}%): ₹${sgstAmt.toFixed(2)} | Tax: ₹${totalTaxAmount.toFixed(2)}` : (igstAmt > 0 ? `IGST (${igstRate}%): ₹${igstAmt.toFixed(2)}` : 'GST: Nil / Exempt')}
                  </span>
                </div>
              </td>
              <td colspan="2" style="text-align:right; font-weight:bold; font-size:11px; padding:4px 8px; border-right:1.5px solid #000; white-space:nowrap;">Total Before Tax</td>
              <td style="text-align:right; font-weight:bold; font-size:11.5px; padding:4px 8px; white-space:nowrap;">₹${taxableTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            </tr>

            <!-- Final Grand Total Row -->
            <tr class="bill-total-final-row" style="background:#fafafa;">
              <td colspan="3" style="border-right:1.5px solid #000; font-weight:bold; font-size:10.5px; padding:5px 6px;">
                GST on Reverse Charge: ₹0.00
              </td>
              <td colspan="2" style="text-align:right; font-size:11.5px; font-weight:900; padding:5px 14px; border-right:1.5px solid #000; white-space:nowrap; font-family:'Swiss 721', 'Swis721 BT', 'Helvetica Neue', Helvetica, Arial, sans-serif;">
                Total Amount After Tax
              </td>
              <td style="text-align:right; font-size:13px; font-weight:900; padding:5px 10px; white-space:nowrap; font-family:'Swiss 721', 'Swis721 BT', 'Helvetica Neue', Helvetica, Arial, sans-serif;">
                ₹${grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
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
          <div style="font-weight:900; font-size:11px; font-family:'Swiss 721', 'Swis721 BT', 'Helvetica Neue', Helvetica, Arial, sans-serif;">For AS PRINT GALLERY</div>
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




function getSavedInvoicesList() {
  try {
    const rawV3 = localStorage.getItem('as_saved_invoices_v3');
    let list = rawV3 ? JSON.parse(rawV3) : [];

    // Check if there are legacy invoices in as_saved_invoices
    const rawLegacy = localStorage.getItem('as_saved_invoices');
    if (rawLegacy) {
      try {
        const legacyList = JSON.parse(rawLegacy);
        if (Array.isArray(legacyList) && legacyList.length > 0) {
          legacyList.forEach(leg => {
            if (!list.some(item => item.id === leg.id || (item.invoiceNo === leg.invoiceNo && item.invoiceDate === leg.invoiceDate))) {
              list.push({
                id: leg.id || ('leg_' + Date.now() + Math.random()),
                invoiceNo: leg.invoiceNo || '01',
                docTitle: leg.docTitle || 'TAX INVOICE',
                docType: leg.docTitle || 'TAX INVOICE',
                date: leg.invoiceDate || leg.date || new Date().toLocaleDateString('en-IN'),
                invoiceDate: leg.invoiceDate || leg.date || new Date().toLocaleDateString('en-IN'),
                clientName: leg.clientName || 'Valued Client',
                buyerName: leg.clientName || 'Valued Client',
                receiverAddress: leg.clientAddress || leg.receiverAddress || '',
                receiverState: leg.clientState || leg.receiverState || '',
                receiverPhone: leg.receiverPhone || '',
                receiverGstin: leg.clientGstin || leg.receiverGstin || '',
                transportMode: leg.transportMode || '',
                vehicleNo: leg.vehicleNo || '',
                jobTitle: leg.jobTitle || 'Custom Print Job',
                grandTotal: parseFloat(leg.grandTotal || (leg.customQty && leg.customRate ? leg.customQty * leg.customRate : 0)),
                items: leg.items || [{
                  title: leg.jobTitle || 'Print Job',
                  desc: leg.customDesc || '',
                  hsn: leg.hsn || '4819',
                  qty: parseFloat(leg.customQty) || 1000,
                  unit: leg.billingUnit || 'NOS',
                  rate: parseFloat(leg.customRate) || 0,
                  amount: (parseFloat(leg.customQty) || 1000) * (parseFloat(leg.customRate) || 0)
                }],
                savedAt: leg.savedAt || new Date().toISOString()
              });
            }
          });
          localStorage.setItem('as_saved_invoices_v3', JSON.stringify(list));
        }
      } catch (err) { }
    }
    return Array.isArray(list) ? list : [];
  } catch (e) {
    return [];
  }
}

function openHistoryModal() {
  const modal = document.getElementById('invoiceHistoryModal');
  if (modal) {
    updateSavedCountBadges();
    renderHistoryTable();
    modal.classList.add('active');
  }
}

function closeHistoryModal() {
  const modal = document.getElementById('invoiceHistoryModal');
  if (modal) modal.classList.remove('active');
}

function filterHistoryTable() {
  const query = document.getElementById('historySearchInput')?.value || '';
  const typeFilter = document.getElementById('historyTypeFilter')?.value || 'ALL';
  renderHistoryTable(query, typeFilter);
}

function renderHistoryTable(filterText = '', typeFilter = 'ALL') {
  const container = document.getElementById('historyTableContainer');
  if (!container) return;

  const history = getSavedInvoicesList();

  const filtered = history.filter(item => {
    // Type filter
    if (typeFilter && typeFilter !== 'ALL') {
      const docType = (item.docTitle || item.docType || '').toUpperCase();
      if (!docType.includes(typeFilter.toUpperCase())) return false;
    }
    // Search query filter
    if (filterText) {
      const q = filterText.toLowerCase().trim();
      const numMatch = (item.invoiceNo || '').toLowerCase().includes(q);
      const clientMatch = (item.clientName || item.buyerName || '').toLowerCase().includes(q);
      const phoneMatch = (item.receiverPhone || '').toLowerCase().includes(q);
      const itemMatch = (item.jobTitle || '').toLowerCase().includes(q) || (item.items && item.items.some(it => (it.title || '').toLowerCase().includes(q)));
      const dateMatch = (item.date || item.invoiceDate || '').toLowerCase().includes(q);
      return numMatch || clientMatch || phoneMatch || itemMatch || dateMatch;
    }
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="padding:2.5rem 1.5rem; text-align:center; color:var(--text-muted);">
        <div style="font-size:2.5rem; margin-bottom:10px;">📭</div>
        <div style="font-size:14px; font-weight:700; color:var(--text); margin-bottom:6px;">No saved records found ${filterText ? 'matching "' + filterText + '"' : ''}</div>
        <div style="font-size:12.5px;">Click <b>"Save Bill"</b> in Bill Studio to save quotation & GST invoice records!</div>
        <div style="margin-top:14px;">
          <button class="btn-pill primary" style="font-size:12px;" onclick="openCustomInvoiceModal(false); closeHistoryModal();">
            ➕ Create Bill #${getNextInvoiceNumber()}
          </button>
        </div>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <table class="history-table">
      <thead>
        <tr>
          <th style="width:50px;">S.No</th>
          <th style="width:75px;">Bill #</th>
          <th style="width:90px;">Date</th>
          <th style="width:110px;">Doc Type</th>
          <th>Customer / Client</th>
          <th>Items Description</th>
          <th style="text-align:right; width:100px;">Amount (₹)</th>
          <th style="text-align:right; width:220px;">Actions</th>
        </tr>
      </thead>
      <tbody>
        ${filtered.map((item, idx) => {
    const docType = item.docTitle || item.docType || 'TAX INVOICE';
    let badgeClass = 'tax_invoice';
    if (docType.includes('QUOTE')) badgeClass = 'quotation';
    else if (docType.includes('ESTIMATE')) badgeClass = 'estimate';
    else if (docType.includes('CHALLAN')) badgeClass = 'challan';

    const client = item.clientName || item.buyerName || 'Valued Client';
    const phone = item.receiverPhone || '';
    const itemsDesc = item.items && item.items.length > 0
      ? `${item.items[0].title} ${item.items.length > 1 ? '<span style="color:#64748b; font-weight:normal;">(+' + (item.items.length - 1) + ' more)</span>' : ''}`
      : (item.jobTitle || 'Print Work');
    const totalAmt = Math.round(item.grandTotal || item.totalAmount || 0);
    const serialNo = String(idx + 1).padStart(2, '0');

    return `
            <tr>
              <td style="font-family:monospace; font-weight:700; color:#64748b; font-size:12px;">
                ${serialNo}
              </td>
              <td>
                <span style="font-family:monospace; font-weight:800; font-size:13px; color:#2563eb;">#${item.invoiceNo || serialNo}</span>
              </td>
              <td style="font-size:12px; color:#475569; white-space:nowrap;">
                ${item.date || item.invoiceDate || '—'}
              </td>
              <td>
                <span class="badge-doc-type ${badgeClass}">${docType}</span>
              </td>
              <td>
                <div style="font-weight:700; color:var(--text);">${client}</div>
                ${phone ? `<div style="font-size:11.5px; color:#16a34a; font-weight:600;">📞 ${phone}</div>` : ''}
              </td>
              <td style="font-size:12px;">
                <div style="font-weight:600;">${itemsDesc}</div>
                ${item.items && item.items[0] && item.items[0].qty ? `<div style="font-size:11px; color:#64748b;">Qty: ${Number(item.items[0].qty).toLocaleString('en-IN')} ${item.items[0].unit || 'NOS'}</div>` : ''}
              </td>
              <td style="text-align:right; font-weight:800; font-size:13px; color:#0f172a; white-space:nowrap;">
                ₹${totalAmt.toLocaleString('en-IN')}
              </td>
              <td>
                <div class="history-actions-cell">
                  <button class="btn-act btn-act-load" title="Edit & Open in Bill Studio" onclick="loadSavedInvoiceToStudio('${item.id}')">
                    ✏️ Load
                  </button>
                  <button class="btn-act btn-act-pdf" title="Download High-Res A4 PDF" onclick="downloadSavedInvoicePDF('${item.id}')">
                    📥 PDF
                  </button>
                  <button class="btn-act btn-act-wa" title="Share Bill on WhatsApp" onclick="shareSavedInvoiceWhatsApp('${item.id}')">
                    💬 WA
                  </button>
                  <button class="btn-act btn-act-del" title="Delete Record" onclick="deleteSavedInvoice('${item.id}')">
                    ✕
                  </button>
                </div>
              </td>
            </tr>
          `;
  }).join('')}
      </tbody>
    </table>
  `;
}

// Load full saved record back into Custom Invoice Studio
function loadSavedInvoiceToStudio(id) {
  const history = getSavedInvoicesList();
  const record = history.find(item => String(item.id) === String(id));
  if (!record) {
    showToast('❌ Record not found');
    return;
  }

  // Pre-fill all fields in Custom Bill Studio
  if (document.getElementById('custInvoiceNo')) document.getElementById('custInvoiceNo').value = record.invoiceNo || '01';
  if (document.getElementById('custDocTitle')) document.getElementById('custDocTitle').value = record.docTitle || record.docType || 'TAX INVOICE';
  if (document.getElementById('custInvoiceDate')) document.getElementById('custInvoiceDate').value = record.date || record.invoiceDate || new Date().toLocaleDateString('en-IN');
  if (document.getElementById('custReceiverName')) document.getElementById('custReceiverName').value = record.clientName || record.buyerName || '';
  if (document.getElementById('custReceiverAddress')) document.getElementById('custReceiverAddress').value = record.receiverAddress || record.clientAddress || '';
  if (document.getElementById('custReceiverState')) document.getElementById('custReceiverState').value = record.receiverState || record.clientState || '';
  if (document.getElementById('custReceiverPhone')) document.getElementById('custReceiverPhone').value = record.receiverPhone || '';
  if (document.getElementById('custReceiverGstin')) document.getElementById('custReceiverGstin').value = record.receiverGstin || record.clientGstin || '';
  if (document.getElementById('custTransportMode')) document.getElementById('custTransportMode').value = record.transportMode || '';
  if (document.getElementById('custVehicleNo')) document.getElementById('custVehicleNo').value = record.vehicleNo || '';
  if (document.getElementById('custGstType')) document.getElementById('custGstType').value = record.gstType || 'cgst_sgst';
  if (document.getElementById('custGstRateInput')) document.getElementById('custGstRateInput').value = record.gstPercent !== undefined ? record.gstPercent : (record.gstRate || 18);
  if (document.getElementById('custTransportCharges')) document.getElementById('custTransportCharges').value = record.transportCharges || 0;
  if (document.getElementById('custDiscount')) document.getElementById('custDiscount').value = record.discount || 0;

  // Build items rows
  const container = document.getElementById('invoiceItemsBuilder');
  if (container) {
    container.innerHTML = '';
    if (record.items && record.items.length > 0) {
      record.items.forEach(it => {
        addInvoiceItemRow(it);
      });
    } else {
      addInvoiceItemRow({
        title: record.jobTitle || 'Print Work',
        desc: record.customDesc || '',
        hsn: record.hsn || '4819',
        qty: parseFloat(record.customQty) || 1000,
        unit: record.billingUnit || 'NOS',
        rate: parseFloat(record.customRate) || 0
      });
    }
  }

  closeHistoryModal();
  openCustomInvoiceModal(false);
  renderCustomInvoicePreview();
  showToast(`✅ Loaded Bill #${record.invoiceNo} for ${record.clientName || record.buyerName}`);
}

function loadSavedInvoice(id) {
  loadSavedInvoiceToStudio(id);
}

// 1-Click Download PDF from saved record
function downloadSavedInvoicePDF(id) {
  loadSavedInvoiceToStudio(id);
  setTimeout(() => {
    downloadCustomBillPDF();
  }, 300);
}

// 1-Click Share WhatsApp from saved record
function shareSavedInvoiceWhatsApp(id) {
  loadSavedInvoiceToStudio(id);
  setTimeout(() => {
    shareCustomBillWhatsApp();
  }, 300);
}

// Delete single saved record
function deleteSavedInvoice(id) {
  if (!confirm('Are you sure you want to delete this bill record from your database?')) return;

  let history = getSavedInvoicesList();
  history = history.filter(item => String(item.id) !== String(id));
  localStorage.setItem('as_saved_invoices_v3', JSON.stringify(history));
  localStorage.setItem('as_saved_invoices', JSON.stringify(history));

  if (history.length === 0) {
    localStorage.setItem('as_bill_seq_v5', '1');
    localStorage.setItem('as_next_invoice_seq', '1');
  } else {
    let maxNum = 0;
    history.forEach(item => {
      let n = parseInt(String(item.invoiceNo || '').replace(/[^0-9]/g, ''), 10);
      if (!isNaN(n) && n > maxNum && n < 10000) maxNum = n;
    });
    let nextNum = maxNum > 0 ? maxNum + 1 : 1;
    localStorage.setItem('as_bill_seq_v5', String(nextNum));
    localStorage.setItem('as_next_invoice_seq', String(nextNum));
  }

  updateSavedCountBadges();
  renderHistoryTable();
  showToast('🗑️ Record deleted from database');
}

// Clear all records
function clearAllHistory() {
  if (!confirm('⚠️ Are you sure you want to clear all saved invoice records? This cannot be undone.')) return;

  localStorage.removeItem('as_saved_invoices_v3');
  localStorage.removeItem('as_saved_invoices');
  localStorage.setItem('as_bill_seq_v5', '1');
  localStorage.setItem('as_next_invoice_seq', '1');

  updateSavedCountBadges();
  renderHistoryTable();
  showToast('🗑️ All saved records cleared. Next Bill sequence reset to 01.');
}

// Export full backup as JSON
function exportHistoryAsJSON() {
  const history = getSavedInvoicesList();
  if (history.length === 0) {
    showToast('⚠️ No records to export.');
    return;
  }
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(history, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `AS_Print_Gallery_Billing_Backup_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast(`📥 Exported ${history.length} records to JSON backup!`);
}

// Import records from JSON
function importHistoryFromJSON(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (Array.isArray(imported)) {
        const current = getSavedInvoicesList();
        const merged = [...imported, ...current.filter(c => !imported.some(i => i.id === c.id))];
        localStorage.setItem('as_saved_invoices_v3', JSON.stringify(merged));
        updateSavedCountBadges();
        renderHistoryTable();
        showToast(`✅ Successfully imported ${imported.length} records into database!`);
      } else {
        showToast('❌ Invalid JSON file format.');
      }
    } catch (err) {
      showToast('❌ Failed to parse backup file.');
    }
  };
  reader.readAsText(file);
}




function copyQuoteToClipboard() {
  const b = window.currentCalcBreakdown || {};
  const jobTitle = document.getElementById('jobType')?.value || 'Custom Packaging Box';
  const batchQty = n('batchQty') || 1000;
  const rate = b.finalPrice ? b.finalPrice.toFixed(2) : '0.00';
  const total = b.finalPrice ? (b.finalPrice * batchQty).toFixed(2) : '0.00';

  const text = `📊 *ITEMIZED COST BREAKDOWN*\n` +
    `🏢 *AS PRINT GALLERY*\n` +
    `📍 Ghaziabad, U.P. | 📞 9911678386\n` +
    `--------------------------------\n` +
    `📦 *Job Name:* ${jobTitle}\n` +
    `🔢 *Quantity:* ${batchQty.toLocaleString('en-IN')} Sheets / Units\n` +
    `--------------------------------\n` +
    `${b.substrateTitle || '📄 Substrate'}: ₹${(b.paperCost || 0).toFixed(2)} / sheet\n` +
    `✨ Lamination: ₹${(b.lamCost || 0).toFixed(2)} / sheet\n` +
    `🌟 Foil / Leaf: ₹${(b.totalLeafPerSheet || 0).toFixed(2)} / sheet\n` +
    `🎨 Printing & Plates: ₹${(b.totalPrintingPerSheet || 0).toFixed(2)} / sheet\n` +
    `✂️ Die Cutting & Die: ₹${(b.totalDiePerSheet || 0).toFixed(2)} / sheet\n` +
    `📦 Pasting / Assembly: ₹${(b.pasting || 0).toFixed(2)} / sheet\n` +
    `⚡ UV / Emboss / Other: ₹${((b.uv || 0) + (b.embossed || 0) + (b.other || 0)).toFixed(2)} / sheet\n` +
    `--------------------------------\n` +
    `🏷️ *Final Price / Unit:* ₹${rate}\n` +
    `💰 *Total Job Amount:* ₹${Number(total).toLocaleString('en-IN')}\n` +
    `--------------------------------\n` +
    `*GSTIN:* 09AWKPN5910E1ZG`;

  navigator.clipboard.writeText(text).then(() => {
    showToast('✅ Full Itemized Cost Breakdown copied to clipboard!');
  }).catch(() => {
    showToast('Failed to copy');
  });
}

function shareWhatsApp() {
  const b = window.currentCalcBreakdown || {};
  const docTitle = document.getElementById('docTitleSelect')?.value || 'ESTIMATION / QUOTATION';
  const invoiceNo = document.getElementById('invoiceNoInput')?.value || getNextInvoiceNumber();
  const clientName = document.getElementById('clientNameInput')?.value || 'Valued Client';
  const clientPhone = document.getElementById('clientPhoneInput')?.value || '';
  const jobTitle = document.getElementById('jobType')?.value || 'Custom Packaging Box';
  const batchQty = n('batchQty') || 1000;
  const rate = b.finalPrice ? b.finalPrice.toFixed(2) : '0.00';
  const total = b.finalPrice ? (b.finalPrice * batchQty).toFixed(2) : '0.00';

  let msg = `🧾 *ESTIMATION QUOTATION #${invoiceNo}*\n` +
    `🏢 *AS PRINT GALLERY*\n` +
    `📍 Ghaziabad, U.P. | 📞 9911678386\n` +
    `--------------------------------\n` +
    `👤 *Quoted To:* ${clientName}\n`;
  if (clientPhone) {
    msg += `📱 *Mobile:* ${clientPhone}\n`;
  }
  msg += `📦 *Job Name:* ${jobTitle}\n` +
    `🔢 *Quantity:* ${batchQty.toLocaleString('en-IN')} Units\n` +
    `--------------------------------\n` +
    `*ITEMIZED COST:*\n` +
    `• ${b.substrateTitle || 'Substrate'}: ₹${(b.paperCost || 0).toFixed(2)} / sheet\n` +
    `• Lamination: ₹${(b.lamCost || 0).toFixed(2)} / sheet\n` +
    `• Leaf / Foil: ₹${(b.totalLeafPerSheet || 0).toFixed(2)} / sheet\n` +
    `• Printing & Plates: ₹${(b.totalPrintingPerSheet || 0).toFixed(2)} / sheet\n` +
    `• Die Cutting: ₹${(b.totalDiePerSheet || 0).toFixed(2)} / sheet\n` +
    `• Pasting & Extras: ₹${((b.pasting || 0) + (b.uv || 0) + (b.embossed || 0) + (b.other || 0)).toFixed(2)} / sheet\n` +
    `--------------------------------\n` +
    `🏷️ *Final Price / Unit:* ₹${rate}\n` +
    `💰 *Grand Total:* ₹${Number(total).toLocaleString('en-IN')}\n` +
    `--------------------------------\n` +
    `*GSTIN:* 09AWKPN5910E1ZG\n` +
    `Thank you for your business!`;

  const cleanPhone = extractCleanPhoneNumber(clientPhone);
  const url = cleanPhone
    ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`
    : `https://wa.me/?text=${encodeURIComponent(msg)}`;

  window.open(url, '_blank');
}



function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('calc_theme', newTheme);

  const icon = document.getElementById('themeIcon');
  if (icon) icon.textContent = newTheme === 'light' ? '🌙' : '☀️';

  const mIcon = document.getElementById('mobileThemeIcon');
  if (mIcon) mIcon.textContent = newTheme === 'light' ? '🌙' : '☀️';

  const mLabel = document.getElementById('mobileThemeLabel');
  if (mLabel) mLabel.textContent = newTheme === 'light' ? 'Switch to Dark Theme' : 'Switch to Light Theme';
}

document.addEventListener('DOMContentLoaded', () => {
  syncActiveChips();





  const savedTheme = localStorage.getItem('calc_theme') || 'light';





  document.documentElement.setAttribute('data-theme', savedTheme);





  const icon = document.getElementById('themeIcon');





  if (icon) icon.textContent = savedTheme === 'light' ? '🌙' : '☀️';











  // Listen to all inputs and selects





  const allInputs = document.querySelectorAll('input, select');





  allInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      calculate();
    });
    input.addEventListener('change', (e) => {
      calculate();
    });
    if (input.tagName === 'INPUT') {
      input.addEventListener('focus', function () {
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
// AS PRINT GALLERY - DEDICATED CUSTOM GST BILL & INVOICE STUDIO
// =========================================================================

let invoiceRowCounter = 0;



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
  const totalTaxAmount = totalGst;
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
        <td style="text-align:center; font-weight:bold; width:36px;">${idx + 1}</td>
   <td style="text-align:left;">
     ${descHtml}
   </td>
   <td style="text-align:center; font-weight:bold; width:75px;">${it.hsn || '-'}</td>
   <td style="text-align:center; font-weight:bold; width:88px;">${it.qty > 0 ? (it.qty.toLocaleString('en-IN') + ' ' + (it.unit || '')) : '-'}</td>
   <td style="text-align:right; width:75px;">${it.rate > 0 ? it.rate.toFixed(2) : '-'}</td>
   <td style="text-align:right; font-weight:bold; width:100px;">${it.amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
      </tr>
    `;
  }).join('');

  // Clean continuous vertical column lines extending to summary (no horizontal empty lines or row numbers)
  const fillerHeight = Math.max(60, 200 - (items.length * 32));
  const emptyRowsHtml = `
    <tr style="height:${fillerHeight}px;">
      <td style="border-right:1.5px solid #000;"></td>
      <td style="border-right:1.5px solid #000;"></td>
      <td style="border-right:1.5px solid #000;"></td>
      <td style="border-right:1.5px solid #000;"></td>
      <td style="border-right:1.5px solid #000;"></td>
      <td style="border-right:1.5px solid #000;"></td>
    </tr>
  `;

  previewEl.innerHTML = `
    <div class="billbook-container" id="printableInvoice">
      
      <!-- Top Section: Header, Branding, Receiver -->
      <div class="bill-top-section">
        <!-- Top Bar: GSTIN | TITLE | MOBILES -->
        <div class="bill-top-bar">
          <div>GSTIN. 09AWKPN5910E1ZG</div>
          <div class="bill-doc-title">${docTitle}</div>
          <div style="text-align:right; font-size:11.5px; font-weight:bold;">M.: 9911678386</div>
        </div>

        <!-- Main Header: Brand & Address with Top Left Logo -->
        <div class="bill-header-center">
          <div class="bill-brand-logo-box">
            <img src="assets/images/logo.png" alt="Logo" class="bill-brand-logo" onerror="this.style.display='none'">
          </div>
          <div class="bill-brand-center-text">
            <div class="bill-brand-name">AS PRINT GALLERY</div>
            <div class="bill-mfd-tag">Mfd. by : Hang Tag, Printed Label, Barcode Sticker, Packaging Box, Paper Bag, Corrugated Box</div>
            <div class="bill-address-tag">Add: Kh.no.2326/2, Shankar Garden, Ashok Vihar, Loni, Ghaziabad, (U.P) 201102</div>
          </div>
          <div class="bill-brand-right-spacer"></div>
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
              <span class="bill-field-lbl">GSTIN/Unique ID :</span>
              <span class="bill-field-val" style="font-weight:bold;">${receiverGstin || '-'}</span>
            </div>
            <div class="bill-field-row">
              <span class="bill-field-lbl">Mobile :</span>
              <span class="bill-field-val" style="font-weight:bold; color:#000;">${receiverPhone || '-'}</span>
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
        <!-- Goods / Item Table with Exact Fixed Column Widths -->
        <table class="bill-items-table">
          <colgroup>
            <col style="width:38px;">
            <col style="width:auto;">
            <col style="width:78px;">
            <col style="width:85px;">
            <col style="width:75px;">
            <col style="width:105px;">
          </colgroup>
          <thead>
            <tr>
              <th style="width:38px; text-align:center;">S.No.</th>
              <th style="text-align:left; padding-left:8px;">DESCRIPTION OF GOODS</th>
              <th style="width:78px; text-align:center;">HSN CODE</th>
              <th style="width:85px; text-align:center;">QTY.</th>
              <th style="width:75px; text-align:right;">RATE</th>
              <th style="width:105px; text-align:right; padding-right:8px;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${itemRowsHtml}
            ${emptyRowsHtml}

            <!-- Summary Rows: Colspan 3 + Colspan 2 + Colspan 1 -->
            <tr class="bill-summary-row" style="background:#fafafa;">
              <td colspan="3" style="border-right:1.5px solid #000; font-size:10px; padding:4px 6px;">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:4px;">
                  <span><b>Reverse Charge:</b> Yes [ ${reverseCharge === 'Yes' ? '✓' : ' '} ] &nbsp; No [ ${reverseCharge === 'No' ? '✓' : ' '} ]</span>
                  <span style="font-weight:bold; color:#0f172a;">
                    ${cgstAmt > 0 ? `CGST (${cgstRate}%): ₹${cgstAmt.toFixed(2)} | SGST (${sgstRate}%): ₹${sgstAmt.toFixed(2)} | Tax: ₹${totalGst.toFixed(2)}` : (igstAmt > 0 ? `IGST (${igstRate}%): ₹${igstAmt.toFixed(2)}` : 'GST: Nil / Exempt')}
                  </span>
                </div>
              </td>
              <td colspan="2" style="text-align:right; font-weight:bold; font-size:11px; padding:4px 8px; border-right:1.5px solid #000; white-space:nowrap;">Total Before Tax</td>
              <td style="text-align:right; font-weight:bold; font-size:11.5px; padding:4px 8px; white-space:nowrap;">${taxableTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            </tr>

            <!-- Final Grand Total Row -->
            <tr class="bill-total-final-row" style="background:#fafafa;">
              <td colspan="3" style="border-right:1.5px solid #000; font-weight:bold; font-size:10.5px; padding:5px 6px;">
                GST on Reverse Charge: ₹0.00
              </td>
              <td colspan="2" style="text-align:right; font-size:11px; font-weight:900; padding:5px 18px; border-right:1.5px solid #000; white-space:nowrap; font-family:'Swiss 721', 'Swis721 BT', 'Swiss 721 Bold', 'Helvetica Neue', Helvetica, Arial, sans-serif;">
                Total Amount After Tax
              </td>
              <td style="text-align:right; font-size:13px; font-weight:900; padding:5px 10px; white-space:nowrap; font-family:'Swiss 721', 'Swis721 BT', 'Swiss 721 Bold', 'Helvetica Neue', Helvetica, Arial, sans-serif;">
                ₹${grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
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

        <div class="bill-sign-box" style="padding-right:28px;">
          <div style="font-weight:900; font-size:11px; font-family:'Swiss 721', 'Swis721 BT', 'Swiss 721 Bold', 'Helvetica Neue', Helvetica, Arial, sans-serif;">For AS PRINT GALLERY</div>
          <div style="font-size:10px; margin-top:28px; font-weight:700;">Authorised Signatory</div>
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
      if (typeof calculate === 'function') calculate();
      const jobQty = Math.max(1, n('batchQty') || 1000);
      const jobTitle = document.getElementById('jobType')?.value || 'PRINTED PACKAGING BOX';
      const sl = n('sl'), sw = n('sw'), gsm = n('gsm');
      const lamType = document.getElementById('lamType')?.value || 'None';
      const leafType = document.getElementById('leafType')?.value || 'None';
      const calcGstRate = n('calcGstRate') || 0;

      const specs = [];
      if (sl && sw) specs.push(`Size: ${sl}" × ${sw}" | ${gsm} GSM`);
      if (lamType && lamType !== 'None') specs.push(`${lamType} Lam`);
      if (leafType && leafType !== 'None') specs.push(`${leafType}`);
      if (n('die') > 0 || n('dieCharges') > 0) specs.push('Die-Cut');
      if (n('pasting') > 0) specs.push('Pasting');
      if (n('uv') > 0) specs.push('UV');
      if (n('embossed') > 0) specs.push('Embossed');

      const desc = specs.length > 0 ? specs.join(' | ') : 'Custom Offset Printing & Finishing';
      let unitRate = window.currentCalcBreakdown?.finalPrice || 1.00;
      unitRate = parseFloat(Number(unitRate).toFixed(2));

      // Sync GST if selected in calculator
      const gstInput = document.getElementById('custGstRateInput');
      if (gstInput && calcGstRate > 0) {
        gstInput.value = calcGstRate;
      }

      container.innerHTML = '';
      addInvoiceItemRow({
        title: jobTitle.toUpperCase(),
        desc: desc,
        hsn: '4819',
        qty: jobQty,
        unit: 'NOS',
        rate: unitRate
      });
    } else if (container.children.length === 0) {
      container.innerHTML = '';
      addInvoiceItemRow({
        title: 'PRINTED PACKAGING BOX',
        desc: 'Custom Offset Printing & Fabrication',
        hsn: '4819',
        qty: 1000,
        unit: 'NOS',
        rate: 10.00
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

function getDocumentCleanFileName(rawDocTitle, rawInvoiceNo, rawClientName) {
  let docType = (rawDocTitle || 'Invoice').trim();
  if (docType.toUpperCase().includes('TAX INVOICE') || docType.toUpperCase() === 'INVOICE') {
    docType = 'Invoice';
  } else if (docType.toUpperCase().includes('QUOTE') || docType.toUpperCase().includes('QUOTATION')) {
    docType = 'Quotation';
  } else if (docType.toUpperCase().includes('ESTIMATE')) {
    docType = 'Estimate';
  } else if (docType.toUpperCase().includes('CHALLAN')) {
    docType = 'Delivery_Challan';
  } else {
    docType = docType.replace(/[^a-zA-Z0-9]/g, '_');
  }

  let no = String(rawInvoiceNo || '01').trim().replace(/[^a-zA-Z0-9_-]/g, '');
  if (!no) no = '01';

  let client = (rawClientName || 'Client').trim().replace(/[^a-zA-Z0-9]/g, '_').replace(/_+/g, '_');
  if (client.length > 30) client = client.substring(0, 30);

  return `AS_Print_Gallery_${docType}_${no}_${client}`;
}

function printCustomInvoice() {
  const docTitle = document.getElementById('custDocTitle')?.value || 'TAX INVOICE';
  const invoiceNo = document.getElementById('custInvoiceNo')?.value || getNextInvoiceNumber();
  const receiverName = document.getElementById('custReceiverName')?.value || 'Client';

  const baseName = getDocumentCleanFileName(docTitle, invoiceNo, receiverName);
  const originalTitle = document.title;
  document.title = baseName;

  renderCustomInvoicePreview();
  window.print();

  setTimeout(() => {
    document.title = originalTitle;
  }, 2500);
}

function printQuotation() {
  const docTitle = document.getElementById('docTitleSelect')?.value || 'QUOTATION';
  const invoiceNo = document.getElementById('invoiceNoInput')?.value || getNextInvoiceNumber();
  const clientName = document.getElementById('clientNameInput')?.value || 'Client';

  const baseName = getDocumentCleanFileName(docTitle, invoiceNo, clientName);
  const originalTitle = document.title;
  document.title = baseName;

  if (typeof renderQuotationPreview === 'function') {
    renderQuotationPreview();
  }
  window.print();

  setTimeout(() => {
    document.title = originalTitle;
  }, 2500);
}


function saveCustomBillInvoice() {
  const invoiceNo = document.getElementById('custInvoiceNo')?.value || getNextInvoiceNumber();
  const receiverName = document.getElementById('custReceiverName')?.value || 'Valued Client';
  const invoiceDate = document.getElementById('custInvoiceDate')?.value || new Date().toLocaleDateString('en-IN');
  const docTitle = document.getElementById('custDocTitle')?.value || 'TAX INVOICE';

  const items = getInvoiceCustomItemsData();
  let subtotal = 0;
  items.forEach(it => { subtotal += (parseFloat(it.amount) || 0); });

  const transportCharges = parseFloat(document.getElementById('custTransportCharges')?.value) || 0;
  const discount = parseFloat(document.getElementById('custDiscount')?.value) || 0;
  const taxableAmt = Math.max(0, subtotal + transportCharges - discount);

  const gstType = document.getElementById('custGstType')?.value || 'cgst_sgst';
  const gstRate = parseFloat(document.getElementById('custGstRateInput')?.value) || 0;
  const totalGst = gstType === 'exempt' ? 0 : (taxableAmt * gstRate) / 100;
  const grandTotal = Math.round(taxableAmt + totalGst);

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
    transportMode: document.getElementById('custTransportMode')?.value || '',
    vehicleNo: document.getElementById('custVehicleNo')?.value || '',
    date: invoiceDate,
    invoiceDate: invoiceDate,
    items: items,
    jobTitle: items[0]?.title || 'Packaging Item',
    transportCharges: transportCharges,
    discount: discount,
    subtotal: subtotal,
    gstType: gstType,
    gstPercent: gstRate,
    totalGst: totalGst,
    grandTotal: grandTotal,
    savedAt: new Date().toISOString()
  };

  const list = getSavedInvoicesList();
  // If record with same invoiceNo exists, update it, else prepend
  const existingIdx = list.findIndex(it => it.invoiceNo === invoiceNo);
  if (existingIdx >= 0) {
    list[existingIdx] = billObj;
  } else {
    list.unshift(billObj);
  }

  localStorage.setItem('as_saved_invoices_v3', JSON.stringify(list));
  localStorage.setItem('as_saved_invoices', JSON.stringify(list));

  // Advance sequence counter to next number (e.g. 01 -> 02)
  const nextNum = incrementNextInvoiceNumber();
  updateSavedCountBadges();

  showToast(`✅ Bill #${invoiceNo} for ${receiverName} saved to Records! Next is #${nextNum}`);
}


function copyCustomBillText() {
  const invoiceNo = document.getElementById('custInvoiceNo')?.value || '';
  const receiverName = document.getElementById('custReceiverName')?.value || '';
  const docTitle = document.getElementById('custDocTitle')?.value || 'TAX INVOICE';
  const items = getInvoiceCustomItemsData();

  let text = `*AS PRINT GALLERY*\n`;
  text += `GSTIN: 09AWKPN5910E1ZG | Mob: 9911678386\n`;
  text += `-----------------------------------------\n`;
  text += `*${docTitle}* #${invoiceNo}\n`;
  text += `Date: ${document.getElementById('custInvoiceDate')?.value || ''}\n`;
  text += `Billed To: *${receiverName}*\n`;
  text += `-----------------------------------------\n`;
  text += `*Items / Products:*\n`;

  let sub = 0;
  items.forEach((it, i) => {
    sub += it.amount;
    text += `${i + 1}. *${it.title}* (${it.qty} ${it.unit} @ ₹${it.rate}) = ₹${it.amount.toFixed(2)}\n`;
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
  text += `Add: Kh.no.2326/2, Shankar Garden, Ashok Vihar, Loni, Ghaziabad, (U.P) 201102\n`;

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
  } catch (e) { }

  let text = `*AS PRINT GALLERY*\n`;
  text += `GSTIN: 09AWKPN5910E1ZG | Phone: 9911678386\n`;
  text += `*${docTitle}* #${invoiceNo}\n`;
  text += `Billed To: *${receiverName}*\n`;
  if (receiverPhone) {
    text += `Mobile: *${receiverPhone}*\n`;
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
  text += `Add: Kh.no.2326/2, Shankar Garden, Ashok Vihar, Loni, Ghaziabad, (U.P) 201102\n`;
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
  if (typeof exportBillBookToA4PDF === 'function') {
    exportBillBookToA4PDF('printableInvoice', filename);
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
    margin: [2, 2, 2, 2],
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

// Bulletproof Single-Page High-Res A4 PDF Export Engine
async function exportBillBookToA4PDF(sourceElementId, filename) {
  const sourceEl = document.getElementById(sourceElementId);
  if (!sourceEl) {
    showToast('⚠️ Document preview not ready, opening Print dialog...');
    window.print();
    return;
  }

  showToast(`⏳ Generating crisp single-page A4 PDF (${filename})...`);

  // Offscreen container fixed at exact standard A4 width (794px at 96 DPI)
  const container = document.createElement('div');
  container.style.cssText = 'position:fixed; left:-9999px; top:0; width:794px; background:#ffffff; z-index:-9999; box-sizing:border-box; margin:0; padding:0;';

  const clone = sourceEl.cloneNode(true);
  clone.style.cssText = 'width:794px !important; max-width:794px !important; min-width:794px !important; box-sizing:border-box !important; margin:0 auto !important; background:#ffffff !important; border:2px solid #000000 !important; display:flex !important; flex-direction:column !important; justify-content:space-between !important; box-shadow:none !important; min-height:1030px !important; max-height:1050px !important; overflow:hidden !important;';

  // Make sure table fills available height cleanly without spilling
  const fillerRow = clone.querySelector('.bill-items-table tr[style*="height"]');
  if (fillerRow) {
    fillerRow.style.height = '100px';
  }

  container.appendChild(clone);
  document.body.appendChild(container);

  const opt = {
    margin: [2, 2, 2, 2],
    filename: filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
      width: 794,
      windowWidth: 794,
      scrollX: 0,
      scrollY: 0
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  try {
    if (typeof html2pdf !== 'undefined') {
      await html2pdf().set(opt).from(clone).save();
      showToast(`✅ PDF Downloaded: ${filename}`);
    } else {
      window.print();
    }
  } catch (err) {
    console.error('Direct PDF export error, fallback to print:', err);
    showToast('⚠️ Opening Print/Save as PDF dialog...');
    window.print();
  } finally {
    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }
  }
}

function downloadCustomBillPDF() {
  const docTitle = document.getElementById('custDocTitle')?.value || 'TAX INVOICE';
  const invoiceNo = document.getElementById('custInvoiceNo')?.value || getNextInvoiceNumber();
  const receiverName = document.getElementById('custReceiverName')?.value || 'Client';
  const baseName = getDocumentCleanFileName(docTitle, invoiceNo, receiverName);
  const filename = `${baseName}.pdf`;

  if (typeof renderCustomInvoicePreview === 'function') {
    renderCustomInvoicePreview();
  }

  exportBillBookToA4PDF('printableInvoice', filename);
}

function downloadQuotationPDF() {
  const docTitle = document.getElementById('quoteDocTitle')?.value || document.getElementById('docTitleSelect')?.value || 'QUOTATION';
  const invoiceNo = document.getElementById('quoteInvoiceNo')?.value || document.getElementById('invoiceNoInput')?.value || getNextInvoiceNumber();
  const clientName = document.getElementById('quoteClientName')?.value || document.getElementById('clientNameInput')?.value || 'Client';
  const baseName = getDocumentCleanFileName(docTitle, invoiceNo, clientName);
  const filename = `${baseName}.pdf`;

  if (typeof renderQuotationPreview === 'function') {
    renderQuotationPreview();
  }

  exportBillBookToA4PDF('printableQuotation', filename);
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


function startNewBlankBill() {
  const nextNo = getNextInvoiceNumber();
  if (document.getElementById('custInvoiceNo')) document.getElementById('custInvoiceNo').value = nextNo;
  if (document.getElementById('custDocTitle')) document.getElementById('custDocTitle').value = 'TAX INVOICE';
  if (document.getElementById('custInvoiceDate')) {
    document.getElementById('custInvoiceDate').value = new Date().toLocaleDateString('en-IN', {
      day: '2-digit', month: '2-digit', year: 'numeric'
    });
  }
  if (document.getElementById('custReceiverName')) document.getElementById('custReceiverName').value = '';
  if (document.getElementById('custReceiverAddress')) document.getElementById('custReceiverAddress').value = '';
  if (document.getElementById('custReceiverState')) document.getElementById('custReceiverState').value = 'Uttar Pradesh (09)';
  if (document.getElementById('custReceiverPhone')) document.getElementById('custReceiverPhone').value = '';
  if (document.getElementById('custReceiverGstin')) document.getElementById('custReceiverGstin').value = '';
  if (document.getElementById('custTransportMode')) document.getElementById('custTransportMode').value = '';
  if (document.getElementById('custVehicleNo')) document.getElementById('custVehicleNo').value = '';
  if (document.getElementById('custTransportCharges')) document.getElementById('custTransportCharges').value = 0;
  if (document.getElementById('custDiscount')) document.getElementById('custDiscount').value = 0;

  const container = document.getElementById('invoiceItemsBuilder');
  if (container) {
    container.innerHTML = '';
    addInvoiceItemRow({
      title: '',
      desc: '',
      hsn: '4819',
      qty: 1000,
      unit: 'NOS',
      rate: 0
    });
  }

  renderCustomInvoicePreview();
  showToast('🆕 Started New Blank Bill #' + nextNo);
}

function resequenceSavedInvoices() {
  let history = getSavedInvoicesList();
  if (history.length === 0) {
    showToast('⚠️ No saved bills to resequence.');
    return;
  }
  if (!confirm('Do you want to re-number all saved bills sequentially starting from #01?')) return;
  history.reverse();
  history.forEach((item, idx) => {
    item.invoiceNo = String(idx + 1).padStart(2, '0');
  });
  history.reverse();
  localStorage.setItem('as_saved_invoices_v3', JSON.stringify(history));
  localStorage.setItem('as_saved_invoices', JSON.stringify(history));

  let nextNum = history.length + 1;
  localStorage.setItem('as_bill_seq_v5', String(nextNum));
  localStorage.setItem('as_next_invoice_seq', String(nextNum));

  updateSavedCountBadges();
  renderHistoryTable();
  showToast('✅ Saved bills re-sequenced starting from #01!');
}

document.addEventListener('DOMContentLoaded', () => {
  updateSavedCountBadges();
  checkAndLoadSharedBillFromURL();

  // Attach real-time input & change event listeners to all calculator form controls
  const formInputs = document.querySelectorAll('input, select');
  formInputs.forEach(input => {
    input.addEventListener('input', () => {
      if (typeof calculate === 'function') calculate();
    });
    input.addEventListener('change', () => {
      if (typeof calculate === 'function') calculate();
    });
  });

  const savedTheme = localStorage.getItem('calc_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  const icon = document.getElementById('themeIcon');
  if (icon) icon.textContent = savedTheme === 'light' ? '🌙' : '☀️';

  if (typeof calculate === 'function') calculate();
});

