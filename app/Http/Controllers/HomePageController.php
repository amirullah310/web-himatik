<?php

namespace App\Http\Controllers;

use App\Models\Member;
use App\Models\Period;
use App\Models\Vission;
use App\Models\Mission;
use App\Models\Structure;
use App\Services\DivisionService;
use App\Services\StructureMemberService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomePageController extends Controller
{
    protected $divisionService;
    protected $structureMemberService;

    public function __construct(DivisionService $divisionService, StructureMemberService $structureMemberService)
    {
        $this->divisionService = $divisionService;
        $this->structureMemberService = $structureMemberService;
    }

    public function index(Request $request)
    {
        // Ambil period_id dari query, kalau kosong pakai aktif, kalau tidak ada pakai terbaru
        $periodId = $request->query('period_id');
        if (!$periodId) {
            $periodId = Period::where('is_active', 1)->first()?->id 
                ?? Period::latest()->first()?->id;
        }

        // Ambil daftar divisi sesuai periode
        $divisions = $this->divisionService->getAllDivisions($periodId);

        // Ambil struktur (dengan relasi division & members), filter yang bukan has_many_member
        $structuresWithMembers = Structure::with(['structureMembers', 'division'])
            ->where('period_id', $periodId)
            ->where('has_many_member', false)
            ->orderBy('level', 'asc')
            ->get();

        // Kumpulkan anggota struktural + tambahkan posisi & division name
        $structureMembers = collect();
        foreach ($structuresWithMembers as $structure) {
            foreach ($structure->structureMembers as $member) {
                $member->position = $structure->name; // nama struktur jadi jabatan
                $member->division_name = $structure->division?->name; // nama divisi (nullable)
                $structureMembers->push($member);
            }
        }

        // Format ulang data anggota untuk frontend
        $formattedMembers = $structureMembers->map(function ($member) {
            return [
                'id' => $member->id,
                'name' => $member->name,
                'position' => $member->position,
                'picture' => $member->picture ? asset('storage/' . $member->picture) : null,
                'division' => $member->division_name, // ✅ kirim ke frontend
            ];
        });

        // Ambil visi & misi sesuai periode
        $visi = Vission::where('period_id', $periodId)->pluck('content')->toArray();
        $misi = Mission::where('period_id', $periodId)->pluck('content')->toArray();

        // Cek ulang tahun user yang login
        $isBirthday = false;
        $memberName = null;
        $user = auth()->user();
        if ($user) {
            $member = Member::where('email', $user->email)->first();
            if ($member && $member->birth_date_at) {
                $memberBirthDate = Carbon::parse($member->birth_date_at);
                if ($memberBirthDate->format('m-d') === Carbon::now()->format('m-d')) {
                    $isBirthday = true;
                    $memberName = $member->name;
                }
            }
        }

        return Inertia::render('homepage/home/index', [
            'divisions' => $divisions,
            'structureMembers' => $formattedMembers,
            'visi' => $visi,
            'misi' => $misi,
            'isBirthday' => $isBirthday,
            'memberName' => $memberName,
        ]);
    }
}
