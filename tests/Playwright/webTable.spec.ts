import{test,expect} from '@playwright/test';

test.skip('Dynamic WebTable',async({page})=>{

await page.goto("https://testautomationpractice.blogspot.com/");

let dynTab=await page.locator("#taskTable");

let titRow=await dynTab.locator('tr').locator('th').allInnerTexts();
console.log(titRow);

let rows=await dynTab.locator('tr');
let count=await rows.count();
console.log(count);

//1) Disk space of Firefox process: ouput
const firefoxProcess=await page.locator(".firefox-disk").first().innerText();//FF Disk space 
const crmCPu=await page.locator("strong.chrome-cpu").innerText();//Chrome CPU Load
const chrmNtSp=await page.locator("strong.chrome-network").innerText();//Chrome Network speed
const mSize=await page.locator("strong.firefox-memory").innerText();


for(let i=0;i<count;i++){
 const column=await rows.nth(i).locator('td').allInnerTexts();
    if(column.includes('Firefox')){
 const fx=await rows.nth(i).locator('td',{hasText:"MB/s"}).innerText();
 console.log("Firefox Disk Space in screen is",firefoxProcess);
  console.log("Firefox Disk Space in table is",fx);
  await expect(firefoxProcess).toBe(fx);
  const tmSize=await rows.nth(i).locator('td').filter({hasText:/MB$/}).innerText();
  console.log("Screen FireFox Memory",mSize);
  console.log("Table FireFox Memory",tmSize);
  await expect(mSize).toBe(tmSize);

  await expect(firefoxProcess).toBe(fx);
    }else if(column.includes('Chrome')){
    const chrCPU=await rows.nth(i).locator('td').filter({hasText:"%"}).innerText();
    console.log("Screen chrome CPU",crmCPu);
    console.log("Table chrome CPU",chrCPU);
    await expect(crmCPu).toBe(chrCPU);
    const chrmNTspTable=await rows.nth(i).locator('td').filter({hasText:"Mbps"}).innerText();
    console.log("Screen chrome Network Speed",chrmNtSp);
    console.log("Table chrome Network Speed",chrmNTspTable);
    await expect(chrmNtSp).toBe(chrmNTspTable);
    }
}
});

test('Static WebTables', async({page})=>{
await page.goto("https://testautomationpractice.blogspot.com/");

const staticTbl=await page.locator("//table[@name='BookTable']");

const rows=await staticTbl.locator('tr');
const count=await rows.count();
console.log(count);
const vals=await page.locator("table[name='BookTable'] tr td").allInnerTexts();

for(let i=1;i<count;i++){
   let headings=await staticTbl.locator('tbody').locator('tr').nth(i).locator('td').nth(0).innerText();
   if(headings.trim()==='Master In Selenium'){
   let auther=await rows.nth(i).locator('td').nth(1).innerText();
   console.log(headings,"is",auther);
   await expect(auther).toBe("Mukesh");
   break;
  }
}


});