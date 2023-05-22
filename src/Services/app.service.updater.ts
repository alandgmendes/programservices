import { Injectable } from '@nestjs/common';
import { readFile, readdir } from 'fs/promises';
import * as xlsx from 'xlsx';
import puppeteer from 'puppeteer';
import { Parser, DomHandler } from 'htmlparser2';
import rp = require('request-promise-native');
import { text } from 'body-parser';
import { load } from 'cheerio';
import { FileCreateDto } from 'src/DTO/fileCreate.Dto';

@Injectable()
export class UpdaterService {
 
}