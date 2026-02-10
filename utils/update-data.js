#!/usr/bin/env node
/**
 * Data Update Script
 * 
 * Ez a script segít az adatok szinkronizálásában a Google Spreadsheet és a JSON fájlok között.
 * 
 * HASZNÁLAT:
 * node utils/update-data.js --csv-to-json battles   # CSV -> JSON (battles.csv -> data.json)
 * node utils/update-data.js --csv-to-json weapons   # CSV -> JSON (weapons.csv -> data.json)
 * node utils/update-data.js --csv-to-json quiz      # CSV -> JSON (quiz.csv -> quiz.json)
 * node utils/update-data.js --sync battles         # Google Sheet -> CSV -> JSON (all in one)
 * node utils/update-data.js --sync weapons
 * node utils/update-data.js --sync quiz
 * node utils/update-data.js --sync all             # Összes szinkronizálása
 * 
 * WORKFLOW:
 * 1. Google Sheet-ről automatikus letöltés
 * 2. CSV -> JSON konverzió
 * 3. Server újraindítása
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');

const rootDir = path.join(__dirname, '..');

// Google Sheets konfigurációja
const SHEET_ID = '1cOBJHqCnQTQc3HAc8pr7GosWaffhBYQkg3T_J8MPmSg';
const GIDS = {
  battles: '404161908',
  weapons: '1433289819',
  quiz: '1942555329'
};

// CSV Parser - Simple
function parseCSV(csvContent) {
  const lines = csvContent.split('\n').filter(line => line.trim());
  const headers = lines[0].split(',').map(h => h.trim());
  
  return lines.slice(1).map(line => {
    const values = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      if (line[i] === '"') {
        inQuotes = !inQuotes;
      } else if (line[i] === ',' && !inQuotes) {
        values.push(current.trim().replace(/^"|"$/g, ''));
        current = '';
      } else {
        current += line[i];
      }
    }
    values.push(current.trim().replace(/^"|"$/g, ''));
    
    const record = {};
    headers.forEach((header, i) => {
      record[header] = values[i] || '';
    });
    return record;
  });
}

// Download és Sync - Google Sheets-ből
async function downloadAndSync(target) {
  try {
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${GIDS[target]}`;
    console.log(`📥 Letöltés: ${target}...`);
    
    const response = await axios.get(url);
    const csvContent = response.data;
    
    // Megkapta a CSV-t, most konvertáljuk
    if (target === 'battles') {
      await csvToJsonBattles(csvContent);
    } else if (target === 'weapons') {
      await csvToJsonWeapons(csvContent);
    } else if (target === 'quiz') {
      await csvToJsonQuiz(csvContent);
    }
  } catch (error) {
    console.error(`❌ Hiba a szinkronizálásnál (${target}):`, error.message);
  }
}

// CSV to JSON - Battles
function csvToJsonBattles(csvContent) {
  try {
    // Ha nincs paramétere, akkor fájlból olvas
    if (!csvContent) {
      const csvPath = path.join(rootDir, 'battles.csv');
      csvContent = fs.readFileSync(csvPath, 'utf8');
    }
    
    const records = parseCSV(csvContent);

    const battles = records.map(row => ({
      id: row.id,
      picture: row.picture,
      name: {
        en: row.name_en,
        hu: row.name_hu,
        ro: row.name_ro
      },
      description: {
        en: row.description_en,
        hu: row.description_hu,
        ro: row.description_ro
      },
      year: parseInt(row.year)
    }));

    const dataPath = path.join(rootDir, 'data.json');
    const currentData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    currentData.battles = battles;
    
    fs.writeFileSync(dataPath, JSON.stringify(currentData, null, 2));
    console.log('✓ Battles CSV -> JSON sikeresen konvertálva!');
  } catch (error) {
    console.error('❌ Hiba a battles CSV konvertálása során:', error.message);
  }
}

// CSV to JSON - Weapons
function csvToJsonWeapons(csvContent) {
  try {
    // Ha nincs paramétere, akkor fájlból olvas
    if (!csvContent) {
      const csvPath = path.join(rootDir, 'weapons.csv');
      csvContent = fs.readFileSync(csvPath, 'utf8');
    }
    
    const records = parseCSV(csvContent);

    const weapons = records.map(row => ({
      id: row.id,
      picture: row.picture,
      name: {
        en: row.name_en,
        hu: row.name_hu,
        ro: row.name_ro
      },
      description: {
        en: row.description_en,
        hu: row.description_hu,
        ro: row.description_ro
      },
      type: {
        en: row.type_en,
        hu: row.type_hu,
        ro: row.type_ro
      }
    }));

    const dataPath = path.join(rootDir, 'data.json');
    const currentData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    currentData.weapons = weapons;
    
    fs.writeFileSync(dataPath, JSON.stringify(currentData, null, 2));
    console.log('✓ Weapons CSV -> JSON sikeresen konvertálva!');
  } catch (error) {
    console.error('❌ Hiba a weapons CSV konvertálása során:', error.message);
  }
}

// CSV to JSON - Quiz
function csvToJsonQuiz(csvContent) {
  try {
    // Ha nincs paramétere, akkor fájlból olvas
    if (!csvContent) {
      const csvPath = path.join(rootDir, 'quiz.csv');
      csvContent = fs.readFileSync(csvPath, 'utf8');
    }
    
    const records = parseCSV(csvContent);

    const questions = records.map(row => ({
      id: row.id,
      picture: row.picture,
      question: {
        en: row.question_en,
        hu: row.question_hu,
        ro: row.question_ro
      },
      options: [
        {
          en: row.option1_en,
          hu: row.option1_hu,
          ro: row.option1_ro
        },
        {
          en: row.option2_en,
          hu: row.option2_hu,
          ro: row.option2_ro
        },
        row.option3_en ? {
          en: row.option3_en,
          hu: row.option3_hu,
          ro: row.option3_ro
        } : {
          en: '',
          hu: '',
          ro: ''
        }
      ].filter(opt => opt.en !== ''),
      answer: parseInt(row.answer)
    }));

    const quizPath = path.join(rootDir, 'quiz.json');
    fs.writeFileSync(quizPath, JSON.stringify({ questions }, null, 2));
    console.log('✓ Quiz CSV -> JSON sikeresen konvertálva!');
  } catch (error) {
    console.error('❌ Hiba a quiz CSV konvertálása során:', error.message);
  }
}

// Main
async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log('\n📊 WWII Website - Adatkezelő Script\n');
    console.log('Használat:');
    console.log('  Helyi CSV-ből JSON-ba:');
    console.log('    node utils/update-data.js --csv-to-json battles');
    console.log('    node utils/update-data.js --csv-to-json weapons');
    console.log('    node utils/update-data.js --csv-to-json quiz');
    console.log('\n  Google Sheets-ről szinkronizálás:');
    console.log('    node utils/update-data.js --sync battles');
    console.log('    node utils/update-data.js --sync weapons');
    console.log('    node utils/update-data.js --sync quiz');
    console.log('    node utils/update-data.js --sync all    (mindent szinkronizál)\n');
    process.exit(1);
  }

  const command = args[0];
  const target = args[1];

  if (command === '--csv-to-json') {
    switch (target) {
      case 'battles':
        csvToJsonBattles();
        break;
      case 'weapons':
        csvToJsonWeapons();
        break;
      case 'quiz':
        csvToJsonQuiz();
        break;
      default:
        console.error('❌ Ismeretlen célpont:', target);
    }
  } else if (command === '--sync') {
    if (target === 'all') {
      console.log('\n🔄 Összes adat szinkronizálása Google Sheets-ről...\n');
      await downloadAndSync('battles');
      await downloadAndSync('weapons');
      await downloadAndSync('quiz');
      console.log('\n✅ Szinkronizálás kész!\n');
    } else if (target) {
      console.log('\n🔄 Szinkronizálás indítva...\n');
      await downloadAndSync(target);
      console.log('\n✅ Szinkronizálás kész!\n');
    } else {
      console.error('❌ Válassz: battles, weapons, quiz vagy all');
    }
  } else {
    console.error('❌ Ismeretlen parancs:', command);
  }
}

main().catch(err => {
  console.error('❌ Kritikus hiba:', err.message);
  process.exit(1);
});
