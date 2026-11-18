/// <reference types='node'/>
import {test,expect} from '@playwright/test';
import { Buffer } from 'buffer';


//Generate the Token using token URL
test('DMS API Post',async({request})=>{
    const baseUrl="http://192.168.0.150:8098/ngerpdmsapi";
    const auth=Buffer.from('admin:admin123').toString('base64');
    const tokenUrl=`${baseUrl}/ngerpdmsapiinit`;
const req=await request.post(tokenUrl,{headers:{Authorization:`Basic ${auth}`}});
 expect(await req.ok()).toBeTruthy();
expect (await req.status()).toBe(200);
const token=await req.text();
//const tk=json.token;
console.log(`Generated Token is : "${token}"`);
const reqBidy=  {
"ad_org_id": "1000102",
"sodocno": "QA-Test11112026-6",
"doctypename": "Promotion Order",
"description": "1 Trade, 1 Bom",
"salesrepcode": "110354",
"pricelist_id": "1002529",
"customercode": "100073647",
"ship_to_id": "74813",
"warehousecode": "158",
"giftwarehousecode": "12008",
"sodate": "2026-11-11 12:45:00",
"orderlines": [
{
"dms_soline_id": "17938631966779",
"lineno": "10",
"productcode": "74002",
"ischarge": "N",
"campaignname": "Normal Sales",
"totalqty": "1",
"qtyincarton": "0",
"qtyintin": "1",
"priceactual": "1155",
"linenetamt": "1000",
"taxrate": "8",
"taxamt": "500",
"channelprice": "1000",
"iscommercialdisc": "N",
"isfreeitem": "N",
"isfreeitemoriglines": "",
"ispromotionline": "N",
"ispricedisc": "N",
"dmsdiscamt": "0",
"um_whtype": ""
},
{
"dms_soline_id": "17938631966772",
"lineno": "20",
"productcode": "77191",
"ischarge": "N",
"campaignname": "Normal Sales",
"totalqty": "5",
"qtyincarton": "0",
"qtyintin": "5",
"priceactual": "5000",
"linenetamt": "0",
"taxrate": "8",
"taxamt": "500",
"channelprice": "0",
"iscommercialdisc": "N",
"isfreeitem": "N",
"isfreeitemoriglines": "",
"ispromotionline": "N",
"ispricedisc": "N",
"dmsdiscamt": "0",
"um_whtype": ""
},{
      "dms_soline_id": "15106774",
      "lineno": 8,
      "campaignname": "Normal Sales",
      "productcode": "E2303",
      "ischarge": "N",
      "totalqty": 8,
      "qtyincarton": 0,
      "qtyintin": 8,
      "priceactual": "0",
      "linenetamt": "0",
      "taxrate": "0",
      "taxamt": "0",
      "channelprice": "0",
      "iscommercialdisc": "N",
      "isfreeitem": "Y",
      "isfreeitemoriglines": 15106752,
      "ispromotionline": "Y",
      "ispricedisc": "N",
      "dmsdiscamt": "0",
      "um_whtype": null
    }
]
}
const so= await request.post(`${baseUrl}/importso`,{headers:{Authorization:`Bearer ${token}`},data:reqBidy});

  expect(so.ok()).toBeTruthy();
  expect(so.status()).toBe(200);
  const res=await so.json();
  console.log(res);

});

