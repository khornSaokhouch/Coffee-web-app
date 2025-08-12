<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCoffeeMenuTable extends Migration
{
    public function up()
    {
        Schema::create('coffee_menu', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name', 255);
            $table->text('description')->nullable();
            $table->decimal('price', 8, 2);
            $table->boolean('available')->default(true);
            $table->unsignedBigInteger('category_id');
            $table->unsignedBigInteger('created_by_id');
            $table->timestamps();

            // Foreign key constraints
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
            $table->foreign('created_by_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('coffee_menu');
    }
}
