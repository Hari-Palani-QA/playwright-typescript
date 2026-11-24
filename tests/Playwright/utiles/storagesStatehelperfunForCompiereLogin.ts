import { chromium } from "@playwright/test";



async function helpFunction(){

const browser=await chromium.launch({ headless: false});
const context=await browser.newContext();
const page=await context.newPage();

await page.goto("http://192.168.0.150:8098/apps/Compiere.html");
const user = page.locator("input[name='0|0|User']");
await user.focus();
await page.keyboard.insertText("SuperUser");
await page.keyboard.press('Tab');
await page.keyboard.insertText("QA@2025");
await page.keyboard.press('Enter');
let role= page.locator("input[name='0|0|AD_Role_ID']");
await role.focus();
await page.keyboard.press('Control+A')
await page.keyboard.press("Backspace");
await page.keyboard.insertText("TPT");
const branch= page.locator("input[name='0|0|AD_Org_ID']");
//await branch.waitFor({state:'visible'});
await branch.focus();
await page.keyboard.insertText("*");
await page.keyboard.press('Enter');
await context.storageState({path:'auth.json'});
await browser.close();
}
 helpFunction();
