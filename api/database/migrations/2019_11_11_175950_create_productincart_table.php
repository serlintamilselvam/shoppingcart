<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductincartTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('productincart', function (Blueprint $table) {
            $table->bigIncrements('cart_id');
            $table->unsignedBigInteger('prod_id');
            $table->foreign('cart_id')->references('cart_id')->on('cart');
            $table->foreign('prod_id')->references('prod_id')->on('product');
    
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('productincart');
    }
}
