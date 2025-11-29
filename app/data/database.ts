import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("daily_study.db");

// INITIALIZE DB
export const initDb = () => {
  db.execSync(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS decks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      color TEXT NOT NULL, -- store JSON string
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS cards (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      deck_id INTEGER NOT NULL,
      front TEXT NOT NULL,
      back TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(deck_id) REFERENCES decks(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS stats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      deck_id INTEGER NOT NULL,
      cards_studied INTEGER DEFAULT 0,
      overall_accuracy REAL DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(deck_id) REFERENCES decks(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS recentActivity (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      deck_id INTEGER NOT NULL,
      cards_studied INTEGER,
      accuracy REAL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(deck_id) REFERENCES decks(id) ON DELETE CASCADE
    );
  `);
};


export async function createDeck(
  name: string,
  description: string,
  color: any
) {
  const colorJSON = JSON.stringify(color);

  return await db.runAsync(
    `INSERT INTO decks (name, description, color) VALUES (?, ?, ?)`,
    [name, description, colorJSON]
  );
}

export async function createCard(deckId: number, front: string, back: string) {
  return await db.runAsync(
    `INSERT INTO cards (deck_id, front, back) VALUES (?, ?, ?)`,
    [deckId, front, back]
  );
}

export async function createStats(
  deckId: number,
  studied: number,
  accuracy: number
) {
  return await db.runAsync(
    `INSERT INTO stats (deck_id, cards_studied, overall_accuracy) VALUES (?, ?, ?)`,
    [deckId, studied, accuracy]
  );
}

export async function addRecentActivity(
  deckId: number,
  studied: number,
  accuracy: number
) {
  return await db.runAsync(
    `INSERT INTO recentActivity (deck_id, cards_studied, accuracy) VALUES (?, ?, ?)`,
    [deckId, studied, accuracy]
  );
}

export async function getAllDecks() {
  return await db.getAllAsync(`SELECT * FROM decks ORDER BY created_at DESC`);
}

export async function getCardsByDeck(deckId: number) {
  return await db.getAllAsync(
    `SELECT * FROM cards WHERE deck_id = ? ORDER BY id DESC`,
    [deckId]
  );
}

export async function getDeckWithCards(deckId: number) {
  return await db.getAllAsync(
    `
      SELECT 
        d.id AS deck_id,
        d.name AS deck_name,
        d.description,
        d.color,
        c.id AS card_id,
        c.front,
        c.back
      FROM decks d
      LEFT JOIN cards c ON d.id = c.deck_id
      WHERE d.id = ?
    `,
    [deckId]
  );
}

export async function getStats() {
  return await db.getAllAsync(`
    SELECT 
      s.*,
      d.name AS deck_name
    FROM stats s
    JOIN decks d ON d.id = s.deck_id
    ORDER BY s.created_at DESC
  `);
}

export async function getRecentActivity() {
  return await db.getAllAsync(`
    SELECT ra.*, d.name AS deck_name
    FROM recentActivity ra
    JOIN decks d ON d.id = ra.deck_id
    ORDER BY ra.created_at DESC
  `);
}
