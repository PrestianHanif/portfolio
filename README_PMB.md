# Portal PMB Terpadu — MIPS
> **Sistem Informasi Penerimaan Murid Baru & Santri Pindahan Berbasis Web**  
> *Dikembangkan untuk PKBM Madina Islamic Premier School (MIPS)*

[![PHP Version](https://img.shields.io/badge/PHP-8.x%20%7C%207.4-777BB4?logo=php&logoColor=white)](https://www.php.net/)
[![Framework](https://img.shields.io/badge/Framework-CodeIgniter%203%20MVC-EF4223?logo=codeigniter&logoColor=white)](https://codeigniter.com/)
[![Database](https://img.shields.io/badge/Database-MySQL-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Frontend](https://img.shields.io/badge/Frontend-Bootstrap%204%20%7C%20jQuery%20%7C%20SweetAlert-563D7C?logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![Live Showcase](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-success?logo=github)](https://prestianhanif.github.io/mips-academic-suite)

---

## 📌 Ringkasan Proyek (Overview)

**Portal PMB Terpadu MIPS** adalah aplikasi registrasi dan seleksi penerimaan murid/santri baru yang dirancang untuk mempermudah calon wali murid mendaftar secara online tanpa hambatan antrean fisik.

Aplikasi ini mengimplementasikan logika formulir pintar (*Smart Conditional Logic Form*) yang secara otomatis membedakan alur isian dan validasi dokumen antara **Santri Baru (Reguler)** dan **Santri Pindahan (Transfer Student)**, lengkap dengan modul pengumuman hasil seleksi (*Hasil PMB*) dan integrasi master data.

---

## ✨ Fitur Utama (Key Features)

### 1. 📝 Formulir Pendaftaran Terpadu (Smart Form)
* **Logika Percabangan Otomatis (*Conditional Logic*):** Pertanyaan beradaptasi secara dinamis berdasarkan jalur pilihan (Santri Baru vs Santri Pindahan).
* **Validasi Asal Sekolah:** Penginputan otomatis NPSN, NISN sekolah asal, dan alasan kepindahan bagi pendaftar mutasi.
* **Kalkulasi Biaya Masuk & Paket:** Pemilihan tier uang masuk fleksibel dan nominal custom terverifikasi sistem.

### 2. 📢 Portal Hasil Seleksi & Pengumuman Online
* **Pengecekan Status Instan:** Orang tua dapat memeriksa status penerimaan secara mandiri menggunakan nomor pendaftaran/NIK.
* **Unduh Bukti Diterima:** Cetak surat keterangan kelulusan PMB otomatis berformat PDF.

### 3. ⚙️ Dashboard Operator & Panitia PMB
* **Verifikasi Berkas:** Pemeriksaan keabsahan dokumen KK, Akta Lahir, dan Surat Pindah.
* **Penetapan Status:** Modul penentuan status seleksi (*Diterima / Cadangan / Menunggu Verifikasi*).
* **Export Rekapitulasi:** Unduh seluruh data pendaftar dalam format Excel untuk evaluasi kuota kelas.

---

## 🏗️ Alur Bisnis Pendaftaran (Admission Workflow)

```mermaid
sequenceDiagram
    autonumber
    actor Wali as Calon Wali Murid
    participant Form as Form PMB Online
    participant Ctrl as Pendaftar Controller
    participant DB as MySQL (app_pmb)
    actor Panitia as Panitia PMB / Admin

    Wali->>Form: Pilih Jalur (Santri Baru / Pindahan)
    Note over Form: Form beradaptasi menampilkan input spesifik
    Wali->>Form: Isi Biodata, Riwayat Sekolah, & Paket Masuk
    Form->>Ctrl: Submit Form Pendaftaran
    Ctrl->>DB: Validasi & Generate No. Pendaftaran
    Ctrl-->>Wali: Bukti Pendaftaran & Kode Registrasi
    Panitia->>DB: Verifikasi Berkas & Tentukan Kelulusan
    Wali->>Form: Cek Pengumuman via NIK / No. Pendaftaran
    Form-->>Wali: Tampilkan Status & Unduh Surat Hasil PMB
```

---

## 💻 Tech Stack

* **Backend:** PHP 7.4 / 8.2 (CodeIgniter 3.x Framework)
* **Database:** MySQL / MariaDB
* **Frontend:** Bootstrap 4, jQuery Validation, FontAwesome, SweetAlert2
* **Reporting:** FPDF / PHPSpreadsheet

---

## 🚀 Panduan Instalasi Lokal (Local Setup)

1. **Clone repositori:**
   ```bash
   git clone https://github.com/PrestianHanif/app-pmb.git
   cd app-pmb
   ```
2. **Setup Database:**
   * Buat database baru bernama `app_pmb` di phpMyAdmin.
   * Import skema database dari `app_pmb_hosting.sql`.
3. **Konfigurasi:**
   * Atur `base_url` di `application/config/config.php` ke `http://localhost/app-pmb/`.
   * Atur koneksi di `application/config/database.php`.
4. **Jalankan:**
   * Buka browser dan arahkan ke: `http://localhost/app-pmb/`

---

## 👤 Author & Maintainer

* **Prestian Hanif**
* Portfolio: [GitHub](https://github.com/PrestianHanif) | [LinkedIn](https://linkedin.com) | [Glints](https://glints.com)

---

## 📄 Lisensi
Proyek ini dilisensikan di bawah lisensi institusional PKBM Madina Islamic Premier School.
