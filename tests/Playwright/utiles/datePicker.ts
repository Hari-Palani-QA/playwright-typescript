import { expect, Page } from "@playwright/test";

export async function datePickbySelect(date:string,month:string,year:string,page:Page){

const datePick=await page.locator("input#txtDate");

 await datePick.click();

 const mont=await page.locator(".ui-datepicker-month");
 const yr=await page.locator(".ui-datepicker-year");

 await mont.selectOption(month);
 await yr.selectOption(year);

 const table=await page.locator(".ui-datepicker-calendar");

 const rows=await table.locator('tr');
 const rcount=await rows.count();
  console.log(rcount);

await page.locator("a.ui-state-default").filter({hasText:date}).click();
}
export async function datePickbyNext(date:string,month:string,year:string,backDate:boolean,page:Page){
const dateField=await page.locator('input#datepicker');
await dateField.click();

const monLoc=await page.locator('.ui-datepicker-month');
const yrLoc=await page.locator(".ui-datepicker-year");

while(true)
{
 if(await monLoc.innerText()===month && await yrLoc.innerText()===year){
  break;
 }
 else{
    if(backDate){
await page.locator("div[id='ui-datepicker-div'] a span").filter({hasText:'Prev'}).click();
    }else{
await page.locator("div[id='ui-datepicker-div'] a span").filter({hasText:'Next'}).click();
    }
 }
}

await page.locator("a.ui-state-default").filter({hasText:date}).click();
//await page.locator(".ui-datepicker-calendar>tbody>tr>td").getByText(date,{exact:true}).click();

}