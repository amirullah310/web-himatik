<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use OpenAI\Laravel\Facades\OpenAI;

class AIController extends Controller
{
    public function generate(Request $request)
    {
        $topic = $request->input('topic', 'Artikel umum');

        $prompt = <<<PROMPT
Tulis satu artikel blog tentang "{$topic}" dalam format JSON berikut:

{
  "title": "Judul Artikel",
  "summary": "Ringkasan singkat 1 paragraf",
  "content": "<p>Artikel minimal 3 paragraf, dalam HTML.</p>",
  "categories": [
    {"id": 1, "name": "Teknologi"},
    {"id": 2, "name": "AI"}
  ]
}
PROMPT;

        $response = OpenAI::chat()->create([
            'model' => 'gpt-4o-mini',
            'messages' => [
                ['role' => 'system', 'content' => 'Kamu adalah asisten AI penulis konten blog yang menulis dalam bahasa Indonesia.'],
                ['role' => 'user', 'content' => $prompt],
            ],
        ]);

        $content = $response['choices'][0]['message']['content'] ?? '';
        $json = json_decode($content, true);

        if (!$json) {
            // fallback jika output tidak valid JSON
            $json = [
                'title' => 'Artikel AI: ' . $topic,
                'summary' => 'Artikel tentang ' . $topic,
                'content' => nl2br($content),
                'categories' => [],
            ];
        }

        return response()->json($json);
    }
}
