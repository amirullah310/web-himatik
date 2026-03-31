<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: DejaVu Sans, sans-serif; line-height: 1.6; color: #222; padding: 20px; }
    h1 { font-size: 22px; text-align: center; margin-bottom: 10px; }
    .meta { font-size: 12px; text-align: center; color: #666; margin-bottom: 20px; }
    .content { font-size: 13px; text-align: justify; }
    img { display: block; margin: 0 auto 20px auto; max-width: 100%; }
  </style>
</head>
<body>
  <h1>{{ $article->title }}</h1>

  <div class="meta">
    Ditulis oleh {{ $article->author->name ?? 'Anonim' }}<br>
    {{ $article->created_at->format('d F Y') }}
  </div>

  @if ($article->picture)
    <img src="{{ public_path('storage/' . $article->picture) }}" alt="gambar artikel">
  @endif

  <div class="content">
    {!! $article->content !!}
  </div>
</body>
</html>
