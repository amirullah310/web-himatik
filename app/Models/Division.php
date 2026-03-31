<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Division extends Model
{
    use SoftDeletes;

    protected $fillable = ['name', 'description', 'period_id'];

    // Relasi ke periode
    public function period()
    {
        return $this->belongsTo(Period::class, 'period_id');
    }

    // Relasi ke Program Kerja (DivisionPlan)
public function plans()
{
    return $this->hasMany(DivisionPlan::class, 'division_id');
}


    // Relasi ke tabel pivot period_divisions (kalau dipakai)
    public function periodDivisions()
    {
        return $this->hasMany(PeriodDivision::class);
    }

    public function periods()
    {
        return $this->belongsToMany(Period::class, 'period_divisions');
    }

    // Mutator nama biar rapi
    public function setNameAttribute($value)
    {
        $this->attributes['name'] = preg_replace('/\s+/', ' ', strtolower(trim($value)));
    }
}
