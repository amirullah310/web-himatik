<?php

namespace App\Http\Controllers;

use App\Models\Period;
use App\Models\Structure;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StrukturalPageController extends Controller
{
    public function index(Request $request)
    {
        // Ambil period_id dari query, fallback ke aktif / terbaru
        $periodId = $request->query('period_id');
        if (!$periodId) {
            $periodId = Period::where('is_active', 1)->first()?->id 
                ?? Period::latest()->first()?->id;
        }

        // Ambil semua struktur dengan relasi division & members
        $structuresWithMembers = Structure::with(['structureMembers', 'division'])
            ->where('period_id', $periodId)
            ->orderBy('level', 'asc')
            ->get();

        // Kumpulkan anggota struktural + mapping data
        $structureMembers = collect();
        foreach ($structuresWithMembers as $structure) {
            foreach ($structure->structureMembers as $member) {
                $member->position = $structure->name;
                $member->division_name = $structure->division?->name;
                $structureMembers->push($member);
            }
        }

        // Format respons
        $formattedMembers = $structureMembers->map(function ($member) {
            return [
                'id'       => $member->id,
                'name'     => $member->name,
                'position' => $member->position,
                'picture'  => $member->picture ? asset('storage/' . $member->picture) : null,
                'division' => $member->division_name,
            ];
        });

        return Inertia::render('homepage/struktural/index', [
            'structureMembers' => $formattedMembers,
            'periodId'         => $periodId,
        ]);
    }
}
