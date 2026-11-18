import {test,expect} from "@playwright/test";

test('Keyboard Actions',async({page})=>{

    await page.goto("http://192.168.0.150:8098/apps/Compiere.html#Login");

    const user=await page.getByRole('textbox').nth(0);

   await user.focus();
    await page.pause();
   await page.keyboard.insertText("SuperUser");

   await page.keyboard.press('Tab');
   await page.keyboard.insertText("QA@2025");
   await page.keyboard.press('Enter');
   const role=await page.getByRole('textbox').nth(0);
   role.focus();
   await page.keyboard.press('Control+A');
   await page.keyboard.insertText("TPT");


});
test('Download',async({page})=>{
await page.goto("https://ten10.in/odoo/all-tasks/2266");
   await page.fill('input[name="login"]', 'selvakumar.srinivasan@tenthplanet.co');// imthiaz.sahabdeen@tenthplanet.co ,selvakumar.srinivasan@tenthplanet.co
   await page.fill('input[name="password"]', 'SKUmarSrini3579@');// ,TPT@12345 ,SKUmarSrini3579@
   await page.click('button[type="submit"]');

let attch1=await page.locator("button[class='o-mail-Chatter-attachFiles btn btn-link text-action px-1 d-flex align-items-center my-2']");
await attch1.waitFor({ state: 'visible' });
await attch1.click();

let attch=await page.locator("div[class='o-mail-AttachmentContainer d-flex border position-relative rounded-3'][role='menuitem']").all();
const count=await attch.length;
console.log(count);
let bt=await page.locator("button[title='Download']").all();
for(let i=0;i<count;i++){
  const[dn]= await Promise.all([
 page.waitForEvent('download'),
 //attch[i].click(),
 bt[i].click()
   ])
  // await dn.saveAs("/home/dev078/Downloads/Learning/test/");
}
});