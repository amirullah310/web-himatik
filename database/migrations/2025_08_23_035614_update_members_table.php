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
        Schema::table('members', function (Blueprint $table) {
            // Hapus foreign key lama
            $table->dropForeign(['period_id']);

            // Ubah period_id jadi nullable
            $table->unsignedBigInteger('period_id')->nullable()->change();

            // Tambahkan foreign key baru dengan onDelete set null
            $table->foreign('period_id')
                ->references('id')
                ->on('periods')
                ->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('members', function (Blueprint $table) {
            // Hapus foreign key baru
            $table->dropForeign(['period_id']);

            // Ubah balik jadi NOT NULL
            $table->unsignedBigInteger('period_id')->nullable(false)->change();

            // Tambahkan foreign key lama (cascade)
            $table->foreign('period_id')
                ->references('id')
                ->on('periods')
                ->cascadeOnDelete();
        });
    }
};
