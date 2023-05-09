#!/usr/bin/env node

import fetch from 'node-fetch';
import chalk from 'chalk';
import {program} from 'commander';
import inquire from 'inquirer'
import {handleDownload} from './download.js'

inquire.prompt([
    {
        type:'input',
        name:'projectName',
        message:'project name:',
        default:'dsm-vue-cli-sample'
    },
    {
        type:'input',
        name:'packageName',
        message:'package name:',
        default:'com.android.sample'
    }
]).then(answers=>{
    handleDownload(answers.projectName,answers.packageName);
})
