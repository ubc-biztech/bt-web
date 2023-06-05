import { GoogleSpreadsheet } from "google-spreadsheet";

const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID;
const SHEET_ID = process.env.REACT_APP_SHEET_ID;
const CLIENT_EMAIL = process.env.REACT_APP_CLIENT_EMAIL;
const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY.replace(/\\n/g, "\n");

const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

const readSpreadsheet = async () => {
  try {
    await doc.useServiceAccountAuth({
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY,
    });

    await doc.loadInfo();

    const sheet = doc.sheetsById[SHEET_ID];
    return await sheet.getRows();
  } catch (e) {
    console.log(e);
  }
};

export default readSpreadsheet;
