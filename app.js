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





let currentQuoteMode = 'customer';





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


    renderQuotationPreview();


    modal.classList.add('active');


  }


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






function handleGstTypeChange() {
  const type = document.getElementById('quoteGstType')?.value || 'igst';
  const percentField = document.getElementById('customGstRateField');
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

function renderQuotationPreview() {


  const quoteNumber = 'GST-' + Math.floor(1000 + Math.random() * 9000) + '-26';


  const today = new Date().toLocaleDateString('en-IN', {


    day: '2-digit',


    month: 'short',


    year: 'numeric'


  });





  const companyName = 'AS PRINT GALLERY';


  const companyTagline = 'Commercial Printing, Packaging & Box Manufacturing';


  const companyAddress = 'Kh No. 2326/2, Shankar Garden, Ashok Vihar, Loni, Ghaziabad, UP - 201102';


  const companyContact = 'Mob: +91 9911678386 | Email: asprintgallery742@gmail.com';


  const companyGstin = 'GSTIN: 09AWKPN5910E1ZG';





  const clientName = document.getElementById('clientNameInput')?.value || 'M/s Shiv Engineering';


  const clientAddress = document.getElementById('clientAddressInput')?.value || 'Sumel Business Park 7, Kochi, Kerala - 380023';


  const clientGstin = document.getElementById('clientGstinInput')?.value || 'GSTIN: 32AABBA7890B1ZB | Ph: 9878789878';


  const jobTitle = document.getElementById('jobTitleInput')?.value || 'Premium 500g Sweet Box Packaging';


  const hsn = document.getElementById('hsnInput')?.value || '4819';


  const gstOption = document.getElementById('quoteGstSelect')?.value || 'igst_18';





  const sl = n('sl'), sw = n('sw'), gsm = n('gsm'), pr = n('paperRate');


  const ll = n('ll'), lw = n('lw'), d = n('divide');


  const lamType = document.getElementById('lamType').value;





  const leafL = n('leafL'), leafW = n('leafW'), leafDivide = n('leafDivide');


  const leafType = document.getElementById('leafType').value;


  const leafBlock = n('leafBlock');





  const batchQty = n('batchQty') || 1000;





  // Paper Weight & Cost


  const areaM2 = sl * sw * 0.00064516;


  const weightKg = (areaM2 * gsm) / 1000;


  const paperCost = weightKg * pr;





  // Lamination


  let lamPaise = (d && lamType !== 'None') ? (ll * lw / d) : 0;


  const lamCost = lamPaise / 100;





  // Leaf Foil


  let leafPaise = (leafDivide && leafType !== 'None') ? (leafL * leafW / leafDivide) : 0;


  const leafCost = leafPaise / 100;


  const leafBlockPerSheet = batchQty > 0 ? (leafBlock / batchQty) : 0;


  const totalLeafPerSheet = leafCost + leafBlockPerSheet;





  // Printing & Plates


  const printing = n('printing');


  const plates = n('plates');


  const plateCostPerSheet = batchQty > 0 ? (plates / batchQty) : 0;


  const totalPrintingPerSheet = printing + plateCostPerSheet;





  // Die & Die Charges


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





    // Manual GST % Input Calculation
  const gstType = document.getElementById('quoteGstType')?.value || 'igst';
  const enteredGstRate = parseFloat(document.getElementById('quoteGstPercentInput')?.value) || 0;

  let cgstRate = 0, cgstAmount = 0;
  let sgstRate = 0, sgstAmount = 0;
  let igstRate = 0, igstAmount = 0;
  let isGstExtra = false;

  if (gstType === 'exempt' || enteredGstRate === 0) {
    // 0% Tax
    cgstRate = 0; sgstRate = 0; igstRate = 0;
  } else if (gstType === 'extra') {
    // GST Extra Note (not added to subtotal invoice)
    isGstExtra = true;
    igstRate = enteredGstRate;
  } else if (gstType === 'cgst_sgst') {
    // Split into equal halves
    const halfRate = enteredGstRate / 2;
    cgstRate = halfRate;
    cgstAmount = (batchTotalPrice * halfRate) / 100;
    sgstRate = halfRate;
    sgstAmount = (batchTotalPrice * halfRate) / 100;
  } else {
    // Default IGST
    igstRate = enteredGstRate;
    igstAmount = (batchTotalPrice * enteredGstRate) / 100;
  }

  const totalTaxAmount = cgstAmount + sgstAmount + igstAmount;


  const grandTotal = batchTotalPrice + totalTaxAmount;





  const previewEl = document.getElementById('quotationPreview');


  if (!previewEl) return;





  if (currentQuoteMode === 'customer') {


    // -------------------------------------------------------------


    // EXACT AUTHENTIC GST TAX INVOICE / QUOTATION FORMAT


    // -------------------------------------------------------------


    const specsItems = [];


    if (sl && sw) specsItems.push(`<b>Material:</b> ${sl}" × ${sw}" | ${gsm} GSM Board`);


    specsItems.push(`<b>Printing:</b> Multi-Color High-Definition Offset Printing`);


    if (lamType !== 'None') specsItems.push(`<b>Lamination:</b> ${lamType} Lamination Finishing`);


    if (leafType !== 'None') specsItems.push(`<b>Foil:</b> ${leafType} Foil / Leaf Stamping`);


    if (die > 0 || dieCharges > 0) specsItems.push(`<b>Die-Punch:</b> Precision Shape Cutting & Creasing`);


    if (pasting > 0) specsItems.push(`<b>Fabrication:</b> High-Strength Box Pasting & Assembly`);


    if (uv > 0) specsItems.push(`<b>Spot UV:</b> High-Gloss UV Coating`);


    if (embossed > 0) specsItems.push(`<b>Embossing:</b> 3D Relief Texture Emboss`);


    if (other > 0) specsItems.push(`<b>Finishing:</b> Auxiliary Custom Crafting`);





    previewEl.innerHTML = `


      <div class="gst-invoice-box" id="printableInvoice">


        


        <!-- Header Area -->


        <div class="gst-header-area">


          <div class="gst-company-brand">


            <div class="gst-company-name">${companyName}</div>


            <div class="gst-company-tagline">${companyTagline}</div>


            <div class="gst-company-details">


              <div>${companyAddress}</div>


              <div>${companyContact}</div>


            </div>


          </div>


                    <div style="text-align:right; display:flex; flex-direction:column; align-items:flex-end;">
            <img src="logo.png" alt="AS Print Gallery" style="width:72px; height:72px; object-fit:contain; border-radius:50%; border:1px solid #e2e8f0; background:#fff; padding:2px;">
            <div style="font-size:9px; color:#64748b; font-weight:700; margin-top:3px; letter-spacing:0.05em;">AS PRINT GALLERY</div>
          </div>


        </div>





        <!-- Title Banner -->


        <div class="gst-title-bar">


          <div style="width:220px;">${companyGstin}</div>


          <div class="gst-title-main">TAX INVOICE / QUOTATION</div>


          <div style="width:200px; text-align:right; font-size:10.5px;">ORIGINAL FOR RECIPIENT</div>


        </div>





        <!-- Party & Invoice Grid -->


        <div class="gst-party-grid">


          <div class="gst-party-col">


            <div style="font-size:11px; font-weight:900; text-transform:uppercase; margin-bottom:4px; color:#1e293b; border-bottom:1px solid #cbd5e1; padding-bottom:2px;">


              Customer Detail


            </div>


            <div class="gst-party-row">


              <span class="gst-party-label">M/S</span>


              <span class="gst-party-val" style="font-weight:bold; font-size:12px;">${clientName}</span>


            </div>


            <div class="gst-party-row">


              <span class="gst-party-label">Address</span>


              <span class="gst-party-val">${clientAddress}</span>


            </div>


            <div class="gst-party-row">


              <span class="gst-party-label">GSTIN / Ph</span>


              <span class="gst-party-val">${clientGstin}</span>


            </div>


            <div class="gst-party-row">


              <span class="gst-party-label">Place of Supply</span>


              <span class="gst-party-val">All India / Local</span>


            </div>


          </div>





          <div class="gst-party-col right">


            <div class="gst-party-row">


              <span class="gst-party-label">Invoice / Quote No.</span>


              <span class="gst-party-val" style="font-weight:bold;">${quoteNumber}</span>


            </div>


            <div class="gst-party-row">


              <span class="gst-party-label">Date</span>


              <span class="gst-party-val">${today}</span>


            </div>


            <div class="gst-party-row">


              <span class="gst-party-label">Challan No.</span>


              <span class="gst-party-val">33</span>


            </div>


            <div class="gst-party-row">


              <span class="gst-party-label">Transport</span>


              <span class="gst-party-val">Direct Dispatch / Courier</span>


            </div>


            <div class="gst-party-row">


              <span class="gst-party-label">Job Reference</span>


              <span class="gst-party-val" style="font-weight:600;">${jobTitle}</span>


            </div>


          </div>


        </div>





        <!-- Items Table -->


        <table class="gst-table">


          <thead>


            <tr>


              <th style="width:35px;">Sr. No.</th>


              <th style="text-align:left;">Name of Product / Service</th>


              <th style="width:75px;">HSN / SAC</th>


              <th style="width:75px;">Qty</th>


              <th style="width:85px; text-align:right;">Rate</th>


              <th style="width:105px; text-align:right;">Taxable Value</th>


            </tr>


          </thead>


          <tbody>


            <tr>


              <td style="text-align:center; font-weight:bold;">1</td>


              <td>


                <div class="gst-item-title">${jobTitle}</div>


                <div class="gst-item-specs">


                  ${specsItems.join(' | ')}


                </div>


              </td>


              <td style="text-align:center;">${hsn}</td>


              <td style="text-align:center; font-weight:bold;">${batchQty.toLocaleString('en-IN')} NOS</td>


              <td style="text-align:right;">${finalPrice.toFixed(2)}</td>


              <td style="text-align:right; font-weight:bold;">${batchTotalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>


            </tr>





            <!-- Subtotal / Taxable Row -->


            <tr class="gst-tax-row">


              <td colspan="4" style="border-right:1.5px solid #000;"></td>


              <td style="text-align:right; font-weight:600; background:#f8fafc;">Taxable Value</td>


              <td style="text-align:right; font-weight:bold; background:#f8fafc;">${batchTotalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>


            </tr>





            <!-- Tax Breakdown Rows -->


            ${igstAmount > 0 ? `


            <tr class="gst-tax-row">


              <td colspan="4" style="border-right:1.5px solid #000; text-align:right; font-weight:bold; padding-right:15px;">


                IGST (${igstRate.toFixed(2)} %)


              </td>


              <td style="text-align:right;">${igstRate.toFixed(2)}%</td>


              <td style="text-align:right;">${igstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>


            </tr>


            ` : ''}





            ${cgstAmount > 0 ? `


            <tr class="gst-tax-row">


              <td colspan="4" style="border-right:1.5px solid #000; text-align:right; font-weight:bold; padding-right:15px;">


                CGST (${cgstRate.toFixed(2)} %)


              </td>


              <td style="text-align:right;">${cgstRate.toFixed(2)}%</td>


              <td style="text-align:right;">${cgstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>


            </tr>


            <tr class="gst-tax-row">


              <td colspan="4" style="border-right:1.5px solid #000; text-align:right; font-weight:bold; padding-right:15px;">


                SGST (${sgstRate.toFixed(2)} %)


              </td>


              <td style="text-align:right;">${sgstRate.toFixed(2)}%</td>


              <td style="text-align:right;">${sgstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>


            </tr>


            ` : ''}





            ${gstOption === 'extra' ? `


            <tr class="gst-tax-row">


              <td colspan="4" style="border-right:1.5px solid #000; text-align:right; font-style:italic; padding-right:15px;">


                * GST Extra as applicable at actuals


              </td>


              <td style="text-align:right;">-</td>


              <td style="text-align:right;">-</td>


            </tr>


            ` : ''}





            <!-- Grand Total Row -->


            <tr class="gst-total-row">


              <td colspan="3" style="text-align:right; font-weight:bold; padding-right:15px;">Total</td>


              <td style="text-align:center; font-weight:bold;">${batchQty.toLocaleString('en-IN')} NOS</td>


              <td style="text-align:right; font-weight:bold;">₹</td>


              <td style="text-align:right; font-weight:900; font-size:13px; color:#0f172a;">


                ₹ ${grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}


              </td>


            </tr>


          </tbody>


        </table>





        <!-- Amount In Words -->


        <div class="gst-words-box">


          <div>


            <div style="font-size:10px; color:#64748b;">Total in words</div>


            <div style="font-weight:900; font-size:11.5px; color:#0f172a; margin-top:2px;">


              ${numberToIndianWords(grandTotal)}


            </div>


          </div>


          <div style="text-align:right; font-weight:bold; font-size:10px; color:#64748b;">


            (E & O.E.)


          </div>


        </div>





        <!-- HSN / SAC Summary Tax Table -->


        <table class="gst-hsn-table">


          <thead>


            <tr>


              <th rowspan="2" style="width:100px;">HSN / SAC</th>


              <th rowspan="2">Taxable Value</th>


              ${igstAmount > 0 ? `


                <th colspan="2">IGST</th>


              ` : `


                <th colspan="2">CGST</th>


                <th colspan="2">SGST</th>


              `}


              <th rowspan="2" style="width:110px;">Total Tax</th>


            </tr>


            <tr>


              ${igstAmount > 0 ? `


                <th style="width:60px;">%</th>


                <th style="width:80px;">Amount</th>


              ` : `


                <th style="width:50px;">%</th>


                <th style="width:70px;">Amount</th>


                <th style="width:50px;">%</th>


                <th style="width:70px;">Amount</th>


              `}


            </tr>


          </thead>


          <tbody>


            <tr>


              <td style="font-weight:bold;">${hsn}</td>


              <td style="text-align:right; font-weight:bold;">${batchTotalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>


              ${igstAmount > 0 ? `


                <td>${igstRate.toFixed(2)}</td>


                <td style="text-align:right;">${igstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>


              ` : `


                <td>${cgstRate > 0 ? cgstRate.toFixed(2) : '-'}</td>


                <td style="text-align:right;">${cgstAmount > 0 ? cgstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}</td>


                <td>${sgstRate > 0 ? sgstRate.toFixed(2) : '-'}</td>


                <td style="text-align:right;">${sgstAmount > 0 ? sgstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}</td>


              `}


              <td style="text-align:right; font-weight:bold;">${totalTaxAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>


            </tr>


            <tr style="font-weight:bold; background:#f8fafc;">


              <td>Total</td>


              <td style="text-align:right;">${batchTotalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>


              ${igstAmount > 0 ? `


                <td colspan="2" style="text-align:right;">${igstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>


              ` : `


                <td colspan="2" style="text-align:right;">${cgstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>


                <td colspan="2" style="text-align:right;">${sgstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>


              `}


              <td style="text-align:right;">${totalTaxAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>


            </tr>


          </tbody>


        </table>





        <!-- Tax in Words -->


        <div style="padding:4px 10px; border-bottom:1.5px solid #000000; font-size:10.5px;">


          <span>Total Tax in words: </span>


          <b>${numberToIndianWords(totalTaxAmount)}</b>


        </div>





        <!-- Footer Grid: Terms & Signatory -->


        <div class="gst-footer-grid">


          <div class="gst-footer-left">


            <div style="font-weight:bold; margin-bottom:2px;">Terms & Conditions:</div>


            <div>1. Goods once sold will not be taken back or exchanged.</div>


            <div>2. 50% Advance with Purchase Order, balance payment on delivery.</div>


            <div>3. Delivery timeframe commences only after final artwork proof approval.</div>


            <div>4. Subject to local jurisdiction.</div>


          </div>


          <div class="gst-footer-right">


            <div style="font-weight:bold; font-size:11.5px;">For ${companyName}</div>


            <div style="border-top:1px solid #000; padding-top:4px; font-weight:bold; font-size:10.5px; margin-top:35px;">


              Authorized Signatory


            </div>


          </div>


        </div>





      </div>


    `;


  } else {


    // -------------------------------------------------------------


    // INTERNAL COSTING & JOB SHEET: Full cost breakdown for owner/factory


    // -------------------------------------------------------------


    previewEl.innerHTML = `


      <div class="quotation-sheet" id="printableInvoice">


        <div class="quote-header">


          <div>


            <div class="quote-title">🏭 INTERNAL JOB CARD & PRODUCTION COSTING</div>


            <div style="font-size:0.85rem; color:#e11d48; font-weight:700; margin-top:4px;">⚠️ Confidential Internal Cost Breakdown (For Press/Factory Use Only)</div>


          </div>


          <div style="text-align:right;">


            <div style="font-weight:700; color:#0f172a;">Job Sheet #${quoteNumber}</div>


            <div style="font-size:0.85rem; color:#64748b;">Date: ${today}</div>


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


            <div>Sheet Size: <b>${sl}" × ${sw}"</b> (${gsm} GSM) | Wt: <b>${(weightKg * 1000).toFixed(1)}g</b></div>


            <div>Lamination: <b>${lamType}</b> ${lamType !== 'None' ? `(${ll}" × ${lw}")` : ''}</div>


            ${leafType !== 'None' ? `<div>Leaf / Foil: <b>${leafType}</b> (${leafL}" × ${leafW}")</div>` : ''}


            <div>Batch Run: <b>${batchQty.toLocaleString('en-IN')} Sheets</b></div>


          </div>


        </div>





        <div class="quote-table-wrapper">


        <table class="quote-table">


          <thead>


            <tr>


              <th>Item / Process</th>


              <th>Technical Cost Basis</th>


              <th style="text-align:right;">Cost / Sheet</th>


              <th style="text-align:right;">Total (${batchQty.toLocaleString('en-IN')} Qty)</th>


            </tr>


          </thead>


          <tbody>


            <tr>


              <td><b>Paper Substrate</b></td>


              <td>${sl}" × ${sw}" | ${gsm} GSM @ ₹${pr}/Kg (${(weightKg * 1000).toFixed(1)}g)</td>


              <td style="text-align:right;">${money(paperCost)}</td>


              <td style="text-align:right;">${money(paperCost * batchQty)}</td>


            </tr>


            ${lamType !== 'None' ? `


            <tr>


              <td><b>${lamType} Lamination</b></td>


              <td>${ll}" × ${lw}" ÷ ${d} = ${lamPaise.toFixed(2)}p</td>


              <td style="text-align:right;">${money(lamCost)}</td>


              <td style="text-align:right;">${money(lamCost * batchQty)}</td>


            </tr>


            ` : ''}


            ${leafType !== 'None' ? `


            <tr>


              <td><b>${leafType} Stamping</b></td>


              <td>${leafL}" × ${leafW}" ÷ ${leafDivide} = ${leafPaise.toFixed(2)}p ${leafBlock > 0 ? `+ Block ₹${leafBlock}` : ''}</td>


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


              <td>${wastage}% allowance on direct costs</td>


              <td style="text-align:right;">${money(wastageCost)}</td>


              <td style="text-align:right;">${money(wastageCost * batchQty)}</td>


            </tr>


            ` : ''}


            <tr class="total-row">


              <td colspan="2"><b>Net Production Cost (Factory Cost)</b></td>


              <td style="text-align:right;"><b>${money(cost)}</b></td>


              <td style="text-align:right;"><b>${money(cost * batchQty)}</b></td>


            </tr>


            <tr class="sale-row">


              <td colspan="2"><b>SELLING QUOTATION PRICE (Inc. ${profit}% Profit Margin)</b></td>


              <td style="text-align:right;"><b>${money(finalPrice)}</b></td>


              <td style="text-align:right;"><b>${money(batchTotalPrice)}</b></td>


            </tr>


          </tbody>


        </table>


        </div>


      </div>


    `;


  }


}





function closeQuotationModal() {


  const modal = document.getElementById('quotationModal');


  if (modal) modal.classList.remove('active');


}





function printQuotation() {


  window.print();


}





function copyQuoteToClipboard() {


  const sl = n('sl'), sw = n('sw'), gsm = n('gsm');


  const lamType = document.getElementById('lamType').value;


  const leafType = document.getElementById('leafType').value;


  const batchQty = n('batchQty') || 1000;


  const finalPrice = document.getElementById('final').textContent;


  const batchTotal = document.getElementById('batchTotalPrice').textContent;


  const clientName = document.getElementById('clientNameInput')?.value || 'Client';


  const jobTitle = document.getElementById('jobTitleInput')?.value || 'Print Job';


  const companyName = 'AS PRINT GALLERY';





  let quoteText = '';





  if (currentQuoteMode === 'customer') {


    // Clean customer quote text (NO cost/margin disclosure)


    quoteText = `📄 *QUOTATION / ESTIMATE*\n` +


      `🏢 *AS PRINT GALLERY*\n📍 *Ghaziabad, UP* | 📞 *+91 9911678386*\n` +


      `--------------------------------\n` +


      `👤 *Client:* ${clientName}\n` +


      `📦 *Job Title:* ${jobTitle}\n` +


      `📐 *Size & Board:* ${sl}" × ${sw}" | ${gsm} GSM\n` +


      (lamType !== 'None' ? `✨ *Lamination:* ${lamType}\n` : '') +


      (leafType !== 'None' ? `🌟 *Foil / Leaf:* ${leafType}\n` : '') +


      `🔢 *Quantity:* ${batchQty.toLocaleString('en-IN')} Units / Sheets\n` +


      `--------------------------------\n` +


      `🏷️ *Unit Rate:* ${finalPrice} per unit\n` +


      `💰 *Total Amount:* ${batchTotal}\n` +


      `--------------------------------\n` +


      `*Terms:* GST & Delivery extra as applicable. Valid for 15 days.\n` +


      `Thank you for your business!`;


  } else {


    // Internal job sheet text


    const cost = document.getElementById('total').textContent;


    const pr = n('paperRate');


    quoteText = `🏭 *INTERNAL JOB SHEET & COSTING*\n` +


      `--------------------------------\n` +


      `👤 *Client:* ${clientName} | *Job:* ${jobTitle}\n` +


      `📐 Sheet: ${sl}" × ${sw}" | ${gsm} GSM (Rate: ₹${pr}/Kg)\n` +


      `✨ Lamination: ${lamType}\n` +


      (leafType !== 'None' ? `🌟 Leaf / Foil: ${leafType}\n` : '') +


      `📦 Quantity: ${batchQty.toLocaleString('en-IN')} Sheets\n` +


      `--------------------------------\n` +


      `💵 Net Cost / Sheet: ${cost}\n` +


      `🏷️ Selling Rate: ${finalPrice}\n` +


      `💰 Total Cost: ${money(n('total') * batchQty)} | Total Selling: ${batchTotal}`;


  }





  navigator.clipboard.writeText(quoteText).then(() => {


    showToast(currentQuoteMode === 'customer' ? 'Customer Quotation copied!' : 'Internal Job Sheet copied!');


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


  const clientName = document.getElementById('clientNameInput')?.value || 'Client';


  const jobTitle = document.getElementById('jobTitleInput')?.value || 'Print Job';


  const companyName = 'AS PRINT GALLERY';





  const msg = `📄 *QUOTATION / ESTIMATE*\n` +


    `🏢 *AS PRINT GALLERY*\n📍 *Ghaziabad, UP* | 📞 *+91 9911678386*\n` +


    `--------------------------------\n` +


    `👤 *Client:* ${clientName}\n` +


    `📦 *Job Title:* ${jobTitle}\n` +


    `📐 *Size & Board:* ${sl}" × ${sw}" (${gsm} GSM)\n` +


    (lamType !== 'None' ? `✨ *Lamination:* ${lamType}\n` : '') +


    (leafType !== 'None' ? `🌟 *Foil / Leaf:* ${leafType}\n` : '') +


    `🔢 *Quantity:* ${batchQty.toLocaleString('en-IN')} Units / Sheets\n` +


    `--------------------------------\n` +


    `🏷️ *Unit Rate:* ${finalPrice} per unit\n` +


    `💰 *Total Amount:* ${batchTotal}\n` +


    `--------------------------------\n` +


    `*Terms:* GST & Delivery extra as applicable. Valid for 15 days.\n` +


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


