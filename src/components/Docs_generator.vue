<template>
    <div>
        <h1>Docs generator</h1>

        <v-btn class="primary" @click="test">Download pdf</v-btn><br><br>
        <v-btn class="primary" @click="test2">Preview pdf</v-btn>

    </div>
</template>

<script>
import students from '@/data/students.js';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

import moment from 'moment';

import templateBorder from '@/data/templateBorder.js';

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
        gradesToString(grade_number, option){

            if(option === 1){

                const stringGrades = {
                    2: 'dovoljan',
                    3: 'dobar',
                    4: 'vrlo dobar',
                    5: 'odličan' 
                }

                return stringGrades[grade_number]

            }else if(option === 2){

                const stringGrades = {
                    2: 'dovoljnim',
                    3: 'dobrim',
                    4: 'vrlo dobrim',
                    5: 'odličnim' 
                }

                return stringGrades[grade_number]
            }

        },
        getRegularGrades(){
            const grades = this.students[0].grades

            const regular_subjects = []
            const regular_subjects_grade = []
            

            for (const [key, value] of Object.entries(grades.regular_subjects)) {
                regular_subjects.push(key + '\n')
                regular_subjects_grade.push(this.gradesToString(value, 1) + ' (' + value + ')' + '\n')
            }

            return [regular_subjects, regular_subjects_grade]


        },
        getIrregularGrades(){
            const grades = this.students[0].grades

            const irregular_subjects = []
            const irregular_subjects_grade = []

            //Merging regular_subjects_choice and elective subjects
            const regular_elective_subjects = {...grades.regular_subjects_choice, ...grades.elective_subjects}

            for (const [key, value] of Object.entries(regular_elective_subjects)) {
                irregular_subjects.push(key + '\n')
                irregular_subjects_grade.push(this.gradesToString(value, 1) + ' (' + value + ')' + '\n')
            }

            return [irregular_subjects, irregular_subjects_grade]
        },
        classToString(class_number, option){
            const classes = {
                1: 'prvi',
                2: 'drugi',
                3: 'treći',
                4: 'četvri',
                5: 'peti',
                6: 'šesti',
                7: 'sedmi',
                8: 'osmi',
                9: 'deveti',
            }

            const classes2 = {
                1: 'prvom',
                2: 'drugom',
                3: 'trećem',
                4: 'četvrtom',
                5: 'petom',
                6: 'šestom',
                7: 'sedmom',
                8: 'osmom',
                9: 'devetom',
            }

            if(option === 1){ return classes[class_number] }
            else if(option === 2){ return classes2[class_number] }
        },
        convertNotes(notes){
            var notes_string = ''

            notes.forEach(note => {
                notes_string += '' + moment(note.note_date).format('DD.MM.YYYY') + ' ' + note.note_description + '\n'
            })

            return notes_string
        },
        ar_mean(grades){
            const grades_extended = {...grades.regular_subjects, ...grades.regular_subjects_choice, ...grades.elective_subjects}

            var sum = 0
            var gr_length = 0

            sum = Object.values(grades_extended).reduce((a, b) => a + b, 0)
            gr_length = Object.keys(grades_extended).length

            return sum / gr_length
        },
        male_female(option, gender){
            switch(option){
                case 1:
                    if(gender === "muško"){
                        return "n"
                    }else{
                        return "na"
                    }
                case 2:
                    if(gender === "muško"){
                        return "o"
                    }else{
                        return "la"
                    }
                case 3:
                    if(gender === "muško"){
                        return "k"
                    }else{
                        return "ca"
                    }
                case 4:
                    if(gender === "muško"){
                        return "lj" 
                    }else{
                        return "ca"
                    }
            }
        },
        define_doc(student){
            const testStudent = student
            const gradeConverted = this.convertGrade(testStudent.class_department.grade)
            const studentSuccess = this.ar_mean(testStudent.grades)

            const regular_subjects_name = this.getRegularGrades()[0]
            const regular_subjects_grade = this.getRegularGrades()[1]

            const irregular_subjects_name = this.getIrregularGrades()[0]
            const irregular_subjects_grade = this.getIrregularGrades()[1]

            console.log(this.ar_mean(testStudent.grades))
            
            var docDefinition = {
            //Background okvir
            pageSize: 'LETTER',
            background: {
                image: templateBorder,
                 width: 595,
                height: 790
            },
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
                                characterSpacing: 3.0,
                                bold: true,
                                fontSize: 20,
                                }
                            ],
                            [
                                {
                                text: 'o završenom ' + this.classToString(gradeConverted, 2) + '(' + this.romanize(gradeConverted) + ')' + ' razredu\n\n\n',
                                color: '#0e1111',
                                fillColor: '#ffedcc',
                                bold: true,
                                fontSize: 12,
                                }
                            ],
                            [
                                {
                                    fontSize: 10,
                                    color: '#0e1111',
                                    alignment: 'center',
                                    columns: [
                                        {
                                          text:['ime i prezime: ', {text: testStudent.first_name + ' ' + testStudent.last_name , fontSize: 14, bold: true}]
                                        }
                                    ]
                                }
                            ],
                            [
                                {
                                    fontSize: 10,
                                    color: '#0e1111',
                                    alignment: 'center',
                                    columns: [
                                        {
                                          text:['roditelji: ', {text: testStudent.parents.father.first_name + ' i ' + testStudent.parents.mother.first_name, fontSize: 12}]
                                        },
                                        {
                                          text:['rođe' + this.male_female(1, testStudent.gender) + ': ', {text:  moment('2006-04-23T18:25:43.511Z').format('DD.MM'), fontSize: 12}]
                                        },
                                    ],
                                    columnGap: 150
                                }
                            ],
                            [
                                {
                                    fontSize: 10,
                                    color: '#0e1111',
                                    alignment: 'center',
                                    columns: [
                                        {
                                          text:['mjesto: ', {text: testStudent.birth_place, fontSize: 12}]
                                        },
                                        {
                                          text:['općina/grad: ', {text: testStudent.city_community, fontSize: 12}]
                                        },
                                        {
                                          text:['država: ', {text: testStudent.country, fontSize: 12}]
                                        },
                                    ]
                                }
                            ],
                            [
                                {
                                    fontSize: 10,
                                    color: '#0e1111',
                                    alignment: 'center',
                                    columns: [
                                        {
                                          text:['državljanstvo: ', {text: testStudent.country, fontSize: 12}]
                                        },
                                        {
                                          text:['nacionalnost: ', {text: testStudent.nationality, fontSize: 12}]
                                        }
                                    ]
                                }
                            ],
                            [
                                {
                                    fontSize: 10,
                                    color: '#0e1111',
                                    alignment: 'center',
                                    columns: [
                                        {
                                          text:['pohađa' + this.male_female(2, testStudent.gender) +  ' je u školskoj : ' + testStudent.school_year[0] + '/' + testStudent.school_year[1] + ' godini ' + this.classToString(gradeConverted, 1) + ' (' + this.romanize(gradeConverted) + ') ' + ' razred ' + this.classToString(testStudent.taken, 1) + ' put i pokaza' + this.male_female(2, testStudent.gender) + ' ovaj uspjeh: \n\n']
                                        }
                                    ]
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
                                                                width: '70%',
                                                                alignment: 'left',
                                                                text: regular_subjects_name
                                                            },
                                                            {
                                                                width: '30%',
                                                                alignment: 'left',
                                                                text: regular_subjects_grade
                                                            }
                                                        ]
                                                    },
                                                    {   
                                                        fontSize: 10,
                                                        color: '#0e1111',
                                                        columns:[
                                                            {
                                                                width: '70%',
                                                                text: irregular_subjects_name
                                                            },
                                                            {
                                                                width: '30%',
                                                                text: irregular_subjects_grade
                                                            }
                                                        ]
                                                    }
                                                ]
                                                }
                        
                                            ],
                                        ]
                                    }
                                }
                            ],
                            //notes section table
                            [
                                {
                                    table: {
                                        widths: '*',
                                        body: [
                                            [
                                                {
                                                    alignment: 'left',
                                                    text: [{color: '#0e1111',  fontSize: 10, text: 'Napomena\n'.toUpperCase()}, {color: '#0e1111', fontSize: 10, text: this.convertNotes(testStudent.notes)} ]
                                                },
                                                
                                            ]
                                        ]
                                    }
                                }
                            ],
                            [
                                {   color: '#0e1111',
                                    fontSize: 10, 
                                    lineHeight: 1.2,
                                    alignment: 'left',
                                    text: [
                                        {text: '\nizosta' + this.male_female(2, testStudent.gender) + ' je '  + testStudent.absent_hours + ' opravdano i ' + testStudent.unduly_hours + ' neopravdano'},
                                        {text: '\nVladanje: ' + testStudent.conduct},
                                        {bold: true, text: '\nUčeni' + this.male_female(3, testStudent.gender) + ' je završi' + this.male_female(2, testStudent.gender) + ' ' + this.classToString(gradeConverted, 1) + '(' + this.romanize(gradeConverted) + ') razred ' + testStudent.class_department.grade.split(" ")[2] + ' škole ' + this.gradesToString(parseInt(studentSuccess), 2) + ' (' + studentSuccess + ')' + ' uspjehom.'},
                                        {text: '\nškola je upisana u ' + testStudent.school.register_type + ' pod brojem ' + testStudent.school.register_number + ' na stranici ' + testStudent.school.register_page}
                                        ]
                                },
                                
                            ],
                            [
                                {
                                    fontSize: 10,
                                    color: '#0e1111',
                                    alignment: 'left',
                                    columns: [
                                        {
                                          text: testStudent.publishing_city + ', ' + moment(new Date()).format('DD.MM.YYYY') + ' godine'
                                        },
                                        {
                                          text: 'Urudžbeni broj: ' + testStudent.ur_number + '\n\n\n'
                                        },
                                    ],
                                    columnGap: 190
                                }
                            ],
                            [
                                {
                                    fontSize: 12,
                                    color: '#0e1111',
                                    alignment: 'center',
                                    columns: [
                                        {
                                          text: 'Razredni' + this.male_female(3, testStudent.class_department.headroom_teacher_gender) + ': ' + testStudent.class_department.headroom_teacher
                                        },
                                        {
                                          text: 'Ravnate' + this.male_female(4, testStudent.school.director_gender) + ': '  + testStudent.school.director
                                        },
                                    ],
                                    columnGap: 130
                                }
                            ],
                            //Dodati info sekciju u dnu svjedodzbe
                            [ 
                                {
                                text: '\n\n',
                                color: '#0e1111',
                                fillColor: '#ffedcc',
                                fontSize: 10
                                }
                            ],

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

            //pdfMake.createPdf(docDefinition).open();
            //pdfMake.createPdf(docDefinition).download();

            return docDefinition;
        },
        previewPDF(students){
            students.forEach( student =>{
               pdfMake.createPdf(this.define_doc(student)).open();
            })
        },
        downloadPDF(students){
            students.forEach( student =>{
               pdfMake.createPdf(this.define_doc(student)).download();
            })
        },
        //Metoda za testiranje generatora, koristi niz koji se sastoji os studenata(objekti) za koje treba generirati svjedodžbe
        test(){
            this.downloadPDF(this.students);
        },
        test2(){
            this.previewPDF(this.students);
        }
    }
}
</script>

<style scoped>

</style>