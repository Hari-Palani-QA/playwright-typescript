import {test,expect,Page, Locator} from '@playwright/test';
import { LoginPage } from '../src/LoginPage';
import { defineConfig } from '@playwright/test';
const authFile = 'playwright/.auth/user.json';

test('Switch page',async({page,context})=>{ 
 await page.goto("http://192.168.0.151:8098/apps");
 await page.waitForLoadState(); 
   //login
    const logindata=new LoginPage(page);
    await logindata.login('SuperUser','123456','TPT','*');
      await page.context().storageState({
    path: authFile
  });

    await page.getByRole('menuitem',{name:' NTA AP Invoice Confirm: 1NAP2609-10060_07/10/2026_100,00'}).click();

    await page.locator("(//div[@title='Identifies a Business Partner'])[2]").click({button:'right'});



const[newPage]= await Promise.all([
context.waitForEvent('page'),
await page
  .locator("//div[@class='popupContent']//td")
  .filter({ hasText: /^Zoom$/ })
  .click()
]);
    await newPage.locator("input[name='1|0|Description']").fill("QA");
    await newPage.locator("//div[@title='Identifies the Client/Tenant for this installation.']").click({button:'right'});
    await newPage
  .locator("//div[@class='popupContent']//td")
  .filter({ hasText: /^Zoom$/ })
  .click();
  const pages= newPage.context().pages();
  const fPage=pages[0];
  const sPage=pages[1];
  const tPage=pages[2];

  await tPage.bringToFront();
  await tPage.locator("input[name='1|0|Description']").fill("QA");
  await sPage.bringToFront();
  await fPage.bringToFront();
  await fPage.locator("[name='1|0|UM_RejectionCode_ID']").fill('Huy Nghiep vu he thong');

   let pages2=page.context().pages();
   const Swpage=pages2[2];

    await Swpage.bringToFront();

  await Swpage.locator("input[name='1|0|Description']").fill("QA test 2");
  

});

test.skip('Switch page 2',async({page})=>{
 await page.goto("http://192.168.0.150:8098/apps");
 await page.waitForLoadState(); 
   //login
    const logindata=new LoginPage(page);
    await logindata.login('SuperUser','QA@2025','TPT','HO CHI MIN');
    await page.getByRole('menuitem',{name:' Manage Invoice'}).click();
});