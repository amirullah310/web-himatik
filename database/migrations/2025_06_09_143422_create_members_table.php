<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('members', function (Blueprint $table) {
            $table->id();

            // Relasi ke periods (nullable + nullOnDelete agar tidak error FK)
            $table->foreignId('period_id')
                ->nullable()
                ->constrained('periods')
                ->nullOnDelete();

            $table->string('picture', 255)->nullable();
            $table->string('name', 100);
            $table->string('nim', 50)->unique();
            $table->string('address', 255)->nullable();
            $table->string('email', 191)->unique();
            $table->string('department', 255);
            $table->string('study_program', 255);
            $table->year('joined_college_on');
            $table->year('graduated_college_on')->nullable();
            $table->string('born_at', 100)->nullable();
            $table->date('birth_date_at')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('members');
    }
};
