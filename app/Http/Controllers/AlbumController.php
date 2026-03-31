<?php

namespace App\Http\Controllers;

use App\Services\AlbumService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use ZipArchive;

class AlbumController extends Controller
{
    protected $albumService;

    public function __construct(AlbumService $albumService)
    {
        $this->albumService = $albumService;
    }

    public function index()
    {
        $albums = $this->albumService->getAllAlbums();
        return Inertia::render('gallery/album/index', ['albums' => $albums]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:50',
            'is_private' => 'boolean',
        ]);

        $album = $this->albumService->createAlbum($validated);
        return redirect()->back()->with('success', 'Album Berhasil ditambahkan');
    }

    public function show($id)
    {
        $album = $this->albumService->getAlbumWithMedia($id);
        return Inertia::render('gallery/album/show', ['album' => $album]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:50',
            'is_private' => 'boolean',
        ]);

        $album = $this->albumService->updateAlbum($id, $validated);
        return redirect()->back()->with('success', 'Album berhasil diperbarui');
    }

    public function destroy($id)
    {
        try {
            $this->albumService->deleteAlbum($id);
            return redirect()->back()->with('success', 'Album dan semua medianya berhasil dihapus.');
        } catch (\Exception $e) {
            Log::error('Gagal menghapus album ID ' . $id . ': ' . $e->getMessage());
            return redirect()->back()->with('error', 'Gagal menghapus album. Terjadi kesalahan server.');
        }
    }

    /**
     * Download beberapa media terpilih dalam ZIP
     */
    public function downloadMedia(Request $request)
    {
        $mediaFiles = $request->input('media', []); // array path file media

        if (empty($mediaFiles)) {
            return response()->json(['error' => 'Tidak ada file yang dipilih'], 400);
        }

        $zipFileName = 'media-download-' . time() . '.zip';
        $zipPath = storage_path("app/public/{$zipFileName}");

        $zip = new ZipArchive;
        if ($zip->open($zipPath, ZipArchive::CREATE | ZipArchive::OVERWRITE) === TRUE) {
            foreach ($mediaFiles as $file) {
                $filePath = storage_path("app/public/{$file}");
                if (file_exists($filePath)) {
                    $zip->addFile($filePath, basename($filePath));
                }
            }
            $zip->close();
        }

        return response()->download($zipPath)->deleteFileAfterSend(true);
    }
}
