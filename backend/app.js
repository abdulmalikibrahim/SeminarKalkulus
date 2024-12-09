const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const { body, validationResult } = require('express-validator')

const app = express()

app.use(cors())
app.use(express.json())

// Koneksi ke Database MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Ganti dengan username MySQL Anda
    password: '', // Ganti dengan password MySQL Anda
    database: 'seminar', // Ganti dengan nama database Anda
});

db.connect((err) => {
    if (err) {
        console.error('Koneksi database gagal:', err);
    } else {
        console.log('Terhubung ke database MySQL.');
    }
});

app.post('/api/addParticipant',[
    body('universitas').notEmpty().withMessage('Asal Universitas harus di isi'),
    body('universitas').isIn(["Universitas Pelita Bangsa","Other"]).withMessage('Asal Universitas hanya di isi Universitas Pelita Bangsa dan Other'),
    body('otherUniversity').if(body('universitas').equals("Other")).notEmpty().withMessage("Nama Universitas harus di isi"),
    body('nim').if(body('universitas').equals("Universitas Pelita Bangsa")).notEmpty().withMessage("NIM harus di isi"),
    body('kelas').if(body('universitas').equals("Universitas Pelita Bangsa")).notEmpty().withMessage("Kelas harus di isi"),
    body('namaLengkap').isLength({ max: 25 }).withMessage('Nama Lengkap maksimal 25 karakter'),
    body('nomorHP').notEmpty().withMessage('Nomor HP harus di isi'),
    body('nomorHP').isInt().withMessage('Nomor HP harus berisi angka'),
    body('email').isEmail().withMessage('Format email tidak valid'),
    body('email').notEmpty().withMessage('Email harus di isi'),
],(req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }

    const { universitas, otherUniversity, nim, kelas, namaLengkap, nomorHP, email } = req.body;

    //CHECK EMAIL
    const queryValidation = "SELECT email FROM peserta WHERE email = ?"
    db.query(queryValidation,email,(error,result) => {
        if(error){
            return res.status(500).json({errors : "Database error"})
        }

        console.log(result)
        if(result.length > 0){
            return res.status(400).json({errors : [{"path" : "email", "msg" : "Email anda sudah terdaftar"}]})
        }else{
            const query = "INSERT INTO peserta (universitas,otheruniversity,nim,kelas,namalengkap,nomorhp,email) VALUES (?,?,?,?,?,?,?)";
            db.query(query,[universitas,otherUniversity,nim,kelas,namaLengkap,nomorHP,email],(error,result) => {
                if(error){
                    return res.status(500).json({errors : "Database error"})
                }
        
                return res.status(201).json({message : "Data berhasil disimpan"})
            })
        }
    })
    
})

app.get('/api/getParticipant',(req,res) => {
    const query = "SELECT IF(otheruniversity != '', otheruniversity, universitas) as universitas, namalengkap,kelas,status_kehadiran,status_cetak_sertifikat FROM peserta ORDER BY namalengkap ASC"
    db.query(query,(error,result) => {
        if(error){
            return res.status(500).json({errors : "Database error"})
        }

        return res.status(200).json({data:result})
    })
})


app.post('/api/certificateParticipant',(req,res) => {
    const { email } = req.body

    if(!email){
        return res.status(400).json({errors : "Isi data email anda terlebih dahulu"})
    }
    
    const query = "SELECT IF(otheruniversity != '', otheruniversity, universitas) as universitas, namalengkap,kelas,status_kehadiran,status_cetak_sertifikat FROM peserta WHERE email = ? ORDER BY namalengkap ASC"
    db.query(query,email,(error,result) => {
        if(error){
            return res.status(500).json({errors : "Database error"})
        }

        const query = "UPDATE peserta SET status_cetak_sertifikat = ? WHERE email = ?"
        db.query(query,["Sudah",email],(error,result) => {
            if(error){
                return res.status(500).json({errors : "Database error update certificate"})
            }
        })

        return res.status(200).json({data:result})
    })
})

app.post('/api/attendanceParticipant',(req,res) => {
    const { email } = req.body

    if(!email){
        return res.status(400).json({errors : "Isi data email anda terlebih dahulu"})
    }
    
    const query = "SELECT IF(otheruniversity != '', otheruniversity, universitas) as universitas, namalengkap,kelas,status_kehadiran,status_cetak_sertifikat FROM peserta WHERE email = ? ORDER BY namalengkap ASC"
    db.query(query,email,(error,result) => {
        if(error){
            return res.status(500).json({errors : "Database error"})
        }

        const query = "UPDATE peserta SET status_kehadiran = ? WHERE email = ?"
        db.query(query,["Hadir",email],(error,result) => {
            if(error){
                return res.status(500).json({errors : "Database error update attendance"})
            }
        })

        return res.status(200).json({data:result})
    })
})


// Jalankan server
app.listen(5000, () => {
    console.log('Server berjalan di http://localhost:5000');
});