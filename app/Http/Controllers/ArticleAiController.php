<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use OpenAI\Laravel\Facades\OpenAI;
use Illuminate\Support\Facades\Log;

class ArticleAiController extends Controller
{
    public function generate(Request $request)
    {
        try {
            $prompt = $request->input('prompt', 'Tulis artikel menarik tentang teknologi terbaru.');

            // Ambil client langsung dengan API key
            $client = OpenAI::client(env('OPENAI_API_KEY'));

            $response = $client->chat()->create([
                'model' => 'gpt-4o-mini',
                'messages' => [
                    [
                        'role' => 'system',
                        'content' => 'Kamu adalah asisten penulis artikel blog dalam bahasa Indonesia. 
                        Hasilkan artikel dengan struktur JSON yang berisi: title, summary, content.'
                    ],
                    [
                        'role' => 'user',
                        'content' => "Buat artikel berdasarkan topik berikut: {$prompt}"
                    ],
                ],
            ]);

            $content = $response->choices[0]->message->content ?? '';

            // Coba parsing JSON
            $json = json_decode($content, true);
            if (!is_array($json)) {
                $json = [
                    'title' => 'Artikel AI: ' . ucfirst($prompt),
                    'summary' => substr($content, 0, 150) . '...',
                    'content' => $content,
                ];
            }

            return response()->json([
                'success' => true,
                'data' => $json,
            ]);
        } catch (\Throwable $e) {
            Log::error('AI Generate Error: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Gagal membuat artikel AI: ' . $e->getMessage(),
            ], 500);
        }
    }
}
