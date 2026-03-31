<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>{{ $article->title }}</title>
    <style>
        body { font-family: DejaVu Sans, Arial, sans-serif; line-height: 1.6; }
        h1 { text-align: center; margin-bottom: 20px; }
        .meta { font-size: 12px; color: #555; text-align: center; margin-bottom: 30px; }
        .content { font-size: 14px; text-align: justify; }
    </style>
</head>
<body>
    <h1>{{ $article->title }}</h1>
    <div class="meta">
        <strong>Penulis:</strong> {{ $article->author->name ?? 'Anonim' }} <br>
        <strong>Tanggal:</strong> {{ $article->created_at->format('d M Y') }}
    </div>
    <div class="content">
        {!! $article->content !!}
    </div>
</body>
</html>
