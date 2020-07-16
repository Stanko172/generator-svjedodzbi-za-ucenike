<template>
    <div>
        <h1>Docs generator</h1>

        <v-btn class="primary" @click="downloadPDF">Download pdf</v-btn>
    </div>
</template>

<script>
import students from '@/data/students.js';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;
export default {
    data(){
        return{
            students
        }
    },
    methods:{
        convertGrade(stringGrade){
            var patt = /^[1,8]/
            var result = stringGrade.match(patt)

            return result[0]
        },
        romanize (num) {
            if (isNaN(num))
                return NaN;
            var digits = String(+num).split(""),
                key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
                    "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
                    "","I","II","III","IV","V","VI","VII","VIII","IX"],
                roman = "",
                i = 3;
            while (i--)
                roman = (key[+digits.pop() + (i * 10)] || "") + roman;
            return Array(+digits.join("") + 1).join("M") + roman;
        },
        downloadPDF(){
            const testStudent = this.students[0]
            const gradeConverted = this.convertGrade(testStudent.class_department.grade)
            
            var docDefinition = {
            //Background okvir
            content: [
                {
                    style: 'section',
                    fillColor: '#ffedcc',
                    table: {
                        widths: [ '*'],
                        body: [
                            [ 
                                {
                                text: 'Bosna i Hercegovina'.toUpperCase(),
                                color: '#0e1111',
                                fillColor: '#ffedcc',
                                fontSize: 10
                                }
                            ],
                            [
                                {
                                text: testStudent.school.entity.toUpperCase(),
                                color: '#0e1111',
                                fillColor: '#ffedcc',
                                fontSize: 12
                                }
                            ],
                            [
                                {
                                text: testStudent.school.county.toUpperCase(),
                                color: '#0e1111',
                                fillColor: '#ffedcc',
                                fontSize: 14,
                                }
                            ],
                            [
                                {
                                text: ['\n', testStudent.school.name],
                                color: '#0e1111',
                                fillColor: '#ffedcc',
                                fontSize: 12,
                                }
                            ],
                            [
                                {
                                columns: [
                                    {
                                        fontSize: 12,
                                        color: '#0e1111',
                                        text: 'Općina/grad: ' + testStudent.school.city_community,
                                    },
                                    {
                                        fontSize: 12,
                                        color: '#0e1111',
                                        text: 'Mjesto: ' + testStudent.school.location,
                                    }
                                ]
                                }
                            ],
                            [
                                {
                                text: ['\n\n', 'Svjedodžba'.toUpperCase()],
                                color: '#0e1111',
                                fillColor: '#ffedcc',
                                bold: true,
                                fontSize: 20,
                                }
                            ],
                            [
                                {
                                text: 'o završenom ' + gradeConverted + '(' + this.romanize(gradeConverted) + ')' + ' razredu\n\n\n',
                                color: '#0e1111',
                                fillColor: '#ffedcc',
                                bold: true,
                                fontSize: 12,
                                }
                            ],
                            //Table with grades
                            [
                                {
                                    table: {
                                        widths: ['100%',],
                                        body: [
                                            [
                                                {
                                                    columns: [
                                                    {   
                                                        fontSize: 10,
                                                        color: '#0e1111',
                                                        columns:[
                                                            {
                                                                text: ['first inner column\n', 'first inner column']
                                                            },
                                                            {
                                                                text: ['first inner column\n', 'first inner column']
                                                            }
                                                        ]
                                                    },
                                                    {   
                                                        fontSize: 10,
                                                        color: '#0e1111',
                                                        columns:[
                                                            {
                                                                text: ['first inner column\n', 'first inner column']
                                                            },
                                                            {
                                                                text: ['first inner column\n', 'first inner column']
                                                            }
                                                        ]
                                                    }
                                                ]
                                                }
                        
                                            ],
                                        ]
                                    }
                                }
                            ]
                        ]
                    },
                    layout: 'noBorders'
                }
            ],
            styles: {
                section: {
                    fontSize: 12,
                    color: '#FFFFFF',
                    fillColor: '#2361AE',
                    margin: [0, 5, 0, 5]
                },
                text: {
                    fontSize: 18
                }
            },
            defaultStyle: {
                alignment: 'center'
            }
        }

            pdfMake.createPdf(docDefinition).open();
        }
    }
}
</script>

<style scoped>

</style>