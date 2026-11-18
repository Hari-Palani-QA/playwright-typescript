import{test,expect} from '@playwright/test';
import { promises } from 'node:dns';


let path="/home/dev078/Desktop/Import GL Journal.xls";


test('Upload file',async ({page})=>{

    await page.goto("https://the-internet.herokuapp.com/upload");

   const uplo= await page.locator("#file-upload");
      await uplo.setInputFiles(path);
      const upload=page.locator("#file-submit").click();
      const output= await page.locator("#uploaded-files").innerText();
      const he=await page.getByText("File Uploaded!").innerText();
      expect(he).toBe("File Uploaded!");
      expect(output).toBe("Import GL Journal.xls");
});
test('Download file',async({page})=>{
await page.goto("http://192.168.0.151:8098/apps/Compiere.html#Node?nodeID=1003938");
const user =await page.locator("input[name='0|0|User']");
await user.focus();
await page.keyboard.insertText("SuperUser");
await page.keyboard.press('Tab');
await page.keyboard.insertText("123456");
await page.keyboard.press('Enter');
const branch=await page.locator("input[name='0|0|AD_Org_ID']");
await branch.waitFor('visible');
await branch.focus();
await page.keyboard.insertText("*");
await page.keyboard.press('Enter');

const[extract]=await Promise.all([ page.getByRole('button',{name:'OK'}).click(),page.waitForEvent('download')
])
})