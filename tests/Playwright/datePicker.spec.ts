import{test,expect} from '@playwright/test';

import {datePickbyNext, datePickbySelect} from './utiles/datePicker'
test('Date Picker by Dropdown',async({page})=>{

await page.goto("https://testautomationpractice.blogspot.com/");
let year='2026';
let month='Dec';
let date='28';
await datePickbySelect(date,month,year,page);
const datePick=await page.locator("input#txtDate");
const fieldDate=await datePick.inputValue();
await expect(fieldDate).toBe("28/12/2026");

});
test('Date Picker by Scroll next',async({page})=>{

await page.goto("https://testautomationpractice.blogspot.com/");
let year='2026';
let month='September';
let date='25';
let backDate=true;
await datePickbyNext(date,month,year,backDate,page);
const datePick=await page.locator("input#datepicker");
const fieldDate=await datePick.inputValue();
await expect(fieldDate).toBe("09/25/2026")
});