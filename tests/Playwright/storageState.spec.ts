import {test,expect} from '@playwright/test';

test('Storage State',async({browser})=>{
const conx=await browser.newContext({storageState:'auth.json'});//{storageState:'auth.json'}
const page=await conx.newPage();
    await page.goto("http://192.168.0.150:8098/apps/Compiere.html#Node?nodeID=1003934");
    await page.waitForTimeout(5000);


});