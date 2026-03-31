<?php

namespace App\Http\Controllers;

use App\Models\Period;
use App\Models\Division;
use App\Models\DivisionPlan;
use App\Services\DivisionService;
use App\Services\DivisionPlansService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BidangPageController extends Controller
{
    protected $divisionService;
    protected $divisionPlansService;

    public function __construct(DivisionService $divisionService, DivisionPlansService $divisionPlansService)
    {
        $this->divisionService = $divisionService;
        $this->divisionPlansService = $divisionPlansService;
    }

    /**
     * Halaman daftar semua bidang
     */
    public function index(Request $request)
    {
        $periodId = $request->query('period_id');
        if (!$periodId) {
            $periodId = Period::where('is_active', 1)->first()?->id 
                ?? Period::latest()->first()?->id;
        }

        $divisions = $this->divisionService->getAllDivisions($periodId);

        return Inertia::render('homepage/bidang/index', [
            'divisions' => $divisions,
            'periodId'  => $periodId,
        ]);
    }

    /**
     * Halaman detail bidang
     */
    public function show(Division $division)
    {
        // 🔹 Ambil semua proker milik bidang ini
        $plans = $this->divisionPlansService->getPlansWithDivision($division->id);

        // 🔹 Ambil bidang lain
        $otherDivisions = Division::where('id', '!=', $division->id)
            ->withCount('plans')
            ->get(['id', 'name']);

        // 🔹 Ambil SEMUA program kerja dari semua bidang
        $division_plans_all = DivisionPlan::with('division:id,name')
            ->orderBy('scheduled_at', 'asc')
            ->get(['id', 'division_id', 'name', 'description', 'scheduled_at']);

        return Inertia::render('homepage/bidang/show', [
            'division'            => $division,
            'division_plans'      => $plans,
            'other_divisions'     => $otherDivisions,
            'division_plans_all'  => $division_plans_all,
        ]);
    }
}
