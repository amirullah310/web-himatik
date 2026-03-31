<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8" />
    <title>Pesan Kontak Baru</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f6f6f9;
            margin: 0;
            padding: 0;
        }

        .email-wrapper {
            width: 100%;
            padding: 20px;
            background: #f6f6f9;
        }

        .email-container {
            max-width: 620px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.08);
        }

        .header {
            background: #8b5cf6;
            padding: 24px;
            text-align: center;
            color: white;
        }

        .header h1 {
            margin: 0;
            font-size: 22px;
            font-weight: bold;
        }

        .content {
            padding: 30px 28px;
            color: #444;
        }

        .content h2 {
            font-size: 18px;
            font-weight: 600;
            color: #6b21a8;
            margin-bottom: 16px;
        }

        .info-box {
            background: #f3e8ff;
            padding: 18px;
            border-left: 4px solid #8b5cf6;
            border-radius: 8px;
            margin-bottom: 24px;
        }

        .info-row {
            margin-bottom: 6px;
            font-size: 15px;
        }

        .label {
            font-weight: 600;
            color: #4c1d95;
        }

        .message-box {
            background: #fafafa;
            border: 1px solid #eee;
            padding: 20px;
            font-size: 15px;
            border-radius: 8px;
            white-space: pre-line;
            line-height: 1.6;
        }

        .footer {
            text-align: center;
            padding: 18px;
            font-size: 12px;
            color: #777;
            background: #fafafa;
        }
    </style>
</head>

<body>
    <div class="email-wrapper">
        <div class="email-container">

            <!-- Header -->
            <div class="header">
                <h1>Pesan Kontak Baru</h1>
            </div>

            <!-- Content -->
            <div class="content">
                <h2>Detail Pengirim</h2>

                <div class="info-box">
                    <div class="info-row">
                        <span class="label">Nama:</span> {{ $data['name'] }}
                    </div>
                    <div class="info-row">
                        <span class="label">Telepon:</span> {{ $data['phone'] }}
                    </div>
                    <div class="info-row">
                        <span class="label">Email:</span> {{ $data['email'] }}
                    </div>
                    <div class="info-row">
                        <span class="label">Subjek:</span> {{ $data['subject'] }}
                    </div>
                </div>

                <h2>Isi Pesan</h2>
                <div class="message-box">
                    {{ $data['message'] }}
                </div>
            </div>

            <!-- Footer -->
            <div class="footer">
                Email ini dikirim otomatis dari formulir kontak website HIMATIK.<br>
                Mohon balas langsung ke alamat pengirim jika diperlukan.
            </div>

        </div>
    </div>
</body>
</html>
