import pkg from "pg";
const { Pool } = pkg;
import { env } from "$env/dynamic/private";

const pool = new Pool({
  user: "timsmith",
  host: "localhost", // Or the correct host if not local
  database: "qr_codes_db",
  password: env.SECRET_DB_PASSWORD,
  port: 5432, // Or the correct port
});

// Function to save QR code to database
export async function saveQrCodeToDatabase(content: string, svgData: string) {
  try {
    const query =
      "INSERT INTO qr_codes (content, svg_data) VALUES ($1, $2) RETURNING id";
    const values = [content, svgData];

    // Use the pool to execute the query
    const result = await pool.query(query, values);

    const insertedId = result.rows[0].id; // Get the inserted ID

    console.log(`QR code saved with ID: ${insertedId}`);
  } catch (error) {
    console.error("Error saving QR code:", error);
    throw error; // Handle the error appropriately
  }
}
