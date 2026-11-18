import {test,expect,Page} from '@playwright/test';
import { LoginPage } from '../src/LoginPage';

let page:Page;
async function waitForCompiereStable(page:Page) {
  const spinner = page.locator('img[src="images/wait24.gif"]');
  if (await spinner.count()) {
    await spinner.waitFor({
      state: 'hidden',
      timeout: 30000
    }).catch(() => { });
  }
  await page.locator('.compiere-dropdown-popup')
    .waitFor({
      state: 'hidden'
    }).catch(() => { });
  await page.locator('.compiere-glass-pane, .compiere-busy')
    .waitFor({
      state: 'hidden'
    }).catch(() => { });
}

test.beforeAll(async({browser})=>{
page=await browser.newPage();
 await page.goto("http://192.168.0.150:8098/apps");
 
   //login
    const logindata=new LoginPage(page);
    logindata.login('SuperUser','QA@2025','TPT','HO CHI MIN');
    await waitForCompiereStable(page);

});
test.afterAll(async({})=>{
//Logout
const logindata=new LoginPage(page)
     await logindata.logout();
     await waitForCompiereStable(page);

});

test('Login and verify homepage',async({})=>{   
    //Check homepage
     await expect(page).toHaveTitle('Home - Compiere');
    console.log(`Verified home page`);
await waitForCompiereStable(page);
     
}); 

test("Login and verify Internal Transfer screen open",async({})=>{
    //Test code
    await page.getByRole('menuitem',{name:'Main Menu'}).click();
    await waitForCompiereStable(page);
    await expect(page.getByRole('menuitem',{name:' Inventory Management'}));
    await waitForCompiereStable(page);

});
