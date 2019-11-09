<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCustomersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->bigIncrements('cust_id')->autoIncrement()->comment('Customer ID');
            $table->string('first_name', 100)->comment('First Name');
            $table->string('last_name', 100)->comment('Last Name');
            $table->string('email', 50)->unique()->comment('Email Address');
            $table->string('phone_no', 50)->comment('Phone Number');
            $table->string('password', 50)->comment('Password');
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
        Schema::dropIfExists('customers');
    }
}
