<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->engine = 'InnoDB'; // ensure InnoDB for foreign keys

            $table->bigIncrements('id');
            $table->unsignedBigInteger('user_id');
            $table->decimal('total_price', 10, 2);
            $table->string('status', 50);
            $table->timestamps();

            // foreign key to users table
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
