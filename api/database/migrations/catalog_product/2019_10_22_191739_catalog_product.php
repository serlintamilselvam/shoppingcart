<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CatalogProduct extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('catalog_product', function (Blueprint $table) {
            $table->bigIncrements('product_id');
            $table->string('sku');
            $table->char('name', 255);
            $table->bigInteger('stock_quantity');
            $table->char('image_path', 255);
            $table->char('description', 255);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('catalog_product');
    }
}
