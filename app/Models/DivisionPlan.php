<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DivisionPlan extends Model
{
    use HasFactory;

    protected $table = 'division_plans'; // ✅ pastikan tabel sesuai di database
    protected $primaryKey = 'id';

    protected $fillable = [
        'name',
        'description',
        'scheduled_at',
        'division_id',
    ];

    protected $casts = [
        'scheduled_at' => 'datetime',
    ];

    /**
     * Relasi ke Division (bidang).
     */
    public function division(): BelongsTo
    {
        return $this->belongsTo(Division::class, 'division_id');
    }
}
