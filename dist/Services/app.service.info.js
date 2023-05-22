"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceHub = void 0;
const common_1 = require("@nestjs/common");
const promises_1 = require("fs/promises");
const xlsx = require("xlsx");
const puppeteer_1 = require("puppeteer");
const cheerio_1 = require("cheerio");
let ServiceHub = class ServiceHub {
    constructor() {
        this.getInfo = async () => {
            var _a, _b;
            const localdir = process.cwd();
            const filePlace = localdir + '/src/Services/excel.xlsx';
            const content = await (0, promises_1.readFile)(filePlace);
            const base = content.toString('base64');
            const buffer = Buffer.from(base, 'base64');
            const workbook = xlsx.read(buffer, { type: 'buffer' });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const column = 'C';
            const range = (_b = (_a = sheet['!ref']) === null || _a === void 0 ? void 0 : _a.match(/\d+/g)) === null || _b === void 0 ? void 0 : _b.map(Number);
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
            async function scrape(url) {
                const browser = await puppeteer_1.default.launch();
                const page = await browser.newPage();
                try {
                    await page.goto(url, {
                        waitUntil: 'networkidle0',
                    });
                    const html = await page.content();
                    const $ = (0, cheerio_1.load)(html);
                    const tableRows = $('table tr');
                    const tableHeaders = $(tableRows[0])
                        .find('th')
                        .map((i, el) => $(el).text().trim())
                        .get();
                    const tableDataNoInputs = tableRows
                        .slice(1)
                        .map((_i, el) => {
                        const rowData = {};
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
                            rowData[header] = String(value);
                        });
                        console.log(rowData);
                        return rowData;
                    })
                        .get();
                    const tableDataInputs = tableRows
                        .slice(1)
                        .map((_i, el) => {
                        const rowData = {};
                        $(el)
                            .find('td input')
                            .each((j, td) => {
                            const header = td.attribs.name;
                            const value = td.attribs.value;
                            if (td.attribs.name !== 'decisaoFundamentadaAsArray') {
                                console.log('input name: ' +
                                    td.attribs.name +
                                    '// input value: ' +
                                    td.attribs.value);
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
                }
                catch (err) {
                    console.error(err);
                    return err;
                }
            }
            console.log(arrValues[0]);
            const dataReturn = await scrape(arrValues[0]);
            return base;
        };
        this.postFile = async (fileString) => {
            var _a, _b;
            const buffer = Buffer.from(fileString, 'base64');
            const workbook = xlsx.read(buffer, { type: 'buffer' });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const column = 'C';
            const range = (_b = (_a = sheet['!ref']) === null || _a === void 0 ? void 0 : _a.match(/\d+/g)) === null || _b === void 0 ? void 0 : _b.map(Number);
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
            async function scrape(url) {
                console.log(url);
                const browser = await puppeteer_1.default.launch();
                const page = await browser.newPage();
                try {
                    await page.goto(url, {
                        waitUntil: 'networkidle0',
                    });
                    const html = await page.content();
                    const $ = (0, cheerio_1.load)(html);
                    const tableRows = $('table tr');
                    const tableHeaders = $(tableRows[0])
                        .find('th')
                        .map((i, el) => $(el).text().trim())
                        .get();
                    const tableDataNoInputs = tableRows
                        .slice(1)
                        .map((_i, el) => {
                        const rowData = {};
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
                            rowData[header] = String(value);
                        });
                        console.log(rowData);
                        return rowData;
                    })
                        .get();
                    const tableDataInputs = tableRows
                        .slice(1)
                        .map((_i, el) => {
                        const rowData = {};
                        $(el)
                            .find('td input')
                            .each((j, td) => {
                            const header = td.attribs.name;
                            const value = td.attribs.value;
                            if (td.attribs.name !== 'decisaoFundamentadaAsArray') {
                                console.log('input name: ' +
                                    td.attribs.name +
                                    '// input value: ' +
                                    td.attribs.value);
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
                }
                catch (err) {
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
};
ServiceHub = __decorate([
    (0, common_1.Injectable)()
], ServiceHub);
exports.ServiceHub = ServiceHub;
//# sourceMappingURL=app.service.info.js.map