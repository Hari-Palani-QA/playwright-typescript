import { chromium ,expect} from "@playwright/test";



async function ten10(){

const browser=await chromium.launch({ headless: false});
const context=await browser.newContext();
const page=await context.newPage();

await page.goto("https://ten10.in/web/login");
const user = page.getByText('Mobile and OTP');
await user.focus();
await user.click();
await page.getByPlaceholder("10-digit mobile number").fill('7845582176');
await page.getByRole('button',{name:'Send OTP'}).click();
const verifyBtn =page.getByRole('button', { name: 'Verify OTP' });
await expect(verifyBtn).toBeEnabled({ timeout: 120000 });
await page.getByRole('button', { name: 'Verify OTP' }).click();
await context.storageState({path:'ten10.json'});
await browser.close();
}
 ten10();
