<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use OpenAI\Laravel\Facades\OpenAI;

Route::post('/ai-assistant', function (Request $request) {
    $userMessage = $request->input('message');

    // Contoh integrasi OpenAI GPT
    $result = OpenAI::chat()->create([
        'model' => 'gpt-4o-mini',
        'messages' => [
            ['role' => 'system', 'content' => 'Kamu adalah asisten organisasi HIMATIK yang sopan dan informatif. Jawab singkat dan relevan.'],
            ['role' => 'user', 'content' => $userMessage],
        ],
    ]);

    return response()->json([
        'reply' => $result['choices'][0]['message']['content'] ?? 'Aku belum bisa menjawab itu.',
    ]);
});
