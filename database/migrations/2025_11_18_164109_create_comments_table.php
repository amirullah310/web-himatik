<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->id();

            // HARUS match blog_articles.id = BIGINT UNSIGNED
            $table->unsignedBigInteger('article_id');

            // HARUS match users.id = BIGINT UNSIGNED
            $table->unsignedBigInteger('user_id')->nullable();

            $table->text('comment');

            // reply
            $table->unsignedBigInteger('parent_id')->nullable();

            // moderasi
            $table->boolean('is_hidden')->default(false);

            $table->timestamps();

            // RELASI BENAR
            $table->foreign('article_id')
                ->references('id')
                ->on('blog_articles')
                ->onDelete('cascade');

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->nullOnDelete();

            $table->foreign('parent_id')
                ->references('id')
                ->on('comments')
                ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('comments');
    }
};
