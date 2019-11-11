<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product', function (Blueprint $table) {
            $table->bigIncrements('prod_id')->autoIncrement()->comment('product_id');
            $table->string('sku', 20)->comment('stockkeepingunit');
            $table->string('name', 100)->comment('Product Name');
            $table->integer('qty')->comment('Stock Quantity');
            $table->string('imagepath', 100)->comment('Image path');
            $table->string('desc', 255)->comment('Product Description');
            $table->float('rate')->comment('Rate');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('product');
    }
}
