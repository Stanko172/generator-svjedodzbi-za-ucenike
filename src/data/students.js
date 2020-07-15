export default [
    {
        firstName: 'Ivan',
        lastName: 'Ivić',
        parents: {
            father: {
                firstName: 'Marin',
                lastName: 'Ivić'
            },
            mother: {
                firstName: 'Ana',
                lastName: 'Ivić'
            }
        },
        birthday: '2006-04-23T18:25:43.511Z',
        birth_place: 'Mostar',
        city_community: 'Mostar',
        country: 'BiH',
        nationality: 'Hrvat',
        school:{
            name: 'OŠ CIM',
            location: 'Mostar',
            city_community: 'Mostar',
            director: 'Marin Marić',
            school_register_number: 50,
            shool_register_page: 100
        },
        school_year: [2019, 2020],
        class_department: {
            grade: '8. razred osnovne škole',
            headroom_teacher: 'Ivana Ivanović'
        },
        taken: 1,
        grades:{
            regular_subjects: {
                'Hrvatski jezik': 5,
                'Matematika': 5,
                'Likovna kultura': 5,
                'Glazbena kultura': 5,
                'Tjelesna i zdravstvena kultura': 5,
                'Engleski jezik': 5,
                'Biologija': 5,
                'Povijest': 5,
                'Geografija': 5,
                'Informatika': 5,
                'Tehnička kultura': 5,
                'Fizika': 5,
                'Kemija': 5
            },
            regular_subjects_choice:{
                'Katolički vjeronauk': 5
            },
            elective_subjects:{
                'Njemački jezik': 5,
                'Informatika': 5
            }
        },
        notes: [
            {
                note_date: '2020-06-10T12:20:00.511Z',
                note: 'Pohvala učiteljskog vijeća za odličan uspjeh i uzorno vladanje.'
            }
        ],
        absent_hours: 8,
        unduly_hours: 0,
        conduct: 'uzorno'
    }
]