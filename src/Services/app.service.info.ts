import { Injectable } from '@nestjs/common';
import { readFile, readdir } from 'fs/promises';
import * as xlsx from 'xlsx';
import puppeteer from 'puppeteer';
import { Parser, DomHandler } from 'htmlparser2';
import rp = require('request-promise-native');
import { text } from 'body-parser';
import { load } from 'cheerio';

@Injectable()
export class ServiceHub {
  getInfo = async () => {
    //console.log(process.cwd());
    const localdir = process.cwd();
    const filePlace = localdir + '/src/Services/excel.xlsx';
    const content = await readFile(filePlace);
    const base = content.toString('base64');
    const buffer = Buffer.from(base, 'base64');
    const workbook = xlsx.read(buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const column = 'C';
    const range = sheet['!ref']?.match(/\d+/g)?.map(Number);
    if (!range) {
      throw new Error('Worksheet is empty or has no data');
    }
    const columnRange = xlsx.utils.encode_range({
      s: { c: xlsx.utils.decode_col(column), r: range[0] },
      e: { c: xlsx.utils.decode_col(column), r: range[1] },
    });
    const columnValues = xlsx.utils.sheet_to_json(sheet, {
      header: 1,
      range: columnRange,
    });
    const arrValues = columnValues.map((el) => String(el));
    async function scrape(url: string) {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      try {
        await page.goto(url, {
          waitUntil: 'networkidle0',
        });
        const html = await page.content();
        const $ = load(html);
        const tableRows = $('table tr');
        const tableHeaders = $(tableRows[0])
          .find('th')
          .map((i, el) => $(el).text().trim())
          .get();
        const tableDataNoInputs = tableRows
          .slice(1)
          .map((_i, el) => {
            const rowData: Record<string, any> = {};
            $(el)
              .find('td')
              .each((j, tr) => {
                const header = 'header';
                const value = tr.attribs.value;
                if (tr.children[0].type === 'text') {
                  console.log(tr.children[0].data.trim());
                  console.log('>>>>>>>>>');
                  console.log(value);
                }
                //console.log(td.attribs.value);
                rowData[header] = String(value);
              });
            console.log(rowData);
            return rowData;
          })
          .get();
        const tableDataInputs = tableRows
          .slice(1)
          .map((_i, el) => {
            const rowData: Record<string, any> = {};
            $(el)
              .find('td input')
              .each((j, td) => {
                const header = td.attribs.name;
                const value = td.attribs.value;
                if (td.attribs.name !== 'decisaoFundamentadaAsArray') {
                  console.log(
                    'input name: ' +
                      td.attribs.name +
                      '// input value: ' +
                      td.attribs.value,
                  );
                }
                rowData[header] = String(value);
              });
            return rowData;
          })
          .get();
        const objTable = {
          headers: tableHeaders,
          dataInputs: tableDataInputs,
          dataNoInputs: tableDataNoInputs,
        };
        return objTable;
      } catch (err) {
        console.error(err);
        return err;
      }
    }
    console.log(arrValues[0]);
    const dataReturn = await scrape(arrValues[0]);
    //console.log(dataReturn);
    return base;
  };

  postFile = async (fileString: string) => {
    const buffer = Buffer.from(fileString, 'base64');
    const workbook = xlsx.read(buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const column = 'C';
    const range = sheet['!ref']?.match(/\d+/g)?.map(Number);
    if (!range) {
      throw new Error('Worksheet is empty or has no data');
    }
    const columnRange = xlsx.utils.encode_range({
      s: { c: xlsx.utils.decode_col(column), r: range[0] },
      e: { c: xlsx.utils.decode_col(column), r: range[1] },
    });
    const columnValues = xlsx.utils.sheet_to_json(sheet, {
      header: 1,
      range: columnRange,
    });
    const arrValues = columnValues.map((el) => String(el));
    async function scrape(url: string) {
      console.log(url);
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      try {
        await page.goto(url, {
          waitUntil: 'networkidle0',
        });
        const html = await page.content();
        const $ = load(html);
        const tableRows = $('table tr');
        const tableHeaders = $(tableRows[0])
          .find('th')
          .map((i, el) => $(el).text().trim())
          .get();
        const tableDataNoInputs = tableRows
          .slice(1)
          .map((_i, el) => {
            const rowData: Record<string, any> = {};
            $(el)
              .find('td')
              .each((j, tr) => {
                const header = 'header';
                const value = tr.attribs.value;
                if (tr.children[0].type === 'text') {
                  console.log(tr.children[0].data.trim());
                  console.log('>>>>>>>>>');
                  console.log(value);
                }
                //console.log(td.attribs.value);
                rowData[header] = String(value);
              });
            console.log(rowData);
            return rowData;
          })
          .get();
        const tableDataInputs = tableRows
          .slice(1)
          .map((_i, el) => {
            const rowData: Record<string, any> = {};
            $(el)
              .find('td input')
              .each((j, td) => {
                const header = td.attribs.name;
                const value = td.attribs.value;
                if (td.attribs.name !== 'decisaoFundamentadaAsArray') {
                  console.log(
                    'input name: ' +
                      td.attribs.name +
                      '// input value: ' +
                      td.attribs.value,
                  );
                }
                rowData[header] = String(value);
              });
            return rowData;
          })
          .get();
        const objTable = {
          headers: tableHeaders,
          dataInputs: tableDataInputs,
          dataNoInputs: tableDataNoInputs,
        };
        return objTable;
      } catch (err) {
        console.error(err);
        return err;
      }
    }
    console.log(arrValues[0]);
    const dataReturn = await scrape(arrValues[0]);
    console.log(dataReturn);
    console.log('>>>>>>>>>>>>>>>>>>>>>>>');
    return arrValues;
  };
}
