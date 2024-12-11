require('dotenv').config();
const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const { body, validationResult } = require('express-validator')

const app = express()

app.use(cors())
app.use(express.json())

// Koneksi ke Database MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, 
    user: process.env.DB_USER, // Ganti dengan username MySQL Anda
    password: process.env.DB_PASSWORD, // Ganti dengan password MySQL Anda
    database: process.env.DB_NAME, // Ganti dengan nama database Anda
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

    const { universitas, otherUniversity, nim, kelas, namaLengkap, nomorHP, email, seminar } = req.body;
    if(!seminar){
        return res.status(400).json({errors:"Seminar tidak valid"})
    }

    let table = ""
    switch (seminar) {
        case "Kalkulus":
            table = "peserta_kalkulus"
            break;
        case "Pancasila":
            table = "peserta_pancasila"
            break;
        case "B. Pemrograman":
            table = "peserta_pemrograman"
            break;
        default:
            break;
    }

    //CHECK EMAIL
    const queryValidation = "SELECT email FROM ?? WHERE email = ?"
    db.query(queryValidation,[table,email],(error,result) => {
        if(error){
            return res.status(500).json({errors : "Database error"})
        }

        if(result.length > 0){
            return res.status(400).json({errors : [{"path" : "email", "msg" : "Email anda sudah terdaftar"}]})
        }else{
            const query = "INSERT INTO ?? (universitas,otheruniversity,nim,kelas,namalengkap,nomorhp,email) VALUES (?,?,?,?,?,?,?)";
            db.query(query,[table,universitas,otherUniversity,nim,kelas,namaLengkap,nomorHP,email],(error,result) => {
                if(error){
                    return res.status(500).json({errors : "Database error"})
                }
        
                return res.status(201).json({message : "Data berhasil disimpan"})
            })
        }
    })
    
})

app.post('/api/getParticipant',(req,res) => {
    const {seminar} = req.body
    if(!seminar){
        return res.status(400).json({errors:"Seminar tidak valid"})
    }

    let table = ""
    switch (seminar) {
        case "Kalkulus":
            table = "peserta_kalkulus"
            break;
        case "Pancasila":
            table = "peserta_pancasila"
            break;
        case "B. Pemrograman":
            table = "peserta_pemrograman"
            break;
        default:
            break;
    }
    console.log(seminar)
    const query = "SELECT IF(otheruniversity != '', otheruniversity, universitas) as universitas, namalengkap,kelas,status_kehadiran,status_cetak_sertifikat FROM ?? ORDER BY namalengkap ASC"
    db.query(query,table,(error,result) => {
        if(error){
            return res.status(500).json({errors : "Database error"})
        }

        return res.status(200).json({data:result})
    })
})


app.post('/api/certificateParticipant',(req,res) => {
    const { email, seminar } = req.body

    if(!email){
        return res.status(400).json({errors : "Isi data email anda terlebih dahulu"})
    }

    if(!seminar){
        return res.status(400).json({errors:"Seminar tidak valid"})
    }

    let table = ""
    switch (seminar) {
        case "Kalkulus":
            table = "peserta_kalkulus"
            break;
        case "Pancasila":
            table = "peserta_pancasila"
            break;
        case "B. Pemrograman":
            table = "peserta_pemrograman"
            break;
        default:
            break;
    }
    
    const query = "SELECT IF(otheruniversity != '', otheruniversity, universitas) as universitas, namalengkap,kelas,status_kehadiran,status_cetak_sertifikat FROM ?? WHERE email = ? AND status_kehadiran = ? ORDER BY namalengkap ASC"
    db.query(query,[table,email,"Hadir"],(error,result) => {
        if(error){
            return res.status(500).json({errors : "Database error"})
        }

        if(result.length > 0){
            const query = "UPDATE ?? SET status_cetak_sertifikat = ? WHERE email = ?"
            db.query(query,[table,"Sudah",email],(error,result) => {
                if(error){
                    return res.status(500).json({errors : "Database error update certificate"})
                }
            })
    
            return res.status(200).json({data:result})
        }else{
            return res.status(404).json({errors:"Maaf anda sepertinya tidak mengikuti seminar, mungkin karena menggunakan link dari orang lain. Silahkan hubungi admin kami di 087708763253 untuk membuka akses sertifikat."})
        }

    })
})

app.post('/api/attendanceParticipant',(req,res) => {
    const { email,seminar } = req.body

    if(!email){
        return res.status(400).json({errors : "Isi data email anda terlebih dahulu"})
    }

    if(!seminar){
        return res.status(400).json({errors:"Seminar tidak valid"})
    }

    let table = ""
    switch (seminar) {
        case "Kalkulus":
            table = "peserta_kalkulus"
            break;
        case "Pancasila":
            table = "peserta_pancasila"
            break;
        case "B. Pemrograman":
            table = "peserta_pemrograman"
            break;
        default:
            break;
    }
    
    const query = "SELECT IF(otheruniversity != '', otheruniversity, universitas) as universitas, namalengkap,kelas,status_kehadiran,status_cetak_sertifikat FROM ?? WHERE email = ? ORDER BY namalengkap ASC"
    db.query(query,[table,email],(error,result) => {
        if(error){
            return res.status(500).json({errors : "Database error"})
        }

        const query = "UPDATE ?? SET status_kehadiran = ? WHERE email = ?"
        db.query(query,[table,"Hadir",email],(error,result) => {
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